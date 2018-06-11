'use strict';

(function ($, Drupal) {
  // Element selectors
  var mainMenuToggle = '.main-menu-toggle';
  var mainMenuToggleOpen = '.main-menu-toggle--open';
  var mainMenuToggleIcon = '.main-menu-toggle__icon';
  var mainMenu = '.main-nav';
  var mainMenuSub = '.main-menu__expand-sub';
  // Classes
  var mainMenuSubOpen = 'main-menu__expand-sub--open';
  var mainMenuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  // New elements
  var mainMenuBg = '';

  function mainMenuBgToggle() {
    if (mainMenuBg.length) {
      $(mainMenuBg).remove();
      mainMenuBg = '';
    } else {
      mainMenuBg = $('<span class="js-main-menu-close" />');
      $(mainMenuToggleOpen).append(mainMenuBg);
    }
  };

  // Main Menu
  $(mainMenuToggle).click(function (e) {
    e.preventDefault();
    // Display Main Nav
    $(mainMenu).toggleClass(mainMenuVisible);
    mainMenuBgToggle();
  });

  // Display Sub-nav
  $(mainMenuSub).click(function (e) {
    e.preventDefault();
    $(this).toggleClass(mainMenuSubOpen);
    $(this).next('ul').toggleClass(mainMenuVisible);
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
