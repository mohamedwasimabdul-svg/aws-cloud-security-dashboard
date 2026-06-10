import {
  Paper,
  Typography,
  Box
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
      elevation={4}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 8
        }
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: 3
        }}
      >
        {title}
      </Typography>

      <Box>
        {children}
      </Box>

    </Paper>

  );
}

export default DashboardSection;