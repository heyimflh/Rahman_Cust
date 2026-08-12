export interface VideoMemory {
  id: string;
  webmSrc: string;
  mp4Src?: string; // Fallback for iOS
  poster: string;
  title: string;
  caption: string;
  orientation: "portrait" | "landscape";
  aspectRatio: string;
}

export const videos: VideoMemory[] = [
  {
    id: "video-1",
    webmSrc: "/video/video-1.webm",
    mp4Src: "/video/video-1.mp4", // We'll try to generate this later
    poster: "/images/image-2.webp", // Fallback poster using one of the existing images since we haven't generated a video frame yet
    title: "satu momen yang nggak cukup disimpan jadi foto",
    caption: "karena kadang yang gerak-gerak gini lebih kerasa hidupnya.",
    orientation: "landscape",
    aspectRatio: "16/9",
  },
  {
    id: "video-2",
    webmSrc: "/video/video-2.webm",
    mp4Src: "/video/video-2.mp4",
    poster: "/images/image-11.webp",
    title: "Azkia, versi yang bergerak dan bikin suasana hidup",
    caption: "di-save buat diingat kalau kamu selalu punya cara sendiri buat bahagia.",
    orientation: "portrait",
    aspectRatio: "9/16",
  }
];
