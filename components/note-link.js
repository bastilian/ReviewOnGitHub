var NoteLink = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db){
    this.actions = document.querySelectorAll('.new-issue-form .form-actions')[0];
    this.db = db;
    this.elm = el('button');
    this.elm.classList.add('btn');
    this.elm.textContent = 'Add notes to issue';

    this.elm.addEventListener('click', function (event) {
      this.addNotesToIssue();
      event.preventDefault();
    }.bind(this));

    this.db.loaded(function () {
      this.insert();
    }.bind(this))
  }

  p.collectedNotes = function () {
    var result = '';
    this.db.notes.forEach(function (note) {
      result = result + "\n**" + note.url + "**\n\n" + note.body;
    });

    return result;
  }

  p.addNotesToIssue = function () {
    var textarea = document.getElementById('issue_body')
    textarea.value = textarea.value + this.collectedNotes();
  }

  p.insert = function () {
    this.actions.appendChild(this.elm);
  }

  return C;
})();
