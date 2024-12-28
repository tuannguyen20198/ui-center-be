import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";  // IsUUID để kiểm tra UUID
import { Type } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';  // Thêm thư viện để tạo UUID

// DTO dùng khi tạo người dùng (với UUID cho id)
export class CreateUserDto {
  @IsNotEmpty({ message: "ID không được để trống" })
  @IsUUID('4', { message: "ID phải là UUID hợp lệ" })  // Kiểm tra xem id có phải là UUID hay không
  id: string;

  @IsNotEmpty({ message: "Name không được để trống" })
  @IsString()
  name: string;

  @IsEmail({}, { message: "Email không đúng định dạng" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsNotEmpty({ message: "Password không được để trống" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "Phone không được để trống" })
  @IsString()
  phone: string;
}

// DTO dùng khi đăng ký người dùng (có thể không cần id, sẽ tự động tạo UUID)
export class RegisterUserDto {
  @IsNotEmpty({ message: "Name không được để trống" })
  @IsString()
  name: string;

  @IsEmail({}, { message: "Email không đúng định dạng" })
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsNotEmpty({ message: "Password không được để trống" })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "Phone không được để trống" })
  @IsString()
  phone: string;
}

// DTO dùng khi đăng nhập người dùng
export class UserLoginDto {
  @IsNotEmpty({ message: "Username không được để trống" })
  @IsString()
  phone: string;

  @IsNotEmpty({ message: "Password không được để trống" })
  @IsString()
  password: string;
}
