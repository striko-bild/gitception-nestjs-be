// tslint:disable:no-console
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
import { Environment } from 'src/constants/environment';

export interface IEnvConfig {
  [key: string]: string;
}

export class ConfigService {
  static get VALIDATION_SCHEMA(): Joi.SchemaMap {
    return {
      NODE_ENV: Joi.string()
        .valid(...Object.values(Environment))
        .default(Environment.Development),
      PORT: Joi.number().default(3000),
      GITHUB_CLIENT_ID: Joi.string(),
      GITHUB_CLIENT_SECRET: Joi.string(),
      GITHUB_URL: Joi.string(),
      GITHUB_API_URL: Joi.string(),
    };
  }

  private static readFileVars(basePath: string): IEnvConfig {
    const filePath = `${basePath}/${process.env.NODE_ENV}.env`;
    if (!fs.existsSync(filePath)) {
      if (process.env.NODE_ENV !== 'test') {
        console.log(chalk.yellow(`.env file not found at ${filePath}, relying on process env vars`));
      }
      return {};
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log('Reading variables from ' + chalk.cyanBright(filePath));
    }

    return dotenv.parse(fs.readFileSync(filePath));
  }

  private static readEnvVars(): IEnvConfig {
    const envVars = {};
    Object.keys(ConfigService.VALIDATION_SCHEMA).forEach((key) => {
      if (process.env[key] === undefined) {
          return;
      }

      envVars[key] = process.env[key];
    });

    return envVars;
  }

  private static validateInput(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema = Joi.object(ConfigService.VALIDATION_SCHEMA);

    const { error, value: validatedIEnvConfig } = envVarsSchema.validate(
      envConfig,
      { abortEarly: false },
    );
    if (error) {
      throw new Error(chalk.red(`Config validation error: ${error.message}`));
    }
    return validatedIEnvConfig;
  }

  private static getLoadedConfig(basePath: string): IEnvConfig {
    const envVars = ConfigService.readEnvVars();
    const envFileVars = ConfigService.readFileVars(basePath);

    return { ...envFileVars, ...envVars };
  }

  private envConfig: IEnvConfig;

  constructor(basePath: string) {
    const config = ConfigService.getLoadedConfig(basePath);

    this.envConfig = ConfigService.validateInput(config);
  }

  get NODE_ENV(): Environment {
    let env = Environment.Development;
    const envValues = Object.values(Environment) as string[];
    if (envValues.includes(this.envConfig.NODE_ENV)) {
      env = this.envConfig.NODE_ENV as Environment;
    }
    return env;
  }

  get PORT(): number {
    return parseInt(this.envConfig.PORT, 10);
  }

  get GITHUB_CLIENT_ID(): string {
      return String(this.envConfig.GITHUB_CLIENT_ID);
  }
  get GITHUB_CLIENT_SECRET(): string {
      return String(this.envConfig.GITHUB_CLIENT_SECRET);
  }
  get GITHUB_URL(): string {
      return String(this.envConfig.GITHUB_URL);
  }
  get GITHUB_API_URL(): string {
      return String(this.envConfig.GITHUB_API_URL);
  }

}
