import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import * as moment from 'moment';
import { WingBlank, 
	WhiteSpace,
	SegmentedControl,
	Flex,
	Icon
 } from 'antd-mobile';
import router from 'umi/router';
import styles from './MTaskMgr.less'
import { getUserId } from '@/utils/user';

@connect(({ tquery }) => ({
	tquery
}))
export default class MTaskMgr extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
		  viewType: 'week',
		  minValue: moment().day(1),
		  maxValue: moment().day(7),
		  monthValue: moment()
  	}
  }

  componentDidMount(){
	  const { dispatch } = this.props;
  	dispatch({
  		type:'tquery/fetch',
  		payload:{
  			queryId: 'AllTasks',
  			userId: getUserId(),
  			conMap:{}
  		}
  	});
  }

  viewTypeChange = (value) =>{
	  console.log(value);
  }

  viewTypeValueChange = (value) => {
	  this.setState({
		  ...this.state,
		  viewType: value === '周' ? 'week' : 'month'
	  })
  }

  leftClick = () => {
	  this.state.viewType === 'week' ?
	  this.setState({
		...this.state,
		minValue: moment(this.state.minValue).subtract(7, 'day'),
		maxValue: moment(this.state.maxValue).subtract(7, 'day')
	  }) :
	  this.setState({
		  ...this.state,
		  monthValue: moment(this.state.monthValue).subtract(1, 'month')
	  })
  }

  rightClick = () => {
	this.state.viewType === 'week' ?
	this.setState({
		...this.state,
		minValue: moment(this.state.minValue).add(7, 'day'),
		maxValue: moment(this.state.maxValue).add(7, 'day')
	  }) :
	this.setState({
		...this.state,
		monthValue: moment(this.state.monthValue).add(1, 'month')
	})
}

  render() {
  	const { tquery: { modules } } = this.props;
  	
    return (
      <div style={{background: 'white'}}>
		  <WingBlank size='lg'>
			<div>
				<WhiteSpace/>
					<div style={{fontSize: '20px'}}>统计</div>
				<WhiteSpace/>
			</div>
		  </WingBlank>
		  
		 
		  <WingBlank size='sm'>
			<Flex>
				<Flex.Item>
					<SegmentedControl style={{width: '70%'}}
						values = {['周', '月']}
						onChange={this.viewTypeChange}
						onValueChange={this.viewTypeValueChange}
					/>
				</Flex.Item>
				<Flex.Item align='end'>
					<Icon type="left" style={{fontSize:'30pxgggg'}} onClick={this.leftClick}/>
					<span style={{fontSize: '20px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '3px'}}>
							{this.state.viewType === 'week' ? 
									this.state.minValue.format('MM.DD') + ' - ' + this.state.maxValue.format('MM.DD') : 
									this.state.monthValue.format('YYYY.MM')}
					</span>
					<Icon type="right" style={{fontSize: '24px'}} onClick={this.rightClick}/>
				</Flex.Item>
			</Flex>
		  </WingBlank>
		  <WhiteSpace/>
      </div>
    );
  }
}