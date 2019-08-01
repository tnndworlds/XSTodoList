import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List, Button} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
import { getUserId } from '@/utils/user';
@connect(({ goals }) => ({
  goals
}))
export default class GoalsMgr extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		goalsList : []
  	}
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goals/fetch',
      payload: {
        queryId: 'Goals',
        userId: getUserId(),
      },
      callback: response => {
        this.setState({
          ...this.state,
          goalsList: response.data.Goals.data,
        });
      },
    });
  }

  deleteGoal = (index)=>{
	  	
  	console.log(index);
  }

  editGoal = (index) =>{
  	const { goalsList } = this.state;
  	console.log(goalsList[index]);
  }

  render() {
  	const { goalsList } = this.state;
    return (
      <div>
      	<NavBar
	      mode="light"
	      icon={<Icon type="left" />}
	      onLeftClick={() => {router.push('/my/setting')}}
	      rightContent={[
	        <Icon key="1" type="ellipsis" />,
	      ]}>目标管理</NavBar>

	    <List className="my-list">
	        {
		    	goalsList.map((goal, index)=>{
		    		return (<Item>
		    					<div style={{float: 'left'}} onClick={()=>this.editGoal(index)}>{goal.TITLE}</div>
		    					<Icon type='cross'  style={{float: 'right'}} onClick={() => {this.deleteGoal(index)}}/>
		    				</Item>)
		    	})
		    }
		    <Item>
	            <Button icon="check-circle-o" onClick={() => router.push('/my/goals/add')}>
	              添加目标
	            </Button>
	        </Item>
     	</List>
	    
      </div>
    );
  }
}