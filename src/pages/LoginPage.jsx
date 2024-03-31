import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Paper, TextField, Button,
} from "@mui/material"

import sulApi from "../api/config";


export default function LoginPage() {

  const nav = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();

  const onClickLogin = async () => {
    sulApi.post(`/admin/sign-in`, {
      username: idRef.current.value,
      password: pwRef.current.value,
    })
      .then(data => {
        document.cookie = `access_token=${data.access_token}`;
        nav("/report")
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: 'center' }}>
      <Paper elevation={5} sx={{p: 3, width: "50%"}}>
        <h1>SULSUL Admin</h1>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField required inputRef={idRef} label="ID" variant="outlined" />
          <TextField required type="password" inputRef={pwRef} label="PW" variant="outlined" />
          <Button variant="contained" onClick={onClickLogin}>Login</Button>
        </Box>
      </Paper>
    </Box>
  );
}