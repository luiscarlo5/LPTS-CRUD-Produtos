import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/repositories/product.repository";

@Injectable()
export class InMemoryProductRepository implements IProductRepository {
  private products: ProductEntity[] = [];

  async getAll(): Promise<[ProductEntity] | null> {
    return this.products.length ? (this.products as [ProductEntity]) : null;
  }

  async get(id: string): Promise<ProductEntity | null> {
    return this.products.find((p) => p.id === id) ?? null;
  }

  async getByName(name: string): Promise<ProductEntity | null> {
    return this.products.find((p) => p.name.toString() === name) ?? null;
  }

  async delete(id: string): Promise<null> {
    this.products = this.products.filter((p) => p.id !== id);
    return null;
  }

  async create(product: ProductEntity): Promise<ProductEntity | void> {
    this.products.push(product);
    return product;
  }

  async update(product: ProductEntity): Promise<ProductEntity | void> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index >= 0) this.products[index] = product;
    return product;
  }
}
