(function ($, Drupal) {
  // Element selectors
  const mainMenuToggle = $('.main-menu-toggle');
  const mainMenuToggleOpen = $('.main-menu-toggle--open');
  const mainMenu = $('.main-nav');
  const mainMenuSub = $('.main-menu__expand-sub');
  const toolbar = $('#toolbar-administration');
  const body = $('body');
  const win = $(window);

  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  const noscroll = 'noscroll';

  // New elements
  let mainMenuBg = '';

  // Account for admin menu
  let winH = win.height();
  let toolbarHeight = '0';

  if (toolbar.length) {
    toolbarHeight = toolbar.outerHeight();
  }

  let heightAdjust = winH - toolbarHeight;

  $(document).ready(function() {
    mainMenu.css({'top': toolbarHeight, 'max-height': heightAdjust});
  })

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
      mainMenuBg.css({top: toolbarHeight});
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
}(jQuery, Drupal));
