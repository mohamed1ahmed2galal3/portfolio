# 🧑‍💻 Personal Portfolio — Full Stack (Next.js)

بورتفوليو شخصي قابل للتحديث المستمر، يعرض المشاريع والملاحظات التقنية (Learning Notes) مقسّمة حسب التخصص (Backend / Frontend / Problem Solving)، مع صفحة Admin محمية بتسجيل دخول حقيقي لإدارة المحتوى.

---

## 🎯 فكرة المشروع

- **صفحة عامة (Public)**: تعرض المحتوى المنشور فقط، لأي زائر.
- **صفحة Admin (خاصة)**: محمية بتسجيل دخول وصلاحيات حقيقية (session + middleware)، مش مجرد رابط مخفي.
- **تقسيم المحتوى** إلى 3 أقسام رئيسية:
  - Backend
  - Frontend
  - Problem Solving
- **نوعين من المحتوى**:
  - `Project`: مشروع مع وصف، تقنيات، رابط Demo، رابط GitHub.
  - `Learning Note`: معلومة/فكرة جديدة اتعلمتها، مع شرح مختصر وأمثلة/كود.
- **قابلية تحديث مستمرة**: أي مشروع أو معلومة جديدة تتحول لعنصر في نفس أسبوع إنجازها.

---

## 🛠️ Tech Stack

| الطبقة | الأداة |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon / Vercel Postgres) |
| ORM | Prisma |
| Authentication | NextAuth.js (Auth.js) — Credentials Provider |
| Password Hashing | bcrypt |
| File Storage (الصور/الأيقونات) | Vercel Blob |
| Hosting | Vercel |
| Form Handling | React Hook Form (اختياري) |

---

## 🗃️ Database Schema

### Model: `User` (حساب الأدمن فقط)

| الحقل | النوع | ملاحظات |
|---|---|---|
| id | String (uuid) | Primary Key |
| email | String | unique |
| passwordHash | String | مشفّر بـ bcrypt |
| role | Enum(`ADMIN`) | صلاحية ثابتة |
| createdAt | DateTime | |

### Model: `Item` (يمثل الـ Project والـ Learning Note)

| الحقل | النوع | ملاحظات |
|---|---|---|
| id | String (uuid) | Primary Key |
| title | String | عنوان العنصر |
| shortDescription | String | وصف مختصر يظهر في الكارد |
| content | Text | الشرح الكامل / التفاصيل / الكود |
| category | Enum(`BACKEND`, `FRONTEND`, `PROBLEM_SOLVING`) | |
| type | Enum(`PROJECT`, `LEARNING_NOTE`) | |
| technologies | String[] | مصفوفة تقنيات/Topics |
| thumbnailUrl | String? | رابط الصورة بعد الرفع على Vercel Blob |
| githubUrl | String? | اختياري |
| demoUrl | String? | اختياري (Live Demo) |
| status | Enum(`DRAFT`, `PUBLISHED`) | يتحكم في ظهوره بالصفحة العامة |
| featured | Boolean | لعرضه في الصفحة الرئيسية |
| createdAt | DateTime | تاريخ الإضافة |
| updatedAt | DateTime | |

```prisma
// schema.prisma (مثال مبدئي)

enum Role {
  ADMIN
}

enum Category {
  BACKEND
  FRONTEND
  PROBLEM_SOLVING
}

enum ItemType {
  PROJECT
  LEARNING_NOTE
}

enum Status {
  DRAFT
  PUBLISHED
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         Role     @default(ADMIN)
  createdAt    DateTime @default(now())
}

model Item {
  id                String   @id @default(uuid())
  title             String
  shortDescription  String
  content           String
  category          Category
  type              ItemType
  technologies      String[]
  thumbnailUrl      String?
  githubUrl         String?
  demoUrl           String?
  status            Status   @default(DRAFT)
  featured          Boolean  @default(false)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

---

## 📁 File Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts                     # سكريبت لإنشاء حساب الأدمن أول مرة
│   └── migrations/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # الصفحة العامة (Public Home)
│   │   ├── globals.css
│   │   │
│   │   ├── (public)/
│   │   │   └── item/
│   │   │       └── [id]/
│   │   │           └── page.tsx     # صفحة تفاصيل عنصر واحد
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx             # صفحة تسجيل الدخول
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx           # Layout خاص بالأدمن (محمي)
│   │   │   ├── page.tsx             # Dashboard: عرض كل العناصر
│   │   │   ├── new/
│   │   │   │   └── page.tsx         # فورم إضافة عنصر جديد
│   │   │   └── edit/
│   │   │       └── [id]/
│   │   │           └── page.tsx     # فورم تعديل عنصر
│   │   │
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts     # NextAuth handler
│   │       ├── items/
│   │       │   ├── route.ts         # GET (list + filter + search), POST (create)
│   │       │   └── [id]/
│   │       │       └── route.ts     # GET, PUT, DELETE لعنصر واحد
│   │       └── upload/
│   │           └── route.ts         # رفع الصور عبر Vercel Blob
│   │
│   ├── components/
│   │   ├── ItemCard.tsx             # كارد عرض عنصر في الصفحة العامة
│   │   ├── FilterBar.tsx            # فلترة حسب Category / Type
│   │   ├── SearchBox.tsx            # مربع البحث
│   │   ├── ItemForm.tsx             # فورم مشترك للإضافة والتعديل
│   │   ├── FeaturedSection.tsx      # عرض العناصر المميزة بالصفحة الرئيسية
│   │   └── Navbar.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts                # Prisma client singleton
│   │   ├── auth.ts                  # إعدادات NextAuth
│   │   └── utils.ts
│   │
│   ├── middleware.ts                # حماية مسارات /admin/*
│   └── types/
│       └── item.ts
│
├── public/
│   └── (assets ثابتة)
│
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔐 آلية الحماية (Admin Auth)

1. حساب الأدمن الوحيد يتزرع في الداتابيز مرة واحدة عبر `prisma/seed.ts` (إيميل + باسورد مشفّر بـ bcrypt).
2. تسجيل الدخول يتم عبر NextAuth **Credentials Provider** في `/login`.
3. بعد الدخول الناجح، يتخزن الـ session في JWT.
4. `middleware.ts` يفحص كل request موجّه لأي مسار تحت `/admin/*` أو `/api/items` (POST/PUT/DELETE):
   - لو مفيش session صالحة → redirect لـ `/login`.
   - لو الـ role مش `ADMIN` → رفض الطلب (403).
5. الصفحة العامة والـ GET requests فقط تكون مفتوحة بدون تسجيل دخول، وتعرض العناصر اللي `status = PUBLISHED` فقط.

---

## ✅ MVP Checklist

- [ ] تصميم الصفحة العامة والـ Admin Page.
- [ ] إنشاء Database للمشاريع والملاحظات (Prisma + Postgres).
- [ ] بناء تسجيل الدخول وحماية صلاحيات الأدمن (NextAuth + Middleware).
- [ ] إضافة وتعديل وحذف العناصر من صفحة الأدمن (CRUD كامل).
- [ ] رفع الصور/الأيقونات عبر Vercel Blob وربطها بالعنصر.
- [ ] عرض العناصر في الصفحة العامة مع Filter حسب Category و Type.
- [ ] إضافة Search بسيط (بالعنوان والتقنيات).
- [ ] إضافة أول محتوى حقيقي: مشروع Backend، مشروع Frontend، مجموعة Problem Solving Notes.
- [ ] نشر الموقع على Vercel وربطه بدومين/رابط ثابت.

---

## ⚙️ Environment Variables (`.env`)

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="generate-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="used-only-in-seed-script"
```

---

## 🚀 خطوات التشغيل محليًا

```bash
# 1. تثبيت المكتبات
npm install

# 2. إعداد قاعدة البيانات
npx prisma migrate dev --name init

# 3. زرع حساب الأدمن
npx prisma db seed

# 4. تشغيل السيرفر محليًا
npm run dev
```

---

## ☁️ خطوات النشر على Vercel

1. رفع المشروع على GitHub.
2. ربط الـ repo بمشروع جديد على Vercel.
3. إضافة كل الـ Environment Variables في إعدادات المشروع بـ Vercel Dashboard.
4. ربط Vercel Postgres أو Neon من تبويب Storage في Vercel.
5. عمل Deploy، ثم تشغيل `npx prisma migrate deploy` و`npx prisma db seed` مرة واحدة على قاعدة بيانات الإنتاج.
6. ربط الدومين المخصص (لو موجود) من تبويب Domains.

---

## 🔁 قاعدة الاستمرارية

كل مشروع يتم إنجازه أو معلومة جديدة يتم تعلمها، تتحول إلى عنصر (`Item`) جديد في الـ Admin Dashboard خلال نفس أسبوع إنجازها، حتى يبقى الموقع دائمًا معبّرًا عن المستوى الحقيقي الحالي.

---

## 📌 ملاحظات مستقبلية (Nice to have)

- إضافة Tags قابلة للفلترة بشكل منفصل عن حقل `technologies`.
- صفحة إحصائيات بسيطة للأدمن (عدد العناصر، الأكثر مشاهدة... إلخ).
- دعم Dark Mode في الصفحة العامة.
- RSS/Sitemap لتحسين الـ SEO.
"# portfolio" 
