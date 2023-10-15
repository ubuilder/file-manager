import { json, type RequestHandler } from '@sveltejs/kit';
import { rmdirSync } from 'fs';

export const POST: RequestHandler = async (event) => {
  const {path} = await event.request.json()
  console.log("path: ", path)
  rmdirSync(path,{recursive: true, force: true})
  return json({success : true})
};
