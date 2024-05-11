"use client"
import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import DisplayImage from './DisplayImage';

const UploadImage: React.FC = () => {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<string[][] | null>(null);

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const img = new Image();
        img.onload = () => {
            const colorThief = new ColorThief();
            const colors = colorThief.getPalette(img, 6);
            const colorPalette = colors.map((color: number[]) => color.map(c => c.toString()));
            setUploadImage(URL.createObjectURL(file));
            setColorPalette(colorPalette);
        };
        img.src = URL.createObjectURL(file);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input type="file" onChange={handleUploadImage} style={{ display: "none" }} ref={inputRef} />
            <h1 onClick={() => { inputRef.current?.click(); }}>Upload</h1>
            <DisplayImage uploadedImage={uploadImage} colorPalette={colorPalette} />
        </>
    );
};

export default UploadImage;
