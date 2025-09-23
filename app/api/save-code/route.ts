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

  const token = request.cookies.get("refresh_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await saveCodeController(body, token);

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
  const questionId = searchParams.get("questionId");
  const userId = searchParams.get("userId");
  const secretKey = searchParams.get("secretKey");

  if (!codeId && !questionId) {
    return NextResponse.json(
      { message: "id or questionId is required" },
      { status: 400 }
    );
  }

  const token = request.cookies.get("refresh_token")?.value;
  
  // Allow authentication via either JWT token OR userId+secretKey query parameters
  if (!token && (!userId || !secretKey)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await getCodeController(
    {
      id: codeId ?? undefined,
      questionId: questionId ?? undefined,
      userId: userId ?? undefined,
      secretKey: secretKey ?? undefined,
    },
    token || "" // Provide empty string as fallback if no token
  );

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

  const token = request.cookies.get("refresh_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await updateCodeController(body, token);

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

  const token = request.cookies.get("refresh_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await deleteCodeController(body, token);

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
