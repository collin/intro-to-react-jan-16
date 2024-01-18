import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    /**
     * AbortController is a built-in browser API that allows you to cancel
     * fetch requests. It is used here to prevent a memory leak if the component
     * is unmounted before the request is complete.
     */
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError({ message: "Failed to fetch data at url: " + url });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    /**
     * The return value of useEffect is a cleanup function that is called
     * when the component is unmounted/the dependency array changes.
     *
     * This cleanup function cancels the fetch request if the component
     * is unmounted before the request is complete.
     */
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
