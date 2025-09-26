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
  const { searchParams } = new URL(request.url);
  const body: SaveCodeRequest = await request.json();

  // Get email from query params if not in body
  if (!body.email) {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      body.email = emailParam;
    }
  }

  if (!body.email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

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
  const questionId = searchParams.get("questionId");
  const email = searchParams.get("email");

  if (!questionId) {
    return NextResponse.json(
      { message: "questionId is required" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const result = await getCodeController({
    id: codeId ?? undefined,
    questionId: questionId ?? undefined,
    email,
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
  const { searchParams } = new URL(request.url);
  const body: UpdateCodeRequest = await request.json();

  // Get email from query params if not in body
  if (!body.email) {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      body.email = emailParam;
    }
  }

  if (!body.email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

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
  const { searchParams } = new URL(request.url);
  const body: DeleteCodeRequest = await request.json();

  // Get email from query params if not in body
  if (!body.email) {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      body.email = emailParam;
    }
  }

  if (!body.email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

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
