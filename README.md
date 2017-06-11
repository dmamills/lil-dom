# lil' dom

[![Build Status](https://travis-ci.org/dmamills/lil-dom.svg?branch=master)](https://travis-ci.org/dmamills/lil-dom)

a bit of a hyperscript esque experiment

## api

```javascript

/*
  Creates:
  <div class="some-class">
    <button class="primary">click me!</button>
  </div>
*/

var myEl = ld('.some-class', [
  ld('button.primary', 'click me!', {
    'onclick': (e) => { console.log('Gotchya!') }
  })
]);


document.appendChild(myEl);
```
