import sulApi from "./config";

export async function getAllFeedList({ page, size }) {
  try {
    const response = await sulApi.get(`/admin/feeds?page=${page}&size=${size}`);
    return response.data;
  } catch (e) {
    console.error(`피드 목록 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}

export async function getFeedById({ feedId }) {
  try {
    const response = await sulApi.get(`/admin/feeds/${feedId}`);
    return response.data;
  } catch (e) {
    console.error(`피드 (${feedId}) 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}

export async function deleteFeed({ feedId, isHardDelete }) {
  try {
    await sulApi.delete(`/admin/feeds/${feedId}`, {
      hard_delete: isHardDelete
    });
  } catch (e) {
    console.error(`피드 삭제 (${feedId}) 에러 발생:: ${e}`);
    throw new Error('다시 시도해주세요.');
  }
}