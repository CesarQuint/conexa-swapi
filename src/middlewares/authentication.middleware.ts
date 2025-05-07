import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: 'Access denied',
      message: 'Authorization header is missing',
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Access denied',
      message: 'Invalid authorization format. Use Bearer {token}',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (!jwtSecretKey) {
      console.error(
        'JWT_SECRET_KEY is not configured in environment variables',
      );
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Authentication configuration error',
      });
    }

    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token has expired',
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid token',
      });
    } else {
      console.error('JWT verification error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An error occurred during authentication',
      });
    }
  }
}
