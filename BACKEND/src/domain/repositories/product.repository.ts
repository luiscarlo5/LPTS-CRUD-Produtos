import { ProductEntity } from "../entities/product.entity";

export abstract class IProductRepository {
  abstract getAll(): Promise<[ProductEntity] | null>;

  abstract get(id: string): Promise<ProductEntity | null>;

  abstract getByName(name: string): Promise<ProductEntity | null>;

  abstract delete(id: string): Promise<null>;

  abstract create(user: ProductEntity): Promise<ProductEntity | void>;

  abstract update(user: ProductEntity): Promise<ProductEntity | void>;
}
