import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch(Error)
export class FirestoreExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    response.status(500).json({ message: exception.message });
  }
}
