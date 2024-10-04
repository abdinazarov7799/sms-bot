import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Department extends Model<Department> {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;
}
