export const SERVER_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

  export const isDeveloperEnvironment = process.env.NODE_ENV === "development"