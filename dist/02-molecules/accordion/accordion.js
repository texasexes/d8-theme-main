'use strict';(function(a){function b(){u=a('body.toolbar-fixed #toolbar-bar'),v=a('body.toolbar-fixed.toolbar-tray-open.toolbar-horizontal #toolbar-item-administration-tray'),w=(parseInt(u.outerHeight())||0)+(parseInt(v.outerHeight())||0)}function c(){e.ready(function(){b()})}var d=function(){var a={};return function(b,c,d){d||(d='Don\'t call this twice without a uniqueId'),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}(),e=a(document),f=a(window),g=a('.tabs .accordion__item'),h=a('.tabs .accordion__item .accordion__content'),i=a('.tabs .accordion__item .accordion__heading'),j=a('.accordion__item'),k=a('.accordion__heading'),l=a('.accordion__content'),m=a('.accordion__expand-icon'),n='js-open',o='js-closed',p=900,q=null,r=null,s=null,t=0,u=null,v=null,w=0,x=parseInt(f.outerWidth(),10),y=function(b){return Math.max.apply(null,b.map(function(){return a(this).outerHeight()}).get())};c();var z=y(i),A=y(h),B=z+A;x>p&&(g.outerHeight(B),i.outerHeight(parseInt(z)+1),h.css({top:z}));var C=y(k),D=y(m),E=parseInt(C)/2-parseInt(D)/2;m.css({top:E}),j.addClass(o),j.children().addClass(o),g.first().addClass(n).removeClass(o),g.first().children().addClass(n).removeClass(o),k.click(function(c){c.preventDefault(),a(this).parent().siblings().addClass(o).removeClass(n),a(this).parent().siblings().children().addClass(o).removeClass(n),g.length&&x>p?(a(this).parent().addClass(n).removeClass(o),a(this).parent().children().addClass(n).removeClass(o)):(a(this).parent().toggleClass(n).toggleClass(o),a(this).parent().children().toggleClass(n).toggleClass(o),x<=p&&(r=a('.header-wrapper'),q=a('.header-wrapper .scrollUp'),s=(parseInt(r.outerHeight())||0)-(parseInt(q.outerHeight())||0),a(this).offset().top<f.scrollTop()+s&&(t=s)),b(),t+=w,a('html,body').animate({scrollTop:a(this).offset().top-t},500),t=0)}),f.resize(function(){d(function(){x=parseInt(f.outerWidth(),10),g.outerHeight(''),i.outerHeight(''),h.css({top:''}),c(),m.css({top:parseInt(z)/2}),x>p&&(z=y(i),A=y(h),B=z+A,g.outerHeight(B),i.outerHeight(parseInt(z)+1),h.css({top:z}))},100,'Accordion - window resize')})})(jQuery,Drupal);
//# sourceMappingURL=accordion.js.map
