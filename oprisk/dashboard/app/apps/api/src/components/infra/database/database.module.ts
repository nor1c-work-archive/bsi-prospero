import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../infrastructure/config/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                ...DatabaseConfig.initDbConf,
            }),
        }),
    ],
})
export class DatabaseModule {}
