import sulApi from "./config";


export const getAllReports = async ({ page, size }) => {
	try {
	  const response = await sulApi.get(`/admin/reports`, {
			params: {page, size},
		});
	  return response.data;
	} catch (e) {
	  console.error(`신고 목록 에러 발생:: ${e}`);
	  throw new Error('다시 시도해주세요.');
	}
}

export const getReport = async ({ reportId }) => { 
	try {
	  const response = await sulApi.get(`/admin/reports/${reportId}`);
	  return response.data;
	} catch (e) {
	  console.error(`신고 상세 에러 발생:: ${e}`);
	  throw new Error('다시 시도해주세요.');
	}
}


export const updateReportStatusToSolved = async ({ reportId }) => { 
	try {
	  const response = await sulApi.put(`/admin/reports/${reportId}/status`, { status: 'SOLVED' });
	  return response.data;
	} catch (e) {
	  console.error(`신고 상세 상태 변경 중 에러 발생:: ${e}`);
	  throw new Error('다시 시도해주세요.');
	}
}