import { BoxClubeInfoErrorDataType } from "../../types/BoxClubeInfoType";
import "./styles.scss";

type MensagemRetornoAPIPropsType = {
  data: BoxClubeInfoErrorDataType;
};

const MensagemRetornoAPI = ({ data }: MensagemRetornoAPIPropsType) => {
  return (
    <div
      className={
        data.type === "success"
          ? "success-message"
          : data.type === "error"
          ? "error-message"
          : "warning-message"
      }
    >
      <div className="box-title">
        <p>
          {data.title}
          {data.status ? ` • ${data.status}` : ""}
        </p>
      </div>
      {data.type !== "success" && (
        <div className="box-content">
          <p>
            <span>Motivo: </span>
            {data.message?.includes("html") ? (
              <div
                dangerouslySetInnerHTML={{ __html: data.message ?? "" }}
                className="dangerouslySetInnerHTML"
              />
            ) : (
              data.message
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default MensagemRetornoAPI;
