import type { NextRequest } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.NODE_ENV !== "development" &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const response = await fetch("https://en.wikipedia.org/wiki/War_Thunder");
  const html = await response.text();
  const $ = cheerio.load(html);
  const data = $('.red').text();
  console.log(data);

  return Response.json({ success: true });
}
