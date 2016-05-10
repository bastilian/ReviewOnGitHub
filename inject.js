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
    inject('lib.js');
    inject('db.js');
    inject('review.js');
	}
	}, 10);
});
