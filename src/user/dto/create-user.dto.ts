import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'Foydalanuvchining ismi' })
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Foydalanuvchining familiyasi' })
  readonly lastName: string;

  @ApiProperty({ example: '123456789', description: 'Telegram ID raqami' })
  readonly telegramId: string;

  @ApiProperty({ example: 1, description: 'Bo\'lim ID raqami', required: false })
  readonly departmentId?: number;  // Bo'lim ID'si ixtiyoriy qilingan
}
