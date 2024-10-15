import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { RefreshToken } from 'src/schemas/refreshToken.schema';
import { CreateUserDto, userLogin } from './dto/CreateUser.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService, // Corrected here
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
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return {
        success: true,
        message: 'User created successfully',
        data: newUser,
      };
    }
  }

  async login({ ...userLogin }: userLogin) {
    const existingUser = await this.userModel.findOne({
      email: userLogin.email,
    });

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        userLogin.password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      } else {
        const token = await this.genrateToken(
          existingUser._id,
          existingUser.email,
        );
        if (token) {
          console.log('token', token);
          return {
            success: true,
            message: 'Logged in successfully',
            data: existingUser,
            access_token: token,
          };
        }
      }
    } else {
      return {
        success: false,
        message: 'User not found',
      };
    }
  }

  async genrateToken(userId, email) {
    const payload = {
      sub: userId,
      email: email,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '3h' });
    const refresh_token = uuidv4();

    await this.storeRefreshToken(userId, email, refresh_token);
    console.log('access_token', access_token);
    return {
      access_token,
      refresh_token,
    };
  }

  async storeRefreshToken(userId, email, refreshToken: string) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 2);
    const newRefreshToken = await this.RefreshTokenModel.create({
      userId,
      Token: refreshToken,
      expiryDate: expireDate,
      email,
    });
    return newRefreshToken;
  }
  getsUsers() {
    return this.userModel.find();
  }

  async getNewAuthToken({ ...RefreshTokenDto }: RefreshTokenDto) {
    // Await the result of the find query
    console.log('RefreshTokenDto', RefreshTokenDto.refreshToken);
    const user = await this.RefreshTokenModel.findOne({
      $and: [
        { Token: RefreshTokenDto.refreshToken },
        { expiryDate: { $gt: new Date() } },
      ],
    });
    console.log('user', user);
    // Check if the user array is empty
    if (!user) {
      return {
        success: false,
        message: 'You have to log in again',
      };
    } else {
      const payload = {
        sub: user.userId,
        email: user.email,
      };
      const access_token = this.jwtService.sign(payload, { expiresIn: '3h' });
      return {
        success: true,
        message: 'Data found successfully',
        data: {
          access_token: access_token,
        },
      };
    }
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
