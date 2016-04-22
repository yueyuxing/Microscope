Posts = new Mongo.Collection('posts');
// 增加一个 post 集合

Posts.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});
// Posts.allow 是告诉 Meteor：这是一些允许客户端去修改帖子集合的条件