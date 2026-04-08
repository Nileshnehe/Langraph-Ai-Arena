import express from "express";
import useGraph from "./ai/graph.service.js";

const app = express();

app.get("/health", (req, res) => {
      return res.status(200).json({ status: 'ok'})
})

app.post("/user-graph",async (req, res) => {
await useGraph("What is the capital of India?")
})

export default app;