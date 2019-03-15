import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export default {
  namespace: 'tags',

  state: {
    tagList: [
     {value: 0, label: '登山'},
     {value: 1, label: '做饭'},
     {value: 2, label: '看电影'},
     {value: 3, label: '游泳'},
     {value: 4, label: '丛丛'},
     {value: 5, label: '晚刷牙'},
    ],
  },

  effects: {
    *fetchTags({ payload }, { call, put }){
      yield put({
        type: 'rFetchTags',
        payload: payload
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
    rDeleteTags(state, action) {
      console.log(action.payload.index);
      var taskList =  state.taskList;
      taskList.splice(action.payload.index, 1);
      return {
        ...state,
        taskList: taskList,
      };
    },
    rFetchTags(state, action) {

      return {
        ...state,
        taskList: action.payload,
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
