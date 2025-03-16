import React, { useRef, useState } from "react";
import { uploadObjectToS3 } from "@/app/clients/s3Client";

const S3UploadButton: React.FC = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileContent: ArrayBuffer = await file.arrayBuffer();
      const fileName: string = file.name;
      const contentType: string = file.type;

      await uploadObjectToS3(fileName, Buffer.from(fileContent), contentType);
      alert("File uploaded successfully!");
    } catch (error: unknown) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        accept="*/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        onChange={handleFileUpload}
      />
      <button onClick={openFileDialog} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default S3UploadButton;