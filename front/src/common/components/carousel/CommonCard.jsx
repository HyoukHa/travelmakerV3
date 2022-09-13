import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const CommonCard = ({ step }) => {
  return (
    <CardActionArea key={step.label} sx={{ m: 2, maxWidth: 260 }}>
      <CardMedia
        component="img"
        height="140"
        src={step.imgs}
        alt={step.label}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {step.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {step.label}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};

export default CommonCard;
