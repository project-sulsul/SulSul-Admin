import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { getAllReports } from "../api/report";


export default function ReportPage({ setIsLoading }) {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setReportList();
  }, [page, rowsPerPage]);

  const onChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  const setReportList = async () => {
    setIsLoading(true);
    getAllReports({ page: page + 1, size: rowsPerPage })
      .then(data => {
        setReports(data.content);
        setTotal(data.total_count);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Container>
      <Stack
        direction="row"
        sx={{justifyContent: "space-between", alignItems: 'center', margin: '1rem'}}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>신고 목록</Typography>
      </Stack>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <HeadCell width={'5%'}>ID</HeadCell>
                <HeadCell width={'5%'}>신고자</HeadCell>
                <HeadCell width={'10%'}>대상</HeadCell>
                <HeadCell width={'10%'}>유형</HeadCell>
                <HeadCell width={'20%'}>이유</HeadCell>
                <HeadCell width={'10%'}>상태</HeadCell>
                <HeadCell width={'20%'}>신고날짜</HeadCell>
                <HeadCell width={'10%'}></HeadCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.id}
                  onClick={() => {}}
                  sx={{ cursor: 'pointer', width: '100%', ":hover": { backgroundColor: '#f2f3ff' } }}
                >
                  <BodyCell>{ report.id }</BodyCell>
                  <BodyCell>{ report.reporter_id }</BodyCell>
                  <BodyCell>{ report.target_id }</BodyCell>
                  <BodyCell>
                    { 
                      report.type === "feed" ? "피드" :
                      report.type === "comment" ? "댓글" :
                      report.type === "user" ? "유저" : 
                      null
                    }
                  </BodyCell>
                  <BodyCell>{ report.reason }</BodyCell>
                  <BodyCellBadge color={
                    report.status === "PENDING" ? "#1679AB" :
                    report.status === "SOLVED" ? "green" : 
                    null
                  }>
                    {
                      report.status === "PENDING" ? "대기중" :
                      report.status === "SOLVED" ? "처리됨" : 
                      null
                    }
                  </BodyCellBadge>
                  <BodyCell>{ report.created_at.split('T').join("  ") }</BodyCell>

                  <BodyCell>
                    <Button>삭제</Button>
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
    </Container>
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

function BodyCellBadge({ children, color }) {
  return (
    <TableCell
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center',
      }}
    >
      <span style={{
        padding: "6px",
        backgroundColor: color,
        borderRadius: "16px",
        color: "white",
        fontSize: "0.75rem",
      }}>
        {children}
      </span>
    </TableCell>
  );
}
