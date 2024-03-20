"use client";
import useLayoutService from "@/lib/hooks/useLayout";
import React, { useEffect } from "react";

export default function Popup() {
  const { popup, closePopup } = useLayoutService();
  const handleBackgroundClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };
  
  return (
    <>
      {popup? (
        <div className="w-[100vw] h-[100vh] absolute z-10 bg-gray-400 bg-opacity-20 flex justify-center items-center" 
        onClick={handleBackgroundClick}
        >
          <div className="min-h-[400px] min-w-[400px] bg-white z-15">
              <button onClick={closePopup}>x</button>
            {popup}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
