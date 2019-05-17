import { TabBar, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import TODO_1 from '../assets/TODO_1.svg';
import TODO_2 from '../assets/TODO_2.svg';
import logo from '../assets/logo.svg';
import IconFont from '@/utils/IconFont';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];

@connect()
export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  render() {
    const {children} = this.props;
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="TODO"
            key="todo"
            icon={<IconFont 
              type="icon-icon_renwujincheng" 
              style={{ 
                fontSize: '22px',
                color: '#8a8a8a' 
              }} />
            }
            selectedIcon={<IconFont 
              type="icon-icon_renwujincheng" 
              style={{ 
                fontSize: '22px', 
                color: '#1296db' 
              }} />
            }
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              router.push('/todo/tasklist');
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {children}
          </TabBar.Item>
          
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}/>
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}/>
            }
            title="任务"
            key="task"
            selected={this.state.selectedTab === 'taskTab'}
            onPress={() => {
              router.push('/taskmgr/taskmgr');
              this.setState({
                selectedTab: 'taskTab',
              });
            }}
            data-seed="logIdTask"
          >
            {children}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              router.push('/my/setting');
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}