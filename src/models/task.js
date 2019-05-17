import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudsave } from '@/services/crud';

export default {
  namespace: 'task',

  state: {
    taskList: [],
    currentTask: {},
    currentIndex: -1
  },

  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.AllTasks
      })
    },
    *addTask({ payload, callback }, { call, put }){
      console.log(payload);

      var reqParam = {};
      reqParam.type = 'ddTaskDao';
      reqParam.data = payload;
      reqParam.dbColumn = false;

      const response = yield call(crudsave, reqParam);
      yield put({
        type: 'addAction',
        payload: payload
      });
      if (callback) callback();
    },
    *deleteTask({ payload, callback }, { call, put }){
      yield put({
        type: 'rDeleteTask',
        payload: payload
      });
      if (callback) callback();
    },
    *updateTask({ payload, callback }, { call, put }){
      yield put({
        type: 'rUpdateTask',
        payload: payload
      });
      if (callback) callback();
    },
  },

  reducers: {
    rDeleteTask(state, action) {
      console.log(action.payload.index);
      var taskList =  state.taskList;
      taskList.splice(action.payload.index, 1);
      return {
        ...state,
        taskList: taskList,
      };
    },
    fetchAction(state, action) {
      return {
        ...state,
        taskList: action.payload.data,
      };
    },
    changeCurrentTask(state, action){
      return {
        ...state,
        currentTask: action.payload.data,
        currentIndex: action.payload.index
      }
    },
    addAction(state, action) {
      console.log(action.payload);
      return {
        ...state,
        taskList: state.taskList.concat(action.payload),
      };
    },
    rUpdateTask(state, action) {
      console.log(action.payload);
      var taskList = [...state.taskList];
      taskList[action.payload.index] = action.payload.data;
      return {
        ...state,
        taskList: taskList,
      };
    },
  },
};
