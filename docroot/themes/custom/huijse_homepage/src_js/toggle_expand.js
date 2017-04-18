(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.toggleExpand = {
    attach: function (context, settings) {

      // Add expand function
      $('.collapse.collapsed', context).each(function (e) {
        var $target = $($(this).data('target'));
        $target.hide();

        $(this).one().click(function (event) {
          $(this).toggleClass('collapsed');
          $target.fadeToggle();
        });
      });
    }
  };

})(jQuery, Drupal, window, document);
