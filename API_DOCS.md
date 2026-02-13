# JapriHub API Documentation

> **Base URL:** `http://localhost:3001/api/v1`  
> **Authentication:** Bearer Token (Supabase JWT)

---

## Table of Contents

- [General Information](#general-information)
- [Authentication](#authentication)
- [Users](#users)
- [Farmers](#farmers)
- [Forum](#forum)
- [Products](#products)
- [Chat / Conversations](#chat--conversations)
- [Upload](#upload)
- [Community](#community)
- [Error Handling](#error-handling)

---

## General Information

### Response Format

Semua response menggunakan format JSON yang konsisten:

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Deskripsi error",
    "details": []
  }
}
```

### Pagination

Endpoint yang mengembalikan list data menggunakan pagination:

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|-------------------------|
| `page` | number | 1 | Halaman (min: 1) |
| `limit` | number | varies | Item per halaman (max: 100) |

**Pagination Response:**

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Authentication Headers

Untuk endpoint yang memerlukan autentikasi, kirim header:

```
Authorization: Bearer <accessToken>
```

- **Auth Required** = Wajib login, return 401 jika tidak ada token
- **Optional Auth** = Opsional, data tambahan (isLiked, isWishlisted) jika login
- **Public** = Tidak perlu token

---

## Authentication

### POST `/auth/register`

Registrasi user baru.

**Auth:** Public

**Request Body:**

```json
{
  "fullName": "string (min 2 karakter)",
  "email": "string (format email valid)",
  "phone": "string (min 10 digit)",
  "password": "string (min 8 karakter, harus ada huruf besar, kecil, dan angka)"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890",
      "avatar": null,
      "isFarmer": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "session": {
      "accessToken": "eyJhbGci...",
      "refreshToken": "v1.MjA...",
      "expiresAt": 1700000000
    }
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `CONFLICT` | 409 | Email sudah terdaftar |
| `VALIDATION_ERROR` | 400 | Data tidak valid |

---

### POST `/auth/login`

Login user.

**Auth:** Public

**Request Body:**

```json
{
  "email": "string (format email valid)",
  "password": "string (min 1 karakter)"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "081234567890",
      "avatar": "https://...",
      "isFarmer": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "session": {
      "accessToken": "eyJhbGci...",
      "refreshToken": "v1.MjA...",
      "expiresAt": 1700000000
    }
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `UNAUTHORIZED` | 401 | Email atau password salah |

---

### POST `/auth/logout`

Logout user (invalidate token).

**Auth:** Required

**Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### POST `/auth/refresh`

Refresh access token menggunakan refresh token.

**Auth:** Public

**Request Body:**

```json
{
  "refreshToken": "string (refresh token dari login/register)"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "v1.MjA...",
    "expiresAt": 1700000000
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `UNAUTHORIZED` | 401 | Refresh token tidak valid |

---

### POST `/auth/google`

Login / Register via Google OAuth.

**Auth:** Public

**Request Body:**

```json
{
  "idToken": "string (Google ID token)"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "Budi Santoso",
      "email": "budi@gmail.com",
      "phone": null,
      "avatar": "https://lh3.googleusercontent.com/...",
      "isFarmer": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "session": {
      "accessToken": "eyJhbGci...",
      "refreshToken": "v1.MjA...",
      "expiresAt": 1700000000
    }
  }
}
```

---

## Users

### GET `/users/me`

Mendapatkan profil user yang sedang login.

**Auth:** Required

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "supabaseId": "uuid",
    "fullName": "Budi Santoso",
    "email": "budi@example.com",
    "phone": "081234567890",
    "avatar": "https://...",
    "isFarmer": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "farmer": {
      "id": "uuid",
      "specialty": "Jamur Tiram",
      "isVerified": true
    }
  }
}
```

> **Note:** Field `farmer` bernilai `null` jika user bukan petani.

---

### PATCH `/users/me`

Update profil user yang sedang login.

**Auth:** Required

**Request Body (semua field optional):**

```json
{
  "fullName": "string (min 2 karakter)",
  "phone": "string (min 10 digit)",
  "avatar": "string (URL valid)"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "supabaseId": "uuid",
    "fullName": "Budi Updated",
    "email": "budi@example.com",
    "phone": "081234567891",
    "avatar": "https://...",
    "isFarmer": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

---

### GET `/users/:id`

Mendapatkan profil publik user lain.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | User ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Budi Santoso",
    "avatar": "https://...",
    "isFarmer": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "stats": {
      "forumPosts": 15,
      "reputation": 750
    }
  }
}
```

---

## Farmers

### GET `/farmers`

List semua petani dengan filter & pagination.

**Auth:** Public

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|------------|--------|---------|--------------------------------------------------|
| `search` | string | - | Cari berdasarkan nama, specialty, kota, region |
| `category` | string | - | Filter: `mentor`, `partner`, `verified`, atau `all` |
| `region` | string | - | Filter region (case insensitive) |
| `sort` | string | rating | `rating` (default), `newest`, `experience`, `students` |
| `page` | number | 1 | Halaman |
| `limit` | number | 12 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "farmers": [
      {
        "id": "uuid",
        "fullName": "Pak Joko",
        "avatar": "https://...",
        "location": "Bandung, Jawa Barat",
        "specialty": "Jamur Tiram",
        "experience": 10,
        "rating": 4.8,
        "reviewCount": 25,
        "isVerified": true,
        "isMentor": true,
        "isPartner": false,
        "bio": "Petani jamur berpengalaman...",
        "studentCount": 50
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 30,
      "totalPages": 3
    }
  }
}
```

> **Note:** Jika `avatar` null, backend mengembalikan inisial nama (contoh: "PJ").

---

### GET `/farmers/:id`

Detail petani lengkap.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Farmer ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Pak Joko Supriadi",
    "email": "joko@example.com",
    "phone": "081234567890",
    "whatsapp": "081234567890",
    "location": "Bandung, Jawa Barat",
    "address": "Jl. Jamur No. 10",
    "region": "Jawa Barat",
    "specialty": "Jamur Tiram",
    "experience": 10,
    "bio": "Petani jamur berpengalaman",
    "fullBio": "Deskripsi lengkap tentang petani...",
    "website": "https://...",
    "farmSize": "500 m²",
    "totalHarvest": "2000 kg/bulan",
    "isMentor": true,
    "isPartner": false,
    "isConsultant": true,
    "isVerified": true,
    "rating": 4.8,
    "reviewCount": 25,
    "studentCount": 50,
    "successStories": 12,
    "lastActiveAt": "2024-01-01T00:00:00.000Z",
    "joinedDate": "2023-01-01T00:00:00.000Z",
    "socialMedia": {
      "instagram": "@pak_joko_jamur",
      "youtube": "https://youtube.com/...",
      "facebook": "https://facebook.com/..."
    },
    "skills": ["Budidaya Jamur Tiram", "Pembuatan Baglog", "Manajemen Kumbung"],
    "certifications": [
      {
        "id": "uuid",
        "name": "Sertifikat Organik",
        "issuer": "BPOM",
        "year": 2022,
        "farmerId": "uuid"
      }
    ],
    "gallery": [
      {
        "id": "uuid",
        "url": "https://...",
        "caption": "Kumbung jamur",
        "order": 0,
        "farmerId": "uuid"
      }
    ],
    "services": [
      {
        "id": "uuid",
        "name": "Konsultasi Budidaya",
        "description": "Konsultasi pemula budidaya jamur",
        "price": 150000,
        "duration": "60 menit",
        "isActive": true,
        "icon": "🍄",
        "farmerId": "uuid"
      }
    ]
  }
}
```

---

### POST `/farmers`

Daftar sebagai petani.

**Auth:** Required

**Request Body:**

```json
{
  "fullName": "string (min 2)",
  "email": "string (email)",
  "phone": "string (min 10)",
  "whatsapp": "string (min 10)",
  "region": "string (min 1)",
  "city": "string (min 1)",
  "address": "string? (optional)",
  "specialty": "string (min 1)",
  "experience": "string (min 1)",
  "bio": "string? (optional)",
  "fullBio": "string? (optional)",
  "website": "string? (URL or empty string)",
  "farmSize": "string? (optional)",
  "totalHarvest": "string? (optional)",
  "isMentor": false,
  "isPartner": false,
  "isConsultant": false,
  "skills": ["Budidaya Jamur", "Pembuatan Baglog"],
  "certifications": [
    {
      "name": "Sertifikat Organik",
      "issuer": "BPOM",
      "year": "2022"
    }
  ],
  "instagram": "string? (optional)",
  "youtube": "string? (optional)",
  "facebook": "string? (optional)"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "fullName": "Pak Joko",
    "...": "...semua field farmer",
    "skills": [{ "id": "uuid", "name": "Budidaya Jamur", "farmerId": "uuid" }],
    "certifications": [
      {
        "id": "uuid",
        "name": "...",
        "issuer": "...",
        "year": 2022,
        "farmerId": "uuid"
      }
    ]
  },
  "message": "Pendaftaran petani berhasil! Menunggu verifikasi."
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `CONFLICT` | 409 | User sudah terdaftar sebagai petani |

---

### PATCH `/farmers/:id`

Update profil petani. Hanya pemilik yg bisa update.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Farmer ID |

**Request Body:** Sama seperti POST, semua field optional.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "...": "...farmer object lengkap + skills, certifications, gallery, services"
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `NOT_FOUND` | 404 | Petani tidak ditemukan |
| `FORBIDDEN` | 403 | Bukan pemilik profil |

---

### GET `/farmers/:farmerId/reviews`

List review petani.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|------------|------|------------|
| `farmerId` | uuid | Farmer ID |

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|------------|
| `page` | number | 1 | Halaman |
| `limit` | number | 10 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "content": "Petani yang sangat membantu!",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "id": "uuid",
          "fullName": "Budi",
          "avatar": "https://..."
        }
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 },
    "averageRating": 4.8
  }
}
```

---

### POST `/farmers/:farmerId/reviews`

Buat review untuk petani. Tidak bisa review diri sendiri.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|------------|------|------------|
| `farmerId` | uuid | Farmer ID |

**Request Body:**

```json
{
  "rating": 5,
  "content": "string (min 10 karakter)"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "farmerId": "uuid",
    "userId": "uuid",
    "rating": 5,
    "content": "Sangat membantu dalam konsultasi...",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": "uuid",
      "fullName": "Budi",
      "avatar": "https://..."
    }
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `NOT_FOUND` | 404 | Petani tidak ditemukan |
| `FORBIDDEN` | 403 | Tidak bisa review diri sendiri |

---

### GET `/farmers/:farmerId/services`

List layanan/jasa petani.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|------------|------|------------|
| `farmerId` | uuid | Farmer ID |

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "farmerId": "uuid",
      "name": "Konsultasi Budidaya",
      "description": "Konsultasi online via video call",
      "price": 150000,
      "duration": "60 menit",
      "isActive": true,
      "icon": "🍄"
    }
  ]
}
```

---

### POST `/farmers/:farmerId/services`

Tambah layanan baru. Hanya pemilik profil.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|------------|------|------------|
| `farmerId` | uuid | Farmer ID |

**Request Body:**

```json
{
  "name": "string (min 1)",
  "description": "string? (optional)",
  "price": 150000,
  "duration": "string? (optional)",
  "isActive": true,
  "icon": "string? (optional)"
}
```

**Response (201):** Object layanan yang dibuat.

---

### PATCH `/farmers/:farmerId/services/:serviceId`

Update layanan petani. Hanya pemilik.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `farmerId` | uuid | Farmer ID |
| `serviceId` | uuid | Service ID |

**Request Body:** Sama seperti POST, semua field optional.

**Response (200):** Object layanan yang diupdate.

---

### DELETE `/farmers/:farmerId/services/:serviceId`

Hapus layanan petani. Hanya pemilik.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `farmerId` | uuid | Farmer ID |
| `serviceId` | uuid | Service ID |

**Response:** `204 No Content`

---

## Forum

### GET `/forum/posts`

List forum posts dengan filter & pagination.

**Auth:** Public

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|------------|--------|----------|---------------------------------------------------------------|
| `search` | string | - | Cari di title & content |
| `category` | string | - | `tips`, `question`, `discussion`, `showcase`, `problem`, `news`, `all` |
| `sort` | string | newest | `newest` (default), `popular`, `unanswered` |
| `tag` | string | - | Filter berdasarkan tag |
| `page` | number | 1 | Halaman |
| `limit` | number | 10 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Tips Budidaya Jamur Tiram di Musim Hujan",
        "excerpt": "Potongan isi post...",
        "category": "tips",
        "isHot": true,
        "likeCount": 42,
        "viewCount": 350,
        "replyCount": 12,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "author": {
          "id": "uuid",
          "fullName": "Pak Joko",
          "avatar": "https://..."
        },
        "tags": ["jamur-tiram", "musim-hujan"]
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 }
  }
}
```

---

### GET `/forum/posts/:id`

Detail post lengkap. View count otomatis +1.

**Auth:** Optional Auth (untuk isLiked & isBookmarked)

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Post ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Tips Budidaya Jamur Tiram di Musim Hujan",
    "content": "Konten lengkap post (markdown)...",
    "excerpt": "Potongan...",
    "category": "tips",
    "isHot": true,
    "isDraft": false,
    "likeCount": 42,
    "viewCount": 351,
    "replyCount": 12,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z",
    "author": {
      "id": "uuid",
      "fullName": "Pak Joko",
      "avatar": "https://...",
      "postCount": 15,
      "memberSince": "2023-01-01T00:00:00.000Z"
    },
    "tags": ["jamur-tiram", "musim-hujan"],
    "images": [
      { "id": "uuid", "url": "https://...", "order": 0, "postId": "uuid" }
    ],
    "isLiked": false,
    "isBookmarked": true,
    "relatedPosts": [
      {
        "id": "uuid",
        "title": "Cara Membuat Baglog Jamur",
        "author": "Ibu Sari",
        "replyCount": 5,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### POST `/forum/posts`

Buat post baru.

**Auth:** Required

**Request Body:**

```json
{
  "title": "string (5-150 karakter)",
  "content": "string (min 50 karakter)",
  "category": "tips | question | discussion | showcase | problem | news",
  "tags": ["string"],
  "images": ["https://url1.com", "https://url2.com"],
  "isDraft": false
}
```

> **Notes:** `tags` max 5. `images` max 5 (URL valid). `excerpt` otomatis digenerate dari content.

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "...",
    "content": "...",
    "excerpt": "...",
    "category": "tips",
    "isDraft": false,
    "likeCount": 0,
    "viewCount": 0,
    "replyCount": 0,
    "createdAt": "...",
    "author": { "id": "uuid", "fullName": "...", "avatar": "..." },
    "tags": [{ "id": "uuid", "name": "...", "postId": "uuid" }],
    "images": [{ "id": "uuid", "url": "...", "order": 0, "postId": "uuid" }]
  }
}
```

---

### PATCH `/forum/posts/:id`

Update post. Hanya author yang bisa update.

**Auth:** Required

**Request Body:** Sama seperti POST, semua field optional.

**Response (200):** Object post yang diupdate.

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `NOT_FOUND` | 404 | Post tidak ditemukan |
| `FORBIDDEN` | 403 | Bukan author post |

---

### DELETE `/forum/posts/:id`

Hapus post. Hanya author yang bisa hapus.

**Auth:** Required

**Response:** `204 No Content`

---

### POST `/forum/posts/:id/like`

Toggle like post (like/unlike).

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Post ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likeCount": 43
  }
}
```

---

### POST `/forum/posts/:id/bookmark`

Toggle bookmark post (save/unsave).

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Post ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isBookmarked": true
  }
}
```

---

### GET `/forum/posts/:postId/comments`

List komentar pada sebuah post. Termasuk nested replies.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `postId` | uuid | Post ID |

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|------------|
| `page` | number | 1 | Halaman |
| `limit` | number | 20 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid",
        "content": "Ini tips yang sangat bagus!",
        "isBestAnswer": false,
        "likeCount": 5,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "author": {
          "id": "uuid",
          "fullName": "Budi",
          "avatar": "https://...",
          "isPostAuthor": false
        },
        "replies": [
          {
            "id": "uuid",
            "content": "Terima kasih!",
            "likeCount": 2,
            "createdAt": "2024-01-01T01:00:00.000Z",
            "author": {
              "id": "uuid",
              "fullName": "Pak Joko",
              "avatar": "https://...",
              "isPostAuthor": true
            }
          }
        ]
      }
    ],
    "pagination": { "page": 1, "limit": 20, "total": 12, "totalPages": 1 }
  }
}
```

> **Note:** Hanya top-level comments yang dipaginasi. Replies di-include di dalam masing-masing comment.

---

### POST `/forum/posts/:postId/comments`

Buat komentar atau reply.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `postId` | uuid | Post ID |

**Request Body:**

```json
{
  "content": "string (min 1 karakter)",
  "parentId": "uuid (optional, untuk reply ke komentar lain)"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "postId": "uuid",
    "authorId": "uuid",
    "content": "...",
    "parentId": null,
    "isBestAnswer": false,
    "likeCount": 0,
    "createdAt": "...",
    "author": { "id": "uuid", "fullName": "...", "avatar": "..." }
  }
}
```

---

### POST `/forum/comments/:commentId/like`

Toggle like komentar.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `commentId` | uuid | Comment ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isLiked": true,
    "likeCount": 6
  }
}
```

---

### PATCH `/forum/comments/:commentId/best-answer`

Tandai komentar sebagai best answer. Hanya author post yang bisa.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `commentId` | uuid | Comment ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isBestAnswer": true,
    "...": "...comment object"
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `FORBIDDEN` | 403 | Hanya pembuat post yang bisa menandai best answer |

---

### POST `/forum/comments/:commentId/report`

Laporkan komentar.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `commentId` | uuid | Comment ID |

**Request Body:**

```json
{
  "reason": "string (min 1 karakter)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Laporan sedang diproses"
}
```

---

## Products

### GET `/products`

List produk marketplace dengan filter & pagination.

**Auth:** Optional Auth (untuk isWishlisted)

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|------------|--------|---------|------------------------------------------------------------------|
| `search` | string | - | Cari berdasarkan nama & deskripsi |
| `category` | string | - | `fresh`, `spawn`, `substrate`, `equipment`, `processed`, `other`, `all` |
| `minPrice` | number | - | Harga minimum (dalam Rupiah) |
| `maxPrice` | number | - | Harga maksimum |
| `location` | string | - | Filter lokasi (case insensitive) |
| `sort` | string | newest | `newest` (default), `cheapest`, `expensive`, `rating`, `popular` |
| `page` | number | 1 | Halaman |
| `limit` | number | 12 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "Jamur Tiram Segar Organik",
        "price": 35000,
        "originalPrice": 45000,
        "unit": "/kg",
        "rating": 4.8,
        "reviewCount": 30,
        "soldCount": 150,
        "badge": "Best Seller",
        "location": "Bandung, Jawa Barat",
        "mainImage": "https://...",
        "seller": {
          "id": "uuid",
          "fullName": "Pak Joko",
          "avatar": "https://..."
        },
        "isWishlisted": false
      }
    ],
    "pagination": { "page": 1, "limit": 12, "total": 40, "totalPages": 4 }
  }
}
```

> **Note:** `isWishlisted` selalu `false` jika user tidak login.

---

### GET `/products/:id`

Detail produk lengkap.

**Auth:** Optional Auth (untuk isWishlisted)

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Product ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Jamur Tiram Segar Organik",
    "description": "Deskripsi lengkap produk...",
    "category": "fresh",
    "condition": "fresh",
    "price": 35000,
    "originalPrice": 45000,
    "unit": "/kg",
    "stock": 100,
    "minOrder": 1,
    "weight": 1000,
    "location": "Bandung, Jawa Barat",
    "whatsapp": "081234567890",
    "badge": "Best Seller",
    "rating": 4.8,
    "reviewCount": 30,
    "soldCount": 150,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "images": [
      {
        "id": "uuid",
        "url": "https://...",
        "isMain": true,
        "order": 0,
        "productId": "uuid"
      }
    ],
    "specifications": [
      { "label": "Berat", "value": "1 kg" },
      { "label": "Jenis", "value": "Tiram Putih" }
    ],
    "seller": {
      "id": "uuid",
      "name": "Pak Joko",
      "avatar": "https://...",
      "location": "Bandung, Jawa Barat",
      "rating": 4.8,
      "reviewCount": 25,
      "productCount": 10,
      "joinedDate": "2023-01-01T00:00:00.000Z",
      "isVerified": true
    },
    "isWishlisted": false,
    "relatedProducts": [
      {
        "id": "uuid",
        "name": "Jamur Kuping Kering",
        "price": 50000,
        "unit": "/kg",
        "rating": 4.5,
        "soldCount": 80,
        "mainImage": "https://..."
      }
    ]
  }
}
```

---

### POST `/products`

Buat produk baru.

**Auth:** Required

**Request Body:**

```json
{
  "name": "string (3-100 karakter)",
  "description": "string (min 10 karakter)",
  "category": "fresh | spawn | substrate | equipment | processed | other",
  "condition": "fresh | dried | frozen | processed | new | used",
  "price": 35000,
  "originalPrice": 45000,
  "unit": "kg | gram | pack | bag | pcs | set | unit",
  "stock": 100,
  "minOrder": 1,
  "weight": 1000,
  "location": "Bandung, Jawa Barat",
  "whatsapp": "081234567890",
  "specifications": [
    { "label": "Berat", "value": "1 kg" },
    { "label": "Jenis", "value": "Tiram Putih" }
  ],
  "images": ["https://url1.com", "https://url2.com"],
  "isDraft": false
}
```

> **Notes:** `images` max 8 (URL valid). First image = main image. `originalPrice`, `weight`, `specifications`, `images` optional.

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "sellerId": "uuid",
    "farmerId": "uuid",
    "name": "...",
    "...": "...semua field product",
    "images": [
      {
        "id": "uuid",
        "url": "...",
        "isMain": true,
        "order": 0,
        "productId": "uuid"
      }
    ],
    "specifications": [
      { "id": "uuid", "label": "...", "value": "...", "productId": "uuid" }
    ]
  }
}
```

---

### PATCH `/products/:id`

Update produk. Hanya seller yang bisa.

**Auth:** Required

**Request Body:** Sama seperti POST, semua field optional.

**Response (200):** Object produk yang diupdate.

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `NOT_FOUND` | 404 | Produk tidak ditemukan |
| `FORBIDDEN` | 403 | Bukan pemilik produk |

---

### DELETE `/products/:id`

Hapus produk. Hanya seller yang bisa.

**Auth:** Required

**Response:** `204 No Content`

---

### POST `/products/:id/wishlist`

Toggle wishlist produk (save/unsave).

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|------------|
| `id` | uuid | Product ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "isWishlisted": true
  }
}
```

---

### GET `/products/:productId/reviews`

List review produk.

**Auth:** Public

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `productId` | uuid | Product ID |

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|------------|
| `page` | number | 1 | Halaman |
| `limit` | number | 10 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "content": "Jamur segar dan berkualitas!",
        "helpful": 3,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "id": "uuid",
          "fullName": "Budi",
          "avatar": "https://..."
        }
      }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 30, "totalPages": 3 },
    "averageRating": 4.8
  }
}
```

---

### POST `/products/:productId/reviews`

Buat review produk. Tidak bisa review produk sendiri.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `productId` | uuid | Product ID |

**Request Body:**

```json
{
  "rating": 5,
  "content": "string (min 1 karakter)"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "productId": "uuid",
    "userId": "uuid",
    "rating": 5,
    "content": "Jamur segar dan berkualitas...",
    "helpful": 0,
    "createdAt": "...",
    "user": { "id": "uuid", "fullName": "...", "avatar": "..." }
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `NOT_FOUND` | 404 | Produk tidak ditemukan |
| `FORBIDDEN` | 403 | Tidak bisa review produk sendiri |

---

### POST `/products/:productId/reviews/:reviewId/helpful`

Tandai review sebagai helpful (+1).

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-------------|------|------------|
| `productId` | uuid | Product ID |
| `reviewId` | uuid | Review ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "helpful": 4,
    "...": "...review object"
  }
}
```

---

## Chat / Conversations

### GET `/conversations`

List semua percakapan user.

**Auth:** Required

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "lastMessage": {
        "content": "Masih ada stok jamur?",
        "createdAt": "2024-01-01T12:00:00.000Z",
        "senderId": "uuid"
      },
      "unreadCount": 2,
      "participant": {
        "id": "uuid",
        "fullName": "Pak Joko",
        "avatar": "https://...",
        "isVerified": true
      }
    }
  ]
}
```

> **Note:** `lastMessage` bisa `null` jika belum ada pesan. `participant` adalah user lain dalam percakapan.

---

### POST `/conversations`

Buat atau dapatkan conversation yang sudah ada.

**Auth:** Required

**Request Body:**

```json
{
  "participantId": "uuid (user ID lawan bicara)",
  "productId": "uuid? (optional, jika chat terkait produk)"
}
```

**Response (200 atau 201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "isNew": true
  }
}
```

> Status 201 jika baru dibuat, 200 jika sudah ada.

---

### GET `/conversations/:id/messages`

List pesan dalam conversation.

**Auth:** Required (harus jadi participant)

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|-----------------|
| `id` | uuid | Conversation ID |

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|------------|
| `page` | number | 1 | Halaman |
| `limit` | number | 50 | Per halaman |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "Halo, apakah jamurnya masih tersedia?",
        "type": "text",
        "metadata": null,
        "createdAt": "2024-01-01T10:00:00.000Z"
      },
      {
        "id": "uuid",
        "senderId": "uuid",
        "content": "Masih ada, mau pesan berapa kg?",
        "type": "text",
        "metadata": null,
        "createdAt": "2024-01-01T10:05:00.000Z"
      }
    ],
    "pagination": { "page": 1, "limit": 50, "total": 2, "totalPages": 1 }
  }
}
```

> **Note:** Messages di-sort ascending (terlama dulu). Gunakan `senderId` untuk menentukan pengirim.

---

### POST `/conversations/:id/messages`

Kirim pesan.

**Auth:** Required (harus jadi participant)

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|-----------------|
| `id` | uuid | Conversation ID |

**Request Body:**

```json
{
  "content": "string (min 1 karakter)",
  "type": "text | image | file | product_card",
  "metadata": {}
}
```

> **Notes:** `type` default `"text"`. `metadata` optional (contoh: untuk product_card bisa berisi info produk).

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "conversationId": "uuid",
    "senderId": "uuid",
    "content": "...",
    "type": "text",
    "metadata": null,
    "createdAt": "..."
  }
}
```

---

### PATCH `/conversations/:id/read`

Tandai semua pesan sebagai sudah dibaca.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|-----------------|
| `id` | uuid | Conversation ID |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "unreadCount": 0
  }
}
```

---

### POST `/conversations/:id/report`

Laporkan conversation.

**Auth:** Required

**Path Parameters:**
| Parameter | Type | Keterangan |
|-----------|------|-----------------|
| `id` | uuid | Conversation ID |

**Request Body:**

```json
{
  "reason": "string (min 1 karakter)"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Laporan telah diterima"
}
```

---

## Upload

### POST `/upload`

Upload file (gambar/video) ke Supabase Storage.

**Auth:** Required

**Content-Type:** `multipart/form-data`

**Form Data:**
| Field | Type | Keterangan |
|----------|--------|-----------------------------------------------------------------|
| `file` | File | File yang diupload (wajib) |
| `bucket` | string | Bucket tujuan: `avatars`, `products`, `forum`, `farmers` (default: `products`) |

**File Restrictions:**
| Tipe | Format yang didukung | Ukuran Maks |
|------------|--------------------------|-------------|
| Gambar | JPEG, PNG, WebP | 5 MB |
| Video | MP4 | 50 MB |

**Response (201):**

```json
{
  "success": true,
  "data": {
    "url": "https://kmyerznqzzzedonyuidr.supabase.co/storage/v1/object/public/products/1700000000-abc123.jpg",
    "path": "products/1700000000-abc123.jpg",
    "size": 245000,
    "mimeType": "image/jpeg"
  }
}
```

**Errors:**
| Code | Status | Keterangan |
|------|--------|------------|
| `VALIDATION_ERROR` | 400 | File wajib diupload / Bucket tidak valid |
| `UNSUPPORTED_TYPE` | 415 | Tipe file tidak didukung |
| `FILE_TOO_LARGE` | 413 | Ukuran file melebihi batas |

---

### DELETE `/upload`

Hapus file dari Supabase Storage.

**Auth:** Required

**Request Body:**

```json
{
  "path": "products/1700000000-abc123.jpg"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "File berhasil dihapus"
}
```

---

## Community

### GET `/community/stats`

Statistik komunitas.

**Auth:** Public

**Response (200):**

```json
{
  "success": true,
  "data": {
    "totalMembers": 1250,
    "verifiedSellers": 45,
    "regionsCovered": 12,
    "newThisMonth": 30
  }
}
```

---

### GET `/community/top-farmers`

List petani terbaik berdasarkan rating.

**Auth:** Public

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|---------------------|
| `limit` | number | 10 | Jumlah petani |

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "fullName": "Pak Joko",
      "avatar": "https://...",
      "location": "Bandung, Jawa Barat",
      "specialty": "Jamur Tiram",
      "postCount": 15,
      "salesCount": 10,
      "rating": 4.9,
      "isVerified": true,
      "bio": "Petani jamur berpengalaman..."
    }
  ]
}
```

---

### GET `/community/regions`

List daerah yang memiliki petani.

**Auth:** Public

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "name": "Jawa Barat",
      "farmerCount": 15,
      "icon": "🏔️"
    },
    {
      "name": "Jawa Timur",
      "farmerCount": 10,
      "icon": "🌾"
    }
  ]
}
```

---

### GET `/community/recent-members`

List anggota terbaru.

**Auth:** Public

**Query Parameters:**
| Parameter | Type | Default | Keterangan |
|-----------|--------|---------|---------------------|
| `limit` | number | 10 | Jumlah anggota |

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "fullName": "Budi Santoso",
      "avatar": "https://...",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

---

## Health Check

### GET `/health`

Cek status API.

**Auth:** Public

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Handling

### Error Codes

| Code               | HTTP Status | Keterangan                  |
| ------------------ | ----------- | --------------------------- |
| `VALIDATION_ERROR` | 400         | Data request tidak valid    |
| `UNAUTHORIZED`     | 401         | Token tidak valid / expired |
| `FORBIDDEN`        | 403         | Tidak memiliki akses        |
| `NOT_FOUND`        | 404         | Resource tidak ditemukan    |
| `CONFLICT`         | 409         | Data sudah ada (duplicate)  |
| `UNSUPPORTED_TYPE` | 415         | Tipe file tidak didukung    |
| `FILE_TOO_LARGE`   | 413         | Ukuran file melebihi batas  |
| `INTERNAL_ERROR`   | 500         | Kesalahan server            |

### Validation Error Detail

Ketika Zod validation gagal, response berisi array detail:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validasi gagal",
    "details": [
      {
        "field": "email",
        "message": "Format email tidak valid"
      },
      {
        "field": "password",
        "message": "Password minimal 8 karakter"
      }
    ]
  }
}
```

---

## Quick Reference — Enum Values

### Product Categories

`fresh` | `spawn` | `substrate` | `equipment` | `processed` | `other`

### Product Conditions

`fresh` | `dried` | `frozen` | `processed` | `new` | `used`

### Product Units

`kg` | `gram` | `pack` | `bag` | `pcs` | `set` | `unit`

### Forum Categories

`tips` | `question` | `discussion` | `showcase` | `problem` | `news`

### Message Types

`text` | `image` | `file` | `product_card`

### Upload Buckets

`avatars` | `products` | `forum` | `farmers`

### Farmer Sort Options

`rating` (default) | `newest` | `experience` | `students`

### Product Sort Options

`newest` (default) | `cheapest` | `expensive` | `rating` | `popular`

### Forum Sort Options

`newest` (default) | `popular` | `unanswered`
