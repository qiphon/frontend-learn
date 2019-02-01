# reactNative api

## 区分平台的代码 Platform 模块

> React Native 提供了一个检测当前运行平台的模块。如果组件只有一小部分代码需要依据平台定制，那么这个模块就可以派上用场。

```
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  height: Platform.OS === "ios" ? 200 : 100
});

```