import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Bad Request',
        message: result.error.flatten(),
        status: 400,
        timestamp: new Date().valueOf()
      });
      return;
    }

    // If validation is successful, attach the parsed data to the request object
    req.body = result.data;
    next();
  };
}
