var ReviewOnGithub = (function(){
  var C = function(){ return constructor.apply(this,arguments); }
  var p = C.prototype;

  p.db;

  function constructor(){
    this.db          = new Db();
    this.notesButton = new NotesButton(this.db);

    if (document.querySelectorAll('.file')[0]) {
      this.fileView  = new FileView(this.db);
    }

    if (location.hash == '#reviewnotes') {
      this.notesList = new NotesList(this.db);
    }

    this.db.load();
    this.observePJaxLoads();
  }

  p.currentRepository = function () {
    return location.pathname.split('/').splice(0, 3).join('/');
  }

  p.observePJaxLoads = function () {
    document.addEventListener('pjax:complete', function() {
      this.db.load();
    }.bind(this))
  }

  return C;
})();

ready(function () {
  new ReviewOnGithub();
})
