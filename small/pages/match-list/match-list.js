Page({
  /**
   * 页面的初始数据
   */
  data: {
    matchList: [],
    load: true,
    matchs: [
      { val: '所有赛事', id: 3},
      { val: '进行中', id: 1},
      { val: '报名中', id: 0},
      { val: '已结束', id: 2 },
      { val: '待开赛', id: 4 },
    ],
    matchType: {
      arr: ['所有类型' ,'足球', '篮球', '冰球', '乒乓球'],
    },
    LayerLock: false,
    matchLock: false,
    matchIndex: '所有赛事',
    matchTypeLock: false,
    matchTypeIndex:0,
    pageNum: 1,
    status: 3,
    sportType: '所有类型',
    listAir: true
  },

  //网络请求
  networkRequests: function (){
    var appVersion = getApp();
    var _this = this;
    var param = {
        pageNum: this.data.pageNum,
        status: this.data.status,
        sportType: this.data.sportType != '所有类型' ? this.data.sportType: '',
        device: "phone",
        appVersion: appVersion.appVersion
    };
    
    wx.request({
      url: 'https://www.banmabang.cn/backend-test/api/content/phone/GetBMMatchListByAreaId.json',
      data: param,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var obj = _this.data.matchList;
        if(res.data.messages.data.otherMatchList.length < 1 ){
          _this.setData({
            listAir: false,
            load: true,
          })
          return;
        }
        res.data.messages.data.otherMatchList.forEach(function (item, index){
          obj.push(item);
        })
        _this.setData({
          matchList: obj,
          load: true,
          listAir: true
        })
      },
      fail: function (event) {
        console.log('接口调用错误，或者其它问题', event)
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mobileInfo();
    this.networkRequests();
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
    var pageNum = this.data.pageNum;
    this.setData({
      pageNum: ++this.data.pageNum,
      load: false
    })
    this.networkRequests();
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
    var status = obj.data ? obj.data.id : null;
    if (status == this.data.status || obj.sporttype == this.data.sportType){
      this.setData({
        LayerLock: false,
        matchLock: false,
        matchTypeLock: false
      })
      return;
    }
    this.setData({
      matchList: [],
      pageNum: 1,
      matchIndex: obj.data ? obj.data.val : this.data.matchIndex,
      status: obj.data ? obj.data.id : this.data.status,
      matchTypeIndex: obj.sporttype ? obj.index : this.data.matchTypeIndex,
      sportType: obj.sporttype ? obj.sporttype : this.data.sportType,
      LayerLock: false,
      matchLock: false,
      matchTypeLock: false,
    });
    this.networkRequests();
  }
})