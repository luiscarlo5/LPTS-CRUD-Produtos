import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./src/infra/http/nestjs/app.module";
import { uploadDir } from "./src/infra/upload/multer.config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(uploadDir, { prefix: "/upload" });
  const port = process.env.NEST_PORT ?? 3001;
  await app.listen(port);
  console.log(`Nest demo running on port ${port}`);
}

bootstrap();
