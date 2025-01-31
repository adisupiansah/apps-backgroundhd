import DownloadPage from "@/components/Download/DownloadPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div className="loader"></div>}>
        <DownloadPage />
      </Suspense>
    </div>
  );
};

export default page;
