import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import MTaskMgr from './MTaskMgr';
import WTaskMgr from './WTaskMgr';

@connect(({ global }) => ({
  global
}))
export default class Task extends React.Component {
  render() {
  	const {global} = this.props;
    return (
      <div>
      	{global.isMobile ? <MTaskMgr/> : <WTaskMgr/>}
      </div>
    );
  }
}