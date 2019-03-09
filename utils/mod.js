// https://d3js.org/d3-array/ v2.0.3 Copyright 2018 Mike Bostock
! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(t.d3 = t.d3 || {})
}(this, function(t) {
    "use strict";

    function n(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
    }

    function r(t) {
        var r;
        return 1 === t.length && (r = t, t = function(t, e) {
            return n(r(t), e)
        }), {
            left: function(n, r, e, o) {
                for (null == e && (e = 0), null == o && (o = n.length); e < o;) {
                    var f = e + o >>> 1;
                    t(n[f], r) < 0 ? e = f + 1 : o = f
                }
                return e
            },
            right: function(n, r, e, o) {
                for (null == e && (e = 0), null == o && (o = n.length); e < o;) {
                    var f = e + o >>> 1;
                    t(n[f], r) > 0 ? o = f : e = f + 1
                }
                return e
            }
        }
    }
    var e = r(n),
        o = e.right,
        f = e.left;

    function u(t) {
        return 0 | t.length
    }

    function i(t) {
        return !(t > 0)
    }

    function l(t) {
        return "object" != typeof t || "length" in t ? t : Array.from(t)
    }

    function a(t, n) {
        let r, e = 0,
            o = 0,
            f = 0;
        if (void 0 === n)
            for (let n of t) null != n && (n = +n) >= n && (f += (r = n - o) * (n - (o += r / ++e)));
        else {
            let u = -1;
            for (let i of t) null != (i = n(i, ++u, t)) && (i = +i) >= i && (f += (r = i - o) * (i - (o += r / ++e)))
        }
        if (e > 1) return f / (e - 1)
    }

    function c(t, n) {
        const r = a(t, n);
        return r ? Math.sqrt(r) : r
    }

    function h(t, n) {
        let r, e;
        if (void 0 === n)
            for (let n of t) null != n && n >= n && (void 0 === r ? r = e = n : (r > n && (r = n), e < n && (e = n)));
        else {
            let o = -1;
            for (let f of t) null != (f = n(f, ++o, t)) && f >= f && (void 0 === r ? r = e = f : (r > f && (r = f), e < f && (e = f)))
        }
        return [r, e]
    }

    function s(t) {
        return t
    }

    function M(t, n, ...r) {
        return function t(e, o) {
            if (o >= r.length) return n(e);
            const f = function(t, n) {
                const r = new Map;
                let e = -1;
                for (const o of t) {
                    const f = n(o, ++e, t),
                        u = r.get(f);
                    u ? u.push(o) : r.set(f, [o])
                }
                return r
            }(e, r[o]);
            return new Map(Array.from(f, ([n, r]) => [n, t(r, o + 1)]))
        }(t, 0)
    }
    var p = Array.prototype,
        d = p.slice,
        g = p.map;

    function v(t) {
        return function() {
            return t
        }
    }

    function y(t, n, r) {
        t = +t, n = +n, r = (o = arguments.length) < 2 ? (n = t, t = 0, 1) : o < 3 ? 1 : +r;
        for (var e = -1, o = 0 | Math.max(0, Math.ceil((n - t) / r)), f = new Array(o); ++e < o;) f[e] = t + e * r;
        return f
    }
    var m = Math.sqrt(50),
        A = Math.sqrt(10),
        w = Math.sqrt(2);

    function x(t, n, r) {
        var e = (n - t) / Math.max(0, r),
            o = Math.floor(Math.log(e) / Math.LN10),
            f = e / Math.pow(10, o);
        return o >= 0 ? (f >= m ? 10 : f >= A ? 5 : f >= w ? 2 : 1) * Math.pow(10, o) : -Math.pow(10, -o) / (f >= m ? 10 : f >= A ? 5 : f >= w ? 2 : 1)
    }

    function N(t, n, r) {
        var e = Math.abs(n - t) / Math.max(0, r),
            o = Math.pow(10, Math.floor(Math.log(e) / Math.LN10)),
            f = e / o;
        return f >= m ? o *= 10 : f >= A ? o *= 5 : f >= w && (o *= 2), n < t ? -o : o
    }

    function b(t) {
        return Math.ceil(Math.log(t.length) / Math.LN2) + 1
    }

    function q(t) {
        return null === t ? NaN : +t
    }

    function k(t, n, r = q) {
        if (e = t.length) {
            if ((n = +n) <= 0 || e < 2) return +r(t[0], 0, t);
            if (n >= 1) return +r(t[e - 1], e - 1, t);
            var e, o = (e - 1) * n,
                f = Math.floor(o),
                u = +r(t[f], f, t);
            return u + (+r(t[f + 1], f + 1, t) - u) * (o - f)
        }
    }

    function L(t, r, e = 0, o = t.length - 1, f = n) {
        for (; o > e;) {
            if (o - e > 600) {
                const n = o - e + 1,
                    u = r - e + 1,
                    i = Math.log(n),
                    l = .5 * Math.exp(2 * i / 3),
                    a = .5 * Math.sqrt(i * l * (n - l) / n) * (u - n / 2 < 0 ? -1 : 1);
                L(t, r, Math.max(e, Math.floor(r - u * l / n + a)), Math.min(o, Math.floor(r + (n - u) * l / n + a)), f)
            }
            const n = t[r];
            let u = e,
                i = o;
            for (j(t, e, r), f(t[o], n) > 0 && j(t, e, o); u < i;) {
                for (j(t, u, i), ++u, --i; f(t[u], n) < 0;) ++u;
                for (; f(t[i], n) > 0;) --i
            }
            0 === f(t[e], n) ? j(t, e, i) : j(t, ++i, o), i <= r && (e = i + 1), r <= i && (o = i - 1)
        }
        return t
    }

    function j(t, n, r) {
        const e = t[n];
        t[n] = t[r], t[r] = e
    }

    function F(t, n) {
        let r;
        if (void 0 === n)
            for (let n of t) null != n && n >= n && (void 0 === r || r > n) && (r = n);
        else {
            let e = -1;
            for (let o of t) null != (o = n(o, ++e, t)) && o >= o && (void 0 === r || r > o) && (r = o)
        }
        return r
    }

    function S(t) {
        if (!(o = t.length)) return [];
        for (var n = -1, r = F(t, _), e = new Array(r); ++n < r;)
            for (var o, f = -1, u = e[n] = new Array(o); ++f < o;) u[f] = t[f][n];
        return e
    }

    function _(t) {
        return t.length
    }
    t.bisect = o, t.bisectRight = o, t.bisectLeft = f, t.ascending = n, t.bisector = r, t.cross = function(...t) {
        const n = "function" == typeof t[t.length - 1] && function(t) {
                return n => t(...n)
            }(t.pop()),
            r = (t = t.map(l)).map(u),
            e = t.length - 1,
            o = new Array(e + 1).fill(0),
            f = [];
        if (e < 0 || r.some(i)) return f;
        for (;;) {
            f.push(o.map((n, r) => t[r][n]));
            let u = e;
            for (; ++o[u] === r[u];) {
                if (0 === u) return n ? f.map(n) : f;
                o[u--] = 0
            }
        }
    }, t.descending = function(t, n) {
        return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
    }, t.deviation = c, t.extent = h, t.group = function(t, ...n) {
        return M(t, s, ...n)
    }, t.histogram = function() {
        var t = s,
            n = h,
            r = b;

        function e(e) {
            Array.isArray(e) || (e = Array.from(e));
            var f, u, i = e.length,
                l = new Array(i);
            for (f = 0; f < i; ++f) l[f] = t(e[f], f, e);
            var a = n(l),
                c = a[0],
                h = a[1],
                s = r(l, c, h);
            Array.isArray(s) || (s = N(c, h, s), s = y(Math.ceil(c / s) * s, h, s));
            for (var M = s.length; s[0] <= c;) s.shift(), --M;
            for (; s[M - 1] > h;) s.pop(), --M;
            var p, d = new Array(M + 1);
            for (f = 0; f <= M; ++f)(p = d[f] = []).x0 = f > 0 ? s[f - 1] : c, p.x1 = f < M ? s[f] : h;
            for (f = 0; f < i; ++f) c <= (u = l[f]) && u <= h && d[o(s, u, 0, M)].push(e[f]);
            return d
        }
        return e.value = function(n) {
            return arguments.length ? (t = "function" == typeof n ? n : v(n), e) : t
        }, e.domain = function(t) {
            return arguments.length ? (n = "function" == typeof t ? t : v([t[0], t[1]]), e) : n
        }, e.thresholds = function(t) {
            return arguments.length ? (r = "function" == typeof t ? t : Array.isArray(t) ? v(d.call(t)) : v(t), e) : r
        }, e
    }, t.thresholdFreedmanDiaconis = function(t, r, e) {
        return t = g.call(t, q).sort(n), Math.ceil((e - r) / (2 * (k(t, .75) - k(t, .25)) * Math.pow(t.length, -1 / 3)))
    }, t.thresholdScott = function(t, n, r) {
        return Math.ceil((r - n) / (3.5 * c(t) * Math.pow(t.length, -1 / 3)))
    }, t.thresholdSturges = b, t.max = function(t, n) {
        let r;
        if (void 0 === n)
            for (let n of t) null != n && n >= n && (void 0 === r || r < n) && (r = n);
        else {
            let e = -1;
            for (let o of t) null != (o = n(o, ++e, t)) && o >= o && (void 0 === r || r < o) && (r = o)
        }
        return r
    }, t.mean = function(t, n) {
        let r = 0,
            e = 0;
        if (void 0 === n)
            for (let n of t) null != n && (n = +n) >= n && (++r, e += n);
        else {
            let o = -1;
            for (let f of t) null != (f = n(f, ++o, t)) && (f = +f) >= f && (++r, e += f)
        }
        if (r) return e / r
    }, t.median = function(t, n) {
        if (!(t = Float64Array.from(function*(t, n) {
                if (void 0 === n)
                    for (let n of t) null != n && (n = +n) >= n && (yield n);
                else {
                    let r = -1;
                    for (let e of t) null != (e = n(e, ++r, t)) && (e = +e) >= e && (yield e)
                }
            }(t, n))).length) return;
        const r = t.length,
            e = r >> 1;
        return L(t, e - 1, 0), 0 == (1 & r) && L(t, e, e), k(t, .5)
    }, t.merge = function(t) {
        return Array.from(function*(t) {
            for (const n of t) yield* n
        }(t))
    }, t.min = F, t.pairs = function(t, n = function(t, n) {
        return [t, n]
    }) {
        const r = [];
        let e, o = !1;
        for (const f of t) o && r.push(n(e, f)), e = f, o = !0;
        return r
    }, t.permute = function(t, n) {
        for (var r = n.length, e = new Array(r); r--;) e[r] = t[n[r]];
        return e
    }, t.quantile = k, t.quickselect = L, t.range = y, t.rollup = M, t.scan = function(t, r = n) {
        let e, o, f = -1;
        for (const n of t) ++f, (void 0 === o ? 0 === r(n, n) : r(n, e) < 0) && (e = n, o = f);
        return o
    }, t.shuffle = function(t, n = 0, r = t.length) {
        for (var e, o, f = r - (n = +n); f;) o = Math.random() * f-- | 0, e = t[f + n], t[f + n] = t[o + n], t[o + n] = e;
        return t
    }, t.sum = function(t, n) {
        let r = 0;
        if (void 0 === n)
            for (let n of t)(n = +n) && (r += n);
        else {
            let e = -1;
            for (let o of t)(o = +n(o, ++e, t)) && (r += o)
        }
        return r
    }, t.ticks = function(t, n, r) {
        var e, o, f, u, i = -1;
        if (r = +r, (t = +t) == (n = +n) && r > 0) return [t];
        if ((e = n < t) && (o = t, t = n, n = o), 0 === (u = x(t, n, r)) || !isFinite(u)) return [];
        if (u > 0)
            for (t = Math.ceil(t / u), n = Math.floor(n / u), f = new Array(o = Math.ceil(n - t + 1)); ++i < o;) f[i] = (t + i) * u;
        else
            for (t = Math.floor(t * u), n = Math.ceil(n * u), f = new Array(o = Math.ceil(t - n + 1)); ++i < o;) f[i] = (t - i) / u;
        return e && f.reverse(), f
    }, t.tickIncrement = x, t.tickStep = N, t.transpose = S, t.variance = a, t.zip = function() {
        return S(arguments)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});