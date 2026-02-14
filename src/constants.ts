export const CHARACTER_LIMIT = 25_000;
const rawUrl = process.env.XCANNY_API_URL || "http://localhost/api/v1";
export const API_BASE_URL = rawUrl.endsWith("/") ? rawUrl : rawUrl + "/";
export const API_KEY = process.env.XCANNY_API_KEY || "";
export const MEMBER_ID = process.env.XCANNY_MEMBER_ID || "";
