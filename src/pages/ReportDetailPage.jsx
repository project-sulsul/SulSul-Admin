import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReport, updateReportStatusToSolved } from "../api/report";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import SelectModal from "../components/modal/SelectModal";
import { dateTimeFormat } from "../utils/dateTimeFormat";
import { getFeedById } from "../api/feed";


export default function FeedDetailPage({ setIsLoading }) {
    const navigate = useNavigate();
    const { reportId } = useParams();

    const [detailData, setDetailData] = useState();
    const [open, setOpen] = useState(false);


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

    const openModal = (e) => {
      e.stopPropagation();
      setOpen(true);
    };
  
    const closeModal = () => {
      setOpen(false);
    };

    const onClickNavigateTargetDetailPage = () => { 
      const targetId = detailData?.target_id
      if (detailData?.type === 'feed' || detailData?.type === 'comment') {
        getFeedById({ feedId: targetId })
        .then(() => {
          navigate(`/feed/${targetId}`);
        })
        .catch((e) => {
          alert('존재하지 않는 피드입니다.');
          console.error(e);
        })
      }
    }

    const onClickUpdateStatus = () => {
      setIsLoading(true);
      updateReportStatusToSolved({ reportId })
        .catch((e) => {
          alert('오류가 발생하여 처리하지 못 했습니다.');
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false)
          closeModal();
        });
    }

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
          <Button xs={2} variant="contained" color="info" onClick={onClickNavigateTargetDetailPage}>해당 타겟 상세 페이지로 이동</Button>
          <Button xs={2} variant="contained" color="info" onClick={openModal}>해결</Button>
        </Stack>

        <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container>
          <HeadGridItem xs={2}>신고 ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>신고 유저 ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.reporter_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>타겟 타입</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.type ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>타겟 ID</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.target_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>사유</HeadGridItem>
          <BodyGridItem xs={10}>{detailData?.reason ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>상태</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.status === "PENDING" ? "대기중" : detailData?.status === "SOLVED" ? "처리됨" : null ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>접수시각</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.created_at ? dateTimeFormat(detailData.created_at) : '-'}</BodyGridItem>

        </Grid>
        <Typography variant="h12" sx={{
          padding: '1em',
          display: 'flex',
          justifyContent: 'center',
          color: 'rgba(0, 0, 0, 0.6)',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          타겟은 피드, 댓글이 있습니다. 타겟 ID는 피드 or 댓글의 ID입니다. 신고를 처리하고 난 후 [해결]버튼을 눌러서 상태를 변경해주세요.
        </Typography>
      </Paper>

      <SelectModal
        open={open}
        title={'신고 처리'}
        content={'신고를 [해결] 처리할까요?'}
        leftButtonName={'해결'}
        rightButtonName={'닫기'}
        onClickLeftButton={() => onClickUpdateStatus()}
        onClickRightButton={closeModal}
        onClose={closeModal}
      />
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
      }}
    >
      {children}
    </Grid>
  );
}