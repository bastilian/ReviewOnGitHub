var FileView = (function(){
	var C = function(){ return constructor.apply(this,arguments); }
	var p = C.prototype;

	function constructor(db){
    this.el = document.querySelectorAll('.file')[0];

		this.db = db;
    this.lineNotes = [];
    this.lineNumbers  = this.el.querySelectorAll('.blob-num.js-line-number');

    this.db.loaded(function () {
      this.addLineNotes();
    }.bind(this));
	}

  p.addLineNotes = function () {
    for (var i = 0; i < this.lineNumbers.length; i++) {
      this.lineNotes.push(new LineNote(this.db, this.lineNumbers[i]));
    }
  }

	return C;
})();
