import axios from "axios";
import sharp from "sharp"; // Untuk resize gambar
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("image");
  const width = searchParams.get("width");
  const height = searchParams.get("height");

  if (!imageUrl) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    let imageBuffer = response.data;

    // Resize gambar jika ada parameter width & height
    if (width && height) {
      imageBuffer = await sharp(imageBuffer)
        .resize(parseInt(width), parseInt(height), { fit: "cover" })
        .toBuffer();
    }

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="wallpaper-${Date.now()}.jpg"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to download image" }, { status: 500 });
  }
}
