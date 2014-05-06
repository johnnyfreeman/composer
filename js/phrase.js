var Phrase = function (props) {
  this.title = props.title;
  this.phrase = '';
  this.trigger = props.trigger;
  this.variables = props.variables || [];
  this.data = {};

  // TODO: compilation should be done 
  // when the phrase is save to the database
  this.template = Hogan.compile(props.text);
};

// collect and necessary user 
// input and render the phrase
Phrase.prototype.compile = function () {
  if (this.variables.length === 0) return this.phrase = this.template.render({});
  return this.prompt(0).then(this.render.bind(this));
};

// render the template data 
// and save to this.phrase
Phrase.prototype.render = function () {
  this.phrase = this.template.render(this.data);
  return this.phrase;
};

// prompt for given variable iterator
Phrase.prototype.prompt = function (i) {
  var variable, promise;
  variable = new PhraseVariable(this.variables[i]);
  promise = variable.prompt(300);
  promise.then(this._setData.bind(this));
  if (typeof this.variables[i+1] !== 'undefined') {
    promise = promise.then(this.prompt.bind(this, i+1));
  }
  return promise;
};

// saves user input
Phrase.prototype._setData = function (data) {
  return _.extend(this.data, data);
};

var PhraseVariable = function (props) {
  this.name = props.name;
  this.type = props.type || 'freetext';
  this.options = props.options || {};
};

PhraseVariable.prototype.prompt = function (duration) {
  return modal.prompt(this.name, duration);
};



var Phrases = [];

Phrases.push(new Phrase({
  title: 'Patient presents...',
  text: 'Patient presents today for ',
  trigger: 'pptf'
}));

Phrases.push(new Phrase({
  title: 'FYI',
  text: 'For your information, ',
  trigger: 'fyi'
}));

Phrases.push(new Phrase({
  title: 'CC',
  text: 'chief complaint ',
  trigger: 'cc'
}));

Phrases.push(new Phrase({
  title: 'DX',
  text: 'diagnosis ',
  trigger: 'dx'
}));

Phrases.push(new Phrase({
  title: 'HPI',
  text: 'Patient presents today with a {{time}} history of {{illness}}. ',
  trigger: 'hpi',
  variables: [
    {name: 'time'},
    {name: 'illness'}
  ]
}));

Phrases.push(new Phrase({
  title: 'Hello World',
  text: 'Hello {{name}}!',
  trigger: 'hw',
  variables: [
    {name: 'name'}
  ]
}));