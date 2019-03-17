describe("测试函数的api",function(){
    it("+1 函数是否可用",function(){
        // 断言库提供能力
        expect(window.test(1)).toBe(2);
        expect(window.test(2)).toBe(4);
    })
})