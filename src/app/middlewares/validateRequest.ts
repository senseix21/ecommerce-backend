import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodEffects } from 'zod'
import ApiError from '../../errors/ApiError';

const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies
        })
        return next();
    } catch (error) {
        next(new ApiError(400, 'Validation Error'));
    }
}

export default validateRequest;