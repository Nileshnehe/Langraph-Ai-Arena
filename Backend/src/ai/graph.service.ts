import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { mistralModel, cohereModel } from "./models.service.js";

const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  solution_1: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
  solution_2: Annotation<string>({ reducer: (_, next) => next, default: () => "" }),
  judge_recommendation: Annotation<{ solution_1_score: number; solution_2_score: number }>({
    reducer: (_, next) => next,
    default: () => ({ solution_1_score: 0, solution_2_score: 0 }),
  }),
});

// const solutionNode = async (state: typeof StateAnnotation.State) => {
//   const userContent = state.messages[0]?.content as string;

//   const [mistral_solution, cohere_solution] = await Promise.all([
//     mistralModel.invoke(userContent),
//     cohereModel.invoke(userContent),
//   ]);

//   return {
//     solution_1: mistral_solution.content as string,
//     solution_2: cohere_solution.content as string,
//   };
// };

const solutionNode = async (state: typeof StateAnnotation.State) => {
  const userContent = state.messages[0]?.content as string;

  const [mistral_solution, cohere_solution] = await Promise.all([
    mistralModel.invoke(userContent),
    cohereModel.invoke(userContent),
  ]);

  console.log("Mistral raw response:", JSON.stringify(mistral_solution, null, 2)); // ← yeh add karo
  console.log("Cohere raw response:", JSON.stringify(cohere_solution, null, 2));   // ← yeh add karo

  return {
    solution_1: mistral_solution.content as string,
    solution_2: cohere_solution.content as string,
  };
};

const graph = new StateGraph(StateAnnotation)
  .addNode("solution", solutionNode)
  .addEdge(START, "solution")
  .addEdge("solution", END)
  .compile();

export default async function (userMessage: string) {
  return graph.invoke({
    messages: [new HumanMessage(userMessage)],
  });
}