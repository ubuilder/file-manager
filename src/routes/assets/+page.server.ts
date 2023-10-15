import { readdir } from 'node:fs/promises';
import fs from 'fs';
import type { Dirent } from 'node:fs';
import path from 'node:path';
export async function load(event) {
  const baseDir = './static';
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  async function readDirs(p: string, r: string = './') {
    try {
      let fs = await readdir(p, { withFileTypes: true });
      for (let file of fs) {
        file.path = path.join(r, file.name);
        file.type = 'file';
        if (file.isDirectory()) {
          file.type = 'dir';
          file.files = await readDirs(path.join(p, file.name), file.path);
        }
      }
      return fs;
    } catch (error) {
      console.error(error);
    }
  }

  function sort(arr) {
    if (arr.length == 0) return arr;
    arr = arr.sort((a, b) => (a.type == 'dir' ? -1 : 1));
    return arr.map((el) => {
      if (el.type == 'dir') {
        el.files = sort(el?.files);
      }
      return el;
    });
  }
  console.log('invalidated ');

  let files: Dirent = JSON.parse(JSON.stringify(await readDirs(baseDir))) as Dirent;
  files = sort(files);
  return {
    files
  };
}
