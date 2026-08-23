import { ProductEntity } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/product.repository";
import { GetProductInputDTO, GetProductOutputDTO } from "../dto/get-product.dto";

export class GetProductUseCase {
  constructor(private readonly IProductRepository: IProductRepository) {}

  async execute(input: GetProductInputDTO): Promise<GetProductOutputDTO | null> {
    const product = await this.IProductRepository.get(input.id);
    if (product) {
      return {
        id: product.id,
        name: product.name.toString(),
        price: product.price.toNumber(),
        description: product.description.toString(),
        imagePath: product.imagePath,
        createdAt: product.createdAt,
      };
    }
    else {
      return null;
    }
  }
}
