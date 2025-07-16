import { Application, proxy } from 'https://deno.land/x/oak/mod.ts';

// 读取环境变量中的 API 密钥
const apiKey = Deno.env.get('GROQ_API_KEY');

if (!apiKey) {
  console.warn('Warning: GROQ_API_KEY environment variable not found. Server will reject requests.');
}

const app = new Application({ proxy: true });

// 只在有 API 密钥的前提下添加认证头
app.use(async (ctx, next) => {
  if (!apiKey) {
    ctx.response.status = 500;
    ctx.response.body = { error: 'GROQ_API_KEY environment variable is not configured' };
    return;
  }
  ctx.request.headers.append('Authorization', `Bearer ${apiKey}`);
  await next();
});

app.use(proxy('https://api.groq.com'));

console.log('Server started on port 8000');
app.listen({ port: 8000 });
