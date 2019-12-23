/**
 *  判断当前文件是不是 iphonex 问题
 */
export function isIphonXSeries() {
    if (window !== 'undefined' && window && !isIphone()) return false;
    const xSeriesConfig = [
        {  //iPhone Xs（Max,Pro Max）
            devicePixelRatio: 3,
            width: 414,
            height: 896,
        },
        {  // iPhone XR（11）
            devicePixelRatio: 2,
            width: 414,
            height: 896,
        },
        {  // iPhone X（Xs,Pro）
            devicePixelRatio: 3,
            width: 375,
            height: 812,
        },
    ];
    const {
        devicePixelRatio,
        screen: {
            width, height
        }
    } = window;
    return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
}
/**
 *  判断是不是iPhone
 */
export function isIphone() {
    return /iphone/gi.test(window.navigator.userAgent)
}