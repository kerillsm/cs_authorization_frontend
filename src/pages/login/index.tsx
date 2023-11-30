import { Grid } from "@mui/material";
import { LoginForm } from "features/login-form";

export const LoginPage = () => (
  <Grid container spacing={2} marginTop={10}>
    <Grid item xs={4} />
    <Grid item xs={4}>
      <LoginForm />
    </Grid>
  </Grid>
);
