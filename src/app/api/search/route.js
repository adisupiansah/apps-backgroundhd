export const dynamic = 'force-dynamic';
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "anime";
    const totalPages = 5;
    const baseUrl = `https://www.wallpaperflare.com/search?wallpaper=${query}&page=`;
    const wallpaper = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = `${baseUrl}${page}`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

      const { data } = await axios.get(proxyUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      const $ = cheerio.load(data);

      $("figure").each((index, element) => {
        let imgElement = $(element).find("a[itemprop='url'] img");
        let titleElement = $(element).find("figcaption[itemprop='caption description']");

        let imgSrc = imgElement.attr("data-src") || imgElement.attr("src");
        let title = titleElement.text().trim();

        if (imgSrc) {
          wallpaper.push({ id: wallpaper.length, url: imgSrc, title });
        }
      });
    }

    return Response.json({ success: true, wallpaper });
  } catch (error) {
    console.error("Scraping Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}