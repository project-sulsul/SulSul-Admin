import sulApi from "./config";

export async function getAllUserList() {
  try {
    const response = await sulApi.get('/admin/users');
    return response.data;
  } catch (e) {
    console.error(`유저 목록 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}

export async function updateUserStatus(params) {
  try {
    const response = await sulApi.put('/admin/users/status', params);
    console.log('getAllUserList', response);
    return response.data;
  } catch (e) {
    console.error(`유저 상태 변경(${params.status}) 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}