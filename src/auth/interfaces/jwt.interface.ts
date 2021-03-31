import { Request } from 'express';
import { User } from 'src/users/users.schema';

export interface IJwtData extends User{
  id: string;
}

export interface IRequestWithJwtData extends Request {
  user: IJwtData;
}
