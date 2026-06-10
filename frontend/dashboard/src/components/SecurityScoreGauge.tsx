import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material";

interface Props {
  score: number;
}

function SecurityScoreGauge({
  score
}: Props) {

  const getColor = () => {

    if (score >= 80)
      return "success";

    if (score >= 60)
      return "warning";

    return "error";
  };

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      <Box
        sx={{
          position: "relative",
          display: "inline-flex"
        }}
      >

        <CircularProgress
          variant="determinate"
          value={score}
          size={140}
          color={getColor()}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >

          <Typography
            variant="h4"
          >
            {score}
          </Typography>

        </Box>

      </Box>

      <Typography
        variant="h6"
        sx={{
          mt: 2
        }}
      >
        Security Score
      </Typography>

    </Box>

  );
}

export default SecurityScoreGauge;