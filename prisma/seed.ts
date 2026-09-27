import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1) حساب الأدمن
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, role: "ADMIN" },
  });

  // 2) أول محتوى حقيقي (مشاريع Selected Work)
  const projects = [
    {
      title: "E-Commerce Platform",
      shortDescription:
        "Full-featured e-commerce with cart, wishlist & auth. Built with SSR for optimal performance and SEO.",
      content:
        "منصة تجارة إلكترونية كاملة فيها عربة شراء، Wishlist، وتسجيل دخول، مبنية بـ Server-Side Rendering لتحسين الأداء والـ SEO.",
      category: "FRONTEND" as const,
      type: "PROJECT" as const,
      technologies: ["Next.js", "TypeScript", "NextAuth", "REST API"],
      demoUrl: "https://e-commerce-three-zeta-26.vercel.app/",
      status: "PUBLISHED" as const,
      featured: true,
    },
    {
      title: "Social Network App",
      shortDescription:
        "Real-time social platform with posts, comments, likes and follow system via WebSocket updates.",
      content:
        "منصة تواصل اجتماعي فيها بوستات وتعليقات ولايكات ونظام متابعة، بتحديثات لحظية عبر WebSockets.",
      category: "FRONTEND" as const,
      type: "PROJECT" as const,
      technologies: ["React", "TypeScript", "WebSockets", "Auth"],
      demoUrl: "https://social-app-theta-lovat.vercel.app/login",
      status: "PUBLISHED" as const,
      featured: true,
    },
    {
      title: "Movie Discovery",
      shortDescription:
        "Browse and search thousands of movies with advanced filtering and rich API integration.",
      content: "تطبيق لتصفح والبحث عن آلاف الأفلام مع فلترة متقدمة وربط API غني بالبيانات.",
      category: "FRONTEND" as const,
      type: "PROJECT" as const,
      technologies: ["React", "API", "Responsive"],
      demoUrl: "https://mohamed1ahmed2galal3.github.io/Movie/",
      status: "PUBLISHED" as const,
      featured: true,
    },
    {
      title: "Yummy Recipe App",
      shortDescription: "Dynamic food and recipe browsing with beautiful UI and smooth interactions.",
      content: "تطبيق لتصفح الوصفات والأكلات بواجهة جميلة وتفاعلات سلسة.",
      category: "FRONTEND" as const,
      type: "PROJECT" as const,
      technologies: ["JavaScript", "API", "Dynamic UI"],
      demoUrl: "https://mohamed1ahmed2galal3.github.io/Yummy-Project/",
      status: "PUBLISHED" as const,
      featured: true,
    },
  ];

  for (const p of projects) {
    const exists = await prisma.item.findFirst({ where: { title: p.title } });
    if (!exists) await prisma.item.create({ data: p });
  }

  console.log("✅ Seed تمّ بنجاح. إيميل الأدمن:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
