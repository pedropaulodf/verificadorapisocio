export type SocioType = {
  pessoa?: {
    nomeRazaoSocial?: string;
    cpfCnpj?: string;
    foto?: string;
    nomeAbreviado?: string;
    contato?: SocioContatoType[] | [] | null;
    sexo?: string | undefined;
    rg?: string | undefined;
    dataNascimento?: string;
  };
  idEmpresa?: number;
  saldoPrePago?: number;
  idEmpresaRelacionamento?: number;
  tipoRelacionamento?: "ST" | "SD" | "SC" | string | undefined;
  tituloSocio?: {
    dependente?: boolean | undefined;
    idTituloSocio?: number;
    titulo?: {
      numero?: number;
    };
    categoriaTitulo?: {
      idCategoria?: number;
      descricao?: string;
    };
  } | null;
  convidado?: {
    idConvidado?: number;
  } | null;
};

type SocioContatoType = {
  informacao?: string;
  tipoContato?: "tcl" | "email" | undefined;
};
