function toggleMenu() {
    var t = $("#site-navigation"),
    e = $("#menu-icon");
    $("#nav-toggle").click(function() {
        t.toggle(),
        e.toggleClass("active"),
        $("#site-header").toggleClass("modal")
    })
}
function portfolioScroll() {
    var t = navigator.userAgent,
    e = $(".portfolio-list--wrapper"),
    i = $(".portfolio-list");
    if ( - 1 == t.indexOf("Mobile")) {
        var n = $(".scroll-bar").slider({
            range: !0,
            slide: function(t, n) {
                i.width() > e.width() ? i.css("margin-left", Math.round(n.value / 100 * (e.width() - i.width())) + "px") : i.css("margin-left", 0)
            }
        });
    } else {
        $(".scroll-bar").remove(),
        $(".portfolio-list--outline").css({
            "overflow-x": "scroll"
        });
    }
}
function smoothScroll() {
    $(".portfolio").find("a[href*='#']").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            if (t = t.length ? t: $("[name=" + this.hash.slice(1) + "]"), t.length) {
                var e = t.position().top;
                return $(".page-container").animate({
                    scrollTop: e
                },
                1e3),
                console.log(e),
                console.log(t.offset()),
                console.log($("#main-content").offset()),
                !1
            }
        }
    });
    var t = $(".portfolio-details section"),
    e = $(".portfolio-nav");
    $(".page-container").on("scroll",
    function() {
        var i = $(this).scrollTop();
        t.each(function() {
            var n = $(this).position().top,
            o = n + $(this).outerHeight();
            i >= n && i <= o && (e.find("a").removeClass("active"), t.removeClass("active"), $(this).addClass("active"), e.find("a[href='#" + $(this).attr("id") + "']").addClass("active"))
        })
    })
}
function portfolioGuideNav() {
    $(".page-container").scroll(function() {
        $(this).scrollTop() > $(window).height() ? $(".portfolio-nav-panel").fadeIn() : ($("#menu-icon span").removeClass("active"), $(".portfolio-nav").hide(), !0 === $(".btn-hide").is(":visible") && ($(".btn-hide").hide(), $(".btn-guide").show()), $(".portfolio-nav-panel").fadeOut())
    }),
    $("#portfolio-nav-toggle").on("click",
    function() {
        $("#menu-icon span").toggleClass("active"),
        $(".portfolio-nav").slideToggle("slow"),
        $("#portfolio-nav-toggle .hint").toggle()
    })
}
function gearTransform() {
    var t = $(window).width(),
    e = $(".gear-canvas--wrapper").outerWidth();
    ratio = t / e,
    ratio < 1 && $(".gear-canvas--wrapper").css({
        "-webkit-transform": "scale(" + ratio + ")",
        "-moz-transform": "scale(" + ratio + ")",
        "-ms-transform": "scale(" + ratio + ")",
        "-o-transform": "scale(" + ratio + ")",
        transform: "scale(" + ratio + ")"
    })
}
function svgsnimations() {
    function t(t) {
        this.el = t,
        this.image = this.el.previousElementSibling,
        this.current_frame = 0,
        this.total_frames = 60,
        this.path = [],
        this.length = [],
        this.handle = 0,
        this.init()
    }
    function e() {
        var t = r.clientHeight,
        e = window.innerHeight;
        return t < e ? e: t
    }
    function i() {
        return window.pageYOffset || r.scrollTop
    }
    function n(t) {
        var e = 0,
        i = 0;
        do {
            isNaN(t.offsetTop) || (e += t.offsetTop), isNaN(t.offsetLeft) || (i += t.offsetLeft)
        } while ( t === t . offsetParent );
        return {
            top: e,
            left: i
        }
    }
    function o(t, o) {
        var a = t.offsetHeight,
        r = i(),
        s = r + e(),
        l = n(t).top,
        c = l + a;
        return l + a * (o || 0) <= s && c >= r
    }
    function a() {
        var e = Array.prototype.slice.call(document.querySelectorAll(".drawings svg")),
        i = [],
        n = !1,
        a;
        e.forEach(function(e, n) {
            var a = new t(e);
            i[n] = a,
            setTimeout(function(t) {
                return function() {
                    o(t.parentNode) && a.render()
                }
            } (e), 250)
        });
        var r = function() {
            n || (n = !0, setTimeout(function() {
                s()
            },
            60))
        },
        s = function() {
            e.forEach(function(t, e) {
                o(t.parentNode, .5) && i[e].render()
            }),
            n = !1
        },
        l = function() {
            function t() {
                s(),
                a = null
            }
            a && clearTimeout(a),
            a = setTimeout(t, 200);
        };
        window.addEventListener("scroll", r, !1),
        window.addEventListener("resize", l, !1)
    }
    var r = window.document.documentElement;
    window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
    } (),
    window.cancelAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
        function(t) {
            window.clearTimeout(t)
        }
    } (),
    t.prototype.init = function() {
        var t = this; [].slice.call(this.el.querySelectorAll("path")).forEach(function(e, i) {
            t.path[i] = e;
            var n = t.path[i].getTotalLength();
            t.length[i] = n,
            t.path[i].style.strokeDasharray = n + " " + n,
            t.path[i].style.strokeDashoffset = n;
        })
    },
    t.prototype.render = function() {
        this.rendered || (this.rendered = !0, this.draw())
    },
    t.prototype.draw = function() {
        var t = this,
        e = this.current_frame / this.total_frames;
        if (e > 1) {
            window.cancelAnimFrame(this.handle);
        } else {
            this.current_frame++;
            for (var i = 0,
            n = this.path.length; i < n; i++) {
                this.path[i].style.strokeDashoffset = Math.floor(this.length[i] * (1 - e));
            }
            this.handle = window.requestAnimFrame(function() {
                t.draw()
            })
        }
    },
    a()
}
function lettering() {
    function t(t, e, i, n) {
        var o = t.text(),
        a = o.split(e),
        r = "";
        a.length && ($(a).each(function(t, e) {
            r += '<span class="' + i + (t + 1) + '" aria-hidden="true">' + e + "</span>" + n
        }), t.attr("aria-label", o).empty().append(r))
    }
    var e = {
        init: function() {
            return this.each(function() {
                t($(this), "", "char", "")
            })
        },
        words: function() {
            return this.each(function() {
                t($(this), " ", "word", " ")
            })
        },
        lines: function() {
            return this.each(function() {
                var e = "eefec303079ad17405c889e092e105b0";
                t($(this).children("br").replaceWith(e).end(), e, "line", "")
            })
        }
    };
    $.fn.lettering = function(t) {
        return t && e[t] ? e[t].apply(this, [].slice.call(arguments, 1)) : "letters" !== t && t ? ($.error("Method " + t + " does not exist on jQuery.lettering"), this) : e.init.apply(this, [].slice.call(arguments, 0))
    }
}
function funnytxt() {
    function t(t) {
        return / In /.test(t) || $.inArray(t, $.fn.textillate.defaults.inEffects) >= 0
    }
    function e(t) {
        return / Out /.test(t) || $.inArray(t, $.fn.textillate.defaults.outEffects) >= 0
    }
    function i(t) {
        return "true" !== t && "false" !== t ? t: "true" === t
    }
    function n(t) {
        var e = t.attributes || [],
        n = {};
        return e.length ? ($.each(e,
        function(t, e) {
            var o = e.nodeName.replace(/delayscale/, "delayScale");
            /^data-in-*/.test(o) ? (n. in =n. in ||{},
            n. in [o.replace(/data-in-/, "")] = i(e.nodeValue)) : /^data-out-*/.test(o) ? (n.out = n.out || {},
            n.out[o.replace(/data-out-/, "")] = i(e.nodeValue)) : /^data-*/.test(o) && (n[o] = i(e.nodeValue));
        }), n) : n
    }
    function o(t) {
        for (var e, i, n = t.length; n; e = parseInt(Math.random() * n), i = t[--n], t[n] = t[e], t[e] = i);
        return t
    }
    function a(t, e, i) {
        t.addClass("animated " + e).css("visibility", "visible").show(),
        t.one("animationend webkitAnimationEnd oAnimationEnd",
        function() {
            t.removeClass("animated " + e),
            i && i()
        })
    }
    function r(i, n, r) {
        var s = this,
        l = i.length;
        if (!l) {
            return void(r && r());
        }
        n.shuffle && (i = o(i)),
        n.reverse && (i = i.toArray().reverse()),
        $.each(i,
        function(i, o) {
            function s() {
                t(n.effect) ? c.css("visibility", "visible") : e(n.effect) && c.css("visibility", "hidden"),
                !(l -= 1) && r && r()
            }
            var c = $(o),
            f = n.sync ? n.delay: n.delay * i * n.delayScale;
            c.text() ? setTimeout(function() {
                a(c, n.effect, s)
            },
            f) : s()
        })
    }
    var s = function(i, o) {
        var a = this,
        s = $(i);
        a.init = function() {
            a.$texts = s.find(o.selector),
            a.$texts.length || (a.$texts = $('<ul class="texts"><li>' + s.html() + "</li></ul>"), s.html(a.$texts)),
            a.$texts.hide(),
            a.$current = $("<span>").text(a.$texts.find(":first-child").html()).prependTo(s),
            t(o. in .effect) ? a.$current.css("visibility", "hidden") : e(o.out.effect) && a.$current.css("visibility", "visible"),
            a.setOptions(o),
            a.timeoutRun = null,
            setTimeout(function() {
                a.options.autoStart && a.start()
            },
            a.options.initialDelay)
        },
        a.setOptions = function(t) {
            a.options = t;
        },
        a.triggerEvent = function(t) {
            var e = $.Event(t + ".tlt");
            return s.trigger(e, a),
            e;
        },
        a. in =function(i, o) {
            i = i || 0;
            var s = a.$texts.find(":nth-child(" + (i + 1) + ")"),
            l = $.extend(!0, {},
            a.options, s.length ? n(s[0]) : {}),
            c;
            s.addClass("current"),
            a.triggerEvent("inAnimationBegin"),
            a.$current.text(s.html()).lettering("words"),
            a.$current.find('[class^="word"]').css({
                display: "inline-block",
                "-webkit-transform": "translate3d(0,0,0)",
                "-moz-transform": "translate3d(0,0,0)",
                "-o-transform": "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)"
            }).each(function() {
                $(this).lettering()
            }),
            c = a.$current.find('[class^="char"]').css("display", "inline-block"),
            t(l. in .effect) ? c.css("visibility", "hidden") : e(l. in .effect) && c.css("visibility", "visible"),
            a.currentIndex = i,
            r(c, l. in ,
            function() {
                a.triggerEvent("inAnimationEnd"),
                l. in .callback && l. in .callback(),
                o && o(a)
            })
        },
        a.out = function(t) {
            var e = a.$texts.find(":nth-child(" + (a.currentIndex + 1) + ")"),
            i = a.$current.find('[class^="char"]'),
            o = $.extend(!0, {},
            a.options, e.length ? n(e[0]) : {});
            a.triggerEvent("outAnimationBegin"),
            r(i, o.out,
            function() {
                e.removeClass("current"),
                a.triggerEvent("outAnimationEnd"),
                o.out.callback && o.out.callback(),
                t && t(a)
            })
        },
        a.start = function(t) {
            a.triggerEvent("start"),
            function t(e) {
                a. in (e,
                function() {
                    var i = a.$texts.children().length;
                    e += 1,
                    !a.options.loop && e >= i ? (a.options.callback && a.options.callback(), a.triggerEvent("end")) : (e %= i, a.timeoutRun = setTimeout(function() {
                        a.out(function() {
                            t(e)
                        })
                    },
                    a.options.minDisplayTime))
                })
            } (t || 0)
        },
        a.stop = function() {
            a.timeoutRun && (clearInterval(a.timeoutRun), a.timeoutRun = null);
        },
        a.init()
    };
    $.fn.textillate = function(t, e) {
        return this.each(function() {
            var i = $(this),
            o = i.data("textillate"),
            a = $.extend(!0, {},
            $.fn.textillate.defaults, n(this), "object" == typeof t && t);
            o ? "string" == typeof t ? o[t].apply(o, [].concat(e)) : o.setOptions.call(o, a) : i.data("textillate", o = new s(this, a));
        })
    },
    $.fn.textillate.defaults = {
        selector: ".texts",
        loop: !1,
        minDisplayTime: 2e3,
        initialDelay: 0,
        in:{
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: !1,
            reverse: !1,
            shuffle: !1,
            callback: function() {}
        },
        out: {
            effect: "hinge",
            delayScale: 1.5,
            delay: 50,
            sync: !1,
            reverse: !1,
            shuffle: !1,
            callback: function() {}
        },
        autoStart: !0,
        inEffects: [],
        outEffects: ["hinge"],
        callback: function() {}
    }
}
function txt() {
    $(".tlt").textillate({
        minDisplayTime: 500,
        initialDelay: 0,
        autoStart: !0,
        in:{
            effect: "bounceIn",
            delay: 50
        },
        out: {
            effect: "bounceOut",
            delayScale: 1,
            delay: 50,
            shuffle: !0
        },
        loop: !0
    })
}
function detectDevice() {
    var t = navigator.userAgent,
    e = $(window).width(),
    i = $(window).height();
    if (console.log(t), console.log(e, i), e < 321 && $("#copy-right").replaceWith("<div id='copyright'>(c) 2008-2017 by 4EB Studio all rights reserved.</div>"), t.indexOf("AppleWebKit")) {
        var n = $(window).height() - 16;
        $(".page-border").height(n)
    }
    e < 1025 ? $("#portfolio-slider").removeClass().addClass("slides") : $("#portfolio-slider").removeClass().addClass("slides-v")
}
function work() {
    $(".work-detail .panel").hide(),
    $(".work-detail .panel:first").show(),
    $(".work-detail-nav li a").click(function() {
        var t = $(this).attr("href");
        $(".work-detail-nav li a").removeClass("active"),
        $(this).addClass("active"),
        $(".work-detail section").hide(),
        $(t).show()
    })
}
var pageTransition = {
    init: function(t) {
        pageTransition.config = {
            container: $("#main-content"),
            triggerAll: $("a.page-transit"),
            overlay: $("<section class='target--overlay'></section>"),
            target: $(".target--overlay")
        },
        $.extend(pageTransition.config, t),
        pageTransition.setup(),
        $(window).on("popstate",
        function(t) {
            var e = t.state;
            $("title").html(t.originalEvent.state.title),
            $("#main-content").html(t.originalEvent.state.content),
            $("body").removeClass().addClass(t.originalEvent.state.bodyclass)
        }),
        $(window).on("load",
        function() {
            id = $("body").data("id"),
            $("body").hasClass("layout--work") && pageTransition.createTarget(id)
        })
    },
    setup: function() {
        pageTransition.config.triggerAll.on("click",
        function(t) {
            t.preventDefault(),
            url = $(this).attr("href"),
            pageTitle = $(this).attr("rel"),
            pageLayout = $(this).attr("data-layout"),
            $(this).hasClass("goto--page") ? (offset = $(this).find("picture").offset(), width = $(this).find("picture").outerWidth(), height = $(this).find("picture").outerHeight(), id = $(this).attr("rel"), pageTransition.pageLoad(offset, width, height, id), pageTransition.getContent(url)) : $(this).hasClass("backto--page") ? (offset = $(this).offset(), width = $(this).outerWidth(), height = $(this).outerHeight(), ripple = pageTransition.config.target, pageTransition.pageClose(ripple, offset, width, height), pageTransition.getContent(url)) : $(this).hasClass("page--navi") ? (offset = $(this).offset(), width = $(this).outerWidth(), height = $(this).outerHeight(), id = $(this).attr("rel"), pageTransition.config.target.remove(), pageTransition.pageLoad(offset, width, height, id), pageTransition.getContent(url)) : $(this).hasClass("menu-item") ? (pageTransition.indexMenuTrigger(), setTimeout(function() {
                pageTransition.getContent(url)
            },
            500)) : pageTransition.getContent(url)
        })
    },
    getContent: function() {
        $.get(url,
        function(t) {
            newTitle = "4EB Studio - " + pageTitle,
            newBodyClass = "layout--" + pageLayout + " page--" + pageTitle,
            $("title").html(newTitle),
            $("body").removeClass().addClass(newBodyClass),
            pageTransition.config.container.html($(t).find("#main-content").html()),
            state = {
                title: $("title").html(),
                content: $("#main-content").html(),
                bodyclass: $("body").attr("class"),
                back: !0
            },
            history.pushState(state, newTitle, url, portfolioScroll(), smoothScroll(), portfolioGuideNav(), toggleMenu(), gearTransform(), work(), detectDevice()),
            pageTransition.init()
        })
    },
    createTarget: function(t) {
        pageTransition.config.overlay.prependTo("body").addClass(t).css({
            position: "absolute",
            opacity: 1,
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            "border-radius": "50%",
            transform: "scale(0)",
            "z-index": 99999
        })
    },
    pageLoad: function(t, e, i, n) {
        $(".page-border").css("opacity", 0),
        pageTransition.config.overlay.prependTo("body").addClass("portfolio--" + n).css({
            position: "absolute",
            opacity: 1,
            width: 0,
            height: 0,
            left: t.left + e / 2,
            top: t.top + i / 2,
            "z-index": 99999
        }).animate({
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            opacity: 1
        },
        800,
        function() {
            $(this).css({
                width: 0,
                height: 0,
                "border-radius": "50%",
                transform: "scale(0)"
            }),
            $(".page-border").css("opacity", 1),
            $(".page-container").scrollTop(0)
        })
    },
    pageClose: function() {
        $(".page-border").css("opacity", 0),
        pageTransition.clickRipple(ripple, offset, width, height),
        setTimeout(function() {
            pageTransition.config.target.remove(),
            $(".page-border").animate({
                opacity: 1
            })
        },
        500)
    },
    clickRipple: function(t, e, i, n) {
        $(window).width() > 600 ? i <= n ? n = i: i = n: (i = 15, n = 15),
        $(".target--overlay").css({
            width: i,
            height: n,
            top: e.top + n / 2,
            left: e.left + i / 2
        }).addClass("rippleEffect")
    },
    indexMenuTrigger: function() {
        blockOne = $("#home-navigation--wrapper"),
        blockTwo = $("#home-portfolio-list--wrapper");
        var t = $(window).height();
        blockOne_posY = (t - 16 - blockOne.height()) / 2,
        blockTwo_posY = (t - 16 - blockTwo.height()) / 2,
        blockOne.css({
            position: "absolute",
            left: 0,
            top: blockOne_posY
        }).animate({
            left: "-100%"
        },
        "slow"),
        blockTwo.css({
            position: "absolute",
            right: 0,
            top: blockTwo_posY
        }).animate({
            right: "-100%"
        },
        "slow")
    }
},
siteLoading = {
    init: function(t) {
        siteLoading.config = {
            loader: $("#logo-svg"),
            landing: $("#landing-container"),
            enter: $("#enter-link"),
            container: $(".page-border"),
            vw: $(window).width(),
            vh: $(window).height(),
            overlay: $("<section class='enter--overlay'></section>"),
            device: navigator.userAgent
        },
        $.extend(siteLoading.config, t),
        siteLoading.setup()
    },
    setup: function() {
        $("html").hasClass("lt-ie10") ? siteLoading.ie() : (siteLoading.loading(), $(window).on("load",
        function() {
            siteLoading.transform(),
            siteLoading.ready()
        }), siteLoading.config.enter.on("click",
        function() {
            siteLoading.enter()
        }))
    },
    ie: function() {
        $("#loading").remove(),
        $(".page-border").remove(),
        $("body").load("ie.html")
    },
    loading: function() {
        var t = siteLoading.config.loader.width(),
        e = siteLoading.config.loader.height(),
        i = (siteLoading.config.vw - t) / 2,
        n = (siteLoading.config.vh - e) / 2;
        siteLoading.config.loader.css({
            left: i,
            top: n
        })
    },
    transform: function() {
        var t = $(window).width(),
        e = $("#mbp-drawing svg").width();
        if (ratio = t / e, t < 800 && $("#mbp-wrapper").css({
            "-webkit-transform": "scale(" + ratio + ")",
            "-moz-transform": "scale(" + ratio + ")",
            "-ms-transform": "scale(" + ratio + ")",
            "-o-transform": "scale(" + ratio + ")",
            transform: "scale(" + ratio + ")"
        }), t < 800) var i = $("#mbp-drawing svg").height() * ratio;
        else var i = $("#mbp-drawing svg").height();
        var n = $(window).height();
        enterLinkPos = (n / 2 - i / 2) / 2,
        mbpWrapperHeight = n - enterLinkPos,
        $("#enter-link").offset({
            top: mbpWrapperHeight
        })
    },
    ready: function() { - 1 == siteLoading.config.device.indexOf("Mobile") ? left = "60px": left = "auto",
        siteLoading.config.loader.delay(3500).animate({
            left: left,
            top: "85px",
            transform: 0
        },
        "slow",
        function() {
            $(this).removeClass("loading"),
            siteLoading.config.landing.find("#about-us").hide(),
            siteLoading.config.landing.show(),
            svgsnimations(),
            siteLoading.config.landing.find("#about-us").delay(1500).fadeIn("slow")
        })
    },
    enter: function() {
        siteLoading.config.overlay.prependTo("body").css({
            position: "absolute",
            opacity: 0,
            width: 0,
            height: 0,
            left: "50vw",
            top: "50vh",
            background: "white",
            "z-index": 99999
        }).animate({
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            opacity: 1
        },
        "slow",
        function() {
            $("#loading").remove(),
            $(".enter--overlay").remove()
        })
    }
}; !
function() {
    "use strict";
    siteLoading.init(),
    pageTransition.init(),
    portfolioScroll(),
    detectDevice(),
    toggleMenu(),
    smoothScroll(),
    portfolioGuideNav(),
    gearTransform(),
    lettering(),
    funnytxt(),
    txt(),
    work(),
    $.preloadImages = function() {
        for (var t = 0; t < arguments.length; t++) {
            $("<img />").attr("src", arguments[t]);
        }
    },
    $.preloadImages(),
    $(window).resize(function() {
        gearTransform(),
        siteLoading.transform(),
        detectDevice()
    })
} ();