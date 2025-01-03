import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';  // Thêm thư viện UUID
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  isValidPassword(password,hashPassword){
    return compareSync(password,hashPassword);
  }
  getHashPassword = (password)=>{
    return hashSync(password,genSaltSync(10));
  }
  async register(user: RegisterUserDto) {
    const { email, password, phone, name } = user;
    const hashPassword = await this.getHashPassword(password);
    const isPhoneExist = await this.userModel.findOne({ where: { phone } });
    
    if (isPhoneExist) {
      throw new BadRequestException(`Số điện thoại ${phone} đã tồn tại. Vui lòng đăng ký tài khoản khác.`);
    }
  
    // Tạo ID UUID mới nếu không có sẵn
    const newUser = await this.userModel.create({
      id: uuidv4(),  // Tạo UUID cho id
      name,
      phone,
      email,
      password:hashPassword
    });
    // Lưu thông tin user vào database
    await this.userModel.save(newUser);
    // Trả về id và phone sau khi tạo
    return {
      id: newUser.id,
      phone: newUser.phone,
    };
  }
  async findByPhone(phone: string): Promise<any> {
    return this.userModel.findOne({ where: { phone } });
  }
  findOneById(id:string): Promise<User | null> {
    return this.userModel.findOne({
      where: { id },
    }).then(user => {
      if (!user) {
        console.log(`No user found with id: ${id}`);
      }
      return user;
    }).catch(error => {
      console.error('Database error:', error);
      throw new Error('Database query failed');
    });
  }

  async updateUserToken(refreshToken: string, id: string): Promise<void> {
  const user = await this.userModel.findOne({ where: { id } });
  if (user) {
    user.refreshToken = refreshToken;
    await this.userModel.save(user);
  } else {
    throw new Error('User not found');
  }
}
  
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
