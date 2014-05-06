var Composer = function (options) {
  this.editor = new Editor({
    el: options.editorEl
  });
  this.toolbar = new Toolbar({
    editor: this.editor,
    el: options.toolbarEl
  });
};

Composer.prototype.clear = function () {
  this.editor.clear();
  return this;
};

Composer.prototype.save = function () {
  this.editor.save();
  return this;
};

Composer.prototype.initialize = function (plugin) {
  return new plugin(this);
};