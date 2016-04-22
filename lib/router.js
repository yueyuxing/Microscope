Router.configure({
  layoutTemplate: 'layout',
  // 告诉路由器使用layout 模板作为所有路由的默认布局。
  loadingTemplate: 'loading',
  //ron Router 自带的延缓显示模板的方法
  waitOn: function() { return Meteor.subscribe('posts'); } //订阅
});

Router.route('/', {name: 'postsList'});
// 定义了一个名为 postsList 的路由规则，并映射到 / 路径。

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { return Posts.findOne(this.params._id); }
  // 从 URL 上获取 _id ，并通过它找到帖子从而获得正确的数据源
});
//  URL 路径 /posts/<ID> 映射到 postPage 模板