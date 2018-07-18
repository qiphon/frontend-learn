#chrome devtool

##打印
1. console.table()
通常打印都用console.log 但是console.log显示的数组或json不够美观，console.table会以表格形式输出内容(可以打印多维数组，和对象)
2. console.dir（用于打印dom对象）
是侧重于字符串化的打印，console.dir能递归所有的对象属性,console.log只能打印对应的节点信息
3. 打印带有样式
console.log('%c 这是我输入的内容 ','background:#ccc;color:red')
4.console.trace 追踪函数调用 

##检查没有用的css/js
<br>chrome59新增功能，能够检查页面上的css/js没有用到的比例，打开devtooles --> coverage 绿色的是用到的，红色是没有用到的
##debugger(在代码中写入debugger，当代码运行到这个位置的时候会打断点)
