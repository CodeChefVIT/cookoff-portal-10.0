import {
  SaveCodeRequest,
  UpdateCodeRequest,
  DeleteCodeRequest,
  CodeState,
  CodeResponse,
} from "@/lib/types/save-code";
import { getMongoClient } from "@/lib/db";
import type { Filter, UpdateFilter } from "mongodb";

async function getCollection() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || "app";
  return client.db(dbName).collection<CodeState>("codes");
}

function buildCodeResponse(code: CodeState): CodeResponse {
  return {
    message: "Code fetched successfully",
    codeId: code._id,
    email: code.email,
    questionId: code.questionId,
    language: code.language,
    code: code.code,
    round: code.round,
    createdAt: code.createdAt,
    updatedAt: code.updatedAt,
  };
}

export async function saveCodeController(
  request: SaveCodeRequest
): Promise<{
  success: boolean;
  data?: CodeResponse;
  error?: string;
  status: number;
}> {
  try {
    const { questionId, language, code, round, email } = request;

    if (!email) {
      return {
        success: false,
        error: "Email is required",
        status: 400,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
        status: 400,
      };
    }

    if (!questionId) {
      return {
        success: false,
        error: "questionId is required",
        status: 400,
      };
    }

    if (!language || !code) {
      return {
        success: false,
        error: "Language and code are required",
        status: 400,
      };
    }

    const col = await getCollection();
    const now = Date.now();

    const result = await col.updateOne(
      { email, questionId },
      {
        $set: {
          email,
          questionId,
          language,
          code,
          round,
          updatedAt: now,
        },
        $setOnInsert: {
          _id: new Date().getTime().toString(),
          createdAt: now,
        },
      },
      { upsert: true }
    );

    const saved = await col.findOne({ email, questionId });
    if (!saved) {
      return { success: false, error: "Failed to save code", status: 500 };
    }

    return {
      success: true,
      data: buildCodeResponse(saved),
      status: result.upsertedCount ? 201 : 200,
    };
  } catch (error) {
    console.error("Error saving code:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function getCodeController(
  request: {
    id?: string;
    questionId?: string;
    email?: string;
  }
): Promise<{
  success: boolean;
  data?: CodeResponse;
  error?: string;
  status: number;
}> {
  try {
    const { questionId, email } = request;

    if (!email) {
      return {
        success: false,
        error: "Email is required",
        status: 400,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
        status: 400,
      };
    }

    const col = await getCollection();
    let code: CodeState | null = null;

    if (email && questionId) {
      code = await col.findOne({
        email,
        questionId,
      });
    }

    if (!code) {
      // Return empty code response instead of 404 when no code exists yet
      return { 
        success: true, 
        data: {
          message: "No code found for this question",
          codeId: "",
          email,
          questionId: questionId || "",
          language: "",
          code: "",
          round: "",
          createdAt: 0,
          updatedAt: 0,
        }, 
        status: 200 
      };
    }

    return { success: true, data: buildCodeResponse(code), status: 200 };
  } catch (error) {
    console.error("Error fetching code:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function updateCodeController(
  request: UpdateCodeRequest
): Promise<{
  success: boolean;
  data?: CodeResponse;
  error?: string;
  status: number;
}> {
  try {
    const { id, code, email } = request;

    if (!email) {
      return {
        success: false,
        error: "Email is required",
        status: 400,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
        status: 400,
      };
    }

    const col = await getCollection();
    const existing = await col.findOne({
      _id: id,
      email,
    } as Filter<CodeState>);
    if (!existing) {
      return { success: false, error: "Code not found", status: 404 };
    }

    const updated: UpdateFilter<CodeState> = {
      $set: { code, updatedAt: Date.now() },
    };

    await col.updateOne({ _id: id } as Filter<CodeState>, updated);

    const refreshed = await col.findOne({ _id: id } as Filter<CodeState>);
    if (!refreshed) {
      return {
        success: false,
        error: "Failed to fetch updated code",
        status: 500,
      };
    }

    return { success: true, data: buildCodeResponse(refreshed), status: 200 };
  } catch (error) {
    console.error("Error updating code:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}

export async function deleteCodeController(
  request: DeleteCodeRequest
): Promise<{ success: boolean; error?: string; status: number }> {
  try {
    const { id, email } = request;

    if (!email) {
      return {
        success: false,
        error: "Email is required",
        status: 400,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
        status: 400,
      };
    }

    const col = await getCollection();
    const result = await col.deleteOne({
      _id: id,
      email,
    } as Filter<CodeState>);

    if (!result.deletedCount) {
      return { success: false, error: "Code not found", status: 404 };
    }

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Error deleting code:", error);
    return { success: false, error: "Internal server error", status: 500 };
  }
}
