(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.autocompleteTweaks = {
    attach: function (context, settings) {
      $("input.form-autocomplete.auto_submit").on("autocompleteselect", function (event, ui) {
        var re = /^\[facet:(.*)\]$/;
        var keyword = ui.item.value;
        if (keyword.match(re)) {
          jQuery(event.currentTarget).addClass('facet-selected');
        }
      });
    }
  };

})(jQuery, Drupal, window, document);
