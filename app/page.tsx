export const dynamic = "force-dynamic";
import { get } from "@vercel/edge-config";
import Link from "next/link";

export default async function Home() {
  const latestDate = await get("latestDate");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 font-mono text-white">
      <div className="text-9xl font-extrabold">
        {Math.floor(
          (new Date().getTime() - new Date(latestDate as number).getTime()) /
            (1000 * 60 * 60 * 24)
        )}
      </div>
      <div className="mt-4 text-gray-400">
        Days since the last War Thunder leak
      </div>
      <div className="absolute top-4 right-4 text-sm text-zinc-400">
        Last checked: {new Date().getMinutes()} minutes ago
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-zinc-500">
        <p>
          This page is not affiliated with Gaijin Entertainment or War Thunder.
        </p>
        <p className="mt-1">
          Details about the last War Thunder leak can be found on the{" "}
          <Link
            className="underline hover:text-gray-300"
            href="https://en.wikipedia.org/wiki/War_Thunder#Document_leaks"
            target="_blank"
          >
            War Thunder Wikipedia page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
