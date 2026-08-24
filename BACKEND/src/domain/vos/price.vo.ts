import { DomainError } from "../errors/domain-error";

export class Price {
  private constructor(private readonly value: number) {}

  static create(raw: number): Price {
    if (raw === null || raw === undefined) {
      throw new DomainError("Price cannot be null.");
    }

    if (typeof raw !== "number" || Number.isNaN(raw) || !Number.isFinite(raw)) {
      throw new DomainError(`Invalid price: "${raw}". Price must be a valid number.`);
    }

    const decimalPart = raw.toString().split(".")[1];
    if (decimalPart && decimalPart.length > 2) {
      throw new DomainError(
        `Invalid price: "${raw}". Price cannot have more than 2 decimal places.`,
      );
    }

    return new Price(raw);
  }

  toNumber(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toFixed(2);
  }

  equals(other: Price): boolean {
    return this.value === other.value;
  }
}
