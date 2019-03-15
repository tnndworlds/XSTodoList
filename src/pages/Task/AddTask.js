import React, { Component, Fragment } from 'react';
import { NavBar, Icon, List, InputItem, WhiteSpace, TextareaItem, ActionSheet, Modal, Button, Menu, ActivityIndicator } from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import router from 'umi/router';
const prompt = Modal.prompt;
const alert = Modal.alert;
import styles from './AddTask.less'
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
  			repeatClicked: 0,
	  		taskName: '任务',
	  		taskDesc: '',
	  		taskPlan: '',
	  		taskRemark: '',
	  		todo: false
  		},
  		currentIndex: -1,
  		repeatPanelVisible: false,
  		repeatMenuData: [],
  		customPanelVisible: false,
  		customMenuData: [],
  		menuData: [{value: 0, label: '不重复'}, 
			{value: 1, label: '周一到周五'},
			{value: 2, label: '每天'},
			{value: 3, label: '自定义'}],
		cusMenuData: [{value: 0, label: '周日'}, 
			{value: 1, label: '周一'},
			{value: 2, label: '周二'},
			{value: 3, label: '周三'},
			{value: 4, label: '周四'},
			{value: 5, label: '周五'},
			{value: 6, label: '周六'}]
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
  	const menuData = [{value: '1', label: '不重复'},{value: '2', label: '周一到周五'},{value: '3', label: '每天'},{value: '4', label: '自定义'}];
  	this.setState({repeatPanelVisible: true, customPanelVisible: false});
  	
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

  handleDelete = ()=>{
  	const { dispatch } = this.props;
	alert('','确定删除？', [
		{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
		{
		  text: '确定', onPress: () => {
	      dispatch({
			type: 'task/deleteTask',
			payload: {index: this.state.currentIndex},
			callback: (response) => {
				router.push('/taskmgr/taskmgr')
			}
		  })
	    }}])
  }
  onPanelClose = key => () =>{
  	this.setState({[key]: false});
  }

  customDay = ()=>{
  	
  }

  menuChange = (e)=>{
  	if (e == 3){
  		this.setState({customPanelVisible:true, repeatPanelVisible: false});
  	}
  	else{
  		this.setState({
  			data: {...this.state.data, repeatClicked: this.state.menuData[e].value},
  			repeatPanelVisible: false
  		})
  	}
  }

  repeatContentRender = ()=>{
  	const {menuData, data, cusMenuData} = this.state;
  	if (data.repeatClicked){
  		if (Array.isArray(data.repeatClicked)){
  			var retContent = '';
  			data.repeatClicked.map((item)=>{
  				retContent = retContent + cusMenuData[item].label + ',';
  			});
  			return retContent.slice(0, -1);
  		}
  		else{
  			return menuData[data.repeatClicked].label;
  		}
  	}
  	else{
  		return menuData[0].label;
  	}

  	{menuData[data.repeatClicked ? (Array.isArray(data.repeatClicked) ? 3 : data.repeatClicked) : 0].label}
  }

  render() {
  	
  	const { taskData, isNew } = this.props;
  	const { menuData, data, repeatMenuData } = this.state;
  	const { getFieldProps } = this.props.form;
    return (
      <div>
      	 {
      	 	this.state.currentIndex == -1 ? 
      	 	'' : 
      	 	<Button 
      	 		icon="cross-circle" 
      	 		onClick = {this.handleDelete}
      	 		style={{ bottom: '50px', width: '100%', position: 'fixed', color: 'red' }}>
      	 		删除任务</Button>
      	 }
      	 <Modal
		 	popup
		 	style={{ bottom: '50px', width: '100%'}}
		 	visible={this.state.repeatPanelVisible}
		 	onClose={this.onPanelClose('repeatPanelVisible')}
		 	animationType='slide-up'
		 	>
		 	<List renderHeader={() => <div>重复</div>} className="popup-list">
	            <Menu
			        className={styles.singleFooMenu}
			        data={menuData}
			        value={[data.repeatClicked ? (Array.isArray(data.repeatClicked) ? 3 : data.repeatClicked) : 0]}
			        level={1}
			        onChange={this.menuChange}
			        height={document.documentElement.clientHeight * 0.28} />
	            <List.Item>
	              <Button type="primary" onClick={()=>{this.setState({repeatPanelVisible: false})}}>取消</Button>
	            </List.Item>
	        </List>
		 </Modal>
		 <Modal
		 	popup
		 	style={{ bottom: '50px', width: '100%'}}
		 	visible={this.state.customPanelVisible}
		 	onClose={this.onPanelClose('customPanelVisible')}
		 	animationType='slide-up'
		 	>
		 	<List renderHeader={() => <div>自定义</div>} className="popup-list">
	            <Menu
			        className={styles.singleFooMenu}
			        data={this.state.cusMenuData}
			        level={1}
			        onOk={(value)=>{
			        	console.log(value);
			        	this.setState({
				        	data: {...data, repeatClicked: value},
				        	customPanelVisible:false, 
				        	repeatPanelVisible: false})
			    	}}
	        		onCancel={()=>{this.setState({customPanelVisible:false, repeatPanelVisible: true})}}
			        height={document.documentElement.clientHeight * 0.55} 
			        multiSelect />
	        </List>
		 </Modal>
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
              <div style={{float: 'right', color: '#222'}}><span style={{display: 'flex', alignItems: 'center'}}>{this.repeatContentRender()}<Icon style={{marginTop: '2px'}} type="right"></Icon></span></div>
            </div>
          </List.Item>
         </List>
		 
      </div>
    );
  }
}