"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const WalHome = () => {
  const [wallpaper, setWallpaper] = useState([]);

  const fetchWallapaper = async () => {
    const response = await fetch("/api/walhome");
    const data = await response.json();

    if (data.success) {
      setWallpaper(data.wallpaper);
    }
  };

  useEffect(() => {
    fetchWallapaper();
  }, []);

  return (
    <div className="walhome mt-[3rem]">
      <div className="container-fluid">
        <div className="title mt-[2rem]">
          <h1 className="text-center font-bold text-[28px]">POPULAR WALLPAPER</h1>
        </div>
        <div className="row">
          {wallpaper.map((item) => (
            <div className="col-md-3 mt-2" key={item.id}>
              <div className="wallpaper">
                <Image src={item.url} width={500} height={500} alt={item.title}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalHome;
