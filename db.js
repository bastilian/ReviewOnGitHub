var Db = (function(){
  var C = function(){ return constructor.apply(this,arguments); }
  var p = C.prototype;
  p.notes;

  p._loadedCallbacks  = [];
  p._updatedCallbacks = [];

  function constructor(){
    this.dbName = 'ReviewsOnGitHub';
  }

  p.loaded = function (fn) {
    this._loadedCallbacks.push(fn)
  }

  p.updated = function (fn) {
    this._updatedCallbacks.push(fn)
  }

  p.find = function (url) {
    return Object.filterByKey(this.notes, function (key) {
      return key.startsWith(url);
    });
  }

  p.remove = function (url) {
    delete this.notes[url];
    this.save();
  }

  p.add = function (url, body, options) {
    if (this.notes == null)
      this.notes = {};

    this.notes[url] = {
      "body": body,
      "options": options
    }
  }

  p.save = function () {
    localStorage.setItem(this.dbName, JSON.stringify(this.notes));

    for (var i = 0; i < this._updatedCallbacks.length; i++) {
      this._updatedCallbacks[i]();
    }
  }

  p.load = function () {
    this.notes = JSON.parse(localStorage.getItem(this.dbName));
    for (var i = 0; i < this._loadedCallbacks.length; i++) {
      this._loadedCallbacks[i]();
    }
  }

  return C;
})();
