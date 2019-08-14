import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudupdate, crudsave, crudremove } from '@/services/crud';

export default {
  namespace: 'goals',

  state: {
    goalsList: [],
    currentGoal:{},
    currentIndex: -1
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
      payload.ID = response.data;
      yield put({
        type: 'addAction',
        payload: payload,
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }) {
      var updateModel = {};
      updateModel.type = 'goalDao';
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
      rmModel.type = 'goalDao';
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

    setCurrentGoal(state, action){
      return {
        ...state,
        currentGoal: action.payload == -1 ? {} : state.goalsList[action.payload],
        currentIndex: action.payload
      }
    },

    updateAction(state, action) {
      var goalsList = state.goalsList;
      goalsList[state.currentIndex] = {
        ...state.goalsList[state.currentIndex],
        ...action.payload.data,
      };
      return {
        ...state,
        goalsList: goalsList,
      };
    },

    addAction(state, action) {
      return {
        ...state,
        goalsList: [action.payload, ...state.goalsList],
      };
    },

    removeAction(state, action) {
      return {
        ...state,
        goalsList: state.goalsList.splice(action.payload.index, 1),
      };
    },
  },
};
