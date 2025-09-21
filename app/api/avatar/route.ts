import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const response = await fetch(imageUrl);

    if (!response.ok) {
      return new NextResponse("Failed to fetch image", {
        status: response.status,
      });
    }

    const imageBlob = await response.blob();

    const headers = new Headers();
    headers.set(
      "Content-Type",
      response.headers.get("Content-Type") || "image/jpeg"
    );

    return new NextResponse(imageBlob, {
      status: 200,
      statusText: "OK",
      headers,
    });
  } catch (error) {
    console.error("Avatar proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
