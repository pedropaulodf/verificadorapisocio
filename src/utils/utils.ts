import { copy } from "clipboard";
import { toastSuccess } from "./reactToastify";

export function shallowEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export const RemoverBarraFinalString = (url?: string) => {
  return url?.endsWith("/") ? url.substring(0, url.length - 1) : url ?? "";
};

export const copyText = (text: string) => {
  // Copia o texto
  copy(text);
  toastSuccess("Copiado!");
};

export const cpfMask = (value: string) => {
  if (value === "" || value === undefined) return "";
  else {
    // let doc = value.replace(/\D/g, "");
    // return cpf.format(doc);
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
};
