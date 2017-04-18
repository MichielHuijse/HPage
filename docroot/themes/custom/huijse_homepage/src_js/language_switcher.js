(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.languageSwitcher = {
    attach: function (context, settings) {
      var $headerWrapper = $('#header', context);
      var $toggle = $('.toggle-menu', $headerWrapper);
      var $toggleLang = $('.toggle-language', '#block-taalkeuze');
      var $captionLang = $('.caption', $toggleLang).not('.close');
      var $captionClose = $('.caption.close', $toggleLang);
      var $contentLang = $('.content', '#block-taalkeuze');

      /* Toggle lang display. */

      // Hide close button with javascript.
      $captionClose.hide();
      $contentLang.hide();

      // Show language switch.
      $captionLang.click(function(e) {

        // In case the main-menu is active, hide it.
        if($toggle.hasClass('active')) {
          $toggle.trigger('click');
        }

        // Show language switch.
        $captionClose.slideDown(100, function(){
          $contentLang.slideDown(100);
        });
      });

      // Hide language switch.
      $captionClose.click(function (e) {
        $contentLang.hide();
        $captionClose.hide();
      });

    }
  };

})(jQuery, Drupal, window, document);
