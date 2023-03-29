import React, { useState } from "react";
import MenuButton from "./MenuButton";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
  ArrowUpOnSquareStackIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { db } from "@/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

type Props = {
  generateImage: () => Promise<void>;
  setDislike: React.Dispatch<React.SetStateAction<boolean>>;
  dislike: boolean;
  photo: string;
  prompt: string;
  selectedImage: string
};

const Menu = ({ generateImage, setDislike, dislike, photo, prompt, selectedImage }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { address, isConnected } = useAccount();

  const likeImage = () => {
    setLiked(!liked);
  };
  const dislikeImage = () => {
    setDislike(true);
    generateImage();
  };
  const uploadGeneratedImage = () => {
    const notification = toast.loading("Coping...");
    try {
      navigator.clipboard.writeText(photo);
      toast.success("Downloaded successfully", {
        id: notification,
      });
    } catch (error) {
      toast.error("Ups, error", {
        id: notification,
      });
    }
  };
  const postImage = () => {
    if (isConnected === false) {
      alert("Please connect your wallet");
      return;
    }
    if (liked === true) {
      const notification = toast.loading("Posting...");
      try {
        db.collection("images").add({
          user: address,
          photo: photo,
          prompt: prompt,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        toast.success("Posted successfully", {
          id: notification,
        });
      } catch (error) {
        toast.error("Ups, error", {
          id: notification,
        });
      }
    }
  };
  return (
    <div className="py-6 mt-10 xl:mt-0 max-w-full flex items-center justify-center md:justify-between flex-wrap md:flex-row 2xl:flex-col xl:justify-center 2xl:gap-10 gap-2 md:gap-0">
      <MenuButton
        text="Like"
        icon={
          liked ? (
            <HandThumbUpIconSolid className="w-6 h-6" />
          ) : (
            <HandThumbUpIcon className="w-6 h-6" />
          )
        }
        handleClick={likeImage}
        active={photo.length > 0 && true}
      />
      <MenuButton
        text="Dislike"
        icon={
          dislike ? (
            <HandThumbDownIconSolid className="w-6 h-6" />
          ) : (
            <HandThumbDownIcon className="w-6 h-6" />
          )
        }
        handleClick={dislikeImage}
        active={photo.length == 0 ? false : liked ? false : true}
      />
      <a
        href={(photo || selectedImage) || '#'}
        target="_blank"
        className="w-full sm:w-[200px] md:w-fit xl:w-[200px]"
        
      >
        <MenuButton
          text="Export"
          active={selectedImage.length > 0 && true || liked == true}
          icon={<ArchiveBoxArrowDownIcon className="w-6 h-6" />}
          handleClick={uploadGeneratedImage}
        />
      </a>
      <MenuButton
        text="Post Image"
        active={liked == true}
        icon={<ArrowUpOnSquareStackIcon className="w-6 h-6" />}
        handleClick={postImage}
      />
    </div>
  );
};

export default Menu;
