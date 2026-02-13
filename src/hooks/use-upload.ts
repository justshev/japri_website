import { useMutation } from "@tanstack/react-query";
import { uploadApi } from "@/lib/api/upload";

export function useUploadFile() {
  return useMutation({
    mutationFn: ({ file, bucket }: { file: File; bucket?: string }) =>
      uploadApi.upload(file, bucket),
  });
}

export function useDeleteFile() {
  return useMutation({
    mutationFn: (path: string) => uploadApi.delete(path),
  });
}
