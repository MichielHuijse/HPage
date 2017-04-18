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

