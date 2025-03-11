export const dynamic = 'force-dynamic'
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Link from "next/link";

export default async function Home() {
  let daysSinceLastLeak = 0;

  try {
    const db = getCloudflareContext()?.env?.database;
    if (db) {
      const date = await db.get("latestDate");
      if (date) {
        daysSinceLastLeak = Math.floor(
          (new Date().getTime() - new Date(date as string).getTime()) /
            (1000 * 60 * 60 * 24)
        );
      }
    }
  } catch (error) {
    console.error("Error accessing database:", error);
    daysSinceLastLeak = 10;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 font-mono text-white">
      <div className="text-9xl font-extrabold">{daysSinceLastLeak}</div>
      <div className="mt-4 text-gray-400">
        Days since the last War Thunder leak
      </div>
      <div className="absolute top-4 right-4 text-sm text-zinc-400">
        Last checked: {5 - (new Date().getMinutes() % 5)} minutes ago
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
