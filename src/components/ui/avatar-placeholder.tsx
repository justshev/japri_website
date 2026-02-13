import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sprout, User } from "lucide-react";

/**
 * Generate a consistent gradient pair based on a string (e.g. a name).
 * The same name will always produce the same gradient.
 */
const GRADIENT_PAIRS = [
  { from: "from-emerald-400", to: "to-teal-500", text: "text-white" },
  { from: "from-violet-400", to: "to-purple-500", text: "text-white" },
  { from: "from-amber-400", to: "to-orange-500", text: "text-white" },
  { from: "from-sky-400", to: "to-blue-500", text: "text-white" },
  { from: "from-rose-400", to: "to-pink-500", text: "text-white" },
  { from: "from-lime-400", to: "to-green-500", text: "text-white" },
  { from: "from-fuchsia-400", to: "to-purple-600", text: "text-white" },
  { from: "from-cyan-400", to: "to-teal-600", text: "text-white" },
  { from: "from-indigo-400", to: "to-blue-600", text: "text-white" },
  { from: "from-orange-400", to: "to-red-500", text: "text-white" },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getGradient(name: string) {
  const index = hashString(name) % GRADIENT_PAIRS.length;
  return GRADIENT_PAIRS[index];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Size presets ───────────────────────────────────────────

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const SIZE_MAP: Record<
  AvatarSize,
  { container: string; text: string; icon: string }
> = {
  xs: { container: "w-6 h-6", text: "text-[10px]", icon: "w-3 h-3" },
  sm: { container: "w-8 h-8", text: "text-xs", icon: "w-4 h-4" },
  md: { container: "w-10 h-10", text: "text-sm", icon: "w-5 h-5" },
  lg: { container: "w-12 h-12", text: "text-base", icon: "w-6 h-6" },
  xl: { container: "w-14 h-14", text: "text-lg", icon: "w-7 h-7" },
  "2xl": { container: "w-28 h-28", text: "text-3xl", icon: "w-12 h-12" },
};

// ─── User Avatar Placeholder ────────────────────────────────

interface UserAvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
  /** Show a ring/border around the avatar */
  ring?: boolean;
}

/**
 * A beautiful avatar placeholder for users.
 * Shows the uploaded image if available, otherwise renders initials
 * on a gradient background that's consistent per name.
 */
export function UserAvatar({
  name,
  src,
  size = "md",
  className,
  ring,
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const sizeConfig = SIZE_MAP[size];
  const gradient = getGradient(name);
  const initials = getInitials(name);

  const showImage = src && !imgError;

  if (showImage) {
    return (
      <div
        className={cn(
          sizeConfig.container,
          "rounded-full overflow-hidden flex-shrink-0 relative",
          ring && "ring-2 ring-background shadow-md",
          className,
        )}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        sizeConfig.container,
        "rounded-full flex-shrink-0 relative flex items-center justify-center",
        "bg-gradient-to-br shadow-inner",
        gradient.from,
        gradient.to,
        gradient.text,
        ring && "ring-2 ring-background shadow-md",
        className,
      )}
    >
      {initials ? (
        <span
          className={cn(
            "font-bold tracking-wide select-none drop-shadow-sm",
            sizeConfig.text,
          )}
        >
          {initials}
        </span>
      ) : (
        <User className={cn(sizeConfig.icon, "opacity-80")} />
      )}
      {/* Subtle shine overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Farmer Avatar Placeholder ──────────────────────────────

interface FarmerAvatarProps {
  name: string;
  src?: string | null;
  size?: AvatarSize;
  className?: string;
  isVerified?: boolean;
  /** For square-shaped farmer cards (like FarmerDetail) */
  rounded?: "full" | "2xl";
}

/**
 * A themed avatar for farmers.
 * Falls back to a mushroom-themed gradient placeholder.
 */
export function FarmerAvatar({
  name,
  src,
  size = "xl",
  className,
  rounded = "full",
}: FarmerAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const sizeConfig = SIZE_MAP[size];
  const gradient = getGradient(name);
  const initials = getInitials(name);
  const roundedClass = rounded === "full" ? "rounded-full" : "rounded-2xl";

  const showImage = src && !imgError;

  if (showImage) {
    return (
      <div
        className={cn(
          sizeConfig.container,
          roundedClass,
          "overflow-hidden flex-shrink-0 relative",
          className,
        )}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        sizeConfig.container,
        roundedClass,
        "flex-shrink-0 relative flex items-center justify-center overflow-hidden",
        "bg-gradient-to-br",
        gradient.from,
        gradient.to,
        gradient.text,
        className,
      )}
    >
      {/* Background pattern – subtle mushroom motif */}
      <div className="absolute inset-0 opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="currentColor"
        >
          {/* Small mushroom shapes scattered */}
          <circle cx="20" cy="25" r="8" />
          <rect x="18" y="33" width="4" height="8" rx="1" />
          <circle cx="70" cy="60" r="6" />
          <rect x="68" y="66" width="4" height="6" rx="1" />
          <circle cx="45" cy="80" r="5" />
          <rect x="43" y="85" width="4" height="5" rx="1" />
          <circle cx="80" cy="20" r="4" />
          <rect x="78" y="24" width="4" height="4" rx="1" />
        </svg>
      </div>
      {/* Initials */}
      {initials ? (
        <span
          className={cn(
            "font-bold tracking-wide select-none drop-shadow-sm relative z-10",
            sizeConfig.text,
          )}
        >
          {initials}
        </span>
      ) : (
        <Sprout className={cn(sizeConfig.icon, "opacity-80 relative z-10")} />
      )}
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}

// ─── Post / Product Image Placeholder ───────────────────────

interface ImagePlaceholderProps {
  type?: "product" | "post" | "gallery";
  className?: string;
}

/**
 * A placeholder for when a post image, product image, or gallery item
 * is missing. Shows a themed SVG illustration.
 */
export function ImagePlaceholder({
  type = "product",
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center",
        "bg-gradient-to-br from-muted/80 via-muted/40 to-muted/80",
        className,
      )}
    >
      {type === "product" ? (
        <ProductPlaceholderSvg />
      ) : type === "post" ? (
        <PostPlaceholderSvg />
      ) : (
        <GalleryPlaceholderSvg />
      )}
    </div>
  );
}

// ─── SVG Illustrations ──────────────────────────────────────

function ProductPlaceholderSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 text-muted-foreground/30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Mushroom cap */}
      <ellipse cx="60" cy="52" rx="30" ry="20" />
      {/* Mushroom stem */}
      <path d="M50 68 C50 68, 48 95, 52 98 L68 98 C72 95, 70 68, 70 68" />
      {/* Cap details */}
      <circle cx="50" cy="48" r="3" className="fill-current opacity-20" />
      <circle cx="65" cy="44" r="4" className="fill-current opacity-20" />
      <circle cx="55" cy="38" r="2" className="fill-current opacity-20" />
      {/* Ground line */}
      <path d="M35 98 L85 98" strokeDasharray="4 3" />
      {/* Small leaf */}
      <path
        d="M72 60 C78 52, 85 55, 80 62"
        className="fill-current opacity-10"
      />
    </svg>
  );
}

function PostPlaceholderSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 text-muted-foreground/30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Document shape */}
      <rect x="25" y="15" width="70" height="90" rx="6" />
      {/* Text lines */}
      <line x1="38" y1="35" x2="82" y2="35" />
      <line x1="38" y1="47" x2="75" y2="47" />
      <line x1="38" y1="59" x2="80" y2="59" />
      <line x1="38" y1="71" x2="65" y2="71" />
      {/* Small image placeholder inside */}
      <rect
        x="38"
        y="80"
        width="20"
        height="15"
        rx="2"
        className="fill-current opacity-10"
      />
      {/* Mushroom icon top right */}
      <circle cx="78" cy="82" r="6" className="fill-current opacity-10" />
      <rect
        x="76"
        y="88"
        width="4"
        height="5"
        rx="1"
        className="fill-current opacity-10"
      />
    </svg>
  );
}

function GalleryPlaceholderSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 text-muted-foreground/30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Frame */}
      <rect x="20" y="25" width="80" height="70" rx="8" />
      {/* Mountains / landscape */}
      <path
        d="M20 78 L45 55 L60 70 L75 50 L100 78"
        className="fill-current opacity-10"
      />
      {/* Sun */}
      <circle cx="80" cy="42" r="8" className="fill-current opacity-15" />
      {/* Small mushroom */}
      <ellipse
        cx="35"
        cy="72"
        rx="8"
        ry="5"
        className="fill-current opacity-15"
      />
      <rect
        x="33"
        y="77"
        width="4"
        height="6"
        rx="1"
        className="fill-current opacity-10"
      />
    </svg>
  );
}
