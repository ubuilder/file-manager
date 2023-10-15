import { json, type RequestHandler } from '@sveltejs/kit';
import { rmdirSync } from 'fs';
import fs from 'fs';
import path from 'path';
const deleteFolderRecursive = function (directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
};

export const POST: RequestHandler = async (event) => {
  const { path } = await event.request.json();
  console.log('path: ', path);
  try {
    deleteFolderRecursive('./static/' + path);
  } catch (error) {
    console.log('error: ', error);
  }
  // rimraf.sync(path, { recursive: true, force: true });
  return json({ success: true });
};
