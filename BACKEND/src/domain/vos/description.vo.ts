export class Description {
  private constructor(private readonly value: string) {}

  static create(raw: string): Description {
    const normalized = raw.trim();

    const isValidLength =
      normalized.length >= 5 && normalized.length <= 25;

    const isNotOnlyNumbers = !/^\d+$/.test(normalized);

    if (!isValidLength) {
      throw new Error(
        `Invalid name: "${raw}". Name must be between 3 and 25 characters.`,
      );
    }

    if (!isNotOnlyNumbers) {
      throw new Error(
        `Invalid name: "${raw}". Name cannot contain only numbers.`,
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