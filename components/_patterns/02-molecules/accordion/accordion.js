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

  const accordionTabsItem = $('.tabs .accordion__item');
  const accordionTabsItemContent = $('.tabs .accordion__item .accordion__content');
  const accordionTabsItemHeading = $('.tabs .accordion__item .accordion__heading');
  const accordionItem = $('.accordion__item');
  const accordionHeading = $('.accordion__heading');
  const accordionContent = $('.accordion__content');
  const accordionIcon = $('.accordion__expand-icon');
  const activeClass = 'js-active';
  const hiddenClass = 'js-hidden';
  const openClass = 'js-open';
  const closedClass = 'js-closed';
  const win = $(window);
  const breakpoint = 900;

  let winW = parseInt(win.width(), 10);

  let maxHeight = function(elems){
    return Math.max.apply(null, elems.map(function ()
    {
        return $(this).outerHeight();
    }).get());
  }

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
    $(this).parent().addClass(openClass).removeClass(closedClass);
    $(this).parent().children().addClass(openClass).removeClass(closedClass);

    $(this).parent().siblings().addClass(closedClass).removeClass(openClass);
    $(this).parent().siblings().children().addClass(closedClass).removeClass(openClass);
  });

  // Update everything when the window is resized
  win.resize(function () {
    waitForFinalEvent(function(){
    winW = parseInt(win.width(), 10);
    // If desktop width set height
    // Clear manually set css and height
    accordionTabsItem.outerHeight('');
    accordionTabsItemHeading.outerHeight('');
    accordionTabsItemContent.css({ top: '' });

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
