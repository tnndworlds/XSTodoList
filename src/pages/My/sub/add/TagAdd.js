import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Radio,
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
import router from 'umi/router';
const RadioItem = Radio.RadioItem;
const Item = List.Item;
import IconFont from '@/utils/IconFont';
import { createForm } from 'rc-form';
import styles from './add.less';
import { getUserId } from '@/utils/user';
@connect(({ tags }) => ({
  tags,
}))
class TagAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      selectTag: {},
      icon: ['icon-Apple'],
    };
  }

  componentDidMount() {
    const {
      tags: { imgList },
    } = this.props;
    this.setState({
      ...this.state,
      imgList: imgList,
    });
  }

  onSubmit = () => {
    const { dispatch } = this.props;
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        var saveData = { ...this.props.form.getFieldsValue() };
        saveData.ICON = this.state.icon[0];
        saveData.USER_ID = getUserId();
        console.log(saveData);
        dispatch({
          type: 'tags/add',
          payload: saveData,
          callback: response => {
            Toast.success('添加成功', 2);
            router.push('/my/tags');
          },
        });
      } else {
        alert('Validation failed');
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };
  validateAccount = (rule, value, callback) => {
    if (value && value.length >= 2) {
      callback();
    } else {
      callback(new Error('At least four characters for account'));
    }
  };

  itemAdapter = () =>{
    var retItems = [];
    this.state.imgList.map((item)=>{
        var tmpItem = {};
        tmpItem.value = item.value;
        tmpItem.label = (
            <div>
              <span style={{ paddingRight: '5px' }}>
                <IconFont
                  type={item.icon}
                  style={{
                    fontSize: '22px',
                  }}/>
              </span>
              <span>{item.label}</span>
            </div>
          )
        retItems.push(tmpItem);
    });
    return retItems;
  }

  render() {
    const {
      tags: { tagList, imgList },
    } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.push('/my/tags');
          }}
        >
          新增标签
        </NavBar>
        <List renderFooter={() => getFieldError('TITLE') && getFieldError('TITLE').join(',')}>
          <InputItem
            {...getFieldProps('TITLE', {
              // initialValue: 'little ant',
              rules: [
                { required: true, message: '请输入标签名称' },
                { validator: this.validateAccount },
              ],
            })}
            clear
            error={!!getFieldError('TITLE')}
            onErrorClick={() => {
              alert(getFieldError('TITLE').join(','));
            }}
            placeholder="请输入标签名称"
          >
            名称
          </InputItem>
          <Item
            extra={
              <Switch
                {...getFieldProps('VALID', { initialValue: true, valuePropName: 'checked' })}
              />
            }
          >
            是否显示
          </Item>

          <Picker data={this.itemAdapter(this.state.imgList)} cols={1} 
            {...getFieldProps('ICON', {
              initialValue: this.state.icon
            })} className="forss"
            onOk={(value)=>{this.setState({...this.state, icon: value})}}>
            <Item arrow="horizontal">图片</Item>
          </Picker>

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

export default createForm()(TagAdd);
