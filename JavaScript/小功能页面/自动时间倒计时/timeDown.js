/**
 *   时间倒计时 （超过24小时重新倒计时）
 *     如果时间到达指定时间 重新进入倒计时
 * 
 */


var cha;
var toTime = new Date('2019/10/13 00:00:00');  ////iphone下时间固定为这个格式否则会发生错误  
var tt = setInterval(function () {
    dateDown(timeCalc(toTime))  //定义倒计时的结束时间，注意格式  
}, 100); //定义计时器，每隔1000毫秒 也就是1秒 计算并更新 div的显示  
function timeCalc(toTime) {
    var now = new Date();
    cha = toTime - now;
    if (cha <= 0 || !cha) {
        var newCha = Math.ceil((now * 1 - toTime * 1) / (1000 * 60 * 60 * 24))
        toTime = toTime * 1 + 24 * 60 * 60 * 1000 * newCha
    }
    cha = toTime - now;
    return cha;
}
// 计算2个时间之间的差值
function dateDown(cha) {
    /*var toTime = new Date(data);
    var now = new Date();
    var cha = toTime - now;
    if (cha <= 0) { //如果差小于等于0  也就是过期或者正好过期，则推出程序  
        $('.downTime span').html("00")
        clearInterval(tt); //清除计时器  
        return; //结束执行  
    }*/
    var h = Math.floor(cha / 1000 / 60 / 60 % 24);
    // var m = Math.floor(cha - Math.floor(cha/1000/60/60));
    var m = Math.floor(cha / 1000 / 60 % 60);
    var s = Math.floor(cha / 1000 % 60);
    var ms = (cha % 1000 + '').slice(0, 2);
    // console.log(document.getElementById("time"))
    if (h < 0) {
        h = "00";
    }
    if (m < 0) {
        m = "00"
    }
    if (s < 0) {
        s = "00"
    }
    if (ms < 0) {
        ms = "00"
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    if (ms < 10) {
        ms = "0" + ms;
    }
    document.getElementById('_h').innerHTML = h;
    document.getElementById('_m').innerHTML = m;
    document.getElementById('_s').innerHTML = s;
    document.getElementById('_ms').innerHTML = ms;
}