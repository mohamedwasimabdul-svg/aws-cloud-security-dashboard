import {
  Paper,
  Typography
} from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

function DashboardSection({
  title,
  children
}: Props) {

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>

      {children}
    </Paper>
  );
}

export default DashboardSection;