import { Request, Response, NextFunction } from 'express';

// Controllers throw or pass errors using the ApiError class.
// The error handler middleware formats all errors to this structure, including validation errors (with details).
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('❌ Request error:', {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
    query: req.query
  });
  res.status(err.status || 500).json({
    error: err.error || 'InternalServerError',
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: err.timestamp || Date.now(),
    details: err.details // optional, for validation errors
  });
}
