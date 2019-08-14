import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudupdate, crudsave, crudremove } from '@/services/crud';

export default {
  namespace: 'strategy',

  state: {
    currentIndex: -1,
    strategyList: [
    ],
    week:[0,1,2,3,4,5,6],
    month:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    weeks:[{key:'0', value:'周一'},
      {key:'1', value:'周二'},
      {key:'2', value:'周三'},
      {key:'3', value:'周四'},
      {key:'4', value:'周五'},
      {key:'5', value:'周六'},
      {key:'6', value:'周天'}],
    months:[
      {key:'01', value:'1号'},
      {key:'02', value:'2号'},
      {key:'03', value:'3号'},
      {key:'04', value:'4号'},
      {key:'05', value:'5号'},
      {key:'06', value:'6号'},
      {key:'07', value:'7号'},
      {key:'08', value:'8号'},
      {key:'09', value:'9号'},
      {key:'10', value:'10号'},
      {key:'11', value:'11号'},
      {key:'12', value:'12号'},
      {key:'13', value:'13号'},
      {key:'14', value:'14号'},
      {key:'15', value:'15号'},
      {key:'16', value:'16号'},
      {key:'17', value:'17号'},
      {key:'18', value:'18号'},
      {key:'19', value:'19号'},
      {key:'20', value:'20号'},
      {key:'21', value:'21号'},
      {key:'22', value:'22号'},
      {key:'23', value:'23号'},
      {key:'24', value:'24号'},
      {key:'25', value:'25号'},
      {key:'26', value:'26号'},
      {key:'27', value:'27号'},
      {key:'28', value:'28号'},
      {key:'29', value:'29号'},
      {key:'30', value:'30号'},
      {key:'31', value:'31号'}
    ]
  },

  effects: {
    *fetch({ payload, callback }, { call, put }){
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.Strategy.data
      });
      if (callback){
        callback(response);
      }
    },

    *add({ payload, callback }, { call, put }){
      var addModel = {};
      addModel.type = 'strategyDao';
      addModel.isDBColumn = true;
      addModel.data = payload;
      console.log(addModel);
      const response = yield call(crudsave, addModel);
      payload.ID = response.data;
      yield put({
        type: 'addAction',
        payload: payload
      });
      if (callback) callback();
    },

    *update({ payload, callback }, { call, put }){
      var updateModel = {};
      updateModel.type = 'strategyDao';
      updateModel.isDBColumn = true;
      updateModel.data = payload.data;
      const response = yield call(crudupdate, updateModel);
      yield put({
        type: 'updateAction',
        payload: payload
      });
      if (callback) callback();
    },

    *remove({ payload, callback }, { call, put }){
      var rmModel = {};
      rmModel.type = 'strategyDao';
      rmModel.isDBColumn = true;
      rmModel.conList = [
        {
          attrName: 'ID',
          relate: 'EQUAL',
          value: payload.ID
        }
      ];
      console.log(rmModel);
      const response = yield call(crudremove, rmModel);
      yield put({
        type: 'removeAction',
        payload: payload
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    fetchAction(state, action) {
      return {
        ...state,
        strategyList: action.payload,
      };
    },

    setCurrent(state, action){
      return {
        ...state,
        currentIndex: action.payload
      }
    },

    updateAction(state, action) {
      var strategyList = state.strategyList;
      strategyList[action.payload.index] = {
        ...state.strategyList[action.payload.index],
        ...action.payload.data
      };
      return {
        ...state,
        strategyList: strategyList,
      };
    },

    addAction(state, action) {
      return {
        ...state,
        strategyList: [action.payload, ...state.strategyList],
      };
    },

    removeAction(state, action) {
      var strategyList = state.strategyList;
      delete strategyList[action.payload.index]
      return {
        ...state,
        strategyList: strategyList
      };
    },
  },
};
