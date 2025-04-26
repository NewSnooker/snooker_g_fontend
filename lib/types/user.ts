import { imageUrlProps } from "./common";

export type UserProps = {
  id: string;
  email: string;
  username: string;
  imageUrl: imageUrlProps;
  createdAt: Date;
  updatedAt: Date;
};
