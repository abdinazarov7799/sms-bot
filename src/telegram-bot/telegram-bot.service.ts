import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private departmentService: DepartmentService, // Bo'limlar servisini injekt qilish
  ) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });
    this.start();
  }

  async start() {
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;

      // Bazadan bo'limlarni olish
      const departments = await this.departmentService.findAll();

      // Keyboard tugmalarini generatsiya qilish
      const keyboardButtons = departments.map((dept) => [dept.name]);

      this.bot.sendMessage(chatId, 'Salom! Menyudan tanlang:', {
        reply_markup: {
          keyboard: keyboardButtons,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
    });

    this.handleMenu();
  }

  handleMenu() {
    this.bot.onText(/Viloyatlar/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Siz "Viloyatlar" bo\'limiga ro\'yxatga olindingiz.');
    });

    this.bot.onText(/Markaziy apparat/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Siz "Markaziy apparat" bo\'limiga ro\'yxatga olindingiz.');
    });

    this.bot.onText(/Infarmatsion texnalogiyalari departamenti/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Tanlang:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Viloyat xodimlari', callback_data: 'viloyat_xodimlari' }],
            [{ text: 'Infarmatsion texnalogiyalari Respublika', callback_data: 'respublika' }],
          ],
        },
      });
    });

    this.bot.on('callback_query', (query) => {
      const chatId = query.message.chat.id;
      if (query.data === 'viloyat_xodimlari') {
        this.bot.sendMessage(chatId, 'Siz "Viloyat xodimlari" bo\'limiga ro\'yxatga olindingiz.');
      } else if (query.data === 'respublika') {
        this.bot.sendMessage(chatId, 'Respublika bo\'limlari tanlandi.');
      }
    });
  }
}
