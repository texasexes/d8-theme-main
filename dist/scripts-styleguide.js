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
  var mainMenuSub = $('.main-menu--level-1');
  var mainMenuExpandSub = $('.main-menu__expand-sub');
  var toolbar = $('.toolbar-bar');

  // Calculated values
  var winH = win.height();
  var winW = win.width();
  var bodyPaddingTop = '0';
  var maxHeight = '100vh';
  var mainMenuHeight = mainMenu.outerHeight();

  // Classes
  var mainMenuSubOpen = 'main-menu__expand-sub--open';
  var mainMenuVisible = 'js-visible';
  var mainMenuActive = 'js-menu-active';
  var noscroll = 'noscroll';

  // New elements
  var mainMenuBg = '';

  // Remove mobile nav background
  function removeMainMenuBg() {
    mainMenuBg.remove();
    mainMenuBg = '';
  }

  // Show/Hide overlay
  function mainMenuBgToggle() {
    // Prevent the background from scrolling when the mobile menu is active
    body.toggleClass(noscroll);

    // Display main menu
    mainMenu.toggleClass(mainMenuVisible);

    // Remove the overlay if it exists
    if (mainMenuBg.length) {
      removeMainMenuBg();
    }

    // Add overlay if needed
    else {
        mainMenuBg = $('<span class="js-main-menu-close" />');
        mainMenuBg.css({ top: bodyPaddingTop });
        mainMenuToggleOpen.append(mainMenuBg);
      }
  };

  // Main Menu
  mainMenuToggle.click(function (e) {
    e.preventDefault();
    mainMenuBgToggle();
  });

  // Calculate the subnav position for the desktop view
  function subNavPosition() {
    mainMenuHeight = mainMenu.outerHeight();
    mainMenuSub.css({ 'top': mainMenuHeight });
    console.log(mainMenuHeight);
  };

  subNavPosition();

  // Display Sub-nav
  mainMenuExpandSub.click(function (e) {
    e.preventDefault();
    $(this).toggleClass(mainMenuSubOpen);
    $(this).next('ul').toggleClass(mainMenuVisible);
  });

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyPaddingTop() {
    bodyPaddingTop = parseInt(body.css('padding-top'));
  };

  // Set the height and position of the main-nav
  function calculateMenuHeights() {
    dom.ready(function () {
      winH = win.height();
      calculateBodyPaddingTop();
      maxHeight = winH - bodyPaddingTop;
      mainMenu.css({ 'top': bodyPaddingTop, 'max-height': maxHeight });
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function () {
      winW = win.width();
      // If desktop width remove all mobile menu stuff
      if (winW > 767) {
        // Remove background overlay
        if (mainMenuBg.length) {
          removeMainMenuBg();
        }
        // Remove noscroll class from body
        body.removeClass(noscroll);
        // Hide mobile menu
        mainMenu.removeClass(mainMenuVisible);
      }

      calculateMenuHeights();
      subNavPosition();
    }, 100, "Main menu - window resize");
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
