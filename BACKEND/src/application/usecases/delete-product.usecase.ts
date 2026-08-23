import { ProductEntity } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/product.repository";
import { DeleteProductInputDTO, DeleteProductOutputDTO } from "../dto/delete-product.dto";

export class DeleteProductUseCase {
  constructor(private readonly IProductRepository: IProductRepository) {}

  async execute(input: DeleteProductInputDTO): Promise<DeleteProductOutputDTO> {
    await this.IProductRepository.delete(input.id);

    return {
      // deletado
    };
  }
}
