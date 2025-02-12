import { NextResponse } from "next/server";
import axios from "axios";
import cloudinary from "cloudinary";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../configs/FirebaseConfig";

// 🔹 Step 1: Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { prompt, email, title, desc } = await req.json();
    // console.log("Raw Prompt Data:", prompt);

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const pollinationResponse = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=800&seed=42&model=turbo&nologo=true&enhance=false`
    );

    if (!pollinationResponse.ok) {
      throw new Error("Failed to fetch image from Pollinations API");
    }
    const pollinationUrl = pollinationResponse.url;
    // console.log("Generated Pollination Image URL:", pollinationUrl);
    const imageResponse = await axios.get(pollinationUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(imageResponse.data, "binary").toString("base64");
    const dataURI = `data:image/png;base64,${base64Image}`;
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        dataURI,
        { resource_type: "image", folder: "nextjs_uploads" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
    });

    const cloudinaryUrl = await uploadPromise;
    console.log("Uploaded Image URL:", cloudinaryUrl);

    //save to firebase
    // try{
    //     await setDoc(doc(db,"users",EmailLinkErrorCode,"logos",Date.now().toString(),{
    //         image:cloudinaryUrl,
    //         title:title,
    //         desc:desc
    //     }))
    // }catch(e){
    //     console.error("Failed to save to firebase:", e);
    //     throw new Error("Failed to save to firebase");
    // }

    console.log('email', email);
    console.log('title', title);
    console.log('desc', desc);

    try {
        await setDoc(doc(db,"users",email,"logos",Date.now().toString()),{
            image:cloudinaryUrl,
            title:title,
            desc:desc
        })
    } catch (error) {
        console.log(error);
    }

    return NextResponse.json({ cloudinaryUrl });

  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: error.message });
  }
}
