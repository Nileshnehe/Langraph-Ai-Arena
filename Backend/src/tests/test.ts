import { geminiModel } from "../ai/models.service.js";

async function testModel() {
    const res = await geminiModel.invoke("What is capital of India");
    console.log(res);
    
};

testModel();