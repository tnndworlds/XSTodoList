import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudupdate, crudsave, crudremove } from '@/services/crud';

export default {
  namespace: 'goals',

  state: {
    goalsList: [],
    currentGoals:{}
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.Goals.data,
      });
      if (callback) {
        callback(response);
      }
    },

    *add({ payload, callback }, { call, put }) {
      var addModel = {};
      addModel.type = 'goalDao';
      addModel.isDBColumn = true;
      addModel.data = payload;
      const response = yield call(crudsave, addModel);
      addModel.ID = response.data;
      yield put({
        type: 'addAction',
        payload: addModel,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      var updateModel = {};
      updateModel.type = 'tagDao';
      updateModel.isDBColumn = true;
      updateModel.data = payload.data;
      const response = yield call(crudupdate, updateModel);
      yield put({
        type: 'updateAction',
        payload: payload,
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }) {
      var rmModel = {};
      rmModel.type = 'tagDao';
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
        payload: payload,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    fetchAction(state, action) {
      return {
        ...state,
        goalsList: action.payload,
      };
    },

    updateAction(state, action) {
      var tagList = state.tagList;
      tagList[action.payload.index] = {
        ...state.tagList[action.payload.index],
        ...action.payload.data,
      };
      return {
        ...state,
        tagList: tagList,
      };
    },

    addAction(state, action) {
      return {
        ...state,
        tagList: state.goalsList.push(action.payload),
      };
    },

    removeAction(state, action) {
      return {
        ...state,
        tagList: state.tagList.splice(action.payload.index, 1),
      };
    },
  },
};
