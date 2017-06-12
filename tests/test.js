require('jsdom-global')()
require('mocha-sinon');
require('should-sinon');

const should = require('should');
const sinon = require('sinon');
const ld = require('../src/ld');

describe('lil-dom', () => {

  it('should make a named element', () => {
    var el = ld('h1');
    el.tagName.should.equal('H1');
  });

  it('should add classes ', () => {
    var el = ld('div.some-class');
    el.classList.contains('some-class').should.be.true();

    var el = ld('div.one.two');
    el.classList.contains('one').should.be.true();
    el.classList.contains('two').should.be.true();
  });

  it('should add an id', () => {
    var el = ld('div#myDiv');
    el.id.should.equal('myDiv');
  });

  it('should default to div ', () => {
    var el = ld('.some-class');
    var el2 = ld('#myDiv');
    el.tagName.should.equal('DIV');
    el2.tagName.should.equal('DIV');
  });

  it('should add text nodes', () => {
    var el = ld('.cool', 'my text');
    var el2 = ld('.cool', 'my text ', 'more text');
    el.innerHTML.should.equal('my text');
    el2.innerHTML.should.equal('my text more text');
  });

  it('should accept inline styles as an objecet', () => {
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

    el.getAttribute('style').should.equal('border: 1px solid black;');
    el2.getAttribute('style').should.equal('border: 1px solid black;color: red;');
  });

  it('should accept event handlers', () => {
    const handlerFn = sinon.spy();

    var el = ld('button.test','click me!', {
      'onclick': handlerFn 
    });

    var e = new Event('click');
    el.dispatchEvent(e);
    handlerFn.should.be.calledOnce();
  });

  it('accept child nodes', () => {
    var el = ld('ul', [
      [1,2,3,4,5].map(v => ld('li', `${v}`))
    ])

    el.children.length.should.equal(5);
    [].forEach.call(el.children, (n, idx) => {
      n.tagName.should.equal('LI');
      n.innerHTML.should.equal(`${idx+1}`);
    });
  });

  it('accepts html elements', () => {
    var el = ld('p', 'some text', ld('a', { href: 'http://example.com/' }, 'a link'));

    el.children[0].tagName.should.equal('A');
    el.children[0].href.should.equal('http://example.com/');

  });
});
