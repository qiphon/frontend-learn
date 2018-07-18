//index.js
let index = {
  data: {
    navData:[
      'qiphon',
      'zoe',
      'sdfsdf',
      'sdf12',
      'sd457f',
      'sdef',
    ],
    showData:[],
    activeNav:0,
    touchX:null,
    touchTime:null
  },
  changeNav(e){   //鼠标点击时更换栏目
    this.setData({
      activeNav:e.currentTarget.dataset.key
    })
      var clientX = e.touches[0].clientX;
  },
  navTouchSt(e){
    this.setData({
      touchX:e.touches[0].clientX,
      touchTime:new Date().getTime()
    })
  },
  navTouchEnd(e){  //滑动时更换栏目
    let _this = this;
    let offsetNum = 60; //滑动偏移量
    let navLen = _this.data.navData.length;
    if(new Date().getTime() - this.data.touchTime < 1000){
      if(e.changedTouches[0].clientX - _this.data.touchX < -offsetNum){
        _this.setData({
          activeNav:(_this.data.activeNav+1)>=navLen?0:this.data.activeNav+1
        })
        _this.loadNavMsg && _this.loadNavMsg(_this.data.activeNav)
      }else if(e.changedTouches[0].clientX - _this.data.touchX > offsetNum){
        _this.setData({
          activeNav:(_this.data.activeNav-1)<0?navLen-1:_this.data.activeNav-1
        })
        _this.loadNavMsg && _this.loadNavMsg(_this.data.activeNav)
      }
    }
  },
  loadNavMsg(data){
    wx.showLoading({
      title: '加载中 ...',
    })
    wx.request({
      url: 'https://testhb.xiaositv.com/v3/index/index', //测试域名
      data: data?data:{},
      header: "{'Content-Type': 'application/json' }",
      complete(res) {
        wx.hideLoading()
        console.log(res)
      }
    })
  },
  onLoad(){
    console.log(1)
    this.loadNavMsg()
  }
};Page(index)