# 官方 DOC

## 替换 lib/main.dart.
删除lib / main.dart中的所有代码，然后替换为下面的代码，它将在屏幕的中心显示“Hello World”.

```
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}

```

分析

> 本示例创建一个Material APP。Material是一种标准的移动端和web端的视觉设计语言。 Flutter提供了一套丰富的Material widgets。

main函数使用了(=>)符号, 这是Dart中单行函数或方法的简写。

该应用程序继承了 StatelessWidget，这将会使应用本身也成为一个widget。 在Flutter中，大多数东西都是widget，包括对齐(alignment)、填充(padding)和布局(layout)

Scaffold 是 Material library 中提供的一个widget, 它提供了默认的导航栏、标题和包含主屏幕widget树的body属性。widget树可以很复杂。

widget的主要工作是提供一个build()方法来描述如何根据其他较低级别的widget来显示自己。

本示例中的body的widget树中包含了一个Center widget, Center widget又包含一个 Text 子widget。 Center widget可以将其子widget树对其到屏幕中心。


## 使用外部包

> 在这一步中，您将开始使用一个名为english_words的开源软件包 ，其中包含数千个最常用的英文单词以及一些实用功能.

您可以 在[pub.dartlang.org](https://pub.dartlang.org/flutter/)上找到[english_words](https://pub.dartlang.org/packages/english_words)软件包以及其他许多开源软件包

> 1. pubspec文件管理Flutter应用程序的assets(资源，如图片、package等)。 在pubspec.yaml中，将english_words（3.1.0或更高版本）添加到依赖项列表，如下面高亮显示的行：

```
dependencies:
  flutter:
    sdk: flutter

  # 添加依赖
  english_words: ^3.1.0

```

> 2. 在Android Studio的编辑器视图中查看pubspec时，单击右上角的 Packages get，这会将依赖包安装到您的项目。您可以在控制台中看到以下内容：

```
flutter packages get
Running "flutter packages get" in startup_namer...
Process finished with exit code 0

```

> 3. 在 lib/main.dart 中, 引入 english_words, 如果引入的package被使用会有高亮显示:

```
import 'package:english_words/english_words.dart';

```
> 4. 使用 English words 包生成文本来替换字符串“Hello World”.

```
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final wordPair = new WordPair.random();
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          //child: new Text('Hello World'),
          child: new Text(wordPair.asPascalCase),
        ),
      ),
    );
  }
}

```

如果应用程序正在运行，请使用热重载按钮 (lightning bolt icon) 更新正在运行的应用程序。每次单击热重载或保存项目时，都会在正在运行的应用程序中随机选择不同的单词对。 这是因为单词对是在 build 方法内部生成的。每次MaterialApp需要渲染时或者在Flutter Inspector中切换平台时 build 都会运行.

## 添加一个 有状态的部件（Stateful widget）

> Stateless widgets 是不可变的, 这意味着它们的属性不能改变 - 所有的值都是最终的.\
Stateful widgets 持有的状态可能在widget生命周期中发生变化. 实现一个 stateful widget 至少需要两个类:\
1. 一个 StatefulWidget类。\
2. 一个 State类。 StatefulWidget类本身是不变的，但是 State类在widget生命周期中始终存在.


>1. 添加有状态的 RandomWords widget 到 main.dart。 它也可以在MyApp之外的文件的任何位置使用，但是本示例将它放到了文件的底部。RandomWords widget除了创建State类之外几乎没有其他任何东西