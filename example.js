var NodeStrategy = require('./index').NodeStrategy;
var h = require('./index').h;
var ld = h(NodeStrategy);

// you can even style the world!
var styles = ld('style', `
 body {
   margin: 0;
   font-family: Helvetica, sans-serif;
 }

 h1 {
   margin: 0;
 }

 h2, h3, p {
  color: #30373b;
 }

 pre {
  display: inline-block;
  border-radius: 5px;
  padding: 0.8rem;
  background: lightgrey;
 }

 header {
   background-color: #30373b;
   color: #fff;
   padding: 1.5rem;
 }

 .sections {
  display: flex;
  flex-direction: column;
 }

 section {
  padding: 1.25rem;
 }

 nav {
   display: flex;
   border-bottom: 1px solid #30373b;
 }

a.nav-item {
  flex-grow: 1;
  padding: 1rem;
}

.becomes {
  font-weight: 500;
  text-transform: uppercase;
}

footer p {
  color: #fff;
}

footer {
  background-color: #30373b;
  border-top: 1px solid black;
  padding: 1rem;
}

a, a:visited {
  font-weight: 400;
  color: #30373b;
}

footer a, footer a:visited {
  color: #fff;
}

footer p {
  margin: 0;
}

`);

//handy for quick linkin'
function anchor(href, text) {
  return ld('a', { href }, text);
}

/**
 * Basic Section, each section is made up of:
 * content, a HtmlElement
 * examples, a templated string
 * results, a templated string
 * html, => rendered at the end
 */
var basic = { id: 'basic' };
basic.content =  ld('p', 'lil-dom is a just another h clone. inspired by ',
   anchor('https://github.com/hyperhype/hyperscript', 'hyperscript'),
  ' and the ',
   anchor('https://github.com/hyper2/h2spec', 'h2 spec.'),
  ' It\'s a simple way to build out dom nodes. In fact this entire example page is built with it, look how ',
  anchor('https://github.com/dmamills/lil-dom/blob/master/example.js', 'here!')
)

basic.examples = `// ld(<tagname>, ...(<string> | <options> | <Array> | <HtmlElement>))
ld('h1', 'Some header')
ld('h1.primary', 'header with class')
ld('h1#primary', 'header with id')
ld('.primary', 'defaults to div')
ld('.primary.secondary', 'wow two classes!')
`;

basic.results = `<h1>Some Header</h1>
<h1 class="primary">header with class</h1>
<h1 id="primary">header with id</h1>
<div class="primary">defaults to div</div>
<div class="primary secondary">wow two classes!</div>
`;

/**
 * Options Section
 */
var options = {id: 'options' };
options.content = ld('p', `The second parameter to the function allows you to pass options to your dom node. Style can be provided as an object and will be inlined.`);
options.examples =`ld('a', { href: 'http://example.com/' }, 'a link.')
ld('span', { style: { 'font-weight': '600' } }, 'heavy')
ld('.cool', { 'data-name': 'fun!' } })
`;

options.results = `<a href="http://example.com/">a link</a>
<span style="font-weight: 600;">heavy</span>
<div class="cool" data-name="fun!"></div>
`

/**
 * Events section
 */
var events = { id: 'events' };
events.content = ld('p', 'Events handlers can be bound by passing in the attributes object. Note: handler functions are not inlined, but attached through addEventListener.');
events.examples = `ld('button', { 'onclick': (e) => { console.log('clicked me!'); }, 'click me')`
events.results = `<button>click me</button>`;

/**
 * Events section
 */
var nesting = { id: 'nesting' };
nesting.content = ld('p', 'Any element passed as an argument will be appended as a child node. If any array is found it will be iterated over and append any nodes found there.');
nesting.examples = `ld('p', 'My paragraph has a ', ld('a', { href: 'http://example.com/'}, 'link'), 'in the middle!.')
ld('.parent', [
  [1,2,3,4,5].map(v => ld('.kid', v.toString)
])`
nesting.results = `<p>My paragraph has a <a href="http://example.com/">link</a> in the middle!</p>
<div class="parent">
  <div class="kid">1</div>
  <div class="kid">2</div>
  <div class="kid">3</div>
  <div class="kid">4</div>
  <div class="kid">5</div>
</div>`

/**
 * Build out an example section, content should be a node
 */
function renderSection(section) {
  return ld(`section#${section.id}`, [
    ld('h2', `${section.title}`),
    section.content,
    ld('pre', section.examples),
    ld('.becomes', 'Becomes'),
    ld('pre', section.results),
  ]);
}

//Render each section
var sections = [basic, options, events, nesting].map(s => {
  s.title = s.id[0].toUpperCase() + s.id.substr(1)
  s.html = renderSection(s);
  return s;
});

//"Nav bar"
var nav = ld('nav', [
  sections.map(s => s.id).map(n => ld('a.nav-item', { href: `#${n}` }, n))
]);

var footer = ld('footer', [
  ld('p', 'Made by ', anchor('http://yomills.com', 'daniel mills'), ' check it out on ', anchor('https://github.com/dmamills/lil-dom', 'github')) 
]);

// The webpage constructed
var examplePage = ld('.example-page', [
  ld('header', [ ld('h1', 'lil-dom') ]),
  nav,
  ld('.sections', sections.map(s => s.html)),
], footer);

//mount it up
document.head.appendChild(styles);
document.body.appendChild(examplePage);
