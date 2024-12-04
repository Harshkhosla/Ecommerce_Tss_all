import { useEffect, useState } from "react";
import tssurl from "../port";

const TermsAndCondition = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseHtmlToText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${tssurl}/About/termsAndConditions`);
        const result = await response.json();
        setData(result);

      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-center">{parseHtmlToText(data.content)}</h2>
    </div>
  );
};

export default TermsAndCondition;