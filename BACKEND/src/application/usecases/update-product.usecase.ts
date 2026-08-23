import { ProductEntity } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/product.repository";
import { UpdateProductInputDTO, UpdateProductOutputDTO } from "../dto/update-product.dto";

export class UpdateProductUseCase {
  constructor(private readonly IProductRepository: IProductRepository) {}

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO | void> {
    const product = await this.IProductRepository.get(input.id);
    
    if (product) {
      const product_update = ProductEntity.create({
        id: product.id,
        name: input.name ?? product.name.toString(),
        description: input.description ?? product.description.toString(),
        price: input.price ?? product.price.toNumber(),
        imagePath: input.imagePath ?? product.imagePath,
      });
      await this.IProductRepository.update(product_update);

      return {
        id: product_update.id,
        name: product_update.name.toString(),
        description: product_update.description.toString(),
        price: product_update.price.toNumber(),
        imagePath: product_update.imagePath,
        createdAt: product_update.createdAt,
      };
    }
  }
}
