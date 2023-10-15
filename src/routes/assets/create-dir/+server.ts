import { json, type RequestHandler } from "@sveltejs/kit";
import { mkdir, mkdirSync } from "fs";

export const  POST:RequestHandler  = async (event) => {
    const {path} = await event.request.json()
    console.log('path: ', path)
    mkdirSync("./static/" + path, {recursive: true})
    return json({success: true})
}