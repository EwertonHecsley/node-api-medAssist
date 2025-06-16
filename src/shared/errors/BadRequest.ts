import { GenericError } from './GenericError';

export class BadRequest extends GenericError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
    this.name = 'BadRequest';
  }
}
