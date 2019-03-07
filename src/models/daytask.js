import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export default {
  namespace: 'daytask',

  state: {
    taskList: [
      {title: '读书', description: '每日读书20页', plan: '计划2019-04-17完成', ref: '人性的弱点'},
      {title: '跑步', description: '生命在于运动，跑步产生多巴胺~', plan: '2019, 奔向3000公里', ref: '月跑量均250KM'},
      {title: '王者荣耀', description: '奔向王者', plan: '星耀', ref: '每日一星'}
    ],
    tagList: [
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text:'登山'},
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', text:'做饭'},
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text:'看电影'},
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text:'XXX'},
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', text:'游泳'},
      {icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png', text:'丛丛'}
    ]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
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
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
