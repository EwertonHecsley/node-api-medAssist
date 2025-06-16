import { Entity } from '@/core/generics/Entity';
import { CPF } from '../objectValue/CPF';
import { Email } from '../objectValue/Email';
import { Gender } from '../enum/Gender';
import { Identity } from '@/core/generics/Identity';
import { BadRequest } from '@/shared/errors/BadRequest';

type PacientProps = {
    name: string;
    susNumber: string;
    cpf: CPF;
    birthDate: Date;
    gender: Gender;
    phone: string;
    email?: Email;
    createdAt?: Date;
};

export class Pacient extends Entity<PacientProps> {
    private constructor(props: PacientProps, id?: Identity) {
        super(props, id);
    }

    static create(props: PacientProps, id?: Identity): Pacient {
        return new Pacient(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );
    }

    get name(): string {
        return this.props.name;
    }

    get susNumber(): string {
        return this.props.susNumber;
    }

    get cpf(): CPF {
        return this.props.cpf;
    }

    get birthDate(): Date {
        return this.props.birthDate;
    }

    get gender(): Gender {
        return this.props.gender
    }

    get phone(): string {
        return this.props.phone;
    }

    get email(): Email | undefined {
        return this.props.email
    }

    get createdAt(): Date {
        return new Date(this.props.createdAt!);
    }

    updateName(name: string): void {
        if (!name || name.trim().length < 2) {
            throw new BadRequest('Name must have at least 2 characters');
        }
        this.props.name = name.trim();
    }

    updatePhone(phone: string): void {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length < 10 || cleaned.length > 11) {
            throw new BadRequest('Phone must be a valid number with 10 or 11 digits');
        }
        this.props.phone = cleaned;
    }

    updateEmail(email: Email): void {
        this.props.email = email;
    }

    updateSusNumber(susNumber: string): void {
        if (!susNumber || susNumber.length < 5) {
            throw new Error('SUS Number must be valid');
        }
        this.props.susNumber = susNumber.trim();
    }

    updateGender(gender: Gender): void {
        this.props.gender = gender;
    }

    updateBirthDate(date: Date): void {
        if (isNaN(date.getTime())) {
            throw new BadRequest('Invalid birth date');
        }
        this.props.birthDate = date;
    }

    updateCPF(cpf: CPF): void {
        this.props.cpf = cpf
    }
}
