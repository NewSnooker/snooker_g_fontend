import { treaty } from "@elysiajs/eden";
import type { app } from "@backend/index";
import { API_URL } from "../config/constant";

// API client ที่มี type safety
export const backend = treaty<app>(API_URL);
