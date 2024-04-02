import { useContext, useEffect, useState } from "react";

import { getAllUserList, updateUserStatus } from "../api/user";

import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { commonStore } from "../stores";

export default function UserPage() {
  const [_, setState] = useContext(commonStore);

  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getUserList();

    // setUserList([
    //   {
    //     id: 1,
    //     uid: 1,
    //     nickname: 'user',
    //     image: 'url',
    //     status: 'active',
    //     device_type: 'ios',
    //     created_at: '2024-03-30 15:09:26',
    //     updated_at: '2024-03-30 17:09:26',
    //   }
    // ]);
  }, []);

  function getUserList() {
    getAllUserList()
      .then(res => {
        console.log('getUserList', res);
        // setUserList(res);

      })
      .catch(e => {
        console.error(e);
      });
  }

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const onSelectUser = (e) => {
    setSelected(prev => [...prev, Number(e.target.value)]);
  };

  const onChangeUserStatus = (e) => {
    setState(prev => ({ ...prev, isModalOpen: true }));
    // const { value } = e.target;

    // const params = {
    //   user_ids: selected,
    //   status: value,
    // };

    // updateUserStatus(params)
    //   .then(() => {
    //     getUserList();
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
  };

  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: 'center',
          margin: '1rem',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>유저 정보</Typography>

        <ButtonGroup variant="contained">
          <Button color="error" value="banned" onClick={onChangeUserStatus}>영구 정지</Button>
          <Button value="active" onClick={onChangeUserStatus}>정지 해제</Button>
        </ButtonGroup>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>선택</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>id</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>uid</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>nickname</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>image</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>device type</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>created_at</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>updated_at</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <Checkbox value={user.uid} onClick={onSelectUser} />
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.uid}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.image}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.device_type}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>{user.updated_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 30, 50]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
