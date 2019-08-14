import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudupdate, crudsave, crudremove } from '@/services/crud';

export default {
  namespace: 'qtask',
  state: {
    qtaskList: [],
    currentQTask:{},
    currentIndex: -1
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.QTask.data,
      });
      if (callback) {
        callback(response);
      }
    },

    *add({ payload, callback }, { call, put }) {
      var addModel = {};
      addModel.type = 'qTaskDao';
      addModel.isDBColumn = true;
      addModel.data = payload;
      const response = yield call(crudsave, addModel);
      payload.ID = response.data;
      yield put({
        type: 'addAction',
        payload: payload,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      var updateModel = {};
      updateModel.type = 'qTaskDao';
      updateModel.isDBColumn = true;
      updateModel.data = payload;
      console.log(updateModel);
      const response = yield call(crudupdate, updateModel);
      yield put({
        type: 'updateAction',
        payload: payload,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      var rmModel = {};
      rmModel.type = 'qTaskDao';
      rmModel.isDBColumn = true;
      rmModel.conList = [
        {
          attrName: 'ID',
          relate: 'EQUAL',
          value: payload.ID,
        },
      ];
      const response = yield call(crudremove, rmModel);
      yield put({
        type: 'removeAction',
        payload: payload.index,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    fetchAction(state, action) {
      return {
        ...state,
        qtaskList: action.payload,
      };
    },

    setCurrentQTask(state, action){
      return {
        ...state,
        currentQTask: action.payload == -1 ? {} : state.qtaskList[action.payload],
        currentIndex: action.payload
      }
    },

    updateAction(state, action) {
      var qtaskList = state.qtaskList;
      qtaskList[state.currentIndex] = {
        ...state.qtaskList[state.currentIndex],
        ...action.payload.data,
      };
      return {
        ...state,
        qtaskList: qtaskList,
      };
    },

    addAction(state, action) {
      console.log(action.payload);
      return {
        ...state,
        qtaskList: [
          action.payload,
          ...state.qtaskList
        ],
      };
    },

    removeAction(state, action) {
      var qTaskList = [...state.qtaskList];
      qTaskList.splice(action.payload, 1);
      return {
        ...state,
        qtaskList: qTaskList,
      };
    },
  },
};
