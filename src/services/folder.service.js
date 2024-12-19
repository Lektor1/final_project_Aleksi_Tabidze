import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";

class FolderService {
  constructor() {
    this.storageDir = path.resolve("src/storage");
  }

  async listUserSpace(userId) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    const listFiles = async (dir) => {
      const subdirs = await fsPromises.readdir(dir);
      const files = await Promise.all(
        subdirs.map(async (subdir) => {
          return subdir;
        })
      );
      return files;
    };
    return listFiles(userDir);
  }

  async createUserSpace(userId, { type, name }) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    const targetPath = path.join(userDir, name);

    if (type === "folder") {
      await fsPromises.mkdir(targetPath, { recursive: true });
    } else if (type === "file") {
      await fsPromises.writeFile(targetPath, "");
    } else {
      throw new Error('Invalid type. Must be "file" or "folder".');
    }

    return { message: `${type} created successfully` };
  }

  async deleteUserFile(userId, { name }) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    const targetPath = path.join(userDir, name);

    const stat = await fsPromises.stat(targetPath);
    if (stat.isDirectory()) {
      const files = await fsPromises.readdir(targetPath);
      if (files.length > 0) {
        throw new Error("Only empty folders can be deleted");
      }
      await fsPromises.rmdir(targetPath);
    } else {
      await fsPromises.unlink(targetPath);
    }

    return { message: "File/folder deleted successfully" };
  }
}

export default FolderService;
