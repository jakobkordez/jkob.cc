"use client";

import { useState } from "react";

interface IgImageProps {
  src: string;
  alt?: string;
}

export default function IgImage({ src, alt }: IgImageProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="block aspect-square w-full cursor-pointer overflow-hidden rounded bg-white/20 shadow-2xl transition-all ease-in-out hover:brightness-75"
      >
        <img src={src} alt={alt} className="h-full w-full object-fill" />
        {alt && <div className="py-1 px-3">{alt}</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex flex-col items-center overflow-hidden py-10 px-20">
          <div
            className="absolute inset-0 bg-black opacity-80 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <img
            src={src}
            alt={alt}
            className="relative m-auto max-h-full max-w-full rounded shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
