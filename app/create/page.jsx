"use client";

import React, { useState, useEffect } from "react";
import LogoTitle from "./_components/LogoTitle";
import LogoDesc from "./_components/LogoDesc";
import LogoDesign from "./_components/LogoDesign";
import LogoColorPalatte from "./_components/LogoColorPalatte";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import { Button } from "../../components/ui/button";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const page = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  const [step, setStep] = useState(1);
  const [formData, setFromdata] = useState();
  const onHandleInputChange = (field, value) => {
    setFromdata((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("form data:", formData);
  };
  return (
    <div className="min-h-[90vh] max-sm:w-[90%] flex items-center justify-center !mt-4 !mb-6 !ml-4 !mr-4 max-sm:mt-0 max-sm:mb-0  max-sm:ml-2  max-sm:mr-2">
      {domLoaded && (
        <div className="p-10 border max-sm:border-none max-sm:p-0 max-sm:px-0 rounded-xl">
          {step == 1 ? (
            <LogoTitle
              onHandleInputChange={(v) => onHandleInputChange("title", v)}
              formData={formData}
            />
          ) : step == 2 ? (
            <LogoDesc
              onHandleInputChange={(v) => onHandleInputChange("desc", v)}
              formData={formData}
            />
          ) : step == 3 ? (
            <LogoColorPalatte
              onHandleInputChange={(v) => onHandleInputChange("palatte", v)}
              formData={formData}
            />
          ) : step == 4 ? (
            <LogoDesign
              onHandleInputChange={(v) => onHandleInputChange("design", v)}
              formData={formData}
            />
          ) : step == 5 ? (
            <LogoIdea
              onHandleInputChange={(v) => onHandleInputChange("idea", v)}
              formData={formData}
            />
          ) : step == 6 ? (
            <PricingModel
              onHandleInputChange={(v) => onHandleInputChange("idea", v)}
              formData={formData}
            />
          ) : null}
          <div className="w-full flex justify-between items-center mt-10">
            {step != 1 && step != 6 && (
              <Button onClick={() => setStep(step - 1)} variant="outline">
                <HiArrowNarrowLeft />
                previous
              </Button>
            )}
            {step != 6 &&(
              <Button onClick={() => setStep(step + 1)}>
              <HiArrowNarrowRight /> Continue
            </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
