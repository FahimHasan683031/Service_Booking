import { Date, Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export type IUser = {
  name: string;
  role: USER_ROLES;
  email: string;
  password: string;
  reEnter_password: string;
  image?: string;
  phone?:number;
  gender?:string;
  dateOfBirth?:Date;
  address?:string;
  status: 'active' | 'delete';
  verified: boolean;
  bookmarks?:Types.ObjectId[];
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
