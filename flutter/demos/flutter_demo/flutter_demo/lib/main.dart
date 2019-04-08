import 'package:flutter/material.dart';


void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    return MaterialApp(
      title: "flutter demo11",
      home: Scaffold(
        appBar: AppBar(
          title: AppBar(
            title: Text("hello flutter!2"),
          ),
        ),
        body:Center(
          child: Text(
            "hello这个是text要显示的文字，说了的交付了圣诞节福利是的房间里适得府君书说了的房间爱了就放大了的",
            textAlign: TextAlign.left,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 30,
              color: Color.fromARGB(100, 230, 13, 1)
            ),
          ),
        ),
      ),
    );
  }
}
// }