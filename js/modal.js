var Modal = function (element) {
  this.el = element;
};

Modal.prototype.hide = function (duration) {
  var deferred = Q.defer();
  $(this.el).velocity({
    opacity: 0//,
    // top: '-30',
    // left: '-300'
  }, {
    complete: function () { deferred.resolve(this); },
    display: 'none',
    duration: duration
  });
  return deferred.promise;
};

Modal.prototype.show = function (duration) {
  var deferred = Q.defer();
  $(this.el).velocity({
    opacity: 1//,
    // top: '+30',
    // left: '+300'
  }, {
    complete: function () { deferred.resolve(this); },
    display: 'block',
    duration: duration
  });
  return deferred.promise;
};

Modal.prototype.prompt = function (name, duration) {
  var $content = $(this.el).find('.content');
  $content.html(templates.prompt.render({name:name}));
  var $input = $content.find('input');
  $input.val('');
  // show
  return this.show(duration)
    // prompt
    .then(function (modalEl) {
      var deferred = Q.defer();
      // set on keyup enter event
      $input.trigger('focus').on('keyup', function (e) {
        if (e.keyCode == 13) {
          var data = {};
          data[name] = $(this).val();
          deferred.resolve(data);
        }
      });
      return deferred.promise;
    })
    // hide modal, return input value
    .then(function (val) {
      return modal.hide(duration/2).then(function () {
        return val;
      });
    });
};