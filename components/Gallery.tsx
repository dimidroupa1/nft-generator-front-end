import React, { useEffect, useState } from "react";
import Post from "./Post";
import {
  getDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAccount } from "wagmi";

type Props = {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>
};

const Gallery = ({ setSelectedImage }: Props) => {
  const [posts, setPosts] = useState<Array<any>>();
  const { address } = useAccount()
  useEffect(() => {
    onSnapshot(
      query(collection(db, "images"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  });
  const selectPost = (item: any) => {
    setSelectedImage(item.data().photo)
  }
  return (
    <div className="flex-[0.35] lg:border-l border-gray-500 py-6 px-10 2xl:px-0 max-h-[100%] overflow-y-scroll flex flex-col gap-5">
      {posts?.map((item, index) => item.data().user == address && (
        
        <div key={index} onClick={() => selectPost(item)}>
         <Post item={item}/>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
