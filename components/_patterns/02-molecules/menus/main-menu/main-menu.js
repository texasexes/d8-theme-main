(function ($, Drupal) {
  // Element selectors
  const mainMenuToggle = '.main-menu-toggle';
  const mainMenuToggleOpen = '.main-menu-toggle--open';
  const mainMenuToggleIcon = '.main-menu-toggle__icon';
  const mainMenu = '.main-nav';
  const mainMenuSub = '.main-menu__expand-sub';
  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  // New elements
  let mainMenuBg = '';

  function mainMenuBgToggle() {
    if (mainMenuBg.length) {
      $(mainMenuBg).remove();
      mainMenuBg = '';
    }

    else {
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
}(jQuery, Drupal));
