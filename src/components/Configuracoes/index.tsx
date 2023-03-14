import { useEffect } from "react";
import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import { cpfMask, RemoverBarraFinalString } from "../../utils/utils";
import SwitchSimNao from "../SwitchSimNao";
import "./styles.scss";

function Configuracoes() {
  const {
    urlPorta,
    setUrlPorta,
    idEmpresa,
    setIdEmpresa,
    setSistemaQuality,
    setBoxLoginInputsData,
  } = useDadosApiContext();

  useEffect(() => {
    const query = window.location.search;

    if (query) {
      // Remove o ? do início e separa os parametros
      const parametrosArray = query.substring(1).split("&");

      parametrosArray.map((i) => {
        const item = i.split("=");
        switch (item[0]) {
          case "idEmpresa":
            setIdEmpresa(item[1] !== "" ? item[1] : "1");
            break;

          case "sistemaQuality":
            setSistemaQuality(item[1] === "true" ? true : false);
            break;

          case "urlPorta":
            setUrlPorta(RemoverBarraFinalString(item[1]) ?? "");
            break;

          case "cpf":
            setBoxLoginInputsData((prev) => ({
              ...prev,
              cpf: cpfMask(item[1]),
            }));
            break;

          default:
            break;
        }
      });
    }
  }, []);

  return (
    <div className="configuracoes-container">
      <div className="sub-container">
        <div className="input-container">
          <div className="box-label">
            <label htmlFor="urlPorta">URL/PORTA</label>
          </div>
          <div className="box-input">
            <input
              type="url"
              name="urlPorta"
              id="urlPorta"
              placeholder="Digite a url com a porta:"
              value={urlPorta}
              onChange={(evt) => setUrlPorta(evt.target.value)}
            />
          </div>
        </div>

        <div className="input-container input-container-idEmpresa">
          <div className="box-label">
            <label htmlFor="idEmpresa">idEmpresa</label>
          </div>
          <div className="box-input">
            <input
              type="number"
              name="idEmpresa"
              id="idEmpresa"
              className="input-idEmpresa"
              min={0}
              max={999}
              value={idEmpresa}
              onChange={(evt) => setIdEmpresa(evt.target.value)}
            />
          </div>
        </div>

        <div className="input-container input-container-sistemaQuality">
          <div className="box-label">
            <label htmlFor="sistemaQuality">sistemaQuality/Cobol</label>
          </div>
          <div className="box-input">
            <SwitchSimNao />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;
