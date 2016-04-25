Posts = new Mongo.Collection('posts');
// 增加一个 post 集合

validatePost = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "请填写标题";
  if (!post.url)
    errors.url =  "请填写 URL";
  return errors;
}

Posts.allow({ // 在客户端编辑和删除帖子
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // 只能更改如下两个字段：
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    /*
	*补偿延迟
    if (Meteor.isServer) {  // 是否在服务器端执行
      postAttributes.title += "(server)";
      // wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += "(client)";
    }

    */
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");
  
    var postWithSameLink = Posts.findOne({url: postAttributes.url}); // 防止重复
    if (postWithSameLink) {
      // 我们在数据库中搜寻是否存在相同的 URL。
      // 如果找到，我们 return 返回那帖子的 _id 和 postExists: true 来让用户知道这个特别的情况。
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

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