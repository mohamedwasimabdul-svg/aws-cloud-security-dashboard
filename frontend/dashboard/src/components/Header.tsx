import {
  Box,
  Typography
} from "@mui/material";

function Header() {

  return (

    <Box
      sx={{
        mb: 5,
        textAlign: "center"
      }}
    >

      <Typography
        variant="h2"
        fontWeight="bold"
      >
        Cloud Security Dashboard
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
      >
        Real-Time AWS Security Monitoring
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        Last Updated:
        {" "}
        {new Date().toLocaleString()}
      </Typography>

    </Box>

  );
}

export default Header;