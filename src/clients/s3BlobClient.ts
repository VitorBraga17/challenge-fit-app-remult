import { put } from "@vercel/blob";

export default async function s3UploadFile(file: File, fileName: string): Promise<string> {
  const { url } = await put(`users_photos/${fileName}` , file, {
    access: "public",
    token: process.env.NEXT_PUBLIC_BLOB_TOKEN
  });
  return url;
}
