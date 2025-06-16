import { GenericError } from './GenericError';

export class NotFound extends GenericError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
    this.name = 'NotFound';
  }
}
