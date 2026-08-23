import { ProductEntity } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/product.repository";
import { CreateProductInputDTO, CreateProductOutputDTO } from "../dto/create-product.dto";

export class CreateProductUseCase {
  constructor(private readonly IProductRepository: IProductRepository) {}

  async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const product = ProductEntity.create(input);
    await this.IProductRepository.create(product);

    return {
      id: product.id,
      name: product.name.toString(),
      description: product.description.toString(),
      price: product.price.toNumber(),
      imagePath: product.imagePath,
      createdAt: product.createdAt,
    };
  }
}
