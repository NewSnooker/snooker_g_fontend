export type UserProps = {
  id: string;
  email: string;
  username: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserProps = {
  username: string;
  imageUrl?: string;
};

export type GetMeResponse = {
  status: number;
  data?: UserProps;
  message?: string;
};
export type UpdateProfileResponse = GetMeResponse;
