import Image from "next/image";
import React from "react";
import Logo from "../assets/logo2.png";

type Props = {
  image: string;
  loading: boolean
};

const GeneratedImage = ({ image, loading }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <div className={`w-[300px] h-[300px] md:h-[500px] md:w-[500px] flex items-center justify-center bg-[rgba(255,255,255,0.06)] border border-gray-500 rounded-md`}>
        {image ? (
          <img
            src={image}
            alt=""
            className="w-[100%] object-contain"
          />
        ) : (
          <Image
            src={Logo}
            alt=""
            className={`w-[50%] text-gray-400 opacity-20 object-contain ${loading && 'animate-pulse'}`}
          />
        )}
      </div>
    </div>
  );
};

export default GeneratedImage;
