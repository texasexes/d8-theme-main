(function ($, Drupal) {
  Drupal.behaviors.mainMenu = {
    attach(context, settings) {
      const mainMenuToggle = '.main-menu-toggle';
      const mainMenu = '.main-nav';
      const mainMenuSub = '.main-menu__expand-sub';
      const mainMenuSubOpen = 'main-menu__expand-sub--open';
      const mainMenuVisible = 'js-visible';

      // Display Main Nav
      $(mainMenuToggle).click(function (e) {
        e.preventDefault();
        $(mainMenu).toggleClass(mainMenuVisible);
      })

      // Display Sub-nav
      $(mainMenuSub).click(function (e) {
        e.preventDefault();
        $(this).toggleClass(mainMenuSubOpen);
        $(this).next('ul').toggleClass(mainMenuVisible);
      })
    },
  };
}(jQuery, Drupal));
