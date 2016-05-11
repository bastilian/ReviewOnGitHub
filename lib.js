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
}
