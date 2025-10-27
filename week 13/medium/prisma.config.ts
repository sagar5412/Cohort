import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config(); // 👈 this loads .env manually

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!, // 👈 now it will work
  },
});
