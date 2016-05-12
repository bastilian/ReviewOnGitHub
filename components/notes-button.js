var NotesButton = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db){
    this.db          = db;
    this.linkElement = el('a')
    this.linkElement.setAttribute('class', 'btn btn-sm')
    this.linkElement.textContent = 'Notes ';

    this.el = el('li')
    this.el.appendChild(this.linkElement);

    this.counter = el('span')
    this.counter.classList.add('counter');
    this.linkElement.appendChild(this.counter);

    this.db.loaded(function () {
      this.insert();
    }.bind(this))

    this.db.loadedOrUpated(function () {
      this.updateCounter();
    }.bind(this))

    this.linkElement.addEventListener('click', function () {
      location.href = location.pathname.split('/').splice(0, 3).join('/') + '#reviewnotes';
    });
	}

  p.updateCounter = function () {
    console.log("Update Counter", this.db.notes.length);
    this.counter.textContent = this.db.notes.length;

    if (this.db.notes.length === 0) {
      this.counter.style.display = 'none';
    } else {
      this.counter.style.display = 'inline-block';
    }
  }

  p.insert = function () {
    this.actionsElement = document.querySelectorAll('ul.pagehead-actions')[0];
    this.actionsElement.insertBefore(this.el, this.actionsElement.firstChild);
  }

	return C;
})();
