import { Grid } from "@mui/material";
import { RegisterForm } from "features/register-form";

export const RegisterPage = () => (
  <Grid container spacing={2} marginTop={10}>
    <Grid item xs={4} />
    <Grid item xs={4}>
      <RegisterForm />
    </Grid>
  </Grid>
);
