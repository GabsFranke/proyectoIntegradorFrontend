import { useState, useEffect, useContext } from "react";
import LittleContext from "../context/LittleContext";

export const useFetch = (url) => {
  const [apiData, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {fetchController} = useContext(LittleContext);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Basic " + btoa("admin@mail.com:admin"),
      },
    };

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, options, { signal });

        if (!res.ok) {
          let err = new Error("Error en la petición Fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Ocurrió un error";
          throw err;
        }

        const json = await res.json();

        if (!signal.aborted) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        setError(error);
        if (signal.aborted) {
          setData(null);
          setError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url, fetchController]);

  return { apiData, error, loading };
};
