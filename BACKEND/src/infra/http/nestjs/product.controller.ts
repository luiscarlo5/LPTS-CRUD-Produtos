import { Body, Controller, Delete, Get, HttpCode, Inject, NotFoundException, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateProductUseCase } from "../../../application/usecases/create-product.usecase";
import { GetProductUseCase } from "../../../application/usecases/get-product.usecase";
import { GetAllProductsUseCase } from "../../../application/usecases/get-all-products.usecase";
import { UpdateProductUseCase } from "../../../application/usecases/update-product.usecase";
import { DeleteProductUseCase } from "../../../application/usecases/delete-product.usecase";
import { CreateProductInputDTO } from "../../../application/dto/create-product.dto";
import { UpdateProductInputDTO } from "../../../application/dto/update-product.dto";
import { multerConfig } from "../../upload/multer.config";

@Controller("products")
export class ProductController {
  constructor(
    @Inject(CreateProductUseCase) private readonly createProductUseCase: CreateProductUseCase,
    @Inject(GetProductUseCase) private readonly getProductUseCase: GetProductUseCase,
    @Inject(GetAllProductsUseCase) private readonly getAllProductsUseCase: GetAllProductsUseCase,
    @Inject(UpdateProductUseCase) private readonly updateProductUseCase: UpdateProductUseCase,
    @Inject(DeleteProductUseCase) private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("image", multerConfig))
  create(@Body() body: CreateProductInputDTO, @UploadedFile() image?: Express.Multer.File) {
    return this.createProductUseCase.execute({
      name: body.name,
      description: body.description,
      price: Number(body.price),
      imagePath: image ? `/upload/${image.filename}` : (body.imagePath ?? null),
    });
  }

  @Get()
  getAll() {
    return this.getAllProductsUseCase.execute();
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    const product = await this.getProductUseCase.execute({ id });
    if (!product) {
      throw new NotFoundException(`Product "${id}" not found`);
    }
    return product;
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("image", multerConfig))
  update(
    @Param("id") id: string,
    @Body() body: Omit<UpdateProductInputDTO, "id">,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.updateProductUseCase.execute({
      id,
      ...body,
      ...(body.price !== undefined ? { price: Number(body.price) } : {}),
      ...(image ? { imagePath: `/upload/${image.filename}` } : {}),
    });
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: string) {
    return this.deleteProductUseCase.execute({ id });
  }
}
