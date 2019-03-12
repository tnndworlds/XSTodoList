import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {NavBar, Icon, WingBlank, Tabs, Badge, Card, WhiteSpace, Button, Grid, Modal, Popover, List } from 'antd-mobile';
const alert = Modal.alert;
const Item = List.Item;
const prompt = Modal.prompt;
const Brief = Item.Brief;
import router from 'umi/router';
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
@connect(({ daytask }) => ({
  daytask
}))
export default class MTaskMgr extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		currentTab: 'view',
  		visible: false,
  		selected: '',
  	}
  }

  tabChange = (e) => {
  	console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }	
  onValueChange = (value) => {
    console.log(value);
  }
  getPrompt = (e)=>{
  	return (
		prompt('','备注信息', [
		{
			text: '取消'
		},
		{
			text: '打卡', onPress: remark => console.log(remark)
		}
		]));
  }
  tagsClick = (e)=>{
  	console.log(e);
  	this.getPrompt(e);
  }

  addOrUpdateTask = (task)=>{
	return (<Button 
			type="ghost" 
			size="small" 
			inline
			onClick={()=>{
				router.push('/taskmgr/addtask');
			}}>编辑</Button>);
  }

  recoverTodo = (task, index)=>{
  	const { dispatch } = this.props;
	return (<Button 
		type="ghost" 
		size="small" 
		inline
		onClick={()=>{
			alert('','确定重做？', [
	    	{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
	    	{
	    	  text: '确定', onPress: () => {
	          task.todo = false;
	          dispatch({
	            type: 'daytask/todoTask',
	            payload:{
	              index: index,
	              data: task
	            }
	          })
	        }}])
		}}>ReDo</Button>);
  }

  getLeftContent = ()=>{
  	const tabs = [
  		{title: <strong>查看</strong>, key: 'view'},
  		{title: <strong>任务</strong>, key: 'task'}
  	];
  	return (
		<Tabs 
	  	    style={{width: '100%'}}
	  	    tabBarTextStyle={{color: 'black'}}
	  		tabs={tabs}
	  		initalPage={1}
	  		onChange={(tab, index) => {this.setState({currentTab: tab.key})}}>
	  	</Tabs>
  	)}

  getContent = (type)=> {
  	const { daytask } = this.props;
  	console.log(daytask);
  	var retNodes = [];
	switch(type) {
  		case 'task':
  			return (<div>
  			{daytask.taskList.map((task)=>{
      				return (
  						<div key={task.title}>
      						<WhiteSpace size="xs" />
					        <Card full>
						      <Card.Header
						        title={task.title}
						        extra={this.addOrUpdateTask(task)}/>
						      <Card.Body>
						        <div>{task.description}</div>
						      </Card.Body>
						      <Card.Footer content={task.plan} extra={<div>{task.ref}</div>} />
						    </Card>
					    </div>
  					)
      			})}
      		</div>)
  		case 'view':
  			return (<List className="my-list">
		      			{daytask.taskList.map((task, index)=>{
		      				return task.todo ? (
		              			<Item extra={this.recoverTodo(task, index)}>{task.title} <Brief>{task.description}</Brief></Item>  
		  					) : null;
		      			})}
		          </List>)		
  		}
  }

  handleVisibleChange = (visible) => {
	this.setState({
	  visible,
	});
  };

  onSelect = (opt) => {
    console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  render() {
  	const { daytask } = this.props;
  	
    return (
      <WingBlank size="sm">
      	<NavBar
      	  style={{align:'left'}}
	      mode="light"
	      leftContent={this.getLeftContent()}
	      rightContent={[
	        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
	        <Popover mask
	            overlayClassName="fortest"
	            overlayStyle={{ color: 'currentColor' }}
	            visible={this.state.visible}
	            overlay={[
	              (<Popover.Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">周期任务</Popover.Item>),
	              (<Popover.Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>目标任务</Popover.Item>),
	              (<Popover.Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
	                <span style={{ marginRight: 5 }}>快速任务</span>
	              </Popover.Item>),
	            ]}
	            align={{
	              overflow: { adjustY: 0, adjustX: 0 },
	              offset: [-10, 0],
	            }}
	            onVisibleChange={this.handleVisibleChange}
	            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              添加
            </div>
          </Popover>
	      ]}>
	      </NavBar>
	      <div>
	     	 {this.getContent(this.state.currentTab)}
	      </div>
      </WingBlank>
    );
  }
}