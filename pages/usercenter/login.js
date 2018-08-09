Page({
  data: {
    email: '',
    password: ''
  },

  bindEmailInput: function(e) {
    this.setData({
      email: e.detail.value
    })
  },
  bindPasswordInput: function(e) {
    console.log('090909'),
    this.setData({
      password: e.detail.value
    })
  },


  login: function(e) {
    wx.showToast({
      title: '登录请求中',
      icon: 'loading',
      duration: 9000
    });

    //网络请求开始
    wx.request({
      url: 'https://jsonplaceholder.typicode.com/users',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        wx.hideToast();
        if (res.data.id) {
          console.log('sssss'),
          //进行一些状态的存储
          wx.switchTab({
            url:'../../pages/index/index',
            success: function(e){
              console.log('called switchTab');
            }
          })
        } else {
          wx.showModal({
            title: '登录失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            success: function(res) {
              //回调函数
            }
          });
        }
      }
    })

  }
})