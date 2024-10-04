import { Department } from './department.model';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
  ) {}

  // Yangi bo'lim yaratish
  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentModel.create(createDepartmentDto);
  }

  // Barcha bo'limlarni olish
  async findAll(): Promise<Department[]> {
    return this.departmentModel.findAll();
  }

  // ID bo'yicha bo'limni olish
  async findById(id: number): Promise<Department> {
    return this.departmentModel.findByPk(id);
  }

  // Bo'limni nomi bo'yicha qidirish
  async findByName(name: string): Promise<Department> {
    return this.departmentModel.findOne({ where: { name } });
  }

  // Bo'limni yangilash
  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.findById(id);
    await department.update(updateDepartmentDto);
    return department;
  }

  // Bo'limni o'chirish
  async remove(id: number): Promise<void> {
    const department = await this.findById(id);
    await department.destroy();
  }
}
