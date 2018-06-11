'use strict';(function(a,b){b.behaviors.mainMenu={attach:function attach(){var b='js-visible';a('.main-menu-toggle').click(function(c){c.preventDefault(),a('.main-nav').toggleClass(b)}),a('.main-menu__expand-sub').click(function(c){c.preventDefault(),a(this).toggleClass('main-menu__expand-sub--open'),a(this).next('ul').toggleClass(b)})}}})(jQuery,Drupal);
//# sourceMappingURL=main-menu.js.map
