import { geminiModel } from "../ai/models.js";

async function testModel() {
    const res = await geminiModel.invoke("What is capital of India");
    console.log(res);
    
};

testModel();