import { routerRedux } from 'dva/router';
import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getPageQuery, getUserId } from '@/utils/utils';
export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if (response.code === '200'){
         yield put({
          type: 'registerHandle',
          payload: response,
        });
         yield put(routerRedux.replace("/User/Login"));
      }
     
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.code,
      };
    },
  },
};
