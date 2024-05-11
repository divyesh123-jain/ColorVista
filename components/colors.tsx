"use client"
import React, { useState } from 'react';
import { FaRegClipboard } from 'react-icons/fa6';
import { TbCopyCheckFilled } from 'react-icons/tb';

interface ColorsProps {
    rgb: string;
    hex: string;
}

const Colors: React.FC<ColorsProps> = ({ rgb, hex }) => {
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
        <li className="bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-900 p-1.5 md:p-2 rounded-lg relative hover:cursor-pointer hover:-translate-y-1 transition-all">
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
                            className="text-zinc-100"
                            onClick={handleCopy}
                        />
                    )}
                </span>
            </div>
        </li>
    );
};

export default Colors;
