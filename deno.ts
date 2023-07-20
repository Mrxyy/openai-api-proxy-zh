import { Server } from "https://deno.land/std/http/server.ts";

const TARGET = "https://api.openai.com";
const handler = async (request: Request) => {
  const url = new URL(request.url);
  const targetUrl = new URL(TARGET + url.pathname + url.search);

  return await fetch(targetUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
};

const server = new Server({ handler });
