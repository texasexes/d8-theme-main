'use strict';

(function ($, Drupal) {
  // Element selectors
  var mainMenuToggle = $('.main-menu-toggle');
  var mainMenuToggleOpen = $('.main-menu-toggle--open');
  var mainMenu = $('.main-nav');
  var mainMenuSub = $('.main-menu__expand-sub');
  var toolbar = $('#toolbar-administration');
  var body = $('body');
  var win = $(window);

  // Classes
  var mainMenuSubOpen = 'main-menu__expand-sub--open';
  var mainMenuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

  // Account for admin menu
  var winH = win.height();
  var toolbarHeight = '0';

  if (toolbar.length) {
    toolbarHeight = toolbar.outerHeight();
  }

  var heightAdjust = winH - toolbarHeight;

  $(document).ready(function () {
    mainMenu.css({ 'top': toolbarHeight, 'max-height': heightAdjust });
  });

  // Show/Hide overlay
  function mainMenuBgToggle() {
    // Prevent the background from scrolling
    body.toggleClass(noscroll);

    // Display Main Nav
    mainMenu.toggleClass(mainMenuVisible);

    // Remove the overlay if it exists
    if (mainMenuBg.length) {
      mainMenuBg.remove();
      mainMenuBg = '';
    }

    // Add overlay
    else {
        mainMenuBg = $('<span class="js-main-menu-close" />');
        mainMenuBg.css({ top: toolbarHeight });
        mainMenuToggleOpen.append(mainMenuBg);
      }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    mainMenuBgToggle();
  });

  // Display Sub-nav
  mainMenuSub.click(function (e) {
    e.preventDefault();
    $(this).toggleClass(mainMenuSubOpen);
    $(this).next('ul').toggleClass(mainMenuVisible);
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
