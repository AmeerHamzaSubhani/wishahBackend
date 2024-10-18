import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { staff } from 'src/schemas/staff.schema';
import { CreateStaffDto } from './dto/CreateStaff.dto';
import { UpdateStaffDto } from './dto/UpdateStaff.dto';
import { DeleteStaffDto } from './dto/DeleteStaff.dto';
// import { GetStaffDto } from './dto/GetStaff.dto';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class StaffService {
  constructor(
    @InjectModel(staff.name) private staffModel: Model<staff>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createStaff(
    { ...createStaffDto }: CreateStaffDto,
    file?: Express.Multer.File,
  ) {
    try {
      const existingStaff = await this.staffModel.findOne({
        email: createStaffDto.email,
        contact: createStaffDto.contact,
      });
      if (existingStaff) {
        return {
          success: false,
          message: 'Staff already exists',
        };
      }

      if (file) {
        const result = await this.cloudinaryService.uploadImage(file);
        createStaffDto.imageUrl = result.secure_url; // Store the URL in the DTO
      }
      const createdStaff = await this.staffModel.create(createStaffDto);
      if (createdStaff) {
        return {
          statusCode: 200,
          success: true,
          message: 'Staff created successfully',
          data: createdStaff,
        };
      } else {
        return {
          statusCode: 400,
          success: false,
          message: 'error while creating',
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        success: false,
        message: 'Error while creating staff',
        data: error,
      };
    }
  }

  async updateStaff(
    { ...UpdateStaffDto }: UpdateStaffDto,
    file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        const result = await this.cloudinaryService.uploadImage(file);
        UpdateStaffDto.imageUrl = result.secure_url;
      }
      const updatedStaff = await this.staffModel.findByIdAndUpdate(
        UpdateStaffDto.id,
        UpdateStaffDto,
        { new: true },
      );
      if (!updatedStaff) {
        return {
          statusCode: 400,
          success: false,
          message: 'Staff not found',
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: 'Staff updated successfully',
        data: updatedStaff,
      };
    } catch (error) {
      return {
        statusCode: 400,
        success: false,
        data: error,
      };
    }
  }

  async deleteStaff({ ...DeleteStaffDto }: DeleteStaffDto) {
    try {
      const deletedStaff = await this.staffModel.findByIdAndDelete(
        DeleteStaffDto.id,
      );
      if (!deletedStaff) {
        return {
          statusCode: 400,
          success: false,
          message: 'Staff not found',
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: 'Staff deleted successfully',
        data: deletedStaff,
      };
    } catch (error) {
      return {
        statusCode: 400,
        success: false,
        data: error,
      };
    }
  }

  async getAllStaff({ ...GetStaffDto }) {
    try {
      const { search, page, limit } = GetStaffDto;
      const query: any = {};
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      const total = await this.staffModel.countDocuments(query);
      const currentPage = typeof page === 'number' ? page : parseInt(page) || 1;
      const pageLimit =
        typeof limit === 'number' ? limit : parseInt(limit) || 10;
      const staffs = await this.staffModel
        .find(query)
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit);
      if (!staffs) {
        return {
          statusCode: 400,
          success: false,
          message: 'No staffs found',
          data: staffs,
          total,
          totalPages: Math.ceil(total / pageLimit),
        };
      } else {
        return {
          statusCode: 200,
          success: true,
          message: 'Got all staffs successfully',
          data: staffs,
          total,
          totalPages: Math.ceil(total / pageLimit),
          currentPage: currentPage,
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        success: false,
        data: error,
      };
    }
  }

  async getStaffById(staffId) {
    try {
      const staff = await this.staffModel.findById(staffId);
      if (!staff) {
        return {
          statusCode: 400,
          success: false,
          message: 'Staff not found',
        };
      }
      return {
        statusCode: 200,
        success: true,
        message: 'Got staff successfully',
        data: staff,
      };
    } catch (error) {
      return {
        statusCode: 400,
        success: false,
        data: error,
      };
    }
  }
}
