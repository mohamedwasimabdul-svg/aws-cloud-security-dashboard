import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import type { Finding } from "../types/security";

interface Props {
  findings: Finding[];
}

function FindingsTable({ findings }: Props) {

  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>Severity</TableCell>
          <TableCell>Resource</TableCell>
          <TableCell>Title</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        {findings.map((finding) => (

          <TableRow key={finding.finding_id}>

            <TableCell>
              {finding.severity}
            </TableCell>

            <TableCell>
              {finding.resource_type}
            </TableCell>

            <TableCell>
              {finding.title}
            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}

export default FindingsTable;