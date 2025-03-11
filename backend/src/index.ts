import * as cheerio from "cheerio";

interface Env {
  database: KVNamespace;
}

export default {
  // Add a fetch handler to respond to HTTP requests
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response("War Thunder Leak Tracker Worker", {
      headers: { "Content-Type": "text/plain" }
    });
  },

  async scheduled(event, env, ctx): Promise<void> {
    try {
      const response = await fetch("https://en.wikipedia.org/wiki/War_Thunder", {
        headers: {
          'Cache-Control': 'no-store'
        },
      });
      
      const html = await response.text();
      const $ = cheerio.load(html);
      const table = $(".sortable");
      const lastRow = $("tr:last-child", table);
      const date = $("td:first-child", lastRow).text().trim();
      
      const latestDate = await env.database.get("latestDate");
      
      // Update KV if the date has changed
      if (date !== latestDate) {
        await env.database.put("latestDate", date);
        console.log(`Updated latest leak date to: ${date}`);
      } else {
        console.log(`No new leaks found. Latest date remains: ${latestDate}`);
      }
    } catch (error) {
      console.error("Error checking for War Thunder leaks:", error);
    }
  },
} satisfies ExportedHandler<Env>;
