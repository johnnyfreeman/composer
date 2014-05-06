var Toolbar = function (options) {
  this.el = options.el;
  var editor = this.editor = options.editor;

  $(this.el).find('[data-editor]').on('click', function (e) {
    e.preventDefault();
    var method = $(this).data('editor');
    editor.updateCaret();
    editor[method]();
  });

  $(this.el).find('[data-insert]').on('click', function (e) {
    e.preventDefault();
    var text = $(this).data('insert');
    editor.updateCaret();
    editor.insert(text);
  });
};

// 
Toolbar.prototype.trigger = function () {

};