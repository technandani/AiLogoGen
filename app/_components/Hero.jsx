"use client";

import React, { useState, useEffect } from "react";
import Lookup from "../_data/Lookup";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import BoardThree from "./BoardThree";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [LogoTitle, setLogoTitle] = useState("");
  // console.log(LogoTitle);
  return (
    isClient && (
      <>
        <div className="mt-32 max-sm:mt-24 gap-5 flex flex-col w-[60%] sm:max-w-full max-sm:w-full px-20 max-sm:px-2 z-50">
          <h2 className="text-5xl max-sm:text-2xl text-orange-500 font-extrabold">
            {Lookup.HeroHeading}
          </h2>
          <h2 className="text-2xl font-bold w-[70vw]">
            {Lookup.HeroSubheading}
          </h2>
          <p className="text-lg text-gray-500">{Lookup.HeroDesc}</p>
          <div className="h-[40px] flex max-sm:flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder={Lookup.InputTitlePlaceholder}
              onChange={(e) => {
                setLogoTitle(e.target.value);
              }}
              className="bg-gray-200 shadow-sm h-full max-sm:h-[40px] max-sm:py-4 rounded-md px-2 w-96 max-sm:!w-full max-sm:text-lg"
              style={{ outline: "none" }}
            />
            <Link href={"/create?title=" + LogoTitle}>
              <Button className=" h-full max-sm:w-full rounded-md px-4 max-sm:text-xl">Get started</Button>
            </Link>
          </div>

          {/* <div className="bg-[#ee9b00] p-6">
            <BoardThree />
          </div> */}
        </div>
        <div className="z-0 flex max-sm:hidden"  style={{position:'absolute', bottom:'0', right:'0'}}>
          <BoardThree />
        </div>
      </>
    )
  );
};

export default Hero;
