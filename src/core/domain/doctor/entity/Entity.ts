import { Entity } from '@/core/generics/Entity';
import { Email } from '../../pacient/objectValue/Email';
import { Identity } from '@/core/generics/Identity';
import { BadRequest } from '@/shared/errors/BadRequest';

type DoctorProps = {
    name: string;
    email: Email;
    specialty: string;
    docNuber: string;
    createdAt?: Date;
};

export class Doctor extends Entity<DoctorProps> {
    private constructor(props: DoctorProps, id?: Identity) {
        super(props, id);
    }

    static create(props: DoctorProps, id?: Identity): Doctor {
        return new Doctor(
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

    get email(): Email {
        return this.props.email;
    }

    get specialty(): string {
        return this.props.specialty;
    }

    get docNumber(): string {
        return this.props.docNuber;
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

    updateEmail(email: Email): void {
        this.props.email = email;
    }

    updateSpecialty(specialty: string): void {
        if (!specialty || specialty.trim().length < 2) {
            throw new BadRequest('Specialty must have at least 2 characters');
        }
        this.props.specialty = specialty.trim();
    }

    updateDocNumber(docNumber: string): void {
        if (!docNumber || docNumber.trim().length < 2) {
            throw new BadRequest('Doctor number must have at least 2 characters');
        }
        this.props.docNuber = docNumber.trim();
    }
}
