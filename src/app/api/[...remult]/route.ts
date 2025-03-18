// src/app/api/[...remult]/route.ts

import { api } from "@/app/api";

export const { POST, PUT, DELETE, GET } = api

console.log("Remult API carregada!"); // Isso vai aparecer nos logs do Vercel
