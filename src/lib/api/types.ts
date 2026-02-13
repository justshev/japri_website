// ==================== Generic ====================
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  pagination: Pagination;
  [key: string]: T[] | Pagination;
}

// ==================== Auth ====================
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  isFarmer: boolean;
  createdAt: string;
}

export interface UserMeResponse extends UserProfile {
  supabaseId: string;
  updatedAt: string;
  farmer: {
    id: string;
    specialty: string;
    isVerified: boolean;
  } | null;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthResponse {
  user: UserProfile;
  session: Session;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ==================== User ====================
export interface PublicProfile {
  id: string;
  fullName: string;
  avatar: string | null;
  isFarmer: boolean;
  createdAt: string;
  stats: {
    forumPosts: number;
    reputation: number;
  };
}

export interface UpdateUserPayload {
  fullName?: string;
  phone?: string;
  avatar?: string;
}

// ==================== Farmer ====================
export interface FarmerListItem {
  id: string;
  fullName: string;
  avatar: string;
  location: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isMentor: boolean;
  isPartner: boolean;
  bio: string | null;
  studentCount: number;
}

export interface FarmerListResponse {
  farmers: FarmerListItem[];
  pagination: Pagination;
}

export interface FarmerCertification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  farmerId: string;
}

export interface FarmerGalleryItem {
  id: string;
  url: string;
  caption: string | null;
  order: number;
  farmerId: string;
}

export interface FarmerServiceItem {
  id: string;
  farmerId: string;
  name: string;
  description: string | null;
  price: number;
  duration: string | null;
  isActive: boolean;
  icon: string | null;
}

export interface FarmerDetail {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  address: string | null;
  region: string;
  specialty: string;
  experience: number;
  bio: string | null;
  fullBio: string | null;
  website: string | null;
  farmSize: string | null;
  totalHarvest: string | null;
  isMentor: boolean;
  isPartner: boolean;
  isConsultant: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  studentCount: number;
  successStories: number;
  lastActiveAt: string | null;
  joinedDate: string;
  socialMedia: {
    instagram: string | null;
    youtube: string | null;
    facebook: string | null;
  };
  skills: string[];
  certifications: FarmerCertification[];
  gallery: FarmerGalleryItem[];
  services: FarmerServiceItem[];
}

export interface CreateFarmerPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  region: string;
  city: string;
  address?: string;
  specialty: string;
  experience: string;
  bio?: string;
  fullBio?: string;
  website?: string;
  farmSize?: string;
  totalHarvest?: string;
  isMentor?: boolean;
  isPartner?: boolean;
  isConsultant?: boolean;
  skills?: string[];
  certifications?: Array<{ name: string; issuer: string; year: string }>;
  instagram?: string;
  youtube?: string;
  facebook?: string;
}

export interface FarmerReviewItem {
  id: string;
  rating: number;
  content: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    avatar: string;
  };
}

export interface FarmerReviewsResponse {
  reviews: FarmerReviewItem[];
  pagination: Pagination;
  averageRating: number;
}

// ==================== Forum ====================
export interface ForumPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  isHot: boolean;
  likeCount: number;
  viewCount: number;
  replyCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    avatar: string;
  };
  tags: string[];
}

export interface ForumPostsResponse {
  posts: ForumPostItem[];
  pagination: Pagination;
}

export interface ForumPostDetail {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  isHot: boolean;
  isDraft: boolean;
  likeCount: number;
  viewCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
    avatar: string;
    postCount: number;
    memberSince: string;
  };
  tags: string[];
  images: Array<{ id: string; url: string; order: number; postId: string }>;
  isLiked: boolean;
  isBookmarked: boolean;
  relatedPosts: Array<{
    id: string;
    title: string;
    author: string;
    replyCount: number;
    createdAt: string;
  }>;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  category: string;
  tags?: string[];
  images?: string[];
  isDraft?: boolean;
}

export interface CommentReply {
  id: string;
  content: string;
  likeCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    avatar: string;
    isPostAuthor: boolean;
  };
}

export interface CommentItem {
  id: string;
  content: string;
  isBestAnswer: boolean;
  likeCount: number;
  createdAt: string;
  author: {
    id: string;
    fullName: string;
    avatar: string;
    isPostAuthor: boolean;
  };
  replies: CommentReply[];
}

export interface CommentsResponse {
  comments: CommentItem[];
  pagination: Pagination;
}

export interface CreateCommentPayload {
  content: string;
  parentId?: string;
}

// ==================== Product ====================
export interface ProductListItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  unit: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  badge: string | null;
  location: string;
  mainImage: string | null;
  seller: {
    id: string;
    fullName: string;
    avatar: string;
  };
  isWishlisted: boolean;
}

export interface ProductListResponse {
  products: ProductListItem[];
  pagination: Pagination;
}

export interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
  order: number;
  productId: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  originalPrice: number | null;
  unit: string;
  stock: number;
  minOrder: number;
  weight: number | null;
  location: string;
  whatsapp: string;
  badge: string | null;
  rating: number;
  reviewCount: number;
  soldCount: number;
  isActive: boolean;
  createdAt: string;
  images: ProductImage[];
  specifications: Array<{ label: string; value: string }>;
  seller: {
    id: string;
    name: string;
    avatar: string;
    location: string;
    rating: number;
    reviewCount: number;
    productCount: number;
    joinedDate: string;
    isVerified: boolean;
  };
  isWishlisted: boolean;
  relatedProducts: Array<{
    id: string;
    name: string;
    price: number;
    unit: string;
    rating: number;
    soldCount: number;
    mainImage: string | null;
  }>;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  originalPrice?: number;
  unit: string;
  stock: number;
  minOrder?: number;
  weight?: number;
  location: string;
  whatsapp: string;
  specifications?: Array<{ label: string; value: string }>;
  images?: string[];
  isDraft?: boolean;
}

export interface ProductReviewItem {
  id: string;
  rating: number;
  content: string;
  helpful: number;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    avatar: string;
  };
}

export interface ProductReviewsResponse {
  reviews: ProductReviewItem[];
  pagination: Pagination;
  averageRating: number;
}

// ==================== Chat ====================
export interface ConversationItem {
  id: string;
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  } | null;
  unreadCount: number;
  participant: {
    id: string;
    fullName: string;
    avatar: string;
    isVerified: boolean;
  } | null;
}

export interface MessageItem {
  id: string;
  senderId: string;
  content: string;
  type: string;
  metadata: unknown;
  createdAt: string;
}

export interface MessagesResponse {
  messages: MessageItem[];
  pagination: Pagination;
}

export interface SendMessagePayload {
  content: string;
  type?: "text" | "image" | "file" | "product_card";
  metadata?: unknown;
}

// ==================== Upload ====================
export interface UploadResponse {
  url: string;
  path: string;
  size: number;
  mimeType: string;
}

// ==================== Community ====================
export interface CommunityStats {
  totalMembers: number;
  verifiedSellers: number;
  regionsCovered: number;
  newThisMonth: number;
}

export interface TopFarmerItem {
  id: string;
  fullName: string;
  avatar: string;
  location: string;
  specialty: string;
  postCount: number;
  salesCount: number;
  rating: number;
  isVerified: boolean;
  bio: string | null;
}

export interface RegionItem {
  name: string;
  farmerCount: number;
  icon: string;
}

export interface RecentMemberItem {
  id: string;
  fullName: string;
  avatar: string;
  createdAt: string;
}
