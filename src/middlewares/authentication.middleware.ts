import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface JwtUserPayload {
  sub: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export class JwtMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        error: 'Access denied',
        message: 'Authorization header is missing',
      });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Access denied',
        message: 'Invalid authorization format. Use Bearer {token}',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      const jwtSecretKey = process.env.JWT_SECRET;

      if (!jwtSecretKey) {
        console.error('JWT_SECRET is not configured in environment variables');
        res.status(500).json({
          error: 'Internal server error',
          message: 'Authentication configuration error',
        });
        return;
      }

      const decoded = jwt.verify(token, jwtSecretKey) as JwtUserPayload;

      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Token has expired',
        });
        return;
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid token',
        });
        return;
      } else {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'An error occurred during authentication',
        });
        return;
      }
    }
  }
}
