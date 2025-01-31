import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req) {
  try {
    const url = "https://www.wallpaperflare.com";
    // const url = `${process.env.SCRAPING_URL}`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);
    const wallpaper = [];


    // Loop setiap gambar dalam .gallery
    $("figure").each((index, element) => {
      let imgElement = $(element).find("a[itemprop='url'] img");
      let titleElement = $(element).find("figcaption[itemprop='caption description']");

      let imgSrc = imgElement.attr("data-src") || imgElement.attr("src");
      let title = titleElement.text().trim(); // Ambil teks dari figcaption

      if (imgSrc) {
        wallpaper.push({ id: index, url: imgSrc, title });
      }
    });


    return Response.json({ success: true, wallpaper });
  } catch (error) {
    console.error("Scraping Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
