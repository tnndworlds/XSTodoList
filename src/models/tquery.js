import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';

export default {
  namespace: 'tquery',
  state: {
    modules: {},
  },

  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data
      })
    },
  },

  reducers: {
    fetchAction(state, action) {
      return {
        modules: {
            ...state.modules,
            ...action.payload
        },
      };
    },
  },
};
