!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"number"==typeof t}function i(t){return"undefined"==typeof t}function a(t,i){var a=[];return e(i)&&a.push(i),a.slice.apply(t,a)}function o(t){return t%4===0&&t%100!==0||t%400===0}function r(t,e){return[31,o(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function n(t){var e,i,a=t.match(/[.\/\-\s].*?/)||"/",o=t.split(/\W+/);if(!o||0===o.length)throw new Error("Invalid date format.");for(t={separator:a[0],parts:o},i=0,e=o.length;e>i;i++)switch(o[i]){case"dd":case"d":t.day=!0;break;case"mm":case"m":t.month=!0;break;case"yyyy":case"yy":t.year=!0}return t}function s(t,e){var i,a,o,r,n,s,d;if(i="string"==typeof t&&t?t.split(e.separator):[],a=e.parts.length,t=new Date,o=t.getFullYear(),r=t.getDate(),n=t.getMonth(),i.length===a)for(d=0;a>d;d++)switch(s=parseInt(i[d],10)||1,e.parts[d]){case"dd":case"d":r=s;break;case"mm":case"m":n=s-1;break;case"yy":o=2e3+s;break;case"yyyy":o=s}return new Date(o,n,r,0,0,0,0)}function d(t,e){var i,a={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},o=[],r=e.parts.length;for(a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,i=0;r>i;i++)o.push(a[e.parts[i]]);return o.join(e.separator)}var l=t(window),c=t(document),h=function(e,i){this.$element=t(e),this.options=t.extend({},h.DEFAULTS,t.isPlainObject(i)&&i),this.visible=!1,this.isInput=!1,this.isInline=!1,this.init()};h.prototype={constructor:h,init:function(){var e,i=this.$element,a=this.options;this.$trigger=t(a.trigger||i),this.$picker=e=t(a.template),this.$years=e.find('[data-type="years picker"]'),this.$months=e.find('[data-type="months picker"]'),this.$days=e.find('[data-type="days picker"]'),this.isInput=i.is("input")||i.is("textarea"),this.isInline=a.inline&&(a.container||!this.isInput),this.isInline?(e.find(".datepicker-arrow").hide(),t(a.container||i).append(e)):(t(a.container||"body").append(e),this.place(),e.hide()),a.date&&i.data("date",a.date),this.format=n(a.dateFormat),this.fillWeek(),this.bind(),this.update(),this.isInline&&this.show()},bind:function(){var e=this.$element,i=this.options;this.$picker.on("click",t.proxy(this.click,this)),this.isInline||(this.isInput&&(e.on("keyup",t.proxy(this.update,this)),i.trigger||e.on("focus",t.proxy(this.show,this))),this.$trigger.on("click",t.proxy(this.show,this)))},showView:function(t){var e=this.format;if(e.year||e.month||e.day)switch(t){case 2:case"years":this.$months.hide(),this.$days.hide(),e.year?(this.fillYears(),this.$years.show()):this.showView(0);break;case 1:case"months":this.$years.hide(),this.$days.hide(),e.month?(this.fillMonths(),this.$months.show()):this.showView(2);break;default:this.$years.hide(),this.$months.hide(),e.day?(this.fillDays(),this.$days.show()):this.showView(1)}},hideView:function(){this.options.autoClose&&this.hide()},place:function(){var t=this.$trigger,e=t.offset();this.$picker.css({position:"absolute",top:e.top+t.outerHeight(),left:e.left,zIndex:this.options.zIndex})},show:function(){this.visible||(this.visible=!0,this.$picker.show(),this.isInline||(l.on("resize",t.proxy(this.place,this)),c.on("click",t.proxy(function(t){t.target!==this.$element[0]&&this.hide()},this))),this.showView(this.options.viewStart))},hide:function(){this.visible&&(this.visible=!1,this.$picker.hide(),this.isInline||(l.off("resize",this.place),c.off("click",this.hide)))},update:function(){var t=this.$element,e=t.data("date")||(this.isInput?t.prop("value"):t.text());this.date=e=s(e,this.format),this.viewDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this.fillAll()},change:function(){var t=this.$element,e=d(this.date,this.format);this.isInput?t.prop("value",e):this.isInline||t.text(e),t.data("date",e).trigger("change")},getMonthByNumber:function(t,i){var a=this.options,o=i?a.monthsShort:a.months;return o[e(t)?t:this.date.getMonth()]},getDayByNumber:function(t,i,a){var o=this.options,r=a?o.daysMin:i?o.daysShort:o.days;return r[e(t)?t:this.date.getDay()]},getDate:function(t){return t?d(this.date,this.format):new Date(this.date)},template:function(e){var i=this.options,a={text:"",type:"",selected:!1,disabled:!1};return t.extend(a,e),["<"+i.itemTag+" ",a.selected?'class="'+i.selectedClass+'"':a.disabled?'class="'+i.disabledClass+'"':"",a.type?' data-type="'+a.type+'"':"",">",a.text,"</"+i.itemTag+">"].join("")},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillYears:function(){var t,e,i="",a=[],o=this.options.yearSuffix||"",r=this.date.getFullYear(),n=this.viewDate.getFullYear();for(i=n-5+o+" - "+(n+6)+o,e=-5;7>e;e++)t=n+e===r,a.push(this.template({text:n+e,type:t?"year selected":"year",selected:t,disabled:-5===e||6===e}));this.$picker.find('[data-type="years current"]').html(i),this.$picker.find('[data-type="years"]').empty().html(a.join(""))},fillMonths:function(){var t,e,i="",a=[],o=this.options.monthsShort,r=this.date.getFullYear(),n=this.date.getMonth(),s=this.viewDate.getFullYear();for(i=s.toString()+this.options.yearSuffix||"",e=0;12>e;e++)t=s===r&&e===n,a.push(this.template({text:o[e],type:t?"month selected":"month",selected:t}));this.$picker.find('[data-type="year current"]').html(i),this.$picker.find('[data-type="months"]').empty().html(a.join(""))},fillWeek:function(){var e,i=this.options,a=[],o=i.daysMin,r=parseInt(i.weekStart,10)%7;for(o=t.merge(o.slice(r),o.slice(0,r)),e=0;7>e;e++)a.push(this.template({text:o[e]}));this.$picker.find('[data-type="week"]').html(a.join(""))},fillDays:function(){var e,i,a,o,n,s,d="",l=[],c=[],h=[],p=[],u=this.options.monthsShort,f=this.options.yearSuffix||"",m=this.date.getFullYear(),y=this.date.getMonth(),g=this.date.getDate(),v=this.viewDate.getFullYear(),b=this.viewDate.getMonth(),k=parseInt(this.options.weekStart,10)%7;for(d=this.options.showMonthAfterYear?v+f+" "+u[b]:u[b]+" "+v+f,a=0===b?r(v-1,11):r(v,b-1),n=1;a>=n;n++)c.push(this.template({text:n,type:"day prev",disabled:!0}));for(o=new Date(v,b,1,0,0,0,0),s=(7+(o.getDay()-k))%7,s=s>0?s:7,c=c.slice(a-s),a=11===b?r(v+1,0):r(v,b+1),n=1;a>=n;n++)p.push(this.template({text:n,type:"day next",disabled:!0}));for(a=r(v,b),o=new Date(v,b,a,0,0,0,0),s=(7-(o.getDay()+1-k))%7,s=s>=42-(c.length+a)?s:s+7,p=p.slice(0,s),n=1;a>=n;n++)e=v===m&&b===y&&n===g,i=this.options.isDisabled(new Date(v,b,n)),h.push(this.template({text:n,type:i?"day disabled":e?"day selected":"day",selected:e,disabled:i}));t.merge(l,c),t.merge(l,h),t.merge(l,p),this.$picker.find('[data-type="month current"]').html(d),this.$picker.find('[data-type="days"]').empty().html(l.join(""))},click:function(e){var i,a,o,r,n,s=t(e.target),d=/^\d{2,4}$/,l=!1;if(e.stopPropagation(),e.preventDefault(),0!==s.length)switch(i=this.viewDate.getFullYear(),a=this.viewDate.getMonth(),o=this.viewDate.getDate(),n=s.data().type){case"years prev":case"years next":i="years prev"===n?i-10:i+10,r=s.text(),l=d.test(r),l&&(i=parseInt(r,10),this.date=new Date(i,a,Math.min(o,28),0,0,0,0)),this.viewDate=new Date(i,a,Math.min(o,28),0,0,0,0),this.fillYears(),l&&(this.showView(1),this.change());break;case"year prev":case"year next":i="year prev"===n?i-1:i+1,this.viewDate=new Date(i,a,Math.min(o,28),0,0,0,0),this.fillMonths();break;case"year current":this.format.year&&this.showView(2);break;case"year selected":this.format.month?this.showView(1):this.hideView();break;case"year":i=parseInt(s.text(),10),this.date=new Date(i,a,Math.min(o,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(o,28),0,0,0,0),this.format.month?this.showView(1):this.hideView(),this.change();break;case"month prev":case"month next":a="month prev"===n?a-1:"month next"===n?a+1:a,this.viewDate=new Date(i,a,Math.min(o,28),0,0,0,0),this.fillDays();break;case"month current":this.format.month&&this.showView(1);break;case"month selected":this.format.day?this.showView(0):this.hideView();break;case"month":a=s.parent().children().index(s),this.date=new Date(i,a,Math.min(o,28),0,0,0,0),this.viewDate=new Date(i,a,Math.min(o,28),0,0,0,0),this.format.day?this.showView(0):this.hideView(),this.change();break;case"day prev":case"day next":case"day":a="day prev"===n?a-1:"day next"===n?a+1:a,o=parseInt(s.text(),10),this.date=new Date(i,a,o,0,0,0,0),this.viewDate=new Date(i,a,o,0,0,0,0),this.fillDays(),"day"===n&&this.hideView(),this.change();break;case"day selected":this.hideView(),this.change();break;case"day disabled":this.hideView()}}},h.DEFAULTS={date:!1,dateFormat:"mm/dd/yyyy",disabledClass:"disabled",selectedClass:"selected",autoClose:!1,inline:!1,trigger:!1,container:!1,showMonthAfterYear:!1,zIndex:1,viewStart:0,weekStart:0,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",template:'<div class="datepicker-container" data-type="datepicker"><div class="datepicker-arrow"></div><div class="datepicker-content"><div class="content-years" data-type="years picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="years prev">&lsaquo;</li><li class="col-5" data-type="years current"></li><li class="datepicker-next" data-type="years next">&rsaquo;</li></ul><ul class="datepicker-years" data-type="years"></ul></div><div class="content-months" data-type="months picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="year prev">&lsaquo;</li><li class="col-5" data-type="year current"></li><li class="datepicker-next" data-type="year next">&rsaquo;</li></ul><ul class="datepicker-months" data-type="months"></ul></div><div class="content-days" data-type="days picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="month prev">&lsaquo;</li><li class="col-5" data-type="month current"></li><li class="datepicker-next" data-type="month next">&rsaquo;</li></ul><ul class="datepicker-week" data-type="week"></ul><ul class="datepicker-days" data-type="days"></ul></div></div></div>',isDisabled:function(){return!1}},h.setDefaults=function(e){t.extend(h.DEFAULTS,e)},h.other=t.fn.datepicker,t.fn.datepicker=function(e){var o,r=a(arguments,1);return this.each(function(){var i,a=t(this),n=a.data("datepicker");n||a.data("datepicker",n=new h(this,e)),"string"==typeof e&&t.isFunction(i=n[e])&&(o=i.apply(n,r))}),i(o)?this:o},t.fn.datepicker.Constructor=h,t.fn.datepicker.setDefaults=h.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=h.other,this}}),function(t){"function"==typeof define&&define.amd?define("qor-comparator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.init()};e.prototype={constructor:e,init:function(){this.$modal=t(e.TEMPLATE.replace(/\{\{key\}\}/g,Date.now())).appendTo("body"),this.$modal.modal(this.options)},show:function(){this.$modal.modal("show")}},e.DEFAULTS={keyboard:!0,backdrop:!0,remote:!1,show:!1},e.TEMPLATE='<div class="modal fade qor-comparator-modal" id="qorComparatorModal{{key}}" aria-labelledby="qorComparatorModalLabel{{key}}" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorComparatorModalLabel{{key}}">Diff</h5></div><div class="modal-body"></div></div></div></div>',t.fn.modal&&t(document).on("click.qor.comparator",'[data-toggle="qor.comparator"]',function(i){var a=t(this),o=a.data("qor.comparator");i.preventDefault(),o||a.data("qor.comparator",o=new e(this,a.data())),o.show()})}),function(t){"function"==typeof define&&define.amd?define("qor-cropper",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=window.URL||window.webkitURL,i=function(e,a){this.$element=t(e),this.options=t.extend(!0,{},i.DEFAULTS,a),this.built=!1,this.url=null,this.init()};return i.prototype={constructor:i,init:function(){var e,i,a,o,r=this.$element,n=this.options;if(n.parent&&(e=r.closest(n.parent)),e.length||(e=r.parent()),n.target&&(i=e.find(n.target)),i.length||(i=t("<img>")),n.output){this.$output=e.find(n.output);try{a=JSON.parse(this.$output.val())}catch(s){console.log(s.message)}}this.$parent=e,this.$image=i,r.on("change",t.proxy(this.read,this)),this.data=a||{},o=i.data("originalUrl"),o||(o=i.prop("src"),o&&t.isFunction(n.replace)&&(o=n.replace(o))),this.load(o),r.on("change",t.proxy(this.read,this))},read:function(){var t,i=this.$element.prop("files");i&&(t=i[0],/^image\/\w+$/.test(t.type)&&e&&this.load(e.createObjectURL(t),!0))},load:function(t,i){t&&(this.built||this.build(),/^blob:\w+/.test(this.url)&&e&&e.revokeObjectURL(this.url),this.url=t,i&&(this.data[this.options.key]=null,this.$image.attr("src",t)))},build:function(){this.built||(this.built=!0,this.$cropper=t(i.TEMPLATE).prepend(this.$image).appendTo(this.$parent),this.$cropper.find(".modal").on({"shown.bs.modal":t.proxy(this.start,this),"hidden.bs.modal":t.proxy(this.stop,this)}))},start:function(){var e=this.$cropper.find(".modal"),i=t("<img>").attr("src",this.url),a=this.data,o=this.options.key,r=this;e.find(".modal-body").html(i),i.cropper({background:!1,zoomable:!1,rotatable:!1,built:function(){var n,s,d,l=a[o],c={};t.isPlainObject(l)&&(s=i.cropper("getImageData"),d=i.cropper("getCanvasData"),n=s.width/s.naturalWidth,t.each(l,function(t,e){c[String(t).toLowerCase()]=e*n}),i.cropper("setCropBoxData",{left:c.x+d.left,top:c.y+d.top,width:c.width,height:c.height})),e.find(".qor-cropper-save").one("click",function(){var t=i.cropper("getData");a[o]={x:Math.round(t.x),y:Math.round(t.y),width:Math.round(t.width),height:Math.round(t.height)},r.output(i.cropper("getCroppedCanvas").toDataURL()),e.modal("hide")})}})},stop:function(){this.$cropper.find(".modal-body > img").cropper("destroy").remove()},output:function(e){var i=t.extend({},this.data,this.options.data);this.$image.attr("src",e),this.$output.val(JSON.stringify(i))},destroy:function(){this.$element.off("change"),this.$cropper.find(".modal").off("shown.bs.modal hidden.bs.modal")}},i.DEFAULTS={target:"",output:"",parent:"",key:"qorCropper",data:null},i.TEMPLATE='<div class="qor-cropper"><a class="qor-cropper-toggle" data-toggle="modal" href="#qorCropperModal" title="Crop the image"><span class="sr-only">Toggle Cropper<span></a><div class="modal fade qor-cropper-modal" id="qorCropperModal" tabindex="-1" role="dialog" aria-labelledby="qorCropperModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorCropperModalLabel">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div></div>',t(function(){t.fn.cropper&&t('input[data-toggle="qor.cropper"]').each(function(){var e=t(this);e.data("qor.cropper")||e.data("qor.cropper",new i(this,{target:"img",output:"textarea",parent:".form-group",key:"CropOption",data:{Crop:!0},replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})}}))})}),i}),function(t){"function"==typeof define&&define.amd?define("qor-datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.date=null,this.formatDate=null,this.built=!1,this.init()};e.prototype={init:function(){this.$element.on("click",t.proxy(this.show,this)),this.options.show&&this.show()},build:function(){var i,a,o,r,n,s=this;this.built||(this.$modal=i=t(e.TEMPLATE).appendTo("body"),a=i.find(".qor-datepicker-year"),o=i.find(".qor-datepicker-month"),r=i.find(".qor-datepicker-week"),n=i.find(".qor-datepicker-day"),i.find(".qor-datepicker-embedded").on("change",function(){var e,i=t(this);s.date=e=i.datepicker("getDate"),s.formatDate=i.datepicker("getDate",!0),a.text(e.getFullYear()),o.text(String(i.datepicker("getMonthByNumber",e.getMonth(),!0)).toUpperCase()),r.text(i.datepicker("getDayByNumber",e.getDay())),n.text(e.getDate())}).datepicker({date:this.$element.val(),dateFormat:"yyyy-mm-dd",inline:!0}).triggerHandler("change"),i.find(".qor-datepicker-save").on("click",t.proxy(this.pick,this)),this.built=!0)},show:function(){this.built||this.build(),this.$modal.modal("show")},pick:function(){this.$element.val(this.formatDate),this.$modal.modal("hide")}},e.DEFAULTS={show:!0},e.TEMPLATE='<div class="modal fade qor-datepicker-modal" id="qorDatepickerModal" tabindex="-1" role="dialog" aria-labelledby="qorDatepickerModalLabel" aria-hidden="true"><div class="modal-dialog qor-datepicker"><div class="modal-content"><div class="modal-header sr-only"><h5 class="modal-title" id="qorDatepickerModalLabel">Pick a date</h5></div><div class="modal-body"><div class="qor-datepicker-picked"><div class="qor-datepicker-week"></div><div class="qor-datepicker-month"></div><div class="qor-datepicker-day"></div><div class="qor-datepicker-year"></div></div><div class="qor-datepicker-embedded"></div></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-datepicker-save">OK</button></div></div></div></div>',t.fn.datepicker&&(t(document).on("click.qor.datepicker",'[data-toggle="qor.datepicker"]',function(){var i=t(this),a=i.data("qor.datepicker");a||i.data("qor.datepicker",a=new e(this,{show:!1})),a.show()}),t(document).on("click.datepicker",'[data-toggle="datepicker"]',function(){var e=t(this);e.data("datepicker")||e.datepicker({autoClose:!0}),e.datepicker("show")}))}),function(t){"function"==typeof define&&define.amd?define("qor-drag-and-drop",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";t(function(){t(".qor-drag").prop("draggable",!0).on({dragstart:function(e){var i=e.originalEvent.dataTransfer;i.effectAllowed="copy",i.setData("text/html",t(this).find(".qor-drag-data").html())}}),t(".qor-drop").on({dragenter:function(){t(this).addClass("hover")},dragover:function(t){t.preventDefault()},dragleave:function(){t(this).removeClass("hover")},drop:function(e){t(this).removeClass("hover").append(e.originalEvent.dataTransfer.getData("text/html"))}})})}),function(t){"function"==typeof define&&define.amd?define("qor-filter",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e,o){var r,n=a.search;return t.isArray(e)&&(r=i(n),t.each(e,function(e,i){e=t.inArray(i,r),-1===e?r.push(i):o&&r.splice(e,1)}),n="?"+r.join("&")),n}function i(t){var e=[];return t&&t.indexOf("?")>-1&&(t=t.split("?")[1],t&&t.indexOf("#")>-1&&(t=t.split("#")[0]),t&&(e=t.split("&"))),e}var a=window.location,o=function(e,i){this.$element=t(e),this.options=t.extend({},o.DEFAULTS,i),this.init()};o.prototype={constructor:o,init:function(){var t=this.$element,e=this.options,i=t.find(e.toggle);i.length&&(this.$toggle=i,this.parse(),this.bind())},bind:function(){this.$element.on("click",this.options.toggle,t.proxy(this.toggle,this))},parse:function(){var e=this.options,o=i(a.search);this.$toggle.each(function(){var a=t(this);t.each(i(a.attr("href")),function(i,r){var n=t.inArray(r,o)>-1;return a.toggleClass(e.activeClass,n),n?!1:void 0})})},toggle:function(o){var r,n=t(o.target),s=i(o.target.href);o.preventDefault(),r=n.hasClass(this.options.activeClass)?e(s,!0):e(s),a.search=r}},o.DEFAULTS={toggle:"",activeClass:"active"},t(function(){t(".qor-label-group").each(function(){var e=t(this);e.data("qor.filter")||e.data("qor.filter",new o(this,{toggle:".label",activeClass:"label-primary"}))})})}),function(t){"function"==typeof define&&define.amd?define("qor-redactor",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e){var i=[];return t.isPlainObject(e)&&t.each(e,function(){i.push(arguments[1])}),i.join()}function i(t){var e=t&&t.split(",");return t=null,e&&4===e.length&&(t={x:e[0],y:e[1],width:e[2],height:e[3]}),t}var a=".qor.redactor",o="click"+a,r="focus"+a,n="blur"+a,s="imageupload"+a,d="imagedelete"+a,l=/x|y|width|height/,c=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},c.DEFAULTS,i),this.init()};c.prototype={constructor:c,init:function(){var e=this,i=this.$element,a=this.options,l=i.closest(a.parent),h=t.proxy(this.click,this);this.$button=t(c.BUTTON),i.on(s,function(e,i){t(i).on(o,h)}).on(d,function(e,i){t(i).off(o,h)}).on(r,function(t){console.log(t.type),l.find("img").off(o,h).on(o,h)}).on(n,function(t){console.log(t.type),l.find("img").off(o,h)}),t("body").on(o,function(){e.$button.off(o).detach()})},click:function(e){var i=this,a=t(e.target);e.stopPropagation(),setTimeout(function(){i.$button.insertBefore(a).off(o).one(o,function(){i.crop(a)})},1)},crop:function(a){var o=this.options,r=a.attr("src"),n=r,s=t("<img>"),d=t(c.TEMPLATE);t.isFunction(o.replace)&&(n=o.replace(n)),s.attr("src",n),d.appendTo("body").modal("show").find(".modal-body").append(s),d.one("shown.bs.modal",function(){s.cropper({background:!1,zoomable:!1,rotatable:!1,built:function(){var n,c,h=i(a.attr("data-crop-option"));t.isPlainObject(h)&&(c=s.cropper("getImageData"),n=s.cropper("getCanvasData"),c.ratio=c.width/c.naturalWidth,s.cropper("setCropBoxData",{left:h.x*c.ratio+n.left,top:h.y*c.ratio+n.top,width:h.width*c.ratio,height:h.height*c.ratio})),d.find(".qor-cropper-save").one("click",function(){var i={};t.each(s.cropper("getData"),function(t,e){l.test(t)&&(i[t]=Math.round(e))}),t.ajax(o.remote,{type:"POST",contentType:"application/json",data:JSON.stringify({Url:r,CropOption:i,Crop:!0}),dataType:"json",success:function(r){t.isPlainObject(r)&&r.url&&(a.attr("src",r.url).attr("data-crop-option",e(i)).removeAttr("style").removeAttr("rel"),t.isFunction(o.complete)&&o.complete(),d.modal("hide"))},error:function(){console.log(arguments)}})})}})}).one("hidden.bs.modal",function(){s.cropper("destroy").remove(),d.remove()})}},c.DEFAULTS={remote:!1,toggle:!1,parent:!1,replace:null,complete:null},c.BUTTON='<span class="redactor-image-cropper">Crop</span>',c.TEMPLATE='<div class="modal fade qor-cropper-modal" id="qorCropperModal" tabindex="-1" role="dialog" aria-labelledby="qorCropperModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="qorCropperModalLabel">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div>',t(function(){t.fn.redactor&&t('textarea[data-toggle="qor.redactor"]').each(function(){var e=t(this),i=e.data();e.redactor({imageUpload:i.uploadUrl,fileUpload:i.uploadUrl,initCallback:function(){e.data("qor.redactor")||e.data("qor.redactor",new c(e,{remote:i.cropUrl,toggle:".redactor-image-cropper",parent:".form-group",replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})},complete:t.proxy(function(){this.code.sync()},this)}))},focusCallback:function(){e.triggerHandler(r)},blurCallback:function(){e.triggerHandler(n)},imageUploadCallback:function(){e.triggerHandler(s,arguments[0])},imageDeleteCallback:function(){e.triggerHandler(d,arguments[1])}})})})}),function(t){"function"==typeof define&&define.amd?define("qor-replicator",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=function(i,a){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,a),this.index=0,this.init()};e.prototype={constructor:e,init:function(){var t,e=this.$element,i=this.options,a=e.find(i.itemClass);a.length&&(t=a.filter(i.newClass),t.length||(t=a.last()),this.template=t.prop("outerHTML"),this.parse(),this.bind())},parse:function(){var t=0;this.template=this.template.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g,function(e,i,a){return a=a.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/,function(e,o,r,n){return e===a?("name"===i&&(t=r),o+"[{{index}}]"+n):void 0}),i+'="'+a+'"'}),this.index=parseFloat(t)},bind:function(){var e=this.$element,i=this.options;e.on("click",i.addClass,t.proxy(this.add,this)),e.on("click",i.delClass,t.proxy(this.del,this))},add:function(e){var i=t(e.target).closest(this.options.addClass);i.length&&i.before(this.template.replace(/\{\{index\}\}/g,++this.index))},del:function(e){var i,a=this.options,o=t(e.target).closest(a.itemClass);o.is(a.newClass)?o.remove():(o.children(":visible").addClass("hidden").hide(),i=t(a.alertTemplate.replace("{{name}}",this.parseName(o))),i.find(a.undoClass).one("click",function(){i.remove(),o.children(".hidden").removeClass("hidden").show()}),o.append(i))},parseName:function(t){var e=t.find("input[name]").attr("name");return e?e.replace(/[^\[\]]+$/,""):void 0}},e.DEFAULTS={itemClass:"",newClass:"",addClass:"",delClass:"",alertTemplate:""},t(function(){t(".qor-collection-group").each(function(){var i=t(this);i.data("qor.replicator")||i.data("qor.replicator",new e(this,{itemClass:".qor-collection",newClass:".qor-collection-new",addClass:".qor-collection-add",delClass:".qor-collection-del",undoClass:".qor-collection-undo",alertTemplate:'<div class="alert alert-danger"><input type="hidden" name="{{name}}._destroy" value="1"><a href="javascript:void(0);" class="alert-link qor-collection-undo">Undo Delete</a></div>'}))})})}),function(t){"function"==typeof define&&define.amd?define("qor-selector",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";t(function(){t.fn.chosen&&t('select[data-toggle="qor.selector"]').each(function(){var e=t(this);e.prop("multiple")||e.find("option[selected]").length||e.prepend('<option value="" selected></option>'),e.chosen()})})}),function(t){"function"==typeof define&&define.amd?define("qor-widgets",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e={};return e.init=function(){this.confirm(),this.checkAll(),this.tooltip()},e.confirm=function(){t(document).on("click.qor.confirmer","[data-confirm]",function(e){var i=t(this).data("confirm");i&&!window.confirm(i)&&e.preventDefault()})},e.checkAll=function(){t(".qor-check-all").each(function(){var e=t(this);e.attr("title","Check all").tooltip().on("click",function(){this.disabled||t(this).attr("data-original-title",this.checked?"Uncheck all":"Check all").closest("table").find(":checkbox:not(.qor-check-all)").prop("checked",this.checked)}),this.checked&&e.triggerHandler("click")})},e.tooltip=function(){t('[data-toggle="tooltip"]').tooltip()},t(function(){e.init()}),e}),$(function(){$(".table").each(function(){var t=this,e=$(this).find(".thr-inner .th");e.each(function(){var e=$(this).data("col"),i=$(this).outerWidth();$(t).find(".tr-inner ."+e).outerWidth(i)})}),$(".grid-trigger-wrapper .trigger").on("click",function(){var t=$(this).attr("state");$(".table, table").attr("state",t),$(".grid-trigger-wrapper .trigger").removeClass("cur"),$(this).addClass("cur")})});