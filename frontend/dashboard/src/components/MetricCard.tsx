import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

interface Props {
  title: string;
  value: string | number;
}

function MetricCard({
  title,
  value
}: Props) {

  return (

    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        textAlign: "center"
      }}
    >

      <CardContent>

        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold"
          }}
        >
          {value}
        </Typography>

      </CardContent>

    </Card>

  );
}

export default MetricCard;