(function ($, Drupal) {

  // WaitForFinalEvent Function
  // This function allow us to only perform re-calculations AFTER an event has copmleted.
  // Below, we'll use it to recalculate values only after the window has been resized, instead of recalculating every pixel change.
  // Usage:
  // $(window).resize(function () {
  //   waitForFinalEvent(function(){
  //     alert('Resize...');
  //     //...
  //   }, 500, "some unique string");
  // });
  const waitForFinalEvent = (function () {
    const timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout (timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // Element selectors
  const dom = $(document);
  const win = $(window);
  const body = $('body');
  const mainMenuToggle = $('.main-menu-toggle');
  const mainMenuToggleOpen = $('.main-menu-toggle--open');
  const mainMenu = $('.main-nav');
  const mainMenuSub = $('.main-menu__dropdown');
  const sideMenuSub = $('.side-menu__dropdown');
  const sideMenuSubInner = $('.side-menu__dropdown-inner');
  const mainMenuWithSub = $('.main-menu__item--with-sub');
  const mainMenuExpandSub = $('.main-menu__expand-sub');
  const sideMenuExpandSub = $('.side-menu__expand-sub');
  const mainMenuSubIcon = $('.main-menu__sub-icon');
  const sideMenuSubIcon = $('.side-menu__sub-icon');
  const header = $('.header-wrapper');
  const contentTopRegion = $('.content-top-region');
  const layoutContainer = $('.layout-container');
  const adminToolbar = $('#toolbar-bar');

  // Calculated values
  let winH = parseInt(win.outerHeight(), 10);
  let winW = parseInt(win.outerWidth(), 10);
  let headerHeight = 0;
  let maxHeight = '100vh';
  let mainMenuHeight = mainMenu.outerHeight();
  // Needs .main-menu__item--active-trail-last in case menu item is in menu
  // twice. Always scrolls to "main" menu item (the one designated on the entity).
  let mainMenuActiveItem = $('#main-nav .main-menu__item--active-trail-last .is-active');
  let dummyElement = $('');
  let dummyElementMaxHeight = '0';
  let currentScrollTop = 0;
  let totalHeightToSkip = 0;
  let adminToolbarHeight = parseInt(adminToolbar.outerHeight()) || 0;
  let bodyFixedAdminBarHeight = 0;
  let bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');
  let bodyFixedAdminHorizontalTray = $('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
  let adminToolbarHorizontalTray = $('body.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');

  // Classes
  const mainMenuSubOpen = 'main-menu__sub-icon--open';
  const sideMenuSubOpen = 'side-menu__sub-icon--open';
  const menuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  const noscroll = 'noscroll';

  // New elements
  let mainMenuBg = '';

  // Expand parent items if current page is the active menu item
  $('.main-menu__item--active-trail > .main-menu__expand-sub > .main-menu__sub-icon').addClass(mainMenuSubOpen);
  $('.main-menu__item--active-trail > .main-menu__dropdown').addClass(menuVisible);

  $('.side-menu__item--active-trail > .side-menu__expand-sub > .side-menu__sub-icon').addClass(sideMenuSubOpen);
  $('.side-menu__item--active-trail > .side-menu__dropdown').addClass(menuVisible);

  // Close menu when page loads for "Find a Chapter or Network"
  $(document).ready(function () {
    if (document.baseURI.endsWith('find-chapter-or-network')) {
      $('.side-menu__dropdown--level-0').removeClass('js-visible');
      $('.side-menu__sub-icon').removeClass('side-menu__sub-icon--open');
    }
  })

  // Remove mobile nav background
  function removeMainMenuBg() {
    mainMenuBg.remove();
    mainMenuBg = '';
  };

  // Add mobile nav background
  function addMainMenuBg() {
    mainMenuBg = $('<span class="js-main-menu-close" />');
    mainMenuToggleOpen.append(mainMenuBg);
  };

  // Show/Hide overlay
  function mainMenuBgToggle() {
    // Prevent the background from scrolling when the mobile menu is active
    body.toggleClass(noscroll);

    // Display main menu
    mainMenu.toggleClass(menuVisible);

    //Scroll to main menu active item.
    mainMenuActiveItem = $('#main-nav .main-menu__item--active-trail-last .is-active');
    if (mainMenuActiveItem.length) {
      // Wait for the menu to slide in, currently set at 0.5s in _main-menu.scss.
      setTimeout(function() {
        mainMenuActiveItem.get(0).scrollIntoView({
          behavior: "smooth"
        });
      }, 500);
    }

    // Remove the overlay if it exists
    if (mainMenuBg.length) {
      removeMainMenuBg();
    }
    // Add overlay if needed
    else {
      addMainMenuBg();
    }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    mainMenuBgToggle();
  });

  // Display Sub-nav
  mainMenuExpandSub.click(function (e) {
    e.preventDefault();
    $(this).children(mainMenuSubIcon).toggleClass(mainMenuSubOpen);
    $(this).next(mainMenuSub).toggleClass(menuVisible);
  });

  // Display Sub-nav
  sideMenuExpandSub.click(function (e) {
    e.preventDefault();
    $(this).children(sideMenuSubIcon).toggleClass(sideMenuSubOpen);
    $(this).next(sideMenuSub).toggleClass(menuVisible);
  });

  // Calculate body padding top (to accommodate the admin menu)
  function calculateAdminToolbarHeight() {
    adminToolbarHorizontalTray = $('body.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
    adminToolbarHeight = (parseInt(adminToolbar.outerHeight()) || 0) + (parseInt(adminToolbarHorizontalTray.outerHeight()) || 0);
  };

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyFixedAdminBarHeight() {
    bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');
    bodyFixedAdminHorizontalTray = $('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
    bodyFixedAdminBarHeight = (parseInt(bodyFixedAdminBar.outerHeight()) || 0) + (parseInt(bodyFixedAdminHorizontalTray.outerHeight()) || 0);
  };

  // Calculate header height (to accommodate the fixed header bar)
  function calculateHeaderHeight() {
    headerHeight = parseInt(header.outerHeight()) || 0;
  };

  function setSideMenuSubMaxHeight() {
    $(sideMenuSubInner).each(function () {
      dummyElement = $(this).clone();
      dummyElement.css({'visibility': 'hidden', 'position': 'absolute', 'max-height': 'unset' }).insertAfter(this);
      dummyElementMaxHeight = dummyElement.height();
      dummyElement.remove();
      $(this).closest(sideMenuSub).css({'max-height': dummyElementMaxHeight});
    });
  }

  // Set the height and position of the main-nav and header bar
  function calculateMenuHeights() {
    dom.ready(function() {
      winH = parseInt(win.outerHeight(), 10);
      winW = parseInt(win.outerWidth(), 10);
      bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');

      // calculateBodyPaddingTop();
      calculateHeaderHeight();
      calculateAdminToolbarHeight();
      calculateBodyFixedAdminBarHeight();

      maxHeight = winH - adminToolbarHeight;
      mainMenu.css({'max-height': maxHeight});

      if (winW <= 900) {
        body.css({'padding-top': adminToolbarHeight + headerHeight});
      } else {
        body.css({'padding-top': adminToolbarHeight});
      }

      header.css({'top': adminToolbarHeight});

      setSideMenuSubMaxHeight();
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function(){
      winW = parseInt(win.width(), 10);
      // If desktop width remove all mobile menu stuff
      if (winW > 900) {
        // Remove background overlay
        if (mainMenuBg.length) {
          removeMainMenuBg();
        }
        // Class may remain if initial load is in mobile.
        header.removeClass("scrollUp");

        // Margin may have been added.
        header.css({'margin-top': ''});

        // Remove noscroll class from body
        body.removeClass(noscroll);
        // Hide mobile menu
        mainMenu.removeClass(menuVisible);
      }

      calculateMenuHeights();
    }, 100, "Main menu - window resize");
  });

  var lastScrollTop = 0;
  win.scroll(function () {
    if (winW <= 900) {
      currentScrollTop = parseInt(win.scrollTop());

      // Scrolling down the page.
      if (lastScrollTop < currentScrollTop) {

        if (currentScrollTop > adminToolbarHeight + headerHeight) {
          header.removeClass("show-menu-bar");
        }
      } else {
      // Scrolling up the page.
        // Current scroll is past top menus.
        if (currentScrollTop > (adminToolbarHeight - bodyFixedAdminBarHeight)) {
          header.css({'top': -(headerHeight)});
          header.css({'margin-top': bodyFixedAdminBarHeight});
          header.removeClass("no-transition");
          header.addClass("scrollUp");
          header.addClass("show-menu-bar");

          // Current scroll is withing top menus.
        } else  {
          header.css({'top': adminToolbarHeight});
          header.css({'margin-top': ''});
          header.addClass("no-transition");
          header.removeClass("scrollUp");
          header.removeClass("show-menu-bar");
        }
      }
      lastScrollTop = currentScrollTop;
    }
  });

}(jQuery, Drupal));
