import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

/**
 * Socket.IO middleware for authenticating users via JWT.
 * It verifies the token provided in the socket's handshake.
 *
 * @param socket - The Socket.IO socket instance.
 * @param next - The next function in the middleware chain.
 */
export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('Authentication error: Token not provided'));
  }

  try {
    // Verify the token using the same secret as your REST API
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // Attach user payload to the socket for use in event handlers
    (socket as any).user = decoded;
    next();
  } catch (err) {
    return next(new Error('Authentication error: Invalid token'));
  }
};
