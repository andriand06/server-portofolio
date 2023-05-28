import express from "express";
import router from "../../routes/api";
import serverless from "serverless-http";
export async function handler(event, context) {
  const api = express();
  api.use("/api/", router);
  return serverless(api)(event, context);
}
