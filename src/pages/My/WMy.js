import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card, WingBlank} from 'antd-mobile';

@connect(({ user }) => ({
  user
}))
export default class WMy extends React.Component {
  
  render() {
  	const { user } = this.props;
    console.log(user.currentUser);
    return (
      <div>WMy</div>
    );
  }
}