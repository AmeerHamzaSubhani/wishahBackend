import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto, userLogin } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/userSetting.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private jwtService: JwtService,
  ) {}

  async createUser({ ...createUserDto }: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    
    // Check if the user already exists
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    
    if (existingUser) {
      return {
        success: false,
        message: 'User already exists with this email',
      };
    } else {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // You can adjust the salt rounds (10 is a common value)
      
      // Create the user with the hashed password
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword, // Save the hashed password
      });
      
      return {
        success: true,
        message: 'User created successfully',
        data: newUser,
      };
    }
  }

  // async login({ ...userLogin }: userLogin) {
  //   const pass = userLogin.password;
  //   console.log('userLogin', userLogin);
  //   const existingUser = await this.userModel.findOne({
  //     email: userLogin.email,
  //   });

  //   if (existingUser) {
  //     if (existingUser?.password !== pass) {
  //       return {
  //         success: false,
  //         message: 'invalid credentials',
  //       };
  //     } else{
  //       const payload = {
  //         sub: existingUser._id,
  //         name: existingUser.name,
  //       };
  //       const token = await this.jwtService.signAsync(payload);
  //       return {
  //         success: true,
  //         message: 'logged in successfully',
  //         data: existingUser,
  //         access_token: token,
  //       };
  //     }
  //   }
  // }


  async login({ ...userLogin }: userLogin) {
    const existingUser = await this.userModel.findOne({
      email: userLogin.email,
    });
  
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(userLogin.password, existingUser.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      } else {
        const payload = {
          sub: existingUser._id,
          name: existingUser.name,
        };
        const token = this.jwtService.sign(payload);
        return {
          success: true,
          message: 'Logged in successfully',
          data: existingUser,
          access_token: token,
        };
      }
    } else {
      return {
        success: false,
        message: 'User not found',
      };
    }
  }
  getsUsers() {
    return this.userModel.find();
  }

  getUserByEmail(email: string) {
    return this.userModel.findById(email);
  }
  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
