var NoteForm = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(lineNote){
    this.lineNote = lineNote;
    this.db        = this.lineNote.db;
    this.elm       = el('form');
    this.textarea  = el('textarea');
    this.actions   = el('div');
    this.submitButton = el('button');

    this.submitButton.setAttribute('class', 'btn btn-primary');
    this.submitButton.textContent = 'Save note';
    this.actions.setAttribute('class', 'form-actions');
    this.textarea.setAttribute('class', 'input-contrast form-control');

    if (lineNote.note) {
      this.textarea.value = lineNote.note.body;
    }
	}

  p.save = function () {
    this.db.add(this.lineNote.lineNoteKey(), this.textarea.value);
    this.db.save();
  }

  p.render = function () {
    this.elm.appendChild(this.textarea);
    this.actions.appendChild(this.submitButton);
    this.elm.appendChild(this.actions);

    this.elm.addEventListener('submit', function (event) {
      this.save();
      event.preventDefault();
    }.bind(this))

    return this.elm;
  }

	return C;
})();
