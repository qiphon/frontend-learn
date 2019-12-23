/**
 *   返回监控
 */
// 返回时执行的函数
function _listenerFun() {
    pushHistory(window.location.href)
    popState.cb()
}

function pushHistory(url) {
    var url = url || window.location.href
    window.history.pushState({ page: 1 }, null, url);
}
/**
 *     返回监控
 *     cb   Function  成功的函数
 * 
 */
function popState(cb) {
    // console.log(cb,"cbcbcb")
    popState.cb = cb || function () { }
    pushHistory()
    window.addEventListener('popstate', _listenerFun);

}
function removeState() {
    popState.modal = null
    window.removeEventListener('popstate', _listenerFun);
}