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
  const mainMenuSub = $('.main-menu--level-1');
  const mainMenuExpandSub = $('.main-menu__expand-sub');
  const toolbar = $('.toolbar-bar');

  // Calculated values
  let winH = win.height();
  let winW = win.width();
  let bodyPaddingTop = '0';
  let maxHeight = '100vh';
  let mainMenuHeight = mainMenu.outerHeight();

  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  const noscroll = 'noscroll';

  // New elements
  let mainMenuBg = '';

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
      mainMenuBg.css({top: bodyPaddingTop});
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
    mainMenuSub.css({'top': mainMenuHeight})
    // Ensure dropdown nav is always inside the viewport (prevents horizontal scrolling)
    mainMenuSub.each(function() {
      const subnavRightPosition = $(this).parent().offset().left + $(this).outerWidth();
      // If the right edge of the subnav is outside the viewport
      if (subnavRightPosition > winW) {
        // Set element right position = 0
        $(this).css({'right': "0"});
      }
    });
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
    dom.ready(function() {
      winH = win.height();
      calculateBodyPaddingTop();
      maxHeight = winH - bodyPaddingTop;
      mainMenu.css({'top': bodyPaddingTop, 'max-height': maxHeight});
    });
  };

  calculateMenuHeights();

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function(){
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


}(jQuery, Drupal));
