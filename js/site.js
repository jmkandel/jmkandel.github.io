
/*!
 * IUComm: BG Video Banners
 */

;(function ($, window, document, undefined ) {

    'use strict';

    function once(fn, context) {
        var result;

        return function() {
            if(fn) {
                result = fn.apply(context || this, arguments);
                fn = null;
            }

            return result;
        };
    }

    function BgVideo($el, settings, id) {

        IUComm.debug('Module: Initializing BG Video - ' + id, $el);

        this.id = id;
        this.video = $el;
        this.section = $el.closest('.bg-video');
        this.wrapper = $el.closest('.bg-video-viewport');
        this.state = 'playing';

        this.setup();

        return this;
    }

    BgVideo.prototype.setup = function() {
        var scope = this;

        scope.videoRatio();

        // Remove loading class from banner
        // see https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
        // Use "once" so that when the video loops, it doesn't reinit bindPlayPause
        scope.video.on('canplay', once(function() {
            scope.bindPlayPause();
            scope.wrapper.addClass('loaded');
            scope.section.addClass('video-loaded');
        }) );
    };

    BgVideo.prototype.bindPlayPause = function() {
        var scope = this;
        var videoNum = scope.id + 1;

        var videoBtn = '<a class="icon-pause" href="#">Pause Video ' + videoNum + '</a>';

        var playControls = $('<div class="play-controls via-js"><div class="row pad">' + videoBtn + '</div></div>');

        $(playControls).insertAfter(scope.wrapper);

        $("a", playControls).on("click", function(event) {
            event.preventDefault();

            var $this = $(this);

            if (scope.state === 'playing') {
                scope.video.trigger('pause');
                $this.html('Play Video ' + videoNum).removeClass('icon-pause').addClass('icon-play');
                scope.state = 'paused';
                return;
            }

            if (scope.state === 'paused') {
                scope.video.trigger('play');
                $this.html('Pause Video ' + videoNum).removeClass('icon-play').addClass('icon-pause');
                scope.state = 'playing';
                return;
            }
        });
    };

    BgVideo.prototype.videoRatio = function() {
        var scope = this;

        // Set up Dimensions
        scope.vid_width = parseInt(scope.video.attr('width'));
        scope.vid_height = parseInt(scope.video.attr('height'));

        scope.ratio = ( (scope.vid_height / scope.vid_width) * 100 ).toFixed(5);

        if (scope.ratio !== '33.33333') {
            scope.section.css({ paddingBottom: scope.ratio + '%'});
        }
    };

    function CreateVideoElement($el, id) {
        // Create video
        var videoEl = document.createElement('video');
        videoEl.setAttribute('autoplay', 'autoplay');
        videoEl.setAttribute('loop', 'loop');
        videoEl.setAttribute('preload', 'preload');
        videoEl.setAttribute('width', $el.attr('data-width'));
        videoEl.setAttribute('height', $el.attr('data-height'));

        // add webm source:
        if ($el.attr('data-webm').length) {
            var sourceWebM = document.createElement('source');
            sourceWebM.setAttribute('type', 'video/webm');
            sourceWebM.setAttribute('src', $el.attr('data-webm') );
            videoEl.appendChild(sourceWebM);
        }

        // add mp4 source:
        if ($el.attr('data-mp4').length) {
            var sourceMP4 = document.createElement('source');
            sourceMP4.setAttribute('type', 'video/mp4');
            sourceMP4.setAttribute('src', $el.attr('data-mp4') );
            videoEl.appendChild(sourceMP4);
        }

        $el.append(videoEl);

        return videoEl;
    };

    IUComm.addInitalisation('bg-video-element', function() {
        IUComm.debug('Module: Initializing BG Video Element');

        var settings = arguments[0];

        // Create video element/markup if necessary
        $('[data-mp4], [data-webm]').each(function(id) {
            var $this = $(this);

            // this element has already been initialized
            if ($this.data('hasVideoElement')) {
                return true;
            }

            // mark element as initialized
            $this.data('hasVideoElement', true);

            var video = new CreateVideoElement($this, id);

            // Initialize bg-video for this new element
            IUComm.initialize('bg-video');
        });
    });

    // add initialisation
    IUComm.addInitalisation('bg-video', function() {

        var settings = arguments[0];

        $('.bg-video video').each(function(id) {
            var $this = $(this);

            // this element has already been initialized
            if ($this.data('isBgVideo')) {
                return true;
            }

            // mark element as initialized
            $this.data('isBgVideo', true);

            var video = new BgVideo($this, settings, id);
        });
    });

    // Register UI module
    IUComm.UIModule({
        module: 'bg-video-element',
        settings: {},
        init: function() {
            IUComm.initialize('bg-video-element', this.settings);
        }
    });

    // Register UI module
    IUComm.UIModule({
        module: 'bg-video',
        settings: {},
        init: function() {
            IUComm.initialize('bg-video', this.settings);
        }
    });

})( jQuery, window, window.document );

/*!
 * History API JavaScript Library v4.2.8
 *
 * Support: IE8+, FF3+, Opera 9+, Safari, Chrome and other
 *
 * Copyright 2011-2017, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Update: 2017-03-01 12:07
 */
!function(e){if("function"==typeof define&&define.amd){if("undefined"!=typeof requirejs){var t=requirejs,n="[history"+(new Date).getTime()+"]",r=t.onError;e.toString=function(){return n},t.onError=function(e){-1===e.message.indexOf(n)&&r.call(t,e)}}define([],e)}return"object"!=typeof exports||"undefined"==typeof module?e():void(module.exports=e())}(function(){function e(e,t){var n=m.history!==w;n&&(m.history=w),e.apply(w,t),n&&(m.history=A)}function t(){}function n(e,t,r){if(e==v||""===e||t)e=t?e:S.href,(!T||r)&&(e=e.replace(/^[^#]*/,"")||"#",e=S.protocol.replace(/:.*$|$/,":")+"//"+S.host+V.basepath+e.replace(RegExp("^#[/]?(?:"+V.type+")?"),""));else{var t=n(),i=b.getElementsByTagName("base")[0];!r&&i&&i.getAttribute("href")&&(i.href=i.href,t=n(i.href,v,g)),r=t.d,i=t.h,e=""+e,e=/^(?:\w+\:)?\/\//.test(e)?0===e.indexOf("/")?i+e:e:i+"//"+t.g+(0===e.indexOf("/")?e:0===e.indexOf("?")?r+e:0===e.indexOf("#")?r+t.e+e:r.replace(/[^\/]+$/g,"")+e)}C.href=e;var e=/(?:([a-zA-Z0-9\-]+\:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/.exec(C.href),t=e[2]+(e[3]?":"+e[3]:""),r=e[4]||"/",i=e[5]||"",o="#"===e[6]?"":e[6]||"",a=r+i+o,c=r.replace(RegExp("^"+V.basepath,"i"),V.type)+i;return{b:e[1]+"//"+t+a,h:e[1],g:t,i:e[2],k:e[3]||"",d:r,e:i,a:o,c:a,j:c,f:c+o}}function r(){var e;try{e=m.sessionStorage,e.setItem(q+"t","1"),e.removeItem(q+"t")}catch(t){e={getItem:function(e){return e=b.cookie.split(e+"="),1<e.length&&e.pop().split(";").shift()||"null"},setItem:function(e){var t={};(t[S.href]=A.state)&&(b.cookie=e+"="+O.stringify(t))}}}try{F=O.parse(e.getItem(q))||{}}catch(n){F={}}D(P+"unload",function(){e.setItem(q,O.stringify(F))},y)}function i(e,n,r,i){var o=0;r||(r={set:t},o=1);var a=!r.set,c=!r.get,f={configurable:g,set:function(){a=1},get:function(){c=1}};try{I(e,n,f),e[n]=e[n],I(e,n,r)}catch(s){}if(!(a&&c||(e.__defineGetter__&&(e.__defineGetter__(n,f.get),e.__defineSetter__(n,f.set),e[n]=e[n],r.get&&e.__defineGetter__(n,r.get),r.set&&e.__defineSetter__(n,r.set)),a&&c))){if(o)return y;if(e===m){try{var p=e[n];e[n]=v}catch(u){}if("execScript"in m)m.execScript("Public "+n,"VBScript"),m.execScript("var "+n+";","JavaScript");else try{I(e,n,{value:t})}catch(l){"onpopstate"===n&&(D("popstate",r=function(){G("popstate",r,y);var t=e.onpopstate;e.onpopstate=v,setTimeout(function(){e.onpopstate=t},1)},y),M=0)}e[n]=p}else try{try{var h=_.create(e);I(_.getPrototypeOf(h)===e?h:e,n,r);for(var d in e)"function"==typeof e[d]&&(h[d]=e[d].bind(e));try{i.call(h,h,e)}catch(E){}e=h}catch(b){I(e.constructor.prototype,n,r)}}catch(x){return y}}return e}function o(e,t,n){return n=n||{},e=e===Y?S:e,n.set=n.set||function(n){e[t]=n},n.get=n.get||function(){return e[t]},n}function a(e,t,n){e in H?H[e].push(t):3<arguments.length?D(e,t,n,arguments[3]):D(e,t,n)}function c(e,t,n){var r=H[e];if(r){for(e=r.length;e--;)if(r[e]===t){r.splice(e,1);break}}else G(e,t,n)}function f(e,n){var r=(""+("string"==typeof e?e:e.type)).replace(/^on/,""),o=H[r];if(o){if(n="string"==typeof e?n:e,n.target==v)for(var a=["target","currentTarget","srcElement","type"];e=a.pop();)n=i(n,e,{get:"type"===e?function(){return r}:function(){return m}});M&&(("popstate"===r?m.onpopstate:m.onhashchange)||t).call(m,n);for(var a=0,c=o.length;a<c;a++)o[a].call(m,n);return g}return U(e,n)}function s(){var e=b.createEvent?b.createEvent("Event"):b.createEventObject();e.initEvent?e.initEvent("popstate",y,y):e.type="popstate",e.state=A.state,f(e)}function p(e,t,r,i){T?J=S.href:(0===Z&&(Z=2),t=n(t,2===Z&&-1!==(""+t).indexOf("#")),t.c!==n().c&&(J=i,r?S.replace("#"+t.f):S.hash=t.f)),!$&&e&&(F[S.href]=e),W=y}function u(e){var t=J;if(J=S.href,t){z!==S.href&&s();var e=e||m.event,t=n(t,g),r=n();e.oldURL||(e.oldURL=t.b,e.newURL=r.b),t.a!==r.a&&f(e)}}function l(e){setTimeout(function(){D("popstate",function(e){z=S.href,$||(e=i(e,"state",{get:function(){return A.state}})),f(e)},y)},0),!T&&e!==g&&"location"in A&&(d(L.hash),W&&(W=y,s()))}function h(e){var t,e=e||m.event;e:{for(t=e.target||e.srcElement;t;){if("A"===t.nodeName)break e;t=t.parentNode}t=void 0}var r="defaultPrevented"in e?e.defaultPrevented:e.returnValue===y;t&&"A"===t.nodeName&&!r&&(r=n(),t=n(t.getAttribute("href",2)),r.b.split("#").shift()===t.b.split("#").shift()&&t.a&&(r.a!==t.a&&(L.hash=t.a),d(t.a),e.preventDefault?e.preventDefault():e.returnValue=y))}function d(e){var t=b.getElementById(e=(e||"").replace(/^#/,""));t&&t.id===e&&"A"===t.nodeName&&(e=t.getBoundingClientRect(),m.scrollTo(x.scrollLeft||0,e.top+(x.scrollTop||0)-(x.clientTop||0)))}var g=!0,v=null,y=!1,m=("object"==typeof window?window:this)||{};if(!m.history||"emulate"in m.history)return m.history;var E,b=m.document,x=b.documentElement,_=m.Object,O=m.JSON,S=m.location,w=m.history,A=w,j=w.pushState,R=w.replaceState,T=function(){var e=m.navigator.userAgent;return-1===e.indexOf("Android 2.")&&-1===e.indexOf("Android 4.0")||-1===e.indexOf("Mobile Safari")||-1!==e.indexOf("Chrome")||-1!==e.indexOf("Windows Phone")?!!j:y}(),$="state"in w,I=_.defineProperty,L=i({},"t")?{}:b.createElement("a"),P="",N=m.addEventListener?"addEventListener":(P="on")&&"attachEvent",k=m.removeEventListener?"removeEventListener":"detachEvent",B=m.dispatchEvent?"dispatchEvent":"fireEvent",D=m[N],G=m[k],U=m[B],V={basepath:"/",redirect:0,type:"/",init:0},q="__historyAPI__",C=b.createElement("a"),J=S.href,z="",M=1,W=y,Z=0,F={},H={},K=b.title,Q={onhashchange:v,onpopstate:v},X={setup:function(e,t,n){V.basepath=(""+(e==v?V.basepath:e)).replace(/(?:^|\/)[^\/]*$/,"/"),V.type=t==v?V.type:t,V.redirect=n==v?V.redirect:!!n},redirect:function(e,t){if(A.setup(t,e),t=V.basepath,m.top==m.self){var r=n(v,y,g).c,i=S.pathname+S.search;T?(i=i.replace(/([^\/])$/,"$1/"),r!=t&&RegExp("^"+t+"$","i").test(i)&&S.replace(r)):i!=t&&(i=i.replace(/([^\/])\?/,"$1/?"),RegExp("^"+t,"i").test(i)&&S.replace(t+"#"+i.replace(RegExp("^"+t,"i"),V.type)+S.hash))}},pushState:function(t,n,r){var i=b.title;K!=v&&(b.title=K),j&&e(j,arguments),p(t,r),b.title=i,K=n},replaceState:function(t,n,r){var i=b.title;K!=v&&(b.title=K),delete F[S.href],R&&e(R,arguments),p(t,r,g),b.title=i,K=n},location:{set:function(e){0===Z&&(Z=1),m.location=e},get:function(){return 0===Z&&(Z=1),L}},state:{get:function(){return"object"==typeof F[S.href]?O.parse(O.stringify(F[S.href])):"undefined"!=typeof F[S.href]?F[S.href]:v}}},Y={assign:function(e){T||0!==(""+e).indexOf("#")?S.assign(e):p(v,e)},reload:function(e){S.reload(e)},replace:function(e){T||0!==(""+e).indexOf("#")?S.replace(e):p(v,e,g)},toString:function(){return this.href},origin:{get:function(){return void 0!==E?E:S.origin?S.origin:S.protocol+"//"+S.hostname+(S.port?":"+S.port:"")},set:function(e){E=e}},href:T?v:{get:function(){return n().b}},protocol:v,host:v,hostname:v,port:v,pathname:T?v:{get:function(){return n().d}},search:T?v:{get:function(){return n().e}},hash:T?v:{set:function(e){p(v,(""+e).replace(/^(#|)/,"#"),y,J)},get:function(){return n().a}}};return function(){var e=b.getElementsByTagName("script"),e=(e[e.length-1]||{}).src||"";(-1!==e.indexOf("?")?e.split("?").pop():"").replace(/(\w+)(?:=([^&]*))?/g,function(e,t,n){V[t]=(n||"").replace(/^(0|false)$/,"")}),D(P+"hashchange",u,y);var t=[Y,L,Q,m,X,A];$&&delete X.state;for(var a=0;a<t.length;a+=2)for(var c in t[a])if(t[a].hasOwnProperty(c))if("object"!=typeof t[a][c])t[a+1][c]=t[a][c];else{if(e=o(t[a],c,t[a][c]),!i(t[a+1],c,e,function(e,n){n===A&&(m.history=A=t[a+1]=e)}))return G(P+"hashchange",u,y),y;t[a+1]===m&&(H[c]=H[c.substr(2)]=[])}return A.setup(),V.redirect&&A.redirect(),V.init&&(Z=1),!$&&O&&r(),T||b[N](P+"click",h,y),"complete"===b.readyState?l(g):(!T&&n().c!==V.basepath&&(W=g),D(P+"load",l,y)),g}()?(A.emulate=!T,m[N]=a,m[k]=c,m[B]=f,A):void 0});
/*!
 * IU: Form Filter
 */
!function(e,t,o,n){"use strict";function i(t,o,n){this.$form=t,this.$selections=e("#filter-selection"),this.$pagination=e("#filter-pagination"),this.$mobilePagination=e("#filter-pagination-mobile"),this.$results=e("#filter-results"),this.yourSelections={},this.settings=n,this.usePopover="undefined"==typeof this.$form.data("popover")||this.$form.data("popover"),this.useSelections="undefined"==typeof this.$form.data("selections")||this.$form.data("selections"),this.setup()}var r=(t.history.location||t.location,t.IUComm||{});i.prototype.setup=function(){this.settings.handlePageLoad&&this.handlePageLoad(),this.submitPath=this.formSubmitPath(),this.bindFormSubmit(),this.bindClickEvents(),this.bindSelectEvents(),this.bindTextInput(),this.bindNumberInput(),this.bindRadioEvents(),this.bindCheckboxEvents(),this.bindPaginationEvents(),this.usePopover&&this.buildPopover(),this.hideSubmitButton()},i.prototype.hideSubmitButton=function(){this.$form.removeClass("grid-has-submit"),e('button[type="submit"]',this.$form).hide()},i.prototype.ajaxScroll=function(t){var o=this;e("html, body").animate({scrollTop:o.$results.offset().top-t},1e3)},i.prototype.formSubmitPath=function(){var e=this,t=e.$form.attr("action");return"undefined"!=typeof e.$form.data("api")&&(t=e.$form.data("api")),t},i.prototype.bindFormSubmit=function(){var t=this,o=t.$form;o.on("submit",function(n,i){n.preventDefault();var r=t.yourSelections,a=t.createQueryString(r);t.useSelections||(a=o.serialize()),t.addSpinner(),t.settings.dev||e.ajax({url:t.submitPath,data:a,method:o.attr("method"),dataType:"html",success:function(e){t.handleResponse(e)}}),history.replaceState(a,null,"?"+a)})},i.prototype.bindClickEvents=function(){var t=this;t.$selections.on("click","a.select-item",function(o){o.preventDefault();var n=e(this).data("name");t.removeSelection(n),t.$form.trigger("submit")})},i.prototype.bindTextInput=function(){var t=this;e("input[type='text']",t.$form).on("keyup",r.utils.throttle(function(o){var n=e(this),i=n.attr("name"),r="Search text: "+n.val(),a=n.val();t.selectionCrud(n,i,a,r)},750))},i.prototype.bindNumberInput=function(){var t=this;e("input[type='number']",t.$form).on("input",function(o){var n=e(this),i=n.attr("name"),r="Search text: "+n.val(),a=n.val();t.selectionCrud(n,i,a,r)})},i.prototype.bindCheckboxEvents=function(){var t=this;e("input[type='checkbox']",t.$form).on("change",function(o){var n=e(this),i=n.closest(".alpha.checkboxes"),r=n.attr("name"),a=n.siblings("label").text(),s=n.is(":checked")?n.val():"";i.length&&i.find('input[type="checkbox"]').not(n).prop("checked",!1),t.selectionCrud(n,r,s,a)})},i.prototype.bindRadioEvents=function(){var t=this;e("input[type='radio']",t.$form).on("change",function(o){t.$form.trigger("submit");var n=e(this),i=n.attr("name"),r=n.val(),a=n.val();t.selectionCrud(n,i,a,r)}),e("input[type='radio']",t.$form).on("")},i.prototype.bindSelectEvents=function(){var t=this;e("select[data-ajax='true']").on("change",function(){var o=e(this),n=o.data("results-endpoint"),i=o.data("controls"),r={};r[o.attr("name")]=o.val(),o.trigger("IU.reset-ajax-child");var a=e(i);a.empty(),e.ajax({url:n,method:t.$form.attr("method"),data:t.$form.serialize(),success:function(t,o,n){var r=n.getResponseHeader("Content-Type");if(r.includes("text/html")){var s=e(t).find(i).html();a.html(s)}else e.each(t,function(e,t){a.append("<option value='"+t.id+"'>"+t.name+"</option>")})}})}),e("select[data-ajax='true']").on("IU.reset-ajax-child",function(o){var n=e(this),i=n.data("controls"),r=e(i),a=r.attr("name");t.removeSelection(a),e(":first",r).prop("selected",!0),e(":not(:first)",r).remove()}),t.$form.on("change","select",function(){var o=e(this),n=e("option:selected",o),i=o.attr("name"),r=n.text(),a=n.val();t.selectionCrud(o,i,a,r)})},i.prototype.bindPaginationEvents=function(){var t=this;t.$mobilePagination.find("a.selector").removeAttr("href"),t.$mobilePagination.on("click","a.button.next, a.button.previous",function(o){o.preventDefault();var n=e(this),i=n.attr("href");t.paginationSubmit(i,80)}),t.$mobilePagination.on("change","select.pagination",function(o){o.preventDefault();var n=e(this),i=e("option:selected",n).val();t.paginationSubmit(i,80)}),e(t.$pagination).on("click","a",function(o){o.preventDefault();var n=e(this);e("li",t.$pagination).removeClass("current"),n.closest("li").addClass("current");var i=n.attr("href");t.paginationSubmit(i,100)})},i.prototype.paginationSubmit=function(t,o){var n=this;n.ajaxScroll(o),e.get(n.submitPath+t,function(e){n.handleResponse(e)}),history.replaceState(t,null,t)},i.prototype.handleResponse=function(t){var o=this;t=e("<div />").append(jQuery.parseHTML(t)),o.replaceResults(t),o.replacePagination(t),o.removeSpinner(),o.replaceCount(t),r.helpers&&r.helpers.emailObfuscation.call(r),r.helpers&&r.helpers.externalLinksInNewTabs.call(r)},i.prototype.replaceResults=function(t){var o=this,n=e(t).find("#filter-results, #results").html();n="undefined"==typeof n?"&nbsp;":n,o.$results.html(n),o.$results.find("a:first").focus()},i.prototype.replacePagination=function(t){var o=this,n=e("#filter-pagination",t).html(),i=e("#filter-pagination-mobile",t).html();n="undefined"==typeof n?"&nbsp;":n,i="undefined"==typeof i?"&nbsp;":i,o.$pagination.html(n),o.$mobilePagination.html(i),o.$mobilePagination.find("a.selector").removeAttr("href")},i.prototype.replaceCount=function(t){var o=e("#filter-selection .result-count",t),n=o.data("label")&&o.data("label").length?o.data("label"):"results found",i=e("#filter-selection .result-count span",t).html(),r=i?"<span>"+i+"</span> "+n:"<span></span>";e(".result-count").html(r)},i.prototype.selectionCrud=function(e,t,o,n){var i=this;if(delete i.yourSelections.page,"checkbox"===e.attr("type")&&(e=e.closest(".form-item-input")),e.data("isFiltered")){if(""===o||"0"===o||"all"===o)return i.removeSelection(t),r.debug("Remove Selection"),void i.$form.trigger("submit");if(""!==o)return i.updateSelection(t,o,n),r.debug("Update Selection"),void i.$form.trigger("submit")}if(""!==o||"0"!==o||"all"!==o)return i.addSelection(e,t,o,n),r.debug("Add Selection"),e.data("isFiltered",!0),void i.$form.trigger("submit")},i.prototype.addSelection=function(t,o,n,i){var r=this,a=e("<a>",{"class":"select-item",href:"#",text:i,"data-name":o,"data-value":n});r.yourSelections[o]=n,r.yourSelections.hasOwnProperty("clear-all")||r.buildClearButton(),e(a).insertBefore(".clear",r.$selections)},i.prototype.updateSelection=function(t,o,n){var i=this,r=e('[data-name="'+t+'"]',i.$selections);i.yourSelections[t]=o,r.attr("data-value",o),r.text(n),n.length||i.removeSelection(t)},i.prototype.removeSelection=function(t){var o=this,n=e('[data-name="'+t+'"]',o.$selections);"clear-all"!==t&&o.resetFormItem(t),"clear-all"!==t&&1!==Object.keys(o.yourSelections).length||o.clearAllSelections(),n.remove()},i.prototype.resetFormItem=function(t){var o=this,n=o.$form.find('[name="'+t+'"]');n.is(":text")&&n.val(""),n.is("select")&&e(":first",n).prop("selected",!0),n.is(":checkbox")&&(n.prop("checked",!1),n.closest(".form-item-input").removeData("isFiltered")),"letter"===t&&(n=e(".form-item.alpha"),e(".form-item.alpha li").removeClass("current")),n.removeData("isFiltered"),delete o.yourSelections[t]},i.prototype.buildClearButton=function(){var t=this;t.yourSelections["clear-all"]="Clear selections";var o=e("<a>",{"class":"select-item clear",href:"#",text:"Clear selections","data-name":"clear-all","data-value":"clear-all"});e(".content",t.$selections).append(o)},i.prototype.clearAllSelections=function(){var t=this;for(name in t.yourSelections)t.resetFormItem(name);t.yourSelections={},e(".content",t.$selections).html("")},i.prototype.buildPopover=function(){var t=this;if(t.usePopover){var o=e('<div class="popoverScreen" />'),n=e("#filter-selection");t.$popoverScreen=o,t.$form.before(o),t.buildFilterControls(),t.addViewResultsButton(),enquire.register("screen and (max-width: 40em)",{match:function(){t.$form.addClass("popover"),e(".result-count",n).hide(),t.$filterControls.show(),t.$viewResultsButton.show()},unmatch:function(){t.closePopover(),t.$form.removeClass("popover"),t.$filterControls.hide(),t.$viewResultsButton.hide(),e(".result-count",n).show()}})}},i.prototype.buildFilterControls=function(t){var n=this,i=e(".result-count",n.$selections).html();"undefined"==typeof i&&(i="");var r=e('<div id="filter-controls" class="clearfix" />'),a=e('<p class="float-left left result-count">'+i+"</p>"),s=e('<div class="float-right right"><a href="#" class="open-popover button button-small">Filter Results</a></div>');r.append(a),r.append(s),r.hide(),e(o).on("click","a.open-popover",function(e){e.preventDefault(),n.openPopover()}),n.$filterControls=r,n.$filterControls.insertBefore(n.$form)},i.prototype.addViewResultsButton=function(){var t=this,o=e('<button type="button" class="button close">View Results</button>');o.hide(),t.$form.append(o),t.$viewResultsButton=o},i.prototype.openPopover=function(){var t=this,o=e(".filter-title .label",t.$form);r.preventHTMLScroll(),o.length?o.addClass("modal-title").append("<span class='close right'>&times;</span>"):(o=e("<h4 class='modal-title custom'>Filters <span class='close right'>&times;</span></h4>"),t.$form.prepend(o)),t.$form.addClass("open"),t.$popoverScreen.addClass("open"),t.$form.on("click",".close",t.closePopover.bind(t)),t.$popoverScreen.on("click",t.closePopover.bind(t))},i.prototype.closePopover=function(){var t=this;t.$form.removeClass("open"),r.enableHTMLScroll(),e(".modal-title.custom",t.$form).remove(),t.$form.find(".close.right").remove(),t.$popoverScreen.removeClass("open")},i.prototype.handlePageLoad=function(){var e=this,t=e.getQueryParameters();e.yourSelections=t||{};for(var o in e.yourSelections){e.$form.find('[name="'+o+'"]');"all"!==e.yourSelections[o]||delete e.yourSelections[o]}e.setupFilters(),Object.keys(e.yourSelections).length&&(e.yourSelections["clear-all"]="Clear selections")},i.prototype.setupFilters=function(){r.debug("Setup Filters");var o=this,n=(t.location.search,o.getQueryParameters());for(var i in n)if(n.hasOwnProperty(i)){var a=e("select[name="+i+"]"),s=e("input[type=checkbox][name="+i+"]"),l=e("input[type=text][name="+i+"]");if(a.length){a.val(n[i]);var c=e("option:selected",a),p=a.attr("name"),u=c.text(),d=c.val();o.addSelection(a,p,d,u),a.data("isFiltered",!0);continue}if(s.length){var f=s.closest(".alpha.checkboxes");if(f.length){e(":checkbox[value="+n[i]+"]",o.$form).prop("checked",!0);var p=s.attr("name"),u=n[i],d=n[i],m=s.closest(".form-item-input");m.data("isFiltered",!0)}else{s.prop("checked",!0);var p=s.attr("name"),u=s.next("label").text(),d=s.next("label").text()}o.addSelection(s,p,d,u);continue}if(l.length){l.val(n[i]);var p=l.attr("name"),u="Search text: "+l.val(),d=l.val();o.addSelection(l,p,d,u),l.data("isFiltered",!0);continue}}},i.prototype.getQueryParameters=function(e){return e=e||o.location.search,!e&&{}||e.replace(/(^\?)/,"").split("&").map(function(e){return e=e.split("="),this[e[0]]=decodeURIComponent(e[1]),this}.bind({}))[0]},i.prototype.createQueryString=function(e){var t=[];for(var o in e)e.hasOwnProperty(o)&&"clear-all"!==o&&t.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return t.join("&")},i.prototype.addSpinner=function(){e(".result-count").addClass("loading"),e(".result-count span").html("")},i.prototype.removeSpinner=function(){e(".result-count").removeClass("loading")},r.FormFilter=i,r.addInitalisation("form-filter",function(){var t=arguments[0];e("form.filter").each(function(o){var n=e(this);if(n.data("isFormFilter"))return!0;n.data("isFormFilter",!0);new r.FormFilter(n,o,t)})}),r.UIModule({module:"form-filter",settings:{dev:!1,handlePageLoad:!0},init:function(){r.initialize("form-filter",this.settings)}})}(jQuery,window,window.document);
/*!
 * IUComm: IUB Video Story
 */

/*
!function(t,e,o,i){
	"use strict";
	function s(t,e,o){
		this.$el=t,
		this.section=t.closest(".bg-video"),	
		this.settings=e,
		this.rootUrl=e.rootUrl,o.splice(-1,1),
		this.stories=o,this.setSelectedItem(),
		this.setup()
	}
	s.prototype.setup=function(){
		var t=this;
		t.updateBGImage(),
		t.updateStoryWell(),
		t.createVideoEl()
	},
	s.prototype.setSelectedItem=function(){
		var t=this;
		if(t.selectedItemID=t.$el.data("video-id"),"random"===t.$el.data("video-id")&&(t.selectedItemID=Math.floor(Math.random()*t.stories.length)),"undefined"!=typeof t.settings.storyId)
		for(var e=0,o=t.stories.length;e<o;e++)
		if(t.stories[e].id===t.settings.storyId){
			t.selectedItemID=e;break
		}
		t.image=t.stories[t.selectedItemID].image,
		t.story=t.stories[t.selectedItemID].story,
		t.video=t.stories[t.selectedItemID].video
	},
	s.prototype.updateBGImage=function(){
		var t=this,
		e=t.section.find(".bg-image-cover");
		e.css("background-image",'url("'+t.rootUrl+t.image.path+'")')
	},
	s.prototype.updateStoryWell=function(){
		var t=this;
		t.section.find(".story-well h2").html(t.story.title),
		t.section.find(".story-well .meta").html(t.story.subtitle),
		t.section.find(".story-well a.button").text(t.story.more.link_text).attr("href",
		t.rootUrl+t.story.more.url),
		"left"===t.story.focal_point&&t.section.removeClass("focus-right").addClass("focus-left"),
		"right"===t.story.focal_point&&t.section.removeClass("focus-left").addClass("focus-right")
	},
	s.prototype.createVideoEl=function(){
		var t=this,
		e=o.createElement("video");
		e.autoplay=!0,e.loop=!0,
		e.preload=!0,
		e.setAttribute("width",t.video.width),
		e.setAttribute("height",t.video.height);
		var i=o.createElement("source");
		i.type="video/webm",
		i.src=t.rootUrl+t.video.webm,e.appendChild(i);
		var s=o.createElement("source");
		s.type="video/mp4",
		s.src=t.rootUrl+t.video.mp4,
		e.appendChild(s),
		t.videoEl=e
	},
	IUComm.addInitalisation("video-story",function(){
		var e=arguments[0];
		t(".bg-video #video-story").length&&(location.host.indexOf("webtest")!==-1&&(e.rootUrl="https://iubwebs.webtest.iu.edu/_json/"),
		t.ajax({
			type:"GET",url:e.rootUrl+"success-stories.json",
			data:{},
			success:function(o){
				var i=t(".bg-video #video-story");i.closest(".section").addClass("has-video-story");
				var r=new s(i,e,o);i.addClass("bg-video-viewport").html(r.videoEl),IUComm.initialize("bg-video")
			},
			error:function(t,e,o){
				console.log(o)
			}
		}))
	}),
	IUComm.UIModule({
		module:"video-story",
		settings:{rootUrl:"https://www.indiana.edu/_json/"},
		init:function(){
			IUComm.initialize("video-story",this.settings)
		}
	})
}(jQuery,window,window.document);

*/


/*!
 * IUComm: IUB Skirt Accordion
 */
!function(t,e,i,n){"use strict";function a(e,i,n){IUComm.debug("Module: Initializing Skirt Accordion",e),this.$el=e,this.$titles=t(".column > .column--title",this.$el),this.$content=t(".column ul",this.$el),this.id=i,this.settings=n,this.ariaAttr={hideTitle:{"aria-selected":"false"},showTitle:{"aria-selected":"true"},hidePanel:{"aria-expanded":"false","aria-hidden":"true"},showPanel:{"aria-expanded":"true","aria-hidden":"false"}}}a.prototype.setup=function(){var e=this;e.settings.needsMarkup&&e.addMarkup(),e.$el.addClass("accordion"),e.$titles.attr(e.ariaAttr.hideTitle),e.$content.attr(e.ariaAttr.hidePanel),e.$content.hide(),e.$titles.on("click",function(i){i.preventDefault();var n=t(this);e.handleToggle(n)}),e.$el.on("keydown",function(t){e.keydown(t)})},a.prototype.destroy=function(){var t=this;t.$el.removeClass("accordion"),t.$content.show(),t.removeMarkup(),t.$titles.unbind("click"),t.$el.unbind("keydown")},a.prototype.addMarkup=function(){var e=this;t.each(e.$titles,function(i,n){t(this).attr({id:"nav-"+e.id+"-"+i,"aria-controls":"nav-panel-"+e.id+"-"+i})}),t.each(e.$content,function(i,n){t(this).attr({id:"nav-panel-"+e.id+"-"+i,"aria-labelledby":"nav-"+e.id+"-"+i})})},a.prototype.removeMarkup=function(){var t=this;t.$titles.removeAttr("id"),t.$titles.removeAttr("aria-controls"),t.$titles.removeAttr("aria-selected"),t.$content.removeAttr("id"),t.$content.removeAttr("aria-expanded"),t.$content.removeAttr("aria-labelledby"),t.$content.removeAttr("aria-hidden")},a.prototype.handleToggle=function(e){var i=this,n=i.$el;i.$content.filter(":visible").slideUp({start:function(){t(".column.open",n).removeClass("open"),i.$titles.attr(i.ariaAttr.hideTitle),i.$content.attr(i.ariaAttr.hidePanel)}}),e.next("ul").filter(":not(:visible)").slideDown({start:function(){var n=t(this),a=n.attr("aria-labelledby");t("#"+a).attr(i.ariaAttr.showTitle),n.attr(i.ariaAttr.showPanel),e.parent(".column").addClass("open")}})},a.prototype.keydown=function(e){var i=this,n=t(e.target),a="";if(n.parent(".accordion").length)switch(e.which){case 13:case 32:e.preventDefault(),i.handleToggle(n);break;case 38:(a=n.prevAll("dt:first"))&&(e.preventDefault(),a.focus());break;case 40:(a=n.nextAll("dt:first"))&&(e.preventDefault(),a.focus());break;case 27:n.blur()}},IUComm.Accordion=a,IUComm.addInitalisation("skirt-accordion",function(){var e=arguments[0],i=new IUComm.Accordion(t(".skirt-nav"),1,e);enquire.register("screen and (max-width: 40.065em)",{match:function(){i.setup()},unmatch:function(){i.destroy()},setup:function(){},deferSetup:!0,destroy:function(){}})}),IUComm.UIModule({module:"skirt-accordion",settings:{needsMarkup:!0},init:function(){IUComm.initialize("skirt-accordion",this.settings)}})}(jQuery,window,window.document);
 /*!

/*!
 * IU Comm Parallax
 */
(function ($, window, document, undefined ) {

    'use strict';

     function Parallax($el, id, settings) {
        IUComm.debug('Module: Initialize Parallax', $el, id);
        this.$el = $el;
        this.settings = settings;
        this.id = id;
        this.duration;

        if ($el.hasClass('banner') ) {
            this.banner = true;
        }

        this.setup();
        this.bindResize();
        this.initParallax();
        // console.log(this);
    }

    // Handle Setup
    Parallax.prototype.setup = function() {
        var scope = this;

        var $el = scope.$el,
            $imgDiv = $el.find('.bg-image-cover');

        scope.$imgDiv = $imgDiv;

        var sceneOptions = {
            triggerElement: $el[0],
            triggerHook: "onEnter"
        };

        if (scope.banner) {
            sceneOptions.triggerHook = "onLeave";
            sceneOptions.triggerElement = $("body")[0];
        }

        scope.controller = new ScrollMagic.Controller({
            globalSceneOptions: sceneOptions
        });

        scope.scene  = new ScrollMagic.Scene();
    };

    // Handle resize functions
    Parallax.prototype.bindResize = function() {
        var scope = this;

        $(window).resize(function() {

            // Set Height for elements
            var parallaxHeight = Math.max($(window).height() * scope.settings.viewportHeight, 200) | 0;
            scope.$el.not('.banner').height( parallaxHeight );

            scope.$imgDiv.height( scope.$el.outerHeight() * 1.65);

            // Set duration
            scope.updateDuration();

            // Refresh positions
            scope.scene.refresh();

        }).trigger('resize');
    }

    Parallax.prototype.updateDuration = function() {
        var scope = this;
        var $win = $(window);
        var duration = $win.height() + scope.$el.outerHeight();

        // Store this for the initParallax method
        scope.duration = duration;

        scope.scene.duration( duration );
    };

    Parallax.prototype.initParallax = function() {
        var scope = this;

        var tweenOptions = {
            enter: {y: "-60%"},
            leave: {y: "25%", ease: Linear.easeNone}
        };

        if (scope.banner) {
            tweenOptions = {
                enter: {y: "-20%"},
                leave: {y: "100%", ease: Linear.easeNone}
            };
        }

        var tween = new TweenMax.fromTo(
            scope.$imgDiv,
            scope.duration,
            tweenOptions.enter,
            tweenOptions.leave
        );

        // build scene
        scope.scene.setTween(tween);
        // scope.scene.addIndicators();
        scope.scene.addTo(scope.controller);
    }

    // add initialisation
    IUComm.addInitalisation('parallax', function() {

        var settings = arguments[0];

        if ( $('.parallax').length) {

            /**
             * Bail if we're on mobile
             */
            if (Modernizr.iumobile) {
                var setHeight = function() {
                    var parallaxHeight = Math.max($(window).height() * settings.viewportHeight, 200) | 0;
                    $(this).height( parallaxHeight );
                }

                $(window).resize( function() {
                    $('.parallax').not('.banner').each( setHeight );
                }).trigger('resize');

                return;
            }

            /**
             * Else - fetch scripts and run this noise
             */
            $.getScript(settings.assetPaths.parallaxJs)
             .done(function() {
                $('.parallax').each(function(id) {
                    var $this = $(this);

                    if ($this.data('isParallax')) {
                        return true;
                    }
                    // mark element as initialized
                    $this.data('isParallax', true);

                    new Parallax($this, id, settings);
                });
             })
             .fail(function() {});
        }
    });

    // Register UI module
    IUComm.UIModule({
        module: 'parallax',
        settings: {
            assetPaths: {
                parallaxJs: '//assets.iu.edu/libs/parallax/scrollmagic.js'
            },
            viewportHeight: 0.4,
            speed: 0.25
        },
        init: function() {
            IUComm.initialize('parallax', this.settings);
        }

    });

})( jQuery, window, window.document );
/*!
 * The College
 */
(function (window, document, $, undefined) {

    $(document).ready(function() {

        var IUComm = window.IUComm || {};

        // Smooth Scroll (from http://css-tricks.com/snippets/jquery/smooth-scrolling/)
        IUComm.addHelper('accordionScroll', function() {

            var scope = this;

            if (window.location.pathname.indexOf('major-guides') === "-1") return;

            scope.debug('Helper: Major Guides Accordion smooth scroll');

            $('.accordion').on('iucomm.accordion.closed', function() {
                var target = $(this).find('.open');

                if (target.length) {
                    var offsetForNav = (IUComm.settings.bigNav) ? 68 : 55;
                    $('html, body').animate({
                        scrollTop: target.offset().top - offsetForNav // accounts for sticky nav or branding bar
                    });
                }
            });
        });

        // PDFs in new tab
        IUComm.addHelper('pdfOpen', function() {
            var scope = this;

            scope.debug('Helper: Open PDFs in new window');

            $("[href$='.pdf']").on('click', function(e) {
                e.preventDefault();
                window.open(this.href);
            });
        });

        /* Delete modules if necessary (prevents them from auto-initializing) */
        // delete IUComm.uiModules['accordion'];

        /*
         * Initialize global IUComm & its modules
         * Custom settings can be passsed here
         */
        IUComm.init && IUComm.init( {
            debug: true,
            accordion: {
                needsMarkup: true
            },
            'form-filter': {
                'handlePageLoad': true
            }
        } );

        // Local Stuff for dev
        $("#nav-main .show-on-sticky.search").prev('li').addClass('last');

        // Open the first accordion in a form
        $("form .accordion dt:first-of-type").click();

        function maxWidth(items) {
            // Get an array of all element heights
            var elementWidths = items.map(function() {
                return this.offsetWidth;
            }).get();

            // Math.max takes a variable number of arguments
            // `apply` is equivalent to passing each height as an argument
            return Math.max.apply(null, elementWidths);
        }

        // Align DL titles - need to handle on resize
        $("dl.align-titles").each(function() {
            var $titles = $(this).find('> dt');
            var $data = $(this).find('> dd');

            var widest = maxWidth($titles);

            $titles.css({'width': (widest + 10) + 'px'});
            $data.css({'margin-left': (widest + 10) + 'px'});
        });

        // Word pair animations
        function getPosition() {
            return $(window).scrollTop();
        }

        function getViewportHeight() {
            return $(window).outerHeight();
        }

        function triggerPoint() {
            return getViewportHeight()/1.5;
        }

        // Clean this up so it doesn't fire 1000000 times
        function checkScroll(els) {

            var scrollPos = getPosition();
            var triggerDelay = triggerPoint();

            $.each(els, function(idx, el) {
                var $el = $(el);
                // if (idx === 1) {
                //     console.log(triggerDelay, scrollPos, $el.offset().top);
                // }

                // Trigger animation if top of element is equal to trigger point
                if ($el.offset().top - triggerDelay < scrollPos) {
                    $el.addClass('animate');
                } else {
                    $el.removeClass('animate');
                }
            });
        }

        $body = $('body');
        $wordPairs = $('.word-pairs');
        $groups = $('.manifesto .group');
        $staggers = $('.stagger-in li');

        $(window).on('scroll', function() {
            checkScroll($wordPairs);
        });

        if ($(".manifesto").length) {
            $(window).on('scroll', function() {
                checkScroll($groups);
            });
        }

        if ($(".stagger-in").length) {
            $(window).on('scroll', function() {
                checkScroll($staggers);
            });
        }

        // Handle plus conversion
        var convertThese = $('.feature, .panel, blockquote, .callout');
        convertThese.each(function(idx, el) {
            var $el = $(el);

            if ($el.find('.ignore-plus').length) return;

            var re = /\s+(\&|&amp\;)\s+/;
            var str = $el.html();
            var newstr = (typeof str !== undefined) ? str.replace(re, ' <span class="plus">$1</span> ') : '';

            $el.html(newstr);
        });
    });

    /* Image Loop */

    $(document).ready(function() {

        var $fadeHeader = $(".fade-header");
        var $pauseControl = $(".icon-pause");
        var $playControl = $(".icon-play");

        $(window).on('load resize', IUComm.utils.throttle(function (e) {

            function heightSet() {
                if ($fadeHeader.length) {

                    var $headerHeight = $(".fade-header img").height();

                    $(".banner.image").height($headerHeight);
                }
            }

            heightSet();

        }, 250));

        $(window).on('load', function() {
            function addControls() {
                if ($fadeHeader.length) {
                    $fadeHeader.after('<div id="play"><div class="row pad"><a class="icon-pause" href="#">Pause</a></div></div>');
                }
            }

            addControls();
        });

        $(function(){

            var faderPlaying = true;

            /* Simplest jQuery Slideshow
             * Jonathan Snook: snook.ca
             * http://snook.ca/archives/javascript/simplest-jquery-slideshow
             */

            $('.fade-header img:gt(0)').hide();
            setInterval(function() {

                // If fader is set to true
                if (faderPlaying) {
                    // Start fader
                    $('.fade-header :first-child').fadeOut(3000)
                        .next('img').fadeIn(3000)
                        .end().appendTo('.fade-header');
                }
            }, 5000);

            $(".fade-header-container").on("click", ".icon-pause, .icon-play", function(event) {
                event.preventDefault();

                // Add/remove classes to toggle correct player controls icon
                if (faderPlaying === false) {
                    $(this).removeClass("icon-play");
                    $(this).addClass("icon-pause");
                } else {
                    $(this).removeClass("icon-pause");
                    $(this).addClass("icon-play");
                }

                // Toggle fader playing status
                faderPlaying = !faderPlaying;
            });
        });
    });

})(window, window.document, jQuery);