import { SocioType } from "./SocioType";

export type LoginResultType = {
  status?: string;
  message?: string;
  data: LoginResultDataType;
};

type LoginResultDataType = {
  token: string;
  expires: string;
  usuarios: SocioType[];
};

export type ApiUrl = {
  baseURL: string;
};

export type DefaultApiResponseType<T> = {
  status: string;
  data: T;
};
