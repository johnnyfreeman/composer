var modal = new Modal(document.getElementById('modal'));

var composer = new Composer({
  editorEl: document.getElementById('editor'),
  toolbarEl: document.getElementById('toolbar')
});

// plugins
composer.initialize(PhraseExpander);
composer.initialize(PlaceHolder);

$(document.getElementById('editor')).trigger('focus');