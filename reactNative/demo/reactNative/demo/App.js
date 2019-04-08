/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, TextInput, Alert } from 'react-native';

import PlatTest from './src/platform/p'

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
        editable={true}
      />
    );
  }
}


export default class App extends Component {
  state = {
    text:"圣诞节发生了的飞机上来看的房间里速度快放假蓄电池股份是电饭锅水电费无事故发生归属感是干啥帝国时代大范甘迪发鬼地方给对方了圣诞节发生了的飞机上来看的房间里速度快放假蓄电池股份是电饭锅水电费无事故发生归属感是干啥帝国时代大范甘迪发鬼地方给对方了圣诞节发生了的飞机上来看的房间里速度快放假蓄电池股份是电饭锅水电费无事故发生归属感是干啥帝国时代大范甘迪发鬼地方给对方了圣诞节发生了的飞机上来看的房间里速度快放假蓄电池股份是电饭锅水电费无事故发生归属感是干啥帝国时代大范甘迪发鬼地方给对方",
    text2: undefined
  }
  componentDidMount() {
    console.log(Platform, Platform.OS, Platform.isTesting, Platform["isTV"], 111)
    // fetch('http://op.juhe.cn/onebox/weather/query')
    // fetch('https://ditu.amap.com/service/regeo?longitude=121.04925573429551&latitude=31.315590522490712')
    //   .then(res => {
    //     console.log(res, "fetch result")
    //     return res.json();
    //   })
    //   .then(res => {
    //     console.log(res, 333)
    //   })
    //   .catch(err => {
    //     console.log(err, 444)
    //   })
  }
  inputChange(text) {
    console.warn(this.state.text2)
    this.setState({
      text2:text
    })
  }
  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
  pressText(ev) {
    // ev.persist()
    console.log(ev)
  }
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <View

        style={styles.con}
      >
        <PlatTest />
        <View
          style={{
            fontWeight: "900",
            fontSize: 40,
            borderWidth: 1,
            width: "100%",
            // borderColor:"green",
            borderTopColor: "red",
            borderStartColor: "yellow",
            borderEndColor: "green",
          }}
        >
          <Text
            onPress={ev => this.pressText(ev)}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            <Text
              selectable={true}
            >用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。
  
此属性一般和ellipsizeMode搭配使用。</Text>
          </Text>
        </View>
        <View
          style={{
            height:190,
            width:"100%",
            backgroundColor: "red",
            borderBottomColor: '#000000',
            borderWidth: 2,
            padding:0
          }}
        >
          <UselessTextInput
            style={{
              height:"100%",
              padding:0
            }}
            multiline={true}
            numberOfLines={5}
            value={this.state.text}
          />
        </View>
        <TextInput
          defaultValue="defaultValue"
          value={ this.state.text2 }
          onChangeText= { ev=>this.inputChange(ev) }
          style={{
            width:"100%",
            height:50,
            borderWidth:1,
            borderColor:"yellow"
          }}
        />
        <Image
          style={{
            width: 200,
            // height:null
            resizeMode: "contain"
          }}
          source={require('./assets/imgs/1.gif')} />
        <Image
          // width="null"
          // height="null"
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain"
          }}
          source={{ uri: "https://p.upyun.com/demo/webp/animated-gif/0.gif" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:Platform.OS === 'ios' ? "#ccc" : '#adf',
    backgroundColor: '#adf',
    // ...Platform.select({
    //   "ios": {
    //     backgroundColor:'#ccc'
    //   },
    //   "android": {
    //     backgroundColor:"#000"
    //   }
    // })
  },
  thumbnail: {
    width: 53,
    height: 81,
    resizeMode: "cover"
  }

});
var MOCKED_MOVIES_DATA = [
  {
    title: "标题1111",
    year: "2015",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];