import React, { useRef, useState } from "react";
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { put, type PutBlobResult } from "@vercel/blob";
import dotenv from "dotenv";
import s3UploadFile from "@/app/clients/s3BlobClient";

interface BlobButtonProps {
  onUploadComplete?: (fileName: string) => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
  label?: string;
  showFileName?: boolean;
  maxFileSizeMB?: number;
}

const BlobUploadButton: React.FC<BlobButtonProps> = ({
  onUploadComplete,
  variant = "contained",
  color = "primary",
  size = "medium",
  label = "Alterar foto",
  showFileName = true,
  maxFileSizeMB = 10,
}) => {
  //const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSizeMB) {
      setAlert({
        open: true,
        message: `O arquivo é muito grande. O tamanho máximo é ${maxFileSizeMB}MB.`,
        severity: "error",
      });
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress >= 95 ? 95 : newProgress;
      });
    }, 300);

    try {
      const url = await s3UploadFile(file, "teste");
      onUploadComplete?.(url);
    } catch (error: unknown) {
      console.error("Erro ao enviar o arquivo:", error);
      setAlert({
        open: true,
        message: "Falha ao enviar o arquivo. Por favor, tente novamente.",
        severity: "error",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <input
        ref={fileInputRef}
        accept="*/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        onChange={handleFileUpload}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant={variant}
          color={color}
          size={size}
          onClick={openFileDialog}
          disabled={isUploading}
          startIcon={
            isUploading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CloudUploadIcon />
            )
          }
          sx={{ minWidth: "120px" }}
        >
          {isUploading ? "Enviando..." : label}
        </Button>

        {showFileName && selectedFile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AttachFileIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Tooltip title={selectedFile.name}>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedFile.name}
              </Typography>
            </Tooltip>
          </Box>
        )}
      </Box>

      {isUploading && (
        <Box sx={{ width: "100%", mt: 1 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography
            variant="caption"
            sx={{ display: "block", textAlign: "right" }}
          >
            {Math.round(uploadProgress)}%
          </Typography>
        </Box>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlobUploadButton;
