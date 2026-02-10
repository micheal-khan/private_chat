"use client";
import { useUsername } from "@/hooks/use-username";
import { client } from "@/lib/eden";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Lobby() {
  const { username } = useUsername();
  const router = useRouter();

  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.api.room.create.post();

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`);
      }
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {wasDestroyed && (
          <div className="p-4 bg-red-500/50 border border-red-900 text-white text-center rounded">
            <p className="text-red-500 text-sm font-bold">
              The room was destroyed
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              All messages have been deleted and the room is no longer
              accessible.
            </p>
          </div>
        )}
        {error === "room-not-found" && (
          <div className="p-4 bg-red-500/50 border border-red-900 text-white text-center rounded">
            <p className="text-red-500 text-sm font-bold">Room not found</p>
            <p className="text-zinc-500 text-xs mt-1">
              This room does not exist or has already been destroyed. Please
              check the link and try again.
            </p>
          </div>
        )}
        {error === "room-full" && (
          <div className="p-4 bg-red-500/50 border border-red-900 text-white text-center rounded">
            <p className="text-red-500 text-sm font-bold">
              Room Full - Maximum Capacity Reached
            </p>
            <p className="text-zinc-500 text-xs mt-1">
              This room has reached its maximum capacity of participants. Please
              try joining another room or create a new one.
            </p>
          </div>
        )}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {">"}Private_Chat
          </h1>
          <p className="text-zinc-500 text-sm">
            A private self desructive chat room
          </p>
        </div>
        <div className="border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center to-zinc-500">
                Your Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>
            <button
              onClick={() => createRoom()}
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-color mt-2 cursor-pointer disabled:opacity-50"
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const Page = () => {
  return (
    <Suspense>
      <Lobby />
    </Suspense>
  );
};

export default Page;
