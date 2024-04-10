import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Stack, Paper, TextField, Button,
} from "@mui/material"

import sulApi from "../api/config";


export default function LoginPage() {

  const nav = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    sulApi.post(`/admin/sign-in`, {
      username: idRef.current.value,
      password: pwRef.current.value,
    })
      .then(data => {
        localStorage.setItem("auth", `${data.data.token_type} ${data.data.access_token}`);
        nav("/report")
      })
      .catch(err => {
        console.error(err)
      })
  }
  
  return (
    <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: 'center' }}>
      <Paper elevation={5} sx={{p: 3, width: "50%", maxWidth: "400px"}}>
        <h1 style={{margin: 0, marginBottom: "2rem"}}>SULSUL Admin</h1>

        <form onSubmit={onSubmitLogin}>
          <Stack gap={1}>
            <TextField required inputRef={idRef} label="ID" variant="outlined" />
            <TextField required type="password" inputRef={pwRef} label="PW" variant="outlined" />
            <Button variant="contained" type="submit">Login</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}