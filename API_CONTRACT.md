# 🍄 FungiFarm API Contract — Express.js + Supabase + Prisma ORM

> **Dokumen ini adalah kontrak API lengkap** untuk backend aplikasi **FungiFarm** (Japri Website) — platform komunitas & marketplace petani jamur Indonesia. Gunakan dokumen ini sebagai panduan/prompt untuk membangun backend menggunakan **Express.js**, **Supabase** (Auth & Storage), dan **Prisma ORM** (PostgreSQL).

---

## 📋 Daftar Isi

1. [Tech Stack & Arsitektur](#1-tech-stack--arsitektur)
2. [Database Schema (Prisma)](#2-database-schema-prisma)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [API Endpoints](#4-api-endpoints)
   - [Auth](#41-auth)
   - [Users](#42-users)
   - [Farmers](#43-farmers)
   - [Farmer Reviews](#44-farmer-reviews)
   - [Farmer Services](#45-farmer-services)
   - [Forum Posts](#46-forum-posts)
   - [Forum Comments](#47-forum-comments)
   - [Products (Marketplace)](#48-products-marketplace)
   - [Product Reviews](#49-product-reviews)
   - [Chat / Messaging](#410-chat--messaging)
   - [Upload (Images/Files)](#411-upload-imagesfiles)
   - [Community](#412-community)
5. [Response Format](#5-response-format)
6. [Error Codes](#6-error-codes)
7. [Prompt untuk Vibe Coding](#7-prompt-untuk-vibe-coding)

---

## 1. Tech Stack & Arsitektur

| Layer      | Teknologi                       |
| ---------- | ------------------------------- |
| Runtime    | Node.js + Express.js            |
| Language   | TypeScript                      |
| Database   | PostgreSQL (Supabase hosted)    |
| ORM        | Prisma ORM                      |
| Auth       | Supabase Auth (JWT)             |
| Storage    | Supabase Storage (images/files) |
| Validation | Zod                             |
| API Format | RESTful JSON                    |
| CORS       | Whitelisted frontend origin     |

### Folder Structure (Backend)

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.ts              # Express app entry point
│   ├── config/
│   │   ├── supabase.ts       # Supabase client init
│   │   └── prisma.ts         # Prisma client init
│   ├── middleware/
│   │   ├── auth.ts           # JWT verification middleware
│   │   ├── validate.ts       # Zod validation middleware
│   │   └── errorHandler.ts   # Global error handler
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── farmer.routes.ts
│   │   ├── farmerReview.routes.ts
│   │   ├── farmerService.routes.ts
│   │   ├── forum.routes.ts
│   │   ├── forumComment.routes.ts
│   │   ├── product.routes.ts
│   │   ├── productReview.routes.ts
│   │   ├── chat.routes.ts
│   │   ├── upload.routes.ts
│   │   └── community.routes.ts
│   ├── controllers/
│   │   └── (same structure as routes)
│   ├── services/
│   │   └── (business logic per domain)
│   ├── validators/
│   │   └── (Zod schemas per domain)
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── pagination.ts
│       └── helpers.ts
├── package.json
├── tsconfig.json
└── .env
```

---

## 2. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========================
// USER & AUTH
// ========================

model User {
  id            String    @id @default(uuid())
  supabaseId    String    @unique // Supabase Auth UID
  fullName      String
  email         String    @unique
  phone         String?
  avatar        String?   // URL to Supabase Storage
  isFarmer      Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  farmer          Farmer?
  forumPosts      ForumPost[]
  forumComments   ForumComment[]
  postLikes       PostLike[]
  commentLikes    CommentLike[]
  products        Product[]
  productReviews  ProductReview[]
  farmerReviews   FarmerReview[]
  conversations   ConversationParticipant[]
  messages        Message[]
  wishlist        Wishlist[]
  bookmarks       Bookmark[]

  @@map("users")
}

// ========================
// FARMER
// ========================

model Farmer {
  id              String    @id @default(uuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Personal info (may differ from user)
  fullName        String
  email           String
  phone           String
  whatsapp        String

  // Location
  region          String
  city            String
  address         String?

  // Professional
  specialty       String          // e.g. "Jamur Tiram", "Shiitake", "Multi-variant"
  experience      String          // e.g. "1-3 tahun", "5-10 tahun"
  bio             String?         @db.Text
  fullBio         String?         @db.Text
  website         String?
  farmSize        String?         // e.g. "2000 m²"
  totalHarvest    String?         // e.g. "25,000+ kg"

  // Roles & Status
  isMentor        Boolean   @default(false)
  isPartner       Boolean   @default(false)
  isConsultant    Boolean   @default(false)
  isVerified      Boolean   @default(false)

  // Stats (computed or cached)
  rating          Float     @default(0)
  reviewCount     Int       @default(0)
  studentCount    Int       @default(0)
  successStories  Int       @default(0)

  // Social media
  instagram       String?
  youtube         String?
  facebook        String?

  lastActiveAt    DateTime  @default(now())
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  skills          FarmerSkill[]
  certifications  FarmerCertification[]
  gallery         FarmerGallery[]
  services        FarmerService[]
  reviews         FarmerReview[]
  products        Product[]

  @@map("farmers")
}

model FarmerSkill {
  id        String  @id @default(uuid())
  farmerId  String
  farmer    Farmer  @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  name      String

  @@unique([farmerId, name])
  @@map("farmer_skills")
}

model FarmerCertification {
  id        String  @id @default(uuid())
  farmerId  String
  farmer    Farmer  @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  name      String
  issuer    String
  year      String

  @@map("farmer_certifications")
}

model FarmerGallery {
  id        String  @id @default(uuid())
  farmerId  String
  farmer    Farmer  @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  url       String
  caption   String?
  type      String  @default("image") // "image" | "video"
  order     Int     @default(0)

  @@map("farmer_gallery")
}

model FarmerService {
  id          String  @id @default(uuid())
  farmerId    String
  farmer      Farmer  @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  title       String
  description String?
  price       String  // e.g. "Rp 5.000.000", "Nego"
  icon        String? // icon identifier

  @@map("farmer_services")
}

model FarmerReview {
  id        String   @id @default(uuid())
  farmerId  String
  farmer    Farmer   @relation(fields: [farmerId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rating    Int      // 1-5
  content   String   @db.Text
  createdAt DateTime @default(now())

  @@unique([farmerId, userId]) // one review per user per farmer
  @@map("farmer_reviews")
}

// ========================
// FORUM
// ========================

model ForumPost {
  id          String    @id @default(uuid())
  authorId    String
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)

  title       String
  content     String    @db.Text // Markdown content
  excerpt     String?   @db.Text
  category    String    // "tips", "question", "discussion", "showcase", "problem", "news"
  isDraft     Boolean   @default(false)
  isHot       Boolean   @default(false)

  // Stats (cached)
  likeCount   Int       @default(0)
  viewCount   Int       @default(0)
  replyCount  Int       @default(0)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  tags        PostTag[]
  images      PostImage[]
  comments    ForumComment[]
  likes       PostLike[]
  bookmarks   Bookmark[]

  @@map("forum_posts")
}

model PostTag {
  id      String    @id @default(uuid())
  postId  String
  post    ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  name    String

  @@unique([postId, name])
  @@map("post_tags")
}

model PostImage {
  id      String    @id @default(uuid())
  postId  String
  post    ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  url     String
  order   Int       @default(0)

  @@map("post_images")
}

model PostLike {
  id      String    @id @default(uuid())
  postId  String
  post    ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  userId  String
  user    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@map("post_likes")
}

model Bookmark {
  id      String    @id @default(uuid())
  postId  String
  post    ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  userId  String
  user    User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([postId, userId])
  @@map("bookmarks")
}

model ForumComment {
  id            String    @id @default(uuid())
  postId        String
  post          ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId      String
  author        User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  parentId      String?   // null = top-level, otherwise nested reply
  parent        ForumComment?   @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies       ForumComment[]  @relation("CommentReplies")

  content       String    @db.Text
  isBestAnswer  Boolean   @default(false)
  likeCount     Int       @default(0)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  likes         CommentLike[]

  @@map("forum_comments")
}

model CommentLike {
  id        String       @id @default(uuid())
  commentId String
  comment   ForumComment @relation(fields: [commentId], references: [id], onDelete: Cascade)
  userId    String
  user      User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([commentId, userId])
  @@map("comment_likes")
}

// ========================
// MARKETPLACE / PRODUCTS
// ========================

model Product {
  id              String    @id @default(uuid())
  sellerId        String
  seller          User      @relation(fields: [sellerId], references: [id], onDelete: Cascade)
  farmerId        String?
  farmer          Farmer?   @relation(fields: [farmerId], references: [id], onDelete: SetNull)

  name            String
  description     String    @db.Text
  category        String    // "fresh", "spawn", "substrate", "equipment", "processed", "other"
  condition       String    // "fresh", "dried", "frozen", "processed", "new", "used"

  price           Int       // in IDR (Rupiah), stored as integer
  originalPrice   Int?      // for discount display
  unit            String    // "kg", "gram", "pack", "bag", "pcs", "set", "unit"
  stock           Int
  minOrder        Int       @default(1)
  weight          Int?      // in grams

  // Location & Contact
  location        String
  whatsapp        String

  // Status
  isDraft         Boolean   @default(false)
  isActive        Boolean   @default(true)

  // Stats (cached)
  rating          Float     @default(0)
  reviewCount     Int       @default(0)
  soldCount       Int       @default(0)

  // Badges
  badge           String?   // "Terlaris", "Baru", "Promo"

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  images          ProductImage[]
  specifications  ProductSpecification[]
  reviews         ProductReview[]
  wishlist        Wishlist[]

  @@map("products")
}

model ProductImage {
  id        String  @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  isMain    Boolean @default(false)
  order     Int     @default(0)

  @@map("product_images")
}

model ProductSpecification {
  id        String  @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  label     String
  value     String

  @@map("product_specifications")
}

model ProductReview {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  rating    Int      // 1-5
  content   String   @db.Text
  helpful   Int      @default(0)
  createdAt DateTime @default(now())

  @@unique([productId, userId])
  @@map("product_reviews")
}

model Wishlist {
  id        String   @id @default(uuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([productId, userId])
  @@map("wishlist")
}

// ========================
// CHAT / MESSAGING
// ========================

model Conversation {
  id        String    @id @default(uuid())
  productId String?   // optional: conversation can be about a product
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  participants ConversationParticipant[]
  messages     Message[]

  @@map("conversations")
}

model ConversationParticipant {
  id             String       @id @default(uuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  userId         String
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  unreadCount    Int          @default(0)
  lastReadAt     DateTime?

  @@unique([conversationId, userId])
  @@map("conversation_participants")
}

model Message {
  id             String       @id @default(uuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  senderId       String
  sender         User         @relation(fields: [senderId], references: [id], onDelete: Cascade)

  content        String       @db.Text
  type           String       @default("text") // "text", "image", "file", "product_card"
  metadata       Json?        // extra data, e.g. product reference

  createdAt      DateTime     @default(now())

  @@map("messages")
}
```

---

## 3. Authentication & Authorization

### Supabase Auth Flow

1. **Register** → Frontend memanggil `POST /api/auth/register` → Backend membuat user di Supabase Auth + insert ke tabel User via Prisma
2. **Login** → Frontend memanggil `POST /api/auth/login` → Backend memverifikasi via Supabase Auth → return JWT tokens
3. **Protected Routes** → Frontend mengirim `Authorization: Bearer <access_token>` → Middleware memverifikasi JWT via Supabase → inject `req.user`

### Roles

| Role       | Deskripsi                          |
| ---------- | ---------------------------------- |
| `user`     | User biasa, bisa akses forum/chat  |
| `farmer`   | User yang sudah register as farmer |
| `verified` | Farmer yang sudah diverifikasi     |
| `admin`    | Admin platform (opsional)          |

### Middleware

```typescript
// auth.ts middleware
interface AuthRequest extends Request {
  user?: {
    id: string; // User.id (Prisma)
    supabaseId: string;
    email: string;
    isFarmer: boolean;
  };
}
```

---

## 4. API Endpoints

> **Base URL:** `/api/v1`
> **Auth Header:** `Authorization: Bearer <supabase_access_token>`

---

### 4.1 Auth

#### `POST /api/v1/auth/register`

Registrasi user baru.

**Request Body:**

```json
{
  "fullName": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required)",
  "password": "string (required, min 8 chars, must contain uppercase, lowercase, number)"
}
```

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "Pak Hendra",
      "email": "hendra@email.com",
      "phone": "+6281234567890",
      "avatar": null,
      "isFarmer": false,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "session": {
      "accessToken": "eyJ...",
      "refreshToken": "xxx",
      "expiresAt": 1234567890
    }
  }
}
```

---

#### `POST /api/v1/auth/login`

Login user.

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "Pak Hendra",
      "email": "hendra@email.com",
      "phone": "+6281234567890",
      "avatar": null,
      "isFarmer": true,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "session": {
      "accessToken": "eyJ...",
      "refreshToken": "xxx",
      "expiresAt": 1234567890
    }
  }
}
```

---

#### `POST /api/v1/auth/logout`

Logout (invalidate session). **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### `POST /api/v1/auth/refresh`

Refresh access token.

**Request Body:**

```json
{
  "refreshToken": "string (required)"
}
```

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "xxx",
    "expiresAt": 1234567890
  }
}
```

---

#### `POST /api/v1/auth/google`

OAuth login/register via Google.

**Request Body:**

```json
{
  "idToken": "string (Google OAuth ID token)"
}
```

**Response `200`:** Same as login response.

---

### 4.2 Users

#### `GET /api/v1/users/me`

Ambil profil user yang sedang login. **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Pak Hendra",
    "email": "hendra@email.com",
    "phone": "+6281234567890",
    "avatar": "https://supabase.co/storage/...",
    "isFarmer": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "farmer": {
      "id": "uuid",
      "specialty": "Jamur Tiram",
      "isVerified": true
    }
  }
}
```

---

#### `PATCH /api/v1/users/me`

Update profil user. **Requires Auth.**

**Request Body (partial):**

```json
{
  "fullName": "string (optional)",
  "phone": "string (optional)",
  "avatar": "string (optional, URL)"
}
```

**Response `200`:**

```json
{
  "success": true,
  "data": { "...updated user object" }
}
```

---

#### `GET /api/v1/users/:id`

Ambil profil public user.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Pak Hendra",
    "avatar": "...",
    "isFarmer": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "stats": {
      "forumPosts": 45,
      "reputation": 2350
    }
  }
}
```

---

### 4.3 Farmers

#### `GET /api/v1/farmers`

List semua petani dengan filter & pagination.

**Query Params:**

| Param      | Type   | Description                                                          |
| ---------- | ------ | -------------------------------------------------------------------- |
| `search`   | string | Search by name, specialty, location                                  |
| `category` | string | Filter: `all`, `mentor`, `partner`, `verified`                       |
| `region`   | string | Filter by region (e.g. "Jawa Barat")                                 |
| `page`     | number | Page number (default: 1)                                             |
| `limit`    | number | Items per page (default: 12)                                         |
| `sort`     | string | Sort: `rating`, `newest`, `experience`, `students` (default: rating) |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "farmers": [
      {
        "id": "uuid",
        "fullName": "Pak Hendra Wijaya",
        "avatar": "HW",
        "location": "Bandung, Jawa Barat",
        "specialty": "Jamur Tiram",
        "experience": "15 tahun",
        "rating": 4.9,
        "reviewCount": 127,
        "isVerified": true,
        "isMentor": true,
        "isPartner": true,
        "bio": "Petani jamur profesional...",
        "studentCount": 156
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 150,
      "totalPages": 13
    }
  }
}
```

---

#### `GET /api/v1/farmers/:id`

Detail lengkap satu petani.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Pak Hendra Wijaya",
    "email": "hendra@fungifarm.id",
    "phone": "+62 812-3456-7890",
    "whatsapp": "+62 812-3456-7890",
    "location": "Bandung, Jawa Barat",
    "address": "Jl. Dago Pakar No. 45, Cimenyan, Bandung",
    "region": "Jawa Barat",
    "specialty": "Jamur Tiram",
    "experience": "15 tahun",
    "bio": "...",
    "fullBio": "...",
    "website": "www.fungifarm-bandung.com",
    "farmSize": "2000 m²",
    "totalHarvest": "25,000+ kg",
    "isMentor": true,
    "isPartner": true,
    "isConsultant": false,
    "isVerified": true,
    "rating": 4.9,
    "reviewCount": 127,
    "studentCount": 156,
    "successStories": 45,
    "lastActiveAt": "2024-01-01T10:00:00Z",
    "joinedDate": "2020-01-01T00:00:00Z",
    "socialMedia": {
      "instagram": "@fungifarm_bandung",
      "youtube": "FungiFarm Bandung",
      "facebook": "FungiFarm Bandung Official"
    },
    "skills": ["Budidaya Jamur Tiram", "Budidaya Shiitake", "Manajemen Farm"],
    "certifications": [
      {
        "id": "uuid",
        "name": "Sertifikat Organik Indonesia",
        "issuer": "Lembaga Sertifikasi Organik",
        "year": "2023"
      }
    ],
    "gallery": [
      {
        "id": "uuid",
        "url": "https://...",
        "caption": "Area produksi utama",
        "type": "image"
      }
    ],
    "services": [
      {
        "id": "uuid",
        "title": "Mentoring Pemula",
        "description": "Program pendampingan 3 bulan untuk petani pemula",
        "price": "Rp 5.000.000"
      }
    ]
  }
}
```

---

#### `POST /api/v1/farmers`

Register sebagai petani. **Requires Auth** (user biasa).

**Request Body:**

```json
{
  "fullName": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "whatsapp": "string (required)",
  "region": "string (required)",
  "city": "string (required)",
  "address": "string (optional)",
  "specialty": "string (required)",
  "experience": "string (required)",
  "bio": "string (optional)",
  "isMentor": "boolean (default: false)",
  "isPartner": "boolean (default: false)",
  "isConsultant": "boolean (default: false)",
  "skills": ["string array (optional)"],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "year": "string"
    }
  ],
  "gallery": ["file uploads handled via /api/v1/upload"]
}
```

**Response `201`:**

```json
{
  "success": true,
  "data": { "...farmer object" },
  "message": "Pendaftaran petani berhasil! Menunggu verifikasi."
}
```

**Side Effect:** Update `User.isFarmer = true`

---

#### `PATCH /api/v1/farmers/:id`

Update profil petani. **Requires Auth** (owner only).

**Request Body (partial):** Same fields as POST, all optional.

**Response `200`:**

```json
{
  "success": true,
  "data": { "...updated farmer object" }
}
```

---

### 4.4 Farmer Reviews

#### `GET /api/v1/farmers/:farmerId/reviews`

List reviews untuk satu petani.

**Query Params:**

| Param   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `page`  | number | Page number (default: 1)     |
| `limit` | number | Items per page (default: 10) |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "content": "Pak Hendra adalah mentor yang sangat sabar...",
        "createdAt": "2024-01-01T00:00:00Z",
        "user": {
          "id": "uuid",
          "fullName": "Bu Siti Rahayu",
          "avatar": "SR"
        }
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 127, "totalPages": 13 },
    "averageRating": 4.9
  }
}
```

---

#### `POST /api/v1/farmers/:farmerId/reviews`

Buat review untuk petani. **Requires Auth.**

**Request Body:**

```json
{
  "rating": "number (1-5, required)",
  "content": "string (required, min 10 chars)"
}
```

**Response `201`:** Review object.

---

### 4.5 Farmer Services

#### `GET /api/v1/farmers/:farmerId/services`

List layanan yang ditawarkan petani.

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Mentoring Pemula",
      "description": "Program pendampingan 3 bulan untuk petani pemula",
      "price": "Rp 5.000.000",
      "icon": "GraduationCap"
    }
  ]
}
```

---

#### `POST /api/v1/farmers/:farmerId/services`

Tambah layanan. **Requires Auth** (farmer owner only).

**Request Body:**

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "price": "string (required)",
  "icon": "string (optional)"
}
```

---

#### `PATCH /api/v1/farmers/:farmerId/services/:serviceId`

Update layanan. **Requires Auth** (farmer owner only).

---

#### `DELETE /api/v1/farmers/:farmerId/services/:serviceId`

Hapus layanan. **Requires Auth** (farmer owner only).

---

### 4.6 Forum Posts

#### `GET /api/v1/forum/posts`

List semua post forum dengan filter & pagination.

**Query Params:**

| Param      | Type   | Description                                                                    |
| ---------- | ------ | ------------------------------------------------------------------------------ |
| `search`   | string | Search by title, content                                                       |
| `category` | string | Filter: `all`, `tips`, `question`, `discussion`, `showcase`, `problem`, `news` |
| `sort`     | string | Sort: `newest`, `popular`, `unanswered` (default: newest)                      |
| `page`     | number | Page number (default: 1)                                                       |
| `limit`    | number | Items per page (default: 10)                                                   |
| `tag`      | string | Filter by tag name                                                             |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Tips Budidaya Jamur Tiram untuk Pemula...",
        "excerpt": "Berikut beberapa tips...",
        "category": "tips",
        "isHot": true,
        "likeCount": 234,
        "viewCount": 5678,
        "replyCount": 45,
        "createdAt": "2024-01-01T00:00:00Z",
        "author": {
          "id": "uuid",
          "fullName": "Pak Hendra",
          "avatar": "HW"
        },
        "tags": ["budidaya", "pemula", "tiram"]
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 500, "totalPages": 50 }
  }
}
```

---

#### `GET /api/v1/forum/posts/:id`

Detail satu post forum (increment viewCount).

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tips Budidaya Jamur Tiram untuk Pemula",
    "content": "## Markdown content here...",
    "category": "tips",
    "isHot": true,
    "likeCount": 234,
    "viewCount": 5679,
    "replyCount": 45,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-02T00:00:00Z",
    "author": {
      "id": "uuid",
      "fullName": "Pak Hendra Wijaya",
      "avatar": "HW",
      "bio": "Petani jamur profesional...",
      "postCount": 45,
      "reputation": 2350,
      "memberSince": "2020-01-01T00:00:00Z"
    },
    "tags": ["budidaya", "pemula", "tiram"],
    "images": [{ "id": "uuid", "url": "https://..." }],
    "isLiked": false,
    "isBookmarked": false,
    "relatedPosts": [
      {
        "id": "uuid",
        "title": "Cara Membuat Kumbung...",
        "author": "Mas Agus",
        "replyCount": 23,
        "timeAgo": "3 hari lalu"
      }
    ]
  }
}
```

---

#### `POST /api/v1/forum/posts`

Buat post baru (atau simpan draft). **Requires Auth.**

**Request Body:**

```json
{
  "title": "string (required, max 150 chars)",
  "content": "string (required, min 50 chars, markdown)",
  "category": "string (required: tips|question|discussion|showcase|problem|news)",
  "tags": ["string array (optional, max 5)"],
  "images": ["string array (URLs, optional, max 5)"],
  "isDraft": "boolean (default: false)"
}
```

**Response `201`:**

```json
{
  "success": true,
  "data": { "...post object" }
}
```

---

#### `PATCH /api/v1/forum/posts/:id`

Update post. **Requires Auth** (author only).

**Request Body (partial):** Same fields as POST, all optional.

---

#### `DELETE /api/v1/forum/posts/:id`

Hapus post. **Requires Auth** (author only).

---

#### `POST /api/v1/forum/posts/:id/like`

Toggle like pada post. **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likeCount": 235
  }
}
```

---

#### `POST /api/v1/forum/posts/:id/bookmark`

Toggle bookmark pada post. **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "isBookmarked": true
  }
}
```

---

### 4.7 Forum Comments

#### `GET /api/v1/forum/posts/:postId/comments`

List comments pada post (termasuk nested replies).

**Query Params:**

| Param   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `page`  | number | Page number (default: 1)     |
| `limit` | number | Items per page (default: 20) |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid",
        "content": "Terima kasih tipsnya...",
        "isBestAnswer": false,
        "likeCount": 12,
        "createdAt": "2024-01-01T00:00:00Z",
        "author": {
          "id": "uuid",
          "fullName": "Bu Siti",
          "avatar": "BS",
          "isPostAuthor": false
        },
        "replies": [
          {
            "id": "uuid",
            "content": "Sama-sama bu...",
            "likeCount": 5,
            "createdAt": "2024-01-01T01:00:00Z",
            "author": {
              "id": "uuid",
              "fullName": "Pak Hendra",
              "avatar": "HW",
              "isPostAuthor": true
            }
          }
        ]
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 45, "totalPages": 3 }
  }
}
```

---

#### `POST /api/v1/forum/posts/:postId/comments`

Buat comment baru atau reply. **Requires Auth.**

**Request Body:**

```json
{
  "content": "string (required)",
  "parentId": "string (optional, uuid — if replying to another comment)"
}
```

**Response `201`:** Comment object.

---

#### `POST /api/v1/forum/comments/:commentId/like`

Toggle like pada comment. **Requires Auth.**

---

#### `PATCH /api/v1/forum/comments/:commentId/best-answer`

Mark comment as best answer. **Requires Auth** (post author only).

---

#### `POST /api/v1/forum/comments/:commentId/report`

Report comment. **Requires Auth.**

**Request Body:**

```json
{
  "reason": "string (required)"
}
```

---

### 4.8 Products (Marketplace)

#### `GET /api/v1/products`

List semua produk marketplace dengan filter & pagination.

**Query Params:**

| Param      | Type   | Description                                                                     |
| ---------- | ------ | ------------------------------------------------------------------------------- |
| `search`   | string | Search by name, description                                                     |
| `category` | string | Filter: `all`, `fresh`, `spawn`, `substrate`, `equipment`, `processed`, `other` |
| `minPrice` | number | Min price (IDR)                                                                 |
| `maxPrice` | number | Max price (IDR)                                                                 |
| `location` | string | Filter by seller location                                                       |
| `sort`     | string | Sort: `newest`, `cheapest`, `expensive`, `rating`, `popular`                    |
| `page`     | number | Page number (default: 1)                                                        |
| `limit`    | number | Items per page (default: 12)                                                    |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Jamur Tiram Segar Premium",
        "price": 35000,
        "originalPrice": 45000,
        "unit": "/kg",
        "rating": 4.8,
        "reviewCount": 56,
        "soldCount": 234,
        "badge": "Terlaris",
        "location": "Bandung, Jawa Barat",
        "mainImage": "https://...",
        "seller": {
          "id": "uuid",
          "fullName": "Pak Hendra",
          "avatar": "HW"
        },
        "isWishlisted": false
      }
    ],
    "pagination": { "page": 1, "limit": 12, "total": 100, "totalPages": 9 }
  }
}
```

---

#### `GET /api/v1/products/:id`

Detail satu produk.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Jamur Tiram Segar Premium",
    "description": "Jamur tiram segar berkualitas premium...",
    "category": "fresh",
    "condition": "fresh",
    "price": 35000,
    "originalPrice": 45000,
    "unit": "/kg",
    "stock": 500,
    "minOrder": 1,
    "weight": 1000,
    "location": "Bandung, Jawa Barat",
    "whatsapp": "+6281234567890",
    "badge": "Terlaris",
    "rating": 4.8,
    "reviewCount": 56,
    "soldCount": 234,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "images": [
      { "id": "uuid", "url": "https://...", "isMain": true, "order": 0 },
      { "id": "uuid", "url": "https://...", "isMain": false, "order": 1 }
    ],
    "specifications": [
      { "label": "Jenis", "value": "Pleurotus ostreatus" },
      { "label": "Metode Budidaya", "value": "Baglog" },
      { "label": "Masa Simpan", "value": "5-7 hari (suhu ruang)" }
    ],
    "seller": {
      "id": "uuid",
      "name": "Pak Hendra Wijaya",
      "avatar": "HW",
      "location": "Bandung, Jawa Barat",
      "rating": 4.9,
      "reviewCount": 127,
      "productCount": 15,
      "joinedDate": "2020-01-01",
      "responseRate": "98%",
      "responseTime": "< 1 jam",
      "isVerified": true
    },
    "isWishlisted": false,
    "relatedProducts": [
      {
        "id": "uuid",
        "name": "Bibit Shiitake",
        "price": 25000,
        "unit": "/pack",
        "rating": 4.7,
        "soldCount": 123,
        "mainImage": "https://..."
      }
    ]
  }
}
```

---

#### `POST /api/v1/products`

Buat produk baru. **Requires Auth** (user only, preferably farmer).

**Request Body:**

```json
{
  "name": "string (required, max 100 chars)",
  "description": "string (required)",
  "category": "string (required: fresh|spawn|substrate|equipment|processed|other)",
  "condition": "string (required: fresh|dried|frozen|processed|new|used)",
  "price": "number (required, IDR)",
  "originalPrice": "number (optional, IDR)",
  "unit": "string (required: kg|gram|pack|bag|pcs|set|unit)",
  "stock": "number (required, min 1)",
  "minOrder": "number (optional, default 1)",
  "weight": "number (optional, grams)",
  "location": "string (required)",
  "whatsapp": "string (required)",
  "specifications": [{ "label": "string", "value": "string" }],
  "images": ["string array (URLs from upload endpoint, max 8, first is main)"],
  "isDraft": "boolean (default: false)"
}
```

**Response `201`:** Product object.

---

#### `PATCH /api/v1/products/:id`

Update produk. **Requires Auth** (seller only).

---

#### `DELETE /api/v1/products/:id`

Hapus produk. **Requires Auth** (seller only).

---

#### `POST /api/v1/products/:id/wishlist`

Toggle wishlist pada produk. **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "isWishlisted": true
  }
}
```

---

### 4.9 Product Reviews

#### `GET /api/v1/products/:productId/reviews`

List reviews untuk produk.

**Query Params:**

| Param   | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| `page`  | number | Page number (default: 1)     |
| `limit` | number | Items per page (default: 10) |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "content": "Kualitas jamurnya sangat bagus...",
        "helpful": 12,
        "createdAt": "2024-01-01T00:00:00Z",
        "user": {
          "id": "uuid",
          "fullName": "Bu Siti",
          "avatar": "BS"
        }
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 56, "totalPages": 6 },
    "averageRating": 4.8
  }
}
```

---

#### `POST /api/v1/products/:productId/reviews`

Buat review produk. **Requires Auth.**

**Request Body:**

```json
{
  "rating": "number (1-5, required)",
  "content": "string (required)"
}
```

---

#### `POST /api/v1/products/:productId/reviews/:reviewId/helpful`

Mark review sebagai helpful. **Requires Auth.**

---

### 4.10 Chat / Messaging

#### `GET /api/v1/conversations`

List semua conversations user. **Requires Auth.**

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "lastMessage": {
        "content": "Baik pak, saya konfirmasi ya...",
        "createdAt": "2024-01-01T10:30:00Z",
        "senderId": "uuid"
      },
      "unreadCount": 2,
      "participant": {
        "id": "uuid",
        "fullName": "Pak Agus",
        "avatar": "PA",
        "isOnline": true,
        "isVerified": true
      },
      "product": {
        "id": "uuid",
        "name": "Jamur Tiram Segar",
        "price": 35000,
        "mainImage": "https://..."
      }
    }
  ]
}
```

---

#### `GET /api/v1/conversations/:id/messages`

List messages dalam conversation. **Requires Auth** (participant only).

**Query Params:**

| Param    | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| `page`   | number | Page number (default: 1)      |
| `limit`  | number | Items per page (default: 50)  |
| `before` | string | Cursor: message ID for keyset |

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "Halo pak, saya tertarik dengan jamur tiramnya",
        "type": "text",
        "createdAt": "2024-01-01T10:00:00Z"
      },
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "",
        "type": "product_card",
        "metadata": {
          "productId": "uuid",
          "name": "Jamur Tiram Segar",
          "price": 35000,
          "image": "https://..."
        },
        "createdAt": "2024-01-01T10:00:01Z"
      }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 23, "totalPages": 1 }
  }
}
```

---

#### `POST /api/v1/conversations`

Buat atau ambil conversation yang sudah ada (upsert). **Requires Auth.**

**Request Body:**

```json
{
  "participantId": "string (required, userId of other person)",
  "productId": "string (optional, product being discussed)"
}
```

**Response `200/201`:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isNew": true
  }
}
```

---

#### `POST /api/v1/conversations/:id/messages`

Kirim pesan. **Requires Auth** (participant only).

**Request Body:**

```json
{
  "content": "string (required)",
  "type": "string (default: text — text|image|file|product_card)",
  "metadata": "object (optional, for product_card or file references)"
}
```

**Response `201`:** Message object.

---

#### `PATCH /api/v1/conversations/:id/read`

Mark conversation as read. **Requires Auth** (participant only).

**Response `200`:**

```json
{
  "success": true,
  "data": { "unreadCount": 0 }
}
```

---

#### `POST /api/v1/conversations/:id/report`

Report seller/conversation. **Requires Auth.**

**Request Body:**

```json
{
  "reason": "string (required)"
}
```

---

### 4.11 Upload (Images/Files)

#### `POST /api/v1/upload`

Upload file (gambar/video) ke Supabase Storage. **Requires Auth.**

**Request:** `multipart/form-data`

| Field    | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| `file`   | File   | File to upload                                            |
| `bucket` | string | Storage bucket: `avatars`, `products`, `forum`, `farmers` |

**Constraints:**

- Images: JPG, PNG, WebP — max 5MB
- Videos: MP4 — max 50MB

**Response `201`:**

```json
{
  "success": true,
  "data": {
    "url": "https://xxx.supabase.co/storage/v1/object/public/products/abc123.jpg",
    "path": "products/abc123.jpg",
    "size": 204800,
    "mimeType": "image/jpeg"
  }
}
```

---

#### `DELETE /api/v1/upload`

Delete file dari Supabase Storage. **Requires Auth.**

**Request Body:**

```json
{
  "path": "string (required, e.g. products/abc123.jpg)"
}
```

---

### 4.12 Community

#### `GET /api/v1/community/stats`

Statistik keseluruhan komunitas.

**Response `200`:**

```json
{
  "success": true,
  "data": {
    "totalMembers": 12847,
    "verifiedSellers": 3421,
    "regionsCovered": 34,
    "newThisMonth": 847
  }
}
```

---

#### `GET /api/v1/community/top-farmers`

Top farmers bulan ini.

**Query Params:** `limit` (default: 10)

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "fullName": "Pak Hendra",
      "avatar": "HW",
      "location": "Bandung, West Java",
      "specialty": "Oyster Mushrooms",
      "postCount": 234,
      "salesCount": 567,
      "rating": 4.9,
      "isVerified": true,
      "bio": "15 years of mushroom farming..."
    }
  ]
}
```

---

#### `GET /api/v1/community/regions`

List regions dengan jumlah petani.

**Response `200`:**

```json
{
  "success": true,
  "data": [
    { "name": "Jawa Barat", "farmerCount": 3421, "icon": "🏔️" },
    { "name": "Jawa Timur", "farmerCount": 2890, "icon": "🌾" }
  ]
}
```

---

#### `GET /api/v1/community/recent-members`

Member terbaru yang bergabung.

**Query Params:** `limit` (default: 10)

**Response `200`:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "fullName": "Ibu Maya",
      "avatar": "IM",
      "location": "Jakarta",
      "joinedAgo": "2 hours ago",
      "createdAt": "2024-01-01T08:00:00Z"
    }
  ]
}
```

---

## 5. Response Format

### Success Response

```json
{
  "success": true,
  "data": { "..." },
  "message": "Optional success message"
}
```

### Paginated Response

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": [{ "field": "email", "message": "Email is required" }]
  }
}
```

---

## 6. Error Codes

| HTTP Code | Error Code          | Description                       |
| --------- | ------------------- | --------------------------------- |
| 400       | `VALIDATION_ERROR`  | Request body/params tidak valid   |
| 401       | `UNAUTHORIZED`      | Token missing atau expired        |
| 403       | `FORBIDDEN`         | Tidak punya akses ke resource ini |
| 404       | `NOT_FOUND`         | Resource tidak ditemukan          |
| 409       | `CONFLICT`          | Duplikat (e.g. user sudah review) |
| 413       | `FILE_TOO_LARGE`    | File melebihi batas ukuran        |
| 415       | `UNSUPPORTED_TYPE`  | Tipe file tidak didukung          |
| 429       | `TOO_MANY_REQUESTS` | Rate limit exceeded               |
| 500       | `INTERNAL_ERROR`    | Server error                      |

---

## 7. Prompt untuk Vibe Coding

Salin prompt berikut ke AI coding assistant Anda untuk mulai membangun backend:

---

### 🚀 PROMPT

```
Kamu adalah senior backend developer. Buatkan backend REST API untuk aplikasi FungiFarm
(platform komunitas & marketplace petani jamur Indonesia) menggunakan:

- **Express.js** (TypeScript)
- **Prisma ORM** (PostgreSQL, hosted di Supabase)
- **Supabase Auth** untuk authentication (JWT verification)
- **Supabase Storage** untuk file upload (images/videos)
- **Zod** untuk request validation

### Arsitektur:
- Pattern: Controller → Service → Prisma
- Middleware: auth (Supabase JWT verify), validate (Zod), errorHandler
- Semua response menggunakan format: { success, data, message?, error? }
- Pagination standar: { page, limit, total, totalPages }
- CORS configured untuk frontend origin

### Database (Prisma Schema):
Buat schema lengkap dengan model berikut:
1. **User** — id, supabaseId, fullName, email, phone, avatar, isFarmer, timestamps
2. **Farmer** — userId (1:1 User), fullName, email, phone, whatsapp, region, city, address, specialty, experience, bio, fullBio, website, farmSize, totalHarvest, isMentor, isPartner, isConsultant, isVerified, rating, reviewCount, studentCount, successStories, social media fields, timestamps
3. **FarmerSkill** — farmerId, name
4. **FarmerCertification** — farmerId, name, issuer, year
5. **FarmerGallery** — farmerId, url, caption, type (image/video), order
6. **FarmerService** — farmerId, title, description, price, icon
7. **FarmerReview** — farmerId, userId, rating (1-5), content, timestamps (unique per user-farmer)
8. **ForumPost** — authorId, title, content (markdown), excerpt, category (tips/question/discussion/showcase/problem/news), isDraft, isHot, likeCount, viewCount, replyCount, timestamps
9. **PostTag** — postId, name
10. **PostImage** — postId, url, order
11. **PostLike** — postId, userId (unique)
12. **Bookmark** — postId, userId (unique)
13. **ForumComment** — postId, authorId, parentId (self-relation for nested replies), content, isBestAnswer, likeCount, timestamps
14. **CommentLike** — commentId, userId (unique)
15. **Product** — sellerId, farmerId?, name, description, category (fresh/spawn/substrate/equipment/processed/other), condition, price (Int IDR), originalPrice, unit, stock, minOrder, weight, location, whatsapp, isDraft, isActive, rating, reviewCount, soldCount, badge, timestamps
16. **ProductImage** — productId, url, isMain, order
17. **ProductSpecification** — productId, label, value
18. **ProductReview** — productId, userId, rating (1-5), content, helpful count, timestamps (unique per user-product)
19. **Wishlist** — productId, userId (unique)
20. **Conversation** — productId?, timestamps
21. **ConversationParticipant** — conversationId, userId, unreadCount, lastReadAt
22. **Message** — conversationId, senderId, content, type (text/image/file/product_card), metadata (Json), timestamps

### Endpoints yang harus dibuat:

**Auth:**
- POST /auth/register — register dengan fullName, email, phone, password
- POST /auth/login — login dengan email, password
- POST /auth/logout — invalidate session
- POST /auth/refresh — refresh token
- POST /auth/google — Google OAuth

**Users:**
- GET /users/me — profil sendiri
- PATCH /users/me — update profil
- GET /users/:id — profil public

**Farmers:**
- GET /farmers — list dengan search, filter (category, region), sort, pagination
- GET /farmers/:id — detail lengkap (skills, certifications, gallery, services, reviews)
- POST /farmers — register sebagai petani (requires auth, set user.isFarmer=true)
- PATCH /farmers/:id — update profil petani (owner only)

**Farmer Reviews:**
- GET /farmers/:farmerId/reviews — list reviews + averageRating
- POST /farmers/:farmerId/reviews — buat review (1 per user)

**Farmer Services:**
- GET /farmers/:farmerId/services — list layanan
- POST/PATCH/DELETE /farmers/:farmerId/services/:id — CRUD (owner only)

**Forum:**
- GET /forum/posts — list dengan search, category, sort, tag filter, pagination
- GET /forum/posts/:id — detail + increment viewCount + relatedPosts
- POST /forum/posts — buat post/draft
- PATCH /forum/posts/:id — update (author only)
- DELETE /forum/posts/:id — hapus (author only)
- POST /forum/posts/:id/like — toggle like
- POST /forum/posts/:id/bookmark — toggle bookmark

**Forum Comments:**
- GET /forum/posts/:postId/comments — list nested (parent + replies)
- POST /forum/posts/:postId/comments — buat comment (support parentId for replies)
- POST /forum/comments/:id/like — toggle like
- PATCH /forum/comments/:id/best-answer — mark best answer (post author only)
- POST /forum/comments/:id/report — report

**Products:**
- GET /products — list dengan search, category, price range, location, sort, pagination
- GET /products/:id — detail + seller info + relatedProducts
- POST /products — buat produk/draft
- PATCH /products/:id — update (seller only)
- DELETE /products/:id — hapus (seller only)
- POST /products/:id/wishlist — toggle wishlist

**Product Reviews:**
- GET /products/:productId/reviews — list + averageRating
- POST /products/:productId/reviews — buat review (1 per user)
- POST /products/:productId/reviews/:id/helpful — mark helpful

**Chat:**
- GET /conversations — list conversations
- POST /conversations — create/upsert conversation
- GET /conversations/:id/messages — list messages
- POST /conversations/:id/messages — send message
- PATCH /conversations/:id/read — mark as read
- POST /conversations/:id/report — report

**Upload:**
- POST /upload — upload file ke Supabase Storage (multipart)
- DELETE /upload — hapus file

**Community:**
- GET /community/stats — total members, verified sellers, regions, new this month
- GET /community/top-farmers — top farmers bulan ini
- GET /community/regions — list regions + farmer count
- GET /community/recent-members — member terbaru

### Catatan penting:
- Semua endpoint /auth/* tidak perlu auth middleware kecuali /logout
- Image upload via Supabase Storage, return public URL
- Nested comments (ForumComment) support 1 level deep replies
- Product price disimpan dalam integer (IDR), frontend yang format
- Forum content support Markdown
- Implement rate limiting pada auth endpoints
- Gunakan try-catch di controller, throw ke global error handler
- Setiap "create" endpoint return 201, "update" 200, "delete" 204
- Implement pagination helper reusable
- Buat seed data untuk testing

Mulai dengan:
1. Setup project (package.json, tsconfig, folder structure)
2. Prisma schema + migration
3. Auth middleware (Supabase JWT)
4. Routes, controllers, services untuk setiap domain
5. Validation schemas (Zod)
6. Error handling
7. Seed data
```

---

> **Dokumen ini mencakup seluruh fitur frontend FungiFarm** termasuk: Auth (login/register/Google OAuth), User profiles, Farmer registration & profiles, Farmer reviews & services, Forum (posts, comments, likes, bookmarks, tags), Marketplace (products, reviews, wishlist, specifications), Chat/messaging, File upload, dan Community stats. Total **50+ endpoints**.
