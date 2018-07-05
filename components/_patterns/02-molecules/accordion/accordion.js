(function ($, Drupal) {

  const accordionHeading = $('.accordion__heading');
  const accordionContent = $('.accordion__content');
  const accordionIcon = $('.accordion__expand-icon');
  const activeClass = 'js-active';
  const hiddenClass = 'js-hidden';

  // Hide content via js so that if js is disabled, all of the content is visible
  accordionContent.addClass(hiddenClass);

  accordionHeading.click(function (e) {
    e.preventDefault();
    $(this).siblings(accordionIcon).toggleClass(activeClass);
    $(this).siblings(accordionContent).toggleClass(hiddenClass);
  });

}(jQuery, Drupal));
