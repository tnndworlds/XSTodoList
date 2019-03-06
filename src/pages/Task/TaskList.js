import React, { Component, Fragment } from 'react';
export default class TaskList extends React.Component {
	
  render() {
  	const {isMobile} = this.props;
    return (
      <div>This is taskList {isMobile}</div>
    );
  }
}