import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './department.model';
import { DepartmentService } from './department.service';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
