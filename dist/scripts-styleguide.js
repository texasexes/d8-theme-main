'use strict';

(function ($, Drupal) {
  Drupal.behaviors.navTop = {
    attach: function attach(context, settings) {
      var mainMenuToggle = '.main-menu-toggle';
      var mainMenu = '.main-nav';
      var mainMenuSub = '.main-menu__expand-sub';
      var mainMenuSubOpen = 'main-menu__expand-sub--open';
      var mainMenuVisible = 'js-visible';

      // Display Main Nav
      $(mainMenuToggle).click(function (e) {
        e.preventDefault();
        $(mainMenu).toggleClass(mainMenuVisible);
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
