import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";
import compressFile from "../helpers/compress.helper.js";

class FileService {
  constructor() {
    this.storageDir = path.resolve("src/storage");
  }

  async uploadFile(userId, req) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const fileName = req.headers["file-name"];
    const filePath = path.join(userDir, fileName);
    const zipFilePath = path.join(
      userDir,
      `${fileNane.contains(".") ? fileName.split(".")[0] : fileName}.zip`
    );

    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", async () => {
        try {
          await compressFile(filePath, zipFilePath);
          resolve({
            message: "File uploaded and compressed successfully",
            fileName: `${fileName}.zip`,
          });
        } catch (err) {
          reject(err);
        }
      });
      writeStream.on("error", (err) => {
        reject(err);
      });
    });
  }

  async attachMeta(userId, meta) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    const metaFilePath = path.join(userDir, `${meta.fileName}.meta.json`);
    await fsPromises.writeFile(metaFilePath, JSON.stringify(meta, null, 2));
    return { message: "Meta information attached successfully" };
  }

  async getMeta(userId, fileName) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    const metaFilePath = path.join(userDir, `${fileName}.meta.json`);
    if (!fs.existsSync(metaFilePath)) {
      throw new Error("Meta information not found");
    }
    const meta = JSON.parse(await fsPromises.readFile(metaFilePath, "utf-8"));
    return meta;
  }
}

export default FileService;
