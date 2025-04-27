Array.prototype.forEach2 = function (callback) {
  console.log('callback', callback);
  callback();
};

const colors = ['red', 'green', 'blue'];

colors.forEach2(() => {
  console.log('this', this);
});
