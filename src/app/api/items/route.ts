import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/items?category=FRONTEND&type=PROJECT&search=react
// - Visitors: only see PUBLISHED items
// - Admin (with a session): sees everything, including Drafts
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const search = searchParams.get("search");

  const items = await prisma.item.findMany({
    where: {
      ...(isAdmin ? {} : { status: "PUBLISHED" }),
      ...(category ? { category: category as any } : {}),
      ...(type ? { type: type as any } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { technologies: { has: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(items);
}

// POST /api/items — create a new item (Admin only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const item = await prisma.item.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription,
      content: body.content,
      category: body.category,
      type: body.type,
      technologies: body.technologies ?? [],
      thumbnailUrl: body.thumbnailUrl || null,
      githubUrl: body.githubUrl || null,
      demoUrl: body.demoUrl || null,
      status: body.status,
      featured: Boolean(body.featured),
    },
  });

  return NextResponse.json(item, { status: 201 });
}
