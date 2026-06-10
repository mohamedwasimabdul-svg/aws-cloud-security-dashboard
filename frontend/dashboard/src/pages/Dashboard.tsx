import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box
} from "@mui/material";

import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import FindingsTable from "../components/FindingsTable";
import DashboardSection from "../components/DashboardSection";
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

  const [resourceStats,
    setResourceStats] =
    useState<any[]>([]);

  const [severityFilter,
    setSeverityFilter] =
    useState("ALL");

  const [searchText,
    setSearchText] =
    useState("");

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

      const resourceData =
        Object.entries(

          findingsData.reduce(
            (
              acc: any,
              finding: any
            ) => {

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
        Loading...
      </Container>
    );
  }

  const filteredFindings =
    findings.filter(
      (finding: any) => {

        const severityMatch =
          severityFilter === "ALL"
            ? true
            : finding.severity ===
              severityFilter;

        const searchMatch =

          finding.title
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )

          ||

          finding.resource_id
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            )

          ||

          finding.resource_type
            .toLowerCase()
            .includes(
              searchText.toLowerCase()
            );

        return (
          severityMatch &&
          searchMatch
        );
      }
    );

  return (

    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 6
      }}
    >

      <Header />

      {/* TOP ROW */}

      <Grid
        container
        spacing={3}
      >

        <Grid
          item
          xs={12}
          md={4}
        >

          <DashboardSection
            title="Security Score"
          >

            <SecurityScoreGauge
              score={
                summary.compliance_score
              }
            />

          </DashboardSection>

        </Grid>

        <Grid
          item
          xs={12}
          md={8}
        >

          <DashboardSection
            title="Severity Distribution"
          >

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

          </DashboardSection>

        </Grid>

      </Grid>

      {/* METRIC CARDS */}

      <Grid
        container
        spacing={3}
        sx={{
          mt: 2,
          mb: 4
        }}
      >

        <Grid item xs={12} md={2}>
          <MetricCard
            title="Critical"
            value={summary.critical}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <MetricCard
            title="High"
            value={summary.high}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <MetricCard
            title="Medium"
            value={summary.medium}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <MetricCard
            title="Low"
            value={summary.low}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard
            title="Total Findings"
            value={
              summary.total_findings
            }
          />
        </Grid>

      </Grid>

      {/* RESOURCE CHART */}

      <Box sx={{ mt: 5 }}>

        <DashboardSection
          title="Findings by Resource Type"
        >

          <ResourceChart
            data={resourceStats}
          />

        </DashboardSection>

      </Box>

      {/* FINDINGS TABLE */}

      <Box sx={{ mt: 4 }}>

        <DashboardSection
          title="Recent Findings"
        >

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3
            }}
          >

            <TextField
              fullWidth
              label="Search Findings"
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
            />

            <FormControl
              sx={{
                minWidth: 220
              }}
            >

              <InputLabel>
                Severity Filter
              </InputLabel>

              <Select
                value={severityFilter}
                label="Severity Filter"
                onChange={(e) =>
                  setSeverityFilter(
                    e.target.value
                  )
                }
              >

                <MenuItem value="ALL">
                  All
                </MenuItem>

                <MenuItem value="CRITICAL">
                  Critical
                </MenuItem>

                <MenuItem value="HIGH">
                  High
                </MenuItem>

                <MenuItem value="MEDIUM">
                  Medium
                </MenuItem>

                <MenuItem value="LOW">
                  Low
                </MenuItem>

              </Select>

            </FormControl>

          </Box>

          <FindingsTable
            findings={
              filteredFindings
            }
          />

        </DashboardSection>

      </Box>

    </Container>

  );
}

export default Dashboard;