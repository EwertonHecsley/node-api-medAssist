import { Entity } from '@/core/generics/Entity';
import { Identity } from '@/core/generics/Identity';
import { BadRequest } from '@/shared/errors/BadRequest';

type MedicalReportProps = {
  doctorId: Identity;
  pacientId: Identity;
  originalText: string;
  improvedText: string;
  createdAt?: Date;
};

export class MedicalReport extends Entity<MedicalReportProps> {
  private constructor(props: MedicalReportProps, id?: Identity) {
    super(props, id);
  }

  static create(props: MedicalReportProps, id?: Identity): MedicalReport {
    return new MedicalReport(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }

  get originalText(): string {
    return this.props.originalText;
  }

  get improvedText(): string {
    return this.props.improvedText;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt ?? new Date());
  }

  updateOriginalText(text: string): void {
    if (!text || text.trim().length < 2) {
      throw new BadRequest('Report must have at least 2 characters.');
    }

    this.props.originalText = text.trim();
  }

  updateImprovedText(text: string): void {
    if (!text || text.trim().length < 2) {
      throw new BadRequest('Response report must have at least 2 characters.');
    }

    this.props.improvedText = text.trim();
  }
}
