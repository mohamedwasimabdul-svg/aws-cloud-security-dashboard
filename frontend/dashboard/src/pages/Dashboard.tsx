import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import MetricCard from "../components/MetricCard";
import FindingsTable from "../components/FindingsTable";
import Header from "../components/Header";
import SecurityScoreGauge from "../components/SecurityScoreGauge";

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

  const [resourceStats, setResourceStats] =
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
      ).map(([resource, count]) => ({
        resource,
        count
      }));

      setSummary(summaryData);
      setFindings(findingsData);
      setResourceStats(resourceData);

    } catch (error) {

      console.error(error);

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

      <Typography
        variant="body2"
        sx={{ mb: 3 }}
      >
        Last Updated:
        {" "}
        {new Date().toLocaleString()}
      </Typography>

      {/* Top Dashboard Row */}

      <Grid
        container
        spacing={3}
      >

        <Grid
          item
          xs={12}
          md={4}
        >

          <Paper
            sx={{
              p: 3,
              height: "100%"
            }}
          >

            <SecurityScoreGauge
              score={
                summary.compliance_score
              }
            />

          </Paper>

        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >

          <Paper
            sx={{
              p: 2
            }}
          >

            <Typography
              variant="h6"
              gutterBottom
            >
              Severity Distribution
            </Typography>

            <SeverityChart
              critical={
                summary.critical
              }
              high={
                summary.high
              }
              medium={
                summary.medium
              }
              low={
                summary.low
              }
            />

          </Paper>

        </Grid>

      </Grid>

      {/* Summary Cards */}

      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
      >

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Critical"
            value={summary.critical}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="High"
            value={summary.high}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Medium"
            value={summary.medium}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Low"
            value={summary.low}
          />
        </Grid>

      </Grid>

      {/* Resource Analytics */}

      <Paper
        sx={{
          mt: 4,
          p: 2
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Findings by Resource Type
        </Typography>

        <ResourceChart
          data={resourceStats}
        />

      </Paper>

      {/* Findings Table */}

      <Paper
        sx={{
          mt: 4,
          p: 2
        }}
      >

        <Typography
          variant="h6"
          gutterBottom
        >
          Recent Findings
        </Typography>

        <FindingsTable
          findings={findings}
        />

      </Paper>

    </Container>

  );
}

export default Dashboard;