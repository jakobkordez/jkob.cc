"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";

interface ModalImageProps {
  src: string | StaticImageData;
  alt: string;
  onClose: () => void;
}

export default function ModalImage({ src, alt, onClose }: ModalImageProps) {
  const size = src instanceof String ? 2048 : undefined;
  const placeholder = src instanceof String ? undefined : "blur";

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center overflow-hidden p-4">
      <div
        className="absolute inset-0 z-40 bg-black opacity-80 transition-opacity"
        onClick={onClose}
      />

      <button
        className="relative z-50 m-2 ml-auto text-2xl text-white transition-colors duration-200 ease-in-out hover:text-gray-200 "
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>

      <div className="relative flex h-full w-full flex-1 overflow-hidden">
        <Image
          src={src}
          alt={alt}
          height={size}
          width={size}
          placeholder={placeholder}
          className="z-50 m-auto aspect-auto h-auto max-h-full w-auto max-w-full rounded shadow-2xl"
        />
      </div>
    </div>
  );
}
