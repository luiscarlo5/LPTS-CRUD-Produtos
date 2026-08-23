import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { diskStorage } from "multer";
import { MulterModuleOptions } from "@nestjs/platform-express";

export const uploadDir = resolve(__dirname);

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: uploadDir,
    filename(request, file, callback) {
      const hash = randomBytes(6).toString("hex");
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
};
