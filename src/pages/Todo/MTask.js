import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Tabs, WingBlank, Badge, Card, WhiteSpace, Button, Grid, Modal, List  } from 'antd-mobile';
const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

@connect(({ daytask }) => ({
  daytask
}))
export default class MTask extends React.Component {
  tabChange = (e) => {
  	console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }	
  onValueChange = (value) => {
    console.log(value);
  }

  getPrompt = (data, index)=>{
    const { dispatch } = this.props;
  	return (
  		prompt('','备注信息', [
    	{
    		text: '取消'
    	},
    	{
    		text: '打卡', onPress: remark => {
          data.todo = true;
          data.remark = remark;
          dispatch({
            type: 'daytask/todoTask',
            payload:{
              index: index,
              data: data
            }
          })
          console.log(remark, data, index)
        }
    	}
    	]));
  }
  tagsClick = (e)=>{
  	console.log(e);
  	this.getPrompt(e);
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
      				return task.todo ? null : (
              <Item onClick={()=> this.getPrompt(task, index)}>{task.title} <Brief>{task.description}</Brief></Item>  
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