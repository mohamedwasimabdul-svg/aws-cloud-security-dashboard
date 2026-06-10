import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import MetricCard from "../components/MetricCard";
import FindingsTable from "../components/FindingsTable";

import {
  getSummary,
  getFindings
} from "../api/securityApi";

function Dashboard() {

  const [summary, setSummary] = useState<any>(null);
  const [findings, setFindings] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      const summaryData =
        await getSummary();

      const findingsData =
        await getFindings();

      setSummary(summaryData);
      setFindings(findingsData);
    };

    loadData();

  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (

    <Container>

      <Typography
        variant="h3"
        gutterBottom
      >
        Cloud Security Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid size={3}>
          <MetricCard
            title="Security Score"
            value={summary.compliance_score}
          />
        </Grid>

        <Grid size={3}>
          <MetricCard
            title="Critical"
            value={summary.critical}
          />
        </Grid>

        <Grid size={3}>
          <MetricCard
            title="High"
            value={summary.high}
          />
        </Grid>

        <Grid size={3}>
          <MetricCard
            title="Total Findings"
            value={summary.total_findings}
          />
        </Grid>

      </Grid>

      <Typography
        variant="h5"
        sx={{ mt: 4 }}
      >
        Recent Findings
      </Typography>

      <FindingsTable
        findings={findings}
      />

    </Container>
  );
}

export default Dashboard;