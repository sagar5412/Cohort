import { Hono } from 'hono'
import { HtmlEscapedCallbackPhase } from 'hono/utils/html';

const app = new Hono()

async function AuthMiddleware(c:any,next:any) {
  try {
    if(c.req.header("Authorization")){
      await next();
    }else{
      return c.text("You dont have access")
    }
  } catch (error) {
    console.log(error)
  }
}

app.get('/',AuthMiddleware, async(c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"))
  return c.text('Hello Hono!')
})

export default app