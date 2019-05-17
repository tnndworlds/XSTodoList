import request from '@/utils/request';

export async function tQuery(params) {
  return request('/rest/template/data', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
