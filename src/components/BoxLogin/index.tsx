import { useDadosApiContext } from "../../contexts/useDadosApiContext";
import "./styles.scss";

function BoxLogin() {
  const { urlPorta, idEmpresa, sistemaQuality } = useDadosApiContext();

  const RETORNO_API = {
    status: "ok",
    data: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJyb2xlIjoiYXBwIiwicHJpbWFyeXNpZCI6WyIxMDIwMDAiLCIwIl0sIm5iZiI6MTY3ODExMjY5MiwiZXhwIjoxNzA5NTYyMjkyLCJpYXQiOjE2NzgxMTI2OTJ9.jZRge_jTvpdrfKqBYxEycZYVDDgmwG0HgZxweLM09nQ",
      expires: "2024-03-04T14:24:52.5283874Z",
      usuarios: [
        {
          pessoa: {
            nomeRazaoSocial: "Gilberto De Oliveira Borges",
            cpfCnpj: "27500865821",
            foto: "http://ddnsipetenisclube.ddns.net:8880/temp/00001_00000225.jpg",
            nomeAbreviado: "Gilberto Borges",
            contato: null,
            sexo: null,
            rg: null,
            dataNascimento: "0001-01-01T00:00:00",
          },
          idEmpresa: 0,
          saldoPrePago: 0.0,
          idEmpresaRelacionamento: 102000,
          tipoRelacionamento: "ST",
          tituloSocio: {
            dependente: false,
            idTituloSocio: 102000,
            titulo: {
              idTitulo: 0,
              numero: 225,
            },
            categoriaTitulo: {
              idCategoria: 1,
              descricao: "Proprietario",
            },
          },
          convidado: null,
        },
        {
          pessoa: {
            nomeRazaoSocial: "Milena Ap. Vernaschi Borges",
            cpfCnpj: "27500865821",
            foto: "http://ddnsipetenisclube.ddns.net:8880/masculino.png",
            nomeAbreviado: "Milena Borges",
            contato: null,
            sexo: null,
            rg: null,
            dataNascimento: "0001-01-01T00:00:00",
          },
          idEmpresa: 0,
          saldoPrePago: 0.0,
          idEmpresaRelacionamento: 102001,
          tipoRelacionamento: "SD",
          tituloSocio: {
            dependente: true,
            idTituloSocio: 102001,
            titulo: {
              idTitulo: 0,
              numero: 225,
            },
            categoriaTitulo: {
              idCategoria: 1,
              descricao: "Proprietario",
            },
          },
          convidado: null,
        },
        {
          pessoa: {
            nomeRazaoSocial: "Vanda Maria S. Vernaschi",
            cpfCnpj: "27500865821",
            foto: "http://ddnsipetenisclube.ddns.net:8880/masculino.png",
            nomeAbreviado: "Vanda Vernaschi",
            contato: null,
            sexo: null,
            rg: null,
            dataNascimento: "0001-01-01T00:00:00",
          },
          idEmpresa: 0,
          saldoPrePago: 0.0,
          idEmpresaRelacionamento: 102002,
          tipoRelacionamento: "SD",
          tituloSocio: {
            dependente: true,
            idTituloSocio: 102002,
            titulo: {
              idTitulo: 0,
              numero: 225,
            },
            categoriaTitulo: {
              idCategoria: 1,
              descricao: "Proprietario",
            },
          },
          convidado: null,
        },
      ],
    },
  };

  return (
    <div className="box-login-container">
      <div className="box-login-header">
        <p>
          <span>{urlPorta}</span>
          {`/appApi/login`}
        </p>
      </div>
      <div className="box-login-content">
        <button type="button">Testar login</button>
      </div>
    </div>
  );
}

export default BoxLogin;
