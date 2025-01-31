export const dynamic = 'force-dynamic';
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "anime"; // Default ke "anime" jika tidak ada query
    const totalPages = 5; // Jumlah halaman yang ingin diambil
    const baseUrl = `https://www.wallpaperflare.com/search?wallpaper=${query}&page=`;

    const wallpaper = [];

    // console.log(`Scraping started for search query: ${query}`);

    for (let page = 1; page <= totalPages; page++) {
      const url = `${baseUrl}${page}`;
      // console.log(`Scraping page ${page}: ${url}`);

      const { data } = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
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

      // console.log(`Page ${page} scraped, total images: ${wallpaper.length}`);
    }

    // console.log("Scraping finished!");
    return Response.json({ success: true, wallpaper });
  } catch (error) {
    console.error("Scraping Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
