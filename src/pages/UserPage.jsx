import { useEffect, useState } from "react";

import { getAllUserList, modifyNicknameById, updateUserStatus } from "../api/user";

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
import { USER_STATUS } from "../constants";
import CheckModal from "../components/modal/CheckModal";
import { dateTimeFormat } from "../utils/dateTimeFormat";
import ChangeNicknameModal from "../components/modal/ChangeNicknameModal";

export default function UserPage({ setIsLoading }) {
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mode, setMode] = useState(null);
  const [total, setTotal] = useState(0);
  const [isChangeNickname, setIsChangeNickname] = useState(false);
  const [modifyUser, setModifyUser] = useState();

  useEffect(() => {
    getUserList();
  }, [page, rowsPerPage]);

  function getUserList() {
    setIsLoading(true);
    getAllUserList({ page: page + 1, size: rowsPerPage })
      .then(res => {
        setUserList(res.content);
        setTotal(res.total_count);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  }

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const onSelectUser = (userId) => {
    const id = Number(userId);

    if (selected.includes(id)) {
      setSelected(prev => prev.filter(item => item !== id));
      return;
    }

    setSelected(prev => [...prev, id]);
  };

  const onSelectAllUsers = () => {
    if (selected.length === userList.length) {
      setSelected([]);
      return;
    }

    setSelected(userList.map(user => Number(user.id)));
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

    setIsLoading(true);
    updateUserStatus(params)
      .then(() => {
        getUserList();
        closeModal();
      })
      .catch(e => {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const openChangeNicknameModal = (e, user) => {
    e.stopPropagation();
    setModifyUser(user);
    setIsChangeNickname(true);
  };

  const closeChangeNicknameModal = () => {
    setIsChangeNickname(false);
    setModifyUser(null);
  };

  const changeNickname = ({ id, nickname }) => {
    setIsLoading(true);
    modifyNicknameById({ id, nickname })
      .then((res) => {
        getUserList();
        closeChangeNicknameModal();
      })
      .catch(e => {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
        console.error(e);
      })
      .finally(() => setIsLoading(false));

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
        <TableContainer sx={{ height: '40rem' }}>
          <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <HeadCell width={'7%'}>
                  <Checkbox onClick={onSelectAllUsers} checked={selected.length === userList.length} />
                </HeadCell>
                <HeadCell width={'20%'}>이메일</HeadCell>
                <HeadCell>닉네임</HeadCell>
                <HeadCell width={'10%'}>상태</HeadCell>
                <HeadCell width={'10%'}>기기</HeadCell>
                <HeadCell width={'15%'}>생성일</HeadCell>
                <HeadCell width={'15%'}>수정일</HeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => onSelectUser(user.id)}
                  sx={{ cursor: 'pointer', width: '100%', ":hover": { backgroundColor: '#f2f3ff' } }}
                >
                  <BodyCell>
                    <Checkbox
                      checked={selected.includes(user.id)}
                      onClick={() => onSelectUser(user.id)}
                    />
                  </BodyCell>
                  <BodyCell>{user?.uid ?? '-'}</BodyCell>
                  <BodyCell>
                    <Button
                      variant="outlined"
                      sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
                      onClick={(e) => openChangeNicknameModal(e, user)}
                    >
                      {user?.nickname ?? '-'}
                    </Button>
                  </BodyCell>
                  <BodyCell color={user?.status ? 'green' : 'black'}>{user?.status ? 'ACTIVE' : '-'}</BodyCell>
                  <BodyCell>{user?.device_type ?? '-'}</BodyCell>
                  <BodyCell>{user?.created_at ? dateTimeFormat(user.created_at) : '-'}</BodyCell>
                  <BodyCell>{user?.updated_at ? dateTimeFormat(user.updated_at) : '-'}</BodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 30, 50]}
          component="div"
          count={total}
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

      <ChangeNicknameModal
        open={isChangeNickname}
        onClose={closeChangeNicknameModal}
        onClick={changeNickname}
        user={modifyUser}
      />
    </Container>
  );
}

function HeadCell({ children, width }) {
  return (
    <TableCell sx={{
      fontWeight: 'bold',
      width: width,
      padding: 1,
      textAlign: 'center'
    }}
    >
      {children}
    </TableCell>
  );
}

function BodyCell({ children, color }) {
  return (
    <TableCell
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: color ?? '#000',
        textAlign: 'center'
      }}
    >
      {children}
    </TableCell>
  );
}