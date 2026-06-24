import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import Header from "../components/Header";
import DashboardSection from "../components/DashboardSection";

import {
  getLifecycle
} from "../api/securityApi";

function Lifecycle() {

  const [lifecycle,
    setLifecycle] =
    useState<any[]>([]);

  useEffect(() => {

    const loadData =
      async () => {

        const data =
          await getLifecycle();

        setLifecycle(data);

      };

    loadData();

  }, []);

  const activeCount =
    lifecycle.filter(
      finding =>
        finding.status === "ACTIVE"
    ).length;

  const resolvedCount =
    lifecycle.filter(
      finding =>
        finding.status === "RESOLVED"
    ).length;

  return (

    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 8
      }}
    >

      <Header />

      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: 600
        }}
      >
        Finding Lifecycle
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Tracks the lifecycle of security
        findings across historical scans.
      </Typography>

      {/* Summary Cards */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <Card>

            <CardContent>

              <Typography
                color="text.secondary"
              >
                Active Findings
              </Typography>

              <Typography
                variant="h3"
                color="error.main"
              >
                {activeCount}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Card>

            <CardContent>

              <Typography
                color="text.secondary"
              >
                Resolved Findings
              </Typography>

              <Typography
                variant="h3"
                color="success.main"
              >
                {resolvedCount}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      <DashboardSection
        title="Lifecycle Findings"
      >

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3
          }}
        >

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <strong>Title</strong>
                </TableCell>

                <TableCell>
                  <strong>Severity</strong>
                </TableCell>

                <TableCell>
                  <strong>Resource Type</strong>
                </TableCell>

                <TableCell>
                  <strong>Resource ID</strong>
                </TableCell>

                <TableCell>
                  <strong>First Seen</strong>
                </TableCell>

                <TableCell>
                  <strong>Last Seen</strong>
                </TableCell>

                <TableCell>
                  <strong>Status</strong>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {lifecycle.map(
                (finding, index) => (

                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor:
                          "rgba(255,255,255,0.03)"
                      }
                    }}
                  >

                    <TableCell
                      sx={{
                        minWidth: 220
                      }}
                    >
                      {finding.title}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          finding.severity
                        }
                        color={
                          finding.severity ===
                          "CRITICAL"
                            ? "error"
                            : finding.severity ===
                              "HIGH"
                            ? "warning"
                            : "info"
                        }
                        size="small"
                      />

                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap"
                      }}
                    >
                      {finding.resource_type}
                    </TableCell>

                    <TableCell
                      sx={{
                        maxWidth: 280,
                        overflow: "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {finding.resource_id.length > 35
                        ? finding.resource_id.substring(
                            0,
                            35
                          ) + "..."
                        : finding.resource_id}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap"
                      }}
                    >

                      {new Date(
                        finding.first_seen
                      ).toLocaleString()}

                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap"
                      }}
                    >

                      {new Date(
                        finding.last_seen
                      ).toLocaleString()}

                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          finding.status
                        }
                        color={
                          finding.status ===
                          "ACTIVE"
                            ? "error"
                            : "success"
                        }
                      />

                    </TableCell>

                  </TableRow>

                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </DashboardSection>

    </Container>

  );
}

export default Lifecycle;