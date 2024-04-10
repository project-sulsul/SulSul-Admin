import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { deleteFeed, getFeedById } from "../api/feed";
import SelectModal from "../components/modal/SelectModal";

export default function FeedDetailPage() {
  const navigate = useNavigate();
  const { feedId } = useParams();

  const [detailData, setDetailData] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFeedDetailById();
  }, [feedId]);

  function getFeedDetailById() {
    getFeedById({ feedId })
      .then(setDetailData)
      .catch(console.error);
  }

  const openModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onDelete = (isHardDelete = false) => {
    deleteFeed({ feedId, isHardDelete })
      .then(() => {
        closeModal();
        navigate('/feed');
      })
      .catch((e) => {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 상세</Typography>

        <Button variant="contained" color="error" onClick={openModal}>삭제</Button>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container>
          <HeadGridItem xs={2}>제목</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.title ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>피드 아이디</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.feed_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>내용</HeadGridItem>
          <BodyGridItem xs={10}>{detailData?.content ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>이미지</HeadGridItem>
          <BodyGridItem xs={10}>{
            detailData?.images.length > 0 ?
              detailData.images.map(img => <img src={img} alt="게시글 이미지" width={'170rem'} style={{ margin: '0 1rem 1rem 0' }} />)
              : '-'
          }
          </BodyGridItem>

          <HeadGridItem xs={2}>유저 닉네임</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.user_nickname ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>유저 아이디</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.user_id ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>생성일</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.created_at ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>수정일</HeadGridItem>
          <BodyGridItem xs={4}>{detailData?.updated_at ?? '-'}</BodyGridItem>

          <HeadGridItem xs={2}>술 취향</HeadGridItem>
          <BodyGridItem xs={4}>
            {detailData?.alcohols ? detailData?.alcohols.map((alcohol, index) =>
              <PairBadge key={index}>{alcohol}</PairBadge>
            ) : '-'}
          </BodyGridItem>

          <HeadGridItem xs={2}>안주 취향</HeadGridItem>
          <BodyGridItem xs={4}>
            {detailData?.foods ? detailData?.foods.map((food, index) =>
              <PairBadge key={index}>{food}</PairBadge>
            ) : '-'}
          </BodyGridItem>

          <HeadGridItem xs={2}>신고 여부</HeadGridItem>
          <BodyGridItem color={detailData?.is_reported ? '#cc0000' : 'green'} xs={4}>
            {detailData?.is_reported ? 'TRUE' : 'FALSE'}
          </BodyGridItem>

          <HeadGridItem xs={2}>삭제 여부</HeadGridItem>
          <BodyGridItem color={detailData?.is_deleted ? '#cc0000' : 'green'} xs={4}>
            {detailData?.is_deleted ? 'TRUE' : 'FALSE'}
          </BodyGridItem>
        </Grid>
      </Paper>

      <SelectModal
        open={open}
        title={detailData?.is_deleted ? '삭제된 게시글입니다.' : '게시글을 삭제합니다.'}
        content={detailData?.is_deleted ? '영구 삭제하시겠습니까?' : '삭제하시겠습니까?'}
        leftButtonName={'영구삭제'}
        rightButtonName={detailData?.is_deleted ? '닫기' : '임시삭제'}
        onClickLeftButton={() => onDelete(true)}
        onClickRightButton={detailData?.is_deleted ? closeModal : onDelete}
        onClose={closeModal}
      />
    </Container >
  );
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

function PairBadge({ children }) {
  return (
    <Badge
      sx={{
        backgroundColor: 'rgba(8, 56, 94, 0.5)',
        color: 'white',
        padding: '2px 0.5rem',
        margin: '0.2rem',
        borderRadius: '1rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Badge>
  );
}