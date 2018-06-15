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
  const mainMenuSub = $('.main-menu__expand-sub');
  const toolbar = $('.toolbar-bar');

  // Calculated values
  let winH = win.height();
  let bodyPaddingTop = '0';
  let maxHeight = '100vh';

  // Classes
  const mainMenuSubOpen = 'main-menu__expand-sub--open';
  const mainMenuVisible = 'js-visible';
  const mainMenuActive = 'js-menu-active';
  const noscroll = 'noscroll';

  // New elements
  let mainMenuBg = '';

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
      mainMenuBg.css({top: bodyPaddingTop});
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

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyPaddingTop() {
      bodyPaddingTop = parseInt(body.css('padding-top'));
  };

  function calculateMenuHeights() {
    dom.ready(function() {
      winH = win.height();
      console.log(winH);
      calculateBodyPaddingTop();
      console.log(bodyPaddingTop);
      maxHeight = winH - bodyPaddingTop;
      console.log(maxHeight);
      mainMenu.css({'top': bodyPaddingTop, 'max-height': maxHeight});
    });
  };

  calculateMenuHeights();

  win.resize(function () {
    waitForFinalEvent(function(){
      calculateMenuHeights();
    }, 500, "Main menu - window resize");
  });


}(jQuery, Drupal));
