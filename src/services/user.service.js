import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import findUserJsonFile from "../helpers/findUserJsonFile.helper.js";

class UserService {
  constructor() {
    this.storageDir = path.resolve("src/storage");
  }

  async createUser(body) {
    const files = await fsPromises.readdir(this.storageDir);
    let lastUserId = 0;

    files.forEach((file) => {
      const userId = parseInt(file.split("_")[1], 10);
      if (userId > lastUserId) {
        lastUserId = userId;
      }
    });

    const newUserId = lastUserId + 1;

    const userDirPath = path.join(this.storageDir, `user_${newUserId}`);
    const userFilePath = path.join(userDirPath, `user_${newUserId}.json`);
    const user = { id: newUserId, ...body };

    return new Promise((resolve, reject) => {
      fs.writeFile(userFilePath, JSON.stringify(user, null, 2), (err) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: "User created successfully", user });
      });
    });
  }

  async validateUser(body) {
    try {
      const userData = await findUserJsonFile(body, this.storageDir);
      if (userData) {
        return true;
      }
    } catch (error) {
      console.error("Error validating user:", error);
    }
    return false;
  }

  async loginUser(body) {
    try {
      const userData = await findUserJsonFile(body, this.storageDir);
      if (userData) {
        dotenv.config();

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return token;
      }
    } catch (error) {
      console.error("Error validating user:", error);
    }
    return false;
  }

  async unregisterUser(userId) {
    const userDir = path.join(this.storageDir, `user_${userId}`);
    if (fs.existsSync(userDir)) {
      await fsPromises.rm(userDir, { recursive: true, force: true });
    }
  }
}

export default UserService;
