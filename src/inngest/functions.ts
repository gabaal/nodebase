import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { gemini } from "inngest";
const google = createGoogleGenerativeAI()
const openai = createOpenAI()
const anthropic = createAnthropic()

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'you are a helpful assistant',
      prompt: 'what is 2 + 2?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    })

    const { steps: openAiStep } = await step.ai.wrap('openAi-generate-text', generateText, {
      model: openai('gpt-4'),
      system: 'you are a helpful assistant',
      prompt: 'what is 4 + 4?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    })

    return { gemini: geminiSteps, openAi: openAiStep }
  },
);