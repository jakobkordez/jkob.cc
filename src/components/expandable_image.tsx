'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const size = isString(src) ? 2048 : undefined;
  const placeholder = isString(src) ? undefined : 'blur';

  return (
    <div>
      <div
        onClick={() => {
          setShowModal(true);
          window.history.pushState(null, '', '#');
          window.onpopstate = () => setShowModal(false);
        }}
      >
        {children}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden p-4">
          <div
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => window.history.back()}
          />

          <button
            className="absolute right-6 top-6 z-[60] rounded-full px-4 py-2 text-2xl text-white transition-colors duration-200 ease-in-out hover:bg-black/40 hover:text-gray-200"
            onClick={() => window.history.back()}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>

          <div className="relative z-50 max-h-full max-w-full">
            <Image
              src={src}
              alt={alt}
              height={size}
              width={size}
              placeholder={placeholder}
              className="h-auto max-h-full w-auto max-w-full rounded shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isString(s: any) {
  return typeof s === 'string' || s instanceof String;
}
