import React from "react";

type Props = {
  text: string;
  active?: boolean;
  icon: JSX.Element
  handleClick: () => void | (() => Promise<void>)
};

const MenuButton = ({ text, active, icon, handleClick }: Props) => {
  return (
    <button
      className={`border border-gray-500 rounded-md hover:bg-[rgba(255,255,255,0.1)] hover:border-gray-300 transition-all px-6 py-3 ${
        active == false && "cursor-not-allowed opacity-50"
      } flex items-center gap-1 w-full sm:w-[200px] md:w-fit xl:w-[200px] justify-center`}
      disabled={active == false}
      onClick={handleClick}
    >
        {icon}
      {text}
    </button>
  );
};

export default MenuButton;
