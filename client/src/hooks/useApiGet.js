import { useState, useEffect } from "react";
import api, { authHeader } from "../apis/backend";

const useApiGet = (apiUrl, auth) => {
  const [serverError, setServerError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    const urlPrefix = auth ? "/api" : "/public";

    api
      .get(`${urlPrefix}${apiUrl}`, authHeader())
      .then(res => {
        setState(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setServerError(true);
        setIsLoading(false);
      });
  }, [apiUrl, auth]);

  return [state, isLoading, serverError];
};

export default useApiGet;
