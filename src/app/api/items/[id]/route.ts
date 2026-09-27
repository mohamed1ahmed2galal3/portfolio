import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.item.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const item = await prisma.item.update({
    where: { id: params.id },
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

  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.item.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
