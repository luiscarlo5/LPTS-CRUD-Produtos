import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { PrismaService } from "../../database/prisma.service";
import { IProductRepository } from "../../../domain/repositories/product.repository";
import { PrismaProductRepository } from "../../database/repositories/prisma-product.repository";
import { CreateProductUseCase } from "../../../application/usecases/create-product.usecase";
import { GetProductUseCase } from "../../../application/usecases/get-product.usecase";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { UpdateProductUseCase } from "../../../application/usecases/update-product.usecase";
import { DeleteProductUseCase } from "../../../application/usecases/delete-product.usecase";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    PrismaService,
    {
      provide: IProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo: IProductRepository) => new CreateProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: GetProductUseCase,
      useFactory: (repo: IProductRepository) => new GetProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: GetAllProductsUseCase,
      useFactory: (repo: IProductRepository) => new GetAllProductsUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo: IProductRepository) => new UpdateProductUseCase(repo),
      inject: [IProductRepository],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo: IProductRepository) => new DeleteProductUseCase(repo),
      inject: [IProductRepository],
    },
  ],
})
export class ProductModule {}
