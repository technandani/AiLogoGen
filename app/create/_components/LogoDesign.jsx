"use client";

import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import LogoDesigns from "../../_data/LogoDesigns";
import Lookup from "../../_data/Lookup";

function LogoDesign({ onHandleInputChange, formData }) {
  const [selectedDesign, setSelectedDesign] = useState(formData?.design?.title);
  return (
    <>
      <div className="flex gap-4 flex-col">
        <HeadingDescription
          title={Lookup?.LogoDesignTitle}
          description={Lookup?.LogoDesignDesc}
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-4  sm:grid-cols-2 max-sm:grid-cols-2 gap-5 mt-2 cursor-pointer">
          {LogoDesigns.map((design, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 w-[200px]  max-sm:w-[150px] ${ selectedDesign==design.title&&'border-2 border-orange-500 p-1 rounded'}`}
              onClick={()=>{setSelectedDesign(design.title); onHandleInputChange(design)}}
            >
              <div className={`h-[150px] rounded w-[200px]  max-sm:w-[150px] flex justify-center items-center overflow-hidden  ${ selectedDesign==design.title&&'!w-[190px] max-sm:!w-[140px] overflow-hidden'}`}><img src={design.image} alt="logo design" className="h-fit w-full rounded" /></div>
              <h2 className="text-md text-center">{design.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LogoDesign;
