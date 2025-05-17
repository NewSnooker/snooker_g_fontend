import { imageProps } from "./common";

export type UserProps = {
  id: string;
  email: string;
  username: string;
  image: imageProps;
  createdAt: Date;
  updatedAt: Date;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
