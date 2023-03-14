export type BoxDataType<T> = {
  url: string;
  buscar: boolean;
  retornoApi?: T;
};

export type BoxErrorDataType = {
  title?: string;
  message?: string;
  status?: string;
  type: "error" | "success" | "warning" | "lightwarning";
};
