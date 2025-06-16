import { BadRequest } from '@/shared/errors/BadRequest';

export class CPF {
  private readonly value: string;
  private static readonly cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

  constructor(raw: string) {
    if (!CPF.cpfRegex.test(raw)) {
      throw new BadRequest('invalid format CPF.');
    }

    this.value = CPF.clean(raw);
  }

  static clean(cpf: string): string {
    return cpf.replace(/[^\d]/g, '');
  }

  toString(): string {
    const v = this.value;
    return `${v.substring(0, 3)}.${v.substring(3, 6)}.${v.substring(6, 9)}-${v.substring(9, 11)}`;
  }

  getRaw(): string {
    return this.value;
  }

  equals(other: CPF): boolean {
    return this.value === other.getRaw();
  }
}
