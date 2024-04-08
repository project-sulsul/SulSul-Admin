import { Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function FeedDetailPage() {
  useEffect(() => { }, []);

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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 상세</Typography>
      </Stack>
    </Container>
  );
}