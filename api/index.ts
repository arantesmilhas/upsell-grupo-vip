// Vercel serverless function: bridges Node IncomingMessage/ServerResponse
// to the Web standard fetch handler exported by TanStack Start's SSR build.
import type { IncomingMessage, ServerResponse } from "node:http";
// @ts-expect-error - resolved at runtime from the build output
import server from "../dist/server/server.js";

function buildRequest(req: IncomingMessage): Request {
  const host = req.headers.host ?? "localhost";
  const protocol =
    (req.headers["x-forwarded-proto"] as string | undefined) ?? "https";
  const url = `${protocol}://${host}${req.url ?? "/"}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  const method = (req.method ?? "GET").toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";

  return new Request(url, {
    method,
    headers,
    body: hasBody ? (req as unknown as ReadableStream) : undefined,
    // @ts-expect-error - Node 18+ requires duplex for streamed bodies
    duplex: hasBody ? "half" : undefined,
  });
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const request = buildRequest(req);
    const response: Response = await server.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    console.error("[vercel handler] error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}