import { DomainError } from "../errors/domain-error";

export class Description {
  static readonly MIN_LENGTH = 10;
  static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(raw: string): Description {
    const normalized = raw.trim();

    const isValidLength =
      normalized.length >= Description.MIN_LENGTH && normalized.length <= Description.MAX_LENGTH;

    const isNotOnlyNumbers = !/^\d+$/.test(normalized);

    if (!isValidLength) {
      throw new DomainError(
        `Invalid description: "${raw}". Description must be between ${Description.MIN_LENGTH} and ${Description.MAX_LENGTH} characters.`,
      );
    }

    if (!isNotOnlyNumbers) {
      throw new DomainError(
        `Invalid description: "${raw}". Description cannot contain only numbers.`,
      );
    }

    return new Description(normalized);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Description): boolean {
    return this.value === other.value;
  }
}
