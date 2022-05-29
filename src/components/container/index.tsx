import type { SxProps } from "@mui/system";

import React, { PropsWithChildren } from "react";
import Paper from "@mui/material/Paper";

export default function index(
  props: PropsWithChildren<{ customStyle?: SxProps }>,
) {
  return (
    <Paper square sx={{ ...props.customStyle, boxShadow: "none" }}>
      {props.children}
    </Paper>
  );
}
