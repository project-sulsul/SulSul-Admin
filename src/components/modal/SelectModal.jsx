import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function SelectModal({
  open,
  title,
  content,
  leftButtonName,
  rightButtonName,
  onClickLeftButton,
  onClickRightButton,
  onClose,
}) {
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
          {title}
        </Typography>

        <Typography sx={{ margin: '1rem 0' }}>
          {content}
        </Typography>

        <Stack direction='row' gap={2} sx={{ justifyContent: 'center' }}>
          <Button color="error" variant="contained" onClick={onClickLeftButton}>
            {leftButtonName}
          </Button>
          <Button variant="contained" onClick={onClickRightButton}>
            {rightButtonName}
          </Button>
        </Stack>
      </Box>
    </Modal >
  );
}