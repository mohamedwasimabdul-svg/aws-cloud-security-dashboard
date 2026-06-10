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
      sx={{ mt: 2 }}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Severity
            </TableCell>

            <TableCell>
              Resource Type
            </TableCell>

            <TableCell>
              Resource ID
            </TableCell>

            <TableCell>
              Title
            </TableCell>

            <TableCell>
              Description
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {findings.map(
            (finding) => (

              <TableRow
                key={finding.finding_id}
              >

                <TableCell>

                  <Chip
                    label={
                      finding.severity
                    }
                    sx={{
                      color: "white",
                      fontWeight:
                        "bold",
                      backgroundColor:
                        getSeverityColor(
                          finding.severity
                        )
                    }}
                  />

                </TableCell>

                <TableCell>
                  {
                    finding.resource_type
                  }
                </TableCell>

                <TableCell>
                  {
                    finding.resource_id
                  }
                </TableCell>

                <TableCell>
                  {
                    finding.title
                  }
                </TableCell>

                <TableCell>
                  {
                    finding.description
                  }
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