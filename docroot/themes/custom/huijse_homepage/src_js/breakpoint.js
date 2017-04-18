var breakpoint = {};

(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.breakpointDetect = {
    attach: function (context, settings) {
      breakpoint.refreshValue = function () {
        var windowWidth = $(window).width();
        if (windowWidth >= 1280) {
          this.value = 'desktop-l';
        } else if (windowWidth >= 980) {
          this.value = 'desktop';
        } else if (windowWidth >= 768) {
          this.value = 'tablet';
        } else {
          this.value = 'mobile';
        }

        return this.value;
      };

      breakpoint.refreshValue();
      $('body').addClass(breakpoint.value);

      var currentValue = breakpoint.refreshValue();
      var newValue = '';

      // React to resizing of window
      $(window).on('resize', function () {
        newValue = breakpoint.refreshValue();

        if (currentValue != newValue) {
          currentValue = newValue;
          initDefaultLayout();
        }
      });
    }
  };
})(jQuery, Drupal, window, document);
