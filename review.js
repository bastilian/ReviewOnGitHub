var ReviewsOnGithub = (function(){
  var C = function(){ return constructor.apply(this,arguments); }
  var p = C.prototype;

  p.db;

  function constructor(){
    this.db = new Db();

    this.actionsElement = document.querySelectorAll('ul.pagehead-actions')[0];
    this.reviewsButton  = document.createElement('li');

    if (this.actionsElement) {
      this.load();
    }

    document.addEventListener('pjax:complete', function() {
      this.actionsElement = document.querySelectorAll('ul.pagehead-actions')[0];
      this.load();
    }.bind(this))
  }

  p.load = function () {
    this.addButton();
    this.findNotes();
    this.observeLineNumbers();
  }

  p.commentForm = function () {
    var form = document.createElement('form');
    form.innerHTML = '<textarea class="input-contrast form-control"></textarea>' +
                     '<div class="form-actions"><button type="submit" class="btn btn-primary">Save note</button></div>';

    return document.getHTML(form, true);
  }

  p.addCommentRowAfter = function (row) {
    var commentRow = document.createElement('tr');
    commentRow.setAttribute('class', 'reviewsongithub-comment-container');
    commentRow.innerHTML = '<td class="line-comments" colspan="3">' + this.commentForm() + '</td>';
    row.insertAdjacentHTML('afterend', document.getHTML(commentRow, true));
    console.log(commentRow.querySelectorAll('form'));
    var form = document.querySelectorAll('.reviewsongithub-comment-container form')[0];
    form.addEventListener('submit', function (event) {

      event.preventDefault();
    }.bind(this));
  }

  p.observeLineNumbers = function () {
    var lineNumbers = document.querySelectorAll('.blob-num.js-line-number');
    var addCommentButton = document.createElement('span');
    addCommentButton.innerHTML = '<svg aria-hidden="true" class="octicon octicon-plus" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg>';
    addCommentButton.setAttribute('class', 'add-line-comment');
    this.commentButtons = [];

    for (var i = 0; i < lineNumbers.length; i++) {
      this.commentButtons[i] = addCommentButton.cloneNode(true);
      lineNumbers[i].insertBefore(this.commentButtons[i], lineNumbers[i].firstChild);
      var that = this;

      this.commentButtons[i].addEventListener('click', function () {
        that.addCommentRowAfter(this.parentNode);
      }.bind(lineNumbers[i]))

      lineNumbers[i].addEventListener('mouseover', function () {
        this.style.opacity = 1;
      }.bind(this.commentButtons[i]));

      lineNumbers[i].addEventListener('mouseout', function () {
        this.style.opacity = 0;
      }.bind(this.commentButtons[i]))
    }
  }

  p.currentRepository = function () {
    location.pathname.split('/').splice(0, 2).join('/');
  }

  p.findNotes = function () {
    this.db.find(this.currentRepository());
  }

  p.addButton = function () {
    this.reviewsButton.innerHTML = '<a href="#" class="btn btn-sm btn-with-count">Notes</a><a href="#" class="social-count js-social-count">0</a>';
    this.actionsElement.insertBefore(this.reviewsButton, this.actionsElement.firstChild);
  }

  return C;
})();

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  var reviews = new ReviewsOnGithub();
  console.log(reviews);
})
