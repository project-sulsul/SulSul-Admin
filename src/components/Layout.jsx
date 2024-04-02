import { Outlet } from "react-router-dom";

import { Container, Stack } from "@mui/material";
import SideMenu from "./SideMenu";

export default function Layout() {
  return (
    <Stack direction="row">
      <SideMenu />

      <Container sx={{ margin: '2rem' }}>
        <Outlet />
      </Container>
    </Stack>
  );
}