"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const DownloadPage = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("image");

  // Fungsi untuk download gambar original
  const handleDownloadOriginal = () => {
    if (!imageUrl) return alert("Tidak ada gambar untuk diunduh!");

    const downloadUrl = `/api/download?image=${encodeURIComponent(imageUrl)}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `wallpaper-original-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fungsi untuk download gambar sesuai ukuran layar
  const handleDownloadForScreen = () => {
    if (!imageUrl) return alert("Tidak ada gambar untuk diunduh!");

    const screenWidth = window.screen.width; // Lebar asli layar
    const screenHeight = window.screen.height; // Tinggi asli layar

    const downloadUrl = `/api/download?image=${encodeURIComponent(
      imageUrl
    )}&width=${screenWidth}&height=${screenHeight}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `wallpaper-${screenWidth}x${screenHeight}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Download Wallpaper</h1>
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Selected Wallpaper"
              className="w-full rounded-lg mb-4"
              width={500}
              height={500}
            />
            <div className="flex gap-4">
              <button
                onClick={handleDownloadOriginal}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Download Original
              </button>
              <button
                onClick={handleDownloadForScreen}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Download for Your Screen
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-700">Tidak ada gambar yang dipilih.</p>
        )}
      </div>
    </div>
  );
};

export default DownloadPage;
