export enum NODE_ENV {
  'DEVELOPMENT' = 'DEVELOPMENT',
  'PRODUCTION' = 'PRODUCTION',
}

export class Env {
  static get APP_URL(): string {
    return process.env.APP_URL!;
  }
  static get NODE_ENV(): NODE_ENV {
    return process.env.APP_URL as NODE_ENV;
  }
  static get PORT(): number {
    return Number(process.env.PORT);
  }
  static get PG_HOST(): string {
    return process.env.PG_HOST!;
  }
  static get PG_PORT(): number {
    return Number(process.env.PG_PORT);
  }
  static get PG_NAME(): string {
    return process.env.PG_NAME!;
  }
  static get PG_USER(): string {
    return process.env.PG_USER!;
  }
  static get PG_PASS(): string {
    return process.env.PG_PASS!;
  }
  static get ENCODE_SECRET(): string {
    return process.env.ENCODE_SECRET!;
  }
  static get REDIS_HOST(): string {
    return process.env.REDIS_HOST!;
  }
  static get REDIS_PORT(): number {
    return parseInt(process.env.REDIS_PORT!);
  }
  static get REDIS_PASS(): string {
    return process.env.REDIS_PASS!;
  }
  static get REDIS_USERNAME(): string {
    return process.env.REDIS_USERNAME!;
  }
  static get TEMPLATE_LANGUAGE(): string {
    return process.env.TEMPLATE_LANGUAGE!;
  }
  static get ROOT_USER_NAME(): string {
    return process.env.ROOT_USER_NAME!;
  }
  static get ROOT_USER_PASS(): string {
    return process.env.ROOT_USER_PASS!;
  }
  static get ROOT_USER_EMAIL(): string {
    return process.env.ROOT_USER_EMAIL!;
  }
  static get SMTP_EMAIL(): string {
    return process.env.SMTP_EMAIL!;
  }
  static get SMTP_PASS(): string {
    return process.env.SMTP_PASS!;
  }
}
