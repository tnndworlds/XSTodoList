import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, List} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
@connect(({ user, tags }) => ({
  user,
  tags
}))
export default class MMy extends React.Component {
  
  render() {
  	const {  user : {currentUser}, tags: {tagList} } = this.props;
    console.log(currentUser);
    return (
      <WingBlank size="sm">
      	<Card style={{marginTop: '10px'}}>
          <Card.Header
            title={currentUser.name}
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"/>
          <Card.Body>
            <div>Nothing to say...</div>
          </Card.Body>
          <Card.Footer content={currentUser.description} extra={<div>{currentUser.email}</div>} />
        </Card>

        <List style={{marginTop: '10px'}}>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {router.push('/my/tagsmgr')}}
          >标签管理</Item>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
            onClick={() => {}}
            arrow="horizontal"
          >
            设置
          </Item>
        </List>
      </WingBlank>
    );
  }
}