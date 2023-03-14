import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import { BoxDataType, BoxErrorDataType } from "../types/BoxClubeInfoType";
import { BoxLoginInputsData } from "../types/BoxLoginType";
import { ClubeType } from "../types/ClubeType";
import {
  DefaultApiResponseType,
  LoginResultType,
} from "../types/RetornoAPIType";
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
  handleBuscarLogin: () => void;
  handleLimparTodosDados: () => void;
  isLoadingClubeInfo: boolean;
  boxClubeInfoData: BoxDataType<ClubeType>;
  boxClubeInfoErrorData: BoxErrorDataType;
  setBoxClubeInfoErrorData: Dispatch<SetStateAction<BoxErrorDataType>>;
  boxLoginErrorData: BoxErrorDataType;
  boxLoginData: BoxDataType<string>;
  boxLoginInputsData: BoxLoginInputsData;
  setBoxLoginInputsData: Dispatch<SetStateAction<BoxLoginInputsData>>;
  isLoadingLogin: boolean;
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
  const [boxClubeInfoData, setBoxClubeInfoData] = useState<
    BoxDataType<ClubeType>
  >({
    url: "",
    buscar: false,
    retornoApi: undefined,
  });

  const [boxClubeInfoErrorData, setBoxClubeInfoErrorData] =
    useState<BoxErrorDataType>({
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

  // boxLogin
  const [boxLoginInputsData, setBoxLoginInputsData] =
    useState<BoxLoginInputsData>({
      cpf: "",
      senha: "",
    });
  const [boxLoginData, setBoxLoginData] = useState<BoxDataType<string>>({
    url: "",
    buscar: false,
    retornoApi: undefined,
  });

  const [boxLoginErrorData, setBoxLoginErrorData] = useState<BoxErrorDataType>({
    title: undefined,
    message: undefined,
    type: "error",
  });

  const handleLimparBoxLogin = () => {
    setBoxClubeInfoData({
      url: "",
      buscar: false,
      retornoApi: undefined,
    });
    setBoxLoginErrorData({
      title: undefined,
      message: undefined,
      type: "error",
    });
  };

  const handleLimparTodosDados = () => {
    handleLimparBoxClubeInfo();
    handleLimparBoxLogin();
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

  const {
    isLoading: isLoadingLogin,
    data: dataLogin,
    fetchNext: fetchNextLogin,
    error: errorLogin,
  } = useFetch<LoginResultType>(
    `${RemoverBarraFinalString(boxLoginData.url)}/appApi/login`,
    {
      method: "POST",
      body: {
        idEmpresa,
        sistemaQuality,
      },
    },
    1
  );

  // getClubeInfo
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
            // const imageTest = { status: false };
            const imagemRequest = new XMLHttpRequest();
            imagemRequest.open("HEAD", file, false);
            imagemRequest.send();
            const resultado = imagemRequest.status;
            // if (resultado === 200 || resultado === 405) {
            //   imageTest.status = true;
            // } else {
            //   imageTest.status = false;
            // }
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
      } else if (arrayIsImagensExistes.some((i) => i === 999 || i === 405)) {
        setBoxClubeInfoErrorData({
          title: "API OK • NÃO FOI POSSÍVEL CHECAR AS IMAGENS",
          type: "lightwarning",
          message:
            "[CORS | 405] - A comunicação com o servidor está ok, porém, não foi possível checar se as imagens existem ou não. Se elas estão sendo mostradas abaixo ou acessíveis no link externo, está tudo certo. Se não estiver, corrigir.",
        });
      } else {
        setBoxClubeInfoErrorData({
          title: "API COM IMAGEM(S) QUEBRADA(S)",
          type: "warning",
          message:
            "A comunicação com o servidor está ok, mas as imagens para o aplicativo não estão todas carregando corretamente. Verifique cada uma no link externo. NÃO É POSSÍVEL SUBIR O APLICATIVO COM ESSE ERRO.",
        });
      }
    }
  }, [dataClubeInfo]);

  useEffect(() => {
    if (errorClubeInfo) {
      toastError("Erro ao buscar dados do Clube!");
      setBoxClubeInfoErrorData({
        title: "API ERRO",
        message: `${errorClubeInfo.message?.data}`,
        status: `${errorClubeInfo.message?.status}`,
        type: "error",
      });
    }
  }, [errorClubeInfo]);

  // Login

  const handleBuscarLogin = () => {
    setBoxLoginData((prev) => ({
      ...prev,
      url: RemoverBarraFinalString(urlPorta),
      buscar: true,
      retornoApi: undefined,
    }));
    fetchNextLogin(1, {
      cache: false,
      cpfCnpj: boxLoginInputsData.cpf.replace(/\D/g, ""),
      senha: boxLoginInputsData.senha,
    });
    setToken("");
  };

  useEffect(() => {
    if (dataLogin && dataLogin.status === "ok") {
      setToken(dataLogin.data.token);

      const customRetornoApi = dataLogin.data.usuarios.reduce(
        (acc, curr) =>
          acc +
          `<b>Nome:</b> ${curr.pessoa?.nomeRazaoSocial}<br><b>Relacionamento:</b> ${curr.tipoRelacionamento}<br><b>Categoria:</b> ${curr.tituloSocio?.categoriaTitulo?.descricao} (${curr.tituloSocio?.titulo?.numero})<br><br>`,
        ""
      );

      setBoxLoginData({
        url: urlPorta,
        buscar: false,
      });

      setBoxLoginErrorData({
        title: "API OK",
        type: "success",
        message: `<html>${customRetornoApi.substring(
          0,
          customRetornoApi.length - 1
        )}</html>`,
      });
    }
  }, [dataLogin]);

  useEffect(() => {
    if (errorLogin) {
      toastError("Erro ao testar Login!");
      setBoxLoginErrorData({
        title: "API ERRO",
        message: `${errorLogin.message?.data}`,
        status: `${errorLogin.message?.status}`,
        type: "error",
      });
    }
  }, [errorLogin]);

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
        boxLoginErrorData,
        boxLoginData,
        boxLoginInputsData,
        setBoxLoginInputsData,
        isLoadingLogin,
        handleBuscarLogin,
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
