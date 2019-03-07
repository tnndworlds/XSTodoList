import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Tabs, WingBlank, Badge, Card, WhiteSpace, Button, Grid, Modal  } from 'antd-mobile';
const prompt = Modal.prompt;

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

  tagsClick = (e)=>{
  	console.log(e);
  	prompt('', e.text + '-备注信息', [
		{
			text: '取消'
		},
		{
			text: '打卡', onPress: remark => console.log(remark)
		}
	])
  }
  punchBtn = ()=>{
	return (<Button type="ghost" size="small" inline
			onClick={()=> prompt('', '备注信息', [
					{
						text: '取消'
					},
					{
						text: '打卡', onPress: remark => console.log(remark)
					}
				])}>打卡</Button>);
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
      			{daytask.taskList.map((task)=>{
      				return (
  						<div key={task.title}>
      						<WhiteSpace size="xs" />
					        <Card full>
						      <Card.Header
						        title={task.title}
						        extra={this.punchBtn()}/>
						      <Card.Body>
						        <div>{task.description}</div>
						      </Card.Body>
						      <Card.Footer content={task.plan} extra={<div>{task.ref}</div>} />
						    </Card>
					    </div>
  					)
      			})}
	        </div>
	        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
		        <Grid data={daytask.tagList} columnNum={3} onClick={this.tagsClick}/>
	      	</div>
      	</Tabs>
      </WingBlank>
    );
  }
}