
const SELECTOR_REGEX = /([\.#]?[^\s#.]+)/;

function split(s,r) {
  return s.split(r);
}

function isObject(a) {
    return (!!a) && (a.constructor === Object);
}

function createEl(str) {
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


function parseArray(rootEl, arr) {
  arr.forEach(a => {
    if(a instanceof HTMLElement) {
      rootEl.appendChild(a);
    } else if(Array.isArray(a)) {
      parseArray(rootEl, a);
    } else {
      console.log(`unhandled property: ${a}`);
    }
  });

  return rootEl;
}

function parseStyles(styles) {
  var r = '';
  for(var k in styles) {
    r += `${k}: ${styles[k]};`
  }

  return r;
}

function applyAttributes(el, attrs) {

  for(var key in attrs) {
    var value = attrs[key] 
    if(key === 'style') {
      el.setAttribute('style', parseStyles(attrs[key]));
    } else if(key.startsWith('on')) {
      if(typeof attrs[key] !== 'function') throw new Error('Event listener must be function');
      else el.addEventListener(key.slice(2), attrs[key]);
    } else {
      el.setAttribute(key, attrs[key]);
    }
  }
  
  return el;
}




function ld() {
  var args = [...arguments];

  var tag = args.shift();
  var el = createEl(tag);
  
  args.forEach(arg => {
    if(typeof arg === 'string') {
      var tn = document.createTextNode(arg);
      el.appendChild(tn);
    } else if(Array.isArray(arg)) {
      parseArray(el, arg);
    } else if(isObject(arg)) {
      el = applyAttributes(el, arg);
    } else if(arg instanceof HTMLElement) {
      el.appendChild(arg);
    } else {
      console.log('Unhandled argument: ' + arg);
    }
  });

  return el;
}

if(module && module.exports) {
  module.exports = ld;
}
