/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/event.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


(function (J, w, doc) {

    J.add('event', {
        KEY_BACKSPACE:8,
        KEY_TAB:9,
        KEY_RETURN:13,
        KEY_ESC:27,
        KEY_LEFT:37,
        KEY_UP:38,
        KEY_RIGHT:39,
        KEY_DOWN:40,
        KEY_DELETE:46,
        KEY_HOME:36,
        KEY_END:35,
        KEY_PAGEUP:33,
        KEY_PAGEDOWN:34,
        KEY_INSERT:45,
        DA:'dataavailable',
        LO:'losecapture',
        ME:'mouseenter',
        ML:'mouseleave',

        CACHE:[],

        fix:getResponder,
        fixName:fixEventName,
        getKeyCode:function (event) {
            return event.which || event.keyCode;
        }

    });

    var E = J.event, ME = E.ME, ML = E.ML, U= 'unload', docEl = doc.documentElement, isIE = /msie (\d+\.\d+)/i.test(navigator.userAgent);
    E.MMES = 'on'+ ME in docEl && 'on'+ ML in docEl;

    function extend(event, element, data, preventDefault, stopPropagation) {
        if (!event) return false;
        var d = 'preventDefault',p = 'stopPropagation';
        J.mix(event, {
                currentTarget:event.currentTarget || element,
                // 取消事件的默认行为
                preventDefault:event[d] || function () {
                    event.returnValue = false;
                },
                // 阻止冒泡
                stopPropagation:event[p] || function () {
                    event.cancelBubble = true;
                },

                stop:function () {
                    event[d]();
                    event[p]()
                }
            }

        );

        if (data) event.data = data;

        if (preventDefault) event[d]();
        if (stopPropagation) event[p]();

        return event;
    }

    function getResponder(element, type, handler, data, preventDefault, stopPropagation) {
        var responder;

        return function (event) {
            if (type.indexOf(':') > -1 && event && event.eventName !== type) return false;
            if (!E.MMES && (type === ME || type === ML)) {
                var a = event.currentTarget || element, b = event.relatedTarget;
                //火狐支持compareDocumentPosition(), 其他浏览器支持 contains();
                if (!(a != b && !(a.contains ? a.contains(b) : !!(a.compareDocumentPosition(b) & 16) ))) return false;
            }
            extend(event, element, data, preventDefault, stopPropagation);
            handler.call(element, event);
        };
    }

    function fixEventName(e) {
        var translations = { mouseenter:"mouseover", mouseleave:"mouseout" };
        return (translations[e] || e);
    }

    // 释放内存，防止造成内存泄漏
    if (isIE)
        w.attachEvent('on'+U, function(){
            var e, E = J.event, a = E.CACHE, l = a.length, dE = 'detachEvent';
            while (l--) {
                e = a[l];
                e.e[dE]('on' + e.t, e.r, false);
                if (e.t.indexOf(':') > -1) {
                    e.e[dE]("on"+ E.DA, e.r);
                    e.e[dE]("on"+ E.LO, e.r);
                }
                a.splice(l, 1);
            }
        });
    if (!isIE)
        w.addEventListener(U, function () {}, false);

})(J, window, document);