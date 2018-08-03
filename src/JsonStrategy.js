var { SELECTOR_REGEX, parseStyles, split, isObject } = require('./util');

class JsonStrategy {

  create(str) {

    var tags = split(str, SELECTOR_REGEX);
    var current = tags.shift();
    var data = {};
    var classes = [];
    var tag = null;

    while(tags.length) {
      if(current[0] === '.') {
        if(tag === null) tag = 'div';
        classes.push(current.slice(1));
      } else if(current[0] === '#') {
        if(tag === null) tag = 'div';
        data['id'] = current.slice(1);
      } else if(current === '') {
      } else {
        if(tag === null) {
          tag = current;
        }
      }

      current = tags.shift();
    }

    data['class'] = classes;

    return {
      tag: tag,
      data: data,
      children: [],
    };
  }

  createText(str) {
    return {
      tag: 'text',
      data: {},
      children: [
        str
      ]
    }
  }

  appendChild(el, child) {
    el.children.push(child);
  }

  applyAttributes(el, attrs) {

    for(var key in attrs) {
      var value = attrs[key];

      if(key === 'style') {
        el.data.style = parseStyles(attrs[key]);
      } else {
        this.setAttribute(el, key, attrs[key]);
      }
    }

    return el;
  }

  setAttribute(el, key, value) {
    el.data[key] = value;
  }

  addEventListener(el, eventName, fn) {
    el.data[eventName] = fn;
  }
}

module.exports = JsonStrategy;
