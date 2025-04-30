import { imageProps } from "./common";

export type UserProps = {
  id: string;
  email: string;
  username: string;
  image: imageProps;
  createdAt: Date;
  updatedAt: Date;
};
