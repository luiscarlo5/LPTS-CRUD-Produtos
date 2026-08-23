export class Name {
  private constructor(private readonly value: string) {}

  static create(raw: string): Name {
    const normalized = raw.trim();
    const isValidLength = normalized.length >= 15 && normalized.length <= 50;

    const isNotOnlyNumbers = !/^\d+$/.test(normalized);

    if (!isValidLength) {
      throw new Error(
        `Invalid name: "${raw}". Name must be between 15 and 50 characters.`,
      );
    }

    if (!isNotOnlyNumbers) {
      throw new Error(
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