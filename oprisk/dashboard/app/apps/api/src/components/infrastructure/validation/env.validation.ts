import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
    @IsString()
    DB_TYPE: string;

    @IsString()
    DB_HOST: string;

    @IsNumber()
    DB_PORT: number;

    @IsString()
    DB_USERNAME: string;

    @IsString()
    DB_PASSWORD: string;

    @IsString()
    DB_NAME: string;

    @IsBoolean()
    DB_SYNCHRONIZE: boolean;

    @IsBoolean()
    DB_AUTOLOAD_ENTITIES: boolean;

    @IsBoolean()
    DB_ENCRYPT: boolean;

    @IsBoolean()
    DB_TRUST_SERVER_CERTIFICATE: boolean;
}

export function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
