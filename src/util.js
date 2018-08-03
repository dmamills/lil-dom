
const SELECTOR_REGEX = /([\.#]?[^\s#.]+)/;

function split(s, r) {
  return s.split(r);
}

function isObject(a) {
    return (!!a) && (a.constructor === Object);
}

function parseStyles(styles) {
  var r = '';
  for(var k in styles) {
    r += `${k}: ${styles[k]};`
  }

  return r;
}

module.exports = {
  split,
  isObject,
  parseStyles,
  SELECTOR_REGEX,
};
