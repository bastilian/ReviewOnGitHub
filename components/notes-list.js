var NotesList = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db){
		this.db        = db;
    this.container = document.querySelectorAll('.repository-content')[0];

    this.db.loaded(function () {
      this.render();
    }.bind(this))
	}

  p.renderNote = function (url, noteObj) {
    var note   = el('div');
    var header = el('div');
    var body   = el('div');

    note.classList.add('commit-tease');
    body.classList.add('commit-tease-contributors');

    header.innerHTML = '<a href="' + url + '">' + url + '</a>';
    body.textContent = noteObj.body

    note.appendChild(header);
    note.appendChild(body)

    return note;
  }

  p.render = function () {
    this.container.innerHTML = '';

    for (var key in this.db.notes) {
      if (this.db.notes.hasOwnProperty(key)) {
        this.container.appendChild(this.renderNote(key, this.db.notes[key]))
      }
    }
  }

	return C;
})();
