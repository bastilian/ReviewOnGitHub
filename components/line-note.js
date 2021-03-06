var LineNote = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db, lineNumberElement){
		this.db                = db;
    this.lineNumberElement = lineNumberElement;
    this.noteLink          = el('span');
    this.noteContainer     = el('tr');
    this.form              = null;
    this.note              = null;

    this.db.loadedOrUpated(function () {
      this.render();
    }.bind(this))
	}

  p.line = function () {
    return this.lineNumberElement.getAttribute('id');
  }

  p.lineNoteKey = function () {
    return location.pathname + '#' + this.line();
  }

  p.renderNoteLink = function () {
    var plus = addSvg();
    plus.classList.add('add-line-comment');
    plus.classList.add('review-note')
    this.noteLink.appendChild(plus)

    this.lineNumberElement.addEventListener('mouseover', function () {
      this.noteLink.firstChild.style.opacity = 1;
    }.bind(this));

    this.lineNumberElement.addEventListener('mouseout', function () {
      this.noteLink.firstChild.style.opacity = 0;
    }.bind(this));

    this.noteLink.addEventListener('click', function () {
      location.hash = this.line();
      this.openForm();
    }.bind(this))

    this.lineNumberElement.insertBefore(this.noteLink, this.lineNumberElement.firstChild);
  }

  p.openForm = function () {
    if (this.form)
      return;

    this.form = new NoteForm(this);

    if (!this.note) {
      this.renderNote();
    }

    this.noteContainer.firstChild.appendChild(this.form.render());
  }

  p.renderNote = function () {
    var td  = el('td');
    var div = el('div');
    var row = this.lineNumberElement.parentNode;

    td.setAttribute('class', 'line-comments');
    td.setAttribute('colspan', '3');

    if (this.note && !td.querySelectorAll('p')[0]) {
      div.innerHTML = marked(this.note.body);
      td.appendChild(div);
    }

    this.noteContainer.setAttribute('class', 'reviewsongithub-comment-container');
    this.noteContainer.appendChild(td);

    if (this.note) {
      this.addEditAndDelete();
    }

    insertAfter(this.noteContainer, row);

  }

  p.delete = function () {
    var really = confirm('Do you really want to remove the note for line ' +  this.line() + '?');
    if (really) {
      this.db.remove(this.lineNoteKey());
    }
  }

  p.addEditAndDelete = function () {
    var div = el('div');
    div.classList.add('note-actions');

    var editButton = el('button');
    editButton.setAttribute('class', 'btn-link');
    editButton.appendChild(editSvg());

    editButton.addEventListener('click', function () {
      this.openForm();
    }.bind(this))

    var deleteButton = el('button');
    deleteButton.setAttribute('class', 'btn-link');

    deleteButton.appendChild(deleteSvg());
    deleteButton.addEventListener('click', function () {
      this.delete();
    }.bind(this));

    div.appendChild(editButton);
    div.appendChild(deleteButton);
    this.noteContainer.firstChild.appendChild(div);
  }

  p.render = function () {
    this.note = this.db.find(this.lineNoteKey())[0];
    this.noteContainer.innerHTML = '';

    if (this.note) {
      this.renderNote();
    } else {
      this.renderNoteLink();
    }
  }

	return C;
})();
