Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}}); // Mongo 数据库的 sort 运算方法
  }
});