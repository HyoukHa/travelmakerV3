import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CommonCard from "./CommonCard";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(1);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  //============================================
  return (
    <div css={cssWrapper}>
      <Box
        sx={{
          maxWidth: 900,
          flexGrow: 1,
          alignContent: "center",
          m: "auto",
          justifyContent: "center",
          bgcolor: ` #cfe8fc`,
        }}
      >
        {maxSteps !== 0 ? (
          <>
            <Card sx={{ maxWidth: 900, m: 2 }} style={{ display: `flex` }}>
              {images.map((step, index) =>
                activeStep + 1 === 1 && index <= 2 ? (
                  // activeStep == 0 && index <= 2
                  <CommonCard key={index} step={step} />
                ) : activeStep === maxSteps - 1 && index >= maxSteps - 3 ? (
                  <CommonCard key={index} step={step} />
                ) : Math.abs(activeStep - index) <= 1 ? (
                  <CommonCard key={index} step={step} />
                ) : null
              )}
            </Card>

            <MobileStepper
              steps={maxSteps - 2}
              position="static"
              activeStep={activeStep - 1}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 2}
                >
                  다음
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 1}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  이전
                </Button>
              }
            />
          </>
        ) : null}
      </Box>
    </div>
  );
};

const cssWrapper = css`
  display: block;
`;

export default Carousel;
