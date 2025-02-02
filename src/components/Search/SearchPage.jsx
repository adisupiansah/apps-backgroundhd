"use client";
import { useSearchParams, useRouter } from "next/navigation"; // Tambahkan useRouter
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ITEMS_PER_PAGE = 80;

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Inisialisasi useRouter
  const query = searchParams.get("q");
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchWallpapers(query);
    }
  }, [query]);

  const fetchWallpapers = async (keyword) => {
    try {
      const response = await fetch(`/api/search?q=${keyword}`);
      const data = await response.json();

      if (data.success) {
        setWallpapers(data.wallpaper);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Navigasi ke halaman /download dengan membawa data gambar
  const handleImageClick = (imageUrl) => {
    router.push(`/download?image=${encodeURIComponent(imageUrl)}`);
  };

  // Tampilkan animasi loading jika data sedang di-fetch
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-[350px]">
        <div className="loader"></div>
      </div>
    );
  }

  // Tampilkan pesan jika tidak ada data
  if (!loading && wallpapers.length === 0) {
    return (
      <div className="text-center mt-[150px]">
        <p className="text-gray-700 text-[1.5rem]">
          Tidak ada hasil pencarian untuk: {query}
        </p>
      </div>
    );
  }

  // Hitung index data yang akan ditampilkan
  const itemterakhir = currentPage * ITEMS_PER_PAGE;
  const itempertama = itemterakhir - ITEMS_PER_PAGE;
  const wallpapersaatini = wallpapers.slice(itempertama, itemterakhir);

  return (
    <div className="searchpage mb-[3rem] mt-[8rem] md:mt-[7rem]">
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-center font-semibold text-[20px] md:text-[2rem]">
            Hasil pencarian: {query}
          </h1>
          {wallpapersaatini.map((item) => (
            <div className="col-md-3" key={item.id}>
              <div className="wallpaper mt-[1rem]">
                <Image
                  src={item.url}
                  alt={item.title}
                  width={500}
                  height={500}
                  onClick={() => handleImageClick(item.url)} // Tambahkan onClick
                  className="cursor-pointer" // Ubah cursor menjadi pointer
                />
                <span className="mt-2 text-gray-700">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 btn-pagination rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-[20px] font-semibold">Page {currentPage}</span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev * ITEMS_PER_PAGE < wallpapers.length ? prev + 1 : prev
              )
            }
            disabled={currentPage * ITEMS_PER_PAGE >= wallpapers.length}
            className="px-4 py-1 btn-pagination rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;