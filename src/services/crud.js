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


export async function crudupdate(params) {
  return request('/rest/crud/update', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}


export async function crudremove(params) {
  return request('/rest/crud/delete', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}