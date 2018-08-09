const app = getApp()

Page({

  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'new_movies' },
      { key: 'top250' }
    ],
    movieData: '',
    title: '',
    subtitle: '加载中...',
    movies: [],
    hasMore: true,
    page: 1,
    size: 20,
    type: 'us_box'
  },

  onLoad: function (params) {
    console.log(params)

    this.data.title = params.title || this.data.title
    this.data.type = params.type || this.data.type

    this.loadMore()
    console.log(this.data.title + 'ssss')
  },

  loadMore() {
    if (!this.data.hasMore) return

    wx.showLoading({ title: '拼命加载中...' })
    this.setData({ subtitle: '加载中...' })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        console.log(d.title + '2222')
        if (d.subjects.length) {
          this.setData({ subtitle: d.title, movies: this.data.movies.concat(d.subjects) })
        } else {
          this.setData({ subtitle: d.title, hasMore: false })
        }
        wx.setNavigationBarTitle({
          title: d.title,
        })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常' })
        console.error(e)
        wx.hideLoading()
      })
  },

  // onReady(){
  //   console.log(this.data.title)
  //   wx.setNavigationBarTitle({
  //     title: this.data.title
  //   })
  // },

  onReady(){
    console.log(this.data.title)
    
  },


  onPullDownRefresh() {
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
      .then(() => wx.stopPullDownRefresh())
  },

  onReachBottom(){
    this.loadMore()
  }


})