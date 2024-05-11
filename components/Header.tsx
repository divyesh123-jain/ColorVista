import React from "react";


import { ChangeEvent } from "react";

interface HeaderProps {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleUploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ handleChange , handleUploadImage }) => {
  return (
    <header className="py-4">
      <div className="flex justify-around mx-auto md:px-14">
 
        <div className="flex items-center gap-1 cursor-pointer">
       
          <h2 className="text-md md:text-2xl text-white">ColorVista
</h2>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div>
            <label
              htmlFor="file"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Upload Image
            </label>
            <input type="file" id="file" hidden onChange={handleChange} />
          </div>
        
        </div>
      </div>
    </header>
  );
};

export default Header;
