"use client";

import Image from "next/image";
import { useState } from "react";

interface ModalImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ModalImage({
  src,
  alt,
  width,
  height,
}: ModalImageProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="mx-auto mb-auto block w-fit cursor-pointer overflow-hidden rounded bg-white/20 shadow-2xl transition-all ease-in-out hover:brightness-75"
      >
        <Image src={src} alt={alt} width={width} height={height} />
        {alt && <div className="py-1 px-3">{alt}</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex flex-col items-center overflow-hidden py-10 px-20">
          <div
            className="absolute inset-0 bg-black opacity-80 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <Image
            src={src}
            alt={alt}
            height={1600}
            width={1600}
            className="relative m-auto max-h-full max-w-full rounded shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
