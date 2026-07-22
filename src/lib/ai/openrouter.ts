const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

export const AI_MODELS = {
  free: "google/gemma-2-9b-it:free",
  pro: "openai/gpt-4o",
} as const;

interface GenerateOptions {
  prompt: string;
  title: string;
  recipientName?: string;
  type: "proposal" | "invoice" | "contract";
  model?: string;
}

interface ProposalSection {
  title: string;
  content: string;
}

interface ProposalContent {
  sections: ProposalSection[];
  pricing?: {
    items: { description: string; amount: number }[];
    total: number;
  };
}

function buildSystemPrompt(type: string): string {
  const typeLabels: Record<string, string> = {
    proposal: "a professional business proposal",
    invoice: "an invoice",
    contract: "a service contract",
  };

  return `You are a professional ${type === "proposal" ? "proposal" : "document"} writer. Generate ${typeLabels[type] ?? "a document"} in JSON format.

Output JSON with this structure:
{
  "sections": [
    { "title": "Section Title", "content": "Section content in markdown" }
  ],
  "pricing": {
    "items": [
      { "description": "Service description", "amount": 0 }
    ],
    "total": 0
  }
}

Use professional language. Be specific and persuasive. Output ONLY valid JSON, no markdown wrapping.`;
}

export async function generateDocumentContent(
  options: GenerateOptions,
): Promise<ProposalContent> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  const model = options.model ?? AI_MODELS.free;
  const recipientContext = options.recipientName
    ? `The recipient is ${options.recipientName}.`
    : "";

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(options.type) },
        {
          role: "user",
          content: `Title: "${options.title}"
${recipientContext}
Type: ${options.type}

User's requirements:
${options.prompt}

Generate a complete ${options.type} with detailed sections and pricing.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content generated");
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }
}
