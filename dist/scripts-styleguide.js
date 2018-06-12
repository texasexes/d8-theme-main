'use strict';

(function ($, Drupal) {
  // Element selectors
  var mainMenuToggle = $('.main-menu-toggle');
  var mainMenuToggleOpen = $('.main-menu-toggle--open');
  var mainMenu = $('.main-nav');
  var mainMenuSub = $('.main-menu__expand-sub');
  var toolbar = $('#toolbar-administration');
  var body = $('body');

  // Classes
  var mainMenuSubOpen = 'main-menu__expand-sub--open';
  var mainMenuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

  // Determine how far down we're scrolled
  var scrolled = '0';
  console.log(scrolled);
  var adjust = '10';

  // Account for admin menu
  var toolbarHeight = '0';

  if (toolbar.length) {
    toolbarHeight = toolbar.outerHeight();
    mainMenu.css({ top: toolbarHeight });
  }

  // Show/Hide overlay
  function mainMenuBgToggle() {
    if (mainMenuBg.length) {
      mainMenuBg.remove();
      mainMenuBg = '';
      scrolled = $(document).scrollTop();
      adjust = scrolled * -1;
      body.css({ top: adjust });
    } else {
      mainMenuBg = $('<span class="js-main-menu-close" />');
      mainMenuBg.css({ top: toolbarHeight });
      mainMenuToggleOpen.append(mainMenuBg);
    }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    scrolled = $(document).scrollTop();
    adjust = scrolled * -1;
    console.log(scrolled);
    body.css({ top: adjust });
    body.toggleClass(noscroll);
    // Display Main Nav
    mainMenu.toggleClass(mainMenuVisible);
    // Toggle Overlay
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
