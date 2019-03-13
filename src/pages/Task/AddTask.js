import React, { Component, Fragment } from 'react';
import { NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, ActionSheet, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import router from 'umi/router';
const prompt = Modal.prompt;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

@connect(({ task }) => ({
  task
}))
@createForm()
export default class AddTask extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		data: {
  			repeatClicked: '每天',
	  		taskName: '任务',
	  		taskDesc: '',
	  		taskPlan: '',
	  		taskRemark: '',
	  		todo: false
  		},
  		currentIndex: -1
  	}
  }

  componentDidMount(){
  	const { task } = this.props;
  	this.setState({
  		data: task.currentTask,
  		currentIndex: task.currentIndex
  	})
  }

  handleRepeatClick = ()=>{
  	const btns = ['不重复', '周一到周五', '每天', '自定义', '取消'];
  	ActionSheet.showActionSheetWithOptions({
  		options: btns,
  		cancelButtonIndex: btns.length - 1,
  		message: '',
  		maskClosable: true,
  		wrapProps,
  		},
	  	(buttonIndex) => {
	  		this.setState({data: {...this.state.data, repeatClicked: btns[buttonIndex]}});
	  	});
  }

  getPrompt = (title, key)=>{
  	return (
		prompt(title, '', [
		{
			text: '取消'
		},
		{
			text: '确定', onPress: info => {
				var tmpData = {};
				tmpData[key] = info;
				this.setState({data: {...this.state.data, ...tmpData}});
			}
		}
		], '', this.state.data[key]));
  }

  handleOk = ()=>{
  	const { dispatch } = this.props;
  	if (this.state.currentIndex == -1){
  		dispatch({
  			type: 'task/addTask',
  			payload: this.state.data,
  			callback: (response) => {
  				router.push('/taskmgr/taskmgr')
  			}
  		})
  	}
  	else {
  		dispatch({
  			type: 'task/updateTask',
  			payload: {data: this.state.data, index: this.state.currentIndex},
  			callback: (response) => {
  				router.push('/taskmgr/taskmgr')
  			}
  		})
  	}
  }

  render() {
  	const { taskData, isNew } = this.props;
  	const { data } = this.state;
  	const { getFieldProps } = this.props.form;
    return (
      <div>
      	 <NavBar
		      mode="light"
		      icon={<Icon type="cross" size='md'/>}
		      onLeftClick={() => {router.push('/taskmgr/taskmgr')}}
		      rightContent={[
		        <Icon type="check" size='md' style={{ marginRight: '16px' }} onClick={this.handleOk}></Icon>
		      ]}
		    >{isNew ? '添加任务' : '更新任务'}</NavBar>
         <List>
         <List.Item onClick={()=>this.getPrompt('名称', 'taskName')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>名称</div>
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{data.taskName}<Icon style={{marginTop: '2px'}} type="right" size='md'/></span></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('描述', 'taskDesc')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>描述</div>
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{data.taskDesc}<Icon style={{marginTop: '2px'}} type="right"></Icon></span></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('短期目标', 'taskPlan')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>短期目标</div>
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{data.taskPlan}<Icon style={{marginTop: '2px'}} type="right"></Icon></span></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('短期备注', 'taskRemark')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>短期备注</div>
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{data.taskRemark}<Icon style={{marginTop: '2px'}} type="right"></Icon></span></div>
            </div>
          </List.Item>
          <List.Item onClick={this.handleRepeatClick}>
            <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>重复</div>
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{data.repeatClicked}<Icon style={{marginTop: '2px'}} type="right"></Icon></span></div>
            </div>
          </List.Item>
         </List>
      </div>
    );
  }
}