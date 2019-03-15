import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "welcome flutter",
      home: Scaffold(
        appBar: AppBar(
          title: Text('我是标题'),
        ),
        body: Center(
          child: Container(
            child:new Image.network(
              "https://avatar.csdn.net/D/1/5/3_qiphon3650.jpg",
              fit: BoxFit.contain,
              color: Colors.orangeAccent,
              colorBlendMode:BlendMode.colorBurn,  // 图像混合模式 ，和滤镜差不多
              repeat: ImageRepeat.repeat,
            ),
            // child: Text(
            //   'this is text222说的分手快乐的房间里速度快放假了开始打飞机',
            //   textAlign: TextAlign.left, // 文字居中 (值：center、left、start、right、end)
            //   // textDirection: TextDirection.rtl,
            //   maxLines: 3, // 文字的最大行数
            //   overflow: TextOverflow
            //       .ellipsis, // 控制超出文本的显示方式  值：clip/ellipsis/fade(文字渐变显示)
            //   // softWrap: true, // 如果为false 文本将不会自动换行，除非文本中有换行符
            //   // semanticsLabel:"111111",     // 这个text的语义
            //   // textScaleFactor: 1, // 文字放大倍数
            //   // textSpan: TextSpan(
            //   //   text:'text'
            //   // ),
            //   style: TextStyle(
            //       // 文字属性
            //       color: Color.fromARGB(255, 255, 3, 4), // 颜色 a代表透明度
            //       fontSize: 24.0, // 字号 精确到1位小数
            //       decoration: TextDecoration.underline, // 下划线
            //       decorationStyle: TextDecorationStyle.dotted
            //       // background: ,
            //       ),
            // ),
            // alignment: Alignment(-1, -1),  // 不能和图片的fit属性同时存在
            width: 500,
            height: 200,
            // color: Colors.lightBlue, // color 不能和decoration 同时存在
            // padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
            // margin: const EdgeInsets.all(10),
            decoration: new BoxDecoration(
                gradient: const LinearGradient(
                    colors: [Colors.lightBlue, Colors.green, Colors.grey]),
                border: Border.all(
                    width: 5, color: Color.fromRGBO(255, 0, 1, 0.91))),
          ),
        ),
      ),
    );
  }
}
