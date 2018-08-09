const app = getApp()

Page({
  
  data:{
    boards:[
      {key:'in_theaters'},
      {key:'coming_soon'},
      {key:'new_movies'},
      {key:'top250'}
    ]
  },



  onLoad: function(){

    wx.showLoading({
      title: '拼命加载中...',
    })

    const tasks = this.data.boards.map(board => {
      console.log(board.key)
      return app.douban.find(board.key, 1, 20)
        .then( d=> {
          
          board.title = d.title
          board.movies = d.subjects
          console.log(board)
          return board
        })
    })

    Promise.all(tasks)
      .then(boards =>{
        this.setData({ boards: boards, loading: false })
        wx.hideLoading()
      })

  }


  // loadData: function(){
  //   var that = this;
  //   wx.request({
  //     url: 'https://douban.uieee.com/v2/movie/subject/26752088',
  //     header:{
  //       'content-type':'application/text'
  //     },
  //     success: function(res){
  //       console.log(res.data)
  //       that.setData({
  //         movieData:res.data
  //       })
  //     }
  //   })
  // }


})