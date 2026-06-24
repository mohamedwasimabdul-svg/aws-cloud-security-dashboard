import {
  Box,
  Typography,
  Button
} from "@mui/material";

import {
  Link,
  useLocation
} from "react-router-dom";

function Header() {

  const location =
    useLocation();

  return (

    <Box
      sx={{
        mb: 5
      }}
    >

      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Cloud Security Dashboard
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textAlign: "center"
        }}
      >
        Real-Time AWS Security Monitoring
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: "center",
          mb: 3
        }}
      >
        Last Updated{" "}
        {new Date().toLocaleString()}
      </Typography>

      <Box
  sx={{
    display: "flex",
    gap: 2,
    justifyContent: "center",
    flexWrap: "wrap"
  }}
>

  <Button
  component={Link}
  to="/"
  variant={
    location.pathname === "/"
      ? "contained"
      : "outlined"
  }
>
  Dashboard
</Button>

<Button
  component={Link}
  to="/history"
  variant={
    location.pathname === "/history"
      ? "contained"
      : "outlined"
  }
>
  Historical Findings
</Button>

<Button
  component={Link}
  to="/lifecycle"
  variant={
    location.pathname ===
    "/lifecycle"
      ? "contained"
      : "outlined"
  }
>
  Lifecycle Findings
</Button>

</Box>

    </Box>

  );
}

export default Header;