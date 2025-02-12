"use client";

import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "../../_data/Lookup";
import Prompt from "../../_data/Prompt";
import axios from "axios";

function LogoIdea({ onHandleInputChange, formData }) {
  const [selectedIdea, setSelectedIdea] = useState(
    formData?.idea?.ideaName || ""
  );
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiCalled, setApiCalled] = useState(false); // Prevents unnecessary API calls

  useEffect(() => {
    if (formData && !apiCalled) {
      generateLogoDesignIdea();
      setApiCalled(true); // Ensures API is called only once
    }
  }, [formData]);

  const generateLogoDesignIdea = async () => {
    try {
      setLoading(true);

      // Ensure formData properties exist before using them
      const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
        "{logoType}",
        formData?.design?.title || ""
      )
        .replace("{logoTitle}", formData?.title?.title || "")
        .replace("{logoDesc}", formData?.desc || "")
        .replace("{logoPrompt}", formData?.design?.prompt || "");

      console.log("Idea prompt: ", PROMPT);

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      if (result.data.logo_ideas) {
        setIdeas(result.data.logo_ideas); // Ensure correct API response key
      } else {
        console.log("Invalid API response format", result.data);
      }
    } catch (error) {
      console.log("Error generating logo ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ideas.length > 0) {
      console.log("Generated ideas: ", ideas);
    }
  }, [ideas]);

  return (
    <>
      <div className="flex gap-4 flex-col">
        <HeadingDescription
          title={Lookup?.LogoIdeaTitle}
          description={Lookup?.LogoIdeaDesc}
        />
        {loading ? (
          // <p>Loading ideas...</p>
          <>
            <div className="mx-auto w-full grid lg:grid-cols-3 max-sm:grid-cols-1 gap-4">
              <div className="flex animate-pulse bg-gray-300 rounded-sm ">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
              <div className="flex animate-pulse bg-gray-300 rounded-sm">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
              <div className="flex animate-pulse bg-gray-300 rounded-sm">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
              <div className="flex animate-pulse bg-gray-300 rounded-sm">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
              <div className="flex animate-pulse bg-gray-300 rounded-sm">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
              <div className="flex animate-pulse bg-gray-300 rounded-sm">
                <div className="flex-1 space-y-6 py-5 px-4"></div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 max-sm:grid-cols-1 gap-5 mt-2 cursor-pointer">
            {ideas.map((idea, index) => (
              <div
                key={index}
                className={`flex flex-col items-center text-lg justify-center bg-gray-100 p-2 rounded ${
                  selectedIdea === idea ? "border-solid border-2 border-orange-500" : ""
                }`}
                onClick={() => {
                  setSelectedIdea(idea);
                  onHandleInputChange(idea);
                }}
              >
                {idea.idea}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LogoIdea;
