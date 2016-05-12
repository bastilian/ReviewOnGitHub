Object.filter = function( obj, predicate) {
    var result = {}, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};

Object.filterByKey = function( obj, predicate) {
    var result = {}, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && predicate(key)) {
            result[key] = obj[key];
        }
    }
    return result;
};

document.getHTML= function(who, deep){
    if(!who || !who.tagName) return '';
    var txt, ax, el= document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt= el.innerHTML;
    if(deep){
        ax= txt.indexOf('>')+1;
        txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
    }
    el= null;
    return txt;
};

window.el = function (el) {
  return document.createElement(el)
};


window.ready = function (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

window.insertAfter = function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
var xmlns = "http://www.w3.org/2000/svg"

window.svg = function (classes, height, width) {
  var elm = document.createElementNS (xmlns, "svg");
  elm.setAttribute('aria-hidden', 'true');
  elm.setAttribute('class', classes);
  elm.setAttribute('height', height);
  elm.setAttribute('version', '1.1');
  elm.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
  elm.setAttribute('width', width);

  return elm;
}

window.addSvg = function () {
  var elm = svg('octicon octicon-plus', 16, 12);
  var path = document.createElementNS (xmlns, 'path');
  path.setAttribute('d', 'M12 9H7v5H5V9H0V7h5V2h2v5h5v2z');
  elm.appendChild(path);
  return elm;
}

window.editSvg = function () {
  var elm = svg('octicon octicon-pencil', 16, 14);
  var path = document.createElementNS (xmlns, 'path');
  path.setAttribute('d', 'M0 12v3h3l8-8-3-3L0 12z m3 2H1V12h1v1h1v1z m10.3-9.3l-1.3 1.3-3-3 1.3-1.3c0.39-0.39 1.02-0.39 1.41 0l1.59 1.59c0.39 0.39 0.39 1.02 0 1.41z');
  elm.appendChild(path);
  return elm;
}

window.deleteSvg = function () {
  var elm = svg('octicon octicon-trashcan', 16, 12);
  var path = document.createElementNS (xmlns, 'path');
  path.setAttribute('d', 'M10 2H8c0-0.55-0.45-1-1-1H4c-0.55 0-1 0.45-1 1H1c-0.55 0-1 0.45-1 1v1c0 0.55 0.45 1 1 1v9c0 0.55 0.45 1 1 1h7c0.55 0 1-0.45 1-1V5c0.55 0 1-0.45 1-1v-1c0-0.55-0.45-1-1-1z m-1 12H2V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9z m1-10H1v-1h9v1z');
  elm.appendChild(path);
  return elm;
}
