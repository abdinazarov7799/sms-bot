import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { UserModule } from '../user/user.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    UserModule,
    DepartmentModule,
  ],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
