(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.buildBackLink = {
    attach: function (context, settings) {

      // This is nog a company page. Exit function for back link creation.
      if ($('article.node--type-company.node--view-mode-full', context).length == 0) {
        return;
      }

      // Retrieve backlink url from cookie, if not, go to other link.
      var poaBackLink = $.cookie('poaBackLink');

      // Create html backlink
      if(poaBackLink !== undefined) {
        var backLink = poaBackLink;
      } else {

        // TODO: replace backlink with the 'Laden en lossen' link.
        backLink = '/';
      }
      var htmlBackLink = '<a href="'+backLink+'" class="back-link">' + Drupal.t('Go back') + '</a>';

      $('#block-poa-bedrijvengids-content', context).before(htmlBackLink);
    }
  };

  Drupal.behaviors.setCookieBackLink = {
      attach: function(context, settings) {

        // This is nog a search page. Exit cookie saving for back link.
        if ($('.view-search', context).length == 0) {
          return;
        }

        // Define the backlink url
        var currentURL = window.location.href;

        // Set the backlink as a cookie
        var cookieSet = $.cookie('poaBackLink', currentURL, { path: '/' });
      }
  };

})(jQuery, Drupal, window, document);
