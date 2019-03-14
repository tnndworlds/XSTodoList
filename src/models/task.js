import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';

export default {
  namespace: 'task',

  state: {
    taskList: [
      {taskName: '读书', taskDesc: '每日读书20页', taskPlan: '计划2019-04-17完成', taskRemark: '人性的弱点', todo: true},
      {taskName: '跑步', taskDesc: '生命在于运动，跑步产生多巴胺~', taskPlan: '2019, 奔向3000公里', taskRemark: '月跑量均250KM', todo: false}
    ],
    currentTask: {},
    currentIndex: -1
  },

  effects: {
    *fetchTask({ payload }, { call, put }){
      yield put({
        type: 'rFetchTask',
        payload: payload
      })
    },
    *addTask({ payload, callback }, { call, put }){
      yield put({
        type: 'rAddTask',
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
    rFetchTask(state, action) {
      return {
        ...state,
        taskList: action.payload,
      };
    },
    changeCurrentTask(state, action){
      return {
        ...state,
        currentTask: action.payload.data,
        currentIndex: action.payload.index
      }
    },
    rAddTask(state, action) {
      return {
        ...state,
        taskList: state.taskList.concat(action.payload),
      };
    },
    rUpdateTask(state, action) {
      var taskList = [...state.taskList];
      taskList[action.payload.index] = action.payload.data;
      return {
        ...state,
        taskList: taskList,
      };
    },
  },
};
