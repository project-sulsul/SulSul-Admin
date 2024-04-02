import { MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SideMenu() {
  return (
    <Paper
      sx={{
        height: '100vh',
        width: '12rem',
        padding: '1rem',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '10px'
        }}
      >
        {/* TODO: 로고 삽입 */}
        술술 Admin
      </Typography>
      <MenuList>
        <Menu path={'report'}>신고</Menu>
        <Menu path={'user'}>유저</Menu>
        <Menu path={'feed'}>피드</Menu>
      </MenuList>
    </Paper>
  );
}

function Menu({ children, path }) {
  return (
    <MenuItem sx={{ padding: 0 }}>
      <Link
        to={`/${path}`}
        style={{
          padding: '0.5em',
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        {children}
      </Link>
    </MenuItem>
  );
}