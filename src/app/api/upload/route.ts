import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filename = req.nextUrl.searchParams.get("filename");
  if (!filename || !req.body) {
    return NextResponse.json({ error: "File is missing" }, { status: 400 });
  }

  const blob = await put(filename, req.body, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json(blob); // { url, ... }
}
