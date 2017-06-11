
var examples = [
  ld('h1.my-header', 'hello world'),
  ld('ul.counting-fun', [
    [1,2,3,4].map(v => ld('li', `num: ${v}`))
  ]),
  ld('span#contacts.contacts', 'hello world'),
  ld('.some-class', 'hello world'),
  ld('footer', 'goodbye world'),
  ld('.property-test', 'WHATS GOOD!', {
    'style': {
      'border': '1px solid black'
    }
  }),
  ld('button.test','click me!', {
    'onclick': (e) => {
      console.log('ayyy!');
    }

  })
];

examples.forEach(el => {
  console.log(el);
  document.body.appendChild(el);
});
