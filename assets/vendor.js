function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

(function ($) {
  var $ = (jQuery = $);
  var define = null;
  /*! lazysizes - v4.0.1 */

  !(function (a, b) {
    var c = b(a, a.document);
    (a.lazySizes = c),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
        module.exports &&
        (module.exports = c);
  })(window, function (a, b) {
    "use strict";

    if (b.getElementsByClassName) {
      var c,
        d,
        e = b.documentElement,
        f = a.Date,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h],
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function r(a, b) {
          return (
            p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")),
            p[b].test(a[i]("class") || "") && p[b]
          );
        },
        s = function s(a, b) {
          r(a, b) ||
            a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
        },
        t = function t(a, b) {
          var c;
          (c = r(a, b)) &&
            a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
        },
        u = function u(a, b, c) {
          var d = c ? h : "removeEventListener";
          c && u(a, b),
            o.forEach(function (c) {
              a[d](c, b);
            });
        },
        v = function v(a, d, e, f, g) {
          var h = b.createEvent("CustomEvent");
          return (
            e || (e = {}),
            (e.instance = c),
            h.initCustomEvent(d, !f, !g, e),
            a.dispatchEvent(h),
            h
          );
        },
        w = function w(b, c) {
          var e;
          !g && (e = a.picturefill || d.pf)
            ? e({
                reevaluate: !0,
                elements: [b],
              })
            : c && c.src && (b.src = c.src);
        },
        x = function x(a, b) {
          return (getComputedStyle(a, null) || {})[b];
        },
        y = function y(a, b, c) {
          for (
            c = c || a.offsetWidth;
            c < d.minSize && b && !a._lazysizesWidth;

          ) {
            (c = b.offsetWidth), (b = b.parentNode);
          }

          return c;
        },
        z = (function () {
          var a,
            c,
            d = [],
            e = [],
            f = d,
            g = function g() {
              var b = f;

              for (f = d.length ? e : d, a = !0, c = !1; b.length; ) {
                b.shift()();
              }

              a = !1;
            },
            h = function h(d, e) {
              a && !e
                ? d.apply(this, arguments)
                : (f.push(d), c || ((c = !0), (b.hidden ? k : l)(g)));
            };

          return (h._lsFlush = g), h;
        })(),
        A = function A(a, b) {
          return b
            ? function () {
                z(a);
              }
            : function () {
                var b = this,
                  c = arguments;
                z(function () {
                  a.apply(b, c);
                });
              };
        },
        B = function B(a) {
          var b,
            c = 0,
            e = 125,
            g = d.ricTimeout,
            h = function h() {
              (b = !1), (c = f.now()), a();
            },
            i =
              m && d.ricTimeout
                ? function () {
                    m(h, {
                      timeout: g,
                    }),
                      g !== d.ricTimeout && (g = d.ricTimeout);
                  }
                : A(function () {
                    k(h);
                  }, !0);

          return function (a) {
            var d;
            (a = a === !0) && (g = 33),
              b ||
                ((b = !0),
                (d = e - (f.now() - c)),
                0 > d && (d = 0),
                a || (9 > d && m) ? i() : k(i, d));
          };
        },
        C = function C(a) {
          var b,
            c,
            d = 99,
            e = function e() {
              (b = null), a();
            },
            g = function g() {
              var a = f.now() - c;
              d > a ? k(g, d - a) : (m || e)(e);
            };

          return function () {
            (c = f.now()), b || (b = k(g, d));
          };
        };

      !(function () {
        var b,
          c = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: !0,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: !0,
            ricTimeout: 300,
          };
        d = a.lazySizesConfig || a.lazysizesConfig || {};

        for (b in c) {
          b in d || (d[b] = c[b]);
        }

        (a.lazySizesConfig = d),
          k(function () {
            d.init && F();
          });
      })();

      var D = (function () {
          var g,
            l,
            m,
            o,
            p,
            y,
            D,
            F,
            G,
            H,
            I,
            J,
            K,
            L,
            M = /^img$/i,
            N = /^iframe$/i,
            O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
            P = 0,
            Q = 0,
            R = 0,
            S = -1,
            T = function T(a) {
              R--,
                a && a.target && u(a.target, T),
                (!a || 0 > R || !a.target) && (R = 0);
            },
            U = function U(a, c) {
              var d,
                f = a,
                g =
                  "hidden" == x(b.body, "visibility") ||
                  "hidden" != x(a, "visibility");

              for (
                F -= c, I += c, G -= c, H += c;
                g && (f = f.offsetParent) && f != b.body && f != e;

              ) {
                (g = (x(f, "opacity") || 1) > 0),
                  g &&
                    "visible" != x(f, "overflow") &&
                    ((d = f.getBoundingClientRect()),
                    (g =
                      H > d.left &&
                      G < d.right &&
                      I > d.top - 1 &&
                      F < d.bottom + 1));
              }

              return g;
            },
            V = function V() {
              var a,
                f,
                h,
                j,
                k,
                m,
                n,
                p,
                q,
                r = c.elements;

              if ((o = d.loadMode) && 8 > R && (a = r.length)) {
                (f = 0),
                  S++,
                  null == K &&
                    ("expand" in d ||
                      (d.expand =
                        e.clientHeight > 500 && e.clientWidth > 500
                          ? 500
                          : 370),
                    (J = d.expand),
                    (K = J * d.expFactor)),
                  K > Q && 1 > R && S > 2 && o > 2 && !b.hidden
                    ? ((Q = K), (S = 0))
                    : (Q = o > 1 && S > 1 && 6 > R ? J : P);

                for (; a > f; f++) {
                  if (r[f] && !r[f]._lazyRace)
                    if (O) {
                      if (
                        (((p = r[f][i]("data-expand")) && (m = 1 * p)) ||
                          (m = Q),
                        q !== m &&
                          ((y = innerWidth + m * L),
                          (D = innerHeight + m),
                          (n = -1 * m),
                          (q = m)),
                        (h = r[f].getBoundingClientRect()),
                        (I = h.bottom) >= n &&
                          (F = h.top) <= D &&
                          (H = h.right) >= n * L &&
                          (G = h.left) <= y &&
                          (I || H || G || F) &&
                          (d.loadHidden || "hidden" != x(r[f], "visibility")) &&
                          ((l && 3 > R && !p && (3 > o || 4 > S)) ||
                            U(r[f], m)))
                      ) {
                        if ((ba(r[f]), (k = !0), R > 9)) break;
                      } else
                        !k &&
                          l &&
                          !j &&
                          4 > R &&
                          4 > S &&
                          o > 2 &&
                          (g[0] || d.preloadAfterLoad) &&
                          (g[0] ||
                            (!p &&
                              (I ||
                                H ||
                                G ||
                                F ||
                                "auto" != r[f][i](d.sizesAttr)))) &&
                          (j = g[0] || r[f]);
                    } else ba(r[f]);
                }

                j && !k && ba(j);
              }
            },
            W = B(V),
            X = function X(a) {
              s(a.target, d.loadedClass),
                t(a.target, d.loadingClass),
                u(a.target, Z),
                v(a.target, "lazyloaded");
            },
            Y = A(X),
            Z = function Z(a) {
              Y({
                target: a.target,
              });
            },
            $ = function $(a, b) {
              try {
                a.contentWindow.location.replace(b);
              } catch (c) {
                a.src = b;
              }
            },
            _ = function _(a) {
              var b,
                c = a[i](d.srcsetAttr);
              (b = d.customMedia[a[i]("data-media") || a[i]("media")]) &&
                a.setAttribute("media", b),
                c && a.setAttribute("srcset", c);
            },
            aa = A(function (a, b, c, e, f) {
              var g, h, j, l, o, p;
              (o = v(a, "lazybeforeunveil", b)).defaultPrevented ||
                (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)),
                (h = a[i](d.srcsetAttr)),
                (g = a[i](d.srcAttr)),
                f && ((j = a.parentNode), (l = j && n.test(j.nodeName || ""))),
                (p = b.firesLoad || ("src" in a && (h || g || l))),
                (o = {
                  target: a,
                }),
                p &&
                  (u(a, T, !0),
                  clearTimeout(m),
                  (m = k(T, 2500)),
                  s(a, d.loadingClass),
                  u(a, Z, !0)),
                l && q.call(j.getElementsByTagName("source"), _),
                h
                  ? a.setAttribute("srcset", h)
                  : g && !l && (N.test(a.nodeName) ? $(a, g) : (a.src = g)),
                f &&
                  (h || l) &&
                  w(a, {
                    src: g,
                  })),
                a._lazyRace && delete a._lazyRace,
                t(a, d.lazyClass),
                z(function () {
                  (!p || (a.complete && a.naturalWidth > 1)) &&
                    (p ? T(o) : R--, X(o));
                }, !0);
            }),
            ba = function ba(a) {
              var b,
                c = M.test(a.nodeName),
                e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
                f = "auto" == e;
              ((!f && l) ||
                !c ||
                (!a[i]("src") && !a.srcset) ||
                a.complete ||
                r(a, d.errorClass) ||
                !r(a, d.lazyClass)) &&
                ((b = v(a, "lazyunveilread").detail),
                f && E.updateElem(a, !0, a.offsetWidth),
                (a._lazyRace = !0),
                R++,
                aa(a, b, f, e, c));
            },
            ca = function ca() {
              if (!l) {
                if (f.now() - p < 999) return void k(ca, 999);
                var a = C(function () {
                  (d.loadMode = 3), W();
                });
                (l = !0),
                  (d.loadMode = 3),
                  W(),
                  j(
                    "scroll",
                    function () {
                      3 == d.loadMode && (d.loadMode = 2), a();
                    },
                    !0
                  );
              }
            };

          return {
            _: function _() {
              (p = f.now()),
                (c.elements = b.getElementsByClassName(d.lazyClass)),
                (g = b.getElementsByClassName(
                  d.lazyClass + " " + d.preloadClass
                )),
                (L = d.hFac),
                j("scroll", W, !0),
                j("resize", W, !0),
                a.MutationObserver
                  ? new MutationObserver(W).observe(e, {
                      childList: !0,
                      subtree: !0,
                      attributes: !0,
                    })
                  : (e[h]("DOMNodeInserted", W, !0),
                    e[h]("DOMAttrModified", W, !0),
                    setInterval(W, 999)),
                j("hashchange", W, !0),
                [
                  "focus",
                  "mouseover",
                  "click",
                  "load",
                  "transitionend",
                  "animationend",
                  "webkitAnimationEnd",
                ].forEach(function (a) {
                  b[h](a, W, !0);
                }),
                /d$|^c/.test(b.readyState)
                  ? ca()
                  : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)),
                c.elements.length ? (V(), z._lsFlush()) : W();
            },
            checkElems: W,
            unveil: ba,
          };
        })(),
        E = (function () {
          var a,
            c = A(function (a, b, c, d) {
              var e, f, g;
              if (
                ((a._lazysizesWidth = d),
                (d += "px"),
                a.setAttribute("sizes", d),
                n.test(b.nodeName || ""))
              )
                for (
                  e = b.getElementsByTagName("source"), f = 0, g = e.length;
                  g > f;
                  f++
                ) {
                  e[f].setAttribute("sizes", d);
                }
              c.detail.dataAttr || w(a, c.detail);
            }),
            e = function e(a, b, d) {
              var e,
                f = a.parentNode;
              f &&
                ((d = y(a, f, d)),
                (e = v(a, "lazybeforesizes", {
                  width: d,
                  dataAttr: !!b,
                })),
                e.defaultPrevented ||
                  ((d = e.detail.width),
                  d && d !== a._lazysizesWidth && c(a, f, e, d)));
            },
            f = function f() {
              var b,
                c = a.length;
              if (c)
                for (b = 0; c > b; b++) {
                  e(a[b]);
                }
            },
            g = C(f);

          return {
            _: function _() {
              (a = b.getElementsByClassName(d.autosizesClass)), j("resize", g);
            },
            checkElems: g,
            updateElem: e,
          };
        })(),
        F = function F() {
          F.i || ((F.i = !0), E._(), D._());
        };

      return (c = {
        cfg: d,
        autoSizer: E,
        loader: D,
        init: F,
        uP: w,
        aC: s,
        rC: t,
        hC: r,
        fire: v,
        gW: y,
        rAF: z,
      });
    }
  });
  /*! lazysizes - rias */

  !(function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    (b = b.bind(null, a, a.document)),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
      module.exports
        ? b(require("lazysizes"))
        : a.lazySizes
        ? c()
        : a.addEventListener("lazyunveilread", c, !0);
  })(window, function (a, b, c) {
    "use strict";

    function d(b, c) {
      var d,
        e,
        f,
        g,
        h = a.getComputedStyle(b);
      (e = b.parentNode),
        (g = {
          isPicture: !(!e || !m.test(e.nodeName || "")),
        }),
        (f = function f(a, c) {
          var d = b.getAttribute("data-" + a);

          if (!d) {
            var e = h.getPropertyValue("--ls-" + a);
            e && (d = e.trim());
          }

          if (d) {
            if ("true" == d) d = !0;
            else if ("false" == d) d = !1;
            else if (l.test(d)) d = parseFloat(d);
            else if ("function" == typeof j[a]) d = j[a](b, d);
            else if (q.test(d))
              try {
                d = JSON.parse(d);
              } catch (f) {}
            g[a] = d;
          } else
            a in j && "function" != typeof j[a]
              ? (g[a] = j[a])
              : c && "function" == typeof j[a] && (g[a] = j[a](b, d));
        });

      for (d in j) {
        f(d);
      }

      return (
        c.replace(p, function (a, b) {
          b in g || f(b, !0);
        }),
        g
      );
    }

    function e(a, b) {
      var c = [],
        d = function d(a, c) {
          return k[_typeof(b[c])] ? b[c] : a;
        };

      return (
        (c.srcset = []),
        b.absUrl && (s.setAttribute("href", a), (a = s.href)),
        (a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d)),
        b.widths.forEach(function (d) {
          var e = b.widthmap[d] || d,
            f = {
              u: a
                .replace(n, e)
                .replace(o, b.ratio ? Math.round(d * b.ratio) : ""),
              w: d,
            };
          c.push(f), c.srcset.push((f.c = f.u + " " + d + "w"));
        }),
        c
      );
    }

    function f(a, c, d) {
      var f = 0,
        g = 0,
        h = d;

      if (a) {
        if ("container" === c.ratio) {
          for (
            f = h.scrollWidth, g = h.scrollHeight;
            !((f && g) || h === b);

          ) {
            (h = h.parentNode), (f = h.scrollWidth), (g = h.scrollHeight);
          }

          f && g && (c.ratio = g / f);
        }

        (a = e(a, c)),
          (a.isPicture = c.isPicture),
          u && "IMG" == d.nodeName.toUpperCase()
            ? d.removeAttribute(i.srcsetAttr)
            : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")),
          Object.defineProperty(d, "_lazyrias", {
            value: a,
            writable: !0,
          });
      }
    }

    function g(a, b) {
      var e = d(a, b);
      return (
        j.modifyOptions.call(a, {
          target: a,
          details: e,
          detail: e,
        }),
        c.fire(a, "lazyriasmodifyoptions", e),
        e
      );
    }

    function h(a) {
      return (
        a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) ||
        a.getAttribute(i.srcsetAttr) ||
        a.getAttribute(i.srcAttr) ||
        a.getAttribute("data-pfsrcset") ||
        ""
      );
    }

    var i,
      j,
      k = {
        string: 1,
        number: 1,
      },
      l = /^\-*\+*\d+\.*\d*$/,
      m = /^picture$/i,
      n = /\s*\{\s*width\s*\}\s*/i,
      o = /\s*\{\s*height\s*\}\s*/i,
      p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
      q = /^\[.*\]|\{.*\}$/,
      r = /^(?:auto|\d+(px)?)$/,
      s = b.createElement("a"),
      t = b.createElement("img"),
      u = "srcset" in t && !("sizes" in t),
      v = !!a.HTMLPictureElement && !u;
    !(function () {
      var b,
        d = function d() {},
        e = {
          prefix: "",
          postfix: "",
          srcAttr: "data-src",
          absUrl: !1,
          modifyOptions: d,
          widthmap: {},
          ratio: !1,
        };

      (i = (c && c.cfg) || a.lazySizesConfig),
        i || ((i = {}), (a.lazySizesConfig = i)),
        i.supportsType ||
          (i.supportsType = function (a) {
            return !a;
          }),
        i.rias || (i.rias = {}),
        (j = i.rias),
        "widths" in j ||
          ((j.widths = []),
          (function (a) {
            for (var b, c = 0; !b || 3e3 > b; ) {
              (c += 5), c > 30 && (c += 1), (b = 36 * c), a.push(b);
            }
          })(j.widths));

      for (b in e) {
        b in j || (j[b] = e[b]);
      }
    })(),
      addEventListener(
        "lazybeforesizes",
        function (a) {
          if (a.detail.instance == c) {
            var b, d, e, k, l, m, o, p, q, s, t, u, x;

            if (
              ((b = a.target),
              a.detail.dataAttr &&
                !a.defaultPrevented &&
                !j.disabled &&
                (q = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) &&
                r.test(q))
            ) {
              if (
                ((d = h(b)),
                (e = g(b, d)),
                (t = n.test(e.prefix) || n.test(e.postfix)),
                e.isPicture && (k = b.parentNode))
              )
                for (
                  l = k.getElementsByTagName("source"), m = 0, o = l.length;
                  o > m;
                  m++
                ) {
                  (t || n.test((p = h(l[m])))) && (f(p, e, l[m]), (u = !0));
                }
              t || n.test(d)
                ? (f(d, e, b), (u = !0))
                : u &&
                  ((x = []),
                  (x.srcset = []),
                  (x.isPicture = !0),
                  Object.defineProperty(b, "_lazyrias", {
                    value: x,
                    writable: !0,
                  })),
                u &&
                  (v
                    ? b.removeAttribute(i.srcAttr)
                    : "auto" != q &&
                      ((s = {
                        width: parseInt(q, 10),
                      }),
                      w({
                        target: b,
                        detail: s,
                      })));
            }
          }
        },
        !0
      );

    var w = (function () {
      var d = function d(a, b) {
          return a.w - b.w;
        },
        e = function e(a) {
          var b,
            c,
            d = a.length,
            e = a[d - 1],
            f = 0;

          for (f; d > f; f++) {
            if (((e = a[f]), (e.d = e.w / a.w), e.d >= a.d)) {
              !e.cached &&
                (b = a[f - 1]) &&
                b.d > a.d - 0.13 * Math.pow(a.d, 2.2) &&
                ((c = Math.pow(b.d - 0.6, 1.6)),
                b.cached && (b.d += 0.15 * c),
                b.d + (e.d - a.d) * c > a.d && (e = b));
              break;
            }
          }

          return e;
        },
        f = function f(a, b) {
          var d;
          return (
            !a._lazyrias &&
              c.pWS &&
              (d = c.pWS(a.getAttribute(i.srcsetAttr || ""))).length &&
              (Object.defineProperty(a, "_lazyrias", {
                value: d,
                writable: !0,
              }),
              b &&
                a.parentNode &&
                (d.isPicture =
                  "PICTURE" == a.parentNode.nodeName.toUpperCase())),
            a._lazyrias
          );
        },
        g = function g(b) {
          var d = a.devicePixelRatio || 1,
            e = c.getX && c.getX(b);
          return Math.min(e || d, 2.4, d);
        },
        h = function h(b, c) {
          var h, i, j, k, l, m;
          if (((l = b._lazyrias), l.isPicture && a.matchMedia))
            for (
              i = 0,
                h = b.parentNode.getElementsByTagName("source"),
                j = h.length;
              j > i;
              i++
            ) {
              if (
                f(h[i]) &&
                !h[i].getAttribute("type") &&
                (!(k = h[i].getAttribute("media")) ||
                  (matchMedia(k) || {}).matches)
              ) {
                l = h[i]._lazyrias;
                break;
              }
            }
          return (
            (!l.w || l.w < c) && ((l.w = c), (l.d = g(b)), (m = e(l.sort(d)))),
            m
          );
        },
        _j = function j(d) {
          if (d.detail.instance == c) {
            var e,
              g = d.target;
            return !u && (a.respimage || a.picturefill || lazySizesConfig.pf)
              ? void b.removeEventListener("lazybeforesizes", _j)
              : void (
                  ("_lazyrias" in g || (d.detail.dataAttr && f(g, !0))) &&
                  ((e = h(g, d.detail.width)),
                  e &&
                    e.u &&
                    g._lazyrias.cur != e.u &&
                    ((g._lazyrias.cur = e.u),
                    (e.cached = !0),
                    c.rAF(function () {
                      g.setAttribute(i.srcAttr, e.u),
                        g.setAttribute("src", e.u);
                    })))
                );
          }
        };

      return (
        v ? (_j = function _j() {}) : addEventListener("lazybeforesizes", _j),
        _j
      );
    })();
  });
  /* lazysizes - optimumx */

  !(function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d,
        e = /^picture$/i,
        f = b.documentElement,
        g = (function () {
          var a,
            b = /(([^,\s].[^\s]+)\s+(\d+)(w|h)(\s+(\d+)(w|h))?)/g,
            c = function c(b, _c, d, e, f, g, h, i) {
              a.push({
                c: _c,
                u: d,
                w: 1 * ("w" == i ? h : e),
              });
            };

          return function (d) {
            return (a = []), d.replace(b, c), a;
          };
        })(),
        h = (function () {
          var a = function a(_a, b) {
              return _a.w - b.w;
            },
            b = function b(_b, c) {
              var d = {
                  srcset: _b.getAttribute(lazySizes.cfg.srcsetAttr) || "",
                },
                e = g(d.srcset);
              return (
                Object.defineProperty(_b, c, {
                  value: d,
                  writable: !0,
                }),
                (d.cands = e),
                (d.index = 0),
                (d.dirty = !1),
                e[0] && e[0].w
                  ? (e.sort(a), (d.cSrcset = [e[d.index].c]))
                  : ((d.cSrcset = d.srcset ? [d.srcset] : []), (d.cands = [])),
                d
              );
            };

          return function (a, c) {
            var d, f, g, h;
            if (
              !a[c] &&
              ((h = a.parentNode || {}),
              (a[c] = b(a, c)),
              (a[c].isImg = !0),
              e.test(h.nodeName || ""))
            )
              for (
                a[c].picture = !0,
                  d = h.getElementsByTagName("source"),
                  f = 0,
                  g = d.length;
                g > f;
                f++
              ) {
                b(d[f], c).isImg = !1;
              }
            return a[c];
          };
        })(),
        i = {
          _lazyOptimumx: (function () {
            var a = function a(_a2, b, c) {
              var d, e, f;
              return _a2 && _a2.d
                ? ((f = c > 0.7 ? 0.6 : 0.4),
                  _a2.d >= c
                    ? !1
                    : ((e = Math.pow(_a2.d - f, 1.6) || 0.1),
                      0.1 > e ? (e = 0.1) : e > 3 && (e = 3),
                      (d = _a2.d + (b - c) * e),
                      c > d))
                : !0;
            };

            return function (b, c, d) {
              var e, f;

              for (e = 0; e < b.cands.length; e++) {
                if (
                  ((f = b.cands[e]), (f.d = (f.w || 1) / c), !(b.index >= e))
                ) {
                  if (!(f.d <= d || a(b.cands[e - 1], f.d, d))) break;
                  b.cSrcset.push(f.c), (b.index = e);
                }
              }
            };
          })(),
        },
        j = (function () {
          var a = function a(_a3, b, c, d, e) {
            var f,
              g = _a3[e];
            g &&
              ((f = g.index),
              i[e](g, b, c),
              (g.dirty && f == g.index) ||
                (g.cSrcset.join(", "),
                _a3.setAttribute(d, g.cSrcset.join(", ")),
                (g.dirty = !0)));
          };

          return function (b, c, d, e, f) {
            var g,
              h,
              i,
              j,
              k = b[f];
            if (((k.width = c), k.picture && (h = b.parentNode)))
              for (
                g = h.getElementsByTagName("source"), j = 0, i = g.length;
                i > j;
                j++
              ) {
                a(g[j], c, d, e, f);
              }
            a(b, c, d, e, f);
          };
        })(),
        k = function k(a) {
          var b =
            a.getAttribute("data-optimumx") || a.getAttribute("data-maxdpr");
          return (
            !b && d.constrainPixelDensity && (b = "auto"),
            b && (b = "auto" == b ? d.getOptimumX(a) : parseFloat(b, 10)),
            b
          );
        },
        l = function l() {
          a.lazySizes &&
            !a.lazySizes.getOptimumX &&
            ((lazySizes.getX = k),
            (lazySizes.pWS = g),
            f.removeEventListener("lazybeforeunveil", l));
        };

      f.addEventListener("lazybeforeunveil", l),
        setTimeout(l),
        (d = (a.lazySizes && lazySizes.cfg) || a.lazySizesConfig),
        d || ((d = {}), (a.lazySizesConfig = d)),
        "function" != typeof d.getOptimumX &&
          (d.getOptimumX = function () {
            var b = a.devicePixelRatio || 1;
            return (
              b > 2.6 ? (b *= 0.6) : b > 1.9 ? (b *= 0.8) : (b -= 0.01),
              Math.min(Math.round(100 * b) / 100, 2)
            );
          }),
        a.devicePixelRatio &&
          addEventListener("lazybeforesizes", function (a) {
            var b,
              c,
              e,
              f,
              g = a.target,
              i = a.detail,
              l = i.dataAttr;
            a.defaultPrevented ||
              !(b = k(g)) ||
              b >= devicePixelRatio ||
              (!l ||
                !g._lazyOptimumx ||
                i.reloaded ||
                (d.unloadedClass && lazySizes.hC(g, d.unloadedClass)) ||
                (g._lazyOptimumx = null),
              (c = h(g, "_lazyOptimumx")),
              (e = i.width),
              e &&
                (c.width || 0) < e &&
                ((f = l ? lazySizes.cfg.srcsetAttr : "srcset"),
                lazySizes.rAF(function () {
                  j(g, e, b, f, "_lazyOptimumx");
                })));
          });
    }
  })(window, document);
  /* lazysizes - progressive */

  !(function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    (b = b.bind(null, a, a.document)),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
      module.exports
        ? b(require("lazysizes"))
        : a.lazySizes
        ? c()
        : a.addEventListener("lazyunveilread", c, !0);
  })(window, function (a, b, c) {
    "use strict";

    var d, _e;

    "srcset" in b.createElement("img") &&
      ((d = /^img$/i),
      (_e = function e(a) {
        (a.target.style.backgroundSize = ""),
          (a.target.style.backgroundImage = ""),
          a.target.removeEventListener(a.type, _e);
      }),
      b.addEventListener(
        "lazybeforeunveil",
        function (a) {
          if (a.detail.instance == c) {
            var b = a.target;

            if (d.test(b.nodeName)) {
              var f = b.getAttribute("src");
              f &&
                ((b.style.backgroundSize = "100% 100%"),
                (b.style.backgroundImage = "url(" + f + ")"),
                b.removeAttribute("src"),
                b.addEventListener("load", _e));
            }
          }
        },
        !1
      ));
  });
  /* lazysizes - parent-fit */

  !(function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    (b = b.bind(null, a, a.document)),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
      module.exports
        ? b(require("lazysizes"))
        : a.lazySizes
        ? c()
        : a.addEventListener("lazyunveilread", c, !0);
  })(window, function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
        e = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
        f = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
        g = /^picture$/i,
        h = function h(a) {
          return getComputedStyle(a, null) || {};
        },
        i = {
          getParent: function getParent(b, c) {
            var d = b,
              e = b.parentNode;
            return (
              (c && "prev" != c) ||
                !e ||
                !g.test(e.nodeName || "") ||
                (e = e.parentNode),
              "self" != c &&
                (d =
                  "prev" == c
                    ? b.previousElementSibling
                    : c && (e.closest || a.jQuery)
                    ? (e.closest ? e.closest(c) : jQuery(e).closest(c)[0]) || e
                    : e),
              d
            );
          },
          getFit: function getFit(a) {
            var b,
              c,
              d = h(a),
              g = d.content || d.fontFamily,
              j = {
                fit: a._lazysizesParentFit || a.getAttribute("data-parent-fit"),
              };
            return (
              !j.fit && g && (b = g.match(e)) && (j.fit = b[1]),
              j.fit
                ? ((c =
                    a._lazysizesParentContainer ||
                    a.getAttribute("data-parent-container")),
                  !c && g && (b = g.match(f)) && (c = b[1]),
                  (j.parent = i.getParent(a, c)))
                : (j.fit = d.objectFit),
              j
            );
          },
          getImageRatio: function getImageRatio(b) {
            var c,
              e,
              f,
              h,
              i = b.parentNode,
              j =
                i && g.test(i.nodeName || "")
                  ? i.querySelectorAll("source, img")
                  : [b];

            for (c = 0; c < j.length; c++) {
              if (
                ((b = j[c]),
                (e =
                  b.getAttribute(lazySizesConfig.srcsetAttr) ||
                  b.getAttribute("srcset") ||
                  b.getAttribute("data-pfsrcset") ||
                  b.getAttribute("data-risrcset") ||
                  ""),
                (f = b._lsMedia || b.getAttribute("media")),
                (f =
                  lazySizesConfig.customMedia[
                    b.getAttribute("data-media") || f
                  ] || f),
                e && (!f || ((a.matchMedia && matchMedia(f)) || {}).matches))
              ) {
                (h = parseFloat(b.getAttribute("data-aspectratio"))),
                  !h &&
                    e.match(d) &&
                    (h =
                      "w" == RegExp.$2
                        ? RegExp.$1 / RegExp.$3
                        : RegExp.$3 / RegExp.$1);
                break;
              }
            }

            return h;
          },
          calculateSize: function calculateSize(a, b) {
            var c,
              d,
              e,
              f,
              g = this.getFit(a),
              h = g.fit,
              i = g.parent;
            return "width" == h ||
              (("contain" == h || "cover" == h) && (e = this.getImageRatio(a)))
              ? (i ? (b = i.clientWidth) : (i = a),
                (f = b),
                "width" == h
                  ? (f = b)
                  : ((d = i.clientHeight),
                    d > 40 &&
                      (c = b / d) &&
                      (("cover" == h && e > c) || ("contain" == h && c > e)) &&
                      (f = b * (e / c))),
                f)
              : b;
          },
        };

      (c.parentFit = i),
        b.addEventListener("lazybeforesizes", function (a) {
          if (!a.defaultPrevented && a.detail.instance == c) {
            var b = a.target;
            a.detail.width = i.calculateSize(b, a.detail.width);
          }
        });
    }
  });
  /*! lazysizes - respimg */

  !(function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    (b = b.bind(null, a, a.document)),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
      module.exports
        ? b(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes"))
        : a.lazySizes
        ? c()
        : a.addEventListener("lazyunveilread", c, !0);
  })(window, function (a, b, c) {
    "use strict";

    var d,
      e = (c && c.cfg) || a.lazySizesConfig,
      f = b.createElement("img"),
      g = "sizes" in f && "srcset" in f,
      h = /\s+\d+h/g,
      i = (function () {
        var a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
          c = Array.prototype.forEach;
        return function (d) {
          var e = b.createElement("img"),
            f = function f(b) {
              var c,
                d,
                e = b.getAttribute(lazySizesConfig.srcsetAttr);
              e &&
                ((d = e.match(a)) &&
                  ((c = "w" == d[2] ? d[1] / d[3] : d[3] / d[1]),
                  c && b.setAttribute("data-aspectratio", c)),
                b.setAttribute(lazySizesConfig.srcsetAttr, e.replace(h, "")));
            },
            g = function g(a) {
              var b = a.target.parentNode;
              b &&
                "PICTURE" == b.nodeName &&
                c.call(b.getElementsByTagName("source"), f),
                f(a.target);
            },
            i = function i() {
              e.currentSrc && b.removeEventListener("lazybeforeunveil", g);
            };

          d[1] &&
            (b.addEventListener("lazybeforeunveil", g),
            (e.onload = i),
            (e.onerror = i),
            (e.srcset = "data:,a 1w 1h"),
            e.complete && i());
        };
      })();

    if (
      (e || ((e = {}), (a.lazySizesConfig = e)),
      e.supportsType ||
        (e.supportsType = function (a) {
          return !a;
        }),
      !a.picturefill && !e.pf)
    ) {
      if (a.HTMLPictureElement && g)
        return (
          b.msElementsFromPoint && i(navigator.userAgent.match(/Edge\/(\d+)/)),
          void (e.pf = function () {})
        );
      (e.pf = function (b) {
        var c, e;
        if (!a.picturefill)
          for (c = 0, e = b.elements.length; e > c; c++) {
            d(b.elements[c]);
          }
      }),
        (d = (function () {
          var f = function f(a, b) {
              return a.w - b.w;
            },
            i = /^\s*\d+\.*\d*px\s*$/,
            j = function j(a) {
              var b,
                c,
                d = a.length,
                e = a[d - 1],
                f = 0;

              for (f; d > f; f++) {
                if (((e = a[f]), (e.d = e.w / a.w), e.d >= a.d)) {
                  !e.cached &&
                    (b = a[f - 1]) &&
                    b.d > a.d - 0.13 * Math.pow(a.d, 2.2) &&
                    ((c = Math.pow(b.d - 0.6, 1.6)),
                    b.cached && (b.d += 0.15 * c),
                    b.d + (e.d - a.d) * c > a.d && (e = b));
                  break;
                }
              }

              return e;
            },
            k = (function () {
              var a,
                b = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                c = /\s/,
                d = function d(b, c, _d, e) {
                  a.push({
                    c: c,
                    u: _d,
                    w: 1 * e,
                  });
                };

              return function (e) {
                return (
                  (a = []),
                  (e = e.trim()),
                  e.replace(h, "").replace(b, d),
                  a.length ||
                    !e ||
                    c.test(e) ||
                    a.push({
                      c: e,
                      u: e,
                      w: 99,
                    }),
                  a
                );
              };
            })(),
            l = function l() {
              l.init ||
                ((l.init = !0),
                addEventListener(
                  "resize",
                  (function () {
                    var a,
                      c = b.getElementsByClassName("lazymatchmedia"),
                      e = function e() {
                        var a, b;

                        for (a = 0, b = c.length; b > a; a++) {
                          d(c[a]);
                        }
                      };

                    return function () {
                      clearTimeout(a), (a = setTimeout(e, 66));
                    };
                  })()
                ));
            },
            m = function m(b, d) {
              var f,
                g = b.getAttribute("srcset") || b.getAttribute(e.srcsetAttr);
              !g &&
                d &&
                (g = b._lazypolyfill
                  ? b._lazypolyfill._set
                  : b.getAttribute(e.srcAttr) || b.getAttribute("src")),
                (b._lazypolyfill && b._lazypolyfill._set == g) ||
                  ((f = k(g || "")),
                  d &&
                    b.parentNode &&
                    ((f.isPicture =
                      "PICTURE" == b.parentNode.nodeName.toUpperCase()),
                    f.isPicture &&
                      a.matchMedia &&
                      (c.aC(b, "lazymatchmedia"), l())),
                  (f._set = g),
                  Object.defineProperty(b, "_lazypolyfill", {
                    value: f,
                    writable: !0,
                  }));
            },
            n = function n(b) {
              var d = a.devicePixelRatio || 1,
                e = c.getX && c.getX(b);
              return Math.min(e || d, 2.5, d);
            },
            _o = function o(b) {
              return a.matchMedia
                ? (_o = function o(a) {
                    return !a || (matchMedia(a) || {}).matches;
                  })(b)
                : !b;
            },
            p = function p(a) {
              var b, d, g, h, k, l, p;
              if (((h = a), m(h, !0), (k = h._lazypolyfill), k.isPicture))
                for (
                  d = 0,
                    b = a.parentNode.getElementsByTagName("source"),
                    g = b.length;
                  g > d;
                  d++
                ) {
                  if (
                    e.supportsType(b[d].getAttribute("type"), a) &&
                    _o(b[d].getAttribute("media"))
                  ) {
                    (h = b[d]), m(h), (k = h._lazypolyfill);
                    break;
                  }
                }
              return (
                k.length > 1
                  ? ((p = h.getAttribute("sizes") || ""),
                    (p =
                      (i.test(p) && parseInt(p, 10)) || c.gW(a, a.parentNode)),
                    (k.d = n(a)),
                    !k.src || !k.w || k.w < p
                      ? ((k.w = p), (l = j(k.sort(f))), (k.src = l))
                      : (l = k.src))
                  : (l = k[0]),
                l
              );
            },
            q = function q(a) {
              if (
                !g ||
                !a.parentNode ||
                "PICTURE" == a.parentNode.nodeName.toUpperCase()
              ) {
                var b = p(a);
                b &&
                  b.u &&
                  a._lazypolyfill.cur != b.u &&
                  ((a._lazypolyfill.cur = b.u),
                  (b.cached = !0),
                  a.setAttribute(e.srcAttr, b.u),
                  a.setAttribute("src", b.u));
              }
            };

          return (q.parse = k), q;
        })()),
        e.loadedClass &&
          e.loadingClass &&
          !(function () {
            var a = [];
            [
              'img[sizes$="px"][srcset].',
              "picture > img:not([srcset]).",
            ].forEach(function (b) {
              a.push(b + e.loadedClass), a.push(b + e.loadingClass);
            }),
              e.pf({
                elements: b.querySelectorAll(a.join(", ")),
              });
          })();
    }
  });
  /*! lazysizes - bgset */

  !(function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    (b = b.bind(null, a, a.document)),
      "object" ==
        (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
      module.exports
        ? b(require("lazysizes"))
        : a.lazySizes
        ? c()
        : a.addEventListener("lazyunveilread", c, !0);
  })(window, function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d = /\s+/g,
        e = /\s*\|\s+|\s+\|\s*/g,
        f = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
        g = /\(|\)|'/,
        h = {
          contain: 1,
          cover: 1,
        },
        i = function i(a) {
          var b = c.gW(a, a.parentNode);
          return (
            (!a._lazysizesWidth || b > a._lazysizesWidth) &&
              (a._lazysizesWidth = b),
            a._lazysizesWidth
          );
        },
        j = function j(a) {
          var b;
          return (
            (b = (
              getComputedStyle(a) || {
                getPropertyValue: function getPropertyValue() {},
              }
            ).getPropertyValue("background-size")),
            !h[b] && h[a.style.backgroundSize] && (b = a.style.backgroundSize),
            b
          );
        },
        k = function k(a, c, g) {
          var h = b.createElement("picture"),
            i = c.getAttribute(lazySizesConfig.sizesAttr),
            j = c.getAttribute("data-ratio"),
            k = c.getAttribute("data-optimumx");
          c._lazybgset &&
            c._lazybgset.parentNode == c &&
            c.removeChild(c._lazybgset),
            Object.defineProperty(g, "_lazybgset", {
              value: c,
              writable: !0,
            }),
            Object.defineProperty(c, "_lazybgset", {
              value: h,
              writable: !0,
            }),
            (a = a.replace(d, " ").split(e)),
            (h.style.display = "none"),
            (g.className = lazySizesConfig.lazyClass),
            1 != a.length || i || (i = "auto"),
            a.forEach(function (a) {
              var c = b.createElement("source");
              i && "auto" != i && c.setAttribute("sizes", i),
                a.match(f) &&
                  (c.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1),
                  RegExp.$2 &&
                    c.setAttribute(
                      "media",
                      lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2
                    )),
                h.appendChild(c);
            }),
            i &&
              (g.setAttribute(lazySizesConfig.sizesAttr, i),
              c.removeAttribute(lazySizesConfig.sizesAttr),
              c.removeAttribute("sizes")),
            k && g.setAttribute("data-optimumx", k),
            j && g.setAttribute("data-ratio", j),
            h.appendChild(g),
            c.appendChild(h);
        },
        l = function l(a) {
          if (a.target._lazybgset) {
            var b = a.target,
              d = b._lazybgset,
              e = b.currentSrc || b.src;
            e &&
              (d.style.backgroundImage =
                "url(" + (g.test(e) ? JSON.stringify(e) : e) + ")"),
              b._lazybgsetLoading &&
                (c.fire(d, "_lazyloaded", {}, !1, !0),
                delete b._lazybgsetLoading);
          }
        };

      addEventListener("lazybeforeunveil", function (a) {
        var d, e, f;
        !a.defaultPrevented &&
          (d = a.target.getAttribute("data-bgset")) &&
          ((f = a.target),
          (e = b.createElement("img")),
          (e.alt = ""),
          (e._lazybgsetLoading = !0),
          (a.detail.firesLoad = !0),
          k(d, f, e),
          setTimeout(function () {
            c.loader.unveil(e),
              c.rAF(function () {
                c.fire(e, "_lazyloaded", {}, !0, !0),
                  e.complete &&
                    l({
                      target: e,
                    });
              });
          }));
      }),
        b.addEventListener("load", l, !0),
        a.addEventListener(
          "lazybeforesizes",
          function (a) {
            if (
              a.detail.instance == c &&
              a.target._lazybgset &&
              a.detail.dataAttr
            ) {
              var b = a.target._lazybgset,
                d = j(b);
              h[d] &&
                ((a.target._lazysizesParentFit = d),
                c.rAF(function () {
                  a.target.setAttribute("data-parent-fit", d),
                    a.target._lazysizesParentFit &&
                      delete a.target._lazysizesParentFit;
                }));
            }
          },
          !0
        ),
        b.documentElement.addEventListener("lazybeforesizes", function (a) {
          !a.defaultPrevented &&
            a.target._lazybgset &&
            a.detail.instance == c &&
            (a.detail.width = i(a.target._lazybgset));
        });
    }
  });
  /* lazysizes placeholder removal */

  document.addEventListener("lazyloaded", function (e) {
    e.target.parentElement.className = e.target.parentElement.className.replace(
      "lazyload--placeholder",
      ""
    );
  });
  /*!
   * imagesLoaded PACKAGED v3.1.8
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */

  (function () {
    function e() {}

    function t(e, t) {
      for (var n = e.length; n--; ) {
        if (e[n].listener === t) return n;
      }

      return -1;
    }

    function n(e) {
      return function () {
        return this[e].apply(this, arguments);
      };
    }

    var i = e.prototype,
      r = this,
      o = r.EventEmitter;
    (i.getListeners = function (e) {
      var t,
        n,
        i = this._getEvents();

      if ("object" == _typeof(e)) {
        t = {};

        for (n in i) {
          i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
        }
      } else t = i[e] || (i[e] = []);

      return t;
    }),
      (i.flattenListeners = function (e) {
        var t,
          n = [];

        for (t = 0; e.length > t; t += 1) {
          n.push(e[t].listener);
        }

        return n;
      }),
      (i.getListenersAsObject = function (e) {
        var t,
          n = this.getListeners(e);
        return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
      }),
      (i.addListener = function (e, n) {
        var i,
          r = this.getListenersAsObject(e),
          o = "object" == _typeof(n);

        for (i in r) {
          r.hasOwnProperty(i) &&
            -1 === t(r[i], n) &&
            r[i].push(
              o
                ? n
                : {
                    listener: n,
                    once: !1,
                  }
            );
        }

        return this;
      }),
      (i.on = n("addListener")),
      (i.addOnceListener = function (e, t) {
        return this.addListener(e, {
          listener: t,
          once: !0,
        });
      }),
      (i.once = n("addOnceListener")),
      (i.defineEvent = function (e) {
        return this.getListeners(e), this;
      }),
      (i.defineEvents = function (e) {
        for (var t = 0; e.length > t; t += 1) {
          this.defineEvent(e[t]);
        }

        return this;
      }),
      (i.removeListener = function (e, n) {
        var i,
          r,
          o = this.getListenersAsObject(e);

        for (r in o) {
          o.hasOwnProperty(r) &&
            ((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
        }

        return this;
      }),
      (i.off = n("removeListener")),
      (i.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t);
      }),
      (i.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t);
      }),
      (i.manipulateListeners = function (e, t, n) {
        var i,
          r,
          o = e ? this.removeListener : this.addListener,
          s = e ? this.removeListeners : this.addListeners;
        if ("object" != _typeof(t) || t instanceof RegExp)
          for (i = n.length; i--; ) {
            o.call(this, t, n[i]);
          }
        else
          for (i in t) {
            t.hasOwnProperty(i) &&
              (r = t[i]) &&
              ("function" == typeof r
                ? o.call(this, i, r)
                : s.call(this, i, r));
          }
        return this;
      }),
      (i.removeEvent = function (e) {
        var t,
          n = _typeof(e),
          i = this._getEvents();

        if ("string" === n) delete i[e];
        else if ("object" === n)
          for (t in i) {
            i.hasOwnProperty(t) && e.test(t) && delete i[t];
          }
        else delete this._events;
        return this;
      }),
      (i.removeAllListeners = n("removeEvent")),
      (i.emitEvent = function (e, t) {
        var n,
          i,
          r,
          o,
          s = this.getListenersAsObject(e);

        for (r in s) {
          if (s.hasOwnProperty(r))
            for (i = s[r].length; i--; ) {
              (n = s[r][i]),
                n.once === !0 && this.removeListener(e, n.listener),
                (o = n.listener.apply(this, t || [])),
                o === this._getOnceReturnValue() &&
                  this.removeListener(e, n.listener);
            }
        }

        return this;
      }),
      (i.trigger = n("emitEvent")),
      (i.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t);
      }),
      (i.setOnceReturnValue = function (e) {
        return (this._onceReturnValue = e), this;
      }),
      (i._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (i._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (e.noConflict = function () {
        return (r.EventEmitter = o), e;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return e;
          })
        : "object" ==
            (typeof module === "undefined" ? "undefined" : _typeof(module)) &&
          module.exports
        ? (module.exports = e)
        : (this.EventEmitter = e);
  }.call(this),
    (function (e) {
      function t(t) {
        var n = e.event;
        return (n.target = n.target || n.srcElement || t), n;
      }

      var n = document.documentElement,
        i = function i() {};

      n.addEventListener
        ? (i = function i(e, t, n) {
            e.addEventListener(t, n, !1);
          })
        : n.attachEvent &&
          (i = function i(e, n, _i) {
            (e[n + _i] = _i.handleEvent
              ? function () {
                  var n = t(e);

                  _i.handleEvent.call(_i, n);
                }
              : function () {
                  var n = t(e);

                  _i.call(e, n);
                }),
              e.attachEvent("on" + n, e[n + _i]);
          });

      var r = function r() {};

      n.removeEventListener
        ? (r = function r(e, t, n) {
            e.removeEventListener(t, n, !1);
          })
        : n.detachEvent &&
          (r = function r(e, t, n) {
            e.detachEvent("on" + t, e[t + n]);

            try {
              delete e[t + n];
            } catch (i) {
              e[t + n] = void 0;
            }
          });
      var o = {
        bind: i,
        unbind: r,
      };
      "function" == typeof define && define.amd
        ? define("eventie/eventie", o)
        : (e.eventie = o);
    })(this),
    (function (e, t) {
      "function" == typeof define && define.amd
        ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (
            n,
            i
          ) {
            return t(e, n, i);
          })
        : "object" ==
          (typeof exports === "undefined" ? "undefined" : _typeof(exports))
        ? (module.exports = t(
            e,
            require("wolfy87-eventemitter"),
            require("eventie")
          ))
        : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
    })(window, function (e, t, n) {
      function i(e, t) {
        for (var n in t) {
          e[n] = t[n];
        }

        return e;
      }

      function r(e) {
        return "[object Array]" === d.call(e);
      }

      function o(e) {
        var t = [];
        if (r(e)) t = e;
        else if ("number" == typeof e.length)
          for (var n = 0, i = e.length; i > n; n++) {
            t.push(e[n]);
          }
        else t.push(e);
        return t;
      }

      function s(e, t, n) {
        if (!(this instanceof s)) return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = o(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (n = t) : i(this.options, t),
          n && this.on("always", n),
          this.getImages(),
          a && (this.jqDeferred = new a.Deferred());
        var r = this;
        setTimeout(function () {
          r.check();
        });
      }

      function f(e) {
        this.img = e;
      }

      function c(e) {
        (this.src = e), (v[e] = this);
      }

      var a = e.jQuery,
        u = e.console,
        h = u !== void 0,
        d = Object.prototype.toString;
      (s.prototype = new t()),
        (s.prototype.options = {}),
        (s.prototype.getImages = function () {
          this.images = [];

          for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            var i = n.nodeType;
            if (i && (1 === i || 9 === i || 11 === i))
              for (
                var r = n.querySelectorAll("img"), o = 0, s = r.length;
                s > o;
                o++
              ) {
                var f = r[o];
                this.addImage(f);
              }
          }
        }),
        (s.prototype.addImage = function (e) {
          var t = new f(e);
          this.images.push(t);
        }),
        (s.prototype.check = function () {
          function e(e, r) {
            return (
              t.options.debug && h && u.log("confirm", e, r),
              t.progress(e),
              n++,
              n === i && t.complete(),
              !0
            );
          }

          var t = this,
            n = 0,
            i = this.images.length;
          if (((this.hasAnyBroken = !1), !i)) return this.complete(), void 0;

          for (var r = 0; i > r; r++) {
            var o = this.images[r];
            o.on("confirm", e), o.check();
          }
        }),
        (s.prototype.progress = function (e) {
          this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
          var t = this;
          setTimeout(function () {
            t.emit("progress", t, e),
              t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
          });
        }),
        (s.prototype.complete = function () {
          var e = this.hasAnyBroken ? "fail" : "done";
          this.isComplete = !0;
          var t = this;
          setTimeout(function () {
            if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
              var n = t.hasAnyBroken ? "reject" : "resolve";
              t.jqDeferred[n](t);
            }
          });
        }),
        a &&
          (a.fn.imagesLoaded = function (e, t) {
            var n = new s(this, e, t);
            return n.jqDeferred.promise(a(this));
          }),
        (f.prototype = new t()),
        (f.prototype.check = function () {
          var e = v[this.img.src] || new c(this.img.src);
          if (e.isConfirmed)
            return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
          if (this.img.complete && void 0 !== this.img.naturalWidth)
            return (
              this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
            );
          var t = this;
          e.on("confirm", function (e, n) {
            return t.confirm(e.isLoaded, n), !0;
          }),
            e.check();
        }),
        (f.prototype.confirm = function (e, t) {
          (this.isLoaded = e), this.emit("confirm", this, t);
        });
      var v = {};
      return (
        (c.prototype = new t()),
        (c.prototype.check = function () {
          if (!this.isChecked) {
            var e = new Image();
            n.bind(e, "load", this),
              n.bind(e, "error", this),
              (e.src = this.src),
              (this.isChecked = !0);
          }
        }),
        (c.prototype.handleEvent = function (e) {
          var t = "on" + e.type;
          this[t] && this[t](e);
        }),
        (c.prototype.onload = function (e) {
          this.confirm(!0, "onload"), this.unbindProxyEvents(e);
        }),
        (c.prototype.onerror = function (e) {
          this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
        }),
        (c.prototype.confirm = function (e, t) {
          (this.isConfirmed = !0),
            (this.isLoaded = e),
            this.emit("confirm", this, t);
        }),
        (c.prototype.unbindProxyEvents = function (e) {
          n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
        }),
        s
      );
    }));
  /*
  _ _      _       _
  ___| (_) ___| | __  (_)___
  / __| | |/ __| |/ /  | / __|
  \__ \ | | (__|   < _ | \__ \
  |___/_|_|\___|_|\_(_)/ |___/
  |__/
  Version: 1.6.0
  Author: Ken Wheeler
  Website: http://kenwheeler.github.io
  Docs: http://kenwheeler.github.io/slick
  Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
  Modified by Clean Canvas - removed 'aria-describedby', translating labels
  */

  !(function (a) {
    "use strict";

    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : "undefined" != typeof exports
      ? (module.exports = a(require("jquery")))
      : a(jQuery);
  })(function (a) {
    "use strict";

    var b = window.Slick || {};
    (b = (function () {
      function c(c, d) {
        var f,
          e = this;
        (e.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: a(c),
          appendDots: a(c),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button type="button" data-role="none" class="slick-prev" aria-label="' +
            theme.strings.previous +
            '" tabindex="0" role="button">' +
            theme.strings.previous +
            "</button>",
          nextArrow:
            '<button type="button" data-role="none" class="slick-next" aria-label="' +
            theme.strings.next +
            '" tabindex="0" role="button">' +
            theme.strings.next +
            "</button>",
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function customPaging(b, c) {
            return a(
              '<button type="button" data-role="none" role="button" tabindex="0" />'
            ).text(c + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (e.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          a.extend(e, e.initials),
          (e.activeBreakpoint = null),
          (e.animType = null),
          (e.animProp = null),
          (e.breakpoints = []),
          (e.breakpointSettings = []),
          (e.cssTransitions = !1),
          (e.focussed = !1),
          (e.interrupted = !1),
          (e.hidden = "hidden"),
          (e.paused = !0),
          (e.positionProp = null),
          (e.respondTo = null),
          (e.rowCount = 1),
          (e.shouldClick = !0),
          (e.$slider = a(c)),
          (e.$slidesCache = null),
          (e.transformType = null),
          (e.transitionType = null),
          (e.visibilityChange = "visibilitychange"),
          (e.windowWidth = 0),
          (e.windowTimer = null),
          (f = a(c).data("slick") || {}),
          (e.options = a.extend({}, e.defaults, d, f)),
          (e.currentSlide = e.options.initialSlide),
          (e.originalSettings = e.options),
          "undefined" != typeof document.mozHidden
            ? ((e.hidden = "mozHidden"),
              (e.visibilityChange = "mozvisibilitychange"))
            : "undefined" != typeof document.webkitHidden &&
              ((e.hidden = "webkitHidden"),
              (e.visibilityChange = "webkitvisibilitychange")),
          (e.autoPlay = a.proxy(e.autoPlay, e)),
          (e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
          (e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
          (e.changeSlide = a.proxy(e.changeSlide, e)),
          (e.clickHandler = a.proxy(e.clickHandler, e)),
          (e.selectHandler = a.proxy(e.selectHandler, e)),
          (e.setPosition = a.proxy(e.setPosition, e)),
          (e.swipeHandler = a.proxy(e.swipeHandler, e)),
          (e.dragHandler = a.proxy(e.dragHandler, e)),
          (e.keyHandler = a.proxy(e.keyHandler, e)),
          (e.instanceUid = b++),
          (e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          e.registerBreakpoints(),
          e.init(!0);
      }

      var b = 0;
      return c;
    })()),
      (b.prototype.activateADA = function () {
        var a = this;
        a.$slideTrack
          .find(".slick-active")
          .attr({
            "aria-hidden": "false",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "0",
          });
      }),
      (b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) (d = c), (c = null);
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(),
          "number" == typeof c
            ? 0 === c && 0 === e.$slides.length
              ? a(b).appendTo(e.$slideTrack)
              : d
              ? a(b).insertBefore(e.$slides.eq(c))
              : a(b).insertAfter(e.$slides.eq(c))
            : d === !0
            ? a(b).prependTo(e.$slideTrack)
            : a(b).appendTo(e.$slideTrack),
          (e.$slides = e.$slideTrack.children(this.options.slide)),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slideTrack.append(e.$slides),
          e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b);
          }),
          (e.$slidesCache = e.$slides),
          e.reinit();
      }),
      (b.prototype.animateHeight = function () {
        var a = this;

        if (
          1 === a.options.slidesToShow &&
          a.options.adaptiveHeight === !0 &&
          a.options.vertical === !1
        ) {
          var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
          a.$list.animate(
            {
              height: b,
            },
            a.options.speed
          );
        }
      }),
      (b.prototype.animateSlide = function (b, c) {
        var d = {},
          e = this;
        e.animateHeight(),
          e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
          e.transformsEnabled === !1
            ? e.options.vertical === !1
              ? e.$slideTrack.animate(
                  {
                    left: b,
                  },
                  e.options.speed,
                  e.options.easing,
                  c
                )
              : e.$slideTrack.animate(
                  {
                    top: b,
                  },
                  e.options.speed,
                  e.options.easing,
                  c
                )
            : e.cssTransitions === !1
            ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
              a({
                animStart: e.currentLeft,
              }).animate(
                {
                  animStart: b,
                },
                {
                  duration: e.options.speed,
                  easing: e.options.easing,
                  step: function step(a) {
                    (a = Math.ceil(a)),
                      e.options.vertical === !1
                        ? ((d[e.animType] = "translate(" + a + "px, 0px)"),
                          e.$slideTrack.css(d))
                        : ((d[e.animType] = "translate(0px," + a + "px)"),
                          e.$slideTrack.css(d));
                  },
                  complete: function complete() {
                    c && c.call();
                  },
                }
              ))
            : (e.applyTransition(),
              (b = Math.ceil(b)),
              e.options.vertical === !1
                ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)")
                : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
              e.$slideTrack.css(d),
              c &&
                setTimeout(function () {
                  e.disableTransition(), c.call();
                }, e.options.speed));
      }),
      (b.prototype.getNavTarget = function () {
        var b = this,
          c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c;
      }),
      (b.prototype.asNavFor = function (b) {
        var c = this,
          d = c.getNavTarget();
        null !== d &&
          "object" == _typeof(d) &&
          d.each(function () {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0);
          });
      }),
      (b.prototype.applyTransition = function (a) {
        var b = this,
          c = {};
        b.options.fade === !1
          ? (c[b.transitionType] =
              b.transformType +
              " " +
              b.options.speed +
              "ms " +
              b.options.cssEase)
          : (c[b.transitionType] =
              "opacity " + b.options.speed + "ms " + b.options.cssEase),
          b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
      }),
      (b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayClear(),
          a.slideCount > a.options.slidesToShow &&
            (a.autoPlayTimer = setInterval(
              a.autoPlayIterator,
              a.options.autoplaySpeed
            ));
      }),
      (b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer);
      }),
      (b.prototype.autoPlayIterator = function () {
        var a = this,
          b = a.currentSlide + a.options.slidesToScroll;
        a.paused ||
          a.interrupted ||
          a.focussed ||
          (a.options.infinite === !1 &&
            (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1
              ? (a.direction = 0)
              : 0 === a.direction &&
                ((b = a.currentSlide - a.options.slidesToScroll),
                a.currentSlide - 1 === 0 && (a.direction = 1))),
          a.slideHandler(b));
      }),
      (b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 &&
          ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
          (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
          b.slideCount > b.options.slidesToShow
            ? (b.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              b.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              b.htmlExpr.test(b.options.prevArrow) &&
                b.$prevArrow.prependTo(b.options.appendArrows),
              b.htmlExpr.test(b.options.nextArrow) &&
                b.$nextArrow.appendTo(b.options.appendArrows),
              b.options.infinite !== !0 &&
                b.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1",
              }));
      }),
      (b.prototype.buildDots = function () {
        var c,
          d,
          b = this;

        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
          for (
            b.$slider.addClass("slick-dotted"),
              d = a("<ul />").addClass(b.options.dotsClass),
              c = 0;
            c <= b.getDotCount();
            c += 1
          ) {
            d.append(
              a("<li />").append(b.options.customPaging.call(this, b, c))
            );
          }

          (b.$dots = d.appendTo(b.options.appendDots)),
            b.$dots
              .find("li")
              .first()
              .addClass("slick-active")
              .attr("aria-hidden", "false");
        }
      }),
      (b.prototype.buildOut = function () {
        var b = this;
        (b.$slides = b.$slider
          .children(b.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (b.slideCount = b.$slides.length),
          b.$slides.each(function (b, c) {
            a(c)
              .attr("data-slick-index", b)
              .data("originalStyling", a(c).attr("style") || "");
          }),
          b.$slider.addClass("slick-slider"),
          (b.$slideTrack =
            0 === b.slideCount
              ? a('<div class="slick-track"/>').appendTo(b.$slider)
              : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (b.$list = b.$slideTrack
            .wrap('<div aria-live="polite" class="slick-list"/>')
            .parent()),
          b.$slideTrack.css("opacity", 0),
          (b.options.centerMode === !0 || b.options.swipeToSlide === !0) &&
            (b.options.slidesToScroll = 1),
          a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
          b.setupInfinite(),
          b.buildArrows(),
          b.buildDots(),
          b.updateDots(),
          b.setSlideClasses(
            "number" == typeof b.currentSlide ? b.currentSlide : 0
          ),
          b.options.draggable === !0 && b.$list.addClass("draggable");
      }),
      (b.prototype.buildRows = function () {
        var b,
          c,
          d,
          e,
          f,
          g,
          h,
          a = this;

        if (
          ((e = document.createDocumentFragment()),
          (g = a.$slider.children()),
          a.options.rows > 1)
        ) {
          for (
            h = a.options.slidesPerRow * a.options.rows,
              f = Math.ceil(g.length / h),
              b = 0;
            f > b;
            b++
          ) {
            var i = document.createElement("div");

            for (c = 0; c < a.options.rows; c++) {
              var j = document.createElement("div");

              for (d = 0; d < a.options.slidesPerRow; d++) {
                var k = b * h + (c * a.options.slidesPerRow + d);
                g.get(k) && j.appendChild(g.get(k));
              }

              i.appendChild(j);
            }

            e.appendChild(i);
          }

          a.$slider.empty().append(e),
            a.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block",
              });
        }
      }),
      (b.prototype.checkResponsive = function (b, c) {
        var e,
          f,
          g,
          d = this,
          h = !1,
          i = d.$slider.width(),
          j = window.innerWidth || a(window).width();

        if (
          ("window" === d.respondTo
            ? (g = j)
            : "slider" === d.respondTo
            ? (g = i)
            : "min" === d.respondTo && (g = Math.min(j, i)),
          d.options.responsive &&
            d.options.responsive.length &&
            null !== d.options.responsive)
        ) {
          f = null;

          for (e in d.breakpoints) {
            d.breakpoints.hasOwnProperty(e) &&
              (d.originalSettings.mobileFirst === !1
                ? g < d.breakpoints[e] && (f = d.breakpoints[e])
                : g > d.breakpoints[e] && (f = d.breakpoints[e]));
          }

          null !== f
            ? null !== d.activeBreakpoint
              ? (f !== d.activeBreakpoint || c) &&
                ((d.activeBreakpoint = f),
                "unslick" === d.breakpointSettings[f]
                  ? d.unslick(f)
                  : ((d.options = a.extend(
                      {},
                      d.originalSettings,
                      d.breakpointSettings[f]
                    )),
                    b === !0 && (d.currentSlide = d.options.initialSlide),
                    d.refresh(b)),
                (h = f))
              : ((d.activeBreakpoint = f),
                "unslick" === d.breakpointSettings[f]
                  ? d.unslick(f)
                  : ((d.options = a.extend(
                      {},
                      d.originalSettings,
                      d.breakpointSettings[f]
                    )),
                    b === !0 && (d.currentSlide = d.options.initialSlide),
                    d.refresh(b)),
                (h = f))
            : null !== d.activeBreakpoint &&
              ((d.activeBreakpoint = null),
              (d.options = d.originalSettings),
              b === !0 && (d.currentSlide = d.options.initialSlide),
              d.refresh(b),
              (h = f)),
            b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
        }
      }),
      (b.prototype.changeSlide = function (b, c) {
        var f,
          g,
          h,
          d = this,
          e = a(b.currentTarget);

        switch (
          (e.is("a") && b.preventDefault(),
          e.is("li") || (e = e.closest("li")),
          (h = d.slideCount % d.options.slidesToScroll !== 0),
          (f = h
            ? 0
            : (d.slideCount - d.currentSlide) % d.options.slidesToScroll),
          b.data.message)
        ) {
          case "previous":
            (g =
              0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f),
              d.slideCount > d.options.slidesToShow &&
                d.slideHandler(d.currentSlide - g, !1, c);
            break;

          case "next":
            (g = 0 === f ? d.options.slidesToScroll : f),
              d.slideCount > d.options.slidesToShow &&
                d.slideHandler(d.currentSlide + g, !1, c);
            break;

          case "index":
            var i =
              0 === b.data.index
                ? 0
                : b.data.index || e.index() * d.options.slidesToScroll;
            d.slideHandler(d.checkNavigable(i), !1, c),
              e.children().trigger("focus");
            break;

          default:
            return;
        }
      }),
      (b.prototype.checkNavigable = function (a) {
        var c,
          d,
          b = this;
        if (((c = b.getNavigableIndexes()), (d = 0), a > c[c.length - 1]))
          a = c[c.length - 1];
        else
          for (var e in c) {
            if (a < c[e]) {
              a = d;
              break;
            }

            d = c[e];
          }
        return a;
      }),
      (b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots &&
          null !== b.$dots &&
          a("li", b.$dots)
            .off("click.slick", b.changeSlide)
            .off("mouseenter.slick", a.proxy(b.interrupt, b, !0))
            .off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
          b.$slider.off("focus.slick blur.slick"),
          b.options.arrows === !0 &&
            b.slideCount > b.options.slidesToShow &&
            (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
            b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
          b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
          b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
          b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
          b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
          b.$list.off("click.slick", b.clickHandler),
          a(document).off(b.visibilityChange, b.visibility),
          b.cleanUpSlideEvents(),
          b.options.accessibility === !0 &&
            b.$list.off("keydown.slick", b.keyHandler),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().off("click.slick", b.selectHandler),
          a(window).off(
            "orientationchange.slick.slick-" + b.instanceUid,
            b.orientationChange
          ),
          a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
          a("[draggable!=true]", b.$slideTrack).off(
            "dragstart",
            b.preventDefault
          ),
          a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
          a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
      }),
      (b.prototype.cleanUpSlideEvents = function () {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
          b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
      }),
      (b.prototype.cleanUpRows = function () {
        var b,
          a = this;
        a.options.rows > 1 &&
          ((b = a.$slides.children().children()),
          b.removeAttr("style"),
          a.$slider.empty().append(b));
      }),
      (b.prototype.clickHandler = function (a) {
        var b = this;
        b.shouldClick === !1 &&
          (a.stopImmediatePropagation(),
          a.stopPropagation(),
          a.preventDefault());
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(),
          (c.touchObject = {}),
          c.cleanUpEvents(),
          a(".slick-cloned", c.$slider).detach(),
          c.$dots && c.$dots.remove(),
          c.$prevArrow &&
            c.$prevArrow.length &&
            (c.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
          c.$nextArrow &&
            c.$nextArrow.length &&
            (c.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
          c.$slides &&
            (c.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                a(this).attr("style", a(this).data("originalStyling"));
              }),
            c.$slideTrack.children(this.options.slide).detach(),
            c.$slideTrack.detach(),
            c.$list.detach(),
            c.$slider.append(c.$slides)),
          c.cleanUpRows(),
          c.$slider.removeClass("slick-slider"),
          c.$slider.removeClass("slick-initialized"),
          c.$slider.removeClass("slick-dotted"),
          (c.unslicked = !0),
          b || c.$slider.trigger("destroy", [c]);
      }),
      (b.prototype.disableTransition = function (a) {
        var b = this,
          c = {};
        (c[b.transitionType] = ""),
          b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
      }),
      (b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1
          ? (c.$slides.eq(a).css({
              zIndex: c.options.zIndex,
            }),
            c.$slides.eq(a).animate(
              {
                opacity: 1,
              },
              c.options.speed,
              c.options.easing,
              b
            ))
          : (c.applyTransition(a),
            c.$slides.eq(a).css({
              opacity: 1,
              zIndex: c.options.zIndex,
            }),
            b &&
              setTimeout(function () {
                c.disableTransition(a), b.call();
              }, c.options.speed));
      }),
      (b.prototype.fadeSlideOut = function (a) {
        var b = this;
        b.cssTransitions === !1
          ? b.$slides.eq(a).animate(
              {
                opacity: 0,
                zIndex: b.options.zIndex - 2,
              },
              b.options.speed,
              b.options.easing
            )
          : (b.applyTransition(a),
            b.$slides.eq(a).css({
              opacity: 0,
              zIndex: b.options.zIndex - 2,
            }));
      }),
      (b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
        var b = this;
        null !== a &&
          ((b.$slidesCache = b.$slides),
          b.unload(),
          b.$slideTrack.children(this.options.slide).detach(),
          b.$slidesCache.filter(a).appendTo(b.$slideTrack),
          b.reinit());
      }),
      (b.prototype.focusHandler = function () {
        var b = this;
        b.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
            var d = a(this);
            setTimeout(function () {
              b.options.pauseOnFocus &&
                ((b.focussed = d.is(":focus")), b.autoPlay());
            }, 0);
          });
      }),
      (b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        var a = this;
        return a.currentSlide;
      }),
      (b.prototype.getDotCount = function () {
        var a = this,
          b = 0,
          c = 0,
          d = 0;
        if (a.options.infinite === !0)
          for (; b < a.slideCount; ) {
            ++d,
              (b = c + a.options.slidesToScroll),
              (c +=
                a.options.slidesToScroll <= a.options.slidesToShow
                  ? a.options.slidesToScroll
                  : a.options.slidesToShow);
          }
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
          for (; b < a.slideCount; ) {
            ++d,
              (b = c + a.options.slidesToScroll),
              (c +=
                a.options.slidesToScroll <= a.options.slidesToShow
                  ? a.options.slidesToScroll
                  : a.options.slidesToShow);
          }
        else
          d =
            1 +
            Math.ceil(
              (a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll
            );
        return d - 1;
      }),
      (b.prototype.getLeft = function (a) {
        var c,
          d,
          f,
          b = this,
          e = 0;
        return (
          (b.slideOffset = 0),
          (d = b.$slides.first().outerHeight(!0)),
          b.options.infinite === !0
            ? (b.slideCount > b.options.slidesToShow &&
                ((b.slideOffset = b.slideWidth * b.options.slidesToShow * -1),
                (e = d * b.options.slidesToShow * -1)),
              b.slideCount % b.options.slidesToScroll !== 0 &&
                a + b.options.slidesToScroll > b.slideCount &&
                b.slideCount > b.options.slidesToShow &&
                (a > b.slideCount
                  ? ((b.slideOffset =
                      (b.options.slidesToShow - (a - b.slideCount)) *
                      b.slideWidth *
                      -1),
                    (e =
                      (b.options.slidesToShow - (a - b.slideCount)) * d * -1))
                  : ((b.slideOffset =
                      (b.slideCount % b.options.slidesToScroll) *
                      b.slideWidth *
                      -1),
                    (e = (b.slideCount % b.options.slidesToScroll) * d * -1))))
            : a + b.options.slidesToShow > b.slideCount &&
              ((b.slideOffset =
                (a + b.options.slidesToShow - b.slideCount) * b.slideWidth),
              (e = (a + b.options.slidesToShow - b.slideCount) * d)),
          b.slideCount <= b.options.slidesToShow &&
            ((b.slideOffset = 0), (e = 0)),
          b.options.centerMode === !0 && b.options.infinite === !0
            ? (b.slideOffset +=
                b.slideWidth * Math.floor(b.options.slidesToShow / 2) -
                b.slideWidth)
            : b.options.centerMode === !0 &&
              ((b.slideOffset = 0),
              (b.slideOffset +=
                b.slideWidth * Math.floor(b.options.slidesToShow / 2))),
          (c =
            b.options.vertical === !1
              ? a * b.slideWidth * -1 + b.slideOffset
              : a * d * -1 + e),
          b.options.variableWidth === !0 &&
            ((f =
              b.slideCount <= b.options.slidesToShow ||
              b.options.infinite === !1
                ? b.$slideTrack.children(".slick-slide").eq(a)
                : b.$slideTrack
                    .children(".slick-slide")
                    .eq(a + b.options.slidesToShow)),
            (c =
              b.options.rtl === !0
                ? f[0]
                  ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                  : 0
                : f[0]
                ? -1 * f[0].offsetLeft
                : 0),
            b.options.centerMode === !0 &&
              ((f =
                b.slideCount <= b.options.slidesToShow ||
                b.options.infinite === !1
                  ? b.$slideTrack.children(".slick-slide").eq(a)
                  : b.$slideTrack
                      .children(".slick-slide")
                      .eq(a + b.options.slidesToShow + 1)),
              (c =
                b.options.rtl === !0
                  ? f[0]
                    ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                    : 0
                  : f[0]
                  ? -1 * f[0].offsetLeft
                  : 0),
              (c += (b.$list.width() - f.outerWidth()) / 2))),
          c
        );
      }),
      (b.prototype.getOption = b.prototype.slickGetOption = function (a) {
        var b = this;
        return b.options[a];
      }),
      (b.prototype.getNavigableIndexes = function () {
        var e,
          a = this,
          b = 0,
          c = 0,
          d = [];

        for (
          a.options.infinite === !1
            ? (e = a.slideCount)
            : ((b = -1 * a.options.slidesToScroll),
              (c = -1 * a.options.slidesToScroll),
              (e = 2 * a.slideCount));
          e > b;

        ) {
          d.push(b),
            (b = c + a.options.slidesToScroll),
            (c +=
              a.options.slidesToScroll <= a.options.slidesToShow
                ? a.options.slidesToScroll
                : a.options.slidesToShow);
        }

        return d;
      }),
      (b.prototype.getSlick = function () {
        return this;
      }),
      (b.prototype.getSlideCount = function () {
        var c,
          d,
          e,
          b = this;
        return (
          (e =
            b.options.centerMode === !0
              ? b.slideWidth * Math.floor(b.options.slidesToShow / 2)
              : 0),
          b.options.swipeToSlide === !0
            ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
                return f.offsetLeft - e + a(f).outerWidth() / 2 >
                  -1 * b.swipeLeft
                  ? ((d = f), !1)
                  : void 0;
              }),
              (c =
                Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1))
            : b.options.slidesToScroll
        );
      }),
      (b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
        var c = this;
        c.changeSlide(
          {
            data: {
              message: "index",
              index: parseInt(a),
            },
          },
          b
        );
      }),
      (b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") ||
          (a(c.$slider).addClass("slick-initialized"),
          c.buildRows(),
          c.buildOut(),
          c.setProps(),
          c.startLoad(),
          c.loadSlider(),
          c.initializeEvents(),
          c.updateArrows(),
          c.updateDots(),
          c.checkResponsive(!0),
          c.focusHandler()),
          b && c.$slider.trigger("init", [c]),
          c.options.accessibility === !0 && c.initADA(),
          c.options.autoplay && ((c.paused = !1), c.autoPlay());
      }),
      (b.prototype.initADA = function () {
        var b = this;
        b.$slides
          .add(b.$slideTrack.find(".slick-cloned"))
          .attr({
            "aria-hidden": "true",
            tabindex: "-1",
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "-1",
          }),
          b.$slideTrack.attr("role", "listbox"),
          b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            a(this).attr({
              role: "option",
            });
          }),
          null !== b.$dots &&
            b.$dots
              .attr("aria-hidden", "true")
              .find("li")
              .each(function (c) {
                a(this).attr({
                  role: "presentation",
                  "aria-selected": "false",
                  "aria-controls": "navigation" + b.instanceUid + c,
                  id: "slick-slide" + b.instanceUid + c,
                });
              })
              .first()
              .attr("aria-selected", "true")
              .end()
              .find("button")
              .attr("role", "button")
              .end()
              .closest("div")
              .attr("role", "toolbar"),
          b.activateADA();
      }),
      (b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.off("click.slick").on(
            "click.slick",
            {
              message: "previous",
            },
            a.changeSlide
          ),
          a.$nextArrow.off("click.slick").on(
            "click.slick",
            {
              message: "next",
            },
            a.changeSlide
          ));
      }),
      (b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 &&
          b.slideCount > b.options.slidesToShow &&
          a("li", b.$dots).on(
            "click.slick",
            {
              message: "index",
            },
            b.changeSlide
          ),
          b.options.dots === !0 &&
            b.options.pauseOnDotsHover === !0 &&
            a("li", b.$dots)
              .on("mouseenter.slick", a.proxy(b.interrupt, b, !0))
              .on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
      }),
      (b.prototype.initSlideEvents = function () {
        var b = this;
        b.options.pauseOnHover &&
          (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
          b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
      }),
      (b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(),
          b.initDotEvents(),
          b.initSlideEvents(),
          b.$list.on(
            "touchstart.slick mousedown.slick",
            {
              action: "start",
            },
            b.swipeHandler
          ),
          b.$list.on(
            "touchmove.slick mousemove.slick",
            {
              action: "move",
            },
            b.swipeHandler
          ),
          b.$list.on(
            "touchend.slick mouseup.slick",
            {
              action: "end",
            },
            b.swipeHandler
          ),
          b.$list.on(
            "touchcancel.slick mouseleave.slick",
            {
              action: "end",
            },
            b.swipeHandler
          ),
          b.$list.on("click.slick", b.clickHandler),
          a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
          b.options.accessibility === !0 &&
            b.$list.on("keydown.slick", b.keyHandler),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().on("click.slick", b.selectHandler),
          a(window).on(
            "orientationchange.slick.slick-" + b.instanceUid,
            a.proxy(b.orientationChange, b)
          ),
          a(window).on(
            "resize.slick.slick-" + b.instanceUid,
            a.proxy(b.resize, b)
          ),
          a("[draggable!=true]", b.$slideTrack).on(
            "dragstart",
            b.preventDefault
          ),
          a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
          a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
      }),
      (b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.show(), a.$nextArrow.show()),
          a.options.dots === !0 &&
            a.slideCount > a.options.slidesToShow &&
            a.$dots.show();
      }),
      (b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === a.keyCode && b.options.accessibility === !0
            ? b.changeSlide({
                data: {
                  message: b.options.rtl === !0 ? "next" : "previous",
                },
              })
            : 39 === a.keyCode &&
              b.options.accessibility === !0 &&
              b.changeSlide({
                data: {
                  message: b.options.rtl === !0 ? "previous" : "next",
                },
              }));
      }),
      (b.prototype.lazyLoad = function () {
        function g(c) {
          a("img[data-lazy]", c).each(function () {
            var c = a(this),
              d = a(this).attr("data-lazy"),
              e = document.createElement("img");
            (e.onload = function () {
              c.animate(
                {
                  opacity: 0,
                },
                100,
                function () {
                  c.attr("src", d).animate(
                    {
                      opacity: 1,
                    },
                    200,
                    function () {
                      c.removeAttr("data-lazy").removeClass("slick-loading");
                    }
                  ),
                    b.$slider.trigger("lazyLoaded", [b, c, d]);
                }
              );
            }),
              (e.onerror = function () {
                c
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  b.$slider.trigger("lazyLoadError", [b, c, d]);
              }),
              (e.src = d);
          });
        }

        var c,
          d,
          e,
          f,
          b = this;
        b.options.centerMode === !0
          ? b.options.infinite === !0
            ? ((e = b.currentSlide + (b.options.slidesToShow / 2 + 1)),
              (f = e + b.options.slidesToShow + 2))
            : ((e = Math.max(
                0,
                b.currentSlide - (b.options.slidesToShow / 2 + 1)
              )),
              (f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide))
          : ((e = b.options.infinite
              ? b.options.slidesToShow + b.currentSlide
              : b.currentSlide),
            (f = Math.ceil(e + b.options.slidesToShow)),
            b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)),
          (c = b.$slider.find(".slick-slide").slice(e, f)),
          g(c),
          b.slideCount <= b.options.slidesToShow
            ? ((d = b.$slider.find(".slick-slide")), g(d))
            : b.currentSlide >= b.slideCount - b.options.slidesToShow
            ? ((d = b.$slider
                .find(".slick-cloned")
                .slice(0, b.options.slidesToShow)),
              g(d))
            : 0 === b.currentSlide &&
              ((d = b.$slider
                .find(".slick-cloned")
                .slice(-1 * b.options.slidesToShow)),
              g(d));
      }),
      (b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(),
          a.$slideTrack.css({
            opacity: 1,
          }),
          a.$slider.removeClass("slick-loading"),
          a.initUI(),
          "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
      }),
      (b.prototype.next = b.prototype.slickNext = function () {
        var a = this;
        a.changeSlide({
          data: {
            message: "next",
          },
        });
      }),
      (b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition();
      }),
      (b.prototype.pause = b.prototype.slickPause = function () {
        var a = this;
        a.autoPlayClear(), (a.paused = !0);
      }),
      (b.prototype.play = b.prototype.slickPlay = function () {
        var a = this;
        a.autoPlay(),
          (a.options.autoplay = !0),
          (a.paused = !1),
          (a.focussed = !1),
          (a.interrupted = !1);
      }),
      (b.prototype.postSlide = function (a) {
        var b = this;
        b.unslicked ||
          (b.$slider.trigger("afterChange", [b, a]),
          (b.animating = !1),
          b.setPosition(),
          (b.swipeLeft = null),
          b.options.autoplay && b.autoPlay(),
          b.options.accessibility === !0 && b.initADA());
      }),
      (b.prototype.prev = b.prototype.slickPrev = function () {
        var a = this;
        a.changeSlide({
          data: {
            message: "previous",
          },
        });
      }),
      (b.prototype.preventDefault = function (a) {
        a.preventDefault();
      }),
      (b.prototype.progressiveLazyLoad = function (b) {
        b = b || 1;
        var e,
          f,
          g,
          c = this,
          d = a("img[data-lazy]", c.$slider);
        d.length
          ? ((e = d.first()),
            (f = e.attr("data-lazy")),
            (g = document.createElement("img")),
            (g.onload = function () {
              e
                .attr("src", f)
                .removeAttr("data-lazy")
                .removeClass("slick-loading"),
                c.options.adaptiveHeight === !0 && c.setPosition(),
                c.$slider.trigger("lazyLoaded", [c, e, f]),
                c.progressiveLazyLoad();
            }),
            (g.onerror = function () {
              3 > b
                ? setTimeout(function () {
                    c.progressiveLazyLoad(b + 1);
                  }, 500)
                : (e
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  c.$slider.trigger("lazyLoadError", [c, e, f]),
                  c.progressiveLazyLoad());
            }),
            (g.src = f))
          : c.$slider.trigger("allImagesLoaded", [c]);
      }),
      (b.prototype.refresh = function (b) {
        var d,
          e,
          c = this;
        (e = c.slideCount - c.options.slidesToShow),
          !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
          c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
          (d = c.currentSlide),
          c.destroy(!0),
          a.extend(c, c.initials, {
            currentSlide: d,
          }),
          c.init(),
          b ||
            c.changeSlide(
              {
                data: {
                  message: "index",
                  index: d,
                },
              },
              !1
            );
      }),
      (b.prototype.registerBreakpoints = function () {
        var c,
          d,
          e,
          b = this,
          f = b.options.responsive || null;

        if ("array" === a.type(f) && f.length) {
          b.respondTo = b.options.respondTo || "window";

          for (c in f) {
            if (
              ((e = b.breakpoints.length - 1),
              (d = f[c].breakpoint),
              f.hasOwnProperty(c))
            ) {
              for (; e >= 0; ) {
                b.breakpoints[e] &&
                  b.breakpoints[e] === d &&
                  b.breakpoints.splice(e, 1),
                  e--;
              }

              b.breakpoints.push(d), (b.breakpointSettings[d] = f[c].settings);
            }
          }

          b.breakpoints.sort(function (a, c) {
            return b.options.mobileFirst ? a - c : c - a;
          });
        }
      }),
      (b.prototype.reinit = function () {
        var b = this;
        (b.$slides = b.$slideTrack
          .children(b.options.slide)
          .addClass("slick-slide")),
          (b.slideCount = b.$slides.length),
          b.currentSlide >= b.slideCount &&
            0 !== b.currentSlide &&
            (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
          b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
          b.registerBreakpoints(),
          b.setProps(),
          b.setupInfinite(),
          b.buildArrows(),
          b.updateArrows(),
          b.initArrowEvents(),
          b.buildDots(),
          b.updateDots(),
          b.initDotEvents(),
          b.cleanUpSlideEvents(),
          b.initSlideEvents(),
          b.checkResponsive(!1, !0),
          b.options.focusOnSelect === !0 &&
            a(b.$slideTrack).children().on("click.slick", b.selectHandler),
          b.setSlideClasses(
            "number" == typeof b.currentSlide ? b.currentSlide : 0
          ),
          b.setPosition(),
          b.focusHandler(),
          (b.paused = !b.options.autoplay),
          b.autoPlay(),
          b.$slider.trigger("reInit", [b]);
      }),
      (b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth &&
          (clearTimeout(b.windowDelay),
          (b.windowDelay = window.setTimeout(function () {
            (b.windowWidth = a(window).width()),
              b.checkResponsive(),
              b.unslicked || b.setPosition();
          }, 50)));
      }),
      (b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
        var d = this;
        return (
          "boolean" == typeof a
            ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1))
            : (a = b === !0 ? --a : a),
          d.slideCount < 1 || 0 > a || a > d.slideCount - 1
            ? !1
            : (d.unload(),
              c === !0
                ? d.$slideTrack.children().remove()
                : d.$slideTrack.children(this.options.slide).eq(a).remove(),
              (d.$slides = d.$slideTrack.children(this.options.slide)),
              d.$slideTrack.children(this.options.slide).detach(),
              d.$slideTrack.append(d.$slides),
              (d.$slidesCache = d.$slides),
              void d.reinit())
        );
      }),
      (b.prototype.setCSS = function (a) {
        var d,
          e,
          b = this,
          c = {};
        b.options.rtl === !0 && (a = -a),
          (d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
          (e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
          (c[b.positionProp] = a),
          b.transformsEnabled === !1
            ? b.$slideTrack.css(c)
            : ((c = {}),
              b.cssTransitions === !1
                ? ((c[b.animType] = "translate(" + d + ", " + e + ")"),
                  b.$slideTrack.css(c))
                : ((c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)"),
                  b.$slideTrack.css(c)));
      }),
      (b.prototype.setDimensions = function () {
        var a = this;
        a.options.vertical === !1
          ? a.options.centerMode === !0 &&
            a.$list.css({
              padding: "0px " + a.options.centerPadding,
            })
          : (a.$list.height(
              a.$slides.first().outerHeight(!0) * a.options.slidesToShow
            ),
            a.options.centerMode === !0 &&
              a.$list.css({
                padding: a.options.centerPadding + " 0px",
              })),
          (a.listWidth = a.$list.width()),
          (a.listHeight = a.$list.height()),
          a.options.vertical === !1 && a.options.variableWidth === !1
            ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)),
              a.$slideTrack.width(
                Math.ceil(
                  a.slideWidth * a.$slideTrack.children(".slick-slide").length
                )
              ))
            : a.options.variableWidth === !0
            ? a.$slideTrack.width(5e3 * a.slideCount)
            : ((a.slideWidth = Math.ceil(a.listWidth)),
              a.$slideTrack.height(
                Math.ceil(
                  a.$slides.first().outerHeight(!0) *
                    a.$slideTrack.children(".slick-slide").length
                )
              ));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 &&
          a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
      }),
      (b.prototype.setFade = function () {
        var c,
          b = this;
        b.$slides.each(function (d, e) {
          (c = b.slideWidth * d * -1),
            b.options.rtl === !0
              ? a(e).css({
                  position: "relative",
                  right: c,
                  top: 0,
                  zIndex: b.options.zIndex - 2,
                  opacity: 0,
                })
              : a(e).css({
                  position: "relative",
                  left: c,
                  top: 0,
                  zIndex: b.options.zIndex - 2,
                  opacity: 0,
                });
        }),
          b.$slides.eq(b.currentSlide).css({
            zIndex: b.options.zIndex - 1,
            opacity: 1,
          });
      }),
      (b.prototype.setHeight = function () {
        var a = this;

        if (
          1 === a.options.slidesToShow &&
          a.options.adaptiveHeight === !0 &&
          a.options.vertical === !1
        ) {
          var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
          a.$list.css("height", b);
        }
      }),
      (b.prototype.setOption = b.prototype.slickSetOption = function () {
        var c,
          d,
          e,
          f,
          h,
          b = this,
          g = !1;
        if (
          ("object" === a.type(arguments[0])
            ? ((e = arguments[0]), (g = arguments[1]), (h = "multiple"))
            : "string" === a.type(arguments[0]) &&
              ((e = arguments[0]),
              (f = arguments[1]),
              (g = arguments[2]),
              "responsive" === arguments[0] && "array" === a.type(arguments[1])
                ? (h = "responsive")
                : "undefined" != typeof arguments[1] && (h = "single")),
          "single" === h)
        )
          b.options[e] = f;
        else if ("multiple" === h)
          a.each(e, function (a, c) {
            b.options[a] = c;
          });
        else if ("responsive" === h)
          for (d in f) {
            if ("array" !== a.type(b.options.responsive))
              b.options.responsive = [f[d]];
            else {
              for (c = b.options.responsive.length - 1; c >= 0; ) {
                b.options.responsive[c].breakpoint === f[d].breakpoint &&
                  b.options.responsive.splice(c, 1),
                  c--;
              }

              b.options.responsive.push(f[d]);
            }
          }
        g && (b.unload(), b.reinit());
      }),
      (b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(),
          a.setHeight(),
          a.options.fade === !1
            ? a.setCSS(a.getLeft(a.currentSlide))
            : a.setFade(),
          a.$slider.trigger("setPosition", [a]);
      }),
      (b.prototype.setProps = function () {
        var a = this,
          b = document.body.style;
        (a.positionProp = a.options.vertical === !0 ? "top" : "left"),
          "top" === a.positionProp
            ? a.$slider.addClass("slick-vertical")
            : a.$slider.removeClass("slick-vertical"),
          (void 0 !== b.WebkitTransition ||
            void 0 !== b.MozTransition ||
            void 0 !== b.msTransition) &&
            a.options.useCSS === !0 &&
            (a.cssTransitions = !0),
          a.options.fade &&
            ("number" == typeof a.options.zIndex
              ? a.options.zIndex < 3 && (a.options.zIndex = 3)
              : (a.options.zIndex = a.defaults.zIndex)),
          void 0 !== b.OTransform &&
            ((a.animType = "OTransform"),
            (a.transformType = "-o-transform"),
            (a.transitionType = "OTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.webkitPerspective &&
              (a.animType = !1)),
          void 0 !== b.MozTransform &&
            ((a.animType = "MozTransform"),
            (a.transformType = "-moz-transform"),
            (a.transitionType = "MozTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.MozPerspective &&
              (a.animType = !1)),
          void 0 !== b.webkitTransform &&
            ((a.animType = "webkitTransform"),
            (a.transformType = "-webkit-transform"),
            (a.transitionType = "webkitTransition"),
            void 0 === b.perspectiveProperty &&
              void 0 === b.webkitPerspective &&
              (a.animType = !1)),
          void 0 !== b.msTransform &&
            ((a.animType = "msTransform"),
            (a.transformType = "-ms-transform"),
            (a.transitionType = "msTransition"),
            void 0 === b.msTransform && (a.animType = !1)),
          void 0 !== b.transform &&
            a.animType !== !1 &&
            ((a.animType = "transform"),
            (a.transformType = "transform"),
            (a.transitionType = "transition")),
          (a.transformsEnabled =
            a.options.useTransform && null !== a.animType && a.animType !== !1);
      }),
      (b.prototype.setSlideClasses = function (a) {
        var c,
          d,
          e,
          f,
          b = this;
        (d = b.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
          b.$slides.eq(a).addClass("slick-current"),
          b.options.centerMode === !0
            ? ((c = Math.floor(b.options.slidesToShow / 2)),
              b.options.infinite === !0 &&
                (a >= c && a <= b.slideCount - 1 - c
                  ? b.$slides
                      .slice(a - c, a + c + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((e = b.options.slidesToShow + a),
                    d
                      .slice(e - c + 1, e + c + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === a
                  ? d
                      .eq(d.length - 1 - b.options.slidesToShow)
                      .addClass("slick-center")
                  : a === b.slideCount - 1 &&
                    d.eq(b.options.slidesToShow).addClass("slick-center")),
              b.$slides.eq(a).addClass("slick-center"))
            : a >= 0 && a <= b.slideCount - b.options.slidesToShow
            ? b.$slides
                .slice(a, a + b.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : d.length <= b.options.slidesToShow
            ? d.addClass("slick-active").attr("aria-hidden", "false")
            : ((f = b.slideCount % b.options.slidesToShow),
              (e = b.options.infinite === !0 ? b.options.slidesToShow + a : a),
              b.options.slidesToShow == b.options.slidesToScroll &&
              b.slideCount - a < b.options.slidesToShow
                ? d
                    .slice(e - (b.options.slidesToShow - f), e + f)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : d
                    .slice(e, e + b.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
          "ondemand" === b.options.lazyLoad && b.lazyLoad();
      }),
      (b.prototype.setupInfinite = function () {
        var c,
          d,
          e,
          b = this;

        if (
          (b.options.fade === !0 && (b.options.centerMode = !1),
          b.options.infinite === !0 &&
            b.options.fade === !1 &&
            ((d = null), b.slideCount > b.options.slidesToShow))
        ) {
          for (
            e =
              b.options.centerMode === !0
                ? b.options.slidesToShow + 1
                : b.options.slidesToShow,
              c = b.slideCount;
            c > b.slideCount - e;
            c -= 1
          ) {
            (d = c - 1),
              a(b.$slides[d])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", d - b.slideCount)
                .prependTo(b.$slideTrack)
                .addClass("slick-cloned");
          }

          for (c = 0; e > c; c += 1) {
            (d = c),
              a(b.$slides[d])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", d + b.slideCount)
                .appendTo(b.$slideTrack)
                .addClass("slick-cloned");
          }

          b.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              a(this).attr("id", "");
            });
        }
      }),
      (b.prototype.interrupt = function (a) {
        var b = this;
        a || b.autoPlay(), (b.interrupted = a);
      }),
      (b.prototype.selectHandler = function (b) {
        var c = this,
          d = a(b.target).is(".slick-slide")
            ? a(b.target)
            : a(b.target).parents(".slick-slide"),
          e = parseInt(d.attr("data-slick-index"));
        return (
          e || (e = 0),
          c.slideCount <= c.options.slidesToShow
            ? (c.setSlideClasses(e), void c.asNavFor(e))
            : void c.slideHandler(e)
        );
      }),
      (b.prototype.slideHandler = function (a, b, c) {
        var d,
          e,
          f,
          g,
          j,
          h = null,
          i = this;
        return (
          (b = b || !1),
          (i.animating === !0 && i.options.waitForAnimate === !0) ||
          (i.options.fade === !0 && i.currentSlide === a) ||
          i.slideCount <= i.options.slidesToShow
            ? void 0
            : (b === !1 && i.asNavFor(a),
              (d = a),
              (h = i.getLeft(d)),
              (g = i.getLeft(i.currentSlide)),
              (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
              i.options.infinite === !1 &&
              i.options.centerMode === !1 &&
              (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
                ? void (
                    i.options.fade === !1 &&
                    ((d = i.currentSlide),
                    c !== !0
                      ? i.animateSlide(g, function () {
                          i.postSlide(d);
                        })
                      : i.postSlide(d))
                  )
                : i.options.infinite === !1 &&
                  i.options.centerMode === !0 &&
                  (0 > a || a > i.slideCount - i.options.slidesToScroll)
                ? void (
                    i.options.fade === !1 &&
                    ((d = i.currentSlide),
                    c !== !0
                      ? i.animateSlide(g, function () {
                          i.postSlide(d);
                        })
                      : i.postSlide(d))
                  )
                : (i.options.autoplay && clearInterval(i.autoPlayTimer),
                  (e =
                    0 > d
                      ? i.slideCount % i.options.slidesToScroll !== 0
                        ? i.slideCount -
                          (i.slideCount % i.options.slidesToScroll)
                        : i.slideCount + d
                      : d >= i.slideCount
                      ? i.slideCount % i.options.slidesToScroll !== 0
                        ? 0
                        : d - i.slideCount
                      : d),
                  (i.animating = !0),
                  i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
                  (f = i.currentSlide),
                  (i.currentSlide = e),
                  i.setSlideClasses(i.currentSlide),
                  i.options.asNavFor &&
                    ((j = i.getNavTarget()),
                    (j = j.slick("getSlick")),
                    j.slideCount <= j.options.slidesToShow &&
                      j.setSlideClasses(i.currentSlide)),
                  i.updateDots(),
                  i.updateArrows(),
                  i.options.fade === !0
                    ? (c !== !0
                        ? (i.fadeSlideOut(f),
                          i.fadeSlide(e, function () {
                            i.postSlide(e);
                          }))
                        : i.postSlide(e),
                      void i.animateHeight())
                    : void (c !== !0
                        ? i.animateSlide(h, function () {
                            i.postSlide(e);
                          })
                        : i.postSlide(e))))
        );
      }),
      (b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          (a.$prevArrow.hide(), a.$nextArrow.hide()),
          a.options.dots === !0 &&
            a.slideCount > a.options.slidesToShow &&
            a.$dots.hide(),
          a.$slider.addClass("slick-loading");
      }),
      (b.prototype.swipeDirection = function () {
        var a,
          b,
          c,
          d,
          e = this;
        return (
          (a = e.touchObject.startX - e.touchObject.curX),
          (b = e.touchObject.startY - e.touchObject.curY),
          (c = Math.atan2(b, a)),
          (d = Math.round((180 * c) / Math.PI)),
          0 > d && (d = 360 - Math.abs(d)),
          45 >= d && d >= 0
            ? e.options.rtl === !1
              ? "left"
              : "right"
            : 360 >= d && d >= 315
            ? e.options.rtl === !1
              ? "left"
              : "right"
            : d >= 135 && 225 >= d
            ? e.options.rtl === !1
              ? "right"
              : "left"
            : e.options.verticalSwiping === !0
            ? d >= 35 && 135 >= d
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (b.prototype.swipeEnd = function (a) {
        var c,
          d,
          b = this;
        if (
          ((b.dragging = !1),
          (b.interrupted = !1),
          (b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0),
          void 0 === b.touchObject.curX)
        )
          return !1;

        if (
          (b.touchObject.edgeHit === !0 &&
            b.$slider.trigger("edge", [b, b.swipeDirection()]),
          b.touchObject.swipeLength >= b.touchObject.minSwipe)
        ) {
          switch ((d = b.swipeDirection())) {
            case "left":
            case "down":
              (c = b.options.swipeToSlide
                ? b.checkNavigable(b.currentSlide + b.getSlideCount())
                : b.currentSlide + b.getSlideCount()),
                (b.currentDirection = 0);
              break;

            case "right":
            case "up":
              (c = b.options.swipeToSlide
                ? b.checkNavigable(b.currentSlide - b.getSlideCount())
                : b.currentSlide - b.getSlideCount()),
                (b.currentDirection = 1);
          }

          "vertical" != d &&
            (b.slideHandler(c),
            (b.touchObject = {}),
            b.$slider.trigger("swipe", [b, d]));
        } else
          b.touchObject.startX !== b.touchObject.curX &&
            (b.slideHandler(b.currentSlide), (b.touchObject = {}));
      }),
      (b.prototype.swipeHandler = function (a) {
        var b = this;
        if (
          !(
            b.options.swipe === !1 ||
            ("ontouchend" in document && b.options.swipe === !1) ||
            (b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))
          )
        )
          switch (
            ((b.touchObject.fingerCount =
              a.originalEvent && void 0 !== a.originalEvent.touches
                ? a.originalEvent.touches.length
                : 1),
            (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
            b.options.verticalSwiping === !0 &&
              (b.touchObject.minSwipe =
                b.listHeight / b.options.touchThreshold),
            a.data.action)
          ) {
            case "start":
              b.swipeStart(a);
              break;

            case "move":
              b.swipeMove(a);
              break;

            case "end":
              b.swipeEnd(a);
          }
      }),
      (b.prototype.swipeMove = function (a) {
        var d,
          e,
          f,
          g,
          h,
          b = this;
        return (
          (h = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
          !b.dragging || (h && 1 !== h.length)
            ? !1
            : ((d = b.getLeft(b.currentSlide)),
              (b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX),
              (b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY),
              (b.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(b.touchObject.curX - b.touchObject.startX, 2)
                )
              )),
              b.options.verticalSwiping === !0 &&
                (b.touchObject.swipeLength = Math.round(
                  Math.sqrt(
                    Math.pow(b.touchObject.curY - b.touchObject.startY, 2)
                  )
                )),
              (e = b.swipeDirection()),
              "vertical" !== e
                ? (void 0 !== a.originalEvent &&
                    b.touchObject.swipeLength > 4 &&
                    a.preventDefault(),
                  (g =
                    (b.options.rtl === !1 ? 1 : -1) *
                    (b.touchObject.curX > b.touchObject.startX ? 1 : -1)),
                  b.options.verticalSwiping === !0 &&
                    (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
                  (f = b.touchObject.swipeLength),
                  (b.touchObject.edgeHit = !1),
                  b.options.infinite === !1 &&
                    ((0 === b.currentSlide && "right" === e) ||
                      (b.currentSlide >= b.getDotCount() && "left" === e)) &&
                    ((f = b.touchObject.swipeLength * b.options.edgeFriction),
                    (b.touchObject.edgeHit = !0)),
                  b.options.vertical === !1
                    ? (b.swipeLeft = d + f * g)
                    : (b.swipeLeft =
                        d + f * (b.$list.height() / b.listWidth) * g),
                  b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
                  b.options.fade === !0 || b.options.touchMove === !1
                    ? !1
                    : b.animating === !0
                    ? ((b.swipeLeft = null), !1)
                    : void b.setCSS(b.swipeLeft))
                : void 0)
        );
      }),
      (b.prototype.swipeStart = function (a) {
        var c,
          b = this;
        return (
          (b.interrupted = !0),
          1 !== b.touchObject.fingerCount ||
          b.slideCount <= b.options.slidesToShow
            ? ((b.touchObject = {}), !1)
            : (void 0 !== a.originalEvent &&
                void 0 !== a.originalEvent.touches &&
                (c = a.originalEvent.touches[0]),
              (b.touchObject.startX = b.touchObject.curX =
                void 0 !== c ? c.pageX : a.clientX),
              (b.touchObject.startY = b.touchObject.curY =
                void 0 !== c ? c.pageY : a.clientY),
              void (b.dragging = !0))
        );
      }),
      (b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var a = this;
        null !== a.$slidesCache &&
          (a.unload(),
          a.$slideTrack.children(this.options.slide).detach(),
          a.$slidesCache.appendTo(a.$slideTrack),
          a.reinit());
      }),
      (b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(),
          b.$dots && b.$dots.remove(),
          b.$prevArrow &&
            b.htmlExpr.test(b.options.prevArrow) &&
            b.$prevArrow.remove(),
          b.$nextArrow &&
            b.htmlExpr.test(b.options.nextArrow) &&
            b.$nextArrow.remove(),
          b.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy();
      }),
      (b.prototype.updateArrows = function () {
        var b,
          a = this;
        (b = Math.floor(a.options.slidesToShow / 2)),
          a.options.arrows === !0 &&
            a.slideCount > a.options.slidesToShow &&
            !a.options.infinite &&
            (a.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            a.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === a.currentSlide
              ? (a.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                a.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : a.currentSlide >= a.slideCount - a.options.slidesToShow &&
                a.options.centerMode === !1
              ? (a.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                a.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : a.currentSlide >= a.slideCount - 1 &&
                a.options.centerMode === !0 &&
                (a.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                a.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots &&
          (a.$dots
            .find("li")
            .removeClass("slick-active")
            .attr("aria-hidden", "true"),
          a.$dots
            .find("li")
            .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
            .addClass("slick-active")
            .attr("aria-hidden", "false"));
      }),
      (b.prototype.visibility = function () {
        var a = this;
        a.options.autoplay &&
          (document[a.hidden] ? (a.interrupted = !0) : (a.interrupted = !1));
      }),
      (a.fn.slick = function () {
        var f,
          g,
          a = this,
          c = arguments[0],
          d = Array.prototype.slice.call(arguments, 1),
          e = a.length;

        for (f = 0; e > f; f++) {
          if (
            ("object" == _typeof(c) || "undefined" == typeof c
              ? (a[f].slick = new b(a[f], c))
              : (g = a[f].slick[c].apply(a[f].slick, d)),
            "undefined" != typeof g)
          )
            return g;
        }

        return a;
      });
  });
  /*!
    Colorbox 1.6.4
    license: MIT
    http://www.jacklmoore.com/colorbox
  
    Modified by Clean Canvas to add aria-labels
  */

  (function (t, e, i) {
    function n(i, n, o) {
      var r = e.createElement(i);
      return n && (r.id = Z + n), o && (r.style.cssText = o), t(r);
    }

    function o() {
      return i.innerHeight ? i.innerHeight : t(i).height();
    }

    function r(e, i) {
      i !== Object(i) && (i = {}),
        (this.cache = {}),
        (this.el = e),
        (this.value = function (e) {
          var n;
          return (
            void 0 === this.cache[e] &&
              ((n = t(this.el).attr("data-cbox-" + e)),
              void 0 !== n
                ? (this.cache[e] = n)
                : void 0 !== i[e]
                ? (this.cache[e] = i[e])
                : void 0 !== X[e] && (this.cache[e] = X[e])),
            this.cache[e]
          );
        }),
        (this.get = function (e) {
          var i = this.value(e);
          return t.isFunction(i) ? i.call(this.el, this) : i;
        });
    }

    function h(t) {
      var e = W.length,
        i = (A + t) % e;
      return 0 > i ? e + i : i;
    }

    function a(t, e) {
      return Math.round(
        (/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) *
          parseInt(t, 10)
      );
    }

    function s(t, e) {
      return t.get("photo") || t.get("photoRegex").test(e);
    }

    function l(t, e) {
      return t.get("retinaUrl") && i.devicePixelRatio > 1
        ? e.replace(t.get("photoRegex"), t.get("retinaSuffix"))
        : e;
    }

    function d(t) {
      "contains" in x[0] &&
        !x[0].contains(t.target) &&
        t.target !== v[0] &&
        (t.stopPropagation(), x.focus());
    }

    function c(t) {
      c.str !== t && (x.add(v).removeClass(c.str).addClass(t), (c.str = t));
    }

    function g(e) {
      (A = 0),
        e && e !== !1 && "nofollow" !== e
          ? ((W = t("." + te).filter(function () {
              var i = t.data(this, Y),
                n = new r(this, i);
              return n.get("rel") === e;
            })),
            (A = W.index(_.el)),
            -1 === A && ((W = W.add(_.el)), (A = W.length - 1)))
          : (W = t(_.el));
    }

    function u(i) {
      t(e).trigger(i), ae.triggerHandler(i);
    }

    function f(i) {
      var o;

      if (!G) {
        if (((o = t(i).data(Y)), (_ = new r(i, o)), g(_.get("rel")), !U)) {
          (U = $ = !0),
            c(_.get("className")),
            x.css({
              visibility: "hidden",
              display: "block",
              opacity: "",
            }),
            (I = n(
              se,
              "LoadedContent",
              "width:0; height:0; overflow:hidden; visibility:hidden"
            )),
            b
              .css({
                width: "",
                height: "",
              })
              .append(I),
            (j = T.height() + k.height() + b.outerHeight(!0) - b.height()),
            (D = C.width() + H.width() + b.outerWidth(!0) - b.width()),
            (N = I.outerHeight(!0)),
            (z = I.outerWidth(!0));

          var h = a(_.get("initialWidth"), "x"),
            s = a(_.get("initialHeight"), "y"),
            l = _.get("maxWidth"),
            f = _.get("maxHeight");

          (_.w = Math.max((l !== !1 ? Math.min(h, a(l, "x")) : h) - z - D, 0)),
            (_.h = Math.max(
              (f !== !1 ? Math.min(s, a(f, "y")) : s) - N - j,
              0
            )),
            I.css({
              width: "",
              height: _.h,
            }),
            J.position(),
            u(ee),
            _.get("onOpen"),
            O.add(F).hide(),
            x.focus(),
            _.get("trapFocus") &&
              e.addEventListener &&
              (e.addEventListener("focus", d, !0),
              ae.one(re, function () {
                e.removeEventListener("focus", d, !0);
              })),
            _.get("returnFocus") &&
              ae.one(re, function () {
                t(_.el).focus();
              });
        }

        var p = parseFloat(_.get("opacity"));
        v
          .css({
            opacity: p === p ? p : "",
            cursor: _.get("overlayClose") ? "pointer" : "",
            visibility: "visible",
          })
          .show(),
          _.get("closeButton")
            ? B.html(_.get("close")).appendTo(b)
            : B.appendTo("<div/>"),
          w();
      }
    }

    function p() {
      x ||
        ((V = !1),
        (E = t(i)),
        (x = n(se)
          .attr({
            id: Y,
            class: t.support.opacity === !1 ? Z + "IE" : "",
            role: "dialog",
            tabindex: "-1",
          })
          .hide()),
        (v = n(se, "Overlay").hide()),
        (L = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]])),
        (y = n(se, "Wrapper")),
        (b = n(se, "Content").append(
          (F = n(se, "Title")),
          (R = n(se, "Current")),
          (P = t(
            '<button type="button" aria-label="' +
              theme.strings.previous +
              '"/>'
          ).attr({
            id: Z + "Previous",
          })),
          (K = t(
            '<button type="button" aria-label="' + theme.strings.next + '"/>'
          ).attr({
            id: Z + "Next",
          })),
          (S = t(
            '<button type="button" aria-label="' +
              theme.strings.slideshow +
              '"/>'
          ).attr({
            id: Z + "Slideshow",
          })),
          L
        )),
        (B = t(
          '<button type="button" aria-label="' + theme.strings.close + '"/>'
        ).attr({
          id: Z + "Close",
        })),
        y
          .append(
            n(se).append(
              n(se, "TopLeft"),
              (T = n(se, "TopCenter")),
              n(se, "TopRight")
            ),
            n(se, !1, "clear:left").append(
              (C = n(se, "MiddleLeft")),
              b,
              (H = n(se, "MiddleRight"))
            ),
            n(se, !1, "clear:left").append(
              n(se, "BottomLeft"),
              (k = n(se, "BottomCenter")),
              n(se, "BottomRight")
            )
          )
          .find("div div")
          .css({
            float: "left",
          }),
        (M = n(
          se,
          !1,
          "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"
        )),
        (O = K.add(P).add(R).add(S))),
        e.body && !x.parent().length && t(e.body).append(v, x.append(y, M));
    }

    function m() {
      function i(t) {
        t.which > 1 ||
          t.shiftKey ||
          t.altKey ||
          t.metaKey ||
          t.ctrlKey ||
          (t.preventDefault(), f(this));
      }

      return x
        ? (V ||
            ((V = !0),
            K.click(function () {
              J.next();
            }),
            P.click(function () {
              J.prev();
            }),
            B.click(function () {
              J.close();
            }),
            v.click(function () {
              _.get("overlayClose") && J.close();
            }),
            t(e).bind("keydown." + Z, function (t) {
              var e = t.keyCode;
              U &&
                _.get("escKey") &&
                27 === e &&
                (t.preventDefault(), J.close()),
                U &&
                  _.get("arrowKey") &&
                  W[1] &&
                  !t.altKey &&
                  (37 === e
                    ? (t.preventDefault(), P.click())
                    : 39 === e && (t.preventDefault(), K.click()));
            }),
            t.isFunction(t.fn.on)
              ? t(e).on("click." + Z, "." + te, i)
              : t("." + te).live("click." + Z, i)),
          !0)
        : !1;
    }

    function w() {
      var e,
        o,
        r,
        h = J.prep,
        d = ++le;

      if (
        (($ = !0),
        (q = !1),
        u(he),
        u(ie),
        _.get("onLoad"),
        (_.h = _.get("height")
          ? a(_.get("height"), "y") - N - j
          : _.get("innerHeight") && a(_.get("innerHeight"), "y")),
        (_.w = _.get("width")
          ? a(_.get("width"), "x") - z - D
          : _.get("innerWidth") && a(_.get("innerWidth"), "x")),
        (_.mw = _.w),
        (_.mh = _.h),
        _.get("maxWidth") &&
          ((_.mw = a(_.get("maxWidth"), "x") - z - D),
          (_.mw = _.w && _.w < _.mw ? _.w : _.mw)),
        _.get("maxHeight") &&
          ((_.mh = a(_.get("maxHeight"), "y") - N - j),
          (_.mh = _.h && _.h < _.mh ? _.h : _.mh)),
        (e = _.get("href")),
        (Q = setTimeout(function () {
          L.show();
        }, 100)),
        _.get("inline"))
      ) {
        var c = t(e).eq(0);
        (r = t("<div>").hide().insertBefore(c)),
          ae.one(he, function () {
            r.replaceWith(c);
          }),
          h(c);
      } else
        _.get("iframe")
          ? h(" ")
          : _.get("html")
          ? h(_.get("html"))
          : s(_, e)
          ? ((e = l(_, e)),
            (q = _.get("createImg")),
            t(q)
              .addClass(Z + "Photo")
              .bind("error." + Z, function () {
                h(n(se, "Error").html(_.get("imgError")));
              })
              .one("load", function () {
                d === le &&
                  setTimeout(function () {
                    var e;
                    _.get("retinaImage") &&
                      i.devicePixelRatio > 1 &&
                      ((q.height = q.height / i.devicePixelRatio),
                      (q.width = q.width / i.devicePixelRatio)),
                      _.get("scalePhotos") &&
                        ((o = function o() {
                          (q.height -= q.height * e), (q.width -= q.width * e);
                        }),
                        _.mw &&
                          q.width > _.mw &&
                          ((e = (q.width - _.mw) / q.width), o()),
                        _.mh &&
                          q.height > _.mh &&
                          ((e = (q.height - _.mh) / q.height), o())),
                      _.h &&
                        (q.style.marginTop =
                          Math.max(_.mh - q.height, 0) / 2 + "px"),
                      W[1] &&
                        (_.get("loop") || W[A + 1]) &&
                        ((q.style.cursor = "pointer"),
                        t(q).bind("click." + Z, function () {
                          J.next();
                        })),
                      (q.style.width = q.width + "px"),
                      (q.style.height = q.height + "px"),
                      h(q);
                  }, 1);
              }),
            (q.src = e))
          : e &&
            M.load(e, _.get("data"), function (e, i) {
              d === le &&
                h(
                  "error" === i
                    ? n(se, "Error").html(_.get("xhrError"))
                    : t(this).contents()
                );
            });
    }

    var v,
      x,
      y,
      b,
      T,
      C,
      H,
      k,
      W,
      E,
      I,
      M,
      L,
      F,
      R,
      S,
      K,
      P,
      B,
      O,
      _,
      j,
      D,
      N,
      z,
      A,
      q,
      U,
      $,
      G,
      Q,
      J,
      V,
      X = {
        html: !1,
        photo: !1,
        iframe: !1,
        inline: !1,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: !1,
        initialWidth: "600",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "450",
        innerHeight: !1,
        maxHeight: !1,
        scalePhotos: !0,
        scrolling: !0,
        opacity: 0.9,
        preloading: !0,
        className: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        top: !1,
        bottom: !1,
        left: !1,
        right: !1,
        fixed: !1,
        data: void 0,
        closeButton: !0,
        fastIframe: !0,
        open: !1,
        reposition: !0,
        loop: !0,
        slideshow: !1,
        slideshowAuto: !0,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: !1,
        retinaUrl: !1,
        retinaSuffix: "@2x.$1",
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: !0,
        trapFocus: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        rel: function rel() {
          return this.rel;
        },
        href: function href() {
          return t(this).attr("href");
        },
        title: function title() {
          return this.title;
        },
        createImg: function createImg() {
          var e = new Image(),
            i = t(this).data("cbox-img-attrs");
          return (
            "object" == _typeof(i) &&
              t.each(i, function (t, i) {
                e[t] = i;
              }),
            e
          );
        },
        createIframe: function createIframe() {
          var i = e.createElement("iframe"),
            n = t(this).data("cbox-iframe-attrs");
          return (
            "object" == _typeof(n) &&
              t.each(n, function (t, e) {
                i[t] = e;
              }),
            "frameBorder" in i && (i.frameBorder = 0),
            "allowTransparency" in i && (i.allowTransparency = "true"),
            (i.name = new Date().getTime()),
            (i.allowFullscreen = !0),
            i
          );
        },
      },
      Y = "colorbox",
      Z = "cbox",
      te = Z + "Element",
      ee = Z + "_open",
      ie = Z + "_load",
      ne = Z + "_complete",
      oe = Z + "_cleanup",
      re = Z + "_closed",
      he = Z + "_purge",
      ae = t("<a/>"),
      se = "div",
      le = 0,
      de = {},
      ce = (function () {
        function t() {
          clearTimeout(h);
        }

        function e() {
          (_.get("loop") || W[A + 1]) &&
            (t(), (h = setTimeout(J.next, _.get("slideshowSpeed"))));
        }

        function i() {
          S.html(_.get("slideshowStop")).unbind(s).one(s, n),
            ae.bind(ne, e).bind(ie, t),
            x.removeClass(a + "off").addClass(a + "on");
        }

        function n() {
          t(),
            ae.unbind(ne, e).unbind(ie, t),
            S.html(_.get("slideshowStart"))
              .unbind(s)
              .one(s, function () {
                J.next(), i();
              }),
            x.removeClass(a + "on").addClass(a + "off");
        }

        function o() {
          (r = !1),
            S.hide(),
            t(),
            ae.unbind(ne, e).unbind(ie, t),
            x.removeClass(a + "off " + a + "on");
        }

        var r,
          h,
          a = Z + "Slideshow_",
          s = "click." + Z;
        return function () {
          r
            ? _.get("slideshow") || (ae.unbind(oe, o), o())
            : _.get("slideshow") &&
              W[1] &&
              ((r = !0),
              ae.one(oe, o),
              _.get("slideshowAuto") ? i() : n(),
              S.show());
        };
      })();

    t[Y] ||
      (t(p),
      (J = t.fn[Y] = t[Y] = function (e, i) {
        var n,
          o = this;
        return (
          (e = e || {}),
          t.isFunction(o) && ((o = t("<a/>")), (e.open = !0)),
          o[0]
            ? (p(),
              m() &&
                (i && (e.onComplete = i),
                o
                  .each(function () {
                    var i = t.data(this, Y) || {};
                    t.data(this, Y, t.extend(i, e));
                  })
                  .addClass(te),
                (n = new r(o[0], e)),
                n.get("open") && f(o[0])),
              o)
            : o
        );
      }),
      (J.position = function (e, i) {
        function n() {
          (T[0].style.width = k[0].style.width = b[0].style.width =
            parseInt(x[0].style.width, 10) - D + "px"),
            (b[0].style.height = C[0].style.height = H[0].style.height =
              parseInt(x[0].style.height, 10) - j + "px");
        }

        var r,
          h,
          s,
          l = 0,
          d = 0,
          c = x.offset();

        if (
          (E.unbind("resize." + Z),
          x.css({
            top: -9e4,
            left: -9e4,
          }),
          (h = E.scrollTop()),
          (s = E.scrollLeft()),
          _.get("fixed")
            ? ((c.top -= h),
              (c.left -= s),
              x.css({
                position: "fixed",
              }))
            : ((l = h),
              (d = s),
              x.css({
                position: "absolute",
              })),
          (d +=
            _.get("right") !== !1
              ? Math.max(E.width() - _.w - z - D - a(_.get("right"), "x"), 0)
              : _.get("left") !== !1
              ? a(_.get("left"), "x")
              : Math.round(Math.max(E.width() - _.w - z - D, 0) / 2)),
          (l +=
            _.get("bottom") !== !1
              ? Math.max(o() - _.h - N - j - a(_.get("bottom"), "y"), 0)
              : _.get("top") !== !1
              ? a(_.get("top"), "y")
              : Math.round(Math.max(o() - _.h - N - j, 0) / 2)),
          x.css({
            top: c.top,
            left: c.left,
            visibility: "visible",
          }),
          (y[0].style.width = y[0].style.height = "9999px"),
          (r = {
            width: _.w + z + D,
            height: _.h + N + j,
            top: l,
            left: d,
          }),
          e)
        ) {
          var g = 0;
          t.each(r, function (t) {
            return r[t] !== de[t] ? ((g = e), void 0) : void 0;
          }),
            (e = g);
        }

        (de = r),
          e || x.css(r),
          x.dequeue().animate(r, {
            duration: e || 0,
            complete: function complete() {
              n(),
                ($ = !1),
                (y[0].style.width = _.w + z + D + "px"),
                (y[0].style.height = _.h + N + j + "px"),
                _.get("reposition") &&
                  setTimeout(function () {
                    E.bind("resize." + Z, J.position);
                  }, 1),
                t.isFunction(i) && i();
            },
            step: n,
          });
      }),
      (J.resize = function (t) {
        var e;
        U &&
          ((t = t || {}),
          t.width && (_.w = a(t.width, "x") - z - D),
          t.innerWidth && (_.w = a(t.innerWidth, "x")),
          I.css({
            width: _.w,
          }),
          t.height && (_.h = a(t.height, "y") - N - j),
          t.innerHeight && (_.h = a(t.innerHeight, "y")),
          t.innerHeight ||
            t.height ||
            ((e = I.scrollTop()),
            I.css({
              height: "auto",
            }),
            (_.h = I.height())),
          I.css({
            height: _.h,
          }),
          e && I.scrollTop(e),
          J.position("none" === _.get("transition") ? 0 : _.get("speed")));
      }),
      (J.prep = function (i) {
        function o() {
          return (
            (_.w = _.w || I.width()),
            (_.w = _.mw && _.mw < _.w ? _.mw : _.w),
            _.w
          );
        }

        function a() {
          return (
            (_.h = _.h || I.height()),
            (_.h = _.mh && _.mh < _.h ? _.mh : _.h),
            _.h
          );
        }

        if (U) {
          var d,
            g = "none" === _.get("transition") ? 0 : _.get("speed");
          I.remove(),
            (I = n(se, "LoadedContent").append(i)),
            I.hide()
              .appendTo(M.show())
              .css({
                width: o(),
                overflow: _.get("scrolling") ? "auto" : "hidden",
              })
              .css({
                height: a(),
              })
              .prependTo(b),
            M.hide(),
            t(q).css({
              float: "none",
            }),
            c(_.get("className")),
            (d = function d() {
              function i() {
                t.support.opacity === !1 &&
                  x[0].style.removeAttribute("filter");
              }

              var n,
                o,
                a = W.length;
              U &&
                ((o = function o() {
                  clearTimeout(Q), L.hide(), u(ne), _.get("onComplete");
                }),
                F.html(_.get("title")).show(),
                I.show(),
                a > 1
                  ? ("string" == typeof _.get("current") &&
                      R.html(
                        _.get("current")
                          .replace("{current}", A + 1)
                          .replace("{total}", a)
                      ).show(),
                    K[_.get("loop") || a - 1 > A ? "show" : "hide"]().html(
                      _.get("next")
                    ),
                    P[_.get("loop") || A ? "show" : "hide"]().html(
                      _.get("previous")
                    ),
                    ce(),
                    _.get("preloading") &&
                      t.each([h(-1), h(1)], function () {
                        var i,
                          n = W[this],
                          o = new r(n, t.data(n, Y)),
                          h = o.get("href");
                        h &&
                          s(o, h) &&
                          ((h = l(o, h)),
                          (i = e.createElement("img")),
                          (i.src = h));
                      }))
                  : O.hide(),
                _.get("iframe")
                  ? ((n = _.get("createIframe")),
                    _.get("scrolling") || (n.scrolling = "no"),
                    t(n)
                      .attr({
                        src: _.get("href"),
                        class: Z + "Iframe",
                      })
                      .one("load", o)
                      .appendTo(I),
                    ae.one(he, function () {
                      n.src = "//about:blank";
                    }),
                    _.get("fastIframe") && t(n).trigger("load"))
                  : o(),
                "fade" === _.get("transition") ? x.fadeTo(g, 1, i) : i());
            }),
            "fade" === _.get("transition")
              ? x.fadeTo(g, 0, function () {
                  J.position(0, d);
                })
              : J.position(g, d);
        }
      }),
      (J.next = function () {
        !$ && W[1] && (_.get("loop") || W[A + 1]) && ((A = h(1)), f(W[A]));
      }),
      (J.prev = function () {
        !$ && W[1] && (_.get("loop") || A) && ((A = h(-1)), f(W[A]));
      }),
      (J.close = function () {
        U &&
          !G &&
          ((G = !0),
          (U = !1),
          u(oe),
          _.get("onCleanup"),
          E.unbind("." + Z),
          v.fadeTo(_.get("fadeOut") || 0, 0),
          x.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
            x.hide(),
              v.hide(),
              u(he),
              I.remove(),
              setTimeout(function () {
                (G = !1), u(re), _.get("onClosed");
              }, 1);
          }));
      }),
      (J.remove = function () {
        x &&
          (x.stop(),
          t[Y].close(),
          x.stop(!1, !0).remove(),
          v.remove(),
          (G = !1),
          (x = null),
          t("." + te)
            .removeData(Y)
            .removeClass(te),
          t(e)
            .unbind("click." + Z)
            .unbind("keydown." + Z));
      }),
      (J.element = function () {
        return t(_.el);
      }),
      (J.settings = X));
  })(jQuery, document, window);
  /*!
  	Zoom 1.7.18
  	license: MIT
  	http://www.jacklmoore.com/zoom
  */

  (function (o) {
    var t = {
      url: !1,
      callback: !1,
      target: !1,
      duration: 120,
      on: "mouseover",
      touch: !0,
      onZoomIn: !1,
      onZoomOut: !1,
      magnify: 1,
    };
    (o.zoom = function (t, n, e, i) {
      var u,
        c,
        a,
        r,
        m,
        l,
        s,
        f = o(t),
        h = f.css("position"),
        d = o(n);
      return (
        (t.style.position = /(absolute|fixed)/.test(h) ? h : "relative"),
        (t.style.overflow = "hidden"),
        (e.style.width = e.style.height = ""),
        o(e)
          .addClass("zoomImg")
          .attr("alt", "Zoom image")
          .css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: e.width * i,
            height: e.height * i,
            border: "none",
            maxWidth: "none",
            maxHeight: "none",
          })
          .appendTo(t),
        {
          init: function init() {
            (c = f.outerWidth()),
              (u = f.outerHeight()),
              n === t
                ? ((r = c), (a = u))
                : ((r = d.outerWidth()), (a = d.outerHeight())),
              (m = (e.width - c) / r),
              (l = (e.height - u) / a),
              (s = d.offset());
          },
          move: function move(o) {
            var t = o.pageX - s.left,
              n = o.pageY - s.top;
            (n = Math.max(Math.min(n, a), 0)),
              (t = Math.max(Math.min(t, r), 0)),
              (e.style.left = t * -m + "px"),
              (e.style.top = n * -l + "px");
          },
        }
      );
    }),
      (o.fn.zoom = function (n) {
        return this.each(function () {
          var e = o.extend({}, t, n || {}),
            i = (e.target && o(e.target)[0]) || this,
            u = this,
            c = o(u),
            a = document.createElement("img"),
            r = o(a),
            m = "mousemove.zoom",
            l = !1,
            s = !1;

          if (!e.url) {
            var f = u.querySelector("img");
            if (
              (f &&
                (e.url = f.getAttribute("data-src") || f.currentSrc || f.src),
              !e.url)
            )
              return;
          }

          c.one(
            "zoom.destroy",
            function (o, t) {
              c.off(".zoom"),
                (i.style.position = o),
                (i.style.overflow = t),
                (a.onload = null),
                r.remove();
            }.bind(this, i.style.position, i.style.overflow)
          ),
            (a.onload = function () {
              function t(t) {
                f.init(),
                  f.move(t),
                  r
                    .stop()
                    .fadeTo(
                      o.support.opacity ? e.duration : 0,
                      1,
                      o.isFunction(e.onZoomIn) ? e.onZoomIn.call(a) : !1
                    );
              }

              function n() {
                r.stop().fadeTo(
                  e.duration,
                  0,
                  o.isFunction(e.onZoomOut) ? e.onZoomOut.call(a) : !1
                );
              }

              var f = o.zoom(i, u, a, e.magnify);
              "grab" === e.on
                ? c.on("mousedown.zoom", function (e) {
                    1 === e.which &&
                      (o(document).one("mouseup.zoom", function () {
                        n(), o(document).off(m, f.move);
                      }),
                      t(e),
                      o(document).on(m, f.move),
                      e.preventDefault());
                  })
                : "click" === e.on
                ? c.on("click.zoom", function (e) {
                    return l
                      ? void 0
                      : ((l = !0),
                        t(e),
                        o(document).on(m, f.move),
                        o(document).one("click.zoom", function () {
                          n(), (l = !1), o(document).off(m, f.move);
                        }),
                        !1);
                  })
                : "toggle" === e.on
                ? c.on("click.zoom", function (o) {
                    l ? n() : t(o), (l = !l);
                  })
                : "mouseover" === e.on &&
                  (f.init(),
                  c
                    .on("mouseenter.zoom", t)
                    .on("mouseleave.zoom", n)
                    .on(m, f.move)),
                e.touch &&
                  c
                    .on("touchstart.zoom", function (o) {
                      o.preventDefault(),
                        s
                          ? ((s = !1), n())
                          : ((s = !0),
                            t(
                              o.originalEvent.touches[0] ||
                                o.originalEvent.changedTouches[0]
                            ));
                    })
                    .on("touchmove.zoom", function (o) {
                      o.preventDefault(),
                        f.move(
                          o.originalEvent.touches[0] ||
                            o.originalEvent.changedTouches[0]
                        );
                    })
                    .on("touchend.zoom", function (o) {
                      o.preventDefault(), s && ((s = !1), n());
                    }),
                o.isFunction(e.callback) && e.callback.call(a);
            }),
            (a.src = e.url);
        });
      }),
      (o.fn.zoom.defaults = t);
  })(window.jQuery);
  /*
   * v.1.0
   *
   * debouncedresize: special jQuery event that happens once after a window resize
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery-smartresize
   *
   * Copyright 2012 @louis_remi
   * Licensed under the MIT license.
   *
   * This saved you an hour of work?
   * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
   */

  (function () {
    var $event = $.event,
      $special,
      resizeTimeout;
    $special = $event.special.debouncedresize = {
      setup: function setup() {
        $(this).on("resize", $special.handler);
      },
      teardown: function teardown() {
        $(this).off("resize", $special.handler);
      },
      handler: function handler(event, execAsap) {
        // Save the context
        var context = this,
          args = arguments,
          dispatch = function dispatch() {
            // set correct event type
            event.type = "debouncedresize";
            $event.dispatch.apply(context, args);
          };

        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }

        execAsap
          ? dispatch()
          : (resizeTimeout = setTimeout(dispatch, $special.threshold));
      },
      threshold: 150,
    };
  })();
  /*
     v1.0
  
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
  
         http://www.apache.org/licenses/LICENSE-2.0
  
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
  */

  (function () {
    var defaultDiacriticsRemovalMap = [
      {
        base: "A",
        letters:
          "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F",
      },
      {
        base: "AA",
        letters: "\uA732",
      },
      {
        base: "AE",
        letters: "\xC6\u01FC\u01E2",
      },
      {
        base: "AO",
        letters: "\uA734",
      },
      {
        base: "AU",
        letters: "\uA736",
      },
      {
        base: "AV",
        letters: "\uA738\uA73A",
      },
      {
        base: "AY",
        letters: "\uA73C",
      },
      {
        base: "B",
        letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181",
      },
      {
        base: "C",
        letters:
          "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E",
      },
      {
        base: "D",
        letters:
          "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\xD0",
      },
      {
        base: "DZ",
        letters: "\u01F1\u01C4",
      },
      {
        base: "Dz",
        letters: "\u01F2\u01C5",
      },
      {
        base: "E",
        letters:
          "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E",
      },
      {
        base: "F",
        letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B",
      },
      {
        base: "G",
        letters:
          "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E",
      },
      {
        base: "H",
        letters:
          "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D",
      },
      {
        base: "I",
        letters:
          "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197",
      },
      {
        base: "J",
        letters: "J\u24BF\uFF2A\u0134\u0248",
      },
      {
        base: "K",
        letters:
          "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2",
      },
      {
        base: "L",
        letters:
          "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780",
      },
      {
        base: "LJ",
        letters: "\u01C7",
      },
      {
        base: "Lj",
        letters: "\u01C8",
      },
      {
        base: "M",
        letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C",
      },
      {
        base: "N",
        letters:
          "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4",
      },
      {
        base: "NJ",
        letters: "\u01CA",
      },
      {
        base: "Nj",
        letters: "\u01CB",
      },
      {
        base: "O",
        letters:
          "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C",
      },
      {
        base: "OI",
        letters: "\u01A2",
      },
      {
        base: "OO",
        letters: "\uA74E",
      },
      {
        base: "OU",
        letters: "\u0222",
      },
      {
        base: "OE",
        letters: "\x8C\u0152",
      },
      {
        base: "oe",
        letters: "\x9C\u0153",
      },
      {
        base: "P",
        letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754",
      },
      {
        base: "Q",
        letters: "Q\u24C6\uFF31\uA756\uA758\u024A",
      },
      {
        base: "R",
        letters:
          "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782",
      },
      {
        base: "S",
        letters:
          "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784",
      },
      {
        base: "T",
        letters:
          "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786",
      },
      {
        base: "TZ",
        letters: "\uA728",
      },
      {
        base: "U",
        letters:
          "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244",
      },
      {
        base: "V",
        letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245",
      },
      {
        base: "VY",
        letters: "\uA760",
      },
      {
        base: "W",
        letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72",
      },
      {
        base: "X",
        letters: "X\u24CD\uFF38\u1E8A\u1E8C",
      },
      {
        base: "Y",
        letters:
          "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE",
      },
      {
        base: "Z",
        letters:
          "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762",
      },
      {
        base: "a",
        letters:
          "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250",
      },
      {
        base: "aa",
        letters: "\uA733",
      },
      {
        base: "ae",
        letters: "\xE6\u01FD\u01E3",
      },
      {
        base: "ao",
        letters: "\uA735",
      },
      {
        base: "au",
        letters: "\uA737",
      },
      {
        base: "av",
        letters: "\uA739\uA73B",
      },
      {
        base: "ay",
        letters: "\uA73D",
      },
      {
        base: "b",
        letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253",
      },
      {
        base: "c",
        letters:
          "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184",
      },
      {
        base: "d",
        letters:
          "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A",
      },
      {
        base: "dz",
        letters: "\u01F3\u01C6",
      },
      {
        base: "e",
        letters:
          "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD",
      },
      {
        base: "f",
        letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C",
      },
      {
        base: "g",
        letters:
          "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F",
      },
      {
        base: "h",
        letters:
          "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265",
      },
      {
        base: "hv",
        letters: "\u0195",
      },
      {
        base: "i",
        letters:
          "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131",
      },
      {
        base: "j",
        letters: "j\u24D9\uFF4A\u0135\u01F0\u0249",
      },
      {
        base: "k",
        letters:
          "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3",
      },
      {
        base: "l",
        letters:
          "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747",
      },
      {
        base: "lj",
        letters: "\u01C9",
      },
      {
        base: "m",
        letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F",
      },
      {
        base: "n",
        letters:
          "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5",
      },
      {
        base: "nj",
        letters: "\u01CC",
      },
      {
        base: "o",
        letters:
          "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275",
      },
      {
        base: "oi",
        letters: "\u01A3",
      },
      {
        base: "ou",
        letters: "\u0223",
      },
      {
        base: "oo",
        letters: "\uA74F",
      },
      {
        base: "p",
        letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755",
      },
      {
        base: "q",
        letters: "q\u24E0\uFF51\u024B\uA757\uA759",
      },
      {
        base: "r",
        letters:
          "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783",
      },
      {
        base: "s",
        letters:
          "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B",
      },
      {
        base: "t",
        letters:
          "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787",
      },
      {
        base: "tz",
        letters: "\uA729",
      },
      {
        base: "u",
        letters:
          "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289",
      },
      {
        base: "v",
        letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C",
      },
      {
        base: "vy",
        letters: "\uA761",
      },
      {
        base: "w",
        letters:
          "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73",
      },
      {
        base: "x",
        letters: "x\u24E7\uFF58\u1E8B\u1E8D",
      },
      {
        base: "y",
        letters:
          "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF",
      },
      {
        base: "z",
        letters:
          "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763",
      },
    ];
    var diacriticsMap = {};

    for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
      var letters = defaultDiacriticsRemovalMap[i].letters;

      for (var j = 0; j < letters.length; j++) {
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
      }
    } // "what?" version ... http://jsperf.com/diacritics/12

    window.removeDiacritics = function (str) {
      if (typeof str !== "string") {
        console.warn(
          "Invalid parameter passed to window.removeDiacritics (".concat(
            _typeof(str),
            ")"
          ),
          str
        );
        return str;
      }

      return str.replace(/[^\u0000-\u007E]/g, function (a) {
        return diacriticsMap[a] || a;
      });
    };
  })();
})(theme.jQuery);
