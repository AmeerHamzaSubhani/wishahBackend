import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CreateStaffDto } from './dto/CreateStaff.dto';
import { UpdateStaffDto } from './dto/UpdateStaff.dto';
import { StaffService } from './staff.service';
import { DeleteStaffDto } from './dto/DeleteStaff.dto';
import { GetStaffDto } from './dto/GetStaff.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name for the image
  async createStaff(
    @UploadedFile() file: Express.Multer.File,
    @Body() createStaffDto: CreateStaffDto,
  ) {
    console.log('createStaffDto===>', createStaffDto);
    return this.staffService.createStaff(createStaffDto);
  }

  @Post('update')
  @UsePipes(ValidationPipe)
  updateStaff(@Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.updateStaff(updateStaffDto);
  }

  @Post('delete')
  @UsePipes(ValidationPipe)
  deleteStaff(@Body() deleteStaffDto: DeleteStaffDto) {
    return this.staffService.deleteStaff(deleteStaffDto);
  }

  @Get('getAll')
  @UsePipes(ValidationPipe)
  getAllStaff(@Query() getStaffDto: GetStaffDto) {
    return this.staffService.getAllStaff(getStaffDto);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  getOneStaff(@Query() deleteStaffDto: DeleteStaffDto) {
    return this.staffService.getStaffById(deleteStaffDto);
  }
}
