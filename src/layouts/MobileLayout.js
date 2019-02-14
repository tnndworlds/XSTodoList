import React, { Suspense } from 'react';
import { Icon } from 'antd';
import { TabBar} from 'antd-mobile';

export default class MobileLayout extends React.PureComponent {
	render() {
		return (<div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
		            <TabBar 
		              unselectedTintColor="#949494"
		              tintColor="#33A3F4"
		              barTintColor="white"
		              tabBarPosition="bottom"
		            >
		              <TabBar.Item
		               title="任务"
		               key="dayTask"
		               icon={<Icon type='check'/>}
		               selectedIcon={<Icon theme="twoTone" type='yahoo'/>}
		               >
		                This is day task
		              </TabBar.Item>
		              <TabBar.Item
		               title="汇总"
		               key="overAll"
		               icon={<Icon type='dashboard'/>}
		               selectedIcon={
		                  <div style={{
		                    width: '22px',
		                    height: '22px',
		                    background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}/>}
		               >
		                This is day task
		              </TabBar.Item>
		              <TabBar.Item
		               title="我的"
		               key="my"
		               icon={
		                  <div style={{
		                    width: '22px',
		                    height: '22px',
		                    background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}/>}
		                selectedIcon={
		                  <div style={{
		                    width: '22px',
		                    height: '22px',
		                    background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}/>}
		               >
		                This is day task
		              </TabBar.Item>
		            </TabBar>
		          </div>);
	}
}