// check that the userId specified owns the documents  权限
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}