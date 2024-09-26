import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../user/entities/user.entity';
import { Request } from 'express';

@Controller('products')
@UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to all product routes
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    // Extract the user ID from the request's user object
    const userId = req.user['userId'];
    return this.productService.create(createProductDto, userId);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard) // Apply RolesGuard only to delete
  @Roles(UserRole.ADMIN) // Only admin can delete products
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
