import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

const OPENAI_API_HOST = "api.openai.com";

for await (const req of s) {
  const url = new URL(req.url, "http://localhost:8000");

  if (url.pathname === "/") {
    const response = await fetch(new URL("./Readme.md", import.meta.url));
    req.respond({ body: response.body });
  } else {
    url.host = OPENAI_API_HOST;
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
    req.respond({ status: response.status, headers: response.headers, body: response.body });
  }
}
