var NotesButton = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db){
    this.db          = db;
    this.linkElement = el('a')
    this.linkElement.setAttribute('class', 'btn btn-sm')
    this.linkElement.textContent = 'Notes';

    this.el = el('li')
    this.el.appendChild(this.linkElement);

    this.db.loaded(function () {
      this.insert()
    }.bind(this))

    this.linkElement.addEventListener('click', function () {
      location.href = location.pathname.split('/').splice(0, 3).join('/') + '#reviewnotes';
    });
	}

  p.insert = function () {
    this.actionsElement = document.querySelectorAll('ul.pagehead-actions')[0];
    this.actionsElement.insertBefore(this.el, this.actionsElement.firstChild);
  }

	return C;
})();
