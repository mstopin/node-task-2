import { DomainRuleBrokenError } from './common/domain-rule-broken.error';
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from './common/http';
import { LOGGER } from './common/logger';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { Logger } from 'winston';
import { ZodError } from 'zod';

export function createErrorHandler() {
  const logger = Container.get<Logger>(LOGGER);

  return function (err: Error, _: Request, res: Response, __: NextFunction) {
    if (err instanceof ZodError) {
      return res.status(HTTP_BAD_REQUEST).json({
        errors: err.issues.map((i) => i.message),
      });
    }

    if (err instanceof DomainRuleBrokenError) {
      return res.status(HTTP_BAD_REQUEST).json({
        error: err.message,
      });
    }

    logger.error(err.message);

    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  };
}
