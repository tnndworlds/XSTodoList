import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Tabs, WingBlank, Badge, Card, WhiteSpace, Button, Grid, Modal, List  } from 'antd-mobile';
const prompt = Modal.prompt;
const alert = Modal.alert;
const Item = List.Item;
import IconFont from '@/utils/IconFont';
const Brief = Item.Brief;

import { getUserId } from '@/utils/user';

@connect(({ goals, tags }) => ({
  goals,
  tags
}))
export default class MTask extends React.Component {

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'goals/fetch',
      payload:{
        queryId: 'Goals',
        userId: getUserId()
      }
    });
    dispatch({
      type: 'tags/fetch',
      payload:{
        queryId: 'Tags',
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
    console.log(data);
    var saveData = {};
    saveData.PUNCH_TYPE = type;
    saveData.TASK_ID = data.ID;
    saveData.USER_ID = getUserId();
    saveData.PUNCH_DATE = moment().format('YYYYMMDD');

  	return (
      data.TODO ?
      alert('取消打卡', '您确定要取消本次打卡？',[
        {
          text: '取消'
        },
        {
          text: '确定', onPress: remark => {
            saveData.REMARK = remark;
            dispatch({
              type: type + '/cancelpunch',
              payload:{
                index: index,
                id: data.punchId
              }
            })
          }
        }
        ]) 
      :
  		prompt('打卡','备注信息', [
    	{
    		text: '取消'
    	},
    	{
    		text: '确定', onPress: remark => {
          saveData.REMARK = remark;
          dispatch({
            type: type + '/punch',
            payload:{
              index: index,
              data: saveData
            }
          })
        }
    	}
      ])
      
      
      );
  }

  tagsClick = (e, index)=>{
  	console.log(e);
  	this.getPrompt(e, index, 'tags');
  }

  render() {
  	const { goals, tags } = this.props;
  	var tabs = [
  		{title: <Badge text={goals.goalsList.length + ''}>任务列表</Badge>},
  		{title: <Badge text={tags.tagList.length + ''}>日常打卡</Badge>}
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
        			{goals.goalsList.map((goal, index)=>{
        				return goal.dayValid ? (
                  <Item key={goal.TITLE} onClick={()=> this.getPrompt(goal, index, 'goals')}>
                    {goal.TITLE}--{goal.TODO}
                   <Brief>{goal.DESCRIPTION}</Brief></Item>  
    				  	) : null
        			})}
            </List>
	        </div>
	        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <Grid data={tags.tagList} 
                  columnNum={3} 
                  onClick={this.tagsClick}
                  renderItem={dateItem => (
                    <div style={{padding: '12.5px'}}>
                      <IconFont
                        type={dateItem.ICON}
                        style={{
                          fontSize: '22px',
                        }}/>
                      <div style={{color: '#888', fontSize: '14px', marginTop:'12px'}}>
                        <span>{dateItem.text}</span>
                      </div>
                    </div>
                  )}
                  />
	      	</div>
      	</Tabs>
      </WingBlank>
    );
  }
}