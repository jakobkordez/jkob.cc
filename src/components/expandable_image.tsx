"use client";

import { useState } from "react";
import ModalImage from "./modal_image";
import { StaticImageData } from "next/image";

interface ExpandableImageProps {
  src: string | StaticImageData;
  alt: string;
  children?: React.ReactNode;
}

export default function ExpandableImage({
  src,
  alt,
  children,
}: ExpandableImageProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setShowModal(true);
          window.history.pushState(null, "", "#");
          window.onpopstate = () => setShowModal(false);
        }}
      >
        {children}
      </div>

      {showModal && (
        <ModalImage src={src} alt={alt} onClose={() => window.history.back()} />
      )}
    </div>
  );
}
