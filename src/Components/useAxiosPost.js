import { Axios } from "axios";
import { useEffect, useState } from "react";

const useAxiosPost = (url, payload) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
  
    useEffect((url, payload) => {
      Axios
        .post(url, payload)
        .then((response) => setData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoaded(true));
    }, []);
  
    return { data, error, loaded };
  };

  export default useAxiosPost;