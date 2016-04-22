Router.configure({
  layoutTemplate: 'layout'
  // 告诉路由器使用layout 模板作为所有路由的默认布局。
});

Router.route('/', {name: 'postsList'});
// 定义了一个名为 postsList 的路由规则，并映射到 / 路径。