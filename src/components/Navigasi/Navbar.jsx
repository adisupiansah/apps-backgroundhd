"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import RelatedSearch from "./RelatedSearch";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-gray-100 shadow-sm">
        <div className="container p-1 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-decoration-none text-[28px]">
            Wallpaper HD
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wallpapers..."
              className="border p-2 rounded-full w-64"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-full text-[25px]"
            >
              <FiSearch/>
            </button>
          </form>

         
        </div>
      </nav>

      {/* Komponen Related Search */}
      <RelatedSearch />
    </div>
  );
};

export default Navbar;
