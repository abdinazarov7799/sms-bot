import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Department } from '../department/department.model';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  telegramId: string;

  @ForeignKey(() => Department)
  @Column
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;
}
