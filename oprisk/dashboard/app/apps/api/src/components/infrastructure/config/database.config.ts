import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { LogLevel } from 'typeorm/logger/Logger';

config({ path: Config.ENV_API_PATH });

const configService = new ConfigService();

export class DatabaseConfig {
    public static readonly DB_TYPE: any = configService.get('DB_TYPE');

    public static readonly DB_HOST: string = configService.get('DB_HOST');

    public static readonly DB_PORT: number = configService.get('DB_PORT');

    public static readonly DB_USERNAME: string =
        configService.get('DB_USERNAME');

    public static readonly DB_PASSWORD: string =
        configService.get('DB_PASSWORD');

    public static readonly DB_NAME: string = configService.get('DB_NAME');

    public static readonly DB_SYNCHRONIZE: boolean =
        configService.get('DB_SYNCHRONIZE') === 'true';

    public static readonly DB_AUTOLOAD_ENTITIES: boolean =
        configService.get('DB_AUTOLOAD_ENTITIES') === 'true';

    // public static readonly DB_ENCRYPT: boolean =
    //     configService.get('DB_ENCRYPT') === 'true';

    public static readonly DB_TRUST_SERVER_CERTIFICATE: boolean =
        configService.get('DB_TRUST_SERVER_CERTIFICATE') === 'true';

    public static readonly DB_LOGGING: boolean | 'all' | LogLevel[] =
        configService.get('DB_LOGGING');

    public static readonly dataSourceOptions: DataSourceOptions = {
        type: DatabaseConfig.DB_TYPE,
        host: DatabaseConfig.DB_HOST,
        port: +DatabaseConfig.DB_PORT,
        username: DatabaseConfig.DB_USERNAME,
        password: DatabaseConfig.DB_PASSWORD,
        database: DatabaseConfig.DB_NAME,
        entities: [],
        synchronize: DatabaseConfig.DB_SYNCHRONIZE,
        options: {
            // encrypt: false
            trustServerCertificate: DatabaseConfig.DB_TRUST_SERVER_CERTIFICATE,
        },
    };

    public static initDbConf: TypeOrmModuleOptions = {
        ...DatabaseConfig.dataSourceOptions,
        autoLoadEntities: DatabaseConfig.DB_AUTOLOAD_ENTITIES,
        logging: DatabaseConfig.DB_LOGGING,
    };
}
