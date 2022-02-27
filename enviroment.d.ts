declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			DATABASE_HOST: string;
			DATABASE_USER: string;
			DATABASE_PASSWORD: string;
			DATABASE_DATABASE: string;
			DATABASE_PORT: number;
		}
	}
}

export {};
