import { FiCopy } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";

import "./styles.scss";

function Header() {
  return (
    <div className="header-container">
      <div className="sub-container">
        <div className="logo">
          <p>VERIFICAR API • APP DO SÓCIO</p>
        </div>
        <div className="icons-container">
          <a
            href="https://drive.google.com/drive/folders/1BCGZgXB10ecvARXUlo7m0L9L5PDk_qrg?usp=sharing"
            target="_blank"
          >
            <button type="button" className="button-drive">
              <FaGoogleDrive color="#0b6cbb" size={20} />
            </button>
          </a>
          <button type="button" className="button-copy">
            <FiCopy color="#bb751a" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
