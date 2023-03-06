import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropsDadosApiContext = {
  urlPorta: string;
  setUrlPorta: Dispatch<SetStateAction<string>>;
  idEmpresa: string;
  setIdEmpresa: Dispatch<SetStateAction<string>>;
  sistemaQuality: boolean;
  setSistemaQuality: Dispatch<SetStateAction<boolean>>;
  cpfUrl: string;
  setCpfUrl: Dispatch<SetStateAction<string>>;
};

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
