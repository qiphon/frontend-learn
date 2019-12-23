# 解决微信内苹果webview 输入框失去焦点后的屏幕卡住问题


export const fixIphoneScrollBug = (function(){
    let __timeoutFillinfo = null
    return function fixbubInWechat(ev, bool, val = 200){
        if(!isIphone()) return;
        if (bool) return clearTimeout(__timeoutFillinfo)
        __timeoutFillinfo = setTimeout(() => document.scrollingElement.scrollTop = val, 500)
    }
})();