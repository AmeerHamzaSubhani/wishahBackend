import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { services } from 'src/schemas/services.schema';
import { CreateServiceDto } from './dto/CreateService.dto';
import { UpdateServiceDto } from './dto/UpdateService.dto';
import { GetServiceDto } from './dto/GetService.dto';
@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(services.name) private serviceModel: Model<services>,
  ) {}

  async createService({ ...createService }: CreateServiceDto) {
    // service exists
    const existingService = await this.serviceModel.findOne({
      serviceName: createService.serviceName,
      reqTherapist: createService.reqTherapist,
    });
    if (existingService) {
      return {
        statusCode: 400,
        success: false,
        message: 'service already exists',
      };
    } else {
      const createdService = await this.serviceModel.create(createService);
      console.log('createdService', createdService);
      if (createdService) {
        return {
          statusCode: 200,
          success: true,
          message: 'service created successfully',
          data: createdService,
        };
      }
    }
  }

  async getAllServices({ ...GetServiceDto }: GetServiceDto) {
    const { search, page, limit } = GetServiceDto;
    console.log('GetServiceDto', { search, page, limit });
    const query: any = {};
    const currentPage = typeof page === 'number' ? page : parseInt(page) || 1;
    const pageLimit = typeof limit === 'number' ? limit : parseInt(limit) || 10;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const total = await this.serviceModel.countDocuments(query);
    const services = await this.serviceModel
      .find(query)
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);
    if (services.length === 0) {
      return {
        statusCode: 200,
        success: true,
        message: 'No services found',
        data: services,
        total,
        totalPages: Math.ceil(total / pageLimit),
        currentPage: currentPage,
      };
    } else {
      return {
        statusCode: 200,
        success: true,
        message: 'Got all services successfully',
        data: services,
        total,
        totalPages: Math.ceil(total / pageLimit),
        currentPage: currentPage,
      };
    }
  }

  async getServiceById() {}
  async updateService({ ...UpdateServiceDto }: UpdateServiceDto) {
    const updatedService = await this.serviceModel.findByIdAndUpdate(
      UpdateServiceDto.id,
      UpdateServiceDto,
      { new: true },
    );
    return {
      statusCode: 200,
      success: true,
      message: 'service updated successfully',
      data: updatedService,
    };
  }
  async deleteService(UpdateService) {
    const deletedService = await this.serviceModel.findByIdAndDelete(
      UpdateService._id,
    );
    return {
      statusCode: 200,
      success: true,
      message: 'service deleted successfully',
      data: deletedService,
    };
  }
}
