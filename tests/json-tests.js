require('jsdom-global')()
require('mocha-sinon');
require('should-sinon');

const should = require('should');
const sinon = require('sinon');

const JsonStrategy = require('../src/JsonStrategy');
const h = require('../src/h');

describe('JsonStrategy', () => {
  let ld = h(JsonStrategy);

  it('should make a named element', () => {
    var el = ld('h1');
    el.tag.should.equal('h1');
  });

  it('should add classes ', () => {
    var el = ld('div.some-class');
    el.data.class.indexOf('some-class').should.equal(0);

    var el = ld('div.one.two');
    el.data.class.indexOf('one').should.equal(0);
    el.data.class.indexOf('two').should.equal(1);
  });

  it('should add an id', () => {
    var el = ld('div#myDiv');
    el.data.id.should.equal('myDiv');
  });

  it('should default to div ', () => {
    var el = ld('.some-class');
    var el2 = ld('#myDiv');
    el.tag.should.equal('div');
    el2.tag.should.equal('div');
  });

  it('should add text nodes', () => {
    var el = ld('.cool', 'my text');
    var el2 = ld('.cool', 'my text ', 'more text');
    el.children[0].children[0].should.equal('my text');

    el2.children[0].children[0].should.equal('my text ');
    el2.children[1].children[0].should.equal('more text');
  });

  it('should accept inline styles as an object', () => {
    var el = ld('.style-test', 'styling', {
      'style': {
        'border': '1px solid black'
      }
    });

    var el2 = ld('.style-test', 'styling', {
      'style': {
        'border': '1px solid black',
        'color': 'red'
      }
    });

    el.data.style.should.equal('border: 1px solid black;');
    el2.data.style.should.equal('border: 1px solid black;color: red;');
  });

  it('should accept event handlers', () => {
    const handlerFn = sinon.spy();

    var el = ld('button.test','click me!', {
      'onclick': handlerFn
    });

    el.data.onclick.should.equal(handlerFn);
  });

  it('accept child nodes', () => {
    var el = ld('ul', [
      [1,2,3,4,5].map(v => ld('li', `${v}`))
    ])

    el.children.length.should.equal(5);
    [].forEach.call(el.children, (n, idx) => {
      n.tag.should.equal('li');
      n.children[0].children[0].should.equal(`${idx+1}`);
    });
  });



});
