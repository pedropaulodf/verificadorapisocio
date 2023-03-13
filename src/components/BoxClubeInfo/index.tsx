import JSONPretty from "react-json-pretty";
import { FiCopy } from "react-icons/fi";
import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import { copyText, RemoverBarraFinalString } from "../../utils/utils";
import CardImagemApp from "../CardImagemApp";
import MensagemRetornoAPI from "../MensagemRetornoAPI";

import "./styles.scss";

function BoxClubeInfo() {
  const {
    urlPorta,
    idEmpresa,
    sistemaQuality,
    handleBuscarClubeInfo,
    isLoadingClubeInfo,
    boxClubeInfoData,
    boxClubeInfoErrorData,
  } = useDadosApiContext();

  return (
    <div className="box-clube-container">
      <div className="box-clube-header-title">
        <p>GET CLUBE INFO</p>
        <button
          className="btn-copy"
          title="Copiar URL"
          onClick={() =>
            copyText(
              `${RemoverBarraFinalString(
                urlPorta
              )}/appApi/clube/getClubeInfo?idEmpresa=${idEmpresa}&sistemaQuality=${
                sistemaQuality ? "true" : "false"
              }`
            )
          }
        >
          <FiCopy color="#4e4e4e" size={14} />
        </button>
      </div>
      <div className="box-clube-header">
        <p>
          <span>{RemoverBarraFinalString(urlPorta)}</span>
          {`/appApi/clube/getClubeInfo?idEmpresa=`}
          <span>{idEmpresa}</span>
          {`&sistemaQuality=`}
          <span>{sistemaQuality ? "true" : "false"}</span>
        </p>
      </div>
      <div className="box-clube-content">
        <button
          type="button"
          onClick={() => handleBuscarClubeInfo()}
          disabled={isLoadingClubeInfo}
        >
          Buscar Clube Info
        </button>

        {boxClubeInfoErrorData.title && (
          <MensagemRetornoAPI data={boxClubeInfoErrorData} />
        )}

        {isLoadingClubeInfo ? (
          <div>
            <p>Buscando...</p>
          </div>
        ) : (
          boxClubeInfoData?.retornoApi && (
            <>
              <div className="card-empresa-dados">
                <div>
                  <p>{boxClubeInfoData.retornoApi.codCli}</p>
                </div>
                <p>
                  {
                    boxClubeInfoData.retornoApi?.empresa?.pessoa
                      ?.nomeRazaoSocial
                  }
                </p>
              </div>

              <div style={{ display: "inline-block" }}>
                {boxClubeInfoData.retornoApi.logoFundoLogin && (
                  <CardImagemApp
                    nameImage="fundo_app"
                    urlImage={boxClubeInfoData.retornoApi.logoFundoLogin}
                  />
                )}
                {boxClubeInfoData.retornoApi.logoFundoMenuLateral && (
                  <CardImagemApp
                    nameImage="fundo_menu"
                    urlImage={boxClubeInfoData.retornoApi.logoFundoMenuLateral}
                  />
                )}
                {boxClubeInfoData.retornoApi.logoApp && (
                  <CardImagemApp
                    nameImage="logo_app"
                    urlImage={boxClubeInfoData.retornoApi.logoApp}
                  />
                )}
                {boxClubeInfoData.retornoApi.logoCabecalho && (
                  <CardImagemApp
                    nameImage="logo_cab"
                    urlImage={boxClubeInfoData.retornoApi.logoCabecalho}
                  />
                )}
              </div>

              <div className="card-retorno-api">
                <div className="card-retorno-api-header">
                  <p>Retorno API</p>
                </div>
                <div className="card-retorno-api-content">
                  <JSONPretty
                    id="json-pretty"
                    data={boxClubeInfoData.retornoApi}
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
            </>
          )
        )}
      </div>
    </div>
  );
}

export default BoxClubeInfo;
