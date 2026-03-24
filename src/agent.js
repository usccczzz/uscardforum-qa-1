import { ToolLoopAgent, stepCountIs } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { forumTools } from './tools.js';
import { SYSTEM_PROMPT } from './system-prompt.js';

export function createAgent(apiKey, model) {
  const google = createGoogleGenerativeAI({ apiKey });

  return new ToolLoopAgent({
    model: google(model),
    instructions: SYSTEM_PROMPT,
    tools: forumTools,
    stopWhen: stepCountIs(15),
  });
}
