import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as env from 'env-var';
import { join } from 'path';
import { PayloadMiddleware } from '../middlewares/payload.middleware';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardLproModule } from './dashboard-lpro/dashboardLpro.module';
import { DatabaseModule } from './infra/database/database.module';
import { validateEnv } from './infrastructure/validation/env.validation';
import { MonitorModule } from './monitor/monitor.module';
import { RouterModule } from '@nestjs/core';
import { routes } from '../routes';
import { LproMonitor } from './lpro-monitor/lpro-monitor.module';

const mainStorage = env.get('MAIN_STORAGE_PATH').required().asString();

@Module({
    imports: [
        RouterModule.register(routes),
        DatabaseModule,
        DashboardModule,
        DashboardLproModule,
        DashboardModule,
        MonitorModule,
        LproMonitor,
        ConfigModule.forRoot({ validate: validateEnv }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), mainStorage + '/export'),
            serveRoot: '/export',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PayloadMiddleware).forRoutes('*');
    }
}
