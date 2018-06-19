(function ($, Drupal) {

  const accordionHeading = $('.accordion__heading');
  const accordionContent = $('.accordion__content');
  const activeClass = 'js-active';
  const hiddenClass = 'js-hidden';

  accordionContent.addClass(hiddenClass);

  accordionHeading.click(function (e) {
    e.preventDefault();
    $(this).toggleClass(activeClass);
    $(this).next(accordionContent).toggleClass(hiddenClass);
  });

}(jQuery, Drupal));
