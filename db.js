var Db = (function(){
  var C = function(){ return constructor.apply(this,arguments); }
  var p = C.prototype;
  p.notes;
  p._loadedCallbacks  = [];
  p._updatedCallbacks = [];

  function constructor(){
    this.dbName = 'ReviewsOnGitHub';
    this.notes  = [];
  }

  p.loaded = function (fn) {
    this._loadedCallbacks.push(fn)
  }

  p.updated = function (fn) {
    this._updatedCallbacks.push(fn)
  }

  p.loadedOrUpated = function (fn) {
    this.updated(fn);
    this.loaded(fn);
  }

  p.find = function (url) {
    return this.notes.filter(function (note) {
      return note.url == url;
    });
  }

  p.remove = function (url) {
    var note = this.find(url)[0];
    var index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }

    this.save();
  }

  p.add = function (url, body, options) {
    this.notes.push ({
      "url": url,
      "body": body,
      "options": options
    })
  }

  p.addOrUpdate = function (url, body, options) {
    var existingNote = this.find(url)[0];
    if (existingNote) {
      this.remove(url);
    }
    this.add(url, body, options);
  }

  p.save = function (fn) {
    localStorage.setItem(this.dbName, JSON.stringify(this.notes));

    for (var i = 0; i < this._updatedCallbacks.length; i++) {
      this._updatedCallbacks[i]();
    }

    if (fn)
      fn();
  }

  p.load = function () {
    this.notes = JSON.parse(localStorage.getItem(this.dbName));

    if (!this.notes)
      this.notes = [];

    for (var i = 0; i < this._loadedCallbacks.length; i++) {
      this._loadedCallbacks[i]();
    }
  }

  return C;
})();
