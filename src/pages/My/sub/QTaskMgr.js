import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
@connect(({ qtask }) => ({
  qtask
}))
export default class QTaskMgr extends React.Component {
  constructor(props){
  	super(props);
  }
  deleteTag = (index)=>{

  }
  render() {
  	const { qtask: {qtaskList} } = this.props;
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
		    		return (<Item>
		    					<div style={{float: 'left'}}>{qtask.label}</div>
		    				</Item>)
		    	})
		    }
     	</List>
	    
      </div>
    );
  }
}