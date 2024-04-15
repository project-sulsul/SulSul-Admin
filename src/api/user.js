import sulApi from "./config";

export async function getAllUserList({ page, size }) {
  try {
    const response = await sulApi.get(`/admin/users?page=${page}&size=${size}`);
    return response.data;
  } catch (e) {
    console.error(`유저 목록 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}

export async function updateUserStatus(params) {
  try {
    const response = await sulApi.put('/admin/users/status', params);
    return response.data;
  } catch (e) {
    console.error(`유저 상태 변경(${params.status}) 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}

export async function modifyNicknameById({ id, nickname }) {
  try {
    await sulApi.put(`/admin/users/${id}/nickname`, { nickname });
    return;
  } catch (e) {
    console.error(`닉네임 변경(${id}) 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}