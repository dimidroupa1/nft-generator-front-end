import React, { useState } from "react";
import MenuButton from "./MenuButton";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";
import {
    HandThumbUpIcon as HandThumbUpIconSolid,
    HandThumbDownIcon as HandThumbDownIconSolid,
  } from "@heroicons/react/24/solid";

type Props = {
    generateImage: () => Promise<void>
};

const Menu = ({generateImage}: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);
  const likeImage = () => {
    setLiked(!liked);
  };
  const dislikeImage = () => {
    setDislike(true)
    generateImage()
  }

  return (
    <div className="py-6 mt-10 xl:mt-0 max-w-full flex items-center justify-center md:justify-between flex-wrap md:flex-row 2xl:flex-col xl:justify-center 2xl:gap-10 gap-2 md:gap-0">
      <MenuButton
        text="Like"
        icon={liked ? <HandThumbUpIconSolid className="w-6 h-6" /> : <HandThumbUpIcon className="w-6 h-6" />}
        handleClick={likeImage}
      />
      <MenuButton
        text="Dislike"
        icon={dislike ? <HandThumbDownIconSolid className="w-6 h-6" /> : <HandThumbDownIcon className="w-6 h-6" />}
        handleClick={dislikeImage}
      />
      <MenuButton
        text="Share image"
        active={liked == true}
        icon={<ShareIcon className="w-6 h-6" />}
        handleClick={likeImage}
      />
      <MenuButton
        text="PostImage"
        active={liked == true}
        icon={<ArrowUpOnSquareStackIcon className="w-6 h-6" />}
        handleClick={likeImage}
      />
    </div>
  );
};

export default Menu;
