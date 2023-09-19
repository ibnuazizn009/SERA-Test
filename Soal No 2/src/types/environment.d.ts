import { Secret } from "jsonwebtoken";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_PASSWORD: string;
      DATABASE: string;
      SECRETKEY: Secret;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}