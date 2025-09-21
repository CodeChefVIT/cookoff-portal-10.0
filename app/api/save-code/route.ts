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

  console.log("All cookies:", request.cookies.getAll());

  // Read JWT from cookie
  const token = request.cookies.get("refresh_token")?.value;
  console.log("Token from cookie:", token);

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

  if (!codeId && !questionId) {
    return NextResponse.json(
      { message: "id or questionId is required" },
      { status: 400 }
    );
  }

  // Read JWT from cookie
  const token = request.cookies.get("refresh_token")?.value;
  console.log("Token from cookie:", token);

  const result = await getCodeController(
    {
      id: codeId ?? undefined,
      questionId: questionId ?? undefined,
    },
    token
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
