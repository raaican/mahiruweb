import { Database } from "bun:sqlite"

const db = new Database("database.db")

db.run(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT
)
`)

Bun.serve({
  port: 3000,

  async fetch(req) {
    const url = new URL(req.url)

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    }

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    if (url.pathname === "/register" && req.method === "POST") {
      const body = await req.json()

      if (!body.username || body.username.length > 32) {
        return Response.json({ success: false }, { headers: corsHeaders })
      }

      const id = Date.now()
      const username = body.username

      db.run(
        "INSERT INTO users (id, username) VALUES (?, ?)",
        [id, username]
      )

      return Response.json(
        { success: true, id },
        { headers: corsHeaders }
      )
    }

    if (url.pathname === "/login" && req.method === "POST") {
      const body = await req.json()

      if (!body.username || body.username.length > 32 || !Number.isInteger(id) || String(id).length > 15) {
        return Response.json({ success: false }, { headers: corsHeaders })
      }

      const user = db.query(
        "SELECT * FROM users WHERE username = ? AND id = ?"
      ).get(body.username, body.id)

      if (user) {
        return Response.json({ success: true }, { headers: corsHeaders })
      }

      return Response.json({ success: false }, { headers: corsHeaders })
    }

    return new Response("Not found", {
      status: 404,
      headers: corsHeaders
    })

  }
})
