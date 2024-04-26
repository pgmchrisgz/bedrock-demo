import dotenv from "dotenv";
dotenv.config();

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

import { fromEnv } from "@aws-sdk/credential-provider-env";

const client = new BedrockRuntimeClient({
  region: "us-west-2",
  BedrockRuntimeClientConfig: fromEnv(),
});

export default async function handler(req, res) {
  (async () => {
    console.log("req", req);
    const result = await getAiResponse(req.query.pokemon);
    res.status(200).json({ pokemon: result });
  })().catch((error) => {
    console.error(error);
    res.status(500).json({ pokemon: "error" });
  });
}

const getAiResponse = async (prompt) => {
  const input = {
    modelId: "anthropic.claude-instant-v1",
    // modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      prompt: `\n\nHuman:${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 300,
      temperature: 0.5,
      top_k: 250,
      top_p: 1,
    }),
  };

  const command = new InvokeModelCommand(input);
  try {
    const response = await client.send(command);
    const rawRes = response.body;
    const jsonString = new TextDecoder().decode(rawRes);
    const parsedResponse = JSON.parse(jsonString);

    return parsedResponse?.completion
      ? parsedResponse?.completion
      : "I am unable to respond to this prompt. Please try something else";
  } catch (error) {
    console.log(error);
    return "Trouble connected to AI service. Please try again later.";
  }
};
