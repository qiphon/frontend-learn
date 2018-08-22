# 小程序本地nodejs环境搭建



1. 将 Demo 代码 clone 到本地，用编辑器打开 server/config.js 添加以下配置：

```
const CONF = {  /// 这些为需要添加的内容
      // 其他配置 ...
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
      // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '您的腾讯云 AppID',
    qcloudSecretId: '您的腾讯云 SecretId',
    qcloudSecretKey: '您的腾讯云 SecretKey',
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000
}

```

云aip秘钥地址 https://console.cloud.tencent.com/cam/capi

云账号信息（腾讯云id）  https://console.cloud.tencent.com/developer

另外本地需要安装mysql，创建好数据库就OK了
