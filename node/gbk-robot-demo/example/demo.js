var gbk = require('../index');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var util = require('util'); 

const requestUrl = ['130524408']
const baseUrl = 'http://bank.jrj.com.cn/bankpro/product/';

gbk.fetch(baseUrl + requestUrl).to('string', function (err, string) {
  if (err)
    return console.log(err);

  const dom = new JSDOM(string);
  dealData(dom)
  return console.log('fetch done!');
});
function dealData(dom) {
  let window = dom.window
  console.log(dom.window.document.querySelector('.cur').textContent)
  console.log(window.document.querySelectorAll('.table-s2 tr .star i i'))
  let obj = {
    level: {
      cur: {
        title: "综合评级",
        // value: $('.cur')
      }
    }
  }
}