var Modal = function (element) {
  this.el = element;
};

Modal.prototype.hide = function (duration) {
  var deferred = Q.defer();

  var $overlay = $(this.el);
  var $container = $overlay.find('.modal-container');

  // fade in overlay
  $overlay.velocity({opacity: 0}, {
    display: 'none',
    duration: duration
  });

  // move container in view
  $container.velocity({
    top: '-500px'
  }, {
    complete: function () { deferred.resolve(this); },
    duration: duration
  });

  return deferred.promise;
};

Modal.prototype.show = function (duration) {
  var deferred = Q.defer();

  var $overlay = $(this.el);
  var $container = $overlay.find('.modal-container');

  // fade in overlay
  $overlay.velocity({opacity: 1}, {
    display: 'block',
    duration: duration
  });

  // move container in view
  $container.velocity({
    top: '-100px'
  }, {
    complete: function () { deferred.resolve(this); },
    duration: duration
  });

  return deferred.promise;
};

Modal.prototype.prompt = function (options) {

  // render modal
  var $container = $(this.el).find('.modal-container');
  $container.html(templates.modal.render(options.data));

  // show
  return this.show(options.duration)
    // prompt
    .then(function (modalEl) {
      var deferred = Q.defer();
      // set on keyup enter event
      $container.find('input').trigger('focus').on('keyup', function (e) {
        if (e.keyCode == 13) {
          var data = {};
          data[options.data.name] = $(this).val();
          deferred.resolve(data);
        }
      });
      $container.find('[data-modal="hide"]').on('click', deferred.reject);
      return deferred.promise;
    });
};