import { useEffect, useState } from "react";

 const useFetch = (url) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState(null);

    const [dataPost, setDataPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const [errorsPost, setErrorPost] = useState(null);
    
    //Vizualizar
    useEffect(() => {
      fetch(`${apiKey}?action=${url}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    //Guardar
    const postMethod = (urlPost) => {

       fetch(`${apiKey}?action=${urlPost}`)
        .then((response) => response.json())
        .then((json) => setDataPost(json))
        .catch((error) => setErrorPost(error))
        .finally(() => setLoadingPost(false));

       return { dataPost, loadingPost, errorsPost }}

    return { data, loading, errors, postMethod };
}
export default useFetch;