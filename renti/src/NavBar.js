import * as React from "react";
import colors from "./Colors";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

export default function NavBar() {
  return (
    <AppBar position="relative" style={{backgroundColor: colors.primary}}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Renti Marketplace
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
