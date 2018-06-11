'use strict';

(function ($, Drupal) {
  Drupal.behaviors.mainMenu = {
    attach: function attach(context, settings) {
      // Element selectors
      var mainMenuToggle = '.main-menu-toggle';
      var mainMenuToggleIcon = '.main-menu-toggle__icon';
      var mainMenu = '.main-nav';
      var mainMenuSub = '.main-menu__expand-sub';
      // Classes
      var mainMenuSubOpen = 'main-menu__expand-sub--open';
      var mainMenuVisible = 'js-visible';
      var mainMenuActive = 'js-menu-active';

      // Main Menu
      $(mainMenuToggle).click(function (e) {
        e.preventDefault();
        // Display Main Nav
        $(mainMenu).toggleClass(mainMenuVisible);
        // Animate menu bars
        // $(mainMenuToggleIcon).toggleClass(mainMenuActive);
      });

      // Display Sub-nav
      $(mainMenuSub).click(function (e) {
        e.preventDefault();
        $(this).toggleClass(mainMenuSubOpen);
        $(this).next('ul').toggleClass(mainMenuVisible);
      });
    }
  };
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
