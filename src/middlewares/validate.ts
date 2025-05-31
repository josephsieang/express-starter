import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(
  schema: ZodSchema,
  source: 'body' | 'params' | 'query' = 'body'
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    let dataToValidate;
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

    const result = schema.safeParse(dataToValidate);
    if (!result.success) {
      res.status(400).json({
        error: 'Bad Request',
        message: result.error.flatten(),
        status: 400,
        timestamp: new Date().valueOf()
      });
      return;
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
