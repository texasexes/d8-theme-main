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

  const dom = $(document);
  const win = $(window);
  const accordionTabsItem = $('.accordion__item.tabs');
  const accordionTabsItemContent = $('.accordion__content.tabs');
  const accordionTabsItemHeading = $('.accordion__heading.tabs');
  const accordionItem = $('.accordion__item');
  const accordionHeading = $('.accordion__heading');
  const accordionContent = $('.accordion__content');
  const accordionIcon = $('.accordion__expand-icon');
  const activeClass = 'js-active';
  const hiddenClass = 'js-hidden';
  const openClass = 'js-open';
  const closedClass = 'js-closed';
  const breakpoint = 900;

  let toolbarAdministration = null;
  let toolbarTrayHorizontal = null;
  let toolbarOffset = null;
  let headerWrapperScrollUp = null;
  let headerWrapper = null;
  let headerWrapperOffset = null;
  let additionalOffset = 0;
  let bodyFixedAdminBar = null;
  let bodyFixedAdminHorizontalTray = null;
  let bodyFixedAdminBarHeight = 0;

  let winW = parseInt(win.outerWidth(), 10);

  let maxHeight = function(elems){
    return Math.max.apply(null, elems.map(function ()
    {
        return $(this).outerHeight();
    }).get());
  }

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyFixedAdminBarHeight() {
    bodyFixedAdminBar = $('body.toolbar-fixed #toolbar-bar');
    bodyFixedAdminHorizontalTray = $('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray');
    bodyFixedAdminBarHeight = (parseInt(bodyFixedAdminBar.outerHeight()) || 0) + (parseInt(bodyFixedAdminHorizontalTray.outerHeight()) || 0);
  };

  function calculateHeights() {
    dom.ready(function() {
      // Handle fixed Drupal admin bar.
     calculateBodyFixedAdminBarHeight();
    });
  };

  calculateHeights();

  let maxTabsHeadingHeight = maxHeight(accordionTabsItemHeading);
  let maxTabsContentHeight = maxHeight(accordionTabsItemContent);
  let maxTabHeight = maxTabsHeadingHeight + maxTabsContentHeight;

  // Tabs are allowed to be active.
  if (winW > breakpoint) {
    accordionTabsItem.outerHeight(maxTabHeight);
    // Add extra pixel to make header overlap content and override it's border.
    accordionTabsItemHeading.outerHeight((parseInt(maxTabsHeadingHeight) + 1));
    accordionTabsItemContent.css({ top: maxTabsHeadingHeight });
  }

  let maxHeadingHeight = maxHeight(accordionHeading);
  let maxIconHeight = maxHeight(accordionIcon);

  let accordionTopOffset = (parseInt(maxHeadingHeight) / 2) - (parseInt(maxIconHeight) / 2);
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
    if ($(this).hasClass('tabs') && winW > breakpoint) {
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

          if ( $(this).offset().top < (win.scrollTop() + headerWrapperOffset) ) {
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
    waitForFinalEvent(function(){
    winW = parseInt(win.outerWidth(), 10);
    // Clear manually set css and height
    accordionTabsItem.outerHeight('');
    accordionTabsItemHeading.outerHeight('');
    accordionTabsItemContent.css({ top: '' });

    calculateHeights();

    // Always position icon
    accordionIcon.css({ top: (parseInt(maxTabsHeadingHeight) / 2) });

    // Tabs are allowed to be active.
    if (winW > breakpoint) {
      maxTabsHeadingHeight = maxHeight(accordionTabsItemHeading);
      maxTabsContentHeight = maxHeight(accordionTabsItemContent);
      maxTabHeight = maxTabsHeadingHeight + maxTabsContentHeight;

      accordionTabsItem.outerHeight(maxTabHeight);
      // Add extra pixel to make header overlap content and override it's border.
      accordionTabsItemHeading.outerHeight((parseInt(maxTabsHeadingHeight) + 1));
      accordionTabsItemContent.css({ top: maxTabsHeadingHeight });
    }

    }, 100, "Accordion - window resize");
  });

}(jQuery, Drupal));
