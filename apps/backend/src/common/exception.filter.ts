import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  FailedRelationConstraintError,
  InvalidRequestError,
  PermissionError,
  RecordAlreadyExists,
} from './commonError';
import { RecordNotFound } from './commonError';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof InvalidRequestError
        ? HttpStatus.BAD_REQUEST
        : exception instanceof PermissionError
        ? HttpStatus.UNAUTHORIZED
        : exception instanceof RecordNotFound
        ? HttpStatus.NOT_FOUND
        : exception instanceof RecordAlreadyExists
        ? HttpStatus.CONFLICT
        : exception instanceof FailedRelationConstraintError
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(httpStatus).json({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
