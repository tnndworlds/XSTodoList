import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Flex,
  Card,
  WingBlank,
  NavBar,
  Icon,
  InputItem,
  List,
  Switch,
  Toast,
  Button,
  Range,
  Grid,
} from 'antd-mobile';
import { Radio, Checkbox } from 'antd';
import router from 'umi/router';
const Item = List.Item;
import IconFont from '@/utils/IconFont';
import { createForm } from 'rc-form';
import styles from './add.less';
import { getUserId } from '@/utils/user';
import { arrayToString } from '@/utils/DataAdapter';
@connect(({ strategy }) => ({
  strategy,
}))
class StrategyAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strategyList: [],
      currentIndex: -1,
      currentStrategy:{},
      type: 'week',
      checkValue:[]
    };
  }

  componentDidMount() {
    const {
      strategy: { strategyList, currentIndex },
    } = this.props;
    console.log(strategyList[currentIndex].PARAM.replace(/-/g, '').split(','));
    this.setState({
      ...this.state,
      strategyList: strategyList,
      currentIndex: currentIndex,
      type: currentIndex === -1 ? 'week' : strategyList[currentIndex].TYPE,
      currentStrategy: currentIndex == -1 ? {} : strategyList[currentIndex],
      checkValue: currentIndex === -1 ? [] : strategyList[currentIndex].PARAM.replace(/-/g, '').split(',')
    });
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    const { currentIndex } = this.state;
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        var saveData = { ...this.props.form.getFieldsValue() };
        saveData.USER_ID = getUserId();
        saveData.ID = currentIndex == -1 ? null : currentStrategy.ID;
        saveData.TYPE=this.state.type;
        saveData.PARAM = arrayToString(this.state.checkValue, '-', '-', ',');
        dispatch({
          type: currentIndex == -1 ? 'strategy/add' : 'strategy/update',
          payload:saveData,
          callback: response=>{
            Toast.success('策略添加成功', 2);
            router.push('/my/strategy')
          }
        })
      } else {
        alert('Validation failed');
      }
    });


  };

  checkBoxChange = (values)=>{
    console.log(values);
    this.setState({
      ...this.state,
      checkValue: values
    })
  }

  onReset = () => {
    this.props.form.resetFields();
  };

  validateAccount = (rule, value, callback) => {
    if (value && value.length > 2) {
      callback();
    } else {
      callback(new Error('At least four characters for account'));
    }
  };

  getCheckItem = (items)=> {
    var retNodes = [];
    var tmpItems = [];
    items.map((item, index) =>{
      tmpItems.push(item);
      if ((index + 1)%3 == 0 || index === (items.length-1)){
        var tmpNodes = (<WingBlank key={index}><Flex>{
          tmpItems.map((innerItem) => {
              return <Flex.Item key={innerItem.key}><Checkbox value={innerItem.key}>{innerItem.value}</Checkbox></Flex.Item>
          })}
        </Flex></WingBlank>);
        retNodes.push(tmpNodes);
        tmpItems = [];
      }
      
    })
    return retNodes;
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const {strategy: {months, weeks}} = this.props;
    const { type, currentStrategy, currentIndex } = this.state;
    console.log(type);
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.push('/my/strategy');
          }}
        >
          新增策略
        </NavBar>
        <List renderFooter={() => getFieldError('TITLE') && getFieldError('TITLE').join(',')}>
          <InputItem
            {...getFieldProps('TITLE', {
              initialValue: currentIndex == -1 ? '' : currentStrategy.TITLE,
              rules: [
                { required: true, message: '请输入策略名称' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('TITLE')}
            onErrorClick={() => {
              alert(getFieldError('TITLE').join(','));
            }}
            placeholder="名称"
          >
            名称
          </InputItem>
          <InputItem
            {...getFieldProps('DESCRIPTION', {
              initialValue: currentIndex == -1 ? '' : currentStrategy.DESCRIPTION,
              rules: [
                { required: true, message: '请输入策略名称' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('DESCRIPTION')}
            onErrorClick={() => {
              alert(getFieldError('DESCRIPTION').join(','));
            }}
            placeholder="描述信息"
          >
            描述
          </InputItem>
          <Item extra={
            <Flex justify="end">
              <Radio.Group {...getFieldProps('TYPE', { valuePropName: 'TYPE' })}
                   value={type}
                    onChange={(type)=>{
                      console.log(type.target.value);
                      this.setState({
                        ...this.state,
                        type: type.target.value
                      })
                    }}>
                <Radio.Button value="week">周</Radio.Button>
                <Radio.Button value="month">月</Radio.Button>
              </Radio.Group>
            </Flex>}>
            类型
          </Item>
          <Item>
          <Flex justify='end'>
            <Checkbox.Group 
              {...getFieldProps('PARAM', { valuePropName: 'param' })}
              value={this.state.checkValue}
              style={{ width: '100%' }} onChange={this.checkBoxChange}>
              {
                type === 'month' ? 
                  this.getCheckItem(months)
                :  this.getCheckItem(weeks)
                
              }
            </Checkbox.Group>
          </Flex>
          </Item>
          <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>
              提交
            </Button>
            <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>
              重置
            </Button>
          </Item>
        </List>
      </div>
    );
  }
}

export default createForm()(StrategyAdd);
