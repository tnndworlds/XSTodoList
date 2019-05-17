import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudsave } from '@/services/crud';

export default {
  namespace: 'daytask',

  state: {
    taskList: [],
    tagList:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.queryTodos,
      });
    },
    *punch({ payload }, { call, put }) {
      console.log(payload);
      payload.type = 'punchDataDao';
      payload.isDbColumn = true;

      const response = yield call(crudsave, payload);
      yield put({
        type: 'punchAction',
        payload: payload
      })
    },
    *todoTask({ payload }, { call, put }){
      yield put({
        type: 'taskStatusChange',
        payload: payload
      })
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'fetchAction',
        payload: response,
      });
    },
  },

  reducers: {
    taskStatusChange(state, action){
      console.log(state.taskList);

      var taskList = [...state.taskList];
      taskList[action.payload.index] = action.payload.data;
      console.log(taskList);
      return {
        ...state,
        taskList: taskList
      }
    },
    fetchAction(state, action) {
      return {
        ...state,
        taskList: action.payload.dTask,
        tagList: action.payload.tags
      };
    },
    punchAction(state, action){
      switch (action.payload.punchType){
        case 1:
          var taskList = state.taskList;
          taskList[action.payload.index].todo = 'true';
          return {
            ...state,
            taskList: taskList
          };
        case 2:
          var tagList = state.tagList;
          tagList[action.payload.index].todo = 'true';
          return {
            ...state,
            tagList: tagList
          };
        default:
          return state;
      }
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
