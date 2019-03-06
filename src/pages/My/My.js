import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
@connect(({ global }) => ({
  global
}))
export default class My extends React.Component {
  render() {
  	const {global} = this.props;
    return (
      <div>This is xs {global.isMobile ? "True" : "False"}</div>
    );
  }
}