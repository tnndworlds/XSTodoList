import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import { tQuery } from '@/services/tquery';
import { crudupdate, crudsave, crudremove } from '@/services/crud';

export default {
  namespace: 'tags',

  state: {
    tagList: [],
    imgList: [
      { value: 'icon-Chicken', icon: 'icon-Chicken', label: '鸡肉', text: '鸡肉', selected: true },
      { value: 'icon-Banana-',icon: 'icon-Banana-', label: '香蕉', text: '香蕉' },
      { value: 'icon-Cake',icon: 'icon-Cake', label: '面包', text: '面包' },
      { value: 'icon-Apple',icon: 'icon-Apple', label: '苹果', text: '苹果' },
      { value: 'icon-Mike',icon: 'icon-Mike', label: '牛奶', text: '牛奶' },
      { value: 'icon-Cutlery',icon: 'icon-Cutlery', label: '餐具', text: '餐具' },
      { value: 'icon-food-macaron',icon: 'icon-food-macaron', label: '马卡龙', text: '马卡龙' },
      { value: 'icon-food-popsicle',icon: 'icon-food-popsicle', label: '棒冰', text: '棒冰' },
    ],
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(tQuery, payload);
      yield put({
        type: 'fetchAction',
        payload: response.data.Tags.data,
      });
      if (callback) {
        callback(response);
      }
    },

    *add({ payload, callback }, { call, put }) {
      var addModel = {};
      addModel.type = 'tagDao';
      addModel.isDBColumn = true;
      addModel.data = payload;
      console.log(addModel);
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
        tagList: action.payload,
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
        tagList: state.tagList.push(action.payload),
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
