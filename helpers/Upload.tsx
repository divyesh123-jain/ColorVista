import React from 'react'

const Upload = () => {
  return (
    <div>
       <div className="flex flex-col justify-center items-center gap-6 md:gap-10">
                        <img
                            src="/upload.svg"
                            alt=""
                            className="h-20 md:h-32 opacity-70 text-gray-800"
                        />
                        <p className="text-sm md:text-base text-gray-400 text-center">
                            Please upload an image!
                        </p>
                    </div>
    </div>
  )
}

export default Upload
