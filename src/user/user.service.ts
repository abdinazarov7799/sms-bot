import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  // Foydalanuvchini yaratish
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  // Barcha foydalanuvchilarni olish
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // ID bo'yicha foydalanuvchini topish
  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Foydalanuvchini yangilash
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    await user.update(updateUserDto);
    return user;
  }

  // Foydalanuvchini o'chirish
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByTelegramId(telegramId: string): Promise<User> {
    return this.userModel.findOne({ where: { telegramId } });
  }
}
