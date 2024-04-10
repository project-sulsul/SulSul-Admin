import { Outlet } from "react-router-dom";

import { Container, Stack } from "@mui/material";
import SideMenu from "./SideMenu";
import Loading from "./Loading";

export default function Layout({ isLoading }) {

  return (
    <Stack direction="row">
      <SideMenu />

      <Container sx={{ margin: '2rem' }}>
        <Outlet />
      </Container>

      <Loading isLoading={isLoading} />
    </Stack>
  );
}