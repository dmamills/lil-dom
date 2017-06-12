
// you can even style the world!
var styles = ld('style', `
 body {
   margin: 0;
   font-family: Helvetica, sans-serif;
 }

 h1 {
   margin: 0;
 }

 pre {
  padding: 0.8rem;
  background: lightgrey;
 }

 header {
   padding: 1.5rem;
 }

 .sections {
  width: 80%;
  margin: 0 auto;
 }

 nav {
   display: flex;
   border-top: 1px solid black;
   border-bottom: 1px solid black;
 }

a.nav-item {
  flex-grow: 1;
  padding: 1rem;
}

.becomes {
  font-weight: 500;
  text-transform: uppercase;
}

`);


/**
 * Build out an example section, content should be a node
 */
function buildSection(id, title, content, src, result) {
  return ld(`section#${id}`, [
    ld('h2', `${title}`),
    content,
    ld('h3', `${title} Examples`),
    ld('pre', src),
    ld('.becomes', 'Becomes'),
    ld('pre', result),
  ]);
}

/**
 * Basic Section
 */
var basicContent =  ld('p', ld('p', 
   `lil-dom is a just another h clone. inspired by `,
   ld('a', {href: 'https://github.com/hyperhype/hyperscript'}, 'hyperscript'),
  ' and the ',
   ld('a', { href:'https://github.com/hyper2/h2spec'}, 'h2 spec.'),
  ' It\'s a simple way to build out dom nodes, this entire example page is built with it.'
))

var basicSection = buildSection('basic', 'Basic', basicContent, `// h(<tagname>, ...(<string> | <options> | <Array>)
ld('h1', 'Some header')
ld('h1.primary', 'header with class')
ld('h1#primary', 'header with id')
ld('.primary', 'defaults to div')
ld('.primary.secondary', 'wow two classes!')
`, `<h1>Some Header</h1>
<h1 class="primary">header with class</h1>
<h1 id="primary">header with id</h1>
<div class="primary">defaults to div</div>
<div class="primary secondary">wow two classes!</div>
`);


/**
 * Options Section
 */
var optionsContent = ld('p', `The second parameter to the function allows you to pass options to your dom node. Style can be provided as an object and will be inlined.`);
var optionsExamples =`ld('a', { href: 'http://example.com/' }, 'a link.')
ld('span', { style: { 'font-weight': '600' } }, 'heavy')
ld('.cool', { 'data-name': 'fun!' } })
`;

var optionsResults = `<a href="http://example.com/">a link</a>
<span style="font-weight: 600;">heavy</span>
<div class="cool" data-name="fun!"></div>
`

var optionsSection = buildSection('options', 'Options', optionsContent, optionsExamples, optionsResults);

/**
 * Events section
 */
var eventsContent = ld('p', 'Events handlers can be bound by passing in the attributes object. Note: handler functions are not inlined, but attached through addEventListener.');

var eventsExamples = `ld('button', { 'onclick': (e) => { console.log('clicked me!'); }, 'click me')`
var eventsResults = `<button>click me</button>`;
var eventsSection = buildSection('events', 'Events', eventsContent, eventsExamples, eventsResults);

var nestingContent = ld('p', 'Any element passed as an argument will be appended as a child node. If any array is found it will be iterated over and append any nodes found there.');
var nestingExamples = `ld('p', 'My paragraph has a ', ld('a', { href: 'http://example.com/'}, 'link'), 'in the middle!.')
ld('.parent', [
  [1,2,3,4,5].map(v => ld('.kid', v.toString)
])`
var nestingResults = `<p>My paragraph has a <a href="http://example.com/">link</a> in the middle!</p>
<div class="parent">
  <div class="kid">1</div>
  <div class="kid">2</div>
  <div class="kid">3</div>
  <div class="kid">4</div>
  <div class="kid">5</div>
</div>`
var nestingSection = buildSection('nesting', 'Nesting', nestingContent, nestingExamples, nestingResults);


//"Nav bar"
var nav = ld('nav', [
  ['basic','options','events','nesting'].map(n => ld('a.nav-item', { href: `#${n}` }, n))
]);

// The webpage constructed
var examplePage = ld('.example-page', [
  ld('header', [ ld('h1', 'lil-dom') ]),
  nav,
  ld('.sections', [ basicSection, optionsSection, eventsSection, nestingSection ])
]);


//mount it up
document.head.appendChild(styles);
document.body.appendChild(examplePage);
