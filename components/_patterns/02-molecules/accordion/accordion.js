(($, Drupal) => {
  // const dom = $(document);
  const win = $(window);
  const accordionItemTabs = $(".accordion__item.tabs");
  const accordionContentTabs = $(".accordion__content.tabs");
  const accordionHeadingTabs = $(".accordion__heading.tabs");
  const accordionItem = $(".accordion__item");
  const accordionHeading = $(".accordion__heading");
  // const accordionContent = $(".accordion__content");
  const accordionExpandIcon = $(".accordion__icon--expand");
  // const activeClass = "js-active";
  // const hiddenClass = "js-hidden";
  const openClass = "js-open";
  const closedClass = "js-closed";
  const tabsClass = "tabs";
  const breakpoint = 900;

  // const toolbarAdministration = null;
  // const toolbarTrayHorizontal = null;
  // const toolbarOffset = null;
  let headerWrapperScrollUp = null;
  let headerWrapper = null;
  let headerWrapperOffset = null;
  let additionalOffset = 0;
  let bodyFixedAdminBar = null;
  let bodyFixedAdminHorizontalTray = null;
  let bodyFixedAdminBarHeight = 0;

  const maxHeight = elements =>
    Math.max.apply(
      null,
      elements
        // eslint-disable-next-line func-names
        .map(function() {
          return $(this).outerHeight();
        })
        .get()
    );

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
  const waitForFinalEvent = (() => {
    const timers = {};
    return (callback, ms, uniqueId) => {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      // callbackParameter is available in the callback function.
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // Calculate body padding top (to accommodate the admin menu)
  function calculateBodyFixedAdminBarHeight() {
    bodyFixedAdminBar = $("body.toolbar-fixed #toolbar-bar");
    bodyFixedAdminHorizontalTray = $(
      "body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray"
    );
    bodyFixedAdminBarHeight =
      (parseInt(bodyFixedAdminBar.outerHeight(), 10) || 0) +
      (parseInt(bodyFixedAdminHorizontalTray.outerHeight(), 10) || 0);
  }

  function closeAllOtherAccordionElements(element) {
    // Close all other elements but self.
    $(element)
      .parent()
      .siblings()
      .addClass(closedClass)
      .removeClass(openClass);
    $(element)
      .parent()
      .siblings()
      .children()
      .addClass(closedClass)
      .removeClass(openClass);
    $(element)
      .parent()
      .siblings()
      .children()
      .children()
      .addClass(closedClass)
      .removeClass(openClass);
  }

  function closeAllAccordionElements() {
    $(accordionItem)
      .addClass(closedClass)
      .removeClass(openClass);
    $(accordionItem)
      .children()
      .addClass(closedClass)
      .removeClass(openClass);
    $(accordionItem)
      .children()
      .children()
      .addClass(closedClass)
      .removeClass(openClass);
  }

  function openAccordionElement(element) {
    $(element)
      .parent()
      .addClass(openClass)
      .removeClass(closedClass);
    $(element)
      .parent()
      .children()
      .addClass(openClass)
      .removeClass(closedClass);
    $(element)
      .parent()
      .children()
      .children()
      .addClass(openClass)
      .removeClass(closedClass);
  }

  function toggleAccordionElement(element) {
    $(element)
      .parent()
      .toggleClass(openClass)
      .toggleClass(closedClass);
    $(element)
      .parent()
      .children()
      .toggleClass(openClass)
      .toggleClass(closedClass);
    $(element)
      .parent()
      .children()
      .children()
      .toggleClass(openClass)
      .toggleClass(closedClass);
  }

  function positionAccordionIcon() {
    accordionItem.each((index, element) => {
      const headingHeight = maxHeight($(element).find(accordionHeading));
      const iconHeight = maxHeight($(element).find(accordionExpandIcon));
      const accordionTopOffset =
        parseInt(headingHeight, 10) / 2 - parseInt(iconHeight, 10) / 2;

      $(element)
        .find(accordionExpandIcon)
        .css({ top: accordionTopOffset });
    });
  }

  function setAccordionTabsHeights() {
    const maxTabsHeadingHeight = maxHeight(accordionHeadingTabs);
    const maxTabsContentHeight = maxHeight(accordionContentTabs);
    const maxTabHeight = maxTabsHeadingHeight + maxTabsContentHeight;

    accordionItemTabs.outerHeight(maxTabHeight);
    // Add extra pixel to make header overlap content and override its bottom
    // border.
    accordionHeadingTabs.outerHeight(parseInt(maxTabsHeadingHeight, 10) + 1);
    accordionContentTabs.css({ top: maxTabsHeadingHeight });
  }

  function initializeAccordionTabs(currentWinWidth) {
    if (currentWinWidth > breakpoint) {
      setAccordionTabsHeights();
    }
    // If current width great than breakpoint and no accordion item is open.
    if (currentWinWidth > breakpoint && !$(accordionItem).hasClass(openClass)) {
      // Initialize first tab as open.
      openAccordionElement(accordionHeadingTabs.first());
    }
  }

  // Hide content via js so that if js is disabled, all of the content is visible
  // @TODO this works with un-tabbed accordion, but nee to make this work with
  // tabs -- by preventing tabs and displaying a fully open accordion?
  closeAllAccordionElements();

  let winW = parseInt(win.outerWidth(), 10);

  positionAccordionIcon();
  initializeAccordionTabs(winW);

  // eslint-disable-next-line func-names
  accordionHeading.click(function(e) {
    e.preventDefault();

    // Close all other elements but self.
    closeAllOtherAccordionElements(this);

    // When accordion uses tabs display and window is wider than breakpoint.
    // Keep in mind that tabs styles are only applied when wider than breakpoint
    // in scss files.
    if ($(this).hasClass(tabsClass) && winW > breakpoint) {
      // Click does not toggle, just sets to open.
      openAccordionElement(this);
      // This is default accordion behavior (no tabs display).
    } else {
      // Click toggles element open/closed.
      toggleAccordionElement(this);

      if (winW <= breakpoint) {
        // Handle scroll behavior offset in relation to scroll-hide mobile menu bar.
        headerWrapper = $(".header-wrapper");
        headerWrapperScrollUp = $(".header-wrapper .scrollUp");
        headerWrapperOffset =
          (parseInt(headerWrapper.outerHeight(), 10) || 0) -
          (parseInt(headerWrapperScrollUp.outerHeight(), 10) || 0);

        if ($(this).offset().top < win.scrollTop() + headerWrapperOffset) {
          additionalOffset = headerWrapperOffset;
        }
      }

      calculateBodyFixedAdminBarHeight();
      additionalOffset += bodyFixedAdminBarHeight;

      // Scroll behavior when an accordion item is clicked.
      $("html,body").animate(
        {
          scrollTop: $(this).offset().top - additionalOffset
        },
        500
      );
      // Re-Initialize scroll additional offset for next click.
      additionalOffset = 0;
    }
  });

  // Update everything when the window is resized
  win.resize(winW, () => {
    waitForFinalEvent(
      () => {
        // Clear any manually set css and height.
        accordionItemTabs.outerHeight("");
        accordionHeadingTabs.outerHeight("");
        accordionContentTabs.css({ top: "" });

        const winWafter = parseInt(win.outerWidth(), 10);

        positionAccordionIcon();
        initializeAccordionTabs(winWafter);

        // Reset for the next resize.
        winW = parseInt(win.outerWidth(), 10);
      },
      200,
      "Accordion - window resize"
    );
  });
})(jQuery, Drupal);
