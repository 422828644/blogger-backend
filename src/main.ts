import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as cors from 'cors';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle('blogger')
        .setDescription('This is Blogger Api')
        .setVersion('1.0')
        .addTag('blogger')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);
    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
