import type { NextRequest } from "next/server";
import cheerio from "cheerio";
import { get } from "@vercel/edge-config";

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
  const table = $(".sortable");
  const lastRow = $("tr:last-child", table);
  const date = $("td:first-child", lastRow).text().trim();
  const latestDate = await get("latestDate");

  if (date !== latestDate) {
    const edgeConfigId = "ecfg_w0wf4jqqciasvm8fpcaupgqp3t0c";
    const teamId = "team_UBFzQSfMln6678x3c86CDQpM";
    const vercelApiToken = process.env.VERCEL_API_TOKEN!;

    const url = `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items?teamId=${teamId}`;

    const body = {
      items: [
        {
          operation: "upsert",
          key: "latestDate",
          value: date,
        },
      ],
    };

    const vercelResponse = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelApiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!vercelResponse.ok) {
      return new Response("Error updating edge store", {
        status: vercelResponse.status,
      });
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
