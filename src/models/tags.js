import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';

export default {
  namespace: 'tags',

  state: {
    tagList: [
    ],
  },

  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(tQuery, payload);
      yield put({
        type: 'rFetchTags',
        payload: response.data.queryTags.data
      })
    },

    *addTags({ payload, callback }, { call, put }){
      yield put({
        type: 'rAddTags',
        payload: payload
      });
      if (callback) callback();
    },
    *deleteTags({ payload, callback }, { call, put }){
      yield put({
        type: 'rDeleteTags',
        payload: payload
      });
      if (callback) callback();
    },
  },

  reducers: {
    rFetchTags(state, action) {
      return {
        ...state,
        tagList: action.payload,
      };
    },

    rDeleteTags(state, action) {
      console.log(action.payload.index);
      var taskList =  state.taskList;
      taskList.splice(action.payload.index, 1);
      return {
        ...state,
        taskList: taskList,
      };
    },
  
    rAddTags(state, action) {
      console.log(action.payload);
      return {
        ...state,
        taskList: state.taskList.concat(action.payload),
      };
    },
  },
};
