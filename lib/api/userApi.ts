import { imageBody, TableParams } from "../types/common";
import { backend } from "./apiClient";

export const getMe = async () => {
  const { data } = await backend.api.user.me.get({
    fetch: { credentials: "include" },
  });
  return data;
};
export const updateAvatar = async (id: string, image: imageBody) => {
  const { data } = await backend.api.user.me.avatar({ id }).put(
    {
      avatar: image,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};

export const updateUsername = async (id: string, username: string) => {
  const { data } = await backend.api.user.me.username({ id }).put(
    {
      username: username,
    },
    {
      fetch: { credentials: "include" },
    }
  );
  return data;
};

export const getUsersData = async (params: TableParams): Promise<any> => {
  const { pageIndex, pageSize, sortBy, sortOrder, filters, search } = params;

  // Create the query object with the required properties
  const query: {
    page: string;
    pageSize: string;
    filter?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    role?: string;
    isActive?: string;
  } = {
    page: (pageIndex + 1).toString(), // Convert from 0-indexed to 1-indexed
    pageSize: pageSize.toString(), // Use pageSize instead of limit
  };

  // Add optional parameters if they exist
  if (search) {
    query.search = search;
  }

  if (filters?.role) {
    query.role = filters.role;
  }

  // Add isActive filter if it exists
  if (filters?.isActive !== undefined) {
    query.isActive = filters.isActive.toString();
  }

  // Add sorting parameters if they exist
  if (sortBy) {
    query.sortBy = sortBy;
    query.sortOrder = sortOrder || "asc";
  }

  try {
    const { data } = await backend.api.admin.users.get({
      query,
      fetch: { credentials: "include" },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      data: [],
      pageCount: 0,
      total: 0,
    };
  }
};
