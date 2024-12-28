import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users') // Tên bảng trong cơ sở dữ liệu
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;
  // Thêm refreshToken
  @Column({ nullable: true }) // Cho phép trường này có thể null
  refreshToken: string;
}
