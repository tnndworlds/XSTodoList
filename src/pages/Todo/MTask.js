import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Tabs, WingBlank, Badge, Card, WhiteSpace, Button, Grid, Modal, List  } from 'antd-mobile';
const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import { getUserId } from '@/utils/user';

@connect(({ daytask }) => ({
  daytask
}))
export default class MTask extends React.Component {

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'daytask/fetch',
      payload:{
        queryId: 'queryTodos',
        userId: getUserId()
      }
    });
  }

  tabChange = (e) => {
  	console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }	

  onValueChange = (value) => {
    console.log(value);
  }

  getPrompt = (data, index, type)=>{
    const { dispatch } = this.props;
    var saveData = {};
    saveData.PUNCH_TYPE = type;
    saveData.TASK_ID = data.id;
    saveData.USER_ID = getUserId();
    saveData.PUNCH_DATE = moment().format('YYYYMMDD');
  	return (
  		prompt('','备注信息', [
    	{
    		text: '取消'
    	},
    	{
    		text: '打卡', onPress: remark => {
          saveData.REMARK = remark;
          dispatch({
            type: 'daytask/punch',
            payload:{
              index: index,
              punchType: type,
              data: saveData
            }
          })
        }
    	}
    	]));
  }

  tagsClick = (e, index)=>{
  	console.log(e);
  	this.getPrompt(e, index, 2);
  }

  render() {
  	const { daytask } = this.props;
  	var tabs = [
  		{title: <Badge text={daytask.taskList.length + ''}>任务列表</Badge>},
  		{title: <Badge text={daytask.tagList.length + ''}>日常打卡</Badge>}
  	];
    return (
      <WingBlank size="sm">
      	<Tabs 
      	  style={{width: '100%'}}
      		tabs={tabs}
      		initalPage={1}
      		onChange={(tab, index) => {console.log('onTabClick', index, tab)}}>
      		<div style={{ alignItems: 'center', justifyContent: 'center'}}>
            <List className="my-list">
        			{daytask.taskList.map((task, index)=>{
        				return task.TODO ? null : (
                <Item key={task.NAME} onClick={()=> this.getPrompt(task, index, 1)}>{task.NAME} <Brief>{task.DESCRIPTION}</Brief></Item>  
    					)
        			})}
            </List>
	        </div>
	        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
		        <Grid data={daytask.tagList} columnNum={3} onClick={this.tagsClick}/>
	      	</div>
      	</Tabs>
      </WingBlank>
    );
  }
}