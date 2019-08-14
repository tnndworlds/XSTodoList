import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List, Button} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
import { getUserId } from '@/utils/user';
@connect(({ qtask }) => ({
  qtask
}))
export default class QTaskMgr extends React.Component {
  constructor(props){
	  super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'qtask/fetch',
      payload: {
        queryId: 'QTask',
        userId: getUserId(),
      },
    });
  }

  deleteQTask = (index)=>{

  }
  newQTask = () => {
	const { dispatch } = this.props;
    dispatch({
      type: 'qtask/setCurrentQTask',
      payload: -1
    })
    router.push('/my/qtask/add')
  }
  editQTask = () =>{

  }
  render() {
	  const { qtask: {qtaskList} } = this.props;
	  console.log(qtaskList);
    return (
      <div>
      	<NavBar
	      mode="light"
	      icon={<Icon type="left" />}
	      onLeftClick={() => {router.push('/my/setting')}}
	      rightContent={[
	        <Icon key="1" type="ellipsis" />,
	      ]}>快速备忘</NavBar>

	    <List className="my-list">
	        {
		    	qtaskList.map((qtask, index)=>{
		    		return (<Item key={qtask.TITLE}>
								<div style={{float: 'left'}} onClick={()=>this.editQTask(index)}>{qtask.TITLE}--{qtask.DOING_DATE}</div>
								<Icon type='cross'  style={{float: 'right'}} onClick={() => {this.deleteQTask(index)}}/>
							</Item>)
		    	})
			}
			<Item>
	            <Button icon="check-circle-o" onClick={() => this.newQTask()}>
	              快速备忘
	            </Button>
	        </Item>
     	</List>
      </div>
    );
  }
}