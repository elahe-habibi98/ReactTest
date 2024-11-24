import { useMutation, useQuery } from "@tanstack/react-query";

import http from "@core/services/interceptor/interceptor";
import { TFormValues } from "@core/models/createUser.model";

// Api Calls:
const getUsersList = () => {
  return http.get(`/api/info`);
};

const createUser = {
  mutationFn: (obj: TFormValues) => http.post(`/api/info`, obj),
};

const editUser = {
  mutationFn: ({ id, obj }: { id: number; obj: TFormValues }) =>
    http.put(`/api/info/${id}`, obj),
};

const getUserInfo = (id: number) => {
  return http.get(`/api/info/${id}`);
};

// Custom Hooks:
const useGetUsersList = () =>
  useQuery({
    queryKey: ["userList"],
    queryFn: () => getUsersList(),
  });

const useGetUserInfo = (id: number) =>
  useQuery({
    queryKey: ["userInfo", id],
    queryFn: () => getUserInfo(id),
  });

const useCreateUser = () => useMutation(createUser);

const useEditUser = () => useMutation(editUser);

// Exports:
export { useCreateUser, useGetUsersList, useEditUser, useGetUserInfo };
