import { Box, styled } from "@mui/system";

export const CanvasContainer = styled(Box)`
  canvas {
    width: 100% !important;
    height: auto !important;
    max-height: 500px;
    aspect-ratio: 2 / 1;
  }
`;
