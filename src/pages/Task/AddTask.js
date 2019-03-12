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

@connect(({ global }) => ({
  global
}))
@createForm()
export default class AddTask extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		repeatClicked: '每天',
  		taskName: '任务',
  		taskDesc: '',
  		taskPlan: '',
  		taskRemark: ''
  	}
  }
  handleClick = ()=>{
  	const btns = ['不重复', '周一到周五', '每天', '自定义', '取消'];
  	ActionSheet.showActionSheetWithOptions({
  		options: btns,
  		cancelButtonIndex: btns.length - 1,
  		message: '',
  		maskClosable: true,
  		wrapProps,
  		},
	  	(buttonIndex) => {
	  		this.setState({repeatClicked: btns[buttonIndex]});
	  	});
  }

  getPrompt = (title)=>{
  	return (
		prompt(title, '', [
		{
			text: '取消'
		},
		{
			text: '确定', onPress: remark => console.log(remark)
		}
		]));
  }

  render() {
  	const {global, taskData, isNew} = this.props;
  	const { getFieldProps } = this.props.form;
    return (
      <div>
      	 <NavBar
		      mode="light"
		      icon={<div>取消</div>}
		      onLeftClick={() => {router.push('/taskmgr/taskmgr')}}
		      rightContent={[
		        <div style={{ marginRight: '16px' }}>确定</div>
		      ]}
		    >{isNew ? '添加任务' : '更新任务'}</NavBar>
         <List>
         <List.Item onClick={()=>this.getPrompt('名称')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>名称</div>
              <div style={{float: 'right', color: '#222'}}><Icon type="right">{this.state.taskName}</Icon></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('描述')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>描述</div>
              <div style={{float: 'right', color: '#222'}}><Icon type="right">{this.state.taskDesc}</Icon></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('短期目标')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>短期目标</div>
              <div style={{float: 'right', color: '#222'}}><Icon type="right">{this.state.taskPlan}</Icon></div>
            </div>
          </List.Item>
          <List.Item onClick={()=>this.getPrompt('短期备注')}> 
	        <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>短期备注</div>
              <div style={{float: 'right', color: '#222'}}><Icon type="right">{this.state.taskRemark}</Icon></div>
            </div>
          </List.Item>
          <List.Item onClick={this.handleClick}>
            <div
              style={{ width: '100%', textAlign: 'center' }}>
              <div style={{float: 'left'}}>重复</div>
              <div style={{float: 'right', color: '#222'}}>{this.state.repeatClicked}<Icon type="right">{this.state.repeatClicked}</Icon></div>
            </div>
          </List.Item>
         </List>
      </div>
    );
  }
}