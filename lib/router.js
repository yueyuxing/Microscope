Router.configure({
  layoutTemplate: 'layout',
  // 告诉路由器使用layout 模板作为所有路由的默认布局。
  loadingTemplate: 'loading',
  //ron Router 自带的延缓显示模板的方法
  notFoundTemplate: 'notFound',
  // 404页面
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

Router.route('/submit', {name: 'postSubmit'});
// 提交页面路由


var requireLogin = function() { // 检查用户是否登录
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// 不仅在非法路由情况下，而且在 postPage 路由，每当 data 函数返回“falsy”（比如 null、false、undefined 或 空）对象时，显示“无法找到”的页面

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});