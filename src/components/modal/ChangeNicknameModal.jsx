import { useEffect, useState } from "react";

import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";

export default function ChangeNicknameModal({
  open,
  onClose,
  onClick,
  user,
}) {
  const [modifyUser, setModifyUser] = useState();

  useEffect(() => {
    if (!user) return;

    setModifyUser(user);
  }, [user]);

  const onChange = (e) => {
    setModifyUser(prev => ({ ...prev, nickname: e.target.value }));
  };

  const onModifyNickname = () => {
    if (!modifyUser.nickname) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    onClick({ id: modifyUser?.id, nickname: modifyUser?.nickname });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        boxShadow: 24,
        p: 3,
      }}>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          닉네임 변경
        </Typography>

        <TextField
          value={modifyUser?.nickname ?? ''}
          placeholder="닉네임을 입력하세요."
          onChange={onChange}
          sx={{ margin: '1rem 0', width: '100%' }}
        />


        <Stack direction='row' gap={2} sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={onModifyNickname}
          >
            변경
          </Button>
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}