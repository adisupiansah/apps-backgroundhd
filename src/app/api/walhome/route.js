import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req) {
  try {
    const baseUrl = "https://www.wallpaperflare.com";
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`;

    const { data } = await axios.get(proxyUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    const $ = cheerio.load(data);
    const wallpaper = [];

    $("figure").each((index, element) => {
      let imgElement = $(element).find("a[itemprop='url'] img");
      let titleElement = $(element).find("figcaption[itemprop='caption description']");

      let imgSrc = imgElement.attr("data-src") || imgElement.attr("src");
      let title = titleElement.text().trim();

      if (imgSrc) {
        wallpaper.push({ id: index, url: imgSrc, title });
      }
    });

    return Response.json({ success: true, wallpaper });
  } catch (error) {
    console.error("Scraping Error:", error);
    
    // Jika proxy pertama gagal, coba proxy cadangan
    try {
      const baseUrl = "https://www.wallpaperflare.com";
      const backupProxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(baseUrl)}`;
      
      const { data } = await axios.get(backupProxyUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "text/html,application/xhtml+xml",
        },
      });

      const $ = cheerio.load(data);
      const wallpaper = [];

      $("figure").each((index, element) => {
        let imgElement = $(element).find("a[itemprop='url'] img");
        let titleElement = $(element).find("figcaption[itemprop='caption description']");

        let imgSrc = imgElement.attr("data-src") || imgElement.attr("src");
        let title = titleElement.text().trim();

        if (imgSrc) {
          wallpaper.push({ id: index, url: imgSrc, title });
        }
      });

      return Response.json({ success: true, wallpaper });

    } catch (backupError) {
      return Response.json(
        { success: false, error: backupError.message },
        { status: 500 }
      );
    }
  }
}