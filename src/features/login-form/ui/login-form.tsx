import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "shared/contexts/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(alert);
  };

  return (
    <Box
      component="form"
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3" component="h3" textAlign="center">
        Login page
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        style={{ marginTop: 30 }}
        type="email"
        required
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        style={{ marginTop: 10 }}
        type="password"
        required
      />
      <Button
        style={{ marginTop: 10 }}
        disabled={!email || !password}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};
