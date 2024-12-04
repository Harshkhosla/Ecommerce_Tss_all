import { useEffect, useState } from "react";
import tssurl from "../port";

const PrivacyPolicy = () => {
  const [data, setData] = useState("");
  const parseHtmlToText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${tssurl}/About/privacyPolicy`
        );
        const result = await response.json();
        setData(result);
      };
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return (
    <div>
      <h2 className="text-center">{parseHtmlToText(data.content)}</h2>
    </div>
  )
}

export default PrivacyPolicy