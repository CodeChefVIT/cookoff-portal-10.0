import { NextResponse } from 'next/server';

export interface GetTimeResponse {
  round_end_time: string;
  round_start_time: string;
  server_time: string;
}

export async function GET() {
  try {
    // Mock data for now - replace with actual timer logic
    const now = new Date();
    const roundStart = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago
    const roundEnd = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now

    const response: GetTimeResponse = {
      round_end_time: roundEnd.toISOString(),
      round_start_time: roundStart.toISOString(),
      server_time: now.toISOString(),
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: 'Failed to get timer data' },
      { status: 500 }
    );
  }
}
