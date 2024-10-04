import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DepartmentService } from './department/department.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Telegram bot API')
    .setDescription('API hujjatlari')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // DepartmentService-ni olish
  const departmentService = app.get(DepartmentService);

  // Bo‘limlar ro‘yxati
  const departmentNames = [
    'IKT monitoring bo‘limi',
    'Texnik ta’minot bo‘limi',
    'Aloqa tarmoqlarini boshqarish bo‘limi',
    'IKT nazorat qilish bo‘limi',
    'Filial aloqa tarmoqlari bo‘limi',
    'IP_Telefoniya bo‘limi',
    'OT va Cloud infratuzilmasi bo‘limi',
    'Ma’lumotlar bazasini boshqarish bo‘limi',
    'Tizimlar integratsiyasi bo‘limi',
    'Ma’lumotlar muhandisligi bo‘limi',
    'Ma’lumotlar tahlili bo‘limi',
    'Biznes tahlil bo‘limi',
    'ABT administratorlari bo‘limi',
    'ABT operatsiyalari bo‘limi',
    'Integratsiya va tashqi tizimlar bo‘limi',
    'Interaktiv bank xizmatlari bo‘limi',
    'Ekspluatatsiya qilish bo‘limi',
    'To‘lov tizimlari bo‘limi',
  ];

  // Bo‘limlarni bazaga qo‘shish
  for (const name of departmentNames) {
    const exists = await departmentService.findByName(name);
    if (!exists) {
      await departmentService.createDepartment(name);
    }
  }

  await app.listen(3000);
}
bootstrap();

