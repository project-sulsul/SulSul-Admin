import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllFeedList } from "../api/feed";

import {
  Button,
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
  Typography
} from "@mui/material";
import SelectModal from "../components/modal/SelectModal";

export default function FeedPage() {
  const navigate = useNavigate();

  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFeedList();
  }, [page, rowsPerPage]);

  function getFeedList() {
    getAllFeedList({ page: page + 1, size: rowsPerPage })
      .then(res => {
        setFeedList(res.content);
        setTotal(res.total_count);
      })
      .catch(e => {
        console.error(e);
      });
  }

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const onDelete = (e) => {
  };

  const openModal = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const onClickFeed = (id) => {
    navigate(`/feed/${id}`);
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>피드 목록</Typography>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ height: '40rem' }}>
          <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <HeadCell width={'5%'}>
                  id
                </HeadCell>
                <HeadCell width={'10%'}>
                  제목
                </HeadCell>
                <HeadCell width={'25%'}>
                  내용
                </HeadCell>
                <HeadCell width={'5%'}>
                  유저
                </HeadCell>
                {/* <HeadCell sx={{ fontWeight: 'bold', width: '10%', padding: 1 }}>닉네임</HeadCell> */}
                <HeadCell width={'7%'}>
                  신고
                </HeadCell>
                <HeadCell width={'7%'}>
                  삭제
                </HeadCell>
                <HeadCell width={'10%'}>
                  생성일
                </HeadCell>
                <HeadCell width={'10%'}>
                  수정일
                </HeadCell>
                <HeadCell width={'10%'}>
                  삭제하기
                </HeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {feedList.map((feed) => (
                <TableRow
                  key={feed.feed_id}
                  onClick={() => onClickFeed(feed.feed_id)}
                  sx={{ cursor: 'pointer', width: '100%', ":hover": { backgroundColor: '#f2f3ff' } }}
                >
                  <BodyCell >{feed.feed_id ?? '-'}</BodyCell>
                  <BodyCell >{feed.title ?? '-'}</BodyCell>
                  <BodyCell >{feed.content ?? '-'}</BodyCell>
                  <BodyCell >{feed.user_id ?? '-'}</BodyCell>
                  {/* <BodyCell >{feed.nickname ?? '-'}</BodyCell> */}
                  <BodyCell color={feed.is_reported ? 'green' : '#cc0000'}>{String(feed?.is_reported).toUpperCase() ?? '-'}</BodyCell>
                  <BodyCell color={feed.is_deleted ? 'green' : '#cc0000'}>{String(feed?.is_deleted).toUpperCase() ?? '-'}</BodyCell>
                  <BodyCell >{(feed.created_at) ?? '-'}</BodyCell>
                  <BodyCell >{(feed.updated_at) ?? '-'}</BodyCell>

                  <BodyCell sx={{ width: '5%' }}>
                    <Button variant="outlined" size="small" onClick={openModal}>삭제</Button>
                  </BodyCell>
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

      <SelectModal
        open={open}
        title={'게시글을 삭제합니다.'}
        content={'삭제하시겠습니까?'}
        leftButtonName={'영구삭제'}
        rightButtonName={'임시삭제'}
        onClickLeftButton={onDelete}
        onClickRightButton={onDelete}
        onClose={closeModal}
      />
    </Container >
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