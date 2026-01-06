import { Elysia, t } from "elysia";

const rooms = new Elysia({ prefix: "/room" })
  .get("/", { res: { message: "Hello MF" } })
  .post("/create", () => {
    console.log("Created a new room");
  });

const app = new Elysia({ prefix: "/api" })
  .get("/user", { user: { id: 1, name: "John Doe" } })
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  })
  .use(rooms);


export const GET = app.fetch;
export const POST = app.fetch;
export type App = typeof app 