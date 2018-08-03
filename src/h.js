var { SELECTOR_REGEX, split, isObject } = require('./util');


function ld(Strategy) {
  var strategy = new Strategy();
  function parseArray(rootEl, arr) {
    arr.forEach(a => {
      if(a instanceof HTMLElement) {
        strategy.appendChild(rootEl, a);
      } else if(isObject(a) && a.tag && a.data && a.children) {
        strategy.appendChild(rootEl, a);
      } else if(Array.isArray(a)) {
        parseArray(rootEl, a);
      } else {
        console.log(`unhandled property: ${a}`);
      }
    });

    return rootEl;
  }

  return function() {
    var args = [...arguments];
    var tag = args.shift();
    var el = strategy.create(tag);

    args.forEach(arg => {
      if(typeof arg === 'string') {
        var tn = strategy.createText(arg);
        strategy.appendChild(el, tn);
      } else if(Array.isArray(arg)) {
        parseArray(el, arg);
      } else if(arg instanceof HTMLElement) {
        strategy.appendChild(el, arg);
      } else if(isObject(arg)) {
        el = strategy.applyAttributes(el, arg);
      } else {
        console.log('Unhandled argument: ' + arg);
      }
    });

    return el;

  };
}

if(module && module.exports) {
  module.exports = ld;
}
