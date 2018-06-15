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
  var mainMenuToggle = $('.main-menu-toggle');
  var mainMenuToggleOpen = $('.main-menu-toggle--open');
  var mainMenu = $('.main-nav');
  var mainMenuSub = $('.main-menu__expand-sub');
  var toolbar = $('.toolbar-bar');
  var toolbarTray = $('.toolbar-tray.is-active');
  var body = $('body');
  var win = $(window);
  var dom = $(document);

  // Classes
  var mainMenuSubOpen = 'main-menu__expand-sub--open';
  var mainMenuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

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
        mainMenuBg.css({ top: toolbarHeight });
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

  win.resize(function () {
    waitForFinalEvent(function () {
      // Account for admin menu
      var winH = win.height();
      console.log("winH = " + winH);
      var toolbarHeight = '0';

      if (toolbar.length) {
        toolbarHeight = toolbar.outerHeight();
        console.log("toolbarHeight = " + toolbarHeight);
      }

      var heightAdjust = winH - toolbarHeight;
      console.log("heightAdjust = " + heightAdjust);

      dom.ready(function () {
        mainMenu.css({ 'top': toolbarHeight, 'max-height': heightAdjust });
      });
    }, 500, "Main menu - window resize");
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
