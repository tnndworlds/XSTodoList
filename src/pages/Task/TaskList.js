import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import MTask from './MTask';
import WTask from './WTask';

@connect(({ global }) => ({
  global
}))
export default class TaskList extends React.Component {
  render() {
  	const {global} = this.props;
    return (
      <div>
      	{global.isMobile ? <MTask/> : <WTask/>}
      </div>
    );
  }
}