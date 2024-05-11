"use client"
import React, {useState} from 'react'; 
import getImageColors from "get-image-colors";
const UplaodImage: React.FC = () => {
    const [uploadImage, setUploadImage] = useState<string | null>(null);
    const [colorPalette, setColorPalette] = useState<string[] | null>(null);

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file) return;
        const reader = new FileReader();

    reader.onload = async (event) => {
        const img = new Image();

        img.onload = async () => {
            const colors = await getImageColors(img.src, {
                count: 6, // Number of colors to extract
            });
            const colorPalette = colors.map((color) => color.hex());
            setUploadImage(event.target?.result?.toString() ?? null);
            setColorPalette(colorPalette);
        };
        img.src = event.target?.result?.toString() ?? "";
    };

    reader.readAsDataURL(file);
    }
    return (
        <div>
            
        </div>
    );
};

export default UplaodImage;
