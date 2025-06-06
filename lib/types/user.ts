import { imageBody, imageProps } from "./common";

export type UserProps = {
  id: string;
  email: string;
  username: string;
  image: imageProps;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSignInProps = {
  email: string;
  password: string;
};

export type UserSignUpProps = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserBody = {
  id: string;
  username: string;
  email: string;
};

export type CreateUserProps = {
  user: UserSignUpProps & { image: imageBody };
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
