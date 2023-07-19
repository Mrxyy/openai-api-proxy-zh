import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const server = serve({ port: 8000 });
const OPENAI_API_HOST = "api.openai.com";

console.log("HTTP webserver running.  Access it at:  http://localhost:8000/");

for await (const request of server) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const response = await fetch(new URL("./Readme.md", import.meta.url));
    const body = await response.text();
    request.respond({ body });
  } else {
    url.host = OPENAI_API_HOST;
    const response = await fetch(url, request);
    const body = await response.text();
    request.respond({ status: response.status, body });
  }
}
