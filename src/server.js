// src/server.js
import { createServer, Model, Response } from "miragejs"
import { postBuilder } from './stubs/builders'

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob" })
      server.create("user", { name: "Alice" })
    },

    routes() {
      this.urlPrefix = "http://localhost:8080"

      this.get("/users", (schema) => {
        return schema.users.all()
      });
      this.post("/api/login", () => {
        return new Response(200, {}, {
            message: "login successful"
        })
      });
      this.post("/api/signup", (schema, req) => {
        let attrs = JSON.parse(req.requestBody)
        console.log(attrs);
        return new Response(200, {}, {
            message: "signup successful"
        })
      });
      this.get("/posts", (schema, req) => {
        const [post1, post2] = [postBuilder(), postBuilder()]; 
        let posts = Array(2);
        posts = [post1, post2]
        return new Response(200, {}, posts)
      })
    },
  })

  return server
}