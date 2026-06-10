import Typography
from "@mui/material/Typography";

function Header() {

  return (

    <Typography
      variant="h3"
      sx={{
        mb: 4,
        fontWeight: "bold"
      }}
    >
      Cloud Security Dashboard
    </Typography>

  );
}

export default Header;