import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  WingBlank,
  WhiteSpace,
  NavBar,
  Icon,
  Button,
  Modal,
  Toast,
  Tag,
  List,
} from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
import { getUserId } from '@/utils/user';
import IconFont from '@/utils/IconFont';
const alert = Modal.alert;
@connect(({ strategy }) => ({
  strategy,
}))
export default class StrategyMgr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strategyList: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/fetch',
      payload: {
        queryId: 'Strategy',
        userId: getUserId(),
      },
      callback: response => {
        this.setState({
          ...this.state,
          strategyList: response.data.Strategy.data,
        });
      },
    });
  }

  deleteStrategy = (item, index) => {
    const { dispatch } = this.props;
    alert('删除', '确定删除？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          dispatch({
            type: 'strategy/remove',
            payload: {
              ID: item.ID,
              index: index,
            },
            callback: () => Toast.success('删除成功', 2),
          });
        },
      },
    ]);
  };
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.push('/my/setting');
          }}
          rightContent={[<Icon key="1" type="ellipsis" />]}
        >
          策略管理
        </NavBar>

        <List className="my-list">
          {this.state.strategyList.map((item, index) => {
            return (
              <WingBlank size="sm">
                <WhiteSpace size="sm" />
                <Card>
                  <Card.Header
                    title={item.TITLE}
                    style={{ background: '#E6E6FA' }}
                    thumb={
                      <IconFont
                        type={item.TYPE === 'week' ? 'icon-zhou' : 'icon-yue'}
                        style={{ fontSize: '24px' }}
                      />
                    }
                    extra={
                      <IconFont
                        type={item.VALID ? 'icon-shengxiaoriqi' : 'icon-shixiao'}
                        style={{ fontSize: '24px' }}
                      />
                    }
                  />
                  <Card.Body>
                    <div>{item.DESCRIPTION}</div>
                  </Card.Body>
                  <Card.Footer
                    content={
                      <IconFont
                        type={item.USER_ID === 'system' ? 'icon-xitong1' : 'icon-zidingyi'}
                        style={{ fontSize: '24px' }}
                      />
                    }
                    extra={
                      item.USER_ID === 'system' ? null :
                      <div>
                        <IconFont style={{ fontSize: '24px' }} type="icon-bianji" />
                        <IconFont
                          style={{ fontSize: '24px' }}
                          type="icon-delete"
                          onClick={() => {
                            this.deleteStrategy(item, index);
                          }}
                        />
                      </div>
                    }
                  />
                </Card>
              </WingBlank>
            );
          })}
          <Item>
            <Button icon="check-circle-o" onClick={() => router.push('/my/strategy/add')}>
              添加策略
            </Button>
          </Item>
        </List>
      </div>
    );
  }
}
