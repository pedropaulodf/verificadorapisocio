import { ToastContainer } from "react-toastify";
import BoxClubeInfo from "../../components/BoxClubeInfo";
import BoxLogin from "../../components/BoxLogin";
import Configuracoes from "../../components/Configuracoes";
import Header from "../../components/Header";
import "./styles.scss";

const Home = () => {
  return (
    <div>
      <Header />
      <Configuracoes />
      <div className="home-page-container">
        <div className="home-page-sub-container">
          <BoxClubeInfo />
          <div className="divider">&nbsp;</div>
          <BoxLogin />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
