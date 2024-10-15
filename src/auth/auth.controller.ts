import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, userLogin } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { RefreshTokenDto } from './dto/RefreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  logIn(@Body() userLogin: userLogin) {
    return this.authService.login(userLogin);
  }

  @Post('refreshToken')
  @UsePipes(new ValidationPipe())
  refreshToken(@Body() RefreshTokenDto: RefreshTokenDto) {
    return this.authService.getNewAuthToken(RefreshTokenDto);
  }

 
  @Get()
  getUsers() {
    return this.authService.getsUsers();
  }
  // users/:id
 
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.authService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
  //
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    const findUser = await this.authService.getUserByEmail(email);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
 
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.authService.updateUser(id, updateUserDto);
    if (!updatedUser) throw new HttpException('User Not Found', 404);
    return updatedUser;
  }
 
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.authService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User Not Found', 404);
    return;
  }
}
