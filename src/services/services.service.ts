// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { services } from 'src/schemas/services.schema';
// import { CreateServiceDto } from './dto/CreateService.dto';
// import { UpdateServiceDto } from './dto/UpdateService.dto';
// @Injectable()
// export class ServicesService {
//   constructor(
//     @InjectModel(services.name) private serviceModel: Model<services>,
//   ) {}

//   async createService({ ...createService }: CreateServiceDto) {
//     // service exists
//     const existingService = await this.serviceModel.findOne({
//       serviceName: createService.serviceName,
//       reqTherapist: createService.reqTherapist,
//     });
//     if (existingService) {
//       return {
//         success: false,
//         message: 'service already exists',
//       };
//     } else {
//       const createdService = await this.serviceModel.create(createService);
//       console.log('createdService', createdService);
//       if (createdService) {
//         return {
//           success: true,
//           message: 'service created successfully',
//           data: createdService,
//         };
//       }
//     }
//   }

//   async getAllServices() {
//     const services = await this.serviceModel.find();
//     return {
//       success: true,
//       message: 'got all services successfully',
//       data: services,
//     };
//   }

//   async getServiceById() {}
//   async updateService({ ...UpdateServiceDto }: UpdateServiceDto) {
//     const updatedService = await this.serviceModel.findByIdAndUpdate(
//       UpdateServiceDto.id,
//       UpdateServiceDto,
//       { new: true },
//     );
//     return {
//       success: true,
//       message: 'service updated successfully',
//       data: updatedService,
//     };
//   }
//   async deleteService(UpdateService) {
//     const deletedService = await this.serviceModel.findByIdAndDelete(
//       UpdateService._id,
//     );
//     return {
//       success: true,
//       message: 'service deleted successfully',
//       data: deletedService,
//     };
//   }
// }
