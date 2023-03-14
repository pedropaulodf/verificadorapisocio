import { FaExternalLinkAlt } from "react-icons/fa";
import "./styles.scss";

type CardImagemAppPropsType = {
  urlImage: string;
  nameImage: string;
};

const CardImagemApp = ({ nameImage, urlImage }: CardImagemAppPropsType) => {
  return (
    <div className="card-image">
      <div className="card-title-box">
        <p>{nameImage}</p>
      </div>
      <div className="card-title-content">
        <a href={urlImage} target="_blank" title="Abrir em outra aba">
          <FaExternalLinkAlt color="#e9e9e9" size={12} />
        </a>
        <img src={urlImage} alt={nameImage} title={nameImage} />
        {/* <iframe src={urlImage} width="100" height="100"></iframe> */}
      </div>
    </div>
  );
};

export default CardImagemApp;
