import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import JSONPretty from "react-json-pretty";
import "./styles.scss";

function BoxClubeInfo() {
  const { urlPorta, idEmpresa, sistemaQuality } = useDadosApiContext();

  const RETORNO_API = {
    status: "ok",
    data: {
      empresa: {
        idEmpresa: 81,
        pessoa: {
          nomeRazaoSocial: "IPE TENIS CLUBE",
          cpfCnpj: null,
          foto: null,
          nomeAbreviado: null,
          contato: null,
          sexo: null,
          rg: null,
          dataNascimento: "0001-01-01T00:00:00",
        },
      },
      showInstitucionalInicial: false,
      institucionalUrl: null,
      codCli: "0081",
      logoApp: "http://ddnsipetenisclube.ddns.net:8880/temp/logo_app.png",
      logoCabecalho: "http://ddnsipetenisclube.ddns.net:8880/temp/logo_cab.png",
      logoFundoMenuLateral:
        "http://ddnsipetenisclube.ddns.net:8880/temp/fundo_menu.png",
      logoFundoLogin:
        "http://ddnsipetenisclube.ddns.net:8880/temp/fundo_app.png",
      urlTermoApp: "http://ddnsipetenisclube.ddns.net:8880/temp/termo_app.txt",
      habilitaConvite: false,
      habilitaCnvDatFim: false,
      headerBackgroundColor: "#4994CD",
      headerTextColor: "#FFFFFF",
      bottomBackgroundColor: "#4994CD",
      bottomTextColor: "#FFFFFF",
      bottomTextColorActive: "#FFFFFF",
      bottomTextColorInactive: "#EBEBEB",
      buttomBackgroundColor: "#1C3F62",
      buttomTextColor: "#FFF",
      labelLoginTextColor: "#000",
      backgroundColorContainerLogin: "rgba(255,255,255,0.7)",
      opacityLogin: 0.5,
      inibirCarteiraDigital: false,
      formaPagamento: null,
      blur: 2.0,
      menu: {
        convite: false,
        boleto: true,
        portaria: true,
        matricula: false,
        treino: false,
        reserva: false,
        consumo: false,
        recarga: false,
      },
    },
  };

  return (
    <div className="box-clube-container">
      <div className="box-clube-header">
        <p>
          <span>{urlPorta}</span>
          {`/appApi/clube/getClubeInfo?idEmpresa=`}
          <span>{idEmpresa}</span>
          {`&sistemaQuality=`}
          <span>{sistemaQuality ? "true" : "false"}</span>
        </p>
      </div>
      <div className="box-clube-content">
        <button type="button">Buscar Clube Info</button>

        <div className="card-empresa-dados">
          <div>
            <p>{RETORNO_API.data.codCli}</p>
          </div>
          <p>{RETORNO_API.data.empresa.pessoa.nomeRazaoSocial}</p>
        </div>

        <div className="card-retorno-api">
          <div className="card-retorno-api-header">
            <p>Retorno API</p>
          </div>
          <div className="card-retorno-api-content">
            <JSONPretty
              id="json-pretty"
              data={RETORNO_API.data}
              theme={{
                main: "line-height:1.2;color:#3393a7;background:#ffffff00;overflow:auto;font-family:monospace;",
                error:
                  "line-height:1.2;color:#3393a7;background:#ffeeee;overflow:auto;font-family:monospace;",
                key: "color:#3393a7;font-family:monospace;",
                string: "color:#ce7612;font-family:monospace;",
                value: "color:#b82ee2;font-family:monospace;",
                boolean: "color:#239418;font-family:monospace;",
              }}
              style={{ fontSize: ".9em", fontFamily: "serif" }}
            ></JSONPretty>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxClubeInfo;
