import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import MetricCard from "../components/MetricCard";
import FindingsTable from "../components/FindingsTable";
import Header from "../components/Header";

import {
  getSummary,
  getFindings
} from "../api/securityApi";

import type {
  Summary,
  Finding
} from "../types/security";

function Dashboard() {

  const [summary, setSummary] =
    useState<Summary | null>(null);

  const [findings, setFindings] =
    useState<Finding[]>([]);

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
        (a: Finding, b: Finding) =>
          severityRank[
            a.severity as keyof typeof severityRank
          ] -
          severityRank[
            b.severity as keyof typeof severityRank
          ]
      );

      setSummary(summaryData);
      setFindings(findingsData);

    } catch (error) {

      console.error(
        "Failed to load dashboard data",
        error
      );
    }
  };

  useEffect(() => {

    loadData();

    const interval = setInterval(
      loadData,
      30000
    );

    return () =>
      clearInterval(interval);

  }, []);

  if (!summary) {

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (

    <Container
      maxWidth="xl"
      sx={{ mt: 4 }}
    >

      <Header />

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 2 }}>
          <MetricCard
            title="Security Score"
            value={summary.compliance_score}
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
            title="Total Findings"
            value={summary.total_findings}
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
        Recent Findings
      </Typography>

      <FindingsTable
        findings={findings}
      />

    </Container>
  );
}

export default Dashboard;