import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

const BUCKET_NAME = "fitness-app";
const FOLDER_NAME = "user_photos/";

const credentials = {
  accessKeyId: "dd3329a763b0b7fa84578d647e334b60",
  secretAccessKey: "a8879feef1b65ed9632823f51bb0befd13063646dc7bd590a656d45766fd54b1",
};

// Create an S3 service client object.
const s3Client = new S3Client({
  forcePathStyle: true,
  endpoint: "https://fztgwejxqqlhihbwdxme.supabase.co/storage/v1/s3",
  credentials: credentials,
  region: "us-west-1",
});

export async function uploadObjectToS3(fileName: string, fileContent: Buffer | string, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${FOLDER_NAME}${fileName}`,
        Body: fileContent,
        ContentType: contentType,
      });

      await s3Client.send(command);

      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      console.log("Upload successful:", url);
      return url;
    } catch (error) {
      console.error("Error uploading object:", error);
      throw error;
    }
  }

  export async function getObjectFromS3(fileName: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${FOLDER_NAME}${fileName}`,
      });
  
      const response = await s3Client.send(command);
  
      if (response.Body instanceof Readable) {
        const chunks: Uint8Array[] = [];
        for await (const chunk of response.Body) {
          chunks.push(chunk);
        }
        return Buffer.concat(chunks);
      } else {
        throw new Error("Unexpected response body type");
      }
    } catch (error) {
      console.error("Error retrieving object:", error);
      throw error;
    }
  }