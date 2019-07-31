'use strict';

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
  var waitForFinalEvent = function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  }();

  var dom = $(document);
  var win = $(window);
  var accordionTabsItem = $('.tabs .accordion__item');
  var accordionTabsItemContent = $('.tabs .accordion__item .accordion__content');
  var accordionTabsItemHeading = $('.tabs .accordion__item .accordion__heading');
  var accordionItem = $('.accordion__item');
  var accordionHeading = $('.accordion__heading');
  var accordionContent = $('.accordion__content');
  var accordionIcon = $('.accordion__expand-icon');
  var activeClass = 'js-active';
  var hiddenClass = 'js-hidden';
  var openClass = 'js-open';
  var closedClass = 'js-closed';
  var breakpoint = 900;

  var toolbarAdministration = null;
  var toolbarTrayHorizontal = null;
  var toolbarOffset = null;
  var headerWrapperScrollUp = null;
  var headerWrapper = null;
  var headerWrapperOffset = null;
  var additionalOffset = 0;
  var bodyFixedAdminBar = null;
  var bodyFixedAdminHorizontalTray = null;
  var bodyFixedAdminBarHeight = 0;

  var winW = parseInt(win.outerWidth(), 10);

  var maxHeight = function maxHeight(elems) {
    return Math.max.apply(null, elems.map(function () {
      return $(this).outerHeight();
    }).get());
  };

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyFixedAdminBarHeight() {
    bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');
    bodyFixedAdminHorizontalTray = $('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
    bodyFixedAdminBarHeight = (parseInt(bodyFixedAdminBar.outerHeight()) || 0) + (parseInt(bodyFixedAdminHorizontalTray.outerHeight()) || 0);
  };

  function calculateHeights() {
    dom.ready(function () {
      // Handle fixed Drupal admin bar.
      calculateBodyFixedAdminBarHeight();
    });
  };

  calculateHeights();

  var maxTabsHeadingHeight = maxHeight(accordionTabsItemHeading);
  var maxTabsContentHeight = maxHeight(accordionTabsItemContent);
  var maxTabHeight = maxTabsHeadingHeight + maxTabsContentHeight;

  // Tabs are allowed to be active.
  if (winW > breakpoint) {
    accordionTabsItem.outerHeight(maxTabHeight);
    // Add extra pixel to make header overlap content and override it's border.
    accordionTabsItemHeading.outerHeight(parseInt(maxTabsHeadingHeight) + 1);
    accordionTabsItemContent.css({ top: maxTabsHeadingHeight });
  }

  var maxHeadingHeight = maxHeight(accordionHeading);
  var maxIconHeight = maxHeight(accordionIcon);

  var accordionTopOffset = parseInt(maxHeadingHeight) / 2 - parseInt(maxIconHeight) / 2;
  accordionIcon.css({ top: accordionTopOffset });

  // Hide content via js so that if js is disabled, all of the content is visible
  accordionItem.addClass(closedClass);
  accordionItem.children().addClass(closedClass);

  // Initialize tabs if needed
  accordionTabsItem.first().addClass(openClass).removeClass(closedClass);
  accordionTabsItem.first().children().addClass(openClass).removeClass(closedClass);

  accordionHeading.click(function (e) {
    e.preventDefault();

    // Close all other elements but self.
    $(this).parent().siblings().addClass(closedClass).removeClass(openClass);
    $(this).parent().siblings().children().addClass(closedClass).removeClass(openClass);

    // When accordion uses tabs display and window is wider than breakpoint.
    // Keep in mind that tabs styles are only applied when wider than breakpoint
    // in scss files.
    if (accordionTabsItem.length && winW > breakpoint) {
      // Click does not toggle, just sets to open.
      $(this).parent().addClass(openClass).removeClass(closedClass);
      $(this).parent().children().addClass(openClass).removeClass(closedClass);
      // This is default accordion behavior (no tabs display).
    } else {
      // Click toggles element open/closed.
      $(this).parent().toggleClass(openClass).toggleClass(closedClass);
      $(this).parent().children().toggleClass(openClass).toggleClass(closedClass);

      if (winW <= breakpoint) {
        // Handle scroll behavior offset in relation to scroll-hide mobile menu bar.
        headerWrapper = $('.header-wrapper');
        headerWrapperScrollUp = $('.header-wrapper .scrollUp');
        headerWrapperOffset = (parseInt(headerWrapper.outerHeight()) || 0) - (parseInt(headerWrapperScrollUp.outerHeight()) || 0);

        if ($(this).offset().top < win.scrollTop() + headerWrapperOffset) {
          additionalOffset = headerWrapperOffset;
        }
      }

      calculateBodyFixedAdminBarHeight();
      additionalOffset += bodyFixedAdminBarHeight;

      // Scroll behavior when an accordion item is clicked.
      $('html,body').animate({
        scrollTop: $(this).offset().top - additionalOffset
      }, 500);
      // Re-Initialize scroll additional offset for next click.
      additionalOffset = 0;
    }
  });

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function () {
      winW = parseInt(win.outerWidth(), 10);
      // Clear manually set css and height
      accordionTabsItem.outerHeight('');
      accordionTabsItemHeading.outerHeight('');
      accordionTabsItemContent.css({ top: '' });

      calculateHeights();

      // Always position icon
      accordionIcon.css({ top: parseInt(maxTabsHeadingHeight) / 2 });

      // Tabs are allowed to be active.
      if (winW > breakpoint) {
        maxTabsHeadingHeight = maxHeight(accordionTabsItemHeading);
        maxTabsContentHeight = maxHeight(accordionTabsItemContent);
        maxTabHeight = maxTabsHeadingHeight + maxTabsContentHeight;

        accordionTabsItem.outerHeight(maxTabHeight);
        // Add extra pixel to make header overlap content and override it's border.
        accordionTabsItemHeading.outerHeight(parseInt(maxTabsHeadingHeight) + 1);
        accordionTabsItemContent.css({ top: maxTabsHeadingHeight });
      }
    }, 100, "Accordion - window resize");
  });
})(jQuery, Drupal);
'use strict';

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
  var waitForFinalEvent = function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  }();

  // Element selectors
  var dom = $(document);
  var win = $(window);
  var body = $('body');
  var mainMenuToggle = $('.main-menu-toggle');
  var mainMenuToggleOpen = $('.main-menu-toggle--open');
  var mainMenu = $('.main-nav');
  var mainMenuSub = $('.main-menu__dropdown');
  var sideMenuSub = $('.side-menu__dropdown');
  var sideMenuSubInner = $('.side-menu__dropdown-inner');
  var mainMenuWithSub = $('.main-menu__item--with-sub');
  var mainMenuExpandSub = $('.main-menu__expand-sub');
  var sideMenuExpandSub = $('.side-menu__expand-sub');
  var mainMenuSubIcon = $('.main-menu__sub-icon');
  var sideMenuSubIcon = $('.side-menu__sub-icon');
  var header = $('.header-wrapper');
  var contentTopRegion = $('.content-top-region');
  var layoutContainer = $('.layout-container');
  var adminToolbar = $('#toolbar-bar');

  // Calculated values
  var winH = parseInt(win.outerHeight(), 10);
  var winW = parseInt(win.outerWidth(), 10);
  var headerHeight = 0;
  var maxHeight = '100vh';
  var mainMenuHeight = mainMenu.outerHeight();
  // Needs .main-menu__item--active-trail-last in case menu item is in menu
  // twice. Always scrolls to "main" menu item (the one designated on the entity).
  var mainMenuActiveItem = $('#main-nav .main-menu__item--active-trail-last .is-active');
  var dummyElement = $('');
  var dummyElementMaxHeight = '0';
  var currentScrollTop = 0;
  var totalHeightToSkip = 0;
  var adminToolbarHeight = parseInt(adminToolbar.outerHeight()) || 0;
  var bodyFixedAdminBarHeight = 0;
  var bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');
  var bodyFixedAdminHorizontalTray = $('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
  var adminToolbarHorizontalTray = $('body.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');

  // Classes
  var mainMenuSubOpen = 'main-menu__sub-icon--open';
  var sideMenuSubOpen = 'side-menu__sub-icon--open';
  var menuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

  // Expand parent items if current page is the active menu item
  $('.main-menu__item--active-trail > .main-menu__expand-sub > .main-menu__sub-icon').addClass(mainMenuSubOpen);
  $('.main-menu__item--active-trail > .main-menu__dropdown').addClass(menuVisible);

  $('.side-menu__item--active-trail > .side-menu__expand-sub > .side-menu__sub-icon').addClass(sideMenuSubOpen);
  $('.side-menu__item--active-trail > .side-menu__dropdown').addClass(menuVisible);

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
      setTimeout(function () {
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
      dummyElement.css({ 'visibility': 'hidden', 'position': 'absolute', 'max-height': 'unset' }).insertAfter(this);
      dummyElementMaxHeight = dummyElement.height();
      dummyElement.remove();
      $(this).closest(sideMenuSub).css({ 'max-height': dummyElementMaxHeight });
    });
  }

  // Set the height and position of the main-nav and header bar
  function calculateMenuHeights() {
    dom.ready(function () {
      winH = parseInt(win.outerHeight(), 10);
      winW = parseInt(win.outerWidth(), 10);
      bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');

      // calculateBodyPaddingTop();
      calculateHeaderHeight();
      calculateAdminToolbarHeight();
      calculateBodyFixedAdminBarHeight();

      maxHeight = winH - adminToolbarHeight;
      mainMenu.css({ 'max-height': maxHeight });

      if (winW <= 900) {
        body.css({ 'padding-top': adminToolbarHeight + headerHeight });
      } else {
        body.css({ 'padding-top': adminToolbarHeight });
      }

      header.css({ 'top': adminToolbarHeight });

      setSideMenuSubMaxHeight();
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function () {
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
        header.css({ 'margin-top': '' });

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
        if (currentScrollTop > adminToolbarHeight - bodyFixedAdminBarHeight) {
          header.css({ 'top': -headerHeight });
          header.css({ 'margin-top': bodyFixedAdminBarHeight });
          header.removeClass("no-transition");
          header.addClass("scrollUp");
          header.addClass("show-menu-bar");

          // Current scroll is withing top menus.
        } else {
          header.css({ 'top': adminToolbarHeight });
          header.css({ 'margin-top': '' });
          header.addClass("no-transition");
          header.removeClass("scrollUp");
          header.removeClass("show-menu-bar");
        }
      }
      lastScrollTop = currentScrollTop;
    }
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
