import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook: reusable API fetching with loading and error states.
export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    axios.get(url)
      .then((response) => {
        if (active) setData(response.data.recipes || response.data);
      })
      .catch(() => {
        if (active) setError("Could not load online menu. Please check your internet connection.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [url]);

  return { data, loading, error };
}