import "./styles.scss";

export default function SwitchSimNao() {
  return (
    <div className="switch-container">
      <div className="toggle-radio">
        <input type="radio" name="rdo" id="sim" checked />
        <input type="radio" name="rdo" id="nao" />
        <div className="switch">
          <label htmlFor="sim">Sim</label>
          <label htmlFor="nao">Não</label>
        </div>
      </div>
    </div>
  );
}
