Page({

  /**
   * 页面的初始数据
   */
  data: {
    load: true,
    match: {
      index: 0,
      arr: ['所有赛事', '进行中', '报名中', '已结束', '待开始'],
    },
    matchType: {
      index: 0,
      arr: ['所有类型' ,'足球', '篮球', '冰球', '乒乓球'],
    },
    LayerLock: false,
    matchLock: false,
    matchIndex:0,
    matchTypeLock: false,
    matchTypeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'https://www.banmabang.cn/backend-test/api/content/phone/GetBMMatchListByAreaId.json',
      data: {
        pageNum: 1,
        status: 3,
        device: "phone",
        appVersion: "2.13.3"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          matchList: res.data.messages.data.otherMatchList 
        })
        console.log(_this.data.matchList)
      },
      fail: function (event){
        console.log('接口调用错误，或者其它问题', event)
      }
    });
    this.mobileInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var time = setTimeout(function (){
      wx.stopPullDownRefresh();
    }, 3000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (event) {
    var vm = this;
    console.log('上啦', event)
    this.setData({
      load: false
    })
    var time = setTimeout(function (){
      vm.setData({
        load: true
      })
      clearTimeout(time);
    }, 3000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * scroll-view 滚动到底部事件
   */
  scrollLower: function (event){
    console.log(event);
  },
  /**
   * 获取手机信息
   */
  mobileInfo: function () {
    var vm = this;
    wx.getSystemInfo({
      success: function (res){
        console.log(res);
        vm.setData({
          mobileHeight: res.windowHeight
        })
      },
      fail: function (rej){
        console.log(rej)
      }
    })
  },
  /**
   * 遮罩层
   */
  selectMatch: function (event){
    var matches = event.currentTarget.dataset.type;
    if (matches == 'matchLock'){
      this.setData({
        matchTypeLock: false,
        LayerLock: true,
        matchLock: true,
      })
    } else if (matches == 'matchTypeLock'){
      this.setData({
        matchLock: false,
        LayerLock: true,
        matchTypeLock: true,
      })
    }
    
  },
  LayerHide: function (){
    this.setData({
      LayerLock: false,
      matchLock: false,
      matchTypeLock: false
    })
  },
  selectListIndex: function (event){
    var obj = event.currentTarget.dataset;
    console.log(obj);
    if (obj.type == 'matchLock'){
      this.setData({
        matchIndex: obj.index,
        LayerLock: false,
        matchLock: false,
        matchTypeLock: false        
      })
    } else if (obj.type == 'matchTypeLock'){
      this.setData({
        matchTypeIndex: obj.index,
        LayerLock: false,
        matchLock: false,
        matchTypeLock: false        
      })
    }

  }
})