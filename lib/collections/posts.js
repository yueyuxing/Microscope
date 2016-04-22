Posts = new Mongo.Collection('posts');
// 增加一个 post 集合

Posts.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});