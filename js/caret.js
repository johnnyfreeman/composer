var Caret = function (element) {
  this.el = element;
  this.document = element.ownerDocument;
  this.window = this.document.defaultView || this.document.parentWindow;
  this.selection = this.window.getSelection();
  // this.updateRange();
  // $(this.el).on('mouseup keyup', $.proxy(this.updateRange, this));
};

// update Range object
Caret.prototype.updateRange = function () {
  var range;
  // try actual range selected by the user
  try {
    range = this.selection.getRangeAt(0);

    // make sure we are only update 
    // the range if the start container 
    // is equal to or is a child of this.el
    if ($(range.startContainer).closest(this.el).length < 1 || $(range.endContainer).closest(this.el).length < 1) {
      throw new Error();
    }
  }
  // create new range at 
  // end of Caret
  catch (e) {
    range = this.createRange();
    range.setStart(this.el, this.el.childNodes.length);
  }

  return this.setRange(range);
};

Caret.prototype.setRange = function (range) {
  this.selection.removeAllRanges();
  this.selection.addRange(range);
  this.range = range;
  return this;
};

Caret.prototype.createRange = function () {
  return this.document.createRange();
};

// move caret after node
Caret.prototype.moveAfter = function (node) {
  var range = this.createRange();
  range.setStartAfter(node);
  return this.setRange(range);
};

// move caret before node
Caret.prototype.moveBefore = function (node) {
  var range = this.createRange();
  range.setStartBefore(node);
  return this.setRange(range);
};

// move caret before node
Caret.prototype.moveToBeginningOf = function (node) {
  var range = this.createRange();
  range.setStart(this.el, 0);
  return this.setRange(range);
};

// move caret before node
Caret.prototype.moveToEndOf = function (node) {
  var range = this.createRange();
  range.setStart(this.el, this.el.childNodes.length);
  return this.setRange(range);
};

// Replace Caret's range contents
Caret.prototype.replace = function (contents) {
  return this.clear().insert(contents);
};

Caret.prototype.clear = function () {
  this.range.deleteContents();
  return this;
};

Caret.prototype.insert = function (contents) {
  // convert string to Node
  if (typeof contents === "string") {
    contents = this.document.createTextNode(contents);
  }

  this.range.insertNode(contents);
  this.moveAfter(contents);
  return contents;
};

// extend range focus
Caret.prototype.extend = function (i) {
  var range = this.createRange();
  range.setStart(this.range.startContainer, this.range.startOffset + i);
  range.setEnd(this.range.endContainer, this.range.endOffset);
  return this.setRange(range);
};

// select start and end point for given node
Caret.prototype.select = function (node, start, end) {
  var range = this.createRange();
  range.setStart(node, 30);
  range.setEnd(node, 38);
  return this.setRange(range);
};