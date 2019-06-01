import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, NavBar, Icon, Tag, List, Switch,Modal,Toast, Button, SwipeAction} from 'antd-mobile';
import router from 'umi/router';
import { getUserId } from '@/utils/user';
import IconFont from '@/utils/IconFont';
const Item = List.Item;
const alert = Modal.alert;
@connect(({ tags }) => ({
  tags
}))
export default class TagsMgr extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		tagList: []
  	}
  }

  componentDidMount(){
  	const { dispatch } = this.props;
  	dispatch({
      type: 'tags/fetch',
      payload:{
        queryId: 'Tags',
        userId: getUserId()
      },
      callback:(response)=>{
      	this.setState({
      		...this.state,
      		tagList: response.data.Tags.data
      	})
      }
    });
  }

  deleteTag = (index)=>{

  }

  renderItems = (tag, index) =>{
  	const { dispatch } = this.props;
  	return (
  			<SwipeAction
		      style={{ backgroundColor: 'gray' }}
		      autoClose
		      right={[
		        {
		          text: tag.VALID ? '取显' : '显示',
		          onPress: () => {
		          	var data = {};
		          	data.data = {
		          		ID: tag.ID,
		          		VALID: !tag.VALID
		          	};
		          	data.index = index;
		          	dispatch({
		          		type:'tags/update',
		          		payload: data
		          	});
		          },
		          style: { backgroundColor: '#108ee9', color: 'white' },
		        },
		        {
		          text: '删除',
		          onPress: () => {
		            alert('删除', '将会同步删除打卡数据，确定删除？', [
		            	{text: '取消', onPress: ()=>console.log('cancel')},
		            	{text: '确定', onPress: ()=>{
							dispatch({
				          		type:'tags/remove',
				          		payload: {
				          			ID: tag.ID,
				          			index: index
				          		},
				          		callback: ()=>Toast.success('删除成功', 2)
				          	});
		            	}}
		            ])	
		          },
		          style: { backgroundColor: '#F4333C', color: 'white' },
		        },
		      ]}
		      onOpen={() => console.log('global open')}
		      onClose={() => console.log('global close')}
		    >
		      <Item 
				thumb={<IconFont 
		            type={tag.ICON}
		            style={{ 
		              fontSize: '24px'
		            }} />}
		         >
                <div style={{float: 'left'}}>{tag.TITLE}</div>
                <IconFont 
		            type={tag.VALID ? 'icon-xianshi' : 'icon-look'}
		            style={{ 
		              fontSize: '24px',
		              float: 'right'
		            }} />
			  </Item>
		    </SwipeAction>
  		)
  }

  render() {
  	const { tagList } = this.state;
    return (
      <div>
      	<NavBar
	      mode="light"
	      icon={<Icon type="left" />}
	      onLeftClick={() => {router.push('/my/setting')}}
	      rightContent={[
	        <Icon key="1" type="ellipsis" />,
	      ]}>标签管理</NavBar>
		<List className="my-list">
	        {
		    	tagList.map((tag, index)=>{
		    		return this.renderItems(tag, index)
		    	})
		    }
		    <Item>
		      <Button icon="check-circle-o" onClick={()=> router.push('/my/tags/add')}>添加标签</Button>
			</Item>
			
     	</List>
      </div>
    );
  }
}