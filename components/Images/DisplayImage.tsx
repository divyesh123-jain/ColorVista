"use client"
import React from 'react';
import Image from 'next/image';
import Colors from '../colors';
import Upload from '@/helpers/Upload';

interface DisplayImageProps {
  uploadedImage: string | null;
  colorPalette: string[][] | null;
}

const DisplayImage: React.FC<DisplayImageProps> = ({ uploadedImage, colorPalette }) => {
  const toHex = (rgb: string) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) hex = "0" + hex;
    return hex;
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
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
              {colorPalette.map((color, index) => {
                const rgb = `rgb(${color.join(",")})`;
                const hex = `#${toHex(color[0])}${toHex(color[1])}${toHex(color[2])}`;
                return <Colors key={index} rgb={rgb} hex={hex} />;
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayImage;