import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List, Button, Modal} from 'antd-mobile';
import router from 'umi/router';
const alert = Modal.alert;
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
    const { goalsList } = this.state;
	  const { dispatch } = this.props;

     const alertInstance = alert('', '确认删除该目标?', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确认', onPress: () => {
          dispatch({
            type: 'goals/remove',
            payload: goalsList[index]
          })
        } },
      ]);
    
  }

  editGoal = (index) =>{
  	const { goalsList } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'goals/setCurrentGoal',
      payload: index
    })
    router.push('/my/goals/add');
  }

  newGoal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goals/setCurrentGoal',
      payload: -1
    })
    router.push('/my/goals/add')
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
		    		return (<Item key={goal.TITLE}>
		    					<div style={{float: 'left'}} onClick={()=>this.editGoal(index)}>{goal.TITLE}</div>
		    					<Icon type='cross'  style={{float: 'right'}} onClick={() => {this.deleteGoal(index)}}/>
		    				</Item>)
		    	})
		    }
		    <Item>
	            <Button icon="check-circle-o" onClick={() => this.newGoal()}>
	              添加目标
	            </Button>
	        </Item>
     	</List>
	    
      </div>
    );
  }
}