import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import MMy from './MMy';
import WMy from './WMy';

@connect(({ global }) => ({
  global
}))
export default class My extends React.Component {
  render() {
  	const {global} = this.props;
    return (
      <div>
      	{global.isMobile ? <MMy/> : <WMy/>}
      </div>
    );
  }
}