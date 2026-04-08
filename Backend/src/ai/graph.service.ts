import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, StateGraph, START } from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";

const state = new StateSchema({
    messages: MessagesValue,
});

const solutionNode: GraphNode<typeof state> = (state) => {
    console.log(state.messages);

    return {
        messages: state.messages
    };
};

const graph = new StateGraph(state)
    .addNode("solution", solutionNode)
    .addEdge(START, "solution")
    .compile();

export default async function (userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    });

    return result.messages;
}