import { Container, Stack, Typography, Paper } from "@mui/material";

export default function ReportPage() {
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>신고 목록</Typography>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
      </Paper>
    </Container>
  );
}