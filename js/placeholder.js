var PlaceHolder = function (composer) {
  this.composer = composer;
  this.editor = composer.editor;
  this.editorEl = this.editor.el;
  this.$editorEl = $(this.editorEl);

  this.$editorEl.on('focus', this.clear.bind(this));
  this.$editorEl.on('blur', this.append.bind(this));
};

PlaceHolder.prototype.clear = function () {
  if (this.$editorEl.find('.placeholder').length) {
    this.composer.clear();
  }
};

PlaceHolder.prototype.append = function () {
  if (this.editorEl.childNodes.length === 0) {
    this.$editorEl.append('<span class="placeholder">Type Here&hellip;</span>');
  }
};