import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ global }) => ({
  global
}))
export default class WTaskMgr extends React.Component {
  render() {
  	const {global} = this.props;
    return (
      <div>
      	this is task page.
      </div>
    );
  }
}