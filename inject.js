function inject(file) {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL(file);
  s.onload = function() {
      this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
    inject('vendor/marked.min.js');
    inject('lib.js');
    inject('db.js');
    inject('components/note-link.js');
    inject('components/note-form.js');
    inject('components/line-note.js');
    inject('components/notes-button.js');
    inject('components/file-view.js');
    inject('components/notes-list.js');
    inject('review.js');
	}
	}, 10);
});
