import { randomUUID } from "node:crypto";
import { Name } from "../vos/name.vo";
import { Price } from "../vos/price.vo";
import {  Description } from "../vos/description.vo";

interface ProductProps {
  id: string;
  name: Name;
  description: Description;
  price: Price;
  imagePath: string | null;
  createdAt: Date;
}

export class ProductEntity {
  private constructor(private readonly props: ProductProps) {}

  static create(input: { name: string; description: string, price: number, imagePath?: string | null, id?: string }): ProductEntity {
    return new ProductEntity({
      id: input.id? input.id: randomUUID(),
      name: Name.create(input.name),
      price: Price.create(input.price),
      description: Description.create(input.description),
      imagePath: input.imagePath ?? null,
      createdAt: new Date(),
    });
  }

  static restore(props: ProductProps): ProductEntity {
    return new ProductEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): Name {
    return this.props.name;
  }

  get price(): Price {
      return this.props.price;
  }

  get description(): Description {
    return this.props.description;
  }

  get imagePath(): string | null {
    return this.props.imagePath;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length < 5) {
      throw new Error("Name must have at least 5 characters");
    }
  }
}
