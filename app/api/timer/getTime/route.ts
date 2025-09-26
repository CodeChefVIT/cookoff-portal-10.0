import { NextResponse } from "next/server";

export interface GetTimeResponse {
  round_end_time: string;
  round_start_time: string;
  server_time: string;
}
// testing route
export async function GET() {
  try {
    // Get current server time
    const serverTime = new Date();
    
    // Mock data - replace with actual database queries
    // This should come from your database based on current round
    const roundStartTime = new Date("2025-09-26T13:34:41Z");
    const roundEndTime = new Date("2025-09-29T23:00:00+05:30");
    
    const response: GetTimeResponse = {
      round_end_time: roundEndTime.toISOString(),
      round_start_time: roundStartTime.toISOString(),
      server_time: serverTime.toISOString(),
    };

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error("Timer API error:", error);
    return NextResponse.json(
      { error: "Failed to get timer data" },
      { status: 500 }
    );
  }
}
