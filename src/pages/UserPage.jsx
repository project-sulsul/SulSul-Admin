import { useEffect, useState } from "react";

import { getAllUserList, updateUserStatus } from "../api/user";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Modal,
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
import { USER_STATUS } from "../constants";
import CheckModal from "../components/CheckModal";

export default function UserPage() {
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mode, setMode] = useState(null);

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

  const openModal = (status) => {
    setMode(status);
  };

  const closeModal = () => {
    setMode(null);
  };

  const onChangeUserStatus = (e) => {
    const status = mode === USER_STATUS.ACTIVE ? 'active' : 'banned';

    const params = {
      user_ids: selected,
      status: status,
    };

    updateUserStatus(params)
      .then(() => {
        getUserList();
      })
      .catch(e => {
        console.error(e);
      });
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
          <Button color="error" value="banned" onClick={() => openModal(USER_STATUS.INACTIVE)}>영구 정지</Button>
          <Button value="active" onClick={() => openModal(USER_STATUS.ACTIVE)}>정지 해제</Button>
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

      <CheckModal
        open={mode === USER_STATUS.ACTIVE || mode === USER_STATUS.INACTIVE}
        status={mode}
        title={mode}
        content={`선택한 사용자의 권한을 ${mode}하시겠습니까?`}
        onClick={onChangeUserStatus}
        onClose={closeModal}
      />

    </Container>
  );
}

