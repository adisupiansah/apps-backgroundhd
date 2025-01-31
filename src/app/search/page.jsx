import React, { Suspense } from "react";
import Navbar from "@/components/Navigasi/Navbar";
import SearchPage from "@/components/Search/SearchPage";

const page = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div className="loader"></div>}>
        <SearchPage />
      </Suspense>
    </div>
  );
};

export default page;
