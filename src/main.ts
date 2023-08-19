import { Hono } from "hono"

const app = new Hono()

app.use('/*', async (c, next) => {
  try{
    await c.next()
  } catch(error) {
    return c.text(`${error.name}: ${error.message}`)
  }
})

app.use('/*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  await c.next()
})
app.get('/about', c => c.json({
  basePath: '/',
  instanceId: 'scarlet.deno.dev'
}))
app.get('/get-instances', c => c.json({
  instances: [],
}))
app.post('/search', async c => {
  const body = await c.req.json()
  const result = ["https://exmaple.com"].map(url => {
    return {
      score: 1,
      title: url,
      iconUrl: "",
      description: url,
      url: url,
      thumbnail: null,
    }
  })
  return c.json({
    result,
  })
})
Deno.serve(app.fetch)
