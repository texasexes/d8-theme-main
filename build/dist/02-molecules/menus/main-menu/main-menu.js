'use strict';(function(a){function b(){H.remove(),H=''}function d(){k.toggleClass(G),n.toggleClass(F),C=a('.is-active'),C.length&&C.get(0).scrollIntoView(),H.length?b():(H=a('<span class="js-main-menu-close" />'),H.css({top:z}),m.append(H))}function e(){z=parseInt(k.css('padding-top'))}function f(){parseInt(w.css('height'))}function g(){i.ready(function(){x=j.height(),e(),f(),A=x-z,n.css({top:z,"max-height":A}),w.css({top:z})})}var h=function(){var a={};return function(b,c,d){d||(d='Don\'t call this twice without a uniqueId'),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}(),i=a(document),j=a(window),k=a('body'),l=a('.main-menu-toggle'),m=a('.main-menu-toggle--open'),n=a('.main-nav'),o=a('.main-menu__dropdown'),p=a('.side-menu__dropdown'),q=a('.main-menu__item--with-sub'),r=a('.main-menu__expand-sub'),s=a('.side-menu__expand-sub'),t=a('.main-menu__sub-icon'),u=a('.side-menu__sub-icon'),v=a('.toolbar-bar'),w=a('.header-wrapper'),x=j.height(),y=j.width(),z='0',A='100vh',B=n.outerHeight(),C=a('.is-active'),D='main-menu__sub-icon--open',E='side-menu__sub-icon--open',F='js-visible',G='noscroll',H='';a('.main-menu__item--active-trail > .main-menu__expand-sub > .main-menu__sub-icon').addClass(D),a('.main-menu__item--active-trail > .main-menu__dropdown').addClass(F),a('.menu-item--active-trail > .side-menu__expand-sub > .side-menu__sub-icon').addClass(E),a('.menu-item--active-trail > .side-menu__dropdown').addClass(F);l.click(function(a){a.preventDefault(),d()}),r.click(function(b){b.preventDefault(),a(this).children(t).toggleClass(D),a(this).next(o).toggleClass(F)}),s.click(function(b){b.preventDefault(),a(this).children(u).toggleClass(E),a(this).next(p).toggleClass(F)});g(),j.resize(function(){h(function(){y=j.width(),900<y&&(H.length&&b(),k.removeClass(G),n.removeClass(F)),g()},100,'Main menu - window resize')});var I;j.scroll(function(){var a=j.scrollTop(),c=w.height();I<a&&a>c+c?w.addClass('scrollUp'):I>a&&!(a<=c)&&w.removeClass('scrollUp'),I=a})})(jQuery,Drupal);
//# sourceMappingURL=main-menu.js.map