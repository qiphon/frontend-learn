"use strict";
var uname = 'qiphon';
var age = 0x27;
var say = " " + uname + " \n                    " + (age + 1) + "\n                        say Do not afraid ,just do it";
var md5 = function (key, value) {
    return key + value;
};
console.log(md5('lee', 'qiphon'));
var sha1 = function (key, value) {
    return key + '-_-' + value;
};
console.log(sha1('zoe', 'lee'));
