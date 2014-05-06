var Editor = function (options) {
  this.el = options.el;
  this.caret = new Caret(this.el);
};

// clear all contents of editor
Editor.prototype.clear = function () {
  // http://stackoverflow.com/a/3955238/422356
  while (this.el.firstChild) {
    this.el.removeChild(this.el.firstChild);
  }
  this.caret.moveToEndOf(this.el);
  return this;
};

// save contents of editor
Editor.prototype.save = function () {
  // press ctrl+enter, click save, or call Editor.save()
  return console.log('saving editor contents...');
};

// insert contents into editor
Editor.prototype.insert = function (node) {
  return this.caret.replace(node);
};

// replace all contents in editor
Editor.prototype.replace = function (node) {
  return this.clear().insert(node);
};

// update location of editor's caret
Editor.prototype.updateCaret = function () {
  this.caret.updateRange();
  return this;
};