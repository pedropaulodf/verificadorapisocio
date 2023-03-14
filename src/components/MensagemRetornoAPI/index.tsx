import { BoxErrorDataType } from "../../types/BoxClubeInfoType";
import "./styles.scss";

type MensagemRetornoAPIPropsType = {
  data: BoxErrorDataType;
};

const MensagemRetornoAPI = ({ data }: MensagemRetornoAPIPropsType) => {
  return (
    <div
      className={
        data.type === "success"
          ? "success-message"
          : data.type === "error"
          ? "error-message"
          : data.type === "warning"
          ? "warning-message"
          : "lightwarning-message"
      }
    >
      <div className="box-title">
        <p>
          {data.title}
          {data.status ? ` • ${data.status}` : ""}
        </p>
      </div>
      {data.message && (
        <div className="box-content">
          {/* <span>Motivo: </span> */}
          {data.message?.includes("html") ? (
            <div
              dangerouslySetInnerHTML={{ __html: data.message ?? "" }}
              className="dangerouslySetInnerHTML"
              style={{
                backgroundColor:
                  data.status === "404" ? "#ffffff" : "#00000000",
              }}
            />
          ) : (
            <p>{data.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MensagemRetornoAPI;
