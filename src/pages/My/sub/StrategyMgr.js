import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
@connect(({ tags }) => ({
  tags
}))
export default class StrategyMgr extends React.Component {
  constructor(props){
  	super(props);
  }
  deleteTag = (index)=>{

  }
  render() {
  	const { tags: {tagList} } = this.props;
  	console.log(tagList);
    return (
      <div>
      	<NavBar
	      mode="light"
	      icon={<Icon type="left" />}
	      onLeftClick={() => {router.push('/my/setting')}}
	      rightContent={[
	        <Icon key="1" type="ellipsis" />,
	      ]}>策略管理</NavBar>

	    <List className="my-list">
	        {
		    	tagList.map((tag, index)=>{
		    		return (<Item extra={tag.extra} >
		    					<div style={{float: 'left'}}>{tag.label}</div>
		    					<Icon type='cross'  style={{float: 'right'}} onClick={() => {this.deleteTag(index)}}/>
		    				</Item>)
		    	})
		    }
     	</List>
	    
      </div>
    );
  }
}