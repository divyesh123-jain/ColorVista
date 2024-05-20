"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaRegClipboard, FaTimesCircle, FaCopy } from 'react-icons/fa';
import { Gradient } from 'smooth-gradient';
import Upload from '@/helpers/Upload';

interface DisplayImageProps {
  uploadedImage: string | null;
  colorPalette: string[][] | null;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ uploadedImage, colorPalette }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [gradientColors, setGradientColors] = useState<string[]>([]);
  const [copiedHex, setCopiedHex] = useState<string>('');
  const [copiedGradientColor, setCopiedGradientColor] = useState<string>('');

  useEffect(() => {
    // Reset selectedColors and gradientColors when uploadedImage changes
    setSelectedColors([]);
    setGradientColors([]);
  }, [uploadedImage]);

  const toHex = (rgb: string) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) hex = "0" + hex;
    return hex;
  };

  const handleColorSelect = (rgb: string, hex: string) => {
    const color = hex;
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      if (selectedColors.length < 5) {
        setSelectedColors([...selectedColors, color]);
      } else {
        alert('You can only select up to 5 colors.');
      }
    }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex('');
    }, 1000);
  };

  const handleCopyGradientColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedGradientColor(color);
    setTimeout(() => {
      setCopiedGradientColor('');
    }, 1000);
  };

  const generateGradient = () => {
    if (selectedColors.length < 2) {
      alert('Please select at least 2 colors.');
      return;
    }

    const gradient = new Gradient(...selectedColors);
    const gradientSteps = 10; // Adjust the number of steps as needed
    const colors = [];

    for (let i = 0; i <= 100; i += 100 / gradientSteps) {
      colors.push(gradient.getColorFromValue(i, 'rgb'));
    }

    setGradientColors(colors);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-8 md:flex-row md:my-12">
        {uploadedImage ? (
          <div className='px-7 pt-20'>
            <Image
              src={uploadedImage}
              alt="image"
              height={200}
              width={200}
              className="object-cover w-80 md:w-[500px] rounded-xl"
            />
          </div>
        ) : (
          <Upload />
        )}
        {/* palette */}
        {colorPalette && (
          <div className='w-auto mt-8 md:mt-20'>
            <h2 className="text-xl font-bold mb-2">Colors</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
              {colorPalette.map((color, index) => {
                const rgb = `rgb(${color.join(",")})`;
                const hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
                const isSelected = selectedColors.includes(hex);
                return (
                  <li
                    key={index}
                    className={`bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-900 p-1.5 md:p-2 rounded-lg relative hover:cursor-pointer hover:-translate-y-1 transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => handleColorSelect(rgb, hex)}
                  >
                    <div
                      style={{ background: rgb }}
                      className={`h-32 w-24 md:h-40 md:w-32 rounded-lg relative`}
                    >
                      <span className="absolute px-1 py-1.5 right-2 bottom-2 md:right-4 md:bottom-4 rounded">
                        {isSelected ? (
                          <FaTimesCircle
                            size={16}
                            color='red'
                            onClick={() => handleColorSelect(rgb, hex)}
                          />
                        ) : (
                          <FaRegClipboard
                            size={16}
                            color='black'
                            onClick={() => handleCopyHex(hex)}
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
              })}
            </ul>
          </div>
        )}
      </div>
      {selectedColors.length >= 2 && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Gradients</h2>
          <div className="flex justify-center mb-4">
            <button
              onClick={generateGradient}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate Gradient
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
            {gradientColors.map((color, index) => (
              <div
                key={index}
                className={`bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-900 h-32 w-24 md:h-40 md:w-36 rounded-lg relative hover:cursor-pointer hover:-translate-y-1 transition-all mr-2 mb-2`}
                style={{ background: color }}
                onClick={() => handleCopyGradientColor(color)}
              >
                <div className="absolute px-1 py-1.5 right-2 bottom-2 md:right-4 md:bottom-4 rounded">
                  <FaCopy
                    size={16}
                    color='black'
                  />
                </div>
                {copiedGradientColor === color && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-lg">
                    <span className="text-white">Copied!</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayImage;