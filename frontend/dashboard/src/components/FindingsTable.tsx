import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Chip
} from "@mui/material";

import type { Finding } from "../types/security";

interface Props {
  findings: Finding[];
}

const getSeverityColor = (
  severity: string
) => {

  switch (severity) {

    case "CRITICAL":
      return "#d32f2f";

    case "HIGH":
      return "#f57c00";

    case "MEDIUM":
      return "#fbc02d";

    case "LOW":
      return "#388e3c";

    default:
      return "#757575";
  }
};

function FindingsTable({
  findings
}: Props) {

  return (

    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 500,
        borderRadius: 2
      }}
    >

      <Table stickyHeader>

        <TableHead>

          <TableRow>

            <TableCell sx={{ fontWeight: "bold" }}>
              Severity
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Resource Type
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Resource ID
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Title
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }}>
              Description
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {findings.map(
            (finding) => (

              <TableRow
                hover
                key={finding.finding_id}
              >

                <TableCell>

                  <Chip
                    label={finding.severity}
                    size="small"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor:
                        getSeverityColor(
                          finding.severity
                        )
                    }}
                  />

                </TableCell>

                <TableCell>
                  {finding.resource_type}
                </TableCell>

                <TableCell>
                  {finding.resource_id}
                </TableCell>

                <TableCell>
                  {finding.title}
                </TableCell>

                <TableCell
                  sx={{
                    maxWidth: 400
                  }}
                >
                  {finding.description}
                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </TableContainer>

  );
}

export default FindingsTable;