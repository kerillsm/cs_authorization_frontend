import { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { AuthContext } from "shared/contexts/AuthContext";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, name, password, repeatPassword)
      .then(() => {
        navigate("/login");
      })
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
        Register page
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        style={{ marginTop: 10 }}
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
      <TextField
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        label="Repeat password"
        style={{ marginTop: 10 }}
        type="password"
        required
      />
      <Button
        style={{ marginTop: 10 }}
        disabled={!email || !name || !password || !repeatPassword}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};
