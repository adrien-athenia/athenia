import OpenAI from "openai";
import { getAgentById } from "@/lib/agents";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "OPENAI_API_KEY non configurée" }, { status: 500 });
    }

    const { agentId, messages } = await req.json();
    const agent = getAgentById(agentId);
    if (!agent) return Response.json({ error: "Agent not found" }, { status: 404 });

    const openai = new OpenAI({ apiKey });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        { role: "system", content: agent.systemPrompt },
        ...messages,
      ],
      max_tokens: 1000,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
