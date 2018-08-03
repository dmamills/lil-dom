var { SELECTOR_REGEX, parseStyles, split, isObject } = require('./util');

class NodeStrategy {
  create(str) {
    var tags = split(str, SELECTOR_REGEX);
    var current = tags.shift();
    var el = null;

    while(tags.length) {
      if(current[0] === '.') {
        if(el === null) el = document.createElement('div');
        el.classList.add(current.slice(1));

      } else if(current[0] === '#') {
        if(el === null) el = document.createElement('div');
        el.setAttribute('id', current.slice(1));
      } else if (current === '') {
      } else {
        if(el == null) el = document.createElement(current);
      }

      current = tags.shift();
    }

    return el;
  }
  createText(str) {
    return document.createTextNode(str);
  }

  appendChild(el, child) {
    el.appendChild(child);
  }

  applyAttributes(el, attrs) {
    for(var key in attrs) {
      var value = attrs[key];
      if(key === 'style') {
        el.setAttribute('style', parseStyles(attrs[key]));
      } else if(key.startsWith('on')) {
        if(typeof attrs[key] !== 'function') throw new Error('Event listener must be function');
        else {
          this.addEventListener(el, key.slice(2), attrs[key]);
          // el.addEventListener(key.slice(2), attrs[key]);
        }
      } else {
        this.setAttribute(el, key, attrs[key]);
        // el.setAttribute(key, attrs[key]);
      }
    }

    return el;
  }

  setAttribute(el, key, value) {
    el.setAttribute(key, value);
  }

  addEventListener(el, eventName, fn) {
    el.addEventListener(eventName, fn);
  }
}

module.exports = NodeStrategy;
