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
  Picker
} from 'antd-mobile';
import { Radio, Checkbox } from 'antd';
import router from 'umi/router';
const Item = List.Item;
import IconFont from '@/utils/IconFont';
import { createForm } from 'rc-form';
import styles from './add.less';
import { getUserId } from '@/utils/user';
import { arrayToString } from '@/utils/DataAdapter';
@connect(({ goals, strategy }) => ({
  goals,
  strategy
}))
class GoalsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGoal:{},
      strategys: [],
      unit:[
        {
          label: '个',
          value: '个'
        },
        {
          label: '页',
          value: '页'
        },
        {
          label: '千米',
          value: '千米'
        }
      ]
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/fetch',
      payload: {
        queryId: 'Strategy',
        userId: getUserId(),
      }
    });
    const {
      strategy: { strategyList, currentGoals },
    } = this.props;
    var strategys = [];
    console.log(strategyList);
    strategyList.map((item)=>{
      strategys.push({
        label: item.TITLE,
        value: item.ID
      })
    })
    this.setState({
      ...this.state,
      strategys: strategys,
      currentGoals: currentGoals
    })  

  }

  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        var saveData = { ...this.props.form.getFieldsValue() };
        saveData.USER_ID = getUserId();
        dispatch({
          type: 'goals/add',
          payload:saveData,
          callback: response=>{
            Toast.success('策略目标成功', 2);
            router.push('/my/goals')
          }
        })
      } else {
        alert('Validation failed');
      }
    });


  };

  onReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const {goals, strategyList} = this.props;
    const { goal} = this.state;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.push('/my/goals');
          }}
        >
          新增目标
        </NavBar>
        <List renderFooter={() => getFieldError('TITLE') && getFieldError('TITLE').join(',')}>
          <InputItem
            {...getFieldProps('TITLE', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入目标名称' },
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
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入描述信息' },
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
          <InputItem
            {...getFieldProps('REMARK', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入备注信息' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('REMARK')}
            onErrorClick={() => {
              alert(getFieldError('REMARK').join(','));
            }}
            placeholder="备注信息"
          >
            备注
          </InputItem>

          <Picker data={this.state.strategys} cols={1} {...getFieldProps('STRATEGY')} className="forss"
            >
            <Item arrow="horizontal">执行策略</Item>
          </Picker>

          <Item
            extra={<Switch
            {...getFieldProps('QUANTIZATION', {
              initialValue: this.state.quantization,
              valuePropName: 'checked',
              onChange: (val) => {
                console.log(val);
                // Do not `setState` with rc-form
                // this.setState({ checked1: val });
              },
            })}
            onClick={(checked) => {
              this.setState({
                ...this.state,
                quantization: checked
              })
              // set new value
              this.props.form.setFieldsValue({
                QUANTIZATION: checked ? 1 : 0,
              });
            }}/>}>量化</Item>

          {
            this.state.quantization ? 
            <div>
               <InputItem
                {...getFieldProps('COUNT', {
                  // initialValue: 'little ant',
                  rules: [
                    { required: true, message: '数量' },
                    { validator: this.validateAccount },
                  ],
                })}
                clear
                error={!!getFieldError('COUNT')}
                onErrorClick={() => {
                  alert(getFieldError('COUNT').join(','));
                }}
                placeholder="数量"
              >
                数量
              </InputItem>
              <Picker data={this.state.unit} cols={1} {...getFieldProps('UNIT')} className="forss"
                onOk={(value)=>this.props.form.setFieldsValue({'UNIT':value})}>
                <Item arrow="horizontal">单位</Item>
              </Picker>
            </div>
            : null
          }
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

export default createForm()(GoalsAdd);
