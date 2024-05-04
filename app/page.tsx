import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-9xl font-extrabold">365</div>
      <div className="mt-4 text-gray-400">
        Days since the last War Thunder leak
      </div>
      <div className="absolute top-4 right-4 text-sm text-gray-400">
        Last checked: {new Date().getMinutes()} minutes ago
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
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
