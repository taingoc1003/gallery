

import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            try {
                let res = await axios.get(url)
                let data = (res && res.data) ? res.data : []; // true, false
                setData(data);
                setIsLoading(false);

            }
            catch (err) {
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, [url]);

    return {
        data, isLoading
    }

}

export default useFetch;