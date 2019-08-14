import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Radio,
  Flex,
  Card,
  WingBlank,
  NavBar,
  Icon,
  InputItem,
  List,
  Switch,
  Toast,
  Button,
  Range,
  Grid,
  Picker,
  DatePicker
} from 'antd-mobile';
import router from 'umi/router';
const RadioItem = Radio.RadioItem;
const Item = List.Item;
import IconFont from '@/utils/IconFont';
import { createForm } from 'rc-form';
import styles from './add.less';
import { getUserId } from '@/utils/user';
import zhCn from 'antd-mobile/lib/date-picker/locale/zh_CN';
import moment from 'moment';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


@connect(({ qtask }) => ({
    qtask,
}))
class QTaskAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: now,
        isNew: true,
        currentQTask: {}
    };
  }

  componentDidMount() {
      const { qtask: {currentQTask, currentIndex}} = this.props;
      console.log(currentQTask);
      this.setState({
          ...this.state,
          currentQTask: currentQTask,
          isNew: currentIndex == -1,
          date: currentIndex == -1 ? now : moment(currentQTask.DOING_DATE, 'YYYY-MM-DD', true).toDate()
      })
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        var saveData = {
            ...this.props.form.getFieldsValue(),
            DOING_DATE: moment(this.state.date).format('YYYY-MM-DD')
        };
        saveData.USER_ID = getUserId();
        saveData.ID = this.state.isNew ? null : this.state.currentQTask.ID;
        console.log(saveData);
        dispatch({
            type: this.state.isNew ? 'qtask/add' : 'qtask/update',
            payload:saveData,
            callback: response=>{
              Toast.success(this.state.isNew ? '添加快速任务成功' : '更新快速任务成功', 2);
              router.push('/my/qtask')
            }
          })
        
      } else {
        alert('Validation failed');
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { currentQTask, isNew } = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.push('/my/qtask');
          }}
        >
          快速备忘
        </NavBar>
        <List renderFooter={() => getFieldError('TITLE') && getFieldError('TITLE').join(',')}>
          <InputItem
            {...getFieldProps('TITLE', {
              initialValue: isNew ? '' : currentQTask.TITLE,
              rules: [
                { required: true, message: '请输入任务名称' },
              ],
            })}
            clear
            error={!!getFieldError('TITLE')}
            onErrorClick={() => {
              alert(getFieldError('TITLE').join(','));
            }}
            placeholder="请输入任务名称"
          >
            名称
          </InputItem>
          <DatePicker
            mode="date"
            title="执行日期"
            value={this.state.date}
            locale={zhCn}
            >
            <List.Item arrow="horizontal">执行日期</List.Item>
          </DatePicker>
          <InputItem
            {...getFieldProps('DESCRIPTION',{
                initialValue: isNew ? '' : currentQTask.DESCRIPTION,
            })}
            placeholder="描述信息"
          >
            描述
          </InputItem>
          <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>
              提交
            </Button>
            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>
              重置
            </Button>
          </Item>
        </List>
      </div>
    );
  }
}

export default createForm()(QTaskAdd);
