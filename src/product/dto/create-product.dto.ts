import { IsUUID, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUUID()
  @IsOptional() // Optional because the user ID may be inferred from the request context
  userId?: string;
}
