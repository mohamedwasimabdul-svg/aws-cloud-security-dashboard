import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import MetricCard from "../components/MetricCard";
import FindingsTable from "../components/FindingsTable";
import Header from "../components/Header";

import SeverityChart from "../components/charts/SeverityChart";
import ResourceChart from "../components/charts/ResourceChart";

import {
  getSummary,
  getFindings
} from "../api/securityApi";

function Dashboard() {

  const [summary, setSummary] = useState<any>(null);

  const [findings, setFindings] =
    useState<any[]>([]);

  const [resourceStats,
    setResourceStats] =
    useState<any[]>([]);

  const loadData = async () => {

    try {

      const summaryData =
        await getSummary();

      const findingsData =
        await getFindings();

      const severityRank = {
        CRITICAL: 1,
        HIGH: 2,
        MEDIUM: 3,
        LOW: 4
      };

      findingsData.sort(
        (a: any, b: any) =>
          severityRank[
            a.severity as keyof typeof severityRank
          ] -
          severityRank[
            b.severity as keyof typeof severityRank
          ]
      );

      const resourceData = Object.entries(
        findingsData.reduce(
          (acc: any, finding: any) => {

            const resource =
              finding.resource_type;

            acc[resource] =
              (acc[resource] || 0) + 1;

            return acc;

          },
          {}
        )
      ).map(
        ([resource, count]) => ({
          resource,
          count
        })
      );

      setSummary(summaryData);
      setFindings(findingsData);
      setResourceStats(resourceData);

    } catch (error) {

      console.error(
        "Failed loading dashboard:",
        error
      );

    }
  };

  useEffect(() => {

    loadData();

    const interval =
      setInterval(
        loadData,
        30000
      );

    return () =>
      clearInterval(interval);

  }, []);

  if (!summary) {

    return (
      <Container>
        <Typography>
          Loading...
        </Typography>
      </Container>
    );

  }

  return (

    <Container
      maxWidth="xl"
      sx={{ mt: 4, mb: 6 }}
    >

      <Header />

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Security Score"
            value={
              summary.compliance_score
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Critical"
            value={summary.critical}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="High"
            value={summary.high}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Medium"
            value={summary.medium}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Low"
            value={summary.low}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Findings"
            value={
              summary.total_findings
            }
          />
        </Grid>

      </Grid>

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: "bold"
        }}
      >
        Severity Distribution
      </Typography>

      <SeverityChart
        critical={summary.critical}
        high={summary.high}
        medium={summary.medium}
        low={summary.low}
      />

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: "bold"
        }}
      >
        Findings by Resource Type
      </Typography>

      <ResourceChart
        data={resourceStats}
      />

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: "bold"
        }}
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