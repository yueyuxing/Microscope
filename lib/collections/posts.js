Posts = new Mongo.Collection('posts');
// 增加一个 post 集合

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      // _.extend() 方法来自于 Underscore 库，作用是将一个对象的属性传递给另一个对象。
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});