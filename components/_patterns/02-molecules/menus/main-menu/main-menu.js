(function ($, Drupal) {
  // Element selectors
  const mainMenuToggle = '.main-menu-toggle';
  const mainMenuToggleIcon = '.main-menu-toggle__icon';
  const mainMenu = '.main-nav';
  const mainMenuSub = '.main-menu__expand-sub';
  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';

  // Main Menu
  $(mainMenuToggle).click(function (e) {
    e.preventDefault();
    console.log('evan is a genius');
    // Display Main Nav
    $(mainMenu).toggleClass(mainMenuVisible);
    // Animate menu bars
    // $(mainMenuToggleIcon).toggleClass(mainMenuActive);
  })

  // Display Sub-nav
  $(mainMenuSub).click(function (e) {
    e.preventDefault();
    $(this).toggleClass(mainMenuSubOpen);
    $(this).next('ul').toggleClass(mainMenuVisible);
  })
}(jQuery, Drupal));
