import UploadImage from "@/components/Images/UplaodImage";
import Image from "next/image";

export default function Home() {
  return (
  <>
 <UploadImage />
 <div className="flex justify-center items-center h-screen">
  
            <div className="max-w-screen-lg w-full flex flex-col md:flex-row">
                <div className="md:w-1/2"></div>
\
                </div>
                <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 p-8 mt-8 md:mt-0">
                    <h2 className="text-2xl font-bold mb-4">Color Palettes</h2>
                    {/* Placeholder for color palettes */}
                </div>
            </div>
        
  </>
  );
}
