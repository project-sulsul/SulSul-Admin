import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReport } from "../api/report";
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { dateTimeFormat } from "../utils/dateTimeFormat";


export default function FeedDetailPage({ setIsLoading }) {
    const navigate = useNavigate();
    const { reportId } = useParams();

    const [detailData, setDetailData] = useState();

    useEffect(() => {
        getReportById();
      }, [reportId]);

    function getReportById() {
        setIsLoading(true);
        getReport({ reportId })
          .then(setDetailData)
          .catch(console.error)
          .finally(() => setIsLoading(false));
    }

    const onClickNavigateTargetDetailPage = () => { 
      navigate(`/feed/${detailData?.target_id}`);
    }

    const onClickUpdateStatus = () => {}

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
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>신고 상세</Typography>
        </Stack>

        <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container>
          <HeadGridItem xs={2}>신고 ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>신고 유저 ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.reporter_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>신고 타입 (피드, 댓글)</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.type ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>타겟 (피드, 댓글) ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.target_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>사유</HeadGridItem>
          <BodyGridItem xs={10}>{detailData?.reason ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>상태</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.status === "PENDING" ? "대기중" : detailData?.status === "SOLVED" ? "처리됨" : null ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>생성일</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.created_at ? dateTimeFormat(detailData.created_at) : '-'}</BodyGridItem>
        </Grid>
        <Button variant="contained" color="info" onClick={onClickNavigateTargetDetailPage}>해당 타겟 피드, 댓글 상세 페이지로 이동</Button>
        <Button variant="contained" color="info" onClick={onClickUpdateStatus}>상태 변경</Button>
  
      </Paper>
      </Container>
    )
 }


 function HeadGridItem({ children, xs }) {
  return (
    <Grid
      item
      xs={xs}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        backgroundColor: 'rgba(224, 224, 224, 0.2)',
        width: '10rem',
        minHeight: '2.5rem'
      }}
    >
      {children}
    </Grid>
  );
}

function BodyGridItem({ children, color, xs }) {
  return (
    <Grid
      item
      xs={xs}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '1em',
        color: color ?? '#000',
        minHeight: '4rem',
        maxHeight: '18rem',
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        overflow: 'scroll',
      }}
    >
      {children}
    </Grid>
  );
}