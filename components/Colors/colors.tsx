"use client"
import React, { useState } from 'react';
import { FaRegClipboard } from 'react-icons/fa';
import { TbCopyCheckFilled } from 'react-icons/tb';

interface ColorsProps {
  rgb: string;
  hex: string;
  isSelected: boolean;
  handleColorSelect: (rgb: string, hex: string) => void;
  handleCopyHex: (hex: string) => void;
  copiedHex: string;
}

const Colors: React.FC<ColorsProps> = ({
  rgb,
  hex,
  isSelected,
  handleColorSelect,
  handleCopyHex,
  copiedHex,
}) => {
  const [copy, setCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    } catch (error) {
      console.log("Failed to copy", error);
    }
  };

  return (
    <li
      className={`bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-900 p-1.5 md:p-2 rounded-lg relative hover:cursor-pointer hover:-translate-y-1 transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => handleColorSelect(rgb, hex)}
    >
      <div
        style={{ background: rgb }}
        className={`bg-${rgb} h-32 w-24 md:h-40 md:w-32 rounded-lg`}
      >
        <span className="absolute px-1 py-1.5 right-2 bottom-2 md:right-4 md:bottom-4 rounded">
          {copy ? (
            <TbCopyCheckFilled size={16} className="text-gray-100" />
          ) : (
            <FaRegClipboard
              size={16}
              color="black"
              className=""
              onClick={handleCopy}
            />
          )}
        </span>
        {copiedHex === hex && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-lg">
            <span className="text-white">Copied!</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default Colors;