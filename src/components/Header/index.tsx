import { useEffect, useState } from "react";
import { FiCopy, FiGithub } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";
import Select from "react-select";

import useFetch from "../../hooks/useFetch";
import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import { toastError } from "../../utils/reactToastify";
import { copyText, RemoverBarraFinalString } from "../../utils/utils";

import {
  QualityJsonRetornoAPIType,
  SelectOptionQualityJsonType,
} from "../../types/QualityJsonType";

import "./styles.scss";

function Header() {
  const {
    setIdEmpresa,
    setSistemaQuality,
    setUrlPorta,
    handleLimparTodosDados,
  } = useDadosApiContext();

  const [selectOptions, setSelectOptions] = useState<
    SelectOptionQualityJsonType[]
  >([]);

  const {
    isLoading: isLoadingBuscarQualityJson,
    data: dataBuscarQualityJson,
    fetchNext: fetchNextBuscarQualityJson,
    error: errorBuscarQualityJson,
  } = useFetch<QualityJsonRetornoAPIType>(
    `https://raw.githubusercontent.com/duduccosta/qualityJson/master/api.json`,
    {
      method: "GET",
      body: {},
    },
    1
  );

  useEffect(() => {
    fetchNextBuscarQualityJson(1, {});
  }, []);

  useEffect(() => {
    if (dataBuscarQualityJson) {
      const optionLocal = dataBuscarQualityJson.appParticular
        .sort((a, b) => a.codCli.localeCompare(b.codCli))
        .map((i) => ({
          label: `${i.codCli} • ${i.appName}`.toString(),
          value: i,
        }));
      setSelectOptions(optionLocal);
    }
  }, [dataBuscarQualityJson]);

  useEffect(() => {
    if (errorBuscarQualityJson) {
      toastError("Erro ao buscar itens do Combo!");
    }
  }, [errorBuscarQualityJson]);

  const handleSelectChange = (item: SelectOptionQualityJsonType | null) => {
    setIdEmpresa(item?.value?.idEmpresa?.toString() ?? "1");
    setSistemaQuality(item?.value?.sistemaQuality ?? false);
    setUrlPorta(RemoverBarraFinalString(item?.value?.url) ?? "");

    handleLimparTodosDados();
  };

  const handleCopyUrlLink = () => {
    copyText("Header");
  };

  return (
    <div className="header-container">
      <div className="sub-container">
        <div className="logo-select-box">
          <div className="logo">
            <p>VERIFICAR API • APP DO SÓCIO</p>
          </div>
          <Select
            options={selectOptions}
            onChange={(v) => handleSelectChange(v)}
            placeholder="Selecione o cliente:"
            isLoading={isLoadingBuscarQualityJson}
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                minWidth: "50%",
                border: "none",
                color: "#ffffff",
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#00000020",
                border: "none",
                color: "#ffffff",
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: "#ffffff",
                border: "none",
              }),
              dropdownIndicator: (baseStyles) => ({
                ...baseStyles,
                color: "#ffffff",
                border: "none",
              }),
              input: (baseStyles) => ({
                ...baseStyles,
                color: "#ffffff",
                border: "none",
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                color: "#ffffff",
                backgroundColor: "#000000d5",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#ffffff",
                primary25: "#ffffff5a",
              },
            })}
          />
        </div>
        <div className="icons-container">
          <a
            href="https://github.com/pedropaulodf/verificadorapisocio"
            target="_blank"
          >
            <button type="button" className="button-github">
              <FiGithub color="#535353" size={20} />
            </button>
          </a>
          <a
            href="https://drive.google.com/drive/folders/1BCGZgXB10ecvARXUlo7m0L9L5PDk_qrg?usp=sharing"
            target="_blank"
          >
            <button type="button" className="button-drive">
              <FaGoogleDrive color="#0b6cbb" size={20} />
            </button>
          </a>
          <button
            type="button"
            className="button-copy"
            onClick={() => handleCopyUrlLink()}
          >
            <FiCopy color="#bb751a" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
