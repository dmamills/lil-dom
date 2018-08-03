# lil' dom

[![Build Status](https://travis-ci.org/dmamills/lil-dom.svg?branch=master)](https://travis-ci.org/dmamills/lil-dom)

a bit of a hyperscript esque experiment. Offers two different strategies. `NodeStrategy` converts directly to html elements, where as `JsonStrategy` converts into a JS object representation.

## api

```javascript

/*
  Creates:
  <div class="some-class">
    <button class="primary">click me!</button>
  </div>
*/

var NodeStrategy = require('lil-dom').NodeStrategy;
var h = require('lil-dom').h;
var ld = h(NodeStrategy);

var myEl = ld('.some-class', [
  ld('button.primary', 'click me!', {
    'onclick': (e) => { console.log('Gotchya!') }
  })
]);

document.appendChild(myEl);


/*

  Creates:
  {
    tag: 'div',
    data: { class: ['some-class'] },
    children: [
      {
        tag: 'button',
        data: { class: ['primary'], onclick: (e) => { console.log('Gotchya!') } },
        children: [
          { tag: 'text', data: {}, children: ['click me!'] }
        ]
      }
    ]
  }
*/

var JsonStrategy = require('lil-dom').JsonStrategy;
var h = require('lil-dom').h;
var ld = h(JsonStrategy);

var myEl = ld('.some-class', [
  ld('button.primary', 'click me!', {
    'onclick': (e) => { console.log('Gotchya!') }
  })
]);


```
