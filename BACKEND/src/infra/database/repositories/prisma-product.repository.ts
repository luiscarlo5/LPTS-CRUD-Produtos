import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IProductRepository } from "../../../domain/repositories/product.repository";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { Name } from "../../../domain/vos/name.vo";
import { Description } from "../../../domain/vos/description.vo";
import { Price } from "../../../domain/vos/price.vo";
import { Product as ProductModel } from "../../../generated/prisma/client";

@Injectable()
export class PrismaProductRepository implements IProductRepository {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService
  ) {}

  private toEntity(row: ProductModel): ProductEntity {
    return ProductEntity.restore({
      id: row.id,
      name: Name.create(row.name),
      description: Description.create(row.description),
      price: Price.create(row.price),
      imagePath: row.imagePath,
      createdAt: row.createdAt,
    });
  }

  async getAll(): Promise<[ProductEntity] | null> {
    const rows = await this.prisma.product.findMany();
    return rows.length ? (rows.map((row) => this.toEntity(row)) as [ProductEntity]) : null;
  }

  async get(id: string): Promise<ProductEntity | null> {
    const row = await this.prisma.product.findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  async getByName(name: string): Promise<ProductEntity | null> {
    const row = await this.prisma.product.findFirst({ where: { name } });
    return row ? this.toEntity(row) : null;
  }

  async delete(id: string): Promise<null> {
    await this.prisma.product.delete({ where: { id } });
    return null;
  }

  async create(product: ProductEntity): Promise<ProductEntity | void> {
    await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name.toString(),
        description: product.description.toString(),
        price: product.price.toNumber(),
        imagePath: product.imagePath,
        createdAt: product.createdAt,
      },
    });
    return product;
  }

  async update(product: ProductEntity): Promise<ProductEntity | void> {
    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        name: product.name.toString(),
        description: product.description.toString(),
        price: product.price.toNumber(),
        imagePath: product.imagePath,
      },
    });
    return product;
  }
}
