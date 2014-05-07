var Debugger = function (composer) {
  var listener = new keypress.Listener();

  listener.simple_combo("control alt d", function() {
    debugger;
  });
};