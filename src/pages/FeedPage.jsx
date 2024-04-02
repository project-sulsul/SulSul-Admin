import { Container, Paper, Stack, Typography } from "@mui/material";

export default function FeedPage() {
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 목록</Typography>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
      </Paper>
    </Container>
  );
}