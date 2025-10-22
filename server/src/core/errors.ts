export class HttpError extends Error {
  status: number;
  details?: any;
  constructor(status: number, msg: string, details?: any) {
    super(msg);
    this.status = status;
    this.details = details;
  }
}
export class UnauthorizedError extends HttpError {
  constructor(msg = 'Unauthorized', details?: any) {
    super(401, msg, details);
  }
}
export class ForbiddenError extends HttpError {
  constructor(msg = 'Forbidden', details?: any) {
    super(403, msg, details);
  }
}
export class NotFoundError extends HttpError {
  constructor(msg = 'Not Found', details?: any) {
    super(404, msg, details);
  }
}
export class BadRequestError extends HttpError {
  constructor(msg = 'Bad Request', details?: any) {
    super(400, msg, details);
  }
}
export class AppError extends HttpError {
  constructor(msg = 'Server Error', details?: any) {
    super(500, msg, details);
  }
}
