import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//make comment
	//make rest principe
	app.enableCors({origin: true, credentials: true});
	//app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Документация для API')
		.setDescription('Описание для документации API')
		.setVersion('1.0')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document, {});

	await app.listen(8000);
}

bootstrap();
