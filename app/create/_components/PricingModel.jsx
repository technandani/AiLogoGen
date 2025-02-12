"use client";

import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "../../_data/Lookup";
// import { Button } from "@/components/ui/button";
import { Button } from "../../../components/ui/button";
import { features, title } from "process";
import { useUser } from "@clerk/nextjs";
import { SignIn, SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

function PricingModel({ formData }) {
  const { user } = useUser();
  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formdata", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <>
      <div>
        <HeadingDescription
          title={Lookup.LogoPricingModelTitle}
          description={Lookup.LogoPricingModelDesc}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-4">
        {Lookup.pricingOption.map((pricing, i) => (
          <div key={i} className="p-4 border-2 border-gray-900 rounded flex flex-col items-center gap-2 px-6">
            <div>
              <img
                src={pricing.icon}
                alt=""
                height={50}
                width={50}
                className="rounded-full"
              />
            </div>
            <div className="font-medium text-2xl">{pricing.title}</div>
            <div className="">
              {pricing.features.map((feature, index) => (
                <h3 className="text-lg max-sm:text-md mt-3" key={index}>
                  {feature}
                </h3>
              ))}
            </div>
           <div className="mt-2">
           {user ? (
              <Link href={`/generate-logo?type=${formData.title.title}`}>
                <Button className=" max-sm:text-lg">{pricing.button}</Button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={`/generate-logo?type=${formData.title.title}`}
              >
                <Button>{pricing.button}</Button>
              </SignInButton>
            )}
           </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PricingModel;
