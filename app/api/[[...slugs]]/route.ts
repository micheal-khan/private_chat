import { redis } from "@/lib/redis";
import { Elysia, t } from "elysia";
import { nanoid } from "nanoid";

const ROOM_TTL_SECONDS = 60 * 10; // 10 minutes

const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  console.log("Created a new room");
  const roomId = nanoid();

  await redis.hset(`meta:${roomId}`, { connected: [], createdAt: Date.now() });
  await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS); // 24 hours

  return { roomId };
});

const app = new Elysia({ prefix: "/api" }).use(rooms);

export const GET = app.fetch;
export const POST = app.fetch;
export type App = typeof app;
