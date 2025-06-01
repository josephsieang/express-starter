import { UserAuthPayload } from '../../models/user';

declare global {
  namespace Express {
    interface Request {
      user?: UserAuthPayload;
    }
  }
}
