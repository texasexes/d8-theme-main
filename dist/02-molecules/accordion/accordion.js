'use strict';(function(a){var b=function(){var a={};return function(b,c,d){d||(d='Don\'t call this twice without a uniqueId'),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}(),c=a('.tabs .accordion__item'),d=a('.tabs .accordion__item .accordion__content'),e=a('.tabs .accordion__item .accordion__heading'),f=a('.accordion__item'),g=a('.accordion__heading'),h=a('.accordion__content'),i=a('.accordion__expand-icon'),j='js-open',k='js-closed',l=a(window),m=900,n=parseInt(l.outerWidth(),10),o=function(b){return Math.max.apply(null,b.map(function(){return a(this).outerHeight()}).get())},p=o(e),q=o(d),r=p+q;n>m&&(c.outerHeight(r),e.outerHeight(parseInt(p)+1),d.css({top:p}));var s=o(g),t=o(i),u=parseInt(s)/2-parseInt(t)/2;i.css({top:u}),f.addClass(k),f.children().addClass(k),c.first().addClass(j).removeClass(k),c.first().children().addClass(j).removeClass(k),g.click(function(b){b.preventDefault(),c.length&&n>m?(a(this).parent().addClass(j).removeClass(k),a(this).parent().children().addClass(j).removeClass(k)):(a(this).parent().toggleClass(j).toggleClass(k),a(this).parent().children().toggleClass(j).toggleClass(k)),a(this).parent().siblings().addClass(k).removeClass(j),a(this).parent().siblings().children().addClass(k).removeClass(j)}),l.resize(function(){b(function(){n=parseInt(l.outerWidth(),10),c.outerHeight(''),e.outerHeight(''),d.css({top:''}),i.css({top:parseInt(p)/2}),n>m&&(p=o(e),q=o(d),r=p+q,c.outerHeight(r),e.outerHeight(parseInt(p)+1),d.css({top:p}))},100,'Accordion - window resize')})})(jQuery,Drupal);
//# sourceMappingURL=accordion.js.map
