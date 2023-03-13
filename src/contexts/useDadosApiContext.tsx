import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import {
  BoxClubeInfoDataType,
  BoxClubeInfoErrorDataType,
} from "../types/BoxClubeInfoType";
import { ClubeType } from "../types/ClubeType";
import { DefaultApiResponseType } from "../types/RetornoAPIType";
import { toastError } from "../utils/reactToastify";
import { RemoverBarraFinalString } from "../utils/utils";

type PropsDadosApiContext = {
  urlPorta: string;
  setUrlPorta: Dispatch<SetStateAction<string>>;
  idEmpresa: string;
  setIdEmpresa: Dispatch<SetStateAction<string>>;
  sistemaQuality: boolean;
  setSistemaQuality: Dispatch<SetStateAction<boolean>>;
  cpfUrl: string;
  setCpfUrl: Dispatch<SetStateAction<string>>;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  handleBuscarClubeInfo: () => void;
  handleLimparTodosDados: () => void;
  isLoadingClubeInfo: boolean;
  boxClubeInfoData: BoxClubeInfoDataType;
  boxClubeInfoErrorData: BoxClubeInfoErrorDataType;
  setBoxClubeInfoErrorData: Dispatch<SetStateAction<BoxClubeInfoErrorDataType>>;
};

type ImagensASerVerificadas =
  | "logoApp"
  | "logoCabecalho"
  | "logoFundoMenuLateral"
  | "logoFundoLogin";

const DadosApiContext = createContext<PropsDadosApiContext>(
  {} as PropsDadosApiContext
);

export const DadosApiContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [urlPorta, setUrlPorta] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("1");
  const [sistemaQuality, setSistemaQuality] = useState(true);
  const [cpfUrl, setCpfUrl] = useState("");
  const [token, setToken] = useState("");

  // getClubeInfo
  const [boxClubeInfoData, setBoxClubeInfoData] =
    useState<BoxClubeInfoDataType>({
      url: "",
      buscar: false,
      retornoApi: undefined,
    });

  const [boxClubeInfoErrorData, setBoxClubeInfoErrorData] =
    useState<BoxClubeInfoErrorDataType>({
      title: undefined,
      message: undefined,
      type: "error",
    });

  const handleLimparBoxClubeInfo = () => {
    setBoxClubeInfoData({
      url: "",
      buscar: false,
      retornoApi: undefined,
    });
    setBoxClubeInfoErrorData({
      title: undefined,
      message: undefined,
      type: "error",
    });
  };

  const handleLimparTodosDados = () => {
    handleLimparBoxClubeInfo();
  };

  const {
    isLoading: isLoadingClubeInfo,
    data: dataClubeInfo,
    fetchNext: fetchNextClubeInfo,
    error: errorClubeInfo,
  } = useFetch<DefaultApiResponseType<ClubeType>>(
    `${RemoverBarraFinalString(
      boxClubeInfoData.url
    )}/appApi/clube/getClubeInfo`,
    {
      method: "GET",
      body: {
        idEmpresa,
        sistemaQuality,
      },
    },
    1
  );

  const handleBuscarClubeInfo = () => {
    setBoxClubeInfoData((prev) => ({
      ...prev,
      url: RemoverBarraFinalString(urlPorta),
      buscar: true,
      retornoApi: undefined,
    }));
    fetchNextClubeInfo(1, {
      cache: false,
    });
  };

  useEffect(() => {
    if (dataClubeInfo && dataClubeInfo.status === "ok") {
      const { data } = dataClubeInfo;

      setBoxClubeInfoData({
        url: urlPorta,
        buscar: false,
        retornoApi: data,
      });

      const imagensAppArray = [
        "logoApp",
        "logoCabecalho",
        "logoFundoMenuLateral",
        "logoFundoLogin",
      ] as ImagensASerVerificadas[];

      function checarImagemExiste(file?: string) {
        try {
          if (file) {
            const imageTest = { status: false };
            var imagemRequest = new XMLHttpRequest();
            imagemRequest.open("HEAD", file, false);
            imagemRequest.send();
            var resultado = imagemRequest.status;
            if (resultado !== 200) imageTest.status = false;
            return resultado;
          }
        } catch (error) {
          return 999;
        }
      }

      const arrayIsImagensExistes = imagensAppArray.map((value) =>
        checarImagemExiste(data[value])
      );

      if (arrayIsImagensExistes.every((i) => i === 200)) {
        setBoxClubeInfoErrorData({
          title: "API OK",
          type: "success",
        });
      } else if (arrayIsImagensExistes.some((i) => i === 999)) {
        setBoxClubeInfoErrorData({
          title: "API OK • NÃO FOI POSSÍVEL CHECAR AS IMAGENS (CORS)",
          type: "warning",
          message:
            "A comunicação com o servidor está ok, mas não foi possível checar se as imagens existem ou não. Se elas estão sendo mostradas abaixo, aparentemente está tudo certo.",
        });
      } else {
        setBoxClubeInfoErrorData({
          title: "API COM IMAGENS QUEBRADAS",
          type: "warning",
          message:
            "A comunicação com o servidor está ok, mas as imagens para o aplicativo não estão todas carregando corretamente. Não é possível subir o aplicativo com esse erro.",
        });
      }
    }
  }, [dataClubeInfo]);

  useEffect(() => {
    if (errorClubeInfo) {
      console.log("errorClubeInfo:", errorClubeInfo);
      toastError("Erro ao buscar dados do Clube!");
      setBoxClubeInfoErrorData({
        title: "API ERRO",
        message: `${errorClubeInfo.message?.data}`,
        status: `${errorClubeInfo.message?.status}`,
        type: "error",
      });
    }
  }, [errorClubeInfo]);

  return (
    <DadosApiContext.Provider
      value={{
        urlPorta,
        setUrlPorta,
        idEmpresa,
        setIdEmpresa,
        sistemaQuality,
        setSistemaQuality,
        cpfUrl,
        setCpfUrl,
        token,
        setToken,
        handleBuscarClubeInfo,
        isLoadingClubeInfo,
        boxClubeInfoData,
        handleLimparTodosDados,
        boxClubeInfoErrorData,
        setBoxClubeInfoErrorData,
      }}
    >
      {children}
    </DadosApiContext.Provider>
  );
};

// Hook to provide access to context object
export const useDadosApiContext = () => {
  return useContext(DadosApiContext);
};
