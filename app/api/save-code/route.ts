import { NextRequest, NextResponse } from "next/server";
import {
  SaveCodeRequest,
  UpdateCodeRequest,
  DeleteCodeRequest,
} from "@/lib/types/save-code";
import {
  saveCodeController,
  getCodeController,
  updateCodeController,
  deleteCodeController,
} from "@/lib/controllers/save-code.controller";

export async function POST(request: NextRequest) {
  const body: SaveCodeRequest = await request.json();
  const result = await saveCodeController(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: "code saved successfully", ...result.data },
    { status: result.status }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const codeId = searchParams.get("id");
  const userId = searchParams.get("userId");
  const questionId = searchParams.get("questionId");

  if (!codeId && !(userId && questionId)) {
    return NextResponse.json(
      { message: "id or (userId + questionId) is required" },
      { status: 400 }
    );
  }

  const result = await getCodeController({
    id: codeId ?? undefined,
    userId: userId ?? undefined,
    questionId: questionId ?? undefined,
  });

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function PUT(request: NextRequest) {
  const body: UpdateCodeRequest = await request.json();
  const result = await updateCodeController(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: "code updated successfully", ...result.data },
    { status: result.status }
  );
}

export async function DELETE(request: NextRequest) {
  const body: DeleteCodeRequest = await request.json();
  const result = await deleteCodeController(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: "code deleted" },
    { status: result.status }
  );
}
