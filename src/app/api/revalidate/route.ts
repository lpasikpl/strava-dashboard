import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.headers.get("x-revalidate-token");
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
