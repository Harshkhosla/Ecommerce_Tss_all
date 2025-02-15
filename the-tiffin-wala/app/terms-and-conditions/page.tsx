import { tssurl } from "../port";

interface TermsConditionResponse {
  content: string;
}

const fetchTermsCondition = async (): Promise<TermsConditionResponse | null> => {
  try {
    const response = await fetch(`${tssurl}/About/termsAndConditions`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
    return null;
  }
};

export default async function TermsCondition() {
  const data = await fetchTermsCondition();
  if (!data) {
    return <div>Error loading terms and conditions.</div>;
  }

  return (
    <div>
      <h2 className="text-center">Terms & Conditions</h2>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
