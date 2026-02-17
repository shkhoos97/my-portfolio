import { config } from './config.js';
import { AGRO_SYSTEM_PROMPT } from './agroPrompt.js';

const CHAT_COMPLETIONS_PATH = '/chat/completions';

export async function generateAgroReply(history, userMessage) {
  const messages = [
    { role: 'system', content: AGRO_SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage }
  ];

  const response = await fetch(`${config.openAiBaseUrl}${CHAT_COMPLETIONS_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openAiKey}`
    },
    body: JSON.stringify({
      model: config.openAiModel,
      temperature: 0.4,
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI provider error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('AI provider returned an empty response.');
  }

  return content;
}
