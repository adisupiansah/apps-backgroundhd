'use client'
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home flex justify-center items-center vh-100">
      <div className="bg-gelap"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="flex flex-column justify-center items-center mb-5">
              <h1 className="text-center font-bold text-[60px] text-white">
                WALLPAPER HD
              </h1>
              <p className="text-[20px] font-semibold text-white">
                temukan genre wallpaper anda
              </p>
            </div>
            <div className="btn-genre flex justify-center items-center mt-2">
              <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wallpapers..."
                  className="border p-2 rounded-full w-[385px]"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-full"
                >
                  <FiSearch className="text-[28px]"/>
                </button>
              </form>
            </div>

            <div className="link flex justify-center items-center mt-[7rem]">
              <Link
                className="link-section py-[10px] px-[20px] text-decoration-none rounded-full font-bold text-center"
                href="#"
              >
                lihat wallpaper👇
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
