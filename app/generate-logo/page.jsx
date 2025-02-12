"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDetailContex } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import FileSaver from "file-saver";

function GenerateLogo() {
  const user = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContex);
  const [generatedImage, setGeneratedImage] = useState();
  const [loading, setLoading] = useState(false);
  // console.log("user details: ", userDetail);
  // console.log("user details email: ", userDetail?.email);

  //get form data
  const [logoDetails, setlogoDetails] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storageData = localStorage.getItem("formdata");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        setlogoDetails(parsedData);
        console.log("form data: ", parsedData);
      }
    }
  }, [userDetail]);

  //logo prompt

  const generateLogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace(
      "{logoTitle}",
      logoDetails?.title?.title || ""
    )
      .replace("{logoDesc}", logoDetails?.desc || "")
      .replace("{logoColor}", logoDetails?.palatte || "")
      .replace("{logoDesign}", logoDetails?.design?.title || "")
      .replace("{logoPrompt}", logoDetails?.design?.prompt || "")
      .replace("{logoIdea}", logoDetails?.idea?.ideaName || "");
    // console.log("prompt: ", logoDetails);
    // console.log("Generated prompt: ", PROMPT);

    //generate ai logo prompt

    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });
    console.log("AI generated prompt: ", result.data.prompt);

    //generate ai logo

    const res = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: logoDetails?.title?.title,
      desc: logoDetails?.desc,
    });
    console.log("AI generated image: ", res.data);
    setGeneratedImage(res.data.cloudinaryUrl);
    console.log("AI generated img: ", generatedImage);
    setLoading(false);
  };

  useEffect(() => {
    if (logoDetails) {
      generateLogo();
    }
  }, [logoDetails]);

  return (
    <div>
      {
        <>
          <div className="flex items-center justify-center h-screen w-screen">
            <div className="flex gap-4 flex-col items-center justify-center h-96 w-96 max-sm:w-[95%] ">
              {loading ? (
                <>
                  <div className="w-full h-full flex flex-col">
                    <div className="flex animate-pulse bg-gray-100 rounded-sm h-full">
                      <div className="flex flex-col m-auto items-center justify-center">
                        <img
                          src="/images/loading.gif"
                          alt=""
                          className="h-[100px] w-[100px]"
                        />
                        <div className="text-xl">Generating...</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                generatedImage && (
                  <img
                    src={generatedImage}
                    alt="logo"
                    className="h-full w-full rounded-lg"
                  />
                )
              )}
              {generatedImage && (
                <div className="flex max-sm:flex-col max-sm:gap-4 justify-between w-full">
                  <Button
                  className="max-sm:w-full max-sm:text-lg max-sm:py-6"
                    onClick={() =>
                      FileSaver.saveAs(generatedImage, "download.jpg")
                    }
                    
                  >
                    Download
                  </Button>
                  <Link href={"/dashboard"}>
                    <Button variant="outline" className="w-full max-sm:text-lg max-sm:py-6">Go to dashboard</Button>
                  </Link>
                </div>
              )}
            </div>
            {/* <Image src={generatedImage} height={50} width={50} alt="logo"/> */}
          </div>
        </>
      }
    </div>
  );
}

export default GenerateLogo;
