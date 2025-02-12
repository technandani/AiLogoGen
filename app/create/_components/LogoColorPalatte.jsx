"use client";

import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "../../_data/Lookup";
import colors from "../../_data/Colors";

function LogoColorPallete ({onHandleInputChange, formData}) {
  const [selectedColor, setSelectedColor] = useState(formData?.palatte);
  // console.log(selectedColor);
  return (
    <>
      <div className="flex gap-4 flex-col">
        <HeadingDescription
          title={Lookup?.LogoColorPaletteTitle}
          description={Lookup?.LogoColorPaletteDesc}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5 cursor-pointer">
          {
            colors.map((palette, index)=>(
              <div key={index} className={`flex ${selectedColor==palette.name&&'border-2 rounded border-blue-600 p-1'}`}>
                {palette?.colors.map((color, index)=>(
                  <div className="h-24 w-full" key={index} style={{backgroundColor:color}} onClick={()=>{setSelectedColor(palette.name); onHandleInputChange(palette.name)}}></div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default LogoColorPallete;
