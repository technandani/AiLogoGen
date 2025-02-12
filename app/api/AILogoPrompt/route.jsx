import { AiPrompt } from "../../../configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    
    const {prompt}=await req.json();

    try{
        const result=await AiPrompt.sendMessage(prompt)
        // console.log(result.response.text())
        const AIPrompt = result.response.text();
        return NextResponse.json(AIPrompt);
    }
    catch(e)
    {
        return NextResponse.json({error:e})
    }

}