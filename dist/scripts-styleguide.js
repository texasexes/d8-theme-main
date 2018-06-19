'use strict';

(function ($, Drupal) {

  var accordionHeading = $('.accordion__heading');
  var accordionContent = $('.accordion__content');
  var activeClass = 'js-active';
  var hiddenClass = 'js-hidden';

  accordionContent.addClass(hiddenClass);

  accordionHeading.click(function (e) {
    e.preventDefault();
    $(this).toggleClass(activeClass);
    $(this).next(accordionContent).toggleClass(hiddenClass);
  });
})(jQuery, Drupal);
//# sourceMappingURL=scripts-styleguide.js.map
