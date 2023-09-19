export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_PASSWORD: string;
      DATABASE: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}