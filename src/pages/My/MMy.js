import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank, List} from 'antd-mobile';
import router from 'umi/router';
import IconFont from '@/utils/IconFont';
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
            thumb={<IconFont 
              type="icon-food-popcorn" 
              style={{ 
                fontSize: '24px'
              }} />}/>
          <Card.Body>
            <div>Nothing to say...</div>
          </Card.Body>
          <Card.Footer content={currentUser.description} extra={<div>{currentUser.email}</div>} />
        </Card>

        <List style={{marginTop: '10px'}}>
          <Item
            thumb={<IconFont 
              type="icon-beiwang" 
              style={{ 
                fontSize: '24px'
              }} />}
            onClick={() => {router.push('/my/qtask')}}
            arrow="horizontal"
          >
            备忘
          </Item>
          <Item
            thumb={<IconFont 
              type="icon-icon--" 
              style={{ 
                fontSize: '24px'
              }} />}
            arrow="horizontal"
            onClick={() => {router.push('/my/tags')}}
          >标签</Item>
          <Item
            thumb={<IconFont 
              type="icon-mubiao" 
              style={{ 
                fontSize: '24px'
              }} />}
            onClick={() => {router.push('/my/goals')}}
            arrow="horizontal"
          >
            目标
          </Item>
          <Item
            thumb={<IconFont 
              type="icon-celve" 
              style={{ 
                fontSize: '24px'
              }} />}
            onClick={() => {router.push('/my/strategy')}}
            arrow="horizontal"
          >
            策略
          </Item>
        </List>
      </WingBlank>
    );
  }
}