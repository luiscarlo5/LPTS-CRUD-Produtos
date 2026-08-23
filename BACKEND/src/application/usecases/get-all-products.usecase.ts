import { IProductRepository } from "../../domain/repositories/product.repository";
import { GetProductOutputDTO } from "../dto/get-product.dto";

export class GetAllProductsUseCase {
  constructor(private readonly IProductRepository: IProductRepository) {}

  async execute(): Promise<GetProductOutputDTO[]> {
    const products = await this.IProductRepository.getAll();
    if (!products) {
      return [];
    }

    return products.map((product) => ({
      id: product.id,
      name: product.name.toString(),
      description: product.description.toString(),
      price: product.price.toNumber(),
      imagePath: product.imagePath,
      createdAt: product.createdAt,
    }));
  }
}
