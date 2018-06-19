// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ['red','yellow','black','#ccc'],
    refreshing: true,
    data: {end_time: '2017-02-10'},
    title: '赛事管理',
    zero: 0,
    x: '1',
    y: '2',
    winWidth: null,
    winHeight: null,
    selectPotionLock: false,
    judge: false,
    item: [
      '所有赛事1',
      '进行中',
      '报名中',
      '待开赛',
      '已结束',
    ],
    groups:[],
    groupsArr: [],
    itemIndex: 0,
    testUrl: 'http://test.api.snsports.cn/api/content/phone/',
    page: 1,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          winHeight: res.screenHeight - 100
        })
      },
      fail: function (res){
        _this.data.winHeight = '100%';
      }
    });
    _this.requestData(_this.data.page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      judge: true
    })
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
    console.log(this,'Down');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('up');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * scroll-view 上啦刷新
   */
  scrolltoupper: function (){
    console.log('123');
  },
  scrolltolower: function (ev){
    console.log('up F5');
    this.setData({
      loading: true, 
      page: ++this.data.page
    })
    this.requestData(this.data.page);
  },
  viewScoll: function (ev){
    
  },
  showSelect: function (){
    this.setData({
      selectPotionLock: true
    })
  },
  hideSelect: function (){
    this.setData({
      selectPotionLock: false
    })
  },
  selectGroup: function (ev){
    var index = ev.currentTarget.dataset.index;
    this.setData({
      itemIndex: index,
      selectPotionLock: false
    });
  },
  newData: function (arr){
    console.log(arr);
    var _this = this;
    arr.forEach( function (key){
      _this.data.groupsArr.push(key);
    })
    _this.setData({
      group: _this.data.groupsArr
    })
  },
  requestData: function (page){
    var _this = this;
    wx.request({
      url: this.data.testUrl + 'GetBMMatchListByAreaId.json',
      data: {
        pageNum: page,
        passport: 'xhhqkoudya2kdz2edloij9eipmnehi1s',
        device: 'phone',
        appVersion: '2.13.3'
      },
      method: 'GET',
      success: function (data) {
        _this.newData(data.data.messages.data.otherMatchList);
        _this.setData({
          loading: false
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  
  onPullDownRefresh: function (){
    console.log('123');
  },
})