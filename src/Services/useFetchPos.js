import { useEffect, useState } from "react";

 const useFetchPost = (url) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    
    const [post_data, setData] = useState(null);
    const [post_loading, setLoading] = useState(true);
    const [post_errors, setError] = useState(null);
    
    //Metodo POST
    useEffect(() => {
      fetch(`${apiKey}?action=${url}`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { post_data, post_loading, post_errors};
}
export default useFetchPost;