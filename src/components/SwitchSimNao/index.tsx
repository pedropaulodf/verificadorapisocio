import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import "./styles.scss";

export default function SwitchSimNao() {
  const { sistemaQuality, setSistemaQuality } = useDadosApiContext();

  return (
    <div className="switch-container">
      <div className="toggle-radio">
        <input
          type="radio"
          name="rdo"
          id="sim"
          checked={sistemaQuality}
          onChange={() => setSistemaQuality((prev) => !prev)}
        />
        <input
          type="radio"
          name="rdo"
          id="nao"
          checked={!sistemaQuality}
          onChange={() => setSistemaQuality((prev) => !prev)}
        />
        <div className="switch">
          <label htmlFor="sim">Sim</label>
          <label htmlFor="nao">Não</label>
        </div>
      </div>
    </div>
  );
}
