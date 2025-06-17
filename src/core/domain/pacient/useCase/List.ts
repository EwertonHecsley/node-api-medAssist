import { Either, right } from "@/shared/utils/Either";
import { Pacient } from "../entity/Pacient";
import { PacientRepository } from "../repository/PacientRepository";

type ResponsePacient = Either<null, Pacient[]>;

export class ListAllPacientsUseCase {
    constructor(private readonly pacientReprository: PacientRepository) { }

    async execute(): Promise<ResponsePacient> {
        const listPacient = await this.pacientReprository.findAll();

        return right(listPacient);
    }
}