(function ($, Drupal, window, document) {
  'use strict';

  // Backstretch gives a background image used on the front page.

  Drupal.behaviors.backStretch = {
    attach: function (context, settings) {

      $(".backstretch").backstretch("http://www.youtech.nl/wp-content/uploads/2015/08/blue-sky.jpg");
    }
  };

})(jQuery, Drupal, window, document);
