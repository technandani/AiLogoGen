"use client";
import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "../../_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle ({onHandleInputChange, formData}) {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");
  useEffect(()=>{
    onHandleInputChange({title});
  },[])

  return (
    <div className="flex gap-4 flex-col">
      <HeadingDescription
        title={Lookup?.LogoTitle}
        description={Lookup?.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder="Enter your logo name"
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-200 rounded-md px-2 w-96 max-sm:w-full h-[40px]"
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default LogoTitle;
