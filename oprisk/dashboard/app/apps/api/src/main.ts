import { NestFactory } from '@nestjs/core';
import { AppModule } from './components/app.module';
import { ApiPrefixVersion } from './common';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

const expressListRoutes = require('express-list-routes');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.setGlobalPrefix(ApiPrefixVersion.v1);

    // Swagger setup
    const options = new DocumentBuilder()
        .setTitle('BSI - Dashboard Oprisk API')
        .setDescription('API for Dashboard Oprisk BSI')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const port = process.env.APP_PORT || 3000;

    await app.listen(port, () => {
        log(`App running on port ${port}`);
    });

    const server = app.getHttpServer();
    const router = server._events.request._router;
    expressListRoutes(router)
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
