(function ($, Drupal) {
  // Element selectors
  const mainMenuToggle = $('.main-menu-toggle');
  const mainMenuToggleOpen = $('.main-menu-toggle--open');
  const mainMenu = $('.main-nav');
  const mainMenuSub = $('.main-menu__expand-sub');
  const toolbar = $('#toolbar-administration');
  const body = $('body');

  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  const noscroll = 'noscroll';

  // New elements
  let mainMenuBg = '';

  // Determine how far down we're scrolled
  let scrolled = '0';
  console.log(scrolled);
  let adjust = '10';

  // Account for admin menu
  let toolbarHeight = '0';

  if (toolbar.length) {
    toolbarHeight = toolbar.outerHeight();
    mainMenu.css({top: toolbarHeight});
  }

  // Show/Hide overlay
  function mainMenuBgToggle() {
    if (mainMenuBg.length) {
      mainMenuBg.remove();
      mainMenuBg = '';
      scrolled = $(document).scrollTop();
      adjust = scrolled * -1;
      body.css({top: adjust});
    }

    else {
      mainMenuBg = $('<span class="js-main-menu-close" />');
      mainMenuBg.css({top: toolbarHeight});
      mainMenuToggleOpen.append(mainMenuBg);
    }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    scrolled = $(document).scrollTop();
    adjust = scrolled * -1;
    console.log(scrolled);
    body.css({top: adjust});
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
}(jQuery, Drupal));
