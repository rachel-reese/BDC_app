import React from "react";
import DeviceSearchBar from "components/DeviceSearchBar/DeviceSearchBar";
import { Grid } from "@mui/material";

const CheckStatus = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item height="300px">
        <DeviceSearchBar />
      </Grid>
    </Grid>
  );
};

export default CheckStatus;
