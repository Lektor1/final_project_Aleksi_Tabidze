import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import archiver from "archiver";
import zlib from "zlib";

dotenv.config();

class ShareService {
  constructor() {
    this.storageDir = path.resolve("src/storage");
    this.linkExpirationMinutes = parseInt(
      process.env.LINK_EXPIRATION_MINUTES,
      10
    );
  }

  async generateShareLink(userId, fileName) {
    const token = jwt.sign({ userId, fileName }, process.env.JWT_SECRET, {
      expiresIn: `${this.linkExpirationMinutes}m`,
    });
    const link = `http://localhost:3000/api/v1/download/${token}`;
    return { link };
  }

  async downloadFile(token, res) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { userId, fileName } = decoded;
      const userDir = path.join(this.storageDir, `user_${userId}`);
      const filePath = path.join(userDir, fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      const stat = await fsPromises.stat(filePath);
      if (stat.isDirectory()) {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName}.zip`
        );
        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(res);
        archive.directory(filePath, false);
        await archive.finalize();
      } else {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName}`
        );
        const readStream = fs.createReadStream(filePath);
        const gzip = zlib.createGzip();
        res.setHeader("Content-Encoding", "gzip");
        readStream.pipe(gzip).pipe(res);
      }
    } catch (error) {
      throw new Error("Invalid or expired link");
    }
  }
}

export default ShareService;
