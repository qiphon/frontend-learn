const supertagent = require("supertest")
const app = require('./index')

function request(){
    return supertagent(app.listen())
}


describe("node接口",function(){
    it("test接口测试",function(done){
        request()
            .get('/')
            .expect(200)
            .expect("Content-Type",/json/ )
            .end(function(err,res){
                if(res.body.data == "hello qiphon"){
                    done()
                }else{
                    done(new Error("接口数据异常"))
                }
            })
    })
})