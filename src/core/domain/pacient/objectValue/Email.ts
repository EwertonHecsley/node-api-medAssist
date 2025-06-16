import { BadRequest } from '@/shared/errors/BadRequest';

export class Email {
  private readonly value: string;

  private static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  constructor(raw: string) {
    const cleaned = raw.trim().toLowerCase();

    if (!Email.emailRegex.test(cleaned)) {
      throw new BadRequest('invalid format email.');
    }

    this.value = cleaned;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.getValue();
  }
}
