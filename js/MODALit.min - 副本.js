/*
 Modalit v0.2.2
 https://knot-design.jp/modalit/

 Author: Yuji Hisamatsu (https://github.com/knot-design)

 Copyright (C) 2017 Knot Design
 Licensed under the MIT license (MIT)

*/
!
function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : t.MODALit = e()
} (this,
function() {
        "use strict";
        function t(t) {
                this.modal = [],
                this.element = t.el && "string" != typeof t.el ? t.el: o(t.el || '[data-toggle="modal"]'),
                this.element.length < 2 && (this.element = 0 === this.element.length ? 0 : this.element[0]),
                this.options = r(t, b),
                this.element.length > 1 ? [].forEach.call(this.element, this.init.bind(this)) : this.init(this.element)
        }
        var e = document,
        i = window,
        n = t.prototype,
        a = !1,
        s = {
                capture: !0,
                passive: !0
        },
        o = function(t, i, n) {
                return i = i || e,
                i = !t.match(/\s/) && t[0].match(/(#|\.)/) ? "#" === t[0] ? i.getElementById(t.slice(1)) : i.getElementsByClassName(t.slice(1)) : i.querySelectorAll(t),
                n && void 0 !== i.length ? i[0] : i
        },
        r = function(t, e) {
                for (var i in e) try {
                        e[i].constructor === Object ? t[i] = r(t[i], e[i]) : void 0 === t[i] && (t[i] = e[i])
                } catch(n) {
                        t[i] = e[i]
                }
                return t
        },
        l = function(t, n) {
                var a, r, l = t && t.getAttribute("data-target") ? t.getAttribute("data-target") : n.target,
                u = l ? o(l, 0, 1) : "",
                v = t && t.getAttribute("data-src") ? t.getAttribute("data-src") : n.src;
                if (!u) {
                        u = e.createElement("div"),
                        e.body.appendChild(u),
                        t && ["title", "content", "footer"].forEach(function(e) {
                                null !== t.getAttribute("data-" + e) && (n[e] = t.getAttribute("data-" + e))
                        }),
                        a = '<div class="content">' + (v ? '<span class="loader"></span>': n.content) + "</div>";
                        var f = n.title ? "<header><h3>" + n.title + "</h3></header>": "";
                        if (n.footer) {
                                var p = n.action.fn ? n.cancel: n.action;
                                r = '<footer><button type="button" data-modal-btn="dismiss" class="' + p["class"] + '">' + p.label + "</button>%%</footer>",
                                r = r.replace("%%", n.action.fn ? '<button type="button" data-modal-btn="action" class="' + n.action["class"] + '">' + n.action.label + "</button>": "")
                        } else r = '<span data-modal-btn="dismiss"></span>';
                        u.innerHTML = '<div class="dialog">' + f + a + r + "</div>"
                }
                if (["transition", "position", "width"].forEach(function(e) {
                        n[e] = t && null !== t.getAttribute("data-" + e) ? t.getAttribute("data-" + e) : n[e],
                        n[e] && u.setAttribute("data-modal-" + e, n[e])
                }), u.classList.add("modalit"), u.setAttribute("aria-hidden", "true"), n.backdrop && u.classList.add("backdrop"), v) {
                        var b = o(".content", u, 1),
                        g = m(v, n.video.autoplay);
                        u.setAttribute("data-modal-media", g[1]),
                        u.addEventListener("modalit.load",
                        function() {
                                if (b.firstElementChild.classList.contains("loader")) if (u.setAttribute("data-modal-load", !1), "ajax" === g[1]) h(v,
                                function(t) {
                                        b.innerHTML = t,
                                        c(u)
                                });
                                else if ("image" === g[1]) {
                                        var e = new Image,
                                        n = t.getAttribute("data-caption") || 0;
                                        e.addEventListener("load",
                                        function() {
                                                this.classList.add(this.height > this.width ? "portrait": "landscape");
                                                var t = 88 * i.innerHeight / 100;
                                                b.innerHTML = n ? "<figure>" + this.outerHTML + "<figcaption>" + n + "</figcaption></figure>": this.outerHTML,
                                                "full" !== u.getAttribute("data-modal-width") && t < this.naturalHeight ? u.firstElementChild.style.width = t * (this.naturalWidth / this.naturalHeight) + "px": c(u),
                                                u.setAttribute("data-modal-load", !0)
                                        }),
                                        e.src = v
                                } else b.innerHTML = g[0],
                                b.firstElementChild.addEventListener("load",
                                function() {
                                        c(u)
                                })
                        },
                        s)
                }
                return d(u),
                u
        },
        d = function(t, e) {
                var i = 0,
                n = t.firstElementChild,
                a = t.getAttribute("data-modal-media"),
                s = o(".content", n, 1);
                if (a && "ajax" !== a) {
                        if ("full" !== t.getAttribute("data-modal-width") && /^(video|image)$/.test(a)) {
                                var r = s.firstElementChild;
                                r && (setTimeout(function() {
                                        n.clientHeight < s.clientHeight && (n.style.width = n.clientHeight * (r.clientWidth / r.clientHeight) + "px")
                                },
                                e ? 360 : 1), e && (n.style.width = ""))
                        }
                } else {
                        s.style.height = "",
                        s.classList.remove("scrollable"),
                        [].forEach.call(n.children,
                        function(t) {
                                i += t.tagName.match(/(header|footer)/i) ? t.clientHeight: 0
                        });
                        var l = n.offsetHeight - i;
                        s.clientHeight > l && (s.style.height = l + "px", s.classList.add("scrollable"))
                } ! t.classList.contains("backdrop") && "full" !== t.getAttribute("data-modal-width") && /^(centered|left|right)$/.test(t.getAttribute("data-modal-position")) && (n.style.marginTop = -(n.offsetHeight / 2) + "px")
        },
        c = function(t) {
                t.setAttribute("data-modal-load", !0),
                d(t)
        },
        m = function(t, e) {
                var i = t.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/),
                n = t.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/),
                a = t.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/),
                s = t.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/),
                o = t.match(/source\.unsplash\.com\/?/),
                r = t.match(/^.+.(jpg|jpeg|gif|png|svg)$/i);
                if (s) return ['<video src="' + t + '" width="640" height="360" controls="true"' + (e ? " autoplay": "") + "></video>", "video"];
                if (r || o) return [null, "image"];
                if (i && 11 === i[1].length) t = "//www.youtube.com/embed/" + i[1];
                else if (n && n[3].length) t = "//player.vimeo.com/video/" + n[3];
                else {
                        if (!a || !a[2].length) return [null, "ajax"];
                        t = "//www.dailymotion.com/embed/video/" + a[2]
                }
                return ['<iframe src="' + t + (e ? "?autoplay=1": "") + '" allowfullscreen="true" width="640" height="360"></iframe>', "video"]
        },
        h = function(t, e) {
                var i = new XMLHttpRequest;
                i.open("get", t),
                i.onload = function() {
                        200 == i.status ? e(i.responseText) : console.error("Request Error: " + i.status)
                },
                i.send()
        },
        u = function(t) {
                var e = o('[aria-hidden="false"].modalit', 0, 1),
                i = o(".content", e, 1),
                n = /^(video|image)/.test(e.getAttribute("data-modal-media")) || 0; (n || !n && (!i.classList.contains("scrollable") || i.classList.contains("scrollable") && !i.contains(t.target))) && t.preventDefault()
        },
        v = function(t) {
                t ? (e.body.style.overflowY = "hidden", !a && e.body.addEventListener("touchmove", u)) : o('[aria-hidden="false"].modalit.backdrop', 0, 1) || (e.body.style.overflowY = "", e.body.removeEventListener("touchmove", u))
        },
        f = function(t, i, n) {
                var a;
                try {
                        a = new CustomEvent(t, {
                                bubbles: !0,
                                detail: i
                        })
                } catch(s) {
                        a = document.createEvent("CustomEvent"),
                        a.initCustomEvent(event, !0, !1, i)
                } (n || e).dispatchEvent(a)
        },
        p = function(t, e) {
                try {
                        return t.closest(e)
                } catch(i) {
                        for (var n = t.webkitMatchesSelector ? "webkitMatchesSelector": t.msMatchesSelector ? "msMatchesSelector": "matches"; t;) {
                                if (t && t[n](e)) return t;
                                t = t.parentElement
                        }
                        return null
                }
        },
        b = {
                backdrop: !0,
                fixed: !0,
                position: "centered",
                footer: !0,
                action: {
                        label: "OK",
                        "class": "btn primary"
                },
                cancel: {
                        label: "Cancel",
                        "class": "btn light"
                },
                video: {
                        autoplay: !1,
                        destroy: !1
                },
                slider: !1,
                navi: !1,
                dismiss: {
                        backdrop: !0,
                        esc: !0
                }
        };
        return n.init = function(t) {
                var e = l(t, this.options);
                void 0 !== arguments[1] ? this.modal[arguments[1]] = e: this.modal = e,
                t && t.addEventListener("click", this.show.bind(this, e, arguments[1]), s)
        },
        n.show = function(t, n) {
                var a = null,
                s = this.options;
                t.setAttribute("aria-hidden", "false"),
                this.current = t,
                f("modalit.show", {
                        modal: t
                }),
                t.getAttribute("data-modal-media") && f("modalit.load", null, t),
                void 0 !== n && s.slider && this.slider(n),
                this.btn = {
                        trigger: void 0 !== n ? this.element[n] : this.element,
                        action: o('[data-modal-btn="action"]', t, 1),
                        cancel: o('[data-modal-btn="dismiss"]', t, 1)
                },
                this.btn.trigger && this.btn.trigger.classList.add("active"),
                d(t),
                this.listener = {},
                s.action.fn && (this.listener.action = s.action.fn.bind(this), this.btn.action.addEventListener("click", this.listener.action)),
                s.cancel.fn && (this.listener.cancel = s.cancel.fn.bind(this), this.btn.cancel.addEventListener("click", this.listener.cancel)),
                this.listener.dismiss = this.hide.bind(this),
                t.addEventListener("click", this.listener.dismiss),
                s.dismiss.esc && e.addEventListener("keyup", this.listener.dismiss),
                i.addEventListener("resize",
                function() {
                        clearTimeout(a),
                        a = setTimeout(d(t, !0), 200)
                }),
                s.backdrop && s.fixed && v(1)
        },
        n.hide = function(t) {
                var i = {
                        modal: this.current
                },
                n = !t;
                if (t && (void 0 !== t.keyCode ? n = 27 === t.keyCode: (this.btn.cancel.contains(t.target) || this.options.dismiss.backdrop && !a && !this.current.firstElementChild.contains(t.target)) && (n = !0), n && f("modalit.dismiss", i)), n) {
                        if (f("modalit.BeforeHide", i), this.current.setAttribute("aria-hidden", "true"), this.btn.trigger && this.btn.trigger.classList.remove("active"), this.options.fixed && this.options.backdrop && !a && v(), this.options.slider) {
                                var s = o('[data-modal-role="navi"]', 0, 1);
                                s && s.parentNode.removeChild(s)
                        }
                        this.listener.action && this.btn.action.removeEventListener("click", this.listener.action),
                        this.listener.cancel && this.btn.cancel.removeEventListener("click", this.listener.cancel),
                        this.current.removeEventListener("click", this.listener.dismiss),
                        this.options.dismiss.esc && e.removeEventListener("keyup", this.listener.dismiss),
                        "video" === this.current.getAttribute("data-modal-media") && this.options.video.destroy && (this.current.removeAttribute("data-modal-load"), o(".content", this.current, 1).innerHTML = '<span class="loader"></span>'),
                        f("modalit.hide", i)
                }
        },
        n.slider = function(t) {
                function n() {
                        var t, i = e.createElement("dummyelement"),
                        n = {
                                transition: "transitionend",
                                WebkitTransition: "webkitTransitionEnd",
                                OTransition: "oTransitionEnd",
                                MozTransition: "mozTransitionEnd"
                        };
                        for (t in n) if (void 0 !== i.style[t]) return n[t]
                }
                function r() {
                        if (f.options.navi) {
                                for (var i = e.createElement("nav"), n = "<ul>", a = 0; y > a; a++) n += '<li data-num="' + a + (a === t ? '" class="active': "") + '"></li>';
                                return n += "</ul>",
                                i.setAttribute("data-modal-role", "navi"),
                                i.setAttribute("aria-hidden", !0),
                                i.role = "navigation",
                                i.innerHTML = n,
                                e.body.appendChild(i),
                                {
                                        point: o("li", i),
                                        wrapper: i
                                }
                        }
                }
                function l(t) {
                        clearTimeout(A.scroll),
                        A.scroll = setTimeout(function() {
                                if (!p(t.target, ".scrollable")) {
                                        var e, n = i.event || t;
                                        n = n.originalEvent ? n.originalEvent: n,
                                        e = n.detail ? -40 * n.detail: n.wheelDelta,
                                        e && (t.preventDefault(), m( - e), b.removeEventListener(E, l, s))
                                }
                        },
                        T.scroll)
                }
                function d(t) {
                        if (void 0 !== t) {
                                var e = /^(mouse|pointer)/i.test(t.type) ? t: t.changedTouches[0];
                                if (t.type === w.start || t.type === w.move) if (M[t.type] = e.pageX, t.type === w.start) a = !1,
                                b.addEventListener(w.move, d, s);
                                else {
                                        a = !0;
                                        var i = -(M[w.start] - M[w.move]);
                                        g.style.msTransform = "translateX(" + i + "px)",
                                        g.style.transform = "translateX(" + i + "px)",
                                        b.addEventListener(w.end, d, s)
                                } else if (t.type === w.end) {
                                        var n = M[w.start] - M[w.move];
                                        if (! (a && M[w.move] > 0 && Math.abs(n) > M.length)) return a = !1,
                                        h();
                                        m(n)
                                }
                        }
                }
                function c(e) {
                        37 === e.keyCode ? u(t - 1) : 39 === e.keyCode && u(t + 1)
                }
                function m(e) {
                        var i = e > 0 ? -400 : 400;
                        g.style.msTransform = "translateX(" + i + "px)",
                        g.style.transform = "translateX(" + i + "px)",
                        g.style.opacity = 0,
                        H = h.bind(null, e > 0 ? t + 1 : t - 1),
                        C ? g.addEventListener(C, H) : (clearTimeout(A.anim), A.anim = setTimeout(H, T.anim))
                }
                function h(t) {
                        g.style.msTransform = "",
                        g.style.transform = "",
                        g.style.opacity = "",
                        void 0 !== t && (u(t), C && g.removeEventListener(C, H))
                }
                function u(e) {
                        return v(),
                        e = "number" != typeof e ? Number(e.target.getAttribute("data-num")) : e,
                        e === t ? !1 : (e = 0 > e ? y + e: e === y ? 0 : e, f.hide(), void f.show(f.modal[e], e))
                }
                function v(t) {
                        a = !1,
                        b.removeEventListener(E, l),
                        b.removeEventListener(w.start, d, s),
                        b.removeEventListener(w.move, d, s),
                        b.removeEventListener(w.end, d, s),
                        e.removeEventListener("keyup", c),
                        t && e.removeEventListener("modalit.dismiss", v)
                }
                var f = this,
                b = this.current,
                g = b.firstElementChild,
                y = this.modal.length,
                E = "onwheel" in e ? "wheel": "mousewheel" in e ? "mousewheel": "DOMMouseScroll",
                L = {
                        touch: "undefined" != typeof e.ontouchstart,
                        pointer: i.navigator.pointerEnabled,
                        msPointer: i.navigator.msPointerEnabled
                },
                w = {
                        start: L.pointer ? "pointerdown": L.msPointer ? "MSPointerDown": L.touch ? "touchstart": "mousedown",
                        move: L.pointer ? "pointermove": L.msPointer ? "MSPointerMove": L.touch ? "touchmove": "mousemove",
                        end: L.pointer ? "pointerup": L.msPointer ? "MSPointerUp": L.touch ? "touchend": "mouseup"
                },
                A = {
                        scroll: null,
                        anim: null
                },
                k = r(),
                T = {
                        scroll: 100,
                        anim: 410
                },
                M = {
                        length: 100
                },
                H = null,
                C = n();
                e.addEventListener("modalit.dismiss", v),
                k && [].forEach.call(k.point,
                function(t) {
                        t.addEventListener("click", u, s, s)
                }),
                e.addEventListener("keyup", c),
                b.addEventListener(w.start, d, s),
                b.addEventListener(E, l)
        },
        t
});