/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.19
 *
 * Requires: jQuery >= 1.2.3
 */
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a);
}else{a(jQuery);}}(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';
}var f={absolute:false,clone:false,includeMargin:false,display:"block"};var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";
  e=e.clone().attr("style",m).appendTo("body");};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");
  d+="visibility: hidden !important; display: "+i.display+" !important; ";if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);
    var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");
}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();j();return k;}});}));
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

(function ($, Drupal, window, document) {
  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.poaNavigation = {
    attach: function (context, settings) {

      /* Toggle main menu */

      // Define variables.
      var $headerWrapper = $('#header', context);
      var $toggle = $('.toggle-menu', $headerWrapper);
      var $mainMenu = $('#block-remotemenublock', context);
      var $mainMenuContent = $mainMenu.children('.content');
      var $toggleLang = $('.toggle-language', '#block-taalkeuze');
      var $captionClose = $('.caption.close', $toggleLang);
      var $contentLang = $('.content', '#block-taalkeuze');
      var $headLinks = $('.head-link', $mainMenu);
      var $allHeadlinks = $('.head-link');
      var $landingLinks = $('.landing-item', $mainMenu);
      var $landingSub = $landingLinks.children('ul.menu');


      // Toggle main-menu display.
      $toggle.once().click(function (e) {

        // Show/hide menu.
        $(this).toggleClass('active');

        // Show/hide hamburger icon.
        $('img', $toggle).toggleClass('element-invisible');

        // Show/hide caption.
        var $caption = $('.caption', $toggle).not('.element-invisible');
        var $hiddenCaption = $('.caption.element-invisible', $toggle);
        $caption.addClass('element-invisible');
        $hiddenCaption.removeClass('element-invisible');

        // Hide language switch when showing main-menu.
        if ($(this).hasClass('active')) {

          $mainMenu.css('visibility', 'visible');
          $mainMenuContent.addClass('visible');

          // Reveil active menu item.
          if (!$mainMenu.hasClass('triggered')) {

            // Add default check to the mainmenu.
            $mainMenu.addClass('triggered');

            $('.landing-item.active-trail', $mainMenu).trigger('click');
            $('.head-link.active-trail', $mainMenu).trigger('click');
          }

          // Show the head-links and their active submenu.
          $('.head-link.active', '#block-remotemenublock').children('ul.menu').show();
          $('.head-link.active', '#block-remotemenublock').children('.extra-information').show();

          if ($contentLang.is(':visible') === true) {
            $contentLang.hide();
            $captionClose.hide();
          }
        } else {
          $mainMenu.css('visibility', 'hidden');
          $mainMenuContent.removeClass('visible');
          $('.head-link.active', '#block-remotemenublock').children('ul.menu').hide();
          $('.head-link.active', '#block-remotemenublock').children('.extra-information').hide();
        }
      });


      /* Toggle main-menu behavior.

       1. Make sure the height of the .head-link submenu's is correct (they are positioned absolute).
       There was no other way to fix that.
       2. Then we hide everything needed with jquery (not with css, in case there's no js enabled
       it will be always visible).
       3. Prevent default for landing links.
       4. Then we add accordeon behavior.
       5. We'll add a click behavior to the headlinks, to toggle their immediate submenu's.

       */

      // Set the height of the landing links, reserve space for the absolute positioned submenu.
      $allHeadlinks.each(function (e) {

        // The reserveHeight contains the height of the submenu, an extra padding of 25, and in case there's an 'extra information field' also 101 padding extra.
        var reserveHeight = ($(this).children('ul.menu').outerHeight()) + 25;
        var extraInfo;
        if ($(this).children('.extra-information').length > 0) {
          extraInfo = $(this).children('.extra-information').outerHeight();
        } else {
          extraInfo = 0;
        }
        $(this).data('reserve-height', reserveHeight + extraInfo);
      });

      // Hide headlink menu's and their extra-information-children.
      $headLinks.parent('ul').hide();

      // Prevent default click for landing items and show/hide headlinks.
      $landingLinks.once().click(function (e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $(this).siblings('.landing-item').removeClass('active');

        // Current clicked landing item was already open. Remove open class and close landing item.
        if ($(this).children('ul.menu').hasClass('open')) {
          $(this).children('ul.menu').slideUp(500);
          $(this).children('ul.menu').removeClass('open');
        }

        // Opens the landing submenu headlinks.
        else {

          var minusHeight = 0;
          $landingSub.each(function () {
            if ($(this).hasClass('open')) {
              minusHeight += $(this).outerHeight();
              $(this).slideUp(500);
              $(this).removeClass('open');
            }
          });

          $(this).children('ul.menu').slideDown();
          $(this).children('ul.menu').addClass('open');


          if (breakpoint.value == 'mobile' || breakpoint.value == 'tablet') {

            // Scroll into view
            var offset = $(this).offset();
            offset.top -= (70 + minusHeight);

            $('body').animate({
              scrollTop: offset.top
            });
          }
        }
      });


      // Prevent default click for headlinks and toggle behavior of their immediate submenus.
      $headLinks.once().click(function (e) {

        // check if event is not triggered by "head-link" item. If not, follow link.
        var $target = $(e.target);
        if ($target.parent().is('.head-link')) {
          e.preventDefault();
        }
        e.stopPropagation();
        if (breakpoint.value != 'mobile' && breakpoint.value != 'tablet') {

          // Added a stop to interrupt the slidedown of the landing-link, in case it's still running. Otherwise setting the padding-bottom will be ignored.
          $(this).parent().stop(true, true).css('padding-bottom', $(this).data('reserveHeight'));
        }
        $(this).siblings().removeClass('active').children('ul.menu').hide();
        $(this).addClass('active');

        if ($('#block-remotemenublock').children('.content').css('visibility') == 'visible') {
          $(this).children('ul.menu').show();
        }

        if (breakpoint.value == 'mobile' || breakpoint.value == 'tablet') {
          // Scroll into view
          // var offset = $(this).offset();
          // offset.left -= 20;
          // offset.top -= 20;
          // $('html, body').animate({
          //   scrollTop: offset.top
          // });
        }


        if ($(this).children('.extra-information').length > 0) {

          // Get the height of the mother element.
          var parentHeight = $($(this).parent('ul.menu')[0]).actual('outerHeight');

          // Current height of current landing item active.
          $(this).children('.extra-information').css('top', parentHeight - $(this).children('.extra-information').actual('height'));
        }
      });

      // Set first headlink submenu as default visible by adding active class and adjust height.
      var initDefaultLayout = function () {
        $landingLinks.each(function () {

          var $firstHeadLink = $(this).children('ul.menu').find('.head-link').first();

          // Desktop and greater
          if (breakpoint.value != 'mobile' && breakpoint.value != 'tablet') {
            $($firstHeadLink).trigger('click');

            // Move mainmenu back in header.
            $($toggle).after($mainMenu);
          }
          // Mobile and iPad.
          else {
            $firstHeadLink.parent().css('padding-bottom', 0);

            // Isolate the mainmenu from the header.
            $($headerWrapper).after($mainMenu);
          }
        });
      }();
    }
  };

})(jQuery, Drupal, window, document);


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
