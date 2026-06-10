import { useEffect, useState } from "react";
import { getSummary } from "../api/securityApi";

function Dashboard() {

  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {

    const loadData = async () => {

      try {
        const data = await getSummary();
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();

  }, []);

  return (
    <div>

      <h1>Cloud Security Dashboard</h1>

      {!summary ? (
        <p>Loading...</p>
      ) : (
        <div>

          <h2>
            Security Score:
            {" "}
            {summary.compliance_score}
          </h2>

          <p>
            Total Findings:
            {" "}
            {summary.total_findings}
          </p>

          <p>
            Critical:
            {" "}
            {summary.critical}
          </p>

          <p>
            High:
            {" "}
            {summary.high}
          </p>

        </div>
      )}

    </div>
  );
}

export default Dashboard;