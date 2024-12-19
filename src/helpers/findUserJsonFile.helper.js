import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

async function findUserJsonFile(body, storageDir) {
  try {
    const files = fs.readdirSync(storageDir);
    for (const file of files) {
      const userFilePath = path.join(storageDir, file);

      const userFiles = await fsPromises.readdir(userFilePath);
      for (const userFile of userFiles) {
        if (userFile.endsWith(".json")) {
          const filePath = path.join(userFilePath, userFile);
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          if (
            data.username === body.username &&
            data.password === body.password
          ) {
            return data;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error finding user JSON file:", error);
  }
  return null;
}

export default findUserJsonFile;
