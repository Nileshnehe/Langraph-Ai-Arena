import express from "express";
import useGraph from "./ai/graph.service.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
      return res.status(200).json({ status: 'ok' })
})

app.post("/user-graph", async (req, res) => {
      try {
            const result = await useGraph("What is the capital of India?");

            console.log("Mistral:", result.solution_1);
            console.log("Cohere:", result.solution_2);

            return res.status(200).json(result);
      } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Graph invocation failed" });
      }

});

export default app;