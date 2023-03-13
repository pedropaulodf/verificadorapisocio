export type ClubeType = {
  empresa?: {
    idEmpresa?: number;
    pessoa?: {
      nomeRazaoSocial?: string | null | undefined;
      cpfCnpj?: string | null | undefined;
      foto?: string | null | undefined;
      nomeAbreviado?: string | null | undefined;
      contato?: string | null | undefined;
      sexo?: string | null | undefined;
      rg?: string | null | undefined;
      dataNascimento?: string | null | undefined;
    };
  };
  showInstitucionalInicial?: boolean;
  codCli?: string | null | undefined;
  institucionalUrl?: string | null | undefined;
  logoApp?: string | undefined;
  logoCabecalho?: string | undefined;
  logoFundoMenuLateral?: string | undefined;
  logoFundoLogin?: string | undefined;
  urlTermoApp?: string | null | undefined;
  habilitaConvite?: boolean;
  habilitaCnvDatFim?: boolean;
  headerBackgroundColor?: string | null | undefined;
  headerTextColor?: string | null | undefined;
  bottomBackgroundColor?: string | null | undefined;
  bottomTextColor?: string | null | undefined;
  bottomTextColorActive?: string | null | undefined;
  bottomTextColorInactive?: string | null | undefined;
  buttomBackgroundColor?: string | null | undefined;
  buttomTextColor?: string | null | undefined;
  labelLoginTextColor?: string | null | undefined;
  backgroundColorContainerLogin?: string | null | undefined;
  opacityLogin?: number;
  blur?: number;
  menu: MenuType;
  inibirCarteiraDigital?: boolean;
  formaPagamento?: FormaPagamento[];
};

export type MenuType = {
  convite: boolean;
  portaria: boolean;
  boleto: boolean;
  matricula: boolean;
  treino: boolean;
  consumo: boolean;
  reserva: boolean;
  recarga: boolean;
};

export type FormaPagamento = {
  idFormaPagamento: number;
  idContaPagamento: number;
  descricao: string | null;
  tipo: string | null;
  qrcode: string | null;
};
