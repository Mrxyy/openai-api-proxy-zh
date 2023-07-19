import { serve } from "https://deno.land/std/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";

serve(async (request) => {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);

  if (url.pathname === "/") {
    const readmeUrl = new URL("./Readme.md", import.meta.url);
    const readmeResponse = await fetch(readmeUrl);
    return {
      status: readmeResponse.status,
      headers: readmeResponse.headers,
      body: readmeResponse.body,
    };
  }

  url.host = OPENAI_API_HOST;
  const targetUrl = url.toString();

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  const responseHeaders = new Headers(response.headers);
  return {
    status: response.status,
    headers: responseHeaders,
    body: response.body,
  };
});
