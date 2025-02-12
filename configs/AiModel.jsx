const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type Vintage Logo Designs With Text & IconGenerate a text prompt to create Logo for Logo title/Brand name : nk with decription: loho and refering to prompt: Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"logo_prompt\": \"Design a vintage logo for 'nk' (loho). Hand-drawn, artistic style. Bold typography, intricate details, retro aesthetic. Food, animals, characters, unique elements.\",\n  \"logo_ideas\": [\n    {\n      \"idea\": \"Lion crest with NK\"\n    },\n    {\n      \"idea\": \"Anchor & Rope NK\"\n    },\n    {\n      \"idea\": \"Chef hat NK initials\"\n    },\n    {\n      \"idea\": \"Typewriter key 'nk' loho\"\n    },\n     {\n      \"idea\": \"Retro 'NK' Coffee Stamp\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
   
   
    export const AiPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "create Logo for Logo Title/Brand name : dreamify,with description: ai image generation, with Color combination of Earthy Browns, also include the nature lover and include Custom Luxury Logo Designs design idea and Referring to this Logo Prompt:Create a set of luxurious, elegant, and professional logos with a gold metallic finish on a dark background. Include a variety of themes, such as animals, letters, symbols, and nature-inspired designs. Each logo should convey sophistication, premium quality, and modern aesthetics, suitable for any brand or industry.  Give me result in JSON portal with prompt field only\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I understand. While I can't directly generate the image for you (image generation is currently limited to early testers), I can definitely provide the AI prompts you need to create this logo. Here's a JSON structure containing prompts that capture your requirements:\n\n```json\n{\n  \"logo_prompts\": [\n    {\n      \"prompt\": \"Create a luxurious and elegant logo for 'Dreamify', an AI image generation platform. The design should incorporate earthy brown tones and elements appealing to nature lovers.  The logo should have a gold metallic finish on a dark background, conveying sophistication and premium quality. Focus on modern aesthetics and custom luxury design principles. Consider incorporating a stylized leaf, tree, or other natural element that represents 'dreaming' or 'imagination' within nature, symbolizing the creative power of AI. The overall feel should be high-end and suitable for a technology brand.  The logo should be clean and professional, working in various sizes.\"\n    },\n    {\n      \"prompt\": \"Design a logo for 'Dreamify', an AI image generation service, featuring a nature-inspired symbol (e.g., a stylized tree, leaf, or swirling cloud) crafted with earthy brown colors and a subtle gold metallic accent. The logo must evoke a sense of luxury and innovation. The background should be a deep, dark tone to emphasize the metallic finish. The design should feel modern, elegant, and professional, demonstrating high-end custom design suitable for an AI tech company. Consider an abstract representation that hints at both nature and the generation of images from dreams.\"\n    },\n    {\n      \"prompt\": \"Develop a set of luxurious and elegant logos for 'Dreamify', an AI image generation platform. Use an earthy brown color palette with gold metallic accents on a dark background. Designs should be nature-inspired and incorporate elements that resonate with nature lovers. The logo should convey AI's ability to 'dream up' images, and the designs must adhere to custom luxury logo principles, appearing modern, sophisticated, and high-end. Explore various options: a stylized animal (e.g., a bird in flight, a deer), a lettermark with elegant typography, a symbolic representation of a dream catcher, and an abstract nature design.\"\n    },\n    {\n      \"prompt\": \"Generate a 'Dreamify' logo that combines earthy browns and luxurious gold metallic finishes on a dark backdrop.  The logo should cater to the AI image generation service and the nature lover. Explore luxurious custom designs with a modern aesthetic. Incorporate nature-inspired symbols, such as swirling leaves, fractal trees, or an abstract representation of nature being built. The design must be elegant, professional, and convey premium quality.  Ensure it works well in both large and small formats. Consider an ambigram logo, using a leaf structure that can also read dreamify.\"\n    },\n    {\n      \"prompt\": \"Design a set of logos for the AI image generation brand 'Dreamify' focusing on luxury, elegance, and professionalism. Use earthy brown tones, subtly enhanced with gold metallic accents, set against a dark background. The designs should be modern, nature-inspired and evoke a sense of dreams and creation. Consider using abstract representations of trees, leaves, or flowing water to symbolize the flow of ideas and the generation of images through AI. Ensure the logos project a high-end and sophisticated image.\"\n    }\n  ]\n}\n```\n\nKey improvements and explanations:\n\n* **JSON Format:**  The response is now in valid JSON format as requested, with a key `\"logo_prompts\"` holding an array of prompt objects. Each object has a `\"prompt\"` key.\n* **Earthy Browns & Gold Metallic:**  The prompts explicitly mention earthy browns and gold metallic finishes on a dark background.\n* **Nature Lover Integration:** The prompts integrate elements that appeal to nature lovers (leaves, trees, animals, etc.).\n* **AI Image Generation Focus:** All prompts clearly state that \"Dreamify\" is an AI image generation platform/service.\n* **Custom Luxury Design Principles:** The prompts reference custom luxury design, ensuring high-end and sophisticated results.\n* **Keywords:** Use of keywords like \"luxurious,\" \"elegant,\" \"professional,\" \"sophistication,\" \"premium quality,\" and \"modern aesthetics\" throughout the prompts.\n* **Variety of Approaches:**  The set of prompts encourages the AI to explore different design ideas (animals, letters, symbols, nature),  allowing for a wider range of options.\n* **Specific Suggestions:** Adds concrete ideas, like \"stylized leaf,\" \"swirling cloud,\" \"bird in flight,\" a \"dream catcher\" or \"ambigram leaf\", which greatly helps with output consistency.\n* **Abstract and Symbolic:** Encourages abstract representations that hint at both nature and AI-generated imagery, leading to more unique results.\n* **Scalability:**  Includes instructions to make the logo work well in various sizes.\n* **Clarity and Conciseness:** Each prompt is written to be clear and focused, guiding the AI effectively.  I have made the prompts much more direct.\n* **Focus on conveying AI dreaming:** Repeated mentions of the AI's ability to dream.\n\nThis improved answer provides you with a robust set of prompts that should yield a variety of excellent logo options for \"Dreamify.\" You can now use these prompts with an AI image generator.  Remember to experiment with different AI models and prompt variations to find the perfect logo.  Good luck!\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
