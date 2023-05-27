import express from "express";
import router from "../../routes/api";
export async function handler(event, context) {
  const api = express();
  api.use("/api/", router);
  return serverless(api)(event, context);
}
