import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Badge,
  Button,
  Container,
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
      .catch(console.error);
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
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <HeadCell>제목</HeadCell>
                <BodyCell>{detailData?.title ?? '-'}</BodyCell>

                <HeadCell>피드 아이디</HeadCell>
                <BodyCell>{detailData?.feed_id ?? '-'}</BodyCell>
              </TableRow>

              <TableRow>
                <HeadCell>내용</HeadCell>
                <BodyCell span={3}>{detailData?.content ?? '-'}</BodyCell>
              </TableRow>

              <TableRow>
                <HeadCell>유저 닉네임</HeadCell>
                <BodyCell>{detailData?.user_nickname ?? '-'}</BodyCell>

                <HeadCell>유저 아이디</HeadCell>
                <BodyCell>{detailData?.user_id ?? '-'}</BodyCell>
              </TableRow>

              <TableRow>
                <HeadCell>생성일</HeadCell>
                <BodyCell>{detailData?.created_at ?? '-'}</BodyCell>

                <HeadCell>수정일</HeadCell>
                <BodyCell>{detailData?.updated_at ?? '-'}</BodyCell>
              </TableRow>

              <TableRow>
                <HeadCell>술 취향</HeadCell>
                <BodyCell>
                  {detailData?.alcohols ? detailData?.alcohols.map((alcohol, index) =>
                    <PairBadge key={index}>{alcohol}</PairBadge>
                  ) : '-'}
                </BodyCell>

                <HeadCell>안주 취향</HeadCell>
                <BodyCell>
                  {detailData?.foods ? detailData?.foods.map((food, index) =>
                    <PairBadge key={index}>{food}</PairBadge>
                  ) : '-'}
                </BodyCell>
              </TableRow>

              <TableRow>
                <HeadCell>신고 여부</HeadCell>
                <BodyCell color={detailData?.is_reported ? '#cc0000' : 'green'}>
                  {detailData?.is_reported ? String(detailData?.is_reported).toUpperCase() : '-'}
                </BodyCell>

                <HeadCell>삭제 여부</HeadCell>
                <BodyCell color={detailData?.is_deleted ? '#cc0000' : 'green'}>
                  {detailData?.is_deleted ? String(detailData?.is_deleted).toUpperCase() : '-'}
                </BodyCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <SelectModal
        open={open}
        title={'게시글을 삭제합니다.'}
        content={'삭제하시겠습니까?'}
        leftButtonName={'영구삭제'}
        rightButtonName={'임시삭제'}
        onClickLeftButton={() => onDelete(true)}
        onClickRightButton={onDelete}
        onClose={closeModal}
      />
    </Container>
  );
}

function HeadCell({ children }) {
  return (
    <TableCell
      sx={{
        fontWeight: 'bold',
        textAlign: 'center',
        borderLeft: '1px solid rgba(224, 224, 224, 1)',
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        backgroundColor: 'rgba(224, 224, 224, 0.2)',
        width: '10rem',
        height: '2.5rem',
      }}
    >
      {children}
    </TableCell>
  );
}

function BodyCell({ children, color, span }) {
  return (
    <TableCell
      colSpan={span}
      align="center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: color ?? '#000',
        height: '2.5rem',
      }}
    >
      {children}
    </TableCell>
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