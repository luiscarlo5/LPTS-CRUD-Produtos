import { DomainError } from "../errors/domain-error";

export class Name {
  static readonly MIN_LENGTH = 5;
  static readonly MAX_LENGTH = 40;

  private constructor(private readonly value: string) {}

  static create(raw: string): Name {
    const normalized = raw.trim();
    const isValidLength =
      normalized.length >= Name.MIN_LENGTH && normalized.length <= Name.MAX_LENGTH;

    const isNotOnlyNumbers = !/^\d+$/.test(normalized);

    if (!isValidLength) {
      throw new DomainError(
        `Invalid name: "${raw}". Name must be between ${Name.MIN_LENGTH} and ${Name.MAX_LENGTH} characters.`,
      );
    }

    if (!isNotOnlyNumbers) {
      throw new DomainError(
        `Invalid name: "${raw}". Name cannot contain only numbers.`,
      );
    }

    return new Name(normalized);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Name): boolean {
    return this.value === other.value;
  }
}
