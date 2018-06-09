/*!
 * beagle v1.4.0-prerelease (https://foxythemes.net)
 * Copyright 2018 Foxy Themes all rights reserved 
 */

var App = function () {
    "use strict";
    var e = {
        assetsPath: "assets",
        imgPath: "img",
        jsPath: "js",
        libsPath: "lib",
        leftSidebarSlideSpeed: 200,
        leftSidebarToggleSpeed: 300,
        enableSwipe: !0,
        swipeTreshold: 100,
        scrollTop: !0,
        openRightSidebarClass: "open-right-sidebar",
        openLeftSidebarClass: "open-left-sidebar",
        offCanvasLeftSidebarClass: "be-offcanvas-menu",
        toggleLeftSidebarButton: $(".be-toggle-left-sidebar"),
        closeRsOnClickOutside: !0,
        removeLeftSidebarClass: "be-nosidebar-left",
        collapsibleSidebarClass: "be-collapsible-sidebar",
        collapsibleSidebarCollapsedClass: "be-collapsible-sidebar-collapsed",
        openLeftSidebarOnClick: !0,
        transitionClass: "be-animate",
        openSidebarDelay: 400
    }, t = {}, i = $("body"), a = $(".be-wrapper"), o = $(".be-left-sidebar"), n = $(".be-right-sidebar"), r = !1;

    function l(e) {
        var t = $("<div>", {class: e}).appendTo("body"), i = t.css("background-color");
        return t.remove(), i
    }

    function s() {
        var t = $(".be-scroller", n);

        function a() {
            i.removeClass(e.openRightSidebarClass).addClass(e.transitionClass), c()
        }

        n.length > 0 && ($(".be-toggle-right-sidebar").on("click", function (t) {
            r && i.hasClass(e.openRightSidebarClass) ? a() : r || (i.addClass(e.openRightSidebarClass + " " + e.transitionClass), r = !0), t.preventDefault()
        }), $(document).on("mousedown touchstart", function (t) {
            !$(t.target).closest(n).length && i.hasClass(e.openRightSidebarClass) && (e.closeRsOnClickOutside || $.isSm()) && a()
        })), t.perfectScrollbar(), $(window).resize(function () {
            h(function () {
                t.perfectScrollbar("update")
            }, 500, "be_rs_update_scroller")
        }), $('a[data-toggle="tab"]', n).on("shown.bs.tab", function (e) {
            var t = $(e.target.getAttribute("href")).find(".be-scroller");
            t.length && t.perfectScrollbar("update")
        })
    }

    function c() {
        r = !0, setTimeout(function () {
            r = !1
        }, e.openSidebarDelay)
    }

    function d() {
        var e = $(".be-right-sidebar .tab-chat"), t = $(".chat-contacts", e), i = $(".chat-window", e), a = $(".chat-messages", i), o = $(".content ul", a), n = $(".be-scroller", a), r = $(".chat-input", i), l = $("input", r), s = $(".send-msg", r);

        function c(e, t) {
            var i = $('<li class="' + (t ? "self" : "friend") + '"></li>');
            "" != e && ($('<div class="msg">' + e + "</div>").appendTo(i), i.appendTo(o), n.stop().animate({scrollTop: n.prop("scrollHeight")}, 900, "swing"), n.perfectScrollbar("update"))
        }

        $(".user a", t).on("click", function (t) {
            e.hasClass("chat-opened") || e.addClass("chat-opened"), t.preventDefault()
        }), $(".title .return", i).on("click", function (t) {
            e.hasClass("chat-opened") && e.removeClass("chat-opened"), p()
        }), l.keypress(function (e) {
            var t = e.keyCode ? e.keyCode : e.which, i = $(this).val();
            "13" == t && (c(i, !0), $(this).val("")), e.stopPropagation()
        }), s.on("click", function () {
            c(l.val(), !0), l.val("")
        })
    }

    function p() {
        $(".be-scroller").perfectScrollbar()
    }

    var u, h = (u = {}, function (e, t, i) {
        i || (i = "x1x2x3x4"), u[i] && clearTimeout(u[i]), u[i] = setTimeout(e, t)
    });
    return {
        conf: e, color: t, init: function (u) {
            var f;
            $.extend(e, u), FastClick.attach(document.body), function () {
                var t, n, l = $(".sidebar-elements > li > a", o), s = $(".sidebar-elements li a", o), d = $(".left-sidebar-scroll", o), p = $(".left-sidebar-toggle", o), u = !!e.openLeftSidebarOnClick;

                function f() {
                    a.hasClass("be-fixed-sidebar") && d.perfectScrollbar("update")
                }

                function g() {
                    return a.hasClass(e.collapsibleSidebarCollapsedClass)
                }

                function m(t, i) {
                    var a = $(i.currentTarget), n = $(t).parent(), r = $("li.open", n), l = !a.closest(o).length, s = e.leftSidebarSlideSpeed, c = a.parents().eq(1).hasClass("sidebar-elements");
                    !$.isSm() && g() && (c || l) ? (n.removeClass("open"), t.removeClass("visible"), r.removeClass("open").removeAttr("style")) : t.slideUp({
                        duration: s,
                        complete: function () {
                            n.removeClass("open"), $(this).removeAttr("style"), r.removeClass("open").removeAttr("style"), f()
                        }
                    })
                }

                function b(t, i) {
                    var a = $(t), o = $(a).parent(), n = $(a).next(), r = e.leftSidebarSlideSpeed, l = $(i.currentTarget).parents().eq(1).hasClass("sidebar-elements"), s = o.siblings(".open");
                    if (s && m($("> ul", s), i), !$.isSm() && g() && l) {
                        var c = o.find(".be-scroller");
                        o.addClass("open"), n.addClass("visible"), c.perfectScrollbar("destroy"), c.perfectScrollbar()
                    } else n.slideDown({
                        duration: r, complete: function () {
                            o.addClass("open"), $(this).removeAttr("style"), f()
                        }
                    })
                }

                a.hasClass(e.collapsibleSidebarClass) && (n = void 0 !== t ? t : $(".sidebar-elements > li", o), $.each(n, function () {
                    var e = $(this).find("> a span").html(), t = $(this).find("> ul"), i = $("> li", t);
                    e = $('<li class="title">' + e + "</li>");
                    var a = $('<li class="nav-items"><div class="be-scroller"><div class="content"><ul></ul></div></div></li>');
                    t.find("> li.title").length || (t.prepend(e), i.appendTo(a.find(".content ul")), a.appendTo(t))
                }), $(".be-toggle-left-sidebar").on("click", function () {
                    a.hasClass(e.collapsibleSidebarCollapsedClass) ? (a.removeClass(e.collapsibleSidebarCollapsedClass), $("li.open", o).removeClass("open"), $("li.active", o).parents(".parent").addClass("active open"), $(".be-scroller", o).perfectScrollbar("destroy")) : (a.addClass(e.collapsibleSidebarCollapsedClass), $("li.active", o).parents(".parent").removeClass("open"), $("li.open", o).removeClass("open"))
                }), u || (l.on("mouseover", function (e) {
                    g() && b(this, e)
                }), l.on("touchstart", function (e) {
                    var t = $(this), i = t.parent(), a = t.next();
                    g() && !$.isSm() && (i.hasClass("open") ? m(a, e) : b(this, e), $(this).next().is("ul") && e.preventDefault())
                }), l.on("mouseleave", function (e) {
                    var t = $(this), i = t.parent(), a = i.find("> ul");
                    !$.isSm() && g() && (a.length > 0 ? setTimeout(function () {
                        a.is(":hover") ? a.on("mouseleave", function () {
                            setTimeout(function () {
                                t.is(":hover") || (m(a, e), a.off("mouseleave"))
                            }, 300)
                        }) : m(a, e)
                    }, 300) : i.removeClass("open"))
                })), $(document).on("mousedown touchstart", function (e) {
                    $(e.target).closest(o).length || $.isSm() || m($("ul.visible", o), e)
                })), s.on("click", function (e) {
                    var t = $(this), i = t.parent(), a = t.next();
                    t.parents().eq(1).hasClass("sidebar-elements"), i.siblings(".open"), i.hasClass("open") ? m(a, e) : b(this, e), t.next().is("ul") && e.preventDefault()
                }), a.hasClass(e.collapsibleSidebarCollapsedClass) ? $("li.active", o).parents(".parent").addClass("active") : $("li.active", o).parents(".parent").addClass("active open"), a.hasClass("be-fixed-sidebar") && ($.isSm() && !a.hasClass(e.offCanvasLeftSidebarClass) || d.perfectScrollbar(), $(window).resize(function () {
                    h(function () {
                        $.isSm() && !a.hasClass(e.offCanvasLeftSidebarClass) ? d.perfectScrollbar("destroy") : d.hasClass("ps-container") ? d.perfectScrollbar("update") : d.perfectScrollbar()
                    }, 500, "be_update_scroller")
                })), p.on("click", function (t) {
                    var i = $(this).next(".left-sidebar-spacer");
                    $(this).toggleClass("open"), i.slideToggle(e.leftSidebarToggleSpeed, function () {
                        $(this).removeAttr("style").toggleClass("open")
                    })
                }), a.hasClass(e.offCanvasLeftSidebarClass) && (e.toggleLeftSidebarButton.on("click", function (t) {
                    r && i.hasClass(e.openLeftSidebarClass) ? (i.removeClass(e.openLeftSidebarClass), c()) : (i.addClass(e.openLeftSidebarClass + " " + e.transitionClass), r = !0), t.preventDefault()
                }), $(document).on("mousedown touchstart", function (t) {
                    $(t.target).closest(o).length || $(t.target).closest(e.toggleLeftSidebarButton).length || !i.hasClass(e.openLeftSidebarClass) || (i.removeClass(e.openLeftSidebarClass), c())
                }))
            }(), s(), d(), e.enableSwipe && a.swipe({
                allowPageScroll: "vertical",
                preventDefaultEvents: !1,
                fallbackToMouseEvents: !1,
                swipeLeft: function (t) {
                    !r && n.length > 0 && (i.addClass(e.openRightSidebarClass + " " + e.transitionClass), r = !0)
                },
                threshold: e.swipeTreshold
            }), e.scrollTop && ((f = $('<div class="be-scroll-top"></div>')).appendTo("body"), $(window).on("scroll", function () {
                $(this).scrollTop() > 220 ? f.fadeIn(500) : f.fadeOut(500)
            }), f.on("touchstart mouseup", function (e) {
                $("html, body").animate({scrollTop: 0}, 500), e.preventDefault()
            })), t.primary = l("clr-primary"), t.success = l("clr-success"), t.warning = l("clr-warning"), t.danger = l("clr-danger"), t.grey = l("clr-grey"), $(".be-connections").on("click", function (e) {
                e.stopPropagation()
            }), p(), $(".dropdown").on("shown.bs.dropdown", function () {
                $(".be-scroller").perfectScrollbar("update")
            }), $(".nav-tabs").on("shown.bs.tab", function (e) {
                $(".be-scroller").perfectScrollbar("update")
            }), $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), $(".modal").on("show.bs.modal", function () {
                $("html").addClass("be-modal-open")
            }), $(".modal").on("hidden.bs.modal", function () {
                $("html").removeClass("be-modal-open")
            })
        }
    }
}();
function FastClick(e, t) {
    "use strict";
    var i;
    if (t = t || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = t.touchBoundary || 10, this.layer = e, this.tapDelay = t.tapDelay || 200, !FastClick.notNeeded(e)) {
        for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = 0, n = a.length; o < n; o++)this[a[o]] = r(this[a[o]], this);
        deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, i, a) {
            var o = Node.prototype.removeEventListener;
            "click" === t ? o.call(e, t, i.hijacked || i, a) : o.call(e, t, i, a)
        }, e.addEventListener = function (t, i, a) {
            var o = Node.prototype.addEventListener;
            "click" === t ? o.call(e, t, i.hijacked || (i.hijacked = function (e) {
                    e.propagationStopped || i(e)
                }), a) : o.call(e, t, i, a)
        }), "function" == typeof e.onclick && (i = e.onclick, e.addEventListener("click", function (e) {
            i(e)
        }, !1), e.onclick = null)
    }
    function r(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function (e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case"button":
        case"select":
        case"textarea":
            if (e.disabled)return !0;
            break;
        case"input":
            if (deviceIsIOS && "file" === e.type || e.disabled)return !0;
            break;
        case"label":
        case"video":
            return !0
    }
    return /\bneedsclick\b/.test(e.className)
}, FastClick.prototype.needsFocus = function (e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case"textarea":
            return !0;
        case"select":
            return !deviceIsAndroid;
        case"input":
            switch (e.type) {
                case"button":
                case"checkbox":
                case"file":
                case"image":
                case"radio":
                case"submit":
                    return !1
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
    }
}, FastClick.prototype.sendClick = function (e, t) {
    "use strict";
    var i, a, o, n;
    document.activeElement && document.activeElement !== e && document.activeElement.blur(), n = t.changedTouches[0], (o = document.createEvent("MouseEvents")).initMouseEvent("mousedown", !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), o.forwardedTouchEvent = !0, e.dispatchEvent(o), (a = document.createEvent("MouseEvents")).initMouseEvent("mouseup", !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), a.forwardedTouchEvent = !0, e.dispatchEvent(a), (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
}, FastClick.prototype.determineEventType = function (e) {
    "use strict";
    return deviceIsAndroid && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
}, FastClick.prototype.focus = function (e) {
    "use strict";
    var t;
    deviceIsIOS && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
}, FastClick.prototype.updateScrollParent = function (e) {
    "use strict";
    var t, i;
    if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
        i = e;
        do {
            if (i.scrollHeight > i.offsetHeight) {
                t = i, e.fastClickScrollParent = i;
                break
            }
            i = i.parentElement
        } while (i)
    }
    t && (t.fastClickLastScrollTop = t.scrollTop)
}, FastClick.prototype.getTargetElementFromEventTarget = function (e) {
    "use strict";
    return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
}, FastClick.prototype.onTouchStart = function (e) {
    "use strict";
    var t, i, a;
    if (e.targetTouches.length > 1)return !0;
    if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], deviceIsIOS) {
        if ((a = window.getSelection()).rangeCount && !a.isCollapsed)return !0;
        if (!deviceIsIOS4) {
            if (i.identifier && i.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
            this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
}, FastClick.prototype.touchHasMoved = function (e) {
    "use strict";
    var t = e.changedTouches[0], i = this.touchBoundary;
    return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i
}, FastClick.prototype.onTouchMove = function (e) {
    "use strict";
    return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
}, FastClick.prototype.findControl = function (e) {
    "use strict";
    return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
}, FastClick.prototype.onTouchEnd = function (e) {
    "use strict";
    var t, i, a, o, n, r = this.targetElement;
    if (!this.trackingClick)return !0;
    if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, i = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (n = e.changedTouches[0], (r = document.elementFromPoint(n.pageX - window.pageXOffset, n.pageY - window.pageYOffset) || r).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (a = r.tagName.toLowerCase())) {
        if (t = this.findControl(r)) {
            if (this.focus(r), deviceIsAndroid)return !1;
            r = t
        }
    } else if (this.needsFocus(r))return e.timeStamp - i > 100 || deviceIsIOS && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, e), deviceIsIOS && "select" === a || (this.targetElement = null, e.preventDefault()), !1);
    return !(!deviceIsIOS || deviceIsIOS4 || !(o = r.fastClickScrollParent) || o.fastClickLastScrollTop === o.scrollTop) || (this.needsClick(r) || (e.preventDefault(), this.sendClick(r, e)), !1)
}, FastClick.prototype.onTouchCancel = function () {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
}, FastClick.prototype.onMouse = function (e) {
    "use strict";
    return !(this.targetElement && !e.forwardedTouchEvent && e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) && (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), 1))
}, FastClick.prototype.onClick = function (e) {
    "use strict";
    var t;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
}, FastClick.prototype.destroy = function () {
    "use strict";
    var e = this.layer;
    deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
}, FastClick.notNeeded = function (e) {
    "use strict";
    var t, i, a;
    if (void 0 === window.ontouchstart)return !0;
    if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!deviceIsAndroid)return !0;
        if (t = document.querySelector("meta[name=viewport]")) {
            if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
            if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
    }
    if (deviceIsBlackBerry10 && (a = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && a[2] >= 3 && (t = document.querySelector("meta[name=viewport]"))) {
        if (-1 !== t.content.indexOf("user-scalable=no"))return !0;
        if (document.documentElement.scrollWidth <= window.outerWidth)return !0
    }
    return "none" === e.style.msTouchAction
}, FastClick.attach = function (e, t) {
    "use strict";
    return new FastClick(e, t)
}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
    "use strict";
    return FastClick
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick, function (e) {
    function t(i, a) {
        if (a = a || {}, (i = i || "") instanceof t)return i;
        if (!(this instanceof t))return new t(i, a);
        var o, n, r, l, s, c, d, p, u, h, f, g = (n = {
            r: 0,
            g: 0,
            b: 0
        }, r = 1, l = null, s = null, c = null, d = !1, p = !1, "string" == typeof(o = i) && (o = function (e) {
            e = e.replace(_, "").replace(E, "").toLowerCase();
            var t, i = !1;
            if (H[e])e = H[e], i = !0; else if ("transparent" == e)return {r: 0, g: 0, b: 0, a: 0, format: "name"};
            return (t = N.rgb.exec(e)) ? {r: t[1], g: t[2], b: t[3]} : (t = N.rgba.exec(e)) ? {
                r: t[1],
                g: t[2],
                b: t[3],
                a: t[4]
            } : (t = N.hsl.exec(e)) ? {h: t[1], s: t[2], l: t[3]} : (t = N.hsla.exec(e)) ? {
                h: t[1],
                s: t[2],
                l: t[3],
                a: t[4]
            } : (t = N.hsv.exec(e)) ? {h: t[1], s: t[2], v: t[3]} : (t = N.hsva.exec(e)) ? {
                h: t[1],
                s: t[2],
                v: t[3],
                a: t[4]
            } : (t = N.hex8.exec(e)) ? {
                r: C(t[1]),
                g: C(t[2]),
                b: C(t[3]),
                a: x(t[4]),
                format: i ? "name" : "hex8"
            } : (t = N.hex6.exec(e)) ? {
                r: C(t[1]),
                g: C(t[2]),
                b: C(t[3]),
                format: i ? "name" : "hex"
            } : (t = N.hex4.exec(e)) ? {
                r: C(t[1] + "" + t[1]),
                g: C(t[2] + "" + t[2]),
                b: C(t[3] + "" + t[3]),
                a: x(t[4] + "" + t[4]),
                format: i ? "name" : "hex8"
            } : !!(t = N.hex3.exec(e)) && {
                r: C(t[1] + "" + t[1]),
                g: C(t[2] + "" + t[2]),
                b: C(t[3] + "" + t[3]),
                format: i ? "name" : "hex"
            }
        }(o)), "object" == typeof o && (T(o.r) && T(o.g) && T(o.b) ? (u = o.r, h = o.g, f = o.b, n = {
            r: 255 * y(u, 255),
            g: 255 * y(h, 255),
            b: 255 * y(f, 255)
        }, d = !0, p = "%" === String(o.r).substr(-1) ? "prgb" : "rgb") : T(o.h) && T(o.s) && T(o.v) ? (l = S(o.s), s = S(o.v), n = function (t, i, a) {
            t = 6 * y(t, 360), i = y(i, 100), a = y(a, 100);
            var o = e.floor(t), n = t - o, r = a * (1 - i), l = a * (1 - n * i), s = a * (1 - (1 - n) * i), c = o % 6;
            return {r: 255 * [a, l, r, r, s, a][c], g: 255 * [s, a, a, l, r, r][c], b: 255 * [r, r, s, a, a, l][c]}
        }(o.h, l, s), d = !0, p = "hsv") : T(o.h) && T(o.s) && T(o.l) && (l = S(o.s), c = S(o.l), n = function (e, t, i) {
            function a(e, t, i) {
                return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? e + 6 * (t - e) * i : .5 > i ? t : 2 / 3 > i ? e + 6 * (t - e) * (2 / 3 - i) : e
            }

            var o, n, r;
            if (e = y(e, 360), t = y(t, 100), i = y(i, 100), 0 === t)o = n = r = i; else {
                var l = .5 > i ? i * (1 + t) : i + t - i * t, s = 2 * i - l;
                o = a(s, l, e + 1 / 3), n = a(s, l, e), r = a(s, l, e - 1 / 3)
            }
            return {r: 255 * o, g: 255 * n, b: 255 * r}
        }(o.h, l, c), d = !0, p = "hsl"), o.hasOwnProperty("a") && (r = o.a)), r = k(r), {
            ok: d,
            format: o.format || p,
            r: L(255, P(n.r, 0)),
            g: L(255, P(n.g, 0)),
            b: L(255, P(n.b, 0)),
            a: r
        });
        this._originalInput = i, this._r = g.r, this._g = g.g, this._b = g.b, this._a = g.a, this._roundA = F(100 * this._a) / 100, this._format = a.format || g.format, this._gradientType = a.gradientType, this._r < 1 && (this._r = F(this._r)), this._g < 1 && (this._g = F(this._g)), this._b < 1 && (this._b = F(this._b)), this._ok = g.ok, this._tc_id = M++
    }

    function i(e, t, i) {
        e = y(e, 255), t = y(t, 255), i = y(i, 255);
        var a, o, n = P(e, t, i), r = L(e, t, i), l = (n + r) / 2;
        if (n == r)a = o = 0; else {
            var s = n - r;
            switch (o = l > .5 ? s / (2 - n - r) : s / (n + r), n) {
                case e:
                    a = (t - i) / s + (i > t ? 6 : 0);
                    break;
                case t:
                    a = (i - e) / s + 2;
                    break;
                case i:
                    a = (e - t) / s + 4
            }
            a /= 6
        }
        return {h: a, s: o, l: l}
    }

    function a(e, t, i) {
        e = y(e, 255), t = y(t, 255), i = y(i, 255);
        var a, o, n = P(e, t, i), r = L(e, t, i), l = n, s = n - r;
        if (o = 0 === n ? 0 : s / n, n == r)a = 0; else {
            switch (n) {
                case e:
                    a = (t - i) / s + (i > t ? 6 : 0);
                    break;
                case t:
                    a = (i - e) / s + 2;
                    break;
                case i:
                    a = (e - t) / s + 4
            }
            a /= 6
        }
        return {h: a, s: o, v: l}
    }

    function o(e, t, i, a) {
        var o = [$(F(e).toString(16)), $(F(t).toString(16)), $(F(i).toString(16))];
        return a && o[0].charAt(0) == o[0].charAt(1) && o[1].charAt(0) == o[1].charAt(1) && o[2].charAt(0) == o[2].charAt(1) ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0) : o.join("")
    }

    function n(e, t, i, a) {
        return [$(A(a)), $(F(e).toString(16)), $(F(t).toString(16)), $(F(i).toString(16))].join("")
    }

    function r(e, i) {
        i = 0 === i ? 0 : i || 10;
        var a = t(e).toHsl();
        return a.s -= i / 100, a.s = w(a.s), t(a)
    }

    function l(e, i) {
        i = 0 === i ? 0 : i || 10;
        var a = t(e).toHsl();
        return a.s += i / 100, a.s = w(a.s), t(a)
    }

    function s(e) {
        return t(e).desaturate(100)
    }

    function c(e, i) {
        i = 0 === i ? 0 : i || 10;
        var a = t(e).toHsl();
        return a.l += i / 100, a.l = w(a.l), t(a)
    }

    function d(e, i) {
        i = 0 === i ? 0 : i || 10;
        var a = t(e).toRgb();
        return a.r = P(0, L(255, a.r - F(-i / 100 * 255))), a.g = P(0, L(255, a.g - F(-i / 100 * 255))), a.b = P(0, L(255, a.b - F(-i / 100 * 255))), t(a)
    }

    function p(e, i) {
        i = 0 === i ? 0 : i || 10;
        var a = t(e).toHsl();
        return a.l -= i / 100, a.l = w(a.l), t(a)
    }

    function u(e, i) {
        var a = t(e).toHsl(), o = (a.h + i) % 360;
        return a.h = 0 > o ? 360 + o : o, t(a)
    }

    function h(e) {
        var i = t(e).toHsl();
        return i.h = (i.h + 180) % 360, t(i)
    }

    function f(e) {
        var i = t(e).toHsl(), a = i.h;
        return [t(e), t({h: (a + 120) % 360, s: i.s, l: i.l}), t({h: (a + 240) % 360, s: i.s, l: i.l})]
    }

    function g(e) {
        var i = t(e).toHsl(), a = i.h;
        return [t(e), t({h: (a + 90) % 360, s: i.s, l: i.l}), t({
            h: (a + 180) % 360,
            s: i.s,
            l: i.l
        }), t({h: (a + 270) % 360, s: i.s, l: i.l})]
    }

    function m(e) {
        var i = t(e).toHsl(), a = i.h;
        return [t(e), t({h: (a + 72) % 360, s: i.s, l: i.l}), t({h: (a + 216) % 360, s: i.s, l: i.l})]
    }

    function b(e, i, a) {
        i = i || 6, a = a || 30;
        var o = t(e).toHsl(), n = 360 / a, r = [t(e)];
        for (o.h = (o.h - (n * i >> 1) + 720) % 360; --i;)o.h = (o.h + n) % 360, r.push(t(o));
        return r
    }

    function v(e, i) {
        i = i || 6;
        for (var a = t(e).toHsv(), o = a.h, n = a.s, r = a.v, l = [], s = 1 / i; i--;)l.push(t({
            h: o,
            s: n,
            v: r
        })), r = (r + s) % 1;
        return l
    }

    function k(e) {
        return e = parseFloat(e), (isNaN(e) || 0 > e || e > 1) && (e = 1), e
    }

    function y(t, i) {
        var a;
        "string" == typeof(a = t) && -1 != a.indexOf(".") && 1 === parseFloat(a) && (t = "100%");
        var o, n = "string" == typeof(o = t) && -1 != o.indexOf("%");
        return t = L(i, P(0, parseFloat(t))), n && (t = parseInt(t * i, 10) / 100), e.abs(t - i) < 1e-6 ? 1 : t % i / parseFloat(i)
    }

    function w(e) {
        return L(1, P(0, e))
    }

    function C(e) {
        return parseInt(e, 16)
    }

    function $(e) {
        return 1 == e.length ? "0" + e : "" + e
    }

    function S(e) {
        return 1 >= e && (e = 100 * e + "%"), e
    }

    function A(t) {
        return e.round(255 * parseFloat(t)).toString(16)
    }

    function x(e) {
        return C(e) / 255
    }

    function T(e) {
        return !!N.CSS_UNIT.exec(e)
    }

    var _ = /^\s+/, E = /\s+$/, M = 0, F = e.round, L = e.min, P = e.max, I = e.random;
    t.prototype = {
        isDark: function () {
            return this.getBrightness() < 128
        }, isLight: function () {
            return !this.isDark()
        }, isValid: function () {
            return this._ok
        }, getOriginalInput: function () {
            return this._originalInput
        }, getFormat: function () {
            return this._format
        }, getAlpha: function () {
            return this._a
        }, getBrightness: function () {
            var e = this.toRgb();
            return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3
        }, getLuminance: function () {
            var t, i, a, o = this.toRgb();
            return t = o.r / 255, i = o.g / 255, a = o.b / 255, .2126 * (.03928 >= t ? t / 12.92 : e.pow((t + .055) / 1.055, 2.4)) + .7152 * (.03928 >= i ? i / 12.92 : e.pow((i + .055) / 1.055, 2.4)) + .0722 * (.03928 >= a ? a / 12.92 : e.pow((a + .055) / 1.055, 2.4))
        }, setAlpha: function (e) {
            return this._a = k(e), this._roundA = F(100 * this._a) / 100, this
        }, toHsv: function () {
            var e = a(this._r, this._g, this._b);
            return {h: 360 * e.h, s: e.s, v: e.v, a: this._a}
        }, toHsvString: function () {
            var e = a(this._r, this._g, this._b), t = F(360 * e.h), i = F(100 * e.s), o = F(100 * e.v);
            return 1 == this._a ? "hsv(" + t + ", " + i + "%, " + o + "%)" : "hsva(" + t + ", " + i + "%, " + o + "%, " + this._roundA + ")"
        }, toHsl: function () {
            var e = i(this._r, this._g, this._b);
            return {h: 360 * e.h, s: e.s, l: e.l, a: this._a}
        }, toHslString: function () {
            var e = i(this._r, this._g, this._b), t = F(360 * e.h), a = F(100 * e.s), o = F(100 * e.l);
            return 1 == this._a ? "hsl(" + t + ", " + a + "%, " + o + "%)" : "hsla(" + t + ", " + a + "%, " + o + "%, " + this._roundA + ")"
        }, toHex: function (e) {
            return o(this._r, this._g, this._b, e)
        }, toHexString: function (e) {
            return "#" + this.toHex(e)
        }, toHex8: function (e) {
            return t = this._r, i = this._g, a = this._b, o = this._a, n = e, r = [$(F(t).toString(16)), $(F(i).toString(16)), $(F(a).toString(16)), $(A(o))], n && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) && r[3].charAt(0) == r[3].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) + r[3].charAt(0) : r.join("");
            var t, i, a, o, n, r
        }, toHex8String: function (e) {
            return "#" + this.toHex8(e)
        }, toRgb: function () {
            return {r: F(this._r), g: F(this._g), b: F(this._b), a: this._a}
        }, toRgbString: function () {
            return 1 == this._a ? "rgb(" + F(this._r) + ", " + F(this._g) + ", " + F(this._b) + ")" : "rgba(" + F(this._r) + ", " + F(this._g) + ", " + F(this._b) + ", " + this._roundA + ")"
        }, toPercentageRgb: function () {
            return {
                r: F(100 * y(this._r, 255)) + "%",
                g: F(100 * y(this._g, 255)) + "%",
                b: F(100 * y(this._b, 255)) + "%",
                a: this._a
            }
        }, toPercentageRgbString: function () {
            return 1 == this._a ? "rgb(" + F(100 * y(this._r, 255)) + "%, " + F(100 * y(this._g, 255)) + "%, " + F(100 * y(this._b, 255)) + "%)" : "rgba(" + F(100 * y(this._r, 255)) + "%, " + F(100 * y(this._g, 255)) + "%, " + F(100 * y(this._b, 255)) + "%, " + this._roundA + ")"
        }, toName: function () {
            return 0 === this._a ? "transparent" : !(this._a < 1) && (B[o(this._r, this._g, this._b, !0)] || !1)
        }, toFilter: function (e) {
            var i = "#" + n(this._r, this._g, this._b, this._a), a = i, o = this._gradientType ? "GradientType = 1, " : "";
            if (e) {
                var r = t(e);
                a = "#" + n(r._r, r._g, r._b, r._a)
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + o + "startColorstr=" + i + ",endColorstr=" + a + ")"
        }, toString: function (e) {
            var t = !!e;
            e = e || this._format;
            var i = !1, a = this._a < 1 && this._a >= 0;
            return !t && a && ("hex" === e || "hex6" === e || "hex3" === e || "hex4" === e || "hex8" === e || "name" === e) ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (i = this.toRgbString()), "prgb" === e && (i = this.toPercentageRgbString()), ("hex" === e || "hex6" === e) && (i = this.toHexString()), "hex3" === e && (i = this.toHexString(!0)), "hex4" === e && (i = this.toHex8String(!0)), "hex8" === e && (i = this.toHex8String()), "name" === e && (i = this.toName()), "hsl" === e && (i = this.toHslString()), "hsv" === e && (i = this.toHsvString()), i || this.toHexString())
        }, clone: function () {
            return t(this.toString())
        }, _applyModification: function (e, t) {
            var i = e.apply(null, [this].concat([].slice.call(t)));
            return this._r = i._r, this._g = i._g, this._b = i._b, this.setAlpha(i._a), this
        }, lighten: function () {
            return this._applyModification(c, arguments)
        }, brighten: function () {
            return this._applyModification(d, arguments)
        }, darken: function () {
            return this._applyModification(p, arguments)
        }, desaturate: function () {
            return this._applyModification(r, arguments)
        }, saturate: function () {
            return this._applyModification(l, arguments)
        }, greyscale: function () {
            return this._applyModification(s, arguments)
        }, spin: function () {
            return this._applyModification(u, arguments)
        }, _applyCombination: function (e, t) {
            return e.apply(null, [this].concat([].slice.call(t)))
        }, analogous: function () {
            return this._applyCombination(b, arguments)
        }, complement: function () {
            return this._applyCombination(h, arguments)
        }, monochromatic: function () {
            return this._applyCombination(v, arguments)
        }, splitcomplement: function () {
            return this._applyCombination(m, arguments)
        }, triad: function () {
            return this._applyCombination(f, arguments)
        }, tetrad: function () {
            return this._applyCombination(g, arguments)
        }
    }, t.fromRatio = function (e, i) {
        if ("object" == typeof e) {
            var a = {};
            for (var o in e)e.hasOwnProperty(o) && (a[o] = "a" === o ? e[o] : S(e[o]));
            e = a
        }
        return t(e, i)
    }, t.equals = function (e, i) {
        return !(!e || !i) && t(e).toRgbString() == t(i).toRgbString()
    }, t.random = function () {
        return t.fromRatio({r: I(), g: I(), b: I()})
    }, t.mix = function (e, i, a) {
        a = 0 === a ? 0 : a || 50;
        var o = t(e).toRgb(), n = t(i).toRgb(), r = a / 100;
        return t({
            r: (n.r - o.r) * r + o.r,
            g: (n.g - o.g) * r + o.g,
            b: (n.b - o.b) * r + o.b,
            a: (n.a - o.a) * r + o.a
        })
    }, t.readability = function (i, a) {
        var o = t(i), n = t(a);
        return (e.max(o.getLuminance(), n.getLuminance()) + .05) / (e.min(o.getLuminance(), n.getLuminance()) + .05)
    }, t.isReadable = function (e, i, a) {
        var o, n, r, l, s, c = t.readability(e, i);
        switch (n = !1, "AA" !== (l = ((r = (r = a) || {
                level: "AA",
                size: "small"
            }).level || "AA").toUpperCase()) && "AAA" !== l && (l = "AA"), "small" !== (s = (r.size || "small").toLowerCase()) && "large" !== s && (s = "small"), (o = {
            level: l,
            size: s
        }).level + o.size) {
            case"AAsmall":
            case"AAAlarge":
                n = c >= 4.5;
                break;
            case"AAlarge":
                n = c >= 3;
                break;
            case"AAAsmall":
                n = c >= 7
        }
        return n
    }, t.mostReadable = function (e, i, a) {
        var o, n, r, l, s = null, c = 0;
        n = (a = a || {}).includeFallbackColors, r = a.level, l = a.size;
        for (var d = 0; d < i.length; d++)(o = t.readability(e, i[d])) > c && (c = o, s = t(i[d]));
        return t.isReadable(e, s, {
            level: r,
            size: l
        }) || !n ? s : (a.includeFallbackColors = !1, t.mostReadable(e, ["#fff", "#000"], a))
    };
    var D, R, O, H = t.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    }, B = t.hexNames = function (e) {
        var t = {};
        for (var i in e)e.hasOwnProperty(i) && (t[e[i]] = i);
        return t
    }(H), N = (R = "[\\s|\\(]+(" + (D = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", O = "[\\s|\\(]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", {
        CSS_UNIT: new RegExp(D),
        rgb: new RegExp("rgb" + R),
        rgba: new RegExp("rgba" + O),
        hsl: new RegExp("hsl" + R),
        hsla: new RegExp("hsla" + O),
        hsv: new RegExp("hsv" + R),
        hsva: new RegExp("hsva" + O),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    });
    "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define(function () {
        return t
    }) : window.tinycolor = t
}(Math), function (e) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e("undefined" != typeof module && module.exports ? require("jquery") : jQuery)
}(function (e) {
    "use strict";
    function t(t) {
        return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = s), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function () {
            var T = e(this), _ = T.data(x);
            _ || (_ = new function (t, T) {
                function _(t) {
                    if (!(!0 === Ce.data(x + "_intouch") || e(t.target).closest(T.excludedElements, Ce).length > 0)) {
                        var r = t.originalEvent ? t.originalEvent : t;
                        if (!r.pointerType || "mouse" != r.pointerType || 0 != T.fallbackToMouseEvents) {
                            var l, s = r.touches, c = s ? s[0] : r;
                            return $e = k, s ? Se = s.length : !1 !== T.preventDefaultEvents && t.preventDefault(), ue = 0, he = null, fe = null, ye = null, ge = 0, me = 0, be = 0, ve = 1, ke = 0, (d = {})[i] = te(i), d[a] = te(a), d[o] = te(o), d[n] = te(n), we = d, V(), Z(0, c), !s || Se === T.fingers || T.fingers === b || Y() ? (xe = ne(), 2 == Se && (Z(1, s[1]), me = be = ae(Ae[0].start, Ae[1].start)), (T.swipeStatus || T.pinchStatus) && (l = D(r, $e))) : l = !1, !1 === l ? (D(r, $e = C), l) : (T.hold && (Le = setTimeout(e.proxy(function () {
                                Ce.trigger("hold", [r.target]), T.hold && (l = T.hold.call(Ce, r, r.target))
                            }, this), T.longTapThreshold)), J(!0), null)
                        }
                    }
                    var d
                }

                function E(t) {
                    var d, p, u, h, f, v, k, $, S = t.originalEvent ? t.originalEvent : t;
                    if ($e !== w && $e !== C && !Q()) {
                        var A, x = S.touches, _ = x ? x[0] : S, E = K(_);
                        if (Te = ne(), x && (Se = x.length), T.hold && clearTimeout(Le), $e = y, 2 == Se && (0 == me ? (Z(1, x[1]), me = be = ae(Ae[0].start, Ae[1].start)) : (K(x[1]), be = ae(Ae[0].end, Ae[1].end), Ae[0].end, Ae[1].end, ye = ve < 1 ? l : r), ve = (be / me * 1).toFixed(2), ke = Math.abs(me - be)), Se === T.fingers || T.fingers === b || !x || Y()) {
                            if (he = oe(E.start, E.end), fe = oe(E.last, E.end), function (e, t) {
                                    if (!1 !== T.preventDefaultEvents)if (T.allowPageScroll === s)e.preventDefault(); else {
                                        var r = T.allowPageScroll === c;
                                        switch (t) {
                                            case i:
                                                (T.swipeLeft && r || !r && T.allowPageScroll != g) && e.preventDefault();
                                                break;
                                            case a:
                                                (T.swipeRight && r || !r && T.allowPageScroll != g) && e.preventDefault();
                                                break;
                                            case o:
                                                (T.swipeUp && r || !r && T.allowPageScroll != m) && e.preventDefault();
                                                break;
                                            case n:
                                                (T.swipeDown && r || !r && T.allowPageScroll != m) && e.preventDefault()
                                        }
                                    }
                                }(t, fe), k = E.start, $ = E.end, ue = Math.round(Math.sqrt(Math.pow($.x - k.x, 2) + Math.pow($.y - k.y, 2))), ge = ie(), v = ue, (f = he) != s && (v = Math.max(v, ee(f)), we[f].distance = v), A = D(S, $e), !T.triggerOnTouchEnd || T.triggerOnTouchLeave) {
                                var M = !0;
                                if (T.triggerOnTouchLeave) {
                                    var F = {
                                        left: (h = (u = e(u = this)).offset()).left,
                                        right: h.left + u.outerWidth(),
                                        top: h.top,
                                        bottom: h.top + u.outerHeight()
                                    };
                                    d = E.end, p = F, M = d.x > p.left && d.x < p.right && d.y > p.top && d.y < p.bottom
                                }
                                !T.triggerOnTouchEnd && M ? $e = I(y) : T.triggerOnTouchLeave && !M && ($e = I(w)), $e != C && $e != w || D(S, $e)
                            }
                        } else D(S, $e = C);
                        !1 === A && D(S, $e = C)
                    }
                }

                function M(e) {
                    var t, i = e.originalEvent ? e.originalEvent : e, a = i.touches;
                    if (a) {
                        if (a.length && !Q())return t = i, _e = ne(), Ee = t.touches.length + 1, !0;
                        if (a.length && Q())return !0
                    }
                    return Q() && (Se = Ee), Te = ne(), ge = ie(), H() || !O() ? D(i, $e = C) : T.triggerOnTouchEnd || !1 === T.triggerOnTouchEnd && $e === y ? (!1 !== T.preventDefaultEvents && !1 !== e.cancelable && e.preventDefault(), D(i, $e = w)) : !T.triggerOnTouchEnd && X() ? R(i, $e = w, u) : $e === y && D(i, $e = C), J(!1), null
                }

                function F() {
                    Se = 0, Te = 0, xe = 0, me = 0, be = 0, ve = 1, V(), J(!1)
                }

                function L(e) {
                    var t = e.originalEvent ? e.originalEvent : e;
                    T.triggerOnTouchLeave && ($e = I(w), D(t, $e))
                }

                function P() {
                    Ce.unbind(le, _), Ce.unbind(pe, F), Ce.unbind(se, E), Ce.unbind(ce, M), de && Ce.unbind(de, L), J(!1)
                }

                function I(e) {
                    var t = e, i = B(), a = O(), o = H();
                    return !i || o ? t = C : !a || e != y || T.triggerOnTouchEnd && !T.triggerOnTouchLeave ? !a && e == w && T.triggerOnTouchLeave && (t = C) : t = w, t
                }

                function D(e, t) {
                    var i, a = e.touches;
                    return (!(!z() || !W()) || W()) && (i = R(e, t, d)), (!(!N() || !Y()) || Y()) && !1 !== i && (i = R(e, t, p)), G() && U() && !1 !== i ? i = R(e, t, h) : ge > T.longTapThreshold && ue < v && T.longTap && !1 !== i ? i = R(e, t, f) : !(1 !== Se && $ || !(isNaN(ue) || ue < T.threshold) || !X()) && !1 !== i && (i = R(e, t, u)), t === C && F(), t === w && (a && a.length || F()), i
                }

                function R(t, s, c) {
                    var g;
                    if (c == d) {
                        if (Ce.trigger("swipeStatus", [s, he || null, ue || 0, ge || 0, Se, Ae, fe]), T.swipeStatus && !1 === (g = T.swipeStatus.call(Ce, t, s, he || null, ue || 0, ge || 0, Se, Ae, fe)))return !1;
                        if (s == w && z()) {
                            if (clearTimeout(Fe), clearTimeout(Le), Ce.trigger("swipe", [he, ue, ge, Se, Ae, fe]), T.swipe && !1 === (g = T.swipe.call(Ce, t, he, ue, ge, Se, Ae, fe)))return !1;
                            switch (he) {
                                case i:
                                    Ce.trigger("swipeLeft", [he, ue, ge, Se, Ae, fe]), T.swipeLeft && (g = T.swipeLeft.call(Ce, t, he, ue, ge, Se, Ae, fe));
                                    break;
                                case a:
                                    Ce.trigger("swipeRight", [he, ue, ge, Se, Ae, fe]), T.swipeRight && (g = T.swipeRight.call(Ce, t, he, ue, ge, Se, Ae, fe));
                                    break;
                                case o:
                                    Ce.trigger("swipeUp", [he, ue, ge, Se, Ae, fe]), T.swipeUp && (g = T.swipeUp.call(Ce, t, he, ue, ge, Se, Ae, fe));
                                    break;
                                case n:
                                    Ce.trigger("swipeDown", [he, ue, ge, Se, Ae, fe]), T.swipeDown && (g = T.swipeDown.call(Ce, t, he, ue, ge, Se, Ae, fe))
                            }
                        }
                    }
                    if (c == p) {
                        if (Ce.trigger("pinchStatus", [s, ye || null, ke || 0, ge || 0, Se, ve, Ae]), T.pinchStatus && !1 === (g = T.pinchStatus.call(Ce, t, s, ye || null, ke || 0, ge || 0, Se, ve, Ae)))return !1;
                        if (s == w && N())switch (ye) {
                            case r:
                                Ce.trigger("pinchIn", [ye || null, ke || 0, ge || 0, Se, ve, Ae]), T.pinchIn && (g = T.pinchIn.call(Ce, t, ye || null, ke || 0, ge || 0, Se, ve, Ae));
                                break;
                            case l:
                                Ce.trigger("pinchOut", [ye || null, ke || 0, ge || 0, Se, ve, Ae]), T.pinchOut && (g = T.pinchOut.call(Ce, t, ye || null, ke || 0, ge || 0, Se, ve, Ae))
                        }
                    }
                    return c == u ? s !== C && s !== w || (clearTimeout(Fe), clearTimeout(Le), U() && !G() ? (Me = ne(), Fe = setTimeout(e.proxy(function () {
                        Me = null, Ce.trigger("tap", [t.target]), T.tap && (g = T.tap.call(Ce, t, t.target))
                    }, this), T.doubleTapThreshold)) : (Me = null, Ce.trigger("tap", [t.target]), T.tap && (g = T.tap.call(Ce, t, t.target)))) : c == h ? s !== C && s !== w || (clearTimeout(Fe), clearTimeout(Le), Me = null, Ce.trigger("doubletap", [t.target]), T.doubleTap && (g = T.doubleTap.call(Ce, t, t.target))) : c == f && (s !== C && s !== w || (clearTimeout(Fe), Me = null, Ce.trigger("longtap", [t.target]), T.longTap && (g = T.longTap.call(Ce, t, t.target)))), g
                }

                function O() {
                    var e = !0;
                    return null !== T.threshold && (e = ue >= T.threshold), e
                }

                function H() {
                    var e = !1;
                    return null !== T.cancelThreshold && null !== he && (e = ee(he) - ue >= T.cancelThreshold), e
                }

                function B() {
                    return !(T.maxTimeThreshold && ge >= T.maxTimeThreshold)
                }

                function N() {
                    var e = q(), t = j(), i = null === T.pinchThreshold || ke >= T.pinchThreshold;
                    return e && t && i
                }

                function Y() {
                    return !!(T.pinchStatus || T.pinchIn || T.pinchOut)
                }

                function z() {
                    var e = B(), t = O(), i = q(), a = j(), o = H(), n = !o && a && i && t && e;
                    return n
                }

                function W() {
                    return !!(T.swipe || T.swipeStatus || T.swipeLeft || T.swipeRight || T.swipeUp || T.swipeDown)
                }

                function q() {
                    return Se === T.fingers || T.fingers === b || !$
                }

                function j() {
                    return 0 !== Ae[0].end.x
                }

                function X() {
                    return !!T.tap
                }

                function U() {
                    return !!T.doubleTap
                }

                function G() {
                    if (null == Me)return !1;
                    var e = ne();
                    return U() && e - Me <= T.doubleTapThreshold
                }

                function V() {
                    _e = 0, Ee = 0
                }

                function Q() {
                    var e = !1;
                    if (_e) {
                        var t = ne() - _e;
                        t <= T.fingerReleaseThreshold && (e = !0)
                    }
                    return e
                }

                function J(e) {
                    Ce && (!0 === e ? (Ce.bind(se, E), Ce.bind(ce, M), de && Ce.bind(de, L)) : (Ce.unbind(se, E, !1), Ce.unbind(ce, M, !1), de && Ce.unbind(de, L, !1)), Ce.data(x + "_intouch", !0 === e))
                }

                function Z(e, t) {
                    var i = {start: {x: 0, y: 0}, last: {x: 0, y: 0}, end: {x: 0, y: 0}};
                    return i.start.x = i.last.x = i.end.x = t.pageX || t.clientX, i.start.y = i.last.y = i.end.y = t.pageY || t.clientY, Ae[e] = i, i
                }

                function K(e) {
                    var t = void 0 !== e.identifier ? e.identifier : 0, i = Ae[t] || null;
                    return null === i && (i = Z(t, e)), i.last.x = i.end.x, i.last.y = i.end.y, i.end.x = e.pageX || e.clientX, i.end.y = e.pageY || e.clientY, i
                }

                function ee(e) {
                    if (we[e])return we[e].distance
                }

                function te(e) {
                    return {direction: e, distance: 0}
                }

                function ie() {
                    return Te - xe
                }

                function ae(e, t) {
                    var i = Math.abs(e.x - t.x), a = Math.abs(e.y - t.y);
                    return Math.round(Math.sqrt(i * i + a * a))
                }

                function oe(e, t) {
                    if (l = t, (r = e).x == l.x && r.y == l.y)return s;
                    var r, l, c, d, p, u, h, f, g = (d = t, p = (c = e).x - d.x, u = d.y - c.y, h = Math.atan2(u, p), (f = Math.round(180 * h / Math.PI)) < 0 && (f = 360 - Math.abs(f)), f);
                    return g <= 45 && g >= 0 ? i : g <= 360 && g >= 315 ? i : g >= 135 && g <= 225 ? a : g > 45 && g < 135 ? n : o
                }

                function ne() {
                    var e = new Date;
                    return e.getTime()
                }

                var T = e.extend({}, T), re = $ || A || !T.fallbackToMouseEvents, le = re ? A ? S ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown", se = re ? A ? S ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove", ce = re ? A ? S ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup", de = re ? A ? "mouseleave" : null : "mouseleave", pe = A ? S ? "MSPointerCancel" : "pointercancel" : "touchcancel", ue = 0, he = null, fe = null, ge = 0, me = 0, be = 0, ve = 1, ke = 0, ye = 0, we = null, Ce = e(t), $e = "start", Se = 0, Ae = {}, xe = 0, Te = 0, _e = 0, Ee = 0, Me = 0, Fe = null, Le = null;
                try {
                    Ce.bind(le, _), Ce.bind(pe, F)
                } catch (t) {
                    e.error("events not supported " + le + "," + pe + " on jQuery.swipe")
                }
                this.enable = function () {
                    return this.disable(), Ce.bind(le, _), Ce.bind(pe, F), Ce
                }, this.disable = function () {
                    return P(), Ce
                }, this.destroy = function () {
                    P(), Ce.data(x, null), Ce = null
                }, this.option = function (t, i) {
                    if ("object" == typeof t)T = e.extend(T, t); else if (void 0 !== T[t]) {
                        if (void 0 === i)return T[t];
                        T[t] = i
                    } else {
                        if (!t)return T;
                        e.error("Option " + t + " does not exist on jQuery.swipe.options")
                    }
                    return null
                }
            }(this, t), T.data(x, _))
        })
    }

    var i = "left", a = "right", o = "up", n = "down", r = "in", l = "out", s = "none", c = "auto", d = "swipe", p = "pinch", u = "tap", h = "doubletap", f = "longtap", g = "horizontal", m = "vertical", b = "all", v = 10, k = "start", y = "move", w = "end", C = "cancel", $ = "ontouchstart" in window, S = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !$, A = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !$, x = "TouchSwipe";
    e.fn.swipe = function (i) {
        var a = e(this), o = a.data(x);
        if (o && "string" == typeof i) {
            if (o[i])return o[i].apply(o, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + i + " does not exist on jQuery.swipe")
        } else if (o && "object" == typeof i)o.option.apply(o, arguments); else if (!(o || "object" != typeof i && i))return t.apply(this, arguments);
        return a
    }, e.fn.swipe.version = "1.6.18", e.fn.swipe.defaults = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: ".noSwipe",
        preventDefaultEvents: !0
    }, e.fn.swipe.phases = {
        PHASE_START: k,
        PHASE_MOVE: y,
        PHASE_END: w,
        PHASE_CANCEL: C
    }, e.fn.swipe.directions = {LEFT: i, RIGHT: a, UP: o, DOWN: n, IN: r, OUT: l}, e.fn.swipe.pageScroll = {
        NONE: s,
        HORIZONTAL: g,
        VERTICAL: m,
        AUTO: c
    }, e.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: b}
}), function (e) {
    e.isBreakpoint = function (t) {
        var i, a, o;
        switch (t) {
            case"xs":
                o = "d-none d-sm-block";
                break;
            case"sm":
                o = "d-none d-md-block";
                break;
            case"md":
                o = "d-none d-lg-block";
                break;
            case"lg":
                o = "d-none d-xl-block";
                break;
            case"xl":
                o = "d-none"
        }
        return a = (i = e("<div/>", {class: o}).appendTo("body")).is(":hidden"), i.remove(), a
    }, e.extend(e, {
        isXs: function () {
            return e.isBreakpoint("xs")
        }, isSm: function () {
            return e.isBreakpoint("sm")
        }, isMd: function () {
            return e.isBreakpoint("md")
        }, isLg: function () {
            return e.isBreakpoint("lg")
        }, isXl: function () {
            return e.isBreakpoint("xl")
        }
    })
}(jQuery);
App = function () {
    "use strict";
    return App.booking = function () {
        $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {rightIcon: "mdi mdi-chevron-right", leftIcon: "mdi mdi-chevron-left"}
        }), $(".select2").select2({width: "100%"}), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".bslider").bootstrapSlider()
    }, App
}(), App = function () {
    "use strict";
    return App.ChartJs = function () {
        var e, t, i, a, o, n, r, l, s, c, d, p, u, h, f, g, m, b, v, k, y, w, C, $, S, A, x = function () {
            return Math.round(100 * Math.random())
        };
        e = tinycolor(App.color.primary), t = tinycolor(App.color.primary).lighten(22), i = document.getElementById("line-chart"), a = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            tooltips: {enabled: !0, position: "average"},
            datasets: [{
                label: "My First dataset",
                borderColor: e.toString(),
                backgroundColor: e.setAlpha(.8).toString(),
                data: [x(), x(), x(), x(), x(), x(), x()]
            }, {
                label: "My Second dataset",
                borderColor: t.toString(),
                backgroundColor: t.setAlpha(.5).toString(),
                data: [x(), x(), x(), x(), x(), x(), x()]
            }]
        }, new Chart(i, {
            type: "line",
            data: a
        }), o = tinycolor(App.color.success), n = tinycolor(App.color.warning), r = document.getElementById("bar-chart"), l = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Credit",
                borderColor: o.toString(),
                backgroundColor: o.setAlpha(.8).toString(),
                data: [x(), x(), x(), x(), x(), x(), x()]
            }, {
                label: "Debit",
                borderColor: n.toString(),
                backgroundColor: n.setAlpha(.5).toString(),
                data: [x(), x(), x(), x(), x(), x(), x()]
            }]
        }, new Chart(r, {
            type: "bar",
            data: l,
            options: {elements: {rectangle: {borderWidth: 2, borderColor: "rgb(0, 255, 0)", borderSkipped: "bottom"}}}
        }), s = tinycolor(App.color.grey), c = tinycolor(App.color.danger), d = document.getElementById("radar-chart"), p = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [{
                label: "First Year",
                backgroundColor: s.setAlpha(.3).toString(),
                borderColor: s.toString(),
                pointBackgroundColor: s.toString(),
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: s.toString(),
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: "Second Year",
                backgroundColor: c.setAlpha(.4).toString(),
                borderColor: c.toString(),
                pointBackgroundColor: c.toString(),
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: c.toString(),
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        }, new Chart(d, {
            type: "radar",
            data: p
        }), u = App.color.primary, h = App.color.success, f = App.color.warning, g = App.color.danger, m = App.color.grey, b = document.getElementById("polar-chart"), new Chart(b, {
            type: "polarArea",
            data: {
                datasets: [{data: [11, 16, 7, 3, 14], backgroundColor: [g, h, f, m, u], label: "My dataset"}],
                labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
            }
        }), v = App.color.primary, k = tinycolor(App.color.primary).lighten(12).toString(), y = tinycolor(App.color.primary).lighten(22).toString(), w = document.getElementById("pie-chart"), new Chart(w, {
            type: "pie",
            data: {
                labels: ["Red", "Blue", "Yellow"],
                datasets: [{data: [300, 50, 100], backgroundColor: [v, k, y], hoverBackgroundColor: [v, k, y]}]
            }
        }), C = App.color.success, $ = tinycolor(App.color.success).lighten(12).toString(), S = tinycolor(App.color.success).lighten(22).toString(), A = document.getElementById("donut-chart"), new Chart(A, {
            type: "doughnut",
            data: {
                labels: ["Red", "Blue", "Yellow"],
                datasets: [{data: [300, 50, 100], backgroundColor: [C, $, S], hoverBackgroundColor: [C, $, S]}]
            }
        })
    }, App
}(), App = function () {
    "use strict";
    return App.chartsMorris = function () {
        var e, t, i, a, o, n, r, l, s, c, d = [{period: "2013", licensed: 400, sorned: 550}, {
            period: "2012",
            licensed: 450,
            sorned: 400
        }, {period: "2011", licensed: 350, sorned: 550}, {period: "2010", licensed: 500, sorned: 700}, {
            period: "2009",
            licensed: 250,
            sorned: 380
        }, {period: "2008", licensed: 350, sorned: 240}, {period: "2007", licensed: 180, sorned: 300}, {
            period: "2006",
            licensed: 300,
            sorned: 250
        }, {period: "2005", licensed: 200, sorned: 150}];
        e = App.color.primary, t = tinycolor(App.color.primary).lighten(15).toString(), new Morris.Line({
            element: "line-chart",
            data: d,
            xkey: "period",
            ykeys: ["licensed", "sorned"],
            labels: ["Licensed", "Off the road"],
            lineColors: [e, t]
        }), i = tinycolor(App.color.success).lighten(15).toString(), a = tinycolor(App.color.success).brighten(3).toString(), Morris.Bar({
            element: "bar-chart",
            data: [{device: "iPhone", geekbench: 136, macbench: 180}, {
                device: "iPhone 3G",
                geekbench: 137,
                macbench: 200
            }, {device: "iPhone 3GS", geekbench: 275, macbench: 350}, {
                device: "iPhone 4",
                geekbench: 380,
                macbench: 500
            }, {device: "iPhone 4S", geekbench: 655, macbench: 900}, {
                device: "iPhone 5",
                geekbench: 1571,
                macbench: 1700
            }],
            xkey: "device",
            ykeys: ["geekbench", "macbench"],
            labels: ["Geekbench", "Macbench"],
            barColors: [i, a],
            barRatio: .4,
            xLabelAngle: 35,
            hideHover: "auto"
        }), o = App.color.warning, n = App.color.success, r = App.color.primary, Morris.Donut({
            element: "donut-chart",
            data: [{label: "Facebook", value: 33}, {label: "Google", value: 33}, {label: "Twitter", value: 33}],
            colors: [o, n, r],
            formatter: function (e) {
                return e + "%"
            }
        }), l = App.color.primary, s = App.color.success, c = App.color.warning, Morris.Area({
            element: "area-chart",
            data: [{period: "2010 Q1", iphone: 2666, ipad: null, itouch: 2647}, {
                period: "2010 Q2",
                iphone: 2778,
                ipad: 2294,
                itouch: 2441
            }, {period: "2010 Q3", iphone: 4912, ipad: 1969, itouch: 2501}, {
                period: "2010 Q4",
                iphone: 3767,
                ipad: 3597,
                itouch: 5689
            }, {period: "2011 Q1", iphone: 6810, ipad: 1914, itouch: 2293}, {
                period: "2011 Q2",
                iphone: 5670,
                ipad: 4293,
                itouch: 1881
            }, {period: "2011 Q3", iphone: 4820, ipad: 3795, itouch: 1588}, {
                period: "2011 Q4",
                iphone: 15073,
                ipad: 5967,
                itouch: 5175
            }, {period: "2012 Q1", iphone: 10687, ipad: 4460, itouch: 2028}, {
                period: "2012 Q2",
                iphone: 8432,
                ipad: 5713,
                itouch: 1791
            }],
            xkey: "period",
            ykeys: ["iphone", "ipad", "itouch"],
            labels: ["iPhone", "iPad", "iPod Touch"],
            lineColors: [l, s, c],
            pointSize: 2,
            hideHover: "auto"
        })
    }, App
}(), App = function () {
    "use strict";
    return App.chartsSparklines = function () {
        var e = App.color.primary, t = App.color.warning, i = App.color.success, a = App.color.danger;
        $("#spark1").sparkline("html", {
            width: "85",
            height: "35",
            lineColor: e,
            highlightSpotColor: e,
            highlightLineColor: e,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), $("#spark2").sparkline("html", {
            type: "bar",
            width: "85",
            height: "35",
            barWidth: 3,
            barSpacing: 3,
            chartRangeMin: 0,
            barColor: t
        }), $("#spark3").sparkline("html", {
            type: "discrete",
            width: "85",
            height: "35",
            lineHeight: 20,
            lineColor: i,
            xwidth: 18
        }), $("#spark4").sparkline("html", {
            width: "85",
            height: "35",
            lineColor: a,
            highlightSpotColor: a,
            highlightLineColor: a,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        });
        var o = tinycolor(App.color.primary), n = tinycolor(App.color.danger), r = tinycolor(App.color.warning), l = tinycolor(App.color.success);
        e = o.toString(), t = n.toString(), i = r.toString(), a = l.toString();
        $.fn.sparkline.defaults.common.lineColor = e, $.fn.sparkline.defaults.common.fillColor = o.setAlpha(.3).toString(), $.fn.sparkline.defaults.line.spotColor = e, $.fn.sparkline.defaults.line.minSpotColor = e, $.fn.sparkline.defaults.line.maxSpotColor = e, $.fn.sparkline.defaults.line.highlightSpotColor = e, $.fn.sparkline.defaults.line.highlightLineColor = e, $.fn.sparkline.defaults.bar.barColor = e, $.fn.sparkline.defaults.bar.negBarColor = t, $.fn.sparkline.defaults.bar.stackedBarColor[0] = e, $.fn.sparkline.defaults.bar.stackedBarColor[1] = t, $.fn.sparkline.defaults.tristate.posBarColor = e, $.fn.sparkline.defaults.tristate.negBarColor = t, $.fn.sparkline.defaults.discrete.thresholdColor = t, $.fn.sparkline.defaults.bullet.targetColor = e, $.fn.sparkline.defaults.bullet.performanceColor = t, $.fn.sparkline.defaults.bullet.rangeColors[0] = n.setAlpha(.2).toString(), $.fn.sparkline.defaults.bullet.rangeColors[1] = n.setAlpha(.5).toString(), $.fn.sparkline.defaults.bullet.rangeColors[2] = n.setAlpha(.45).toString(), $.fn.sparkline.defaults.pie.sliceColors[0] = e, $.fn.sparkline.defaults.pie.sliceColors[1] = t, $.fn.sparkline.defaults.pie.sliceColors[2] = i, $.fn.sparkline.defaults.box.medianColor = e, $.fn.sparkline.defaults.box.boxFillColor = n.setAlpha(.5).toString(), $.fn.sparkline.defaults.box.boxLineColor = e, $.fn.sparkline.defaults.box.whiskerColor = a, $(".compositebar").sparkline("html", {
            type: "bar",
            barColor: t
        }), $(".compositebar").sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
            composite: !0,
            fillColor: !1
        }), $(".sparklinebasic").sparkline(), $(".linecustom").sparkline("html", {
            height: "1.5em",
            width: "8em",
            lineColor: i,
            fillColor: r.setAlpha(.4).toString(),
            minSpotColor: !1,
            maxSpotColor: !1,
            spotColor: a,
            spotRadius: 3
        }), $(".sparkbar").sparkline("html", {type: "bar"}), $(".sparktristate").sparkline("html", {type: "tristate"}), $(".compositeline").sparkline("html", {
            fillColor: !1,
            changeRangeMin: 0,
            chartRangeMax: 10
        }), $(".compositeline").sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
            composite: !0,
            fillColor: !1,
            lineColor: t,
            changeRangeMin: 0,
            chartRangeMax: 10
        }), $(".normalline").sparkline("html", {
            fillColor: !1,
            normalRangeMin: -1,
            normalRangeMax: 8
        }), $(".discrete1").sparkline("html", {
            type: "discrete",
            xwidth: 18
        }), $(".discrete2").sparkline("html", {
            type: "discrete",
            thresholdValue: 4
        }), $(".sparkbullet").sparkline("html", {type: "bullet"}), $(".sparkpie").sparkline("html", {
            type: "pie",
            height: "1.0em"
        }), $(".sparkboxplot").sparkline("html", {type: "box"})
    }, App
}(), App = function () {
    "use strict";
    return App.charts = function () {
        function e() {
            return Math.floor(31 * Math.random()) + 10
        }

        function t(e, t) {
            $("#" + e).bind("plothover", function (e, i, a) {
                var o = $(".tooltip-chart").width();
                a ? $(".tooltip-chart").css({
                    top: a.pageY - t,
                    left: a.pageX - o / 2
                }).fadeIn(200) : $(".tooltip-chart").hide()
            })
        }

        var i, a, o, n, r, l, s, c, d, p, u, h, f, g, m, b, v;
        i = tinycolor(App.color.primary).lighten(5).toString(), $.plot($("#line-chart3"), [{
            data: [[0, 20], [1, 30], [2, 25], [3, 39], [4, 35], [5, 40], [6, 30], [7, 45]],
            label: "Page Views"
        }], {
            series: {
                lines: {show: !0, lineWidth: 2, fill: !0, fillColor: {colors: [{opacity: .1}, {opacity: .1}]}},
                points: {show: !0},
                shadowSize: 0
            },
            legend: {show: !1},
            grid: {
                margin: {left: 23, right: 30, top: 20, botttom: 40},
                labelMargin: 15,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [i],
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {ticks: 4, tickSize: 15, tickDecimals: 0}
        }), t("line-chart3", 60), a = App.color.success, o = tinycolor(App.color.success).lighten(22).toString(), $.plot($("#bar-chart2"), [{
            data: [[0, 7], [1, 13], [2, 17], [3, 20], [4, 26], [5, 37], [6, 35], [7, 28], [8, 38], [9, 38], [10, 32]],
            label: "Page Views"
        }, {
            data: [[0, 15], [1, 10], [2, 15], [3, 25], [4, 30], [5, 29], [6, 25], [7, 33], [8, 45], [9, 43], [10, 38]],
            label: "Unique Visitor"
        }], {
            series: {
                bars: {
                    order: 2,
                    align: "center",
                    show: !0,
                    lineWidth: 1,
                    barWidth: .35,
                    fill: !0,
                    fillColor: {colors: [{opacity: 1}, {opacity: 1}]}
                }, shadowSize: 2
            },
            legend: {show: !1},
            grid: {
                margin: {left: 23, right: 30, top: 20, botttom: 40},
                labelMargin: 10,
                axisMargin: 200,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.15)"
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [a, o],
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {ticks: 4, tickDecimals: 0}
        }), t("bar-chart2", 60), n = App.color.primary, $.plot($("#line-chart1"), [{
            data: [[0, 20], [1, 30], [2, 25], [3, 39], [4, 35], [5, 40], [6, 30], [7, 45]],
            label: "Page Views"
        }], {
            series: {
                lines: {show: !0, lineWidth: 2, fill: !0, fillColor: {colors: [{opacity: .35}, {opacity: .35}]}},
                points: {show: !0},
                shadowSize: 0
            },
            legend: {show: !1},
            grid: {
                margin: {left: -8, right: -8, top: 0, bottom: 0},
                show: !1,
                labelMargin: 15,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [n],
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {autoscaleMargin: .5, ticks: 4, tickDecimals: 0}
        }), t("line-chart1", 45), r = tinycolor(App.color.danger).brighten(9).toString(), l = tinycolor(App.color.danger).lighten(13).toString(), s = tinycolor(App.color.danger).lighten(20).toString(), c = tinycolor(App.color.danger).lighten(27).toString(), $.plot("#pie-chart4", [{
            label: "Google",
            data: 45
        }, {label: "Dribbble", data: 25}, {label: "Twitter", data: 20}, {
            label: "Facebook",
            data: 10
        }], {
            series: {
                pie: {
                    show: !0,
                    innerRadius: .35,
                    shadow: {top: 5, left: 15, alpha: .3},
                    stroke: {width: 0},
                    label: {
                        show: !0, formatter: function (e, t) {
                            return '<div style="font-size:12px;text-align:center;padding:2px;color:#333;">' + e + "</div>"
                        }
                    },
                    highlight: {opacity: .08}
                }
            },
            grid: {hoverable: !0, clickable: !0},
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart arrow-none'> <div class='label'> <div class='label-x'> %x.0% </div> </div></div>",
                defaultTheme: !1
            },
            colors: [r, l, s, c],
            legend: {show: !1}
        }), d = tinycolor(App.color.warning).lighten(25).toString(), p = tinycolor(App.color.warning).brighten(3).toString(), $.plot($("#bar-chart1"), [{
            data: [[0, 15], [1, 15], [2, 19], [3, 28], [4, 30], [5, 37], [6, 35], [7, 38], [8, 48], [9, 43], [10, 38], [11, 32], [12, 38]],
            label: "Page Views"
        }, {
            data: [[0, 7], [1, 10], [2, 15], [3, 23], [4, 24], [5, 29], [6, 25], [7, 33], [8, 35], [9, 38], [10, 32], [11, 27], [12, 32]],
            label: "Unique Visitor"
        }], {
            series: {
                bars: {
                    align: "center",
                    show: !0,
                    lineWidth: 1,
                    barWidth: .6,
                    fill: !0,
                    fillColor: {colors: [{opacity: 1}, {opacity: 1}]}
                }, shadowSize: 2
            },
            legend: {show: !1},
            grid: {
                margin: 0,
                show: !1,
                labelMargin: 10,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [d, p],
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {autoscaleMargin: .5, ticks: 4, tickDecimals: 0}
        }), t("bar-chart1", 60), u = tinycolor(App.color.success).lighten(7).toString(), h = App.color.success, $.plot("#linechart-mini1", [{
            data: [[1, 20], [2, 50], [3, 35], [4, 50], [5, 25]],
            canvasRender: !0
        }, {data: [[1, 50], [2, 20], [3, 55], [4, 30], [5, 65]], canvasRender: !0}], {
            series: {
                lines: {
                    show: !0,
                    lineWidth: 0,
                    fill: !0,
                    fillColor: {colors: [{opacity: .7}, {opacity: .7}]}
                }, fillColor: "rgba(0, 0, 0, 1)", shadowSize: 0, curvedLines: {apply: !0, active: !0, monotonicFit: !0}
            },
            legend: {show: !1},
            grid: {show: !1, hoverable: !0, clickable: !0},
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [u, h],
            xaxis: {autoscaleMargin: 0, ticks: 11, tickDecimals: 0},
            yaxis: {autoscaleMargin: .5, ticks: 5, tickDecimals: 0}
        }), t("linechart-mini1", 45), function () {
            var e = App.color.success, i = [], a = 100;

            function o() {
                for (i.length > 0 && (i = i.slice(1)); i.length < a;) {
                    var e = (i.length > 0 ? i[i.length - 1] : 50) + 10 * Math.random() - 5;
                    e < 0 ? e = 0 : e > 100 && (e = 100), i.push(e)
                }
                for (var t = [], o = 0; o < i.length; ++o)t.push([o, i[o]]);
                return t
            }

            var n = 500, r = $.plot("#live-data", [o()], {
                series: {
                    shadowSize: 0,
                    lines: {show: !0, lineWidth: 1, fill: !0, fillColor: {colors: [{opacity: .35}, {opacity: .35}]}}
                },
                grid: {
                    show: !0,
                    margin: {top: 3, bottom: 0, left: 0, right: 0},
                    labelMargin: 0,
                    axisMargin: 0,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    minBorderMargin: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [e],
                yaxis: {show: !1, autoscaleMargin: .2, ticks: 5, tickDecimals: 0},
                xaxis: {show: !1, autoscaleMargin: 0}
            });
            t("live-data", 45), function e() {
                r.setData([o()]), r.draw(), setTimeout(e, n)
            }()
        }(), f = tinycolor(App.color.primary).lighten(22), g = App.color.primary, m = [[1, e()], [2, e()], [3, 2 + e()], [4, 3 + e()], [5, 5 + e()], [6, 10 + e()], [7, 15 + e()], [8, 20 + e()], [9, 25 + e()], [10, 30 + e()], [11, 35 + e()], [12, 25 + e()], [13, 15 + e()], [14, 20 + e()], [15, 45 + e()], [16, 50 + e()], [17, 65 + e()], [18, 70 + e()], [19, 85 + e()], [20, 80 + e()], [21, 75 + e()], [22, 80 + e()], [23, 75 + e()]], b = [[1, e()], [2, e()], [3, 10 + e()], [4, 15 + e()], [5, 20 + e()], [6, 25 + e()], [7, 30 + e()], [8, 35 + e()], [9, 40 + e()], [10, 45 + e()], [11, 50 + e()], [12, 55 + e()], [13, 60 + e()], [14, 70 + e()], [15, 75 + e()], [16, 80 + e()], [17, 85 + e()], [18, 90 + e()], [19, 95 + e()], [20, 100 + e()], [21, 110 + e()], [22, 120 + e()], [23, 130 + e()]], $.plot($("#line-chart-live"), [{
            data: b,
            showLabels: !0,
            label: "New Visitors",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }, {
            data: m,
            showLabels: !0,
            label: "Old Visitors",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }], {
            series: {
                lines: {show: !0, lineWidth: 1.5, fill: !0, fillColor: {colors: [{opacity: .5}, {opacity: .5}]}},
                fillColor: "rgba(0, 0, 0, 1)",
                points: {show: !1, fill: !0},
                shadowSize: 0
            },
            legend: {show: !1},
            grid: {
                show: !1,
                margin: {top: -20, bottom: 0, left: 0, right: 0},
                labelMargin: 0,
                axisMargin: 0,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                minBorderMargin: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [f, g],
            xaxis: {autoscaleMargin: 0, ticks: 11, tickDecimals: 0},
            yaxis: {autoscaleMargin: .2, ticks: 5, tickDecimals: 0}
        }), t("line-chart-live", 60), v = App.color.primary, $("#line-chart2"), $.plot("#line-chart2", [{
            data: [[1, 10], [2, 30], [3, 55], [4, 36], [5, 57], [6, 80], [7, 65], [8, 50], [9, 80], [10, 70], [11, 90], [12, 67], [12, 67]],
            showLabels: !0,
            label: "New Visitors",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }], {
            series: {
                lines: {show: !0, lineWidth: 2, fill: !0, fillColor: {colors: [{opacity: .35}, {opacity: .35}]}},
                fillColor: "rgba(0, 0, 0, 1)",
                points: {show: !0, fill: !0, fillColor: v},
                shadowSize: 0
            },
            legend: {show: !1},
            grid: {
                show: !1,
                margin: {left: -8, right: -8, top: 0, botttom: 0},
                labelMargin: 0,
                axisMargin: 0,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [v],
            xaxis: {autoscaleMargin: 0, ticks: 11, tickDecimals: 0},
            yaxis: {autoscaleMargin: .5, ticks: 5, tickDecimals: 0}
        }), t("line-chart2", 60)
    }, App
}(), App = function () {
    "use strict";
    return App.codeEditor = function () {
        var e = $("#code1").html();
        e = (e = e.replace(/&lt;/g, "<")).replace(/&gt;/g, ">"), console.log(e);
        var t = CodeMirror($("#console")[0], {
            lineNumbers: !0,
            theme: "monokai",
            value: e,
            mode: "text/html",
            tabSize: 2
        });
        setTimeout(function () {
            t.refresh()
        }, 200)
    }, App
}(), App = function () {
    "use strict";
    return App.dashboard = function () {
        var e, t, i, a, o, n, r, l, s, c, d, p, u, h, f, g, m, b;
        $('[data-toggle="counter"]').each(function (e, t) {
            var i = $(this), a = "", o = "", n = 0, r = 0, l = 0, s = 2.5;
            i.data("prefix") && (a = i.data("prefix")), i.data("suffix") && (o = i.data("suffix")), i.data("start") && (n = i.data("start")), i.data("end") && (r = i.data("end")), i.data("decimals") && (l = i.data("decimals")), i.data("duration") && (s = i.data("duration")), new CountUp(i.get(0), n, r, l, s, {
                suffix: o,
                prefix: a
            }).start()
        }), $(".toggle-loading").on("click", function () {
            var e = $(this).parents(".widget, .panel");
            e.length && (e.addClass("be-loading-active"), setTimeout(function () {
                e.removeClass("be-loading-active")
            }, 3e3))
        }), e = App.color.primary, t = App.color.warning, i = App.color.success, a = App.color.danger, $("#spark1").sparkline([0, 5, 3, 7, 5, 10, 3, 6, 5, 10], {
            width: "85",
            height: "35",
            lineColor: e,
            highlightSpotColor: e,
            highlightLineColor: e,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), $("#spark2").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8], {
            type: "bar",
            width: "85",
            height: "35",
            barWidth: 3,
            barSpacing: 3,
            chartRangeMin: 0,
            barColor: t
        }), $("#spark3").sparkline([2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 4, 5], {
            type: "discrete",
            width: "85",
            height: "35",
            lineHeight: 20,
            lineColor: i,
            xwidth: 18
        }), $("#spark4").sparkline([2, 5, 3, 7, 5, 10, 3, 6, 5, 7], {
            width: "85",
            height: "35",
            lineColor: a,
            highlightSpotColor: a,
            highlightLineColor: a,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), n = App.color.primary, r = tinycolor(App.color.primary).lighten(13).toString(), l = tinycolor(App.color.primary).lighten(20).toString(), $.plot($("#main-chart"), [{
            data: buyPriceTrend,
            showLabels: !0,
            label: "买入价格",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }, {
            data: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]],
            showLabels: !0,
            label: "Plans",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }, {
            data: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]],
            showLabels: !0,
            label: "Services",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }], {
            series: {
                lines: {show: !0, lineWidth: 0, fill: !0, fillColor: {colors: [{opacity: 1}, {opacity: 1}]}},
                fillColor: "rgba(0, 0, 0, 1)",
                shadowSize: 0,
                curvedLines: {apply: !0, active: !0, monotonicFit: !0}
            },
            legend: {show: !1},
            grid: {
                show: !0,
                margin: {top: 20, bottom: 0, left: 0, right: 0},
                labelMargin: 0,
                minBorderMargin: 0,
                axisMargin: 0,
                tickColor: "rgba(0,0,0,0.05)",
                borderWidth: 0,
                hoverable: !0,
                clickable: !0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [n, r, l],
            xaxis: {
                tickFormatter: function () {
                    return ""
                }, autoscaleMargin: 0, ticks: 11, tickDecimals: 0, tickLength: 0
            },
            yaxis: {
                tickFormatter: function () {
                    return ""
                }, ticks: 4, tickDecimals: 0
            }
        }), o = 60, $("#main-chart").bind("plothover", function (e, t, i) {
            var a = $(".tooltip-chart").width();
            i ? $(".tooltip-chart").css({
                top: i.pageY - o,
                left: i.pageX - a / 2
            }).fadeIn(200) : $(".tooltip-chart").hide()
        }), $('[data-color="main-chart-color1"]').css({"background-color": n}), $('[data-color="main-chart-color2"]').css({"background-color": r}), $('[data-color="main-chart-color3"]').css({"background-color": l}), s = App.color.success, c = App.color.warning, d = App.color.primary, $.plot("#top-sales", [{
            label: "Services",
            data: parseInt($("#balance").html())
        }, {label: "Standard Plans", data: parseInt($("#insureBalance").html())}, {label: "Services", data: 0}], {
            series: {
                pie: {
                    radius: .75,
                    innerRadius: .58,
                    show: !0,
                    highlight: {opacity: .1},
                    label: {show: !1}
                }
            }, grid: {hoverable: !0}, legend: {show: !1}, colors: [s, c, d]
        }), $('[data-color="top-sales-color1"]').css({"background-color": s}), $('[data-color="top-sales-color2"]').css({"background-color": c}), $('[data-color="top-sales-color3"]').css({"background-color": d}), p = $("#calendar-widget"), u = new Date, h = u.getFullYear(), f = u.getMonth(), g = [h + "-" + (f + 1) + "-16", h + "-" + (f + 1) + "-20"], $.extend($.datepicker, {
            _updateDatepicker_original: $.datepicker._updateDatepicker,
            _updateDatepicker: function (e) {
                this._updateDatepicker_original(e);
                var t = this._get(e, "afterShow");
                t && t.apply(e, [e])
            }
        }), void 0 !== jQuery.ui && p.datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            beforeShowDay: function (e) {
                var t = e.getMonth(), i = e.getDate(), a = e.getFullYear();
                return -1 != $.inArray(a + "-" + (t + 1) + "-" + i, g) ? [!0, "has-events", "This day has events!"] : [!0, "", ""]
            },
            afterShow: function (e) {
                var t;
                t = e.dpDiv, 6 == $("tbody tr", t).length ? t.addClass("ui-datepicker-6rows") : t.removeClass("ui-datepicker-6rows")
            }
        }), m = tinycolor(App.color.primary).lighten(15).toHexString(), b = tinycolor(App.color.primary).lighten(8).toHexString(), tinycolor(App.color.primary).toHexString(), $("#map-widget").vectorMap({
            map: "world_en",
            backgroundColor: null,
            color: m,
            hoverOpacity: .7,
            selectedColor: b,
            enableZoom: !0,
            showTooltip: !0,
            values: {ru: "14", us: "14", ca: "10", br: "10", au: "11", uk: "3", cn: "12"},
            scaleColors: [m, b],
            normalizeFunction: "polynomial"
        })
    }, App
}(), App = function () {
    "use strict";
    return App.formElements = function () {
        $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {rightIcon: "mdi mdi-chevron-right", leftIcon: "mdi mdi-chevron-left"}
        }), $(".select2").select2({width: "100%"}), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".bslider").bootstrapSlider(), $(".inputfile").each(function () {
            var e = $(this), t = e.next("label"), i = t.html();
            e.on("change", function (e) {
                var a = "";
                this.files && this.files.length > 1 ? a = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length) : e.target.value && (a = e.target.value.split("\\").pop()), a ? t.find("span").html(a) : t.html(i)
            })
        })
    }, App
}(), App = function () {
    "use strict";
    return App.masks = function () {
        $("[data-mask='date']").mask("99/99/9999"), $("[data-mask='phone']").mask("(999) 999-9999"), $("[data-mask='phone-ext']").mask("(999) 999-9999? x99999"), $("[data-mask='phone-int']").mask("+33 999 999 999"), $("[data-mask='taxid']").mask("99-9999999"), $("[data-mask='ssn']").mask("999-99-9999"), $("[data-mask='product-key']").mask("a*-999-a999"), $("[data-mask='percent']").mask("99%"), $("[data-mask='currency']").mask("$999,999,999.99")
    }, App
}(), App = function () {
    "use strict";
    return App.formMultiselect = function () {
        $("#my-select").multiSelect(), $("#pre-selected-options").multiSelect(), $("#callbacks").multiSelect({
            afterSelect: function (e) {
                alert("Select value: " + e)
            }, afterDeselect: function (e) {
                alert("Deselect value: " + e)
            }
        }), $("#optgroup").multiSelect({selectableOptgroup: !0}), $("#disabled-attribute").multiSelect(), $("#custom-headers").multiSelect({
            selectableHeader: "<div class='custom-header'>Selectable items</div>",
            selectionHeader: "<div class='custom-header'>Selection items</div>"
        }), $("#searchable").multiSelect({
            selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            afterInit: function (e) {
                var t = this, i = t.$selectableUl.prev(), a = t.$selectionUl.prev(), o = "#" + t.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)", n = "#" + t.$container.attr("id") + " .ms-elem-selection.ms-selected";
                t.qs1 = i.quicksearch(o).on("keydown", function (e) {
                    if (40 === e.which)return t.$selectableUl.focus(), !1
                }), t.qs2 = a.quicksearch(n).on("keydown", function (e) {
                    if (40 == e.which)return t.$selectionUl.focus(), !1
                })
            },
            afterSelect: function () {
                this.qs1.cache(), this.qs2.cache()
            },
            afterDeselect: function () {
                this.qs1.cache(), this.qs2.cache()
            }
        })
    }, App
}(), App = function () {
    "use strict";
    return App.wizard = function () {
        $(".wizard-ux").wizard(), $(".wizard-ux").on("changed.fu.wizard", function () {
            $(".bslider").slider()
        }), $(".wizard-next").click(function (e) {
            var t = $(this).data("wizard");
            $(t).wizard("next"), e.preventDefault()
        }), $(".wizard-previous").click(function (e) {
            var t = $(this).data("wizard");
            $(t).wizard("previous"), e.preventDefault()
        }), $(".select2").select2({width: "100%"}), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $("#credit_slider").slider().on("slide", function (e) {
            $("#credits").html("$" + e.value)
        }), $("#rate_slider").slider().on("slide", function (e) {
            $("#rate").html(e.value + "%")
        })
    }, App
}(), App = function () {
    "use strict";
    return App.textEditors = function () {
        $("#editor1").summernote({height: 300})
    }, App
}(), App = function () {
    "use strict";
    return App.IconsFilter = function () {
        $(".select2").select2({width: "100%"});
        var e = [], t = $(".be-icons-list"), i = $(".icon-category", t), a = $(".input-search input", t), o = $("#icon-category", t);
        i.each(function (t, i) {
            $(".icon-class", i).each(function (t, a) {
                var o = {name: a.innerHTML, element: a, category: i};
                e.push(o)
            })
        }), a.on("keyup", function () {
            var a = [], n = $(this).val().toLowerCase();
            if ("all" == o.val() ? i.show() : $("#" + o.val()).show(), n) {
                $(".icon-visible", i).removeClass("icon-visible");
                var r = $.grep(e, function (e, t) {
                    var i = e.name.search(n) > -1;
                    return i && a.indexOf(e.category) < 0 && a.push(e.category), i
                });
                $.each(r, function (e, t) {
                    $(t.element).parents(".col-sm-6").addClass("icon-visible")
                }), t.addClass("hide-icons"), i.not(a).hide().addClass("icon-category--hide-icons")
            } else t.removeClass("hide-icons")
        }), o.on("change", function () {
            var e = $(this).val();
            "all" == e ? i.show() : (i.hide(), $("#" + e).show())
        })
    }, App
}(), App = function () {
    "use strict";
    return App.loaders = function () {
        $(".toggle-loading").on("click", function () {
            var e = $(this).parents(".widget, .card");
            e.length && (e.addClass("be-loading-active"), setTimeout(function () {
                e.removeClass("be-loading-active")
            }, 3e3))
        })
    }, App
}(), App = function () {
    "use strict";
    return App.mailCompose = function () {
        $(".tags").select2({tags: 0, width: "100%"}), $("#email-editor").summernote({height: 200})
    }, App
}(), App = function () {
    "use strict";
    return App.mailInbox = function () {
        $(".be-select-all input").on("change", function () {
            var e = $(".email-list").find('input[type="checkbox"]');
            $(this).is(":checked") ? e.prop("checked", !0) : e.prop("checked", !1)
        })
    }, App
}(), App = function () {
    "use strict";
    return App.mapsGoogle = function () {
        var e = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Map(document.getElementById("map_one"), e);
        e = {zoom: 14, center: new google.maps.LatLng(-33.877827, 151.188598), mapTypeId: google.maps.MapTypeId.HYBRID};
        new google.maps.Map(document.getElementById("map_two"), e);
        e = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        new google.maps.Map(document.getElementById("map_three"), e)
    }, App
}(), App = function () {
    "use strict";
    return App.mapsVector = function () {
        var e = App.color.primary, t = App.color.success, i = App.color.danger, a = App.color.warning, o = App.color.success, n = App.color.primary, r = tinycolor(App.color.grey).lighten(5).toString(), l = App.color.danger;
        $("#usa-map").vectorMap({
            map: "us_merc_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: e}, hover: {"fill-opacity": .8}}
        }), $("#france-map").vectorMap({
            map: "fr_merc_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: t}, hover: {"fill-opacity": .8}}
        }), $("#uk-map").vectorMap({
            map: "uk_mill_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: i}, hover: {"fill-opacity": .8}}
        }), $("#chicago-map").vectorMap({
            map: "us-il-chicago_mill_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: a}, hover: {"fill-opacity": .8}}
        }), $("#australia-map").vectorMap({
            map: "au_mill_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: o}, hover: {"fill-opacity": .8}}
        }), $("#india-map").vectorMap({
            map: "in_mill_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: n}, hover: {"fill-opacity": .8}}
        }), $("#vector-map").vectorMap({
            map: "map",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: r,
                    "fill-opacity": .8,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 1
                }, hover: {"fill-opacity": .8}
            },
            markerStyle: {initial: {r: 10}},
            markers: [{
                coords: [100, 100],
                name: "Marker 1",
                style: {fill: "#acb1b6", stroke: "#cfd5db", "stroke-width": 3}
            }, {coords: [200, 200], name: "Marker 2", style: {fill: "#acb1b6", stroke: "#cfd5db", "stroke-width": 3}}]
        }), $("#canada-map").vectorMap({
            map: "ca_lcc_en",
            backgroundColor: "transparent",
            regionStyle: {initial: {fill: l}, hover: {"fill-opacity": .8}}
        })
    }, App
}(), App = function () {
    "use strict";
    return App.pageCalendar = function () {
        $("#external-events .fc-event").each(function () {
            $(this).data("event", {title: $.trim($(this).text()), stick: !0}), $(this).draggable({
                zIndex: 999,
                revert: !0,
                revertDuration: 0
            })
        }), $("#calendar").fullCalendar({
            header: {
                left: "title",
                center: "",
                right: "month,agendaWeek,agendaDay, today, prev,next"
            },
            defaultDate: "2016-06-12",
            editable: !0,
            eventLimit: !0,
            droppable: !0,
            drop: function () {
                $("#drop-remove").is(":checked") && $(this).remove()
            },
            events: [{title: "All Day Event", start: "2016-06-01"}, {
                title: "Long Event",
                start: "2016-06-07",
                end: "2016-06-10"
            }, {id: 999, title: "Repeating Event", start: "2016-06-09T16:00:00"}, {
                id: 999,
                title: "Repeating Event",
                start: "2016-06-16T16:00:00"
            }, {title: "Conference", start: "2016-06-11", end: "2016-06-13"}, {
                title: "Meeting",
                start: "2016-06-12T10:30:00",
                end: "2016-06-12T12:30:00"
            }, {title: "Lunch", start: "2016-06-12T12:00:00"}, {
                title: "Meeting",
                start: "2016-06-12T14:30:00"
            }, {title: "Happy Hour", start: "2016-06-12T17:30:00"}, {
                title: "Dinner",
                start: "2016-06-12T20:00:00"
            }, {title: "Birthday Party", start: "2016-06-13T07:00:00"}, {
                title: "Click for Google",
                url: "http://google.com/",
                start: "2016-06-28"
            }]
        })
    }, App
}(), App = function () {
    "use strict";
    return App.pageGallery = function () {
        var e = $(".gallery-container");
        e.masonry({columnWidth: 0, itemSelector: ".item"}), $("#sidebar-collapse").click(function () {
            e.masonry()
        }), $(".image-zoom").magnificPopup({
            type: "image",
            mainClass: "mfp-with-zoom",
            zoom: {
                enabled: !0, duration: 300, easing: "ease-in-out", opener: function (e) {
                    return $(e).parents("div.img")
                }
            }
        }), e.masonry()
    }, App
}(), App = function () {
    "use strict";
    return App.pageProfile = function () {
        var e, t, i;
        t = App.color.primary, i = tinycolor(App.color.primary).lighten(22).toString(), $.plot($("#bar-chart1"), [{
            data: [[0, 7], [1, 13], [2, 17], [3, 20], [4, 26], [5, 37], [6, 35], [7, 28], [8, 38], [9, 38], [10, 32], [11, 25]],
            label: "Page Views"
        }, {
            data: [[0, 15], [1, 10], [2, 15], [3, 25], [4, 30], [5, 29], [6, 25], [7, 33], [8, 45], [9, 43], [10, 38], [11, 36]],
            label: "Unique Visitor"
        }], {
            series: {
                bars: {
                    order: 2,
                    align: "center",
                    show: !0,
                    barWidth: .3,
                    lineWidth: .7,
                    fill: !0,
                    fillColor: {colors: [{opacity: 1}, {opacity: 1}]}
                }, shadowSize: 2
            },
            legend: {show: !1},
            grid: {
                margin: 0,
                show: !1,
                labelMargin: 10,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [t, i],
            xaxis: {ticks: 11, tickDecimals: 0},
            yaxis: {ticks: 4, tickDecimals: 0}
        }), e = 60, $("#bar-chart1").bind("plothover", function (t, i, a) {
            var o = $(".tooltip-chart").width();
            a ? $(".tooltip-chart").css({
                top: a.pageY - e,
                left: a.pageX - o / 2
            }).fadeIn(200) : $(".tooltip-chart").hide()
        })
    }, App
}(), App = function () {
    "use strict";
    return App.tableFilters = function () {
        $(".bslider").bootstrapSlider({tooltip: "hide"}), $("#milestone_slider").slider().on("slide", function (e) {
            var t = e.value[0], i = e.value[1];
            $("#slider-value").html(t + "% - " + i + "%")
        }), $(".select2").select2({width: "100%"}), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {rightIcon: "mdi mdi-chevron-right", leftIcon: "mdi mdi-chevron-left"}
        })
    }, App
}(), App = function () {
    "use strict";
    return App.dataTables = function () {
        $.extend(!0, $.fn.dataTable.defaults, {dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6'f>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"}), $("#table1").dataTable(), $("#table2").dataTable({
            pageLength: 6,
            dom: "<'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        }), $("#table3").dataTable({
            buttons: ["copy", "excel", "pdf", "print"],
            lengthMenu: [[6, 10, 25, 50, -1], [6, 10, 25, 50, "All"]],
            dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        })
    }, App
}(), App = function () {
    "use strict";
    return App.uiNestableLists = function () {
        function e(e, t) {
            var i = $(e).nestable("serialize");
            $(t).html(window.JSON.stringify(i))
        }

        $(".dd").nestable(), e("#list1", "#out1"), e("#list2", "#out2"), $("#list1").on("change", function () {
            e("#list1", "#out1")
        }), $("#list2").on("change", function () {
            e("#list2", "#out2")
        })
    }, App
}(), App = function () {
    "use strict";
    return App.uiNotifications = function () {
        $("#not-basic").click(function () {
            return $.gritter.add({
                title: "Samantha new msg!",
                text: "You have a new Thomas message, let's checkout your inbox.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar.png",
                time: "",
                class_name: "img-rounded"
            }), !1
        }), $("#not-theme").click(function () {
            return $.gritter.add({
                title: "Welcome home!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar5.png",
                class_name: "clean img-rounded",
                time: ""
            }), !1
        }), $("#not-sticky").click(function () {
            return $.gritter.add({
                title: "Sticky Note",
                text: "Your daily goal is 130 new code lines, don't forget to update your work.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/slack_logo.png",
                class_name: "clean",
                sticky: !0,
                time: ""
            }), !1
        }), $("#not-text").click(function () {
            return $.gritter.add({
                title: "Just Text",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum.",
                class_name: "clean",
                time: ""
            }), !1
        }), $("#not-tr").click(function () {
            return $.extend($.gritter.options, {position: "top-right"}), $.gritter.add({
                title: "Top Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-tl").click(function () {
            return $.extend($.gritter.options, {position: "top-left"}), $.gritter.add({
                title: "Top Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-bl").click(function () {
            return $.extend($.gritter.options, {position: "bottom-left"}), $.gritter.add({
                title: "Bottom Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-br").click(function () {
            return $.extend($.gritter.options, {position: "bottom-right"}), $.gritter.add({
                title: "Bottom Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-facebook").click(function () {
            return $.gritter.add({
                title: "You have comments!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/fb-icon.png",
                class_name: "color facebook"
            }), !1
        }), $("#not-twitter").click(function () {
            return $.gritter.add({
                title: "You have new followers!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/tw-icon.png",
                class_name: "color twitter"
            }), !1
        }), $("#not-google-plus").click(function () {
            return $.gritter.add({
                title: "You have new +1!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/gp-icon.png",
                class_name: "color google-plus"
            }), !1
        }), $("#not-dribbble").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/db-icon.png",
                class_name: "color dribbble"
            }), !1
        }), $("#not-flickr").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/fl-icon.png",
                class_name: "color flickr"
            }), !1
        }), $("#not-linkedin").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/in-icon.png",
                class_name: "color linkedin"
            }), !1
        }), $("#not-youtube").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/yt-icon.png",
                class_name: "color youtube"
            }), !1
        }), $("#not-pinterest").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/pi-icon.png",
                class_name: "color pinterest"
            }), !1
        }), $("#not-github").click(function () {
            return $.gritter.add({
                title: "You have new forks!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/gh-icon.png",
                class_name: "color github"
            }), !1
        }), $("#not-tumblr").click(function () {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/tu-icon.png",
                class_name: "color tumblr"
            }), !1
        }), $("#not-primary").click(function () {
            $.gritter.add({
                title: "Primary",
                text: "This is a simple Gritter Notification.",
                class_name: "color primary"
            })
        }), $("#not-success").click(function () {
            $.gritter.add({
                title: "Success",
                text: "This is a simple Gritter Notification.",
                class_name: "color success"
            })
        }), $("#not-warning").click(function () {
            $.gritter.add({
                title: "Warning",
                text: "This is a simple Gritter Notification.",
                class_name: "color warning"
            })
        }), $("#not-danger").click(function () {
            $.gritter.add({title: "Danger", text: "This is a simple Gritter Notification.", class_name: "color danger"})
        }), $("#not-dark").click(function () {
            $.gritter.add({
                title: "Dark Color",
                text: "This is a simple Gritter Notification.",
                class_name: "color dark"
            })
        })
    }, App
}();