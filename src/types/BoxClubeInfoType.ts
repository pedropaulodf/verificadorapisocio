import { ClubeType } from "./ClubeType";

export type BoxClubeInfoDataType = {
  url: string;
  buscar: boolean;
  retornoApi?: ClubeType;
};

export type BoxClubeInfoErrorDataType = {
  title?: string;
  message?: string;
  status?: string;
  type: "error" | "success" | "warning";
};
