# e2e 测试  

// 这个示例是index.js.bak1

> npm i selenium-webdriver --save-dev

接下来复制官方示例在当前文件夹

```
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();   // 使用chrome浏览器
    try {
        await driver.get('http://www.baidu.com/');       // 要测试的网址
        await driver.findElement(By.name('wd')).sendKeys('node', Key.RETURN);   // 输入的命令‘node’
        await driver.wait(until.titleIs('node_百度搜索11'), 1000);  // 检查跳转之后的页面是不是
                                                                   // node_百度搜索11
                                                                   // 这里写的是错误的示例
    } finally {
        await driver.quit();
    }
})();

```

下载指定的浏览器驱动到index.js 的同级目录

https://www.npmjs.com/package/selenium-webdriver


运行命令  

> node index.js

接下来就能安装正常的方式运行了，如果杀毒软件报警，请将其加入白名单，重复运行即可




# karma 

> 自动化测试工具

安装

> npm i karma -S
npm i karma-cli -S
npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev

创建 index.js index.spec.js

```
// index.js

window.test = function(num){
    return num +=1;
}


// index.spec.js

describe("测试函数的api",function(){
    it("+1 函数是否可用",function(){
        // 断言库提供能力
        expect(window.test(1)).toBe(2);
    })
})

```


初始化

> karma init

1. Which testing framework do you want to use ?  // 选择断言库  jasmine

2.  use Require.js ?  // 是否使用require.js

3. Do you want to capture any browsers automatically ?  // 浏览器选择  phantomJS  无头浏览器

4. What is the location of your source and test files ?  // 要测试的文件，先不写

5. Should any of the files included by the previous patterns be excluded ? // 排除文件

6. Do you want Karma to watch all the files and run the tests on change ?  // 文件变化后是否自动运行

如果上述步骤执行完毕控制台报错请重新安装karma
npm i karma -D

之后重新执行初始化操作，就会在当前目录生成karma.conf.js 这个是karma的配置文件,修改其中的配置

```
// 如果是true就不会在有界面的浏览器中运行
    singleRun: true,

  //  要测试的文件 
  // list of files / patterns to load in the browser

    files: [
      "./karma/*.js",
      "./karma/**.spec.js"
    ],

```

之后运行 karma start  即可看到结果


## 生成karma 覆盖率文件

安装

> npm install karma-coverage --save-dev

更改 karma配置文件

```
   // 指定哪些js 需要执行覆盖率
    preprocessors: {
      './karma/**/*.js': ['coverage']
    },

    reporters: ['progress','coverage'],
    // 生成文档
    coverageReporter: {
      // specify a common output directory
      dir: './docs/coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    },

```

运行 karma start ，之后会在docs/report-html/index.html 中看到本次自动化测试的覆盖率，点击文件名，可以查看详细的覆盖内容，有红的地方表示没有测到