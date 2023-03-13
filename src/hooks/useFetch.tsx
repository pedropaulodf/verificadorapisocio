import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDadosApiContext } from "../contexts/useDadosApiContext";
import { shallowEqual } from "../utils/utils";

interface OptionsInterface {
  method: string;
  key?: string;
  body: BodyInterface;
  contentType?: string;
  forceJson?: boolean;
}

interface BodyInterface {
  [key: symbol | string]: string | number | null | undefined | boolean | object;
}

interface ErrorInterface {
  status?: string;
  message?: {
    data: string | undefined | null | unknown | any;
    status: number;
  };
}

function useFetch<T>(
  url: string | null | undefined,
  options: OptionsInterface,
  page = 1
) {
  const { method, key } = options;

  const { token } = useDadosApiContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [stateBody, setStateBody] = useState<BodyInterface>({});
  const [call, setCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorInterface | null>(null);
  const [result, setResult] = useState<T | undefined | null>(undefined);
  const [localTime] = useState<number>(new Date().getTime());

  const unMount = () => {
    setResult(null);
    setError(null);
  };

  const _fetch = async (): Promise<any> => {
    try {
      if (call) {
        let _url = null;
        if (url?.includes("http://") || url?.includes("https://")) _url = url;
        else {
          let _base = url;
          if (_base?.endsWith("/")) _base = _base?.slice(0, -1);
          if (!_base) {
            return;
          }
          return;
        }

        setIsLoading(true);
        let payload = {
          url: _url,
          method,
          headers: {
            "Content-Type": options.contentType || "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        } as AxiosRequestConfig;

        if (token)
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        switch (method?.toUpperCase()) {
          case "PUT":
          case "POST":
          case "DELETE":
          case "GET": {
            payload = {
              ...payload,
              params: {
                idEmpresa: options?.body?.idEmpresa,
                sistemaQuality: options.body.sistemaQuality,
                ...stateBody,
              },
            };
            break;
          }
        }
        console.log("################## AXIOS - PAYLOAD ##################");
        // console.log("urlPorta:", urlPorta);
        console.log("payload:", payload);
        console.log("#####################################################");
        const req = await axios(payload);
        setIsLoading(false);
        return req.data;
      }
    } catch (error: any) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(" ================ AXIOS TRY - ERROR ================");
        console.log("error: ", error);
        console.log("error?.response?.data: ", error?.response?.data);
        console.log("error?.response?.status: ", error?.response?.status);
        console.log(" ===================================================");
        // throw error?.response?.data ?? "Erro Geral Axios";
        throw {
          status: error?.response ? error?.response?.status : error?.code,
          data: error?.response
            ? error?.response?.status === 404
              ? error?.response?.data
              : error?.response?.data
              ? error?.response?.data?.message
              : error?.response?.data
            : error?.message,
        };
      } else {
        throw {
          status: error?.code,
          data: error?.message,
        };
      }
    }
  };

  const fetchNext = (page: number, newBody: BodyInterface) => {
    if (page != currentPage) setCurrentPage(page);

    const cache = stateBody.cache !== undefined && stateBody.cache === true;
    let time = new Date().getTime();
    if (cache) time = 0;

    if (
      stateBody == null ||
      (stateBody != null && !shallowEqual(stateBody, newBody ? newBody : {})) ||
      (stateBody != null &&
        shallowEqual(stateBody, newBody ? newBody : {}) &&
        !cache)
    ) {
      setStateBody((prev) => {
        const _prev = prev ? prev : {};
        const obj = {
          ..._prev,
          ...newBody,
          timeCache: time,
        };
        return obj;
      });
    }
    setCall(true);
  };

  let _query = useQuery<T, any>(
    [
      key,
      currentPage,
      stateBody,
      url,
      call,
      localTime,
      // urlPorta,
      // sistemaQuality,
    ],
    () => _fetch(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  useEffect(() => {
    if (_query.error) {
      setError({
        message: {
          data: _query.error.data,
          status: _query.error.status,
        },
      });
    }
  }, [_query.error]);

  useEffect(() => {
    if (_query.data) setResult(_query.data);
  }, [_query.data]);

  return {
    ..._query,
    data: result,
    isLoading,
    fetchNext,
    error,
    unMount,
  };
}

export default useFetch;
