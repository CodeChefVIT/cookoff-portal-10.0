import { NextRequest, NextResponse } from "next/server";
import {
  CreateTimerRequest,
  StartCountdownRequest,
  ExtendTimerRequest,
} from "@/lib/types/timer";
import {
  createTimer,
  getTimerStatus,
  startCountdown,
  controlTimer,
  deleteTimerController,
} from "@/lib/controllers/timer.controller";

export async function POST(request: NextRequest) {
  const body: CreateTimerRequest = await request.json();
  const result = await createTimer(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { status: "timer created successfully", ...result.data },
    { status: result.status }
  );
}

export async function GET() {
  const result = await getTimerStatus();

  if (!result.success) {
    return NextResponse.json(
      { message: result.error, isActive: false },
      { status: result.status }
    );
  }

  return NextResponse.json(result.data, { status: result.status });
}

export async function PUT(request: NextRequest) {
  const body: StartCountdownRequest = await request.json();
  const result = await startCountdown(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { status: "countdown started", ...result.data },
    { status: result.status }
  );
}

export async function PATCH(request: NextRequest) {
  const body: ExtendTimerRequest & {
    action?: "pause" | "resume" | "stop" | "extend";
  } = await request.json();

  const result = await controlTimer(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  let statusMessage = "timer updated";
  if (body.action === "extend" && body.additionalTime) {
    statusMessage = `timer extended ${body.additionalTime} seconds`;
  } else if (body.action === "pause") {
    statusMessage = "timer paused";
  } else if (body.action === "resume") {
    statusMessage = "timer resumed";
  } else if (body.action === "stop") {
    statusMessage = "timer stopped";
  }

  return NextResponse.json(
    { status: statusMessage, ...result.data },
    { status: result.status }
  );
}

export async function DELETE(request: NextRequest) {
  const body: { secretKey: string } = await request.json();
  const result = await deleteTimerController(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: "timer deleted" },
    { status: result.status }
  );
}

export const runtime = 'edge';
