import { Application, proxy } from 'https://deno.land/x/oak/mod.ts';

const app = new Application({proxy:true});
app.use(proxy('https://generativelanguage.googleapis.com'));

app.listen({ port: 8000 });
