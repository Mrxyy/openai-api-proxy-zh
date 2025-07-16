import { Application, proxy } from 'https://deno.land/x/oak/mod.ts';

// 读取环境变量中的API密钥
const apiKey = Deno.env.get('GROQ_API_KEY');

if (!apiKey) {
  console.error('Error: GROQ_API_KEY environment variable is not set');
  Deno.exit(1);
}

const app = new Application({ proxy: true });

// 添加Authorization头
app.use(async (ctx, next) => {
  ctx.request.headers.append('Authorization', `Bearer ${apiKey}`);
  await next();
});

app.use(proxy('https://api.groq.com'));

console.log('Server is running on http://localhost:8000');
app.listen({ port: 8000 });
