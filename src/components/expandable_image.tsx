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
        <div className="fixed inset-0 z-40 flex flex-col items-center overflow-hidden p-4">
          <div
            className="absolute inset-0 z-40 bg-black opacity-80 transition-opacity"
            onClick={() => window.history.back()}
          />

          <button
            className="relative z-50 m-2 ml-auto text-2xl text-white transition-colors duration-200 ease-in-out hover:text-gray-200"
            onClick={() => window.history.back()}
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
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isString(s: any) {
  return typeof s === 'string' || s instanceof String;
}
