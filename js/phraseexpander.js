var PhraseExpander = function (composer) {
  var listener = new keypress.Listener(composer.editor.el);
  var caret = composer.editor.caret;

  $.each(Phrases, function (i, phrase) {
    listener.sequence_combo(phrase.trigger.split('').join(' ') + ' tab', function() {
      composer.editor.updateCaret();
      caret.extend(-phrase.trigger.length);
      Q.when(phrase.compile(), function (val) {
        composer.editor.insert(phrase.phrase);
      });
      // caret.select(node, 30, 38);
    }, true);
  });
};