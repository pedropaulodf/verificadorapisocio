import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import SwitchSimNao from "../SwitchSimNao";
import "./styles.scss";

function Configuracoes() {
  const { urlPorta, setUrlPorta, idEmpresa, setIdEmpresa } =
    useDadosApiContext();

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
