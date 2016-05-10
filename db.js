var Db = (function(){
  var C = function(){ return constructor.apply(this,arguments); }
  var p = C.prototype;
  p.notes;

  function constructor(){
    this.dbName = 'ReviewsOnGitHub';

    this.load();
  }

  p.find = function (url) {
    Object.filter(this.notes, function (key) {
      return key.startsWith(url);
    })
  }

  p.remove = function (url) {
    delete this.notes[url];
  }

  p.add = function (url, body, options) {
    this.notes[url] = {
      "body": body,
      "options": options
    }
  }

  p.save = function () {
    localStorage.setItem(this.dbName, JSON.stringify(this.notes));
  }

  p.load = function () {
    this.notes = JSON.parse(localStorage.getItem(this.dbName));
  }

  return C;
})();
