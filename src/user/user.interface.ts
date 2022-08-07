export interface IUser {
  id: string; // uuid v4
  login: string;
  password?: string;
  hashedRefreshToken?: string
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
