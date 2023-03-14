import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import { cpfMask, RemoverBarraFinalString } from "../../utils/utils";
import Loading from "../Loading";
import MensagemRetornoAPI from "../MensagemRetornoAPI";
import "./styles.scss";

function BoxLogin() {
  const {
    urlPorta,
    boxLoginErrorData,
    boxLoginInputsData,
    setBoxLoginInputsData,
    isLoadingLogin,
    handleBuscarLogin,
  } = useDadosApiContext();

  const [inputType, setInputType] = useState<"text" | "password">("password");

  return (
    <div className="box-login-container">
      <div className="box-login-header-title">
        <p>LOGIN</p>
      </div>
      <div className="box-login-header">
        <p>
          <span>{RemoverBarraFinalString(urlPorta)}</span>
          {`/appApi/login`}
        </p>
      </div>
      <div className="box-login-content">
        <div className="input-box">
          <div className="label-box">
            <p>CPF:</p>
          </div>
          <input
            type="text"
            value={boxLoginInputsData.cpf}
            onChange={(evt) =>
              setBoxLoginInputsData((prev) => ({
                ...prev,
                cpf: cpfMask(evt.target.value),
              }))
            }
          />
        </div>

        <div className="input-box">
          <div className="label-box">
            <p>SENHA:</p>
          </div>
          <input
            type={inputType}
            value={boxLoginInputsData.senha}
            onChange={(evt) =>
              setBoxLoginInputsData((prev) => ({
                ...prev,
                senha: evt.target.value,
              }))
            }
          />
          <div
            className="btn-show-pass"
            onClick={() =>
              setInputType((prev) => (prev === "text" ? "password" : "text"))
            }
          >
            {inputType === "text" ? (
              <FiEyeOff color="#333333" size={18} />
            ) : (
              <FiEye color="#333333" size={18} />
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleBuscarLogin()}
          disabled={isLoadingLogin}
        >
          Testar login
        </button>

        {isLoadingLogin ? (
          <Loading />
        ) : (
          boxLoginErrorData.title && (
            <MensagemRetornoAPI data={boxLoginErrorData} />
          )
        )}
      </div>
    </div>
  );
}

export default BoxLogin;
