import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import GeneratedImage from "./GeneratedImage";
import Menu from "./Menu";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { storage } from "@/firebase";

type Props = {};

const GenerateImage = (props: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [disLiked, setDisLiked] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(false);
  const { address, isConnected } = useAccount();

  const uploadToStorage = async (generatedPhoto: string) => {
    let symbols = "qwertyuiopasdfghjklzxcvvbnnm1234567890!@#$%^&*()_+<>?|}{[]~";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += symbols[Math.floor(Math.random() * symbols.length)];
    }
    let downloadURL;
    const uploadImage = await storage
      .ref(`images/${result}.png`)
      .putString(generatedPhoto.split(",")[1], "base64", {
        contentType: "images/png",
      })
      .then(async (snapshot) => {
        downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
      });

    return downloadURL;
  };

  const generateImage = async () => {
    if (prompt) {
      const notification = toast.loading("Generating nft...");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: prompt }),
        });

        const data = await response.json();

        const downloadedImage = await uploadToStorage(
          `data:image/jpeg;base64,${data.photo}`
        );
        setPhoto(String(downloadedImage));

        toast.success("Generated", {
          id: notification,
        });


        setLoading(false);
        setDisLiked(false);
        setGenerated(true);
      } catch (error) {
        toast.error("Upssss, error", {
          id: notification,
        });
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <div className="flex-[0.65] py-6 px-10 2xl:px-0 flex flex-col items-center">
      <div className="w-full flex flex-col xl:flex-row flex-1 gap-5">
        <GeneratedImage image={photo}/>
        <Menu generateImage={generateImage} />
      </div>
      <div className="md:mt-10 2xl:mt-0 flex gap-5 w-full flex-col md:flex-row">
        <input
          type="text"
          placeholder="Enter a description of your image..."
          className="px-6 py-4 bg-transparent border border-gray-500 rounded-md flex-1"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-[#0E76FD] px-10 py-4 xl:w-[200px] rounded-md 2xl:mr-10"
          onClick={generateImage}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default GenerateImage;