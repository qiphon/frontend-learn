# ui 还原测试  （ backstopjs ）

安装 backstopjs 这个安装过程可能比较痛苦，最好使用梯子

> npm i backstopjs -D

初始化项目

> backstop init

在 backstop.json 修改配置

```
{
  "id": "wen-jian-ming",    // backstop 文件名
  "viewports": [
    {
      "label": "phone",    // 适配手机
      "width": 375,        // 适配屏幕大小
      "height": 667
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "onBeforeScript": "puppet/onBefore.js",    // 脚本启动前的js
  "onReadyScript": "puppet/onReady.js",
  "scenarios": [
    {
      "label": "qqmap",      // 图片命名的名字
      "cookiePath": "backstop_data/engine_scripts/cookies.json",
      "url": "https://map.qq.com/m/",    // 线上测试地址
      "referenceUrl": "",
      "readyEvent": "",
      "readySelector": "",
      "delay": 0,
      "hideSelectors": [],
      "removeSelectors": [],
      "hoverSelector": "",
      "clickSelector": "",
      "postInteractionWait": 0,
      "selectors": [],
      "selectorExpansion": true,
      "expect": 0,
      "misMatchThreshold" : 0.1,
      "requireSameDimensions": true
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",   // ui图放置的位置
    "bitmaps_test": "backstop_data/bitmaps_test",    
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",     // 报表
    "ci_report": "backstop_data/ci_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",   // 引擎
  "engineOptions": {
    "args": ["--no-sandbox"]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
}


```

将ui图放到指定文件夹下运行命令

> backstop test