import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteFeed, getAllFeedList } from "../api/feed";

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
import { dateTimeFormat } from "../utils/dateTimeFormat";

export default function FeedPage({ setIsLoading }) {
  const navigate = useNavigate();

  const [feedList, setFeedList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getFeedList();
  }, [page, rowsPerPage]);

  function getFeedList() {
    setIsLoading(true);
    getAllFeedList({ page: page + 1, size: rowsPerPage })
      .then(res => {
        setFeedList(res.content);
        setTotal(res.total_count);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  }

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const onDelete = (isHardDelete = false) => {
    setIsLoading(true);
    deleteFeed({ feedId: selected?.feed_id, isHardDelete })
      .then(() => {
        closeModal();
        navigate('/feed');
      })
      .catch((e) => {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  const openModal = (e, feed) => {
    e.stopPropagation();
    setOpen(true);
    setSelected(feed);
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
                  <BodyCell color={feed.is_reported ? '#cc0000' : 'green'}>{feed?.is_reported ? 'O' : '-'}</BodyCell>
                  <BodyCell color={feed.is_deleted ? '#cc0000' : 'green'}>{feed?.is_deleted ? 'O' : '-'}</BodyCell>
                  <BodyCell >{feed?.created_at ? dateTimeFormat(feed.created_at) : '-'}</BodyCell>
                  <BodyCell >{feed?.updated_at ? dateTimeFormat(feed.updated_at) : '-'}</BodyCell>

                  <BodyCell sx={{ width: '5%' }}>
                    <Button variant="outlined" size="small" onClick={(e) => openModal(e, feed)}>삭제</Button>
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
        title={selected?.is_deleted ? '삭제된 게시글입니다.' : '게시글을 삭제합니다.'}
        content={selected?.is_deleted ? '영구 삭제하시겠습니까?' : '삭제하시겠습니까?'}
        leftButtonName={'영구삭제'}
        rightButtonName={selected?.is_deleted ? '닫기' : '임시삭제'}
        onClickLeftButton={() => onDelete(true)}
        onClickRightButton={
          selected?.is_deleted ?
            closeModal :
            onDelete
        }
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
      height: '59px',
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