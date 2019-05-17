import request from '@/utils/request';

export async function crudsave(params) {
  return request('/rest/crud/save', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
