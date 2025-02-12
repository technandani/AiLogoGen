"use client";

import React, {useState} from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "../../_data/Lookup";

function LogoDesc ({onHandleInputChange, formData}) {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <HeadingDescription
          title={Lookup?.LogoDescTitle}
          description={Lookup?.LogoDescDesc}
        />
        
              <input
                type="text"
                placeholder="Enter your logo description"
                defaultValue={formData?.desc}
                onChange={(e) => onHandleInputChange(e.target.value)}
                className="bg-gray-200 rounded-md px-2 w-96 max-sm:w-full h-[40px]"
                style={{ outline: "none" }}
              />
      </div>
    </>
  );
};

export default LogoDesc;
