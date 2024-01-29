import api from "@/api/index";
import {AxiosError} from "axios";

type LoginPayload = {
  email: string;
  password: string;
}
export async function login( requestBody: LoginPayload) {
  return  await api.post("/v1/users/login", requestBody);
}
