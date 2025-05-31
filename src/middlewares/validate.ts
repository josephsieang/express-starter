import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/api-error';

export function validate(
  schema: ZodSchema,
  source: 'body' | 'params' | 'query' = 'body'
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    let dataToValidate: any;
    switch (source) {
      case 'params':
        dataToValidate = req.params;
        break;
      case 'query':
        dataToValidate = req.query;
        break;
      default:
        dataToValidate = req.body;
        break;
    }

    if (source === 'body' && (dataToValidate == null || Object.keys(dataToValidate).length === 0)) {
      const error = new ApiError('Bad Request', 'No data provided for update.', 400);
      return next(error);
    }

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      const error = new ApiError('Bad Request', 'Validation failed', 400, result.error.flatten());
      return next(error);
    }

    // If validation is successful, attach the parsed data to the respective request object part
    if (source === 'body') {
      req.body = result.data;
    } else if (source === 'params') {
      req.params = result.data as any; // Type assertion needed as req.params is ParamsDictionary
    } else if (source === 'query') {
      req.query = result.data as any; // Type assertion needed as req.query is ParsedQs
    }

    next();
  };
}
