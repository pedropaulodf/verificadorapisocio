export type QualityJsonRetornoAPIType = {
  appGenerico: [
    {
      codcli: string;
      nome: string;
      url: string;
    }
  ];
  appParticular: QualityJsonItemObjectType[];
};

export type QualityJsonItemObjectType = {
  codCli: string;
  ios: {
    version: string;
    build: string;
  };
  android: {
    version: string;
    build: string;
  };
  appName: string;
  url: string;
  idEmpresa?: number;
  sistemaQuality?: boolean;
};

export type SelectOptionQualityJsonType = {
  label: string;
  value: QualityJsonItemObjectType;
};
