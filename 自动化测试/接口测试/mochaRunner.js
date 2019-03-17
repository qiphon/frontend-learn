const Mocha = require('mocha')

const mocha = new Mocha({
    reporter:'mochawesome',
    reporterOptions:{
        reportDir:'./docs/mochawesome-reports'
    }
})

mocha.addFile('./app/router.spec.js')

mocha.run(function(){
    console.log("done")
    process.exit();   // 退出程序
})