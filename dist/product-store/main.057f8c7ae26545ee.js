"use strict";
(self.webpackChunkproduct_store = self.webpackChunkproduct_store || []).push([
  [179],
  {
    477: () => {
      function re(e) {
        return "function" == typeof e;
      }
      function xr(e) {
        const r = e((n) => {
          Error.call(n), (n.stack = new Error().stack);
        });
        return (
          (r.prototype = Object.create(Error.prototype)),
          (r.prototype.constructor = r),
          r
        );
      }
      const si = xr(
        (e) =>
          function (r) {
            e(this),
              (this.message = r
                ? `${r.length} errors occurred during unsubscription:\n${r
                    .map((n, i) => `${i + 1}) ${n.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = r);
          }
      );
      function Pr(e, t) {
        if (e) {
          const r = e.indexOf(t);
          0 <= r && e.splice(r, 1);
        }
      }
      class je {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: r } = this;
            if (r)
              if (((this._parentage = null), Array.isArray(r)))
                for (const o of r) o.remove(this);
              else r.remove(this);
            const { initialTeardown: n } = this;
            if (re(n))
              try {
                n();
              } catch (o) {
                t = o instanceof si ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  ai(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof si ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new si(t);
          }
        }
        add(t) {
          var r;
          if (t && t !== this)
            if (this.closed) ai(t);
            else {
              if (t instanceof je) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (r = this._finalizers) && void 0 !== r ? r : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: r } = this;
          return r === t || (Array.isArray(r) && r.includes(t));
        }
        _addParent(t) {
          const { _parentage: r } = this;
          this._parentage = Array.isArray(r) ? (r.push(t), r) : r ? [r, t] : t;
        }
        _removeParent(t) {
          const { _parentage: r } = this;
          r === t ? (this._parentage = null) : Array.isArray(r) && Pr(r, t);
        }
        remove(t) {
          const { _finalizers: r } = this;
          r && Pr(r, t), t instanceof je && t._removeParent(this);
        }
      }
      je.EMPTY = (() => {
        const e = new je();
        return (e.closed = !0), e;
      })();
      const Cs = je.EMPTY;
      function wl(e) {
        return (
          e instanceof je ||
          (e && "closed" in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        );
      }
      function ai(e) {
        re(e) ? e() : e.unsubscribe();
      }
      const kr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Qi = {
          setTimeout(e, t, ...r) {
            const { delegate: n } = Qi;
            return n?.setTimeout
              ? n.setTimeout(e, t, ...r)
              : setTimeout(e, t, ...r);
          },
          clearTimeout(e) {
            const { delegate: t } = Qi;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Nd(e) {
        Qi.setTimeout(() => {
          const { onUnhandledError: t } = kr;
          if (!t) throw e;
          t(e);
        });
      }
      function li() {}
      const Ad = ws("C", void 0, void 0);
      function ws(e, t, r) {
        return { kind: e, value: t, error: r };
      }
      let gr = null;
      function Qn(e) {
        if (kr.useDeprecatedSynchronousErrorHandling) {
          const t = !gr;
          if ((t && (gr = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: r, error: n } = gr;
            if (((gr = null), r)) throw n;
          }
        } else e();
      }
      class Ki extends je {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), wl(t) && t.add(this))
              : (this.destination = Ss);
        }
        static create(t, r, n) {
          return new _r(t, r, n);
        }
        next(t) {
          this.isStopped
            ? Es(
                (function xd(e) {
                  return ws("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Es(
                (function Rd(e) {
                  return ws("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Es(Ad, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const El = Function.prototype.bind;
      function Xi(e, t) {
        return El.call(e, t);
      }
      class Sl {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: r } = this;
          if (r.next)
            try {
              r.next(t);
            } catch (n) {
              an(n);
            }
        }
        error(t) {
          const { partialObserver: r } = this;
          if (r.error)
            try {
              r.error(t);
            } catch (n) {
              an(n);
            }
          else an(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (r) {
              an(r);
            }
        }
      }
      class _r extends Ki {
        constructor(t, r, n) {
          let i;
          if ((super(), re(t) || !t))
            i = {
              next: t ?? void 0,
              error: r ?? void 0,
              complete: n ?? void 0,
            };
          else {
            let o;
            this && kr.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Xi(t.next, o),
                  error: t.error && Xi(t.error, o),
                  complete: t.complete && Xi(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new Sl(i);
        }
      }
      function an(e) {
        kr.useDeprecatedSynchronousErrorHandling
          ? (function Pd(e) {
              kr.useDeprecatedSynchronousErrorHandling &&
                gr &&
                ((gr.errorThrown = !0), (gr.error = e));
            })(e)
          : Nd(e);
      }
      function Es(e, t) {
        const { onStoppedNotification: r } = kr;
        r && Qi.setTimeout(() => r(e, t));
      }
      const Ss = {
          closed: !0,
          next: li,
          error: function Il(e) {
            throw e;
          },
          complete: li,
        },
        Is =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function xn(e) {
        return e;
      }
      function Ml(e) {
        return 0 === e.length
          ? xn
          : 1 === e.length
          ? e[0]
          : function (r) {
              return e.reduce((n, i) => i(n), r);
            };
      }
      let Ie = (() => {
        class e {
          constructor(r) {
            r && (this._subscribe = r);
          }
          lift(r) {
            const n = new e();
            return (n.source = this), (n.operator = r), n;
          }
          subscribe(r, n, i) {
            const o = (function Fd(e) {
              return (
                (e && e instanceof Ki) ||
                ((function kd(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete);
                })(e) &&
                  wl(e))
              );
            })(r)
              ? r
              : new _r(r, n, i);
            return (
              Qn(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(r) {
            try {
              return this._subscribe(r);
            } catch (n) {
              r.error(n);
            }
          }
          forEach(r, n) {
            return new (n = Ol(n))((i, o) => {
              const s = new _r({
                next: (a) => {
                  try {
                    r(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(r) {
            var n;
            return null === (n = this.source) || void 0 === n
              ? void 0
              : n.subscribe(r);
          }
          [Is]() {
            return this;
          }
          pipe(...r) {
            return Ml(r)(this);
          }
          toPromise(r) {
            return new (r = Ol(r))((n, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => n(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Ol(e) {
        var t;
        return null !== (t = e ?? kr.Promise) && void 0 !== t ? t : Promise;
      }
      const Ld = xr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let ve = (() => {
        class e extends Ie {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(r) {
            const n = new Nl(this, this);
            return (n.operator = r), n;
          }
          _throwIfClosed() {
            if (this.closed) throw new Ld();
          }
          next(r) {
            Qn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const n of this.currentObservers) n.next(r);
              }
            });
          }
          error(r) {
            Qn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = r);
                const { observers: n } = this;
                for (; n.length; ) n.shift().error(r);
              }
            });
          }
          complete() {
            Qn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: r } = this;
                for (; r.length; ) r.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var r;
            return (
              (null === (r = this.observers) || void 0 === r
                ? void 0
                : r.length) > 0
            );
          }
          _trySubscribe(r) {
            return this._throwIfClosed(), super._trySubscribe(r);
          }
          _subscribe(r) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(r),
              this._innerSubscribe(r)
            );
          }
          _innerSubscribe(r) {
            const { hasError: n, isStopped: i, observers: o } = this;
            return n || i
              ? Cs
              : ((this.currentObservers = null),
                o.push(r),
                new je(() => {
                  (this.currentObservers = null), Pr(o, r);
                }));
          }
          _checkFinalizedStatuses(r) {
            const { hasError: n, thrownError: i, isStopped: o } = this;
            n ? r.error(i) : o && r.complete();
          }
          asObservable() {
            const r = new Ie();
            return (r.source = this), r;
          }
        }
        return (e.create = (t, r) => new Nl(t, r)), e;
      })();
      class Nl extends ve {
        constructor(t, r) {
          super(), (this.destination = t), (this.source = r);
        }
        next(t) {
          var r, n;
          null ===
            (n =
              null === (r = this.destination) || void 0 === r
                ? void 0
                : r.next) ||
            void 0 === n ||
            n.call(r, t);
        }
        error(t) {
          var r, n;
          null ===
            (n =
              null === (r = this.destination) || void 0 === r
                ? void 0
                : r.error) ||
            void 0 === n ||
            n.call(r, t);
        }
        complete() {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === r ||
            r.call(t);
        }
        _subscribe(t) {
          var r, n;
          return null !==
            (n =
              null === (r = this.source) || void 0 === r
                ? void 0
                : r.subscribe(t)) && void 0 !== n
            ? n
            : Cs;
        }
      }
      class St extends ve {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const r = super._subscribe(t);
          return !r.closed && t.next(this._value), r;
        }
        getValue() {
          const { hasError: t, thrownError: r, _value: n } = this;
          if (t) throw r;
          return this._throwIfClosed(), n;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function Al(e) {
        return re(e?.lift);
      }
      function Qe(e) {
        return (t) => {
          if (Al(t))
            return t.lift(function (r) {
              try {
                return e(r, this);
              } catch (n) {
                this.error(n);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function xe(e, t, r, n, i) {
        return new Vd(e, t, r, n, i);
      }
      class Vd extends Ki {
        constructor(t, r, n, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = r
              ? function (a) {
                  try {
                    r(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = n
              ? function () {
                  try {
                    n();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: r } = this;
            super.unsubscribe(),
              !r &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function se(e, t) {
        return Qe((r, n) => {
          let i = 0;
          r.subscribe(
            xe(n, (o) => {
              n.next(e.call(t, o, i++));
            })
          );
        });
      }
      function ln(e) {
        return this instanceof ln ? ((this.v = e), this) : new ln(e);
      }
      function ui(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function ye(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                r = t && e[t],
                n = 0;
              if (r) return r.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && n >= e.length && (e = void 0),
                      { value: e && e[n++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (r = {}),
            n("next"),
            n("throw"),
            n("return"),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r);
        function n(o) {
          r[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({ value: c, done: a });
                  }, s);
                })(a, l, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Gd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function $_(e) {
        return re(e?.then);
      }
      function G_(e) {
        return re(e[Is]);
      }
      function z_(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator]);
      }
      function q_(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const W_ = (function QI() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Y_(e) {
        return re(e?.[W_]);
      }
      function Z_(e) {
        return (function to(e, t, r) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            n = r.apply(e, t || []),
            o = [];
          return (
            (i = {}),
            s("next"),
            s("throw"),
            s("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function s(f) {
            n[f] &&
              (i[f] = function (h) {
                return new Promise(function (p, _) {
                  o.push([f, h, p, _]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof ln
                  ? Promise.resolve(f.value.v).then(c, u)
                  : d(o[0][2], f);
              })(n[f](h));
            } catch (p) {
              d(o[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function u(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const r = e.getReader();
          try {
            for (;;) {
              const { value: n, done: i } = yield ln(r.read());
              if (i) return yield ln(void 0);
              yield yield ln(n);
            }
          } finally {
            r.releaseLock();
          }
        });
      }
      function J_(e) {
        return re(e?.getReader);
      }
      function ut(e) {
        if (e instanceof Ie) return e;
        if (null != e) {
          if (G_(e))
            return (function KI(e) {
              return new Ie((t) => {
                const r = e[Is]();
                if (re(r.subscribe)) return r.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Gd(e))
            return (function XI(e) {
              return new Ie((t) => {
                for (let r = 0; r < e.length && !t.closed; r++) t.next(e[r]);
                t.complete();
              });
            })(e);
          if ($_(e))
            return (function eT(e) {
              return new Ie((t) => {
                e.then(
                  (r) => {
                    t.closed || (t.next(r), t.complete());
                  },
                  (r) => t.error(r)
                ).then(null, Nd);
              });
            })(e);
          if (z_(e)) return Q_(e);
          if (Y_(e))
            return (function tT(e) {
              return new Ie((t) => {
                for (const r of e) if ((t.next(r), t.closed)) return;
                t.complete();
              });
            })(e);
          if (J_(e))
            return (function nT(e) {
              return Q_(Z_(e));
            })(e);
        }
        throw q_(e);
      }
      function Q_(e) {
        return new Ie((t) => {
          (function rT(e, t) {
            var r, n, i, o;
            return (function T(e, t, r, n) {
              return new (r || (r = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(n.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(n.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function i(o) {
                        return o instanceof r
                          ? o
                          : new r(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, l);
                }
                c((n = n.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (r = ui(e); !(n = yield r.next()).done; )
                  if ((t.next(n.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  n && !n.done && (o = r.return) && (yield o.call(r));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((r) => t.error(r));
        });
      }
      function mr(e, t, r, n = 0, i = !1) {
        const o = t.schedule(function () {
          r(), i ? e.add(this.schedule(null, n)) : this.unsubscribe();
        }, n);
        if ((e.add(o), !i)) return o;
      }
      function dt(e, t, r = 1 / 0) {
        return re(t)
          ? dt((n, i) => se((o, s) => t(n, o, i, s))(ut(e(n, i))), r)
          : ("number" == typeof t && (r = t),
            Qe((n, i) =>
              (function iT(e, t, r, n, i, o, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !c && t.complete();
                  },
                  h = (_) => (c < n ? p(_) : l.push(_)),
                  p = (_) => {
                    o && t.next(_), c++;
                    let m = !1;
                    ut(r(_, u++)).subscribe(
                      xe(
                        t,
                        (D) => {
                          i?.(D), o ? h(D) : t.next(D);
                        },
                        () => {
                          m = !0;
                        },
                        void 0,
                        () => {
                          if (m)
                            try {
                              for (c--; l.length && c < n; ) {
                                const D = l.shift();
                                s ? mr(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    xe(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(n, i, e, r)
            ));
      }
      function no(e = 1 / 0) {
        return dt(xn, e);
      }
      const Dn = new Ie((e) => e.complete());
      function K_(e) {
        return e && re(e.schedule);
      }
      function zd(e) {
        return e[e.length - 1];
      }
      function Pl(e) {
        return re(zd(e)) ? e.pop() : void 0;
      }
      function Ms(e) {
        return K_(zd(e)) ? e.pop() : void 0;
      }
      function X_(e, t = 0) {
        return Qe((r, n) => {
          r.subscribe(
            xe(
              n,
              (i) => mr(n, e, () => n.next(i), t),
              () => mr(n, e, () => n.complete(), t),
              (i) => mr(n, e, () => n.error(i), t)
            )
          );
        });
      }
      function em(e, t = 0) {
        return Qe((r, n) => {
          n.add(e.schedule(() => r.subscribe(n), t));
        });
      }
      function tm(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ie((r) => {
          mr(r, t, () => {
            const n = e[Symbol.asyncIterator]();
            mr(
              r,
              t,
              () => {
                n.next().then((i) => {
                  i.done ? r.complete() : r.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ft(e, t) {
        return t
          ? (function fT(e, t) {
              if (null != e) {
                if (G_(e))
                  return (function aT(e, t) {
                    return ut(e).pipe(em(t), X_(t));
                  })(e, t);
                if (Gd(e))
                  return (function cT(e, t) {
                    return new Ie((r) => {
                      let n = 0;
                      return t.schedule(function () {
                        n === e.length
                          ? r.complete()
                          : (r.next(e[n++]), r.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if ($_(e))
                  return (function lT(e, t) {
                    return ut(e).pipe(em(t), X_(t));
                  })(e, t);
                if (z_(e)) return tm(e, t);
                if (Y_(e))
                  return (function uT(e, t) {
                    return new Ie((r) => {
                      let n;
                      return (
                        mr(r, t, () => {
                          (n = e[W_]()),
                            mr(
                              r,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = n.next());
                                } catch (s) {
                                  return void r.error(s);
                                }
                                o ? r.complete() : r.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => re(n?.return) && n.return()
                      );
                    });
                  })(e, t);
                if (J_(e))
                  return (function dT(e, t) {
                    return tm(Z_(e), t);
                  })(e, t);
              }
              throw q_(e);
            })(e, t)
          : ut(e);
      }
      function q(...e) {
        return ft(e, Ms(e));
      }
      function rm(e = {}) {
        const {
          connector: t = () => new ve(),
          resetOnError: r = !0,
          resetOnComplete: n = !0,
          resetOnRefCountZero: i = !0,
        } = e;
        return (o) => {
          let s,
            a,
            l,
            c = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (u = d = !1);
            },
            p = () => {
              const _ = s;
              h(), _?.unsubscribe();
            };
          return Qe((_, m) => {
            c++, !d && !u && f();
            const D = (l = l ?? t());
            m.add(() => {
              c--, 0 === c && !d && !u && (a = qd(p, i));
            }),
              D.subscribe(m),
              !s &&
                c > 0 &&
                ((s = new _r({
                  next: (v) => D.next(v),
                  error: (v) => {
                    (d = !0), f(), (a = qd(h, r, v)), D.error(v);
                  },
                  complete: () => {
                    (u = !0), f(), (a = qd(h, n)), D.complete();
                  },
                })),
                ut(_).subscribe(s));
          })(o);
        };
      }
      function qd(e, t, ...r) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const n = new _r({
          next: () => {
            n.unsubscribe(), e();
          },
        });
        return ut(t(...r)).subscribe(n);
      }
      function Cn(e, t) {
        return Qe((r, n) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && n.complete();
          r.subscribe(
            xe(
              n,
              (l) => {
                i?.unsubscribe();
                let c = 0;
                const u = o++;
                ut(e(l, u)).subscribe(
                  (i = xe(
                    n,
                    (d) => n.next(t ? t(l, d, u, c++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function hT(e, t) {
        return e === t;
      }
      function Te(e) {
        for (let t in e) if (e[t] === Te) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function kl(e, t) {
        for (const r in t)
          t.hasOwnProperty(r) && !e.hasOwnProperty(r) && (e[r] = t[r]);
      }
      function ht(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ht).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const r = t.indexOf("\n");
        return -1 === r ? t : t.substring(0, r);
      }
      function Wd(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const pT = Te({ __forward_ref__: Te });
      function te(e) {
        return (
          (e.__forward_ref__ = te),
          (e.toString = function () {
            return ht(this());
          }),
          e
        );
      }
      function J(e) {
        return Yd(e) ? e() : e;
      }
      function Yd(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(pT) &&
          e.__forward_ref__ === te
        );
      }
      function Zd(e) {
        return e && !!e.ɵproviders;
      }
      const om = "https://g.co/ng/security#xss";
      class N extends Error {
        constructor(t, r) {
          super(
            (function Fl(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, r)
          ),
            (this.code = t);
        }
      }
      function Q(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Jd(e, t) {
        throw new N(-201, !1);
      }
      function wn(e, t) {
        null == e &&
          (function Y(e, t, r, n) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == n ? "" : ` [Expected=> ${r} ${n} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function P(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function ge(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Ll(e) {
        return sm(e, Bl) || sm(e, am);
      }
      function sm(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Vl(e) {
        return e && (e.hasOwnProperty(Qd) || e.hasOwnProperty(CT))
          ? e[Qd]
          : null;
      }
      const Bl = Te({ ɵprov: Te }),
        Qd = Te({ ɵinj: Te }),
        am = Te({ ngInjectableDef: Te }),
        CT = Te({ ngInjectorDef: Te });
      var ie = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(ie || {});
      let Kd;
      function Yt(e) {
        const t = Kd;
        return (Kd = e), t;
      }
      function cm(e, t, r) {
        const n = Ll(e);
        return n && "root" == n.providedIn
          ? void 0 === n.value
            ? (n.value = n.factory())
            : n.value
          : r & ie.Optional
          ? null
          : void 0 !== t
          ? t
          : void Jd(ht(e));
      }
      const Pe = globalThis,
        Os = {},
        rf = "__NG_DI_FLAG__",
        jl = "ngTempTokenPath",
        ST = /\n/gm,
        dm = "__source";
      let ro;
      function Lr(e) {
        const t = ro;
        return (ro = e), t;
      }
      function MT(e, t = ie.Default) {
        if (void 0 === ro) throw new N(-203, !1);
        return null === ro
          ? cm(e, void 0, t)
          : ro.get(e, t & ie.Optional ? null : void 0, t);
      }
      function F(e, t = ie.Default) {
        return (
          (function lm() {
            return Kd;
          })() || MT
        )(J(e), t);
      }
      function V(e, t = ie.Default) {
        return F(e, Ul(t));
      }
      function Ul(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function sf(e) {
        const t = [];
        for (let r = 0; r < e.length; r++) {
          const n = J(e[r]);
          if (Array.isArray(n)) {
            if (0 === n.length) throw new N(900, !1);
            let i,
              o = ie.Default;
            for (let s = 0; s < n.length; s++) {
              const a = n[s],
                l = OT(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            t.push(F(i, o));
          } else t.push(F(n));
        }
        return t;
      }
      function Ns(e, t) {
        return (e[rf] = t), (e.prototype[rf] = t), e;
      }
      function OT(e) {
        return e[rf];
      }
      function vr(e) {
        return { toString: e }.toString();
      }
      var Hl = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Hl || {}),
        Pn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(Pn || {});
      const Kn = {},
        he = [],
        $l = Te({ ɵcmp: Te }),
        af = Te({ ɵdir: Te }),
        lf = Te({ ɵpipe: Te }),
        hm = Te({ ɵmod: Te }),
        yr = Te({ ɵfac: Te }),
        As = Te({ __NG_ELEMENT_ID__: Te }),
        pm = Te({ __NG_ENV_ID__: Te });
      function gm(e, t, r) {
        let n = e.length;
        for (;;) {
          const i = e.indexOf(t, r);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === n || e.charCodeAt(i + o) <= 32) return i;
          }
          r = i + 1;
        }
      }
      function cf(e, t, r) {
        let n = 0;
        for (; n < r.length; ) {
          const i = r[n];
          if ("number" == typeof i) {
            if (0 !== i) break;
            n++;
            const o = r[n++],
              s = r[n++],
              a = r[n++];
            e.setAttribute(t, s, a, o);
          } else {
            const o = i,
              s = r[++n];
            mm(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), n++;
          }
        }
        return n;
      }
      function _m(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function mm(e) {
        return 64 === e.charCodeAt(0);
      }
      function Rs(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let r = -1;
            for (let n = 0; n < t.length; n++) {
              const i = t[n];
              "number" == typeof i
                ? (r = i)
                : 0 === r ||
                  vm(e, r, i, null, -1 === r || 2 === r ? t[++n] : null);
            }
          }
        return e;
      }
      function vm(e, t, r, n, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === r) {
            if (null === n) return void (null !== i && (e[o + 1] = i));
            if (n === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== n && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, r),
          null !== n && e.splice(o++, 0, n),
          null !== i && e.splice(o++, 0, i);
      }
      const ym = "ng-template";
      function RT(e, t, r) {
        let n = 0,
          i = !0;
        for (; n < e.length; ) {
          let o = e[n++];
          if ("string" == typeof o && i) {
            const s = e[n++];
            if (r && "class" === o && -1 !== gm(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; n < e.length && "string" == typeof (o = e[n++]); )
                if (o.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function bm(e) {
        return 4 === e.type && e.value !== ym;
      }
      function xT(e, t, r) {
        return t === (4 !== e.type || r ? e.value : ym);
      }
      function PT(e, t, r) {
        let n = 4;
        const i = e.attrs || [],
          o = (function LT(e) {
            for (let t = 0; t < e.length; t++) if (_m(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & n) {
                if (
                  ((n = 2 | (1 & n)),
                  ("" !== l && !xT(e, l, r)) || ("" === l && 1 === t.length))
                ) {
                  if (kn(n)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & n ? l : t[++a];
                if (8 & n && null !== e.attrs) {
                  if (!RT(e.attrs, c, r)) {
                    if (kn(n)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = kT(8 & n ? "class" : l, i, bm(e), r);
                if (-1 === d) {
                  if (kn(n)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & n ? f : null;
                  if ((h && -1 !== gm(h, c, 0)) || (2 & n && c !== f)) {
                    if (kn(n)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !kn(n) && !kn(l)) return !1;
            if (s && kn(l)) continue;
            (s = !1), (n = l | (1 & n));
          }
        }
        return kn(n) || s;
      }
      function kn(e) {
        return 0 == (1 & e);
      }
      function kT(e, t, r, n) {
        if (null === t) return -1;
        let i = 0;
        if (n || !r) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function VT(e, t) {
          let r = e.indexOf(4);
          if (r > -1)
            for (r++; r < e.length; ) {
              const n = e[r];
              if ("number" == typeof n) return -1;
              if (n === t) return r;
              r++;
            }
          return -1;
        })(t, e);
      }
      function Dm(e, t, r = !1) {
        for (let n = 0; n < t.length; n++) if (PT(e, t[n], r)) return !0;
        return !1;
      }
      function BT(e, t) {
        e: for (let r = 0; r < t.length; r++) {
          const n = t[r];
          if (e.length === n.length) {
            for (let i = 0; i < e.length; i++) if (e[i] !== n[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Cm(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function jT(e) {
        let t = e[0],
          r = 1,
          n = 2,
          i = "",
          o = !1;
        for (; r < e.length; ) {
          let s = e[r];
          if ("string" == typeof s)
            if (2 & n) {
              const a = e[++r];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & n ? (i += "." + s) : 4 & n && (i += " " + s);
          else
            "" !== i && !kn(s) && ((t += Cm(o, i)), (i = "")),
              (n = s),
              (o = o || !kn(n));
          r++;
        }
        return "" !== i && (t += Cm(o, i)), t;
      }
      function Ge(e) {
        return vr(() => {
          const t = Em(e),
            r = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Hl.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Pn.Emulated,
              styles: e.styles || he,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          Sm(r);
          const n = e.dependencies;
          return (
            (r.directiveDefs = Gl(n, !1)),
            (r.pipeDefs = Gl(n, !0)),
            (r.id = (function YT(e) {
              let t = 0;
              const r = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const i of r) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(r)),
            r
          );
        });
      }
      function GT(e) {
        return ce(e) || It(e);
      }
      function zT(e) {
        return null !== e;
      }
      function Ce(e) {
        return vr(() => ({
          type: e.type,
          bootstrap: e.bootstrap || he,
          declarations: e.declarations || he,
          imports: e.imports || he,
          exports: e.exports || he,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function wm(e, t) {
        if (null == e) return Kn;
        const r = {};
        for (const n in e)
          if (e.hasOwnProperty(n)) {
            let i = e[n],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (r[i] = n),
              t && (t[i] = o);
          }
        return r;
      }
      function x(e) {
        return vr(() => {
          const t = Em(e);
          return Sm(t), t;
        });
      }
      function Zt(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function ce(e) {
        return e[$l] || null;
      }
      function It(e) {
        return e[af] || null;
      }
      function Vt(e) {
        return e[lf] || null;
      }
      function dn(e, t) {
        const r = e[hm] || null;
        if (!r && !0 === t)
          throw new Error(`Type ${ht(e)} does not have '\u0275mod' property.`);
        return r;
      }
      function Em(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || Kn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || he,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: wm(e.inputs, t),
          outputs: wm(e.outputs),
        };
      }
      function Sm(e) {
        e.features?.forEach((t) => t(e));
      }
      function Gl(e, t) {
        if (!e) return null;
        const r = t ? Vt : GT;
        return () =>
          ("function" == typeof e ? e() : e).map((n) => r(n)).filter(zT);
      }
      const Xe = 0,
        j = 1,
        X = 2,
        Ue = 3,
        Fn = 4,
        xs = 5,
        kt = 6,
        oo = 7,
        et = 8,
        Vr = 9,
        so = 10,
        K = 11,
        Ps = 12,
        Im = 13,
        ao = 14,
        tt = 15,
        ks = 16,
        lo = 17,
        Xn = 18,
        Fs = 19,
        Tm = 20,
        Br = 21,
        br = 22,
        zl = 23,
        ql = 24,
        ae = 25,
        uf = 1,
        Mm = 2,
        er = 7,
        co = 9,
        Tt = 11;
      function Jt(e) {
        return Array.isArray(e) && "object" == typeof e[uf];
      }
      function Qt(e) {
        return Array.isArray(e) && !0 === e[uf];
      }
      function df(e) {
        return 0 != (4 & e.flags);
      }
      function hi(e) {
        return e.componentOffset > -1;
      }
      function Yl(e) {
        return 1 == (1 & e.flags);
      }
      function Ln(e) {
        return !!e.template;
      }
      function ff(e) {
        return 0 != (512 & e[X]);
      }
      function pi(e, t) {
        return e.hasOwnProperty(yr) ? e[yr] : null;
      }
      let eM =
          Pe.WeakRef ??
          class XT {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        nM = 0,
        tr = null,
        Zl = !1;
      function bt(e) {
        const t = tr;
        return (tr = e), t;
      }
      class xm {
        constructor() {
          (this.id = nM++),
            (this.ref = (function tM(e) {
              return new eM(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, r] of this.producers) {
            const n = r.producerNode.deref();
            if (null != n && r.atTrackingVersion === this.trackingVersion) {
              if (n.producerPollStatus(r.seenValueVersion)) return !0;
            } else this.producers.delete(t), n?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = Zl;
          Zl = !0;
          try {
            for (const [r, n] of this.consumers) {
              const i = n.consumerNode.deref();
              null != i && i.trackingVersion === n.atTrackingVersion
                ? i.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(r), i?.producers.delete(this.id));
            }
          } finally {
            Zl = t;
          }
        }
        producerAccessed() {
          if (Zl) throw new Error("");
          if (null === tr) return;
          let t = tr.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: tr.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: tr.trackingVersion,
              }),
              tr.producers.set(this.id, t),
              this.consumers.set(tr.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = tr.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== tr?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let Pm = null;
      const Fm = () => {};
      class sM extends xm {
        constructor(t, r, n) {
          super(),
            (this.watch = t),
            (this.schedule = r),
            (this.dirty = !1),
            (this.cleanupFn = Fm),
            (this.registerOnCleanup = (i) => {
              this.cleanupFn = i;
            }),
            (this.consumerAllowSignalWrites = n);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = bt(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = Fm),
              this.watch(this.registerOnCleanup);
          } finally {
            bt(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class aM {
        constructor(t, r, n) {
          (this.previousValue = t),
            (this.currentValue = r),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Mt() {
        return Lm;
      }
      function Lm(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = cM), lM;
      }
      function lM() {
        const e = Bm(this),
          t = e?.current;
        if (t) {
          const r = e.previous;
          if (r === Kn) e.previous = t;
          else for (let n in t) r[n] = t[n];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function cM(e, t, r, n) {
        const i = this.declaredInputs[r],
          o =
            Bm(e) ||
            (function uM(e, t) {
              return (e[Vm] = t);
            })(e, { previous: Kn, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[i];
        (s[i] = new aM(l && l.currentValue, t, a === Kn)), (e[n] = t);
      }
      Mt.ngInherit = !0;
      const Vm = "__ngSimpleChanges__";
      function Bm(e) {
        return e[Vm] || null;
      }
      const nr = function (e, t, r) {};
      function Le(e) {
        for (; Array.isArray(e); ) e = e[Xe];
        return e;
      }
      function Kl(e, t) {
        return Le(t[e]);
      }
      function Kt(e, t) {
        return Le(t[e.index]);
      }
      function Hm(e, t) {
        return e.data[t];
      }
      function uo(e, t) {
        return e[t];
      }
      function fn(e, t) {
        const r = t[e];
        return Jt(r) ? r : r[Xe];
      }
      function jr(e, t) {
        return null == t ? null : e[t];
      }
      function $m(e) {
        e[lo] = 0;
      }
      function mM(e) {
        1024 & e[X] || ((e[X] |= 1024), zm(e, 1));
      }
      function Gm(e) {
        1024 & e[X] && ((e[X] &= -1025), zm(e, -1));
      }
      function zm(e, t) {
        let r = e[Ue];
        if (null === r) return;
        r[xs] += t;
        let n = r;
        for (
          r = r[Ue];
          null !== r && ((1 === t && 1 === n[xs]) || (-1 === t && 0 === n[xs]));

        )
          (r[xs] += t), (n = r), (r = r[Ue]);
      }
      const Z = {
        lFrame: nv(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Ym() {
        return Z.bindingsEnabled;
      }
      function fo() {
        return null !== Z.skipHydrationRootTNode;
      }
      function I() {
        return Z.lFrame.lView;
      }
      function ue() {
        return Z.lFrame.tView;
      }
      function Me(e) {
        return (Z.lFrame.contextLView = e), e[et];
      }
      function Oe(e) {
        return (Z.lFrame.contextLView = null), e;
      }
      function Ot() {
        let e = Zm();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Zm() {
        return Z.lFrame.currentTNode;
      }
      function rr(e, t) {
        const r = Z.lFrame;
        (r.currentTNode = e), (r.isParent = t);
      }
      function vf() {
        return Z.lFrame.isParent;
      }
      function yf() {
        Z.lFrame.isParent = !1;
      }
      function ho() {
        return Z.lFrame.bindingIndex++;
      }
      function Cr(e) {
        const t = Z.lFrame,
          r = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), r;
      }
      function OM(e, t) {
        const r = Z.lFrame;
        (r.bindingIndex = r.bindingRootIndex = e), bf(t);
      }
      function bf(e) {
        Z.lFrame.currentDirectiveIndex = e;
      }
      function Xm() {
        return Z.lFrame.currentQueryIndex;
      }
      function Cf(e) {
        Z.lFrame.currentQueryIndex = e;
      }
      function AM(e) {
        const t = e[j];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[kt] : null;
      }
      function ev(e, t, r) {
        if (r & ie.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              r & ie.Host ||
              ((i = AM(o)), null === i || ((o = o[ao]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const n = (Z.lFrame = tv());
        return (n.currentTNode = t), (n.lView = e), !0;
      }
      function wf(e) {
        const t = tv(),
          r = e[j];
        (Z.lFrame = t),
          (t.currentTNode = r.firstChild),
          (t.lView = e),
          (t.tView = r),
          (t.contextLView = e),
          (t.bindingIndex = r.bindingStartIndex),
          (t.inI18n = !1);
      }
      function tv() {
        const e = Z.lFrame,
          t = null === e ? null : e.child;
        return null === t ? nv(e) : t;
      }
      function nv(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function rv() {
        const e = Z.lFrame;
        return (
          (Z.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const iv = rv;
      function Ef() {
        const e = rv();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function jt() {
        return Z.lFrame.selectedIndex;
      }
      function gi(e) {
        Z.lFrame.selectedIndex = e;
      }
      function ze() {
        const e = Z.lFrame;
        return Hm(e.tView, e.selectedIndex);
      }
      let sv = !0;
      function Xl() {
        return sv;
      }
      function Ur(e) {
        sv = e;
      }
      function ec(e, t) {
        for (let r = t.directiveStart, n = t.directiveEnd; r < n; r++) {
          const o = e.data[r].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o;
          s && (e.contentHooks ??= []).push(-r, s),
            a &&
              ((e.contentHooks ??= []).push(r, a),
              (e.contentCheckHooks ??= []).push(r, a)),
            l && (e.viewHooks ??= []).push(-r, l),
            c &&
              ((e.viewHooks ??= []).push(r, c),
              (e.viewCheckHooks ??= []).push(r, c)),
            null != u && (e.destroyHooks ??= []).push(r, u);
        }
      }
      function tc(e, t, r) {
        av(e, t, 3, r);
      }
      function nc(e, t, r, n) {
        (3 & e[X]) === r && av(e, t, r, n);
      }
      function Sf(e, t) {
        let r = e[X];
        (3 & r) === t && ((r &= 8191), (r += 1), (e[X] = r));
      }
      function av(e, t, r, n) {
        const o = n ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== n ? 65535 & e[lo] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != n && a >= n)) break;
          } else
            t[l] < 0 && (e[lo] += 65536),
              (a < o || -1 == o) &&
                (BM(e, r, t, l), (e[lo] = (4294901760 & e[lo]) + l + 2)),
              l++;
      }
      function lv(e, t) {
        nr(4, e, t);
        const r = bt(null);
        try {
          t.call(e);
        } finally {
          bt(r), nr(5, e, t);
        }
      }
      function BM(e, t, r, n) {
        const i = r[n] < 0,
          o = r[n + 1],
          a = e[i ? -r[n] : r[n]];
        i
          ? e[X] >> 13 < e[lo] >> 16 &&
            (3 & e[X]) === t &&
            ((e[X] += 8192), lv(a, o))
          : lv(a, o);
      }
      const po = -1;
      class Bs {
        constructor(t, r, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = r),
            (this.injectImpl = n);
        }
      }
      function Tf(e) {
        return e !== po;
      }
      function js(e) {
        return 32767 & e;
      }
      function Us(e, t) {
        let r = (function $M(e) {
            return e >> 16;
          })(e),
          n = t;
        for (; r > 0; ) (n = n[ao]), r--;
        return n;
      }
      let Mf = !0;
      function rc(e) {
        const t = Mf;
        return (Mf = e), t;
      }
      const cv = 255,
        uv = 5;
      let GM = 0;
      const ir = {};
      function ic(e, t) {
        const r = dv(e, t);
        if (-1 !== r) return r;
        const n = t[j];
        n.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Of(n.data, e),
          Of(t, null),
          Of(n.blueprint, null));
        const i = oc(e, t),
          o = e.injectorIndex;
        if (Tf(i)) {
          const s = js(i),
            a = Us(i, t),
            l = a[j].data;
          for (let c = 0; c < 8; c++) t[o + c] = a[s + c] | l[s + c];
        }
        return (t[o + 8] = i), o;
      }
      function Of(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function dv(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function oc(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let r = 0,
          n = null,
          i = t;
        for (; null !== i; ) {
          if (((n = vv(i)), null === n)) return po;
          if ((r++, (i = i[ao]), -1 !== n.injectorIndex))
            return n.injectorIndex | (r << 16);
        }
        return po;
      }
      function Nf(e, t, r) {
        !(function zM(e, t, r) {
          let n;
          "string" == typeof r
            ? (n = r.charCodeAt(0) || 0)
            : r.hasOwnProperty(As) && (n = r[As]),
            null == n && (n = r[As] = GM++);
          const i = n & cv;
          t.data[e + (i >> uv)] |= 1 << i;
        })(e, t, r);
      }
      function fv(e, t, r) {
        if (r & ie.Optional || void 0 !== e) return e;
        Jd();
      }
      function hv(e, t, r, n) {
        if (
          (r & ie.Optional && void 0 === n && (n = null),
          !(r & (ie.Self | ie.Host)))
        ) {
          const i = e[Vr],
            o = Yt(void 0);
          try {
            return i ? i.get(t, n, r & ie.Optional) : cm(t, n, r & ie.Optional);
          } finally {
            Yt(o);
          }
        }
        return fv(n, 0, r);
      }
      function pv(e, t, r, n = ie.Default, i) {
        if (null !== e) {
          if (2048 & t[X] && !(n & ie.Self)) {
            const s = (function QM(e, t, r, n, i) {
              let o = e,
                s = t;
              for (
                ;
                null !== o && null !== s && 2048 & s[X] && !(512 & s[X]);

              ) {
                const a = gv(o, s, r, n | ie.Self, ir);
                if (a !== ir) return a;
                let l = o.parent;
                if (!l) {
                  const c = s[Tm];
                  if (c) {
                    const u = c.get(r, ir, n);
                    if (u !== ir) return u;
                  }
                  (l = vv(s)), (s = s[ao]);
                }
                o = l;
              }
              return i;
            })(e, t, r, n, ir);
            if (s !== ir) return s;
          }
          const o = gv(e, t, r, n, ir);
          if (o !== ir) return o;
        }
        return hv(t, r, n, i);
      }
      function gv(e, t, r, n, i) {
        const o = (function YM(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(As) ? e[As] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & cv : JM) : t;
        })(r);
        if ("function" == typeof o) {
          if (!ev(t, e, n)) return n & ie.Host ? fv(i, 0, n) : hv(t, r, n, i);
          try {
            let s;
            if (((s = o(n)), null != s || n & ie.Optional)) return s;
            Jd();
          } finally {
            iv();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = dv(e, t),
            l = po,
            c = n & ie.Host ? t[tt][kt] : null;
          for (
            (-1 === a || n & ie.SkipSelf) &&
            ((l = -1 === a ? oc(e, t) : t[a + 8]),
            l !== po && mv(n, !1)
              ? ((s = t[j]), (a = js(l)), (t = Us(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = t[j];
            if (_v(o, a, u.data)) {
              const d = WM(a, t, r, s, n, c);
              if (d !== ir) return d;
            }
            (l = t[a + 8]),
              l !== po && mv(n, t[j].data[a + 8] === c) && _v(o, a, t)
                ? ((s = u), (a = js(l)), (t = Us(l, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function WM(e, t, r, n, i, o) {
        const s = t[j],
          a = s.data[e + 8],
          u = sc(
            a,
            s,
            r,
            null == n ? hi(a) && Mf : n != s && 0 != (3 & a.type),
            i & ie.Host && o === a
          );
        return null !== u ? _i(t, s, u, a) : ir;
      }
      function sc(e, t, r, n, i) {
        const o = e.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          l = e.directiveStart,
          u = o >> 20,
          f = i ? a + u : e.directiveEnd;
        for (let h = n ? a : a + u; h < f; h++) {
          const p = s[h];
          if ((h < l && r === p) || (h >= l && p.type === r)) return h;
        }
        if (i) {
          const h = s[l];
          if (h && Ln(h) && h.type === r) return l;
        }
        return null;
      }
      function _i(e, t, r, n) {
        let i = e[r];
        const o = t.data;
        if (
          (function jM(e) {
            return e instanceof Bs;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function gT(e, t) {
              const r = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new N(
                -200,
                `Circular dependency in DI detected for ${e}${r}`
              );
            })(
              (function De(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : Q(e);
              })(o[r])
            );
          const a = rc(s.canSeeViewProviders);
          s.resolving = !0;
          const c = s.injectImpl ? Yt(s.injectImpl) : null;
          ev(e, n, ie.Default);
          try {
            (i = e[r] = s.factory(void 0, o, e, n)),
              t.firstCreatePass &&
                r >= n.directiveStart &&
                (function VM(e, t, r) {
                  const {
                    ngOnChanges: n,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (n) {
                    const s = Lm(t);
                    (r.preOrderHooks ??= []).push(e, s),
                      (r.preOrderCheckHooks ??= []).push(e, s);
                  }
                  i && (r.preOrderHooks ??= []).push(0 - e, i),
                    o &&
                      ((r.preOrderHooks ??= []).push(e, o),
                      (r.preOrderCheckHooks ??= []).push(e, o));
                })(r, o[r], t);
          } finally {
            null !== c && Yt(c), rc(a), (s.resolving = !1), iv();
          }
        }
        return i;
      }
      function _v(e, t, r) {
        return !!(r[t + (e >> uv)] & (1 << e));
      }
      function mv(e, t) {
        return !(e & ie.Self || (e & ie.Host && t));
      }
      class Ut {
        constructor(t, r) {
          (this._tNode = t), (this._lView = r);
        }
        get(t, r, n) {
          return pv(this._tNode, this._lView, t, Ul(n), r);
        }
      }
      function JM() {
        return new Ut(Ot(), I());
      }
      function nt(e) {
        return vr(() => {
          const t = e.prototype.constructor,
            r = t[yr] || Af(t),
            n = Object.prototype;
          let i = Object.getPrototypeOf(e.prototype).constructor;
          for (; i && i !== n; ) {
            const o = i[yr] || Af(i);
            if (o && o !== r) return o;
            i = Object.getPrototypeOf(i);
          }
          return (o) => new o();
        });
      }
      function Af(e) {
        return Yd(e)
          ? () => {
              const t = Af(J(e));
              return t && t();
            }
          : pi(e);
      }
      function vv(e) {
        const t = e[j],
          r = t.type;
        return 2 === r ? t.declTNode : 1 === r ? e[kt] : null;
      }
      const _o = "__parameters__";
      function vo(e, t, r) {
        return vr(() => {
          const n = (function Rf(e) {
            return function (...r) {
              if (e) {
                const n = e(...r);
                for (const i in n) this[i] = n[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return n.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(_o)
                ? l[_o]
                : Object.defineProperty(l, _o, { value: [] })[_o];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            r && (i.prototype = Object.create(r.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      function bo(e, t) {
        e.forEach((r) => (Array.isArray(r) ? bo(r, t) : t(r)));
      }
      function bv(e, t, r) {
        t >= e.length ? e.push(r) : e.splice(t, 0, r);
      }
      function ac(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function Gs(e, t) {
        const r = [];
        for (let n = 0; n < e; n++) r.push(t);
        return r;
      }
      function hn(e, t, r) {
        let n = Do(e, t);
        return (
          n >= 0
            ? (e[1 | n] = r)
            : ((n = ~n),
              (function iO(e, t, r, n) {
                let i = e.length;
                if (i == t) e.push(r, n);
                else if (1 === i) e.push(n, e[0]), (e[0] = r);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = r), (e[t + 1] = n);
                }
              })(e, n, t, r)),
          n
        );
      }
      function xf(e, t) {
        const r = Do(e, t);
        if (r >= 0) return e[1 | r];
      }
      function Do(e, t) {
        return (function Dv(e, t, r) {
          let n = 0,
            i = e.length >> r;
          for (; i !== n; ) {
            const o = n + ((i - n) >> 1),
              s = e[o << r];
            if (t === s) return o << r;
            s > t ? (i = o) : (n = o + 1);
          }
          return ~(i << r);
        })(e, t, 1);
      }
      const cc = Ns(vo("Optional"), 8),
        uc = Ns(vo("SkipSelf"), 4);
      function gc(e) {
        return 128 == (128 & e.flags);
      }
      var Hr = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(Hr || {});
      const Vf = new Map();
      let MO = 0;
      const jf = "__ngContext__";
      function Ft(e, t) {
        Jt(t)
          ? ((e[jf] = t[Fs]),
            (function NO(e) {
              Vf.set(e[Fs], e);
            })(t))
          : (e[jf] = t);
      }
      let Uf;
      function Hf(e, t) {
        return Uf(e, t);
      }
      function Ws(e) {
        const t = e[Ue];
        return Qt(t) ? t[Ue] : t;
      }
      function Uv(e) {
        return $v(e[Ps]);
      }
      function Hv(e) {
        return $v(e[Fn]);
      }
      function $v(e) {
        for (; null !== e && !Qt(e); ) e = e[Fn];
        return e;
      }
      function Eo(e, t, r, n, i) {
        if (null != n) {
          let o,
            s = !1;
          Qt(n) ? (o = n) : Jt(n) && ((s = !0), (n = n[Xe]));
          const a = Le(n);
          0 === e && null !== r
            ? null == i
              ? Wv(t, r, a)
              : vi(t, r, a, i || null, !0)
            : 1 === e && null !== r
            ? vi(t, r, a, i || null, !0)
            : 2 === e
            ? (function Cc(e, t, r) {
                const n = bc(e, t);
                n &&
                  (function ZO(e, t, r, n) {
                    e.removeChild(t, r, n);
                  })(e, n, t, r);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function KO(e, t, r, n, i) {
                const o = r[er];
                o !== Le(r) && Eo(t, e, n, o, i);
                for (let a = Tt; a < r.length; a++) {
                  const l = r[a];
                  Zs(l[j], l, e, t, n, o);
                }
              })(t, e, o, r, i);
        }
      }
      function vc(e, t, r) {
        return e.createElement(t, r);
      }
      function zv(e, t) {
        const r = e[co],
          n = r.indexOf(t);
        Gm(t), r.splice(n, 1);
      }
      function yc(e, t) {
        if (e.length <= Tt) return;
        const r = Tt + t,
          n = e[r];
        if (n) {
          const i = n[ks];
          null !== i && i !== e && zv(i, n), t > 0 && (e[r - 1][Fn] = n[Fn]);
          const o = ac(e, Tt + t);
          !(function UO(e, t) {
            Zs(e, t, t[K], 2, null, null), (t[Xe] = null), (t[kt] = null);
          })(n[j], n);
          const s = o[Xn];
          null !== s && s.detachView(o[j]),
            (n[Ue] = null),
            (n[Fn] = null),
            (n[X] &= -129);
        }
        return n;
      }
      function Gf(e, t) {
        if (!(256 & t[X])) {
          const r = t[K];
          t[zl]?.destroy(),
            t[ql]?.destroy(),
            r.destroyNode && Zs(e, t, r, 3, null, null),
            (function GO(e) {
              let t = e[Ps];
              if (!t) return zf(e[j], e);
              for (; t; ) {
                let r = null;
                if (Jt(t)) r = t[Ps];
                else {
                  const n = t[Tt];
                  n && (r = n);
                }
                if (!r) {
                  for (; t && !t[Fn] && t !== e; )
                    Jt(t) && zf(t[j], t), (t = t[Ue]);
                  null === t && (t = e), Jt(t) && zf(t[j], t), (r = t && t[Fn]);
                }
                t = r;
              }
            })(t);
        }
      }
      function zf(e, t) {
        if (!(256 & t[X])) {
          (t[X] &= -129),
            (t[X] |= 256),
            (function YO(e, t) {
              let r;
              if (null != e && null != (r = e.destroyHooks))
                for (let n = 0; n < r.length; n += 2) {
                  const i = t[r[n]];
                  if (!(i instanceof Bs)) {
                    const o = r[n + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        nr(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          nr(5, a, l);
                        }
                      }
                    else {
                      nr(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        nr(5, i, o);
                      }
                    }
                  }
                }
            })(e, t),
            (function WO(e, t) {
              const r = e.cleanup,
                n = t[oo];
              if (null !== r)
                for (let o = 0; o < r.length - 1; o += 2)
                  if ("string" == typeof r[o]) {
                    const s = r[o + 3];
                    s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
                  } else r[o].call(n[r[o + 1]]);
              null !== n && (t[oo] = null);
              const i = t[Br];
              if (null !== i) {
                t[Br] = null;
                for (let o = 0; o < i.length; o++) (0, i[o])();
              }
            })(e, t),
            1 === t[j].type && t[K].destroy();
          const r = t[ks];
          if (null !== r && Qt(t[Ue])) {
            r !== t[Ue] && zv(r, t);
            const n = t[Xn];
            null !== n && n.detachView(e);
          }
          !(function AO(e) {
            Vf.delete(e[Fs]);
          })(t);
        }
      }
      function qf(e, t, r) {
        return (function qv(e, t, r) {
          let n = t;
          for (; null !== n && 40 & n.type; ) n = (t = n).parent;
          if (null === n) return r[Xe];
          {
            const { componentOffset: i } = n;
            if (i > -1) {
              const { encapsulation: o } = e.data[n.directiveStart + i];
              if (o === Pn.None || o === Pn.Emulated) return null;
            }
            return Kt(n, r);
          }
        })(e, t.parent, r);
      }
      function vi(e, t, r, n, i) {
        e.insertBefore(t, r, n, i);
      }
      function Wv(e, t, r) {
        e.appendChild(t, r);
      }
      function Yv(e, t, r, n, i) {
        null !== n ? vi(e, t, r, n, i) : Wv(e, t, r);
      }
      function bc(e, t) {
        return e.parentNode(t);
      }
      function Zv(e, t, r) {
        return Qv(e, t, r);
      }
      let Wf,
        Qf,
        Ec,
        Qv = function Jv(e, t, r) {
          return 40 & e.type ? Kt(e, r) : null;
        };
      function Dc(e, t, r, n) {
        const i = qf(e, n, t),
          o = t[K],
          a = Zv(n.parent || t[kt], n, t);
        if (null != i)
          if (Array.isArray(r))
            for (let l = 0; l < r.length; l++) Yv(o, i, r[l], a, !1);
          else Yv(o, i, r, a, !1);
        void 0 !== Wf && Wf(o, n, t, r, i);
      }
      function Ys(e, t) {
        if (null !== t) {
          const r = t.type;
          if (3 & r) return Kt(t, e);
          if (4 & r) return Yf(-1, e[t.index]);
          if (8 & r) {
            const n = t.child;
            if (null !== n) return Ys(e, n);
            {
              const i = e[t.index];
              return Qt(i) ? Yf(-1, i) : Le(i);
            }
          }
          if (32 & r) return Hf(t, e)() || Le(e[t.index]);
          {
            const n = Xv(e, t);
            return null !== n
              ? Array.isArray(n)
                ? n[0]
                : Ys(Ws(e[tt]), n)
              : Ys(e, t.next);
          }
        }
        return null;
      }
      function Xv(e, t) {
        return null !== t ? e[tt][kt].projection[t.projection] : null;
      }
      function Yf(e, t) {
        const r = Tt + e + 1;
        if (r < t.length) {
          const n = t[r],
            i = n[j].firstChild;
          if (null !== i) return Ys(n, i);
        }
        return t[er];
      }
      function Zf(e, t, r, n, i, o, s) {
        for (; null != r; ) {
          const a = n[r.index],
            l = r.type;
          if (
            (s && 0 === t && (a && Ft(Le(a), n), (r.flags |= 2)),
            32 != (32 & r.flags))
          )
            if (8 & l) Zf(e, t, r.child, n, i, o, !1), Eo(t, e, i, a, o);
            else if (32 & l) {
              const c = Hf(r, n);
              let u;
              for (; (u = c()); ) Eo(t, e, i, u, o);
              Eo(t, e, i, a, o);
            } else 16 & l ? ty(e, t, n, r, i, o) : Eo(t, e, i, a, o);
          r = s ? r.projectionNext : r.next;
        }
      }
      function Zs(e, t, r, n, i, o) {
        Zf(r, n, e.firstChild, t, i, o, !1);
      }
      function ty(e, t, r, n, i, o) {
        const s = r[tt],
          l = s[kt].projection[n.projection];
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) Eo(t, e, i, l[c], o);
        else {
          let c = l;
          const u = s[Ue];
          gc(n) && (c.flags |= 128), Zf(e, t, c, u, i, o, !0);
        }
      }
      function ny(e, t, r) {
        "" === r
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", r);
      }
      function ry(e, t, r) {
        const { mergedAttrs: n, classes: i, styles: o } = r;
        null !== n && cf(e, t, n),
          null !== i && ny(e, t, i),
          null !== o &&
            (function eN(e, t, r) {
              e.setAttribute(t, "style", r);
            })(e, t, o);
      }
      function sy(e) {
        return (
          (function Kf() {
            if (void 0 === Ec && ((Ec = null), Pe.trustedTypes))
              try {
                Ec = Pe.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return Ec;
          })()?.createScriptURL(e) || e
        );
      }
      class ay {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${om})`;
        }
      }
      function $r(e) {
        return e instanceof ay ? e.changingThisBreaksApplicationSecurity : e;
      }
      function Js(e, t) {
        const r = (function uN(e) {
          return (e instanceof ay && e.getTypeName()) || null;
        })(e);
        if (null != r && r !== t) {
          if ("ResourceURL" === r && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${r} (see ${om})`);
        }
        return r === t;
      }
      const pN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var To = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(To || {});
      function Ks(e) {
        const t = Xs();
        return t
          ? t.sanitize(To.URL, e) || ""
          : Js(e, "URL")
          ? $r(e)
          : (function Xf(e) {
              return (e = String(e)).match(pN) ? e : "unsafe:" + e;
            })(Q(e));
      }
      function py(e) {
        const t = Xs();
        if (t) return sy(t.sanitize(To.RESOURCE_URL, e) || "");
        if (Js(e, "ResourceURL")) return sy($r(e));
        throw new N(904, !1);
      }
      function Xs() {
        const e = I();
        return e && e[so].sanitizer;
      }
      class U {
        constructor(t, r) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof r
              ? (this.__NG_ELEMENT_ID__ = r)
              : void 0 !== r &&
                (this.ɵprov = P({
                  token: this,
                  providedIn: r.providedIn || "root",
                  factory: r.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const ea = new U("ENVIRONMENT_INITIALIZER"),
        _y = new U("INJECTOR", -1),
        my = new U("INJECTOR_DEF_TYPES");
      class rh {
        get(t, r = Os) {
          if (r === Os) {
            const n = new Error(`NullInjectorError: No provider for ${ht(t)}!`);
            throw ((n.name = "NullInjectorError"), n);
          }
          return r;
        }
      }
      function TN(...e) {
        return { ɵproviders: vy(0, e), ɵfromNgModule: !0 };
      }
      function vy(e, ...t) {
        const r = [],
          n = new Set();
        let i;
        const o = (s) => {
          r.push(s);
        };
        return (
          bo(t, (s) => {
            const a = s;
            Ic(a, o, [], n) && ((i ||= []), i.push(a));
          }),
          void 0 !== i && yy(i, o),
          r
        );
      }
      function yy(e, t) {
        for (let r = 0; r < e.length; r++) {
          const { ngModule: n, providers: i } = e[r];
          oh(i, (o) => {
            t(o, n);
          });
        }
      }
      function Ic(e, t, r, n) {
        if (!(e = J(e))) return !1;
        let i = null,
          o = Vl(e);
        const s = !o && ce(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const l = e.ngModule;
          if (((o = Vl(l)), !o)) return !1;
          i = l;
        }
        const a = n.has(i);
        if (s) {
          if (a) return !1;
          if ((n.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const c of l) Ic(c, t, r, n);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let c;
              n.add(i);
              try {
                bo(o.imports, (u) => {
                  Ic(u, t, r, n) && ((c ||= []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && yy(c, t);
            }
            if (!a) {
              const c = pi(i) || (() => new i());
              t({ provide: i, useFactory: c, deps: he }, i),
                t({ provide: my, useValue: i, multi: !0 }, i),
                t({ provide: ea, useValue: () => F(i), multi: !0 }, i);
            }
            const l = o.providers;
            if (null != l && !a) {
              const c = e;
              oh(l, (u) => {
                t(u, c);
              });
            }
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      function oh(e, t) {
        for (let r of e)
          Zd(r) && (r = r.ɵproviders), Array.isArray(r) ? oh(r, t) : t(r);
      }
      const MN = Te({ provide: String, useValue: Te });
      function sh(e) {
        return null !== e && "object" == typeof e && MN in e;
      }
      function yi(e) {
        return "function" == typeof e;
      }
      const ah = new U("Set Injector scope."),
        Tc = {},
        NN = {};
      let lh;
      function Mc() {
        return void 0 === lh && (lh = new rh()), lh;
      }
      class Ht {}
      class Oc extends Ht {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, r, n, i) {
          super(),
            (this.parent = r),
            (this.source = n),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            uh(t, (s) => this.processProvider(s)),
            this.records.set(_y, Mo(void 0, this)),
            i.has("environment") && this.records.set(Ht, Mo(void 0, this));
          const o = this.records.get(ah);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(my.multi, he, ie.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const r of this._ngOnDestroyHooks) r.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const r of t) r();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const r = Lr(this),
            n = Yt(void 0);
          try {
            return t();
          } finally {
            Lr(r), Yt(n);
          }
        }
        get(t, r = Os, n = ie.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(pm)))
            return t[pm](this);
          n = Ul(n);
          const o = Lr(this),
            s = Yt(void 0);
          try {
            if (!(n & ie.SkipSelf)) {
              let l = this.records.get(t);
              if (void 0 === l) {
                const c =
                  (function kN(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof U)
                    );
                  })(t) && Ll(t);
                (l = c && this.injectableDefInScope(c) ? Mo(ch(t), Tc) : null),
                  this.records.set(t, l);
              }
              if (null != l) return this.hydrate(t, l);
            }
            return (n & ie.Self ? Mc() : this.parent).get(
              t,
              (r = n & ie.Optional && r === Os ? null : r)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[jl] = a[jl] || []).unshift(ht(t)), o)) throw a;
              return (function NT(e, t, r, n) {
                const i = e[jl];
                throw (
                  (t[dm] && i.unshift(t[dm]),
                  (e.message = (function AT(e, t, r, n = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = ht(t);
                    if (Array.isArray(t)) i = t.map(ht).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ht(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${r}${n ? "(" + n + ")" : ""}[${i}]: ${e.replace(
                      ST,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, r, n)),
                  (e.ngTokenPath = i),
                  (e[jl] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            Yt(s), Lr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Lr(this),
            r = Yt(void 0);
          try {
            const i = this.get(ea.multi, he, ie.Self);
            for (const o of i) o();
          } finally {
            Lr(t), Yt(r);
          }
        }
        toString() {
          const t = [],
            r = this.records;
          for (const n of r.keys()) t.push(ht(n));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new N(205, !1);
        }
        processProvider(t) {
          let r = yi((t = J(t))) ? t : J(t && t.provide);
          const n = (function RN(e) {
            return sh(e) ? Mo(void 0, e.useValue) : Mo(Cy(e), Tc);
          })(t);
          if (yi(t) || !0 !== t.multi) this.records.get(r);
          else {
            let i = this.records.get(r);
            i ||
              ((i = Mo(void 0, Tc, !0)),
              (i.factory = () => sf(i.multi)),
              this.records.set(r, i)),
              (r = t),
              i.multi.push(t);
          }
          this.records.set(r, n);
        }
        hydrate(t, r) {
          return (
            r.value === Tc && ((r.value = NN), (r.value = r.factory())),
            "object" == typeof r.value &&
              r.value &&
              (function PN(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(r.value) &&
              this._ngOnDestroyHooks.add(r.value),
            r.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const r = J(t.providedIn);
          return "string" == typeof r
            ? "any" === r || this.scopes.has(r)
            : this.injectorDefTypes.has(r);
        }
        removeOnDestroy(t) {
          const r = this._onDestroyHooks.indexOf(t);
          -1 !== r && this._onDestroyHooks.splice(r, 1);
        }
      }
      function ch(e) {
        const t = Ll(e),
          r = null !== t ? t.factory : pi(e);
        if (null !== r) return r;
        if (e instanceof U) throw new N(204, !1);
        if (e instanceof Function)
          return (function AN(e) {
            const t = e.length;
            if (t > 0) throw (Gs(t, "?"), new N(204, !1));
            const r = (function DT(e) {
              return (e && (e[Bl] || e[am])) || null;
            })(e);
            return null !== r ? () => r.factory(e) : () => new e();
          })(e);
        throw new N(204, !1);
      }
      function Cy(e, t, r) {
        let n;
        if (yi(e)) {
          const i = J(e);
          return pi(i) || ch(i);
        }
        if (sh(e)) n = () => J(e.useValue);
        else if (
          (function Dy(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          n = () => e.useFactory(...sf(e.deps || []));
        else if (
          (function by(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          n = () => F(J(e.useExisting));
        else {
          const i = J(e && (e.useClass || e.provide));
          if (
            !(function xN(e) {
              return !!e.deps;
            })(e)
          )
            return pi(i) || ch(i);
          n = () => new i(...sf(e.deps));
        }
        return n;
      }
      function Mo(e, t, r = !1) {
        return { factory: e, value: t, multi: r ? [] : void 0 };
      }
      function uh(e, t) {
        for (const r of e)
          Array.isArray(r) ? uh(r, t) : r && Zd(r) ? uh(r.ɵproviders, t) : t(r);
      }
      const Nc = new U("AppId", { providedIn: "root", factory: () => FN }),
        FN = "ng",
        wy = new U("Platform Initializer"),
        bi = new U("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        Ey = new U("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function Io() {
              if (void 0 !== Qf) return Qf;
              if (typeof document < "u") return document;
              throw new N(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let Iy = (e, t, r) => null;
      function mh(e, t, r = !1) {
        return Iy(e, t, r);
      }
      class qN {}
      class Oy {}
      class YN {
        resolveComponentFactory(t) {
          throw (function WN(e) {
            const t = Error(`No component factory found for ${ht(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Fc = (() => {
        class t {}
        return (t.NULL = new YN()), t;
      })();
      function ZN() {
        return No(Ot(), I());
      }
      function No(e, t) {
        return new we(Kt(e, t));
      }
      let we = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = ZN), t;
      })();
      function JN(e) {
        return e instanceof we ? e.nativeElement : e;
      }
      class bh {}
      let pn = (() => {
          class t {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function QN() {
                const e = I(),
                  r = fn(Ot().index, e);
                return (Jt(r) ? r : e)[K];
              })()),
            t
          );
        })(),
        KN = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵprov = P({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            t
          );
        })();
      class ia {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const XN = new ia("16.2.2"),
        Dh = {};
      function Py(e, t = null, r = null, n) {
        const i = ky(e, t, r, n);
        return i.resolveInjectorInitializers(), i;
      }
      function ky(e, t = null, r = null, n, i = new Set()) {
        const o = [r || he, TN(e)];
        return (
          (n = n || ("object" == typeof e ? void 0 : ht(e))),
          new Oc(o, t || Mc(), n || null, i)
        );
      }
      let Nt = (() => {
        var e;
        class t {
          static create(n, i) {
            if (Array.isArray(n)) return Py({ name: "" }, i, n, "");
            {
              const o = n.name ?? "";
              return Py({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          ((e = t).THROW_IF_NOT_FOUND = Os),
          (e.NULL = new rh()),
          (e.ɵprov = P({ token: e, providedIn: "any", factory: () => F(_y) })),
          (e.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function Er(e) {
        return e instanceof Function ? e() : e;
      }
      let Eh = (() => {
        var e;
        class t {
          constructor() {
            (this.callbacks = new Set()),
              (this.deferredCallbacks = new Set()),
              (this.renderDepth = 0),
              (this.runningCallbacks = !1);
          }
          begin() {
            if (this.runningCallbacks) throw new N(102, !1);
            this.renderDepth++;
          }
          end() {
            if ((this.renderDepth--, 0 === this.renderDepth))
              try {
                this.runningCallbacks = !0;
                for (const n of this.callbacks) n.invoke();
              } finally {
                this.runningCallbacks = !1;
                for (const n of this.deferredCallbacks) this.callbacks.add(n);
                this.deferredCallbacks.clear();
              }
          }
          register(n) {
            (this.runningCallbacks
              ? this.deferredCallbacks
              : this.callbacks
            ).add(n);
          }
          unregister(n) {
            this.callbacks.delete(n), this.deferredCallbacks.delete(n);
          }
          ngOnDestroy() {
            this.callbacks.clear(), this.deferredCallbacks.clear();
          }
        }
        return (
          ((e = t).ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function oa(e) {
        for (; e; ) {
          e[X] |= 64;
          const t = Ws(e);
          if (ff(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Sh(e) {
        return e.ngOriginalError;
      }
      class Di {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const r = this._findOriginalError(t);
          this._console.error("ERROR", t),
            r && this._console.error("ORIGINAL ERROR", r);
        }
        _findOriginalError(t) {
          let r = t && Sh(t);
          for (; r && Sh(r); ) r = Sh(r);
          return r || null;
        }
      }
      const jy = new U("", { providedIn: "root", factory: () => !1 });
      class Gy extends xm {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          oa(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, r, n) {
          const i = bt(this);
          this.trackingVersion++;
          try {
            t(r, n);
          } finally {
            bt(i);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Vc = null;
      function zy() {
        return (Vc ??= new Gy()), Vc;
      }
      function qy(e, t) {
        return e[t] ?? zy();
      }
      function Wy(e, t) {
        const r = zy();
        r.hasReadASignal && ((e[t] = Vc), (r.lView = e), (Vc = new Gy()));
      }
      const ee = {};
      function S(e) {
        Yy(ue(), I(), jt() + e, !1);
      }
      function Yy(e, t, r, n) {
        if (!n)
          if (3 == (3 & t[X])) {
            const o = e.preOrderCheckHooks;
            null !== o && tc(t, o, r);
          } else {
            const o = e.preOrderHooks;
            null !== o && nc(t, o, 0, r);
          }
        gi(r);
      }
      function g(e, t = ie.Default) {
        const r = I();
        return null === r ? F(e, t) : pv(Ot(), r, J(e), t);
      }
      function Bc(e, t, r, n, i, o, s, a, l, c, u) {
        const d = t.blueprint.slice();
        return (
          (d[Xe] = i),
          (d[X] = 140 | n),
          (null !== c || (e && 2048 & e[X])) && (d[X] |= 2048),
          $m(d),
          (d[Ue] = d[ao] = e),
          (d[et] = r),
          (d[so] = s || (e && e[so])),
          (d[K] = a || (e && e[K])),
          (d[Vr] = l || (e && e[Vr]) || null),
          (d[kt] = o),
          (d[Fs] = (function OO() {
            return MO++;
          })()),
          (d[br] = u),
          (d[Tm] = c),
          (d[tt] = 2 == t.type ? e[tt] : d),
          d
        );
      }
      function xo(e, t, r, n, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function Ih(e, t, r, n, i) {
            const o = Zm(),
              s = vf(),
              l = (e.data[t] = (function CA(e, t, r, n, i, o) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  fo() && (a |= 128),
                  {
                    type: r,
                    index: n,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: i,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, r, t, n, i));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(e, t, r, n, i)),
            (function MM() {
              return Z.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = r), (o.value = n), (o.attrs = i);
          const s = (function Vs() {
            const e = Z.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return rr(o, !0), o;
      }
      function sa(e, t, r, n) {
        if (0 === r) return -1;
        const i = t.length;
        for (let o = 0; o < r; o++)
          t.push(n), e.blueprint.push(n), e.data.push(null);
        return i;
      }
      function Jy(e, t, r, n, i) {
        const o = qy(t, zl),
          s = jt(),
          a = 2 & n;
        try {
          if (
            (gi(-1),
            a && t.length > ae && Yy(e, t, ae, !1),
            nr(a ? 2 : 0, i),
            a)
          )
            o.runInContext(r, n, i);
          else {
            const c = bt(null);
            try {
              r(n, i);
            } finally {
              bt(c);
            }
          }
        } finally {
          a && null === t[zl] && Wy(t, zl), gi(s), nr(a ? 3 : 1, i);
        }
      }
      function Th(e, t, r) {
        if (df(t)) {
          const n = bt(null);
          try {
            const o = t.directiveEnd;
            for (let s = t.directiveStart; s < o; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, r[s], s);
            }
          } finally {
            bt(n);
          }
        }
      }
      function Mh(e, t, r) {
        Ym() &&
          ((function OA(e, t, r, n) {
            const i = r.directiveStart,
              o = r.directiveEnd;
            hi(r) &&
              (function FA(e, t, r) {
                const n = Kt(t, e),
                  i = Qy(r);
                let s = 16;
                r.signals ? (s = 4096) : r.onPush && (s = 64);
                const a = jc(
                  e,
                  Bc(
                    e,
                    i,
                    null,
                    s,
                    n,
                    t,
                    null,
                    e[so].rendererFactory.createRenderer(n, r),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, r, e.data[i + r.componentOffset]),
              e.firstCreatePass || ic(r, t),
              Ft(n, t);
            const s = r.initialInputs;
            for (let a = i; a < o; a++) {
              const l = e.data[a],
                c = _i(t, e, a, r);
              Ft(c, t),
                null !== s && LA(0, a - i, c, l, 0, s),
                Ln(l) && (fn(r.index, t)[et] = _i(t, e, a, r));
            }
          })(e, t, r, Kt(r, t)),
          64 == (64 & r.flags) && n0(e, t, r));
      }
      function Oh(e, t, r = Kt) {
        const n = t.localNames;
        if (null !== n) {
          let i = t.index + 1;
          for (let o = 0; o < n.length; o += 2) {
            const s = n[o + 1],
              a = -1 === s ? r(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function Qy(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Nh(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Nh(e, t, r, n, i, o, s, a, l, c, u) {
        const d = ae + n,
          f = d + i,
          h = (function _A(e, t) {
            const r = [];
            for (let n = 0; n < t; n++) r.push(n < e ? null : ee);
            return r;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[j] = {
          type: e,
          blueprint: h,
          template: r,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: u,
        });
      }
      let Ky = (e) => null;
      function Xy(e, t, r, n) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            r = null === r ? {} : r;
            const o = e[i];
            null === n
              ? e0(r, t, i, o)
              : n.hasOwnProperty(i) && e0(r, t, n[i], o);
          }
        return r;
      }
      function e0(e, t, r, n) {
        e.hasOwnProperty(r) ? e[r].push(t, n) : (e[r] = [t, n]);
      }
      function gn(e, t, r, n, i, o, s, a) {
        const l = Kt(t, r);
        let u,
          c = t.inputs;
        !a && null != c && (u = c[n])
          ? (kh(e, r, u, n, i),
            hi(t) &&
              (function SA(e, t) {
                const r = fn(t, e);
                16 & r[X] || (r[X] |= 64);
              })(r, t.index))
          : 3 & t.type &&
            ((n = (function EA(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(n)),
            (i = null != s ? s(i, t.value || "", n) : i),
            o.setProperty(l, n, i));
      }
      function Ah(e, t, r, n) {
        if (Ym()) {
          const i = null === n ? null : { "": -1 },
            o = (function AA(e, t) {
              const r = e.directiveRegistry;
              let n = null,
                i = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o];
                  if (Dm(t, s.selectors, !1))
                    if ((n || (n = []), Ln(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, a, i),
                          n.unshift(...a, s),
                          Rh(e, t, a.length);
                      } else n.unshift(s), Rh(e, t, 0);
                    else
                      (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, n, i),
                        n.push(s);
                }
              return null === n ? null : [n, i];
            })(e, r);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && t0(e, t, r, s, i, a),
            i &&
              (function RA(e, t, r) {
                if (t) {
                  const n = (e.localNames = []);
                  for (let i = 0; i < t.length; i += 2) {
                    const o = r[t[i + 1]];
                    if (null == o) throw new N(-301, !1);
                    n.push(t[i], o);
                  }
                }
              })(r, n, i);
        }
        r.mergedAttrs = Rs(r.mergedAttrs, r.attrs);
      }
      function t0(e, t, r, n, i, o) {
        for (let c = 0; c < n.length; c++) Nf(ic(r, t), e, n[c].type);
        !(function PA(e, t, r) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + r),
            (e.providerIndexes = t);
        })(r, e.data.length, n.length);
        for (let c = 0; c < n.length; c++) {
          const u = n[c];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          l = sa(e, t, n.length, null);
        for (let c = 0; c < n.length; c++) {
          const u = n[c];
          (r.mergedAttrs = Rs(r.mergedAttrs, u.hostAttrs)),
            kA(e, r, t, l, u),
            xA(l, u, i),
            null !== u.contentQueries && (r.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (r.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(r.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
            l++;
        }
        !(function wA(e, t, r) {
          const i = t.directiveEnd,
            o = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            c = null;
          for (let u = t.directiveStart; u < i; u++) {
            const d = o[u],
              f = r ? r.get(d) : null,
              p = f ? f.outputs : null;
            (l = Xy(d.inputs, u, l, f ? f.inputs : null)),
              (c = Xy(d.outputs, u, c, p));
            const _ = null === l || null === s || bm(t) ? null : VA(l, u, s);
            a.push(_);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = c);
        })(e, r, o);
      }
      function n0(e, t, r) {
        const n = r.directiveStart,
          i = r.directiveEnd,
          o = r.index,
          s = (function NM() {
            return Z.lFrame.currentDirectiveIndex;
          })();
        try {
          gi(o);
          for (let a = n; a < i; a++) {
            const l = e.data[a],
              c = t[a];
            bf(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                NA(l, c);
          }
        } finally {
          gi(-1), bf(s);
        }
      }
      function NA(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Rh(e, t, r) {
        (t.componentOffset = r), (e.components ??= []).push(t.index);
      }
      function xA(e, t, r) {
        if (r) {
          if (t.exportAs)
            for (let n = 0; n < t.exportAs.length; n++) r[t.exportAs[n]] = e;
          Ln(t) && (r[""] = e);
        }
      }
      function kA(e, t, r, n, i) {
        e.data[n] = i;
        const o = i.factory || (i.factory = pi(i.type)),
          s = new Bs(o, Ln(i), g);
        (e.blueprint[n] = s),
          (r[n] = s),
          (function TA(e, t, r, n, i) {
            const o = i.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function MA(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const r = e[--t];
                  if ("number" == typeof r && r < 0) return r;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(r, n, o);
            }
          })(e, t, n, sa(e, r, i.hostVars, ee), i);
      }
      function or(e, t, r, n, i, o) {
        const s = Kt(e, t);
        !(function xh(e, t, r, n, i, o, s) {
          if (null == o) e.removeAttribute(t, i, r);
          else {
            const a = null == s ? Q(o) : s(o, n || "", i);
            e.setAttribute(t, i, a, r);
          }
        })(t[K], s, o, e.value, r, n, i);
      }
      function LA(e, t, r, n, i, o) {
        const s = o[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) r0(n, r, s[a++], s[a++], s[a++]);
      }
      function r0(e, t, r, n, i) {
        const o = bt(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(n) && (i = s[n].call(t, i)),
            null !== e.setInput ? e.setInput(t, i, r, n) : (t[n] = i);
        } finally {
          bt(o);
        }
      }
      function VA(e, t, r) {
        let n = null,
          i = 0;
        for (; i < r.length; ) {
          const o = r[i];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === n && (n = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    n.push(o, s[a + 1], r[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return n;
      }
      function o0(e, t, r, n) {
        return [e, !0, !1, t, null, 0, n, r, null, null, null];
      }
      function s0(e, t) {
        const r = e.contentQueries;
        if (null !== r)
          for (let n = 0; n < r.length; n += 2) {
            const o = r[n + 1];
            if (-1 !== o) {
              const s = e.data[o];
              Cf(r[n]), s.contentQueries(2, t[o], o);
            }
          }
      }
      function jc(e, t) {
        return e[Ps] ? (e[Im][Fn] = t) : (e[Ps] = t), (e[Im] = t), t;
      }
      function Ph(e, t, r) {
        Cf(0);
        const n = bt(null);
        try {
          t(e, r);
        } finally {
          bt(n);
        }
      }
      function a0(e) {
        return e[oo] || (e[oo] = []);
      }
      function l0(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function u0(e, t) {
        const r = e[Vr],
          n = r ? r.get(Di, null) : null;
        n && n.handleError(t);
      }
      function kh(e, t, r, n, i) {
        for (let o = 0; o < r.length; ) {
          const s = r[o++],
            a = r[o++];
          r0(e.data[s], t[s], n, a, i);
        }
      }
      function BA(e, t) {
        const r = fn(t, e),
          n = r[j];
        !(function jA(e, t) {
          for (let r = t.length; r < e.blueprint.length; r++)
            t.push(e.blueprint[r]);
        })(n, r);
        const i = r[Xe];
        null !== i && null === r[br] && (r[br] = mh(i, r[Vr])), Fh(n, r, r[et]);
      }
      function Fh(e, t, r) {
        wf(t);
        try {
          const n = e.viewQuery;
          null !== n && Ph(1, n, r);
          const i = e.template;
          null !== i && Jy(e, t, i, 1, r),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && s0(e, t),
            e.staticViewQueries && Ph(2, e.viewQuery, r);
          const o = e.components;
          null !== o &&
            (function UA(e, t) {
              for (let r = 0; r < t.length; r++) BA(e, t[r]);
            })(t, o);
        } catch (n) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            n)
          );
        } finally {
          (t[X] &= -5), Ef();
        }
      }
      let d0 = (() => {
        var e;
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, i, o) {
            const s = typeof Zone > "u" ? null : Zone.current,
              a = new sM(
                n,
                (u) => {
                  this.all.has(u) && this.queue.set(u, s);
                },
                o
              );
            let l;
            this.all.add(a), a.notify();
            const c = () => {
              a.cleanup(), l?.(), this.all.delete(a), this.queue.delete(a);
            };
            return (l = i?.onDestroy(c)), { destroy: c };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, i] of this.queue)
                this.queue.delete(n), i ? i.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          ((e = t).ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function Uc(e, t, r) {
        let n = r ? e.styles : null,
          i = r ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Wd(i, a))
              : 2 == o && (n = Wd(n, a + ": " + t[++s] + ";"));
          }
        r ? (e.styles = n) : (e.stylesWithoutHost = n),
          r ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function aa(e, t, r, n, i = !1) {
        for (; null !== r; ) {
          const o = t[r.index];
          if ((null !== o && n.push(Le(o)), Qt(o))) {
            for (let a = Tt; a < o.length; a++) {
              const l = o[a],
                c = l[j].firstChild;
              null !== c && aa(l[j], l, c, n);
            }
            o[er] !== o[Xe] && n.push(o[er]);
          }
          const s = r.type;
          if (8 & s) aa(e, t, r.child, n);
          else if (32 & s) {
            const a = Hf(r, t);
            let l;
            for (; (l = a()); ) n.push(l);
          } else if (16 & s) {
            const a = Xv(t, r);
            if (Array.isArray(a)) n.push(...a);
            else {
              const l = Ws(t[tt]);
              aa(l[j], l, a, n, !0);
            }
          }
          r = i ? r.projectionNext : r.next;
        }
        return n;
      }
      function Hc(e, t, r, n = !0) {
        const i = t[so],
          o = i.rendererFactory,
          s = i.afterRenderEventManager;
        o.begin?.(), s?.begin();
        try {
          f0(e, t, e.template, r);
        } catch (l) {
          throw (n && u0(t, l), l);
        } finally {
          o.end?.(), i.effectManager?.flush(), s?.end();
        }
      }
      function f0(e, t, r, n) {
        const i = t[X];
        if (256 != (256 & i)) {
          t[so].effectManager?.flush(), wf(t);
          try {
            $m(t),
              (function Qm(e) {
                return (Z.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== r && Jy(e, t, r, 2, n);
            const s = 3 == (3 & i);
            if (s) {
              const c = e.preOrderCheckHooks;
              null !== c && tc(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && nc(t, c, 0, null), Sf(t, 0);
            }
            if (
              ((function GA(e) {
                for (let t = Uv(e); null !== t; t = Hv(t)) {
                  if (!t[Mm]) continue;
                  const r = t[co];
                  for (let n = 0; n < r.length; n++) {
                    mM(r[n]);
                  }
                }
              })(t),
              h0(t, 2),
              null !== e.contentQueries && s0(e, t),
              s)
            ) {
              const c = e.contentCheckHooks;
              null !== c && tc(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && nc(t, c, 1), Sf(t, 1);
            }
            !(function gA(e, t) {
              const r = e.hostBindingOpCodes;
              if (null === r) return;
              const n = qy(t, ql);
              try {
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  if (o < 0) gi(~o);
                  else {
                    const s = o,
                      a = r[++i],
                      l = r[++i];
                    OM(a, s), n.runInContext(l, 2, t[s]);
                  }
                }
              } finally {
                null === t[ql] && Wy(t, ql), gi(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && g0(t, a, 0);
            const l = e.viewQuery;
            if ((null !== l && Ph(2, l, n), s)) {
              const c = e.viewCheckHooks;
              null !== c && tc(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && nc(t, c, 2), Sf(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[X] &= -73),
              Gm(t);
          } finally {
            Ef();
          }
        }
      }
      function h0(e, t) {
        for (let r = Uv(e); null !== r; r = Hv(r))
          for (let n = Tt; n < r.length; n++) p0(r[n], t);
      }
      function zA(e, t, r) {
        p0(fn(t, e), r);
      }
      function p0(e, t) {
        if (
          !(function gM(e) {
            return 128 == (128 & e[X]);
          })(e)
        )
          return;
        const r = e[j];
        if ((80 & e[X] && 0 === t) || 1024 & e[X] || 2 === t)
          f0(r, e, r.template, e[et]);
        else if (e[xs] > 0) {
          h0(e, 1);
          const i = e[j].components;
          null !== i && g0(e, i, 1);
        }
      }
      function g0(e, t, r) {
        for (let n = 0; n < t.length; n++) zA(e, t[n], r);
      }
      class la {
        get rootNodes() {
          const t = this._lView,
            r = t[j];
          return aa(r, t, r.firstChild, []);
        }
        constructor(t, r) {
          (this._lView = t),
            (this._cdRefInjectingView = r),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[et];
        }
        set context(t) {
          this._lView[et] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[X]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Ue];
            if (Qt(t)) {
              const r = t[8],
                n = r ? r.indexOf(this) : -1;
              n > -1 && (yc(t, n), ac(r, n));
            }
            this._attachedToViewContainer = !1;
          }
          Gf(this._lView[j], this._lView);
        }
        onDestroy(t) {
          !(function qm(e, t) {
            if (256 == (256 & e[X])) throw new N(911, !1);
            null === e[Br] && (e[Br] = []), e[Br].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          oa(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[X] &= -129;
        }
        reattach() {
          this._lView[X] |= 128;
        }
        detectChanges() {
          Hc(this._lView[j], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new N(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function $O(e, t) {
              Zs(e, t, t[K], 2, null, null);
            })(this._lView[j], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new N(902, !1);
          this._appRef = t;
        }
      }
      class qA extends la {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Hc(t[j], t, t[et], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class _0 extends Fc {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const r = ce(t);
          return new ca(r, this.ngModule);
        }
      }
      function m0(e) {
        const t = [];
        for (let r in e)
          e.hasOwnProperty(r) && t.push({ propName: e[r], templateName: r });
        return t;
      }
      class YA {
        constructor(t, r) {
          (this.injector = t), (this.parentInjector = r);
        }
        get(t, r, n) {
          n = Ul(n);
          const i = this.injector.get(t, Dh, n);
          return i !== Dh || r === Dh ? i : this.parentInjector.get(t, r, n);
        }
      }
      class ca extends Oy {
        get inputs() {
          const t = this.componentDef,
            r = t.inputTransforms,
            n = m0(t.inputs);
          if (null !== r)
            for (const i of n)
              r.hasOwnProperty(i.propName) && (i.transform = r[i.propName]);
          return n;
        }
        get outputs() {
          return m0(this.componentDef.outputs);
        }
        constructor(t, r) {
          super(),
            (this.componentDef = t),
            (this.ngModule = r),
            (this.componentType = t.type),
            (this.selector = (function UT(e) {
              return e.map(jT).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!r);
        }
        create(t, r, n, i) {
          let o = (i = i || this.ngModule) instanceof Ht ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new YA(t, o) : t,
            a = s.get(bh, null);
          if (null === a) throw new N(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(KN, null),
              effectManager: s.get(d0, null),
              afterRenderEventManager: s.get(Eh, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = n
              ? (function mA(e, t, r, n) {
                  const o = n.get(jy, !1) || r === Pn.ShadowDom,
                    s = e.selectRootElement(t, o);
                  return (
                    (function vA(e) {
                      Ky(e);
                    })(s),
                    s
                  );
                })(f, n, this.componentDef.encapsulation, s)
              : vc(
                  f,
                  h,
                  (function WA(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            D = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let v = null;
          null !== p && (v = mh(p, s, !0));
          const A = Nh(0, null, null, 1, 0, null, null, null, null, null, null),
            O = Bc(null, A, null, D, null, null, d, f, s, null, v);
          let B, W;
          wf(O);
          try {
            const oe = this.componentDef;
            let le,
              Je = null;
            oe.findHostDirectiveDefs
              ? ((le = []),
                (Je = new Map()),
                oe.findHostDirectiveDefs(oe, le, Je),
                le.push(oe))
              : (le = [oe]);
            const ot = (function JA(e, t) {
                const r = e[j],
                  n = ae;
                return (e[n] = t), xo(r, n, 2, "#host", null);
              })(O, p),
              Et = (function QA(e, t, r, n, i, o, s) {
                const a = i[j];
                !(function KA(e, t, r, n) {
                  for (const i of e)
                    t.mergedAttrs = Rs(t.mergedAttrs, i.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Uc(t, t.mergedAttrs, !0), null !== r && ry(n, r, t));
                })(n, e, t, s);
                let l = null;
                null !== t && (l = mh(t, i[Vr]));
                const c = o.rendererFactory.createRenderer(t, r);
                let u = 16;
                r.signals ? (u = 4096) : r.onPush && (u = 64);
                const d = Bc(
                  i,
                  Qy(r),
                  null,
                  u,
                  i[e.index],
                  e,
                  o,
                  c,
                  null,
                  null,
                  l
                );
                return (
                  a.firstCreatePass && Rh(a, e, n.length - 1),
                  jc(i, d),
                  (i[e.index] = d)
                );
              })(ot, p, oe, le, O, d, f);
            (W = Hm(A, ae)),
              p &&
                (function eR(e, t, r, n) {
                  if (n) cf(e, r, ["ng-version", XN.full]);
                  else {
                    const { attrs: i, classes: o } = (function HT(e) {
                      const t = [],
                        r = [];
                      let n = 1,
                        i = 2;
                      for (; n < e.length; ) {
                        let o = e[n];
                        if ("string" == typeof o)
                          2 === i
                            ? "" !== o && t.push(o, e[++n])
                            : 8 === i && r.push(o);
                        else {
                          if (!kn(i)) break;
                          i = o;
                        }
                        n++;
                      }
                      return { attrs: t, classes: r };
                    })(t.selectors[0]);
                    i && cf(e, r, i),
                      o && o.length > 0 && ny(e, r, o.join(" "));
                  }
                })(f, oe, p, n),
              void 0 !== r &&
                (function tR(e, t, r) {
                  const n = (e.projection = []);
                  for (let i = 0; i < t.length; i++) {
                    const o = r[i];
                    n.push(null != o ? Array.from(o) : null);
                  }
                })(W, this.ngContentSelectors, r),
              (B = (function XA(e, t, r, n, i, o) {
                const s = Ot(),
                  a = i[j],
                  l = Kt(s, i);
                t0(a, i, s, r, null, n);
                for (let u = 0; u < r.length; u++)
                  Ft(_i(i, a, s.directiveStart + u, s), i);
                n0(a, i, s), l && Ft(l, i);
                const c = _i(i, a, s.directiveStart + s.componentOffset, s);
                if (((e[et] = i[et] = c), null !== o))
                  for (const u of o) u(c, t);
                return Th(a, s, e), c;
              })(Et, oe, le, Je, O, [nR])),
              Fh(A, O, null);
          } finally {
            Ef();
          }
          return new ZA(this.componentType, B, No(W, O), O, W);
        }
      }
      class ZA extends qN {
        constructor(t, r, n, i, o) {
          super(),
            (this.location = n),
            (this._rootLView = i),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = r),
            (this.hostView = this.changeDetectorRef = new qA(i)),
            (this.componentType = t);
        }
        setInput(t, r) {
          const n = this._tNode.inputs;
          let i;
          if (null !== n && (i = n[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), r))
            )
              return;
            const o = this._rootLView;
            kh(o[j], o, i, t, r),
              this.previousInputValues.set(t, r),
              oa(fn(this._tNode.index, o));
          }
        }
        get injector() {
          return new Ut(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function nR() {
        const e = Ot();
        ec(I()[j], e);
      }
      function Ee(e) {
        let t = (function v0(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          r = !0;
        const n = [e];
        for (; t; ) {
          let i;
          if (Ln(e)) i = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new N(903, !1);
            i = t.ɵdir;
          }
          if (i) {
            if (r) {
              n.push(i);
              const s = e;
              (s.inputs = $c(e.inputs)),
                (s.inputTransforms = $c(e.inputTransforms)),
                (s.declaredInputs = $c(e.declaredInputs)),
                (s.outputs = $c(e.outputs));
              const a = i.hostBindings;
              a && sR(e, a);
              const l = i.viewQuery,
                c = i.contentQueries;
              if (
                (l && iR(e, l),
                c && oR(e, c),
                kl(e.inputs, i.inputs),
                kl(e.declaredInputs, i.declaredInputs),
                kl(e.outputs, i.outputs),
                null !== i.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  kl(s.inputTransforms, i.inputTransforms)),
                Ln(i) && i.data.animation)
              ) {
                const u = e.data;
                u.animation = (u.animation || []).concat(i.data.animation);
              }
            }
            const o = i.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(e), a === Ee && (r = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function rR(e) {
          let t = 0,
            r = null;
          for (let n = e.length - 1; n >= 0; n--) {
            const i = e[n];
            (i.hostVars = t += i.hostVars),
              (i.hostAttrs = Rs(i.hostAttrs, (r = Rs(r, i.hostAttrs))));
          }
        })(n);
      }
      function $c(e) {
        return e === Kn ? {} : e === he ? [] : e;
      }
      function iR(e, t) {
        const r = e.viewQuery;
        e.viewQuery = r
          ? (n, i) => {
              t(n, i), r(n, i);
            }
          : t;
      }
      function oR(e, t) {
        const r = e.contentQueries;
        e.contentQueries = r
          ? (n, i, o) => {
              t(n, i, o), r(n, i, o);
            }
          : t;
      }
      function sR(e, t) {
        const r = e.hostBindings;
        e.hostBindings = r
          ? (n, i) => {
              t(n, i), r(n, i);
            }
          : t;
      }
      function C0(e) {
        const t = e.inputConfig,
          r = {};
        for (const n in t)
          if (t.hasOwnProperty(n)) {
            const i = t[n];
            Array.isArray(i) && i[2] && (r[n] = i[2]);
          }
        e.inputTransforms = r;
      }
      function Gc(e) {
        return (
          !!(function Lh(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Lt(e, t, r) {
        return !Object.is(e[t], r) && ((e[t] = r), !0);
      }
      function Ci(e, t, r, n) {
        const i = Lt(e, t, r);
        return Lt(e, t + 1, n) || i;
      }
      function Se(e, t, r, n) {
        const i = I();
        return Lt(i, ho(), t) && (ue(), or(ze(), i, e, t, r, n)), Se;
      }
      function Lo(e, t, r, n, i, o, s, a) {
        const c = (function zc(e, t, r, n, i) {
          const o = Ci(e, t, r, n);
          return Lt(e, t + 2, i) || o;
        })(
          e,
          (function Dr() {
            return Z.lFrame.bindingIndex;
          })(),
          r,
          i,
          s
        );
        return Cr(3), c ? t + Q(r) + n + Q(i) + o + Q(s) + a : ee;
      }
      function R(e, t, r, n, i, o, s, a) {
        const l = I(),
          c = ue(),
          u = e + ae,
          d = c.firstCreatePass
            ? (function NR(e, t, r, n, i, o, s, a, l) {
                const c = t.consts,
                  u = xo(t, e, 4, s || null, jr(c, a));
                Ah(t, r, u, jr(c, l)), ec(t, u);
                const d = (u.tView = Nh(
                  2,
                  u,
                  n,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(u, c, l, t, r, n, i, o, s)
            : c.data[u];
        rr(d, !1);
        const f = k0(c, l, d, e);
        Xl() && Dc(c, l, f, d),
          Ft(f, l),
          jc(l, (l[u] = o0(f, l, f, d))),
          Yl(d) && Mh(c, l, d),
          null != s && Oh(l, d, a);
      }
      let k0 = function F0(e, t, r, n) {
        return Ur(!0), t[K].createComment("");
      };
      function qe(e) {
        return uo(
          (function TM() {
            return Z.lFrame.contextLView;
          })(),
          ae + e
        );
      }
      function M(e, t, r) {
        const n = I();
        return Lt(n, ho(), t) && gn(ue(), ze(), n, e, t, n[K], r, !1), M;
      }
      function $h(e, t, r, n, i) {
        const s = i ? "class" : "style";
        kh(e, r, t.inputs[s], s, n);
      }
      function w(e, t, r, n) {
        const i = I(),
          o = ue(),
          s = ae + e,
          a = i[K],
          l = o.firstCreatePass
            ? (function PR(e, t, r, n, i, o) {
                const s = t.consts,
                  l = xo(t, e, 2, n, jr(s, i));
                return (
                  Ah(t, r, l, jr(s, o)),
                  null !== l.attrs && Uc(l, l.attrs, !1),
                  null !== l.mergedAttrs && Uc(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, o, i, t, r, n)
            : o.data[s],
          c = L0(o, i, l, a, t, e);
        i[s] = c;
        const u = Yl(l);
        return (
          rr(l, !0),
          ry(a, c, l),
          32 != (32 & l.flags) && Xl() && Dc(o, i, c, l),
          0 ===
            (function yM() {
              return Z.lFrame.elementDepthCount;
            })() && Ft(c, i),
          (function bM() {
            Z.lFrame.elementDepthCount++;
          })(),
          u && (Mh(o, i, l), Th(o, l, i)),
          null !== n && Oh(i, l),
          w
        );
      }
      function C() {
        let e = Ot();
        vf() ? yf() : ((e = e.parent), rr(e, !1));
        const t = e;
        (function CM(e) {
          return Z.skipHydrationRootTNode === e;
        })(t) &&
          (function IM() {
            Z.skipHydrationRootTNode = null;
          })(),
          (function DM() {
            Z.lFrame.elementDepthCount--;
          })();
        const r = ue();
        return (
          r.firstCreatePass && (ec(r, e), df(e) && r.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function UM(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            $h(r, t, I(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function HM(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            $h(r, t, I(), t.stylesWithoutHost, !1),
          C
        );
      }
      function We(e, t, r, n) {
        return w(e, t, r, n), C(), We;
      }
      let L0 = (e, t, r, n, i, o) => (
        Ur(!0),
        vc(
          n,
          i,
          (function ov() {
            return Z.lFrame.currentNamespace;
          })()
        )
      );
      function He() {
        return I();
      }
      function ga(e) {
        return !!e && "function" == typeof e.then;
      }
      function j0(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function G(e, t, r, n) {
        const i = I(),
          o = ue(),
          s = Ot();
        return (
          (function H0(e, t, r, n, i, o, s) {
            const a = Yl(n),
              c = e.firstCreatePass && l0(e),
              u = t[et],
              d = a0(t);
            let f = !0;
            if (3 & n.type || s) {
              const _ = Kt(n, t),
                m = s ? s(_) : _,
                D = d.length,
                v = s ? (O) => s(Le(O[n.index])) : n.index;
              let A = null;
              if (
                (!s &&
                  a &&
                  (A = (function jR(e, t, r, n) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === r && i[o + 1] === n) {
                          const a = t[oo],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, n.index)),
                null !== A)
              )
                ((A.__ngLastListenerFn__ || A).__ngNextListenerFn__ = o),
                  (A.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = G0(n, t, u, o, !1);
                const O = r.listen(m, i, o);
                d.push(o, O), c && c.push(i, v, D, D + 1);
              }
            } else o = G0(n, t, u, o, !1);
            const h = n.outputs;
            let p;
            if (f && null !== h && (p = h[i])) {
              const _ = p.length;
              if (_)
                for (let m = 0; m < _; m += 2) {
                  const B = t[p[m]][p[m + 1]].subscribe(o),
                    W = d.length;
                  d.push(o, B), c && c.push(i, n.index, W, -(W + 1));
                }
            }
          })(o, i, i[K], s, e, t, n),
          G
        );
      }
      function $0(e, t, r, n) {
        try {
          return nr(6, t, r), !1 !== r(n);
        } catch (i) {
          return u0(e, i), !1;
        } finally {
          nr(7, t, r);
        }
      }
      function G0(e, t, r, n, i) {
        return function o(s) {
          if (s === Function) return n;
          oa(e.componentOffset > -1 ? fn(e.index, t) : t);
          let l = $0(t, r, n, s),
            c = o.__ngNextListenerFn__;
          for (; c; ) (l = $0(t, r, c, s) && l), (c = c.__ngNextListenerFn__);
          return i && !1 === l && s.preventDefault(), l;
        };
      }
      function H(e = 1) {
        return (function RM(e) {
          return (Z.lFrame.contextLView = (function xM(e, t) {
            for (; e > 0; ) (t = t[ao]), e--;
            return t;
          })(e, Z.lFrame.contextLView))[et];
        })(e);
      }
      function UR(e, t) {
        let r = null;
        const n = (function FT(e) {
          const t = e.attrs;
          if (null != t) {
            const r = t.indexOf(5);
            if (!(1 & r)) return t[r + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < t.length; i++) {
          const o = t[i];
          if ("*" !== o) {
            if (null === n ? Dm(e, o, !0) : BT(n, o)) return i;
          } else r = i;
        }
        return r;
      }
      function _a(e, t, r, n, i, o, s, a, l) {
        const c = I(),
          u = Lo(c, t, r, n, i, o, s, a);
        return u !== ee && gn(ue(), ze(), c, e, u, c[K], l, !1), _a;
      }
      function Jc(e, t) {
        return (e << 17) | (t << 2);
      }
      function Gr(e) {
        return (e >> 17) & 32767;
      }
      function Wh(e) {
        return 2 | e;
      }
      function wi(e) {
        return (131068 & e) >> 2;
      }
      function Yh(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Zh(e) {
        return 1 | e;
      }
      function e1(e, t, r, n, i) {
        const o = e[r + 1],
          s = null === t;
        let a = n ? Gr(o) : wi(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1];
          WR(e[a], t) && ((l = !0), (e[a + 1] = n ? Zh(u) : Wh(u))),
            (a = n ? Gr(u) : wi(u));
        }
        l && (e[r + 1] = n ? Wh(o) : Zh(o));
      }
      function WR(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Do(e, t) >= 0)
        );
      }
      const gt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function t1(e) {
        return e.substring(gt.key, gt.keyEnd);
      }
      function n1(e, t) {
        const r = gt.textEnd;
        return r === t
          ? -1
          : ((t = gt.keyEnd =
              (function QR(e, t, r) {
                for (; t < r && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (gt.key = t), r)),
            $o(e, t, r));
      }
      function $o(e, t, r) {
        for (; t < r && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function pe(e, t) {
        return (
          (function Vn(e, t, r, n) {
            const i = I(),
              o = ue(),
              s = Cr(2);
            o.firstUpdatePass && c1(o, e, s, n),
              t !== ee &&
                Lt(i, s, t) &&
                d1(
                  o,
                  o.data[jt()],
                  i,
                  i[K],
                  e,
                  (i[s + 1] = (function lx(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ht($r(e)))),
                      e
                    );
                  })(t, r)),
                  n,
                  s
                );
          })(e, t, null, !0),
          pe
        );
      }
      function Ei(e) {
        !(function Bn(e, t, r, n) {
          const i = ue(),
            o = Cr(2);
          i.firstUpdatePass && c1(i, null, o, n);
          const s = I();
          if (r !== ee && Lt(s, o, r)) {
            const a = i.data[jt()];
            if (h1(a, n) && !l1(i, o)) {
              let l = n ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (r = Wd(l, r || "")), $h(i, a, s, r, n);
            } else
              !(function ax(e, t, r, n, i, o, s, a) {
                i === ee && (i = he);
                let l = 0,
                  c = 0,
                  u = 0 < i.length ? i[0] : null,
                  d = 0 < o.length ? o[0] : null;
                for (; null !== u || null !== d; ) {
                  const f = l < i.length ? i[l + 1] : void 0,
                    h = c < o.length ? o[c + 1] : void 0;
                  let _,
                    p = null;
                  u === d
                    ? ((l += 2), (c += 2), f !== h && ((p = d), (_ = h)))
                    : null === d || (null !== u && u < d)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = d), (_ = h)),
                    null !== p && d1(e, t, r, n, p, _, s, a),
                    (u = l < i.length ? i[l] : null),
                    (d = c < o.length ? o[c] : null);
                }
              })(
                i,
                a,
                s,
                s[K],
                s[o + 1],
                (s[o + 1] = (function ox(e, t, r) {
                  if (null == r || "" === r) return he;
                  const n = [],
                    i = $r(r);
                  if (Array.isArray(i))
                    for (let o = 0; o < i.length; o++) e(n, i[o], !0);
                  else if ("object" == typeof i)
                    for (const o in i) i.hasOwnProperty(o) && e(n, o, i[o]);
                  else "string" == typeof i && t(n, i);
                  return n;
                })(e, t, r)),
                n,
                o
              );
          }
        })(sx, lr, e, !0);
      }
      function lr(e, t) {
        for (
          let r = (function ZR(e) {
            return (
              (function i1(e) {
                (gt.key = 0),
                  (gt.keyEnd = 0),
                  (gt.value = 0),
                  (gt.valueEnd = 0),
                  (gt.textEnd = e.length);
              })(e),
              n1(e, $o(e, 0, gt.textEnd))
            );
          })(t);
          r >= 0;
          r = n1(t, r)
        )
          hn(e, t1(t), !0);
      }
      function l1(e, t) {
        return t >= e.expandoStartIndex;
      }
      function c1(e, t, r, n) {
        const i = e.data;
        if (null === i[r + 1]) {
          const o = i[jt()],
            s = l1(e, r);
          h1(o, n) && null === t && !s && (t = !1),
            (t = (function tx(e, t, r, n) {
              const i = (function Df(e) {
                const t = Z.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let o = n ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (n ? t.classBindings : t.styleBindings) &&
                  ((r = ma((r = Jh(null, e, t, r, n)), t.attrs, n)),
                  (o = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== i)
                  if (((r = Jh(i, e, t, r, n)), null === o)) {
                    let l = (function nx(e, t, r) {
                      const n = r ? t.classBindings : t.styleBindings;
                      if (0 !== wi(n)) return e[Gr(n)];
                    })(e, t, n);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = Jh(null, e, t, l[1], n)),
                      (l = ma(l, t.attrs, n)),
                      (function rx(e, t, r, n) {
                        e[Gr(r ? t.classBindings : t.styleBindings)] = n;
                      })(e, t, n, l));
                  } else
                    o = (function ix(e, t, r) {
                      let n;
                      const i = t.directiveEnd;
                      for (let o = 1 + t.directiveStylingLast; o < i; o++)
                        n = ma(n, e[o].hostAttrs, r);
                      return ma(n, t.attrs, r);
                    })(e, t, n);
              }
              return (
                void 0 !== o &&
                  (n ? (t.residualClasses = o) : (t.residualStyles = o)),
                r
              );
            })(i, o, t, n)),
            (function zR(e, t, r, n, i, o) {
              let s = o ? t.classBindings : t.styleBindings,
                a = Gr(s),
                l = wi(s);
              e[n] = r;
              let u,
                c = !1;
              if (
                (Array.isArray(r)
                  ? ((u = r[1]), (null === u || Do(r, u) > 0) && (c = !0))
                  : (u = r),
                i)
              )
                if (0 !== l) {
                  const f = Gr(e[a + 1]);
                  (e[n + 1] = Jc(f, a)),
                    0 !== f && (e[f + 1] = Yh(e[f + 1], n)),
                    (e[a + 1] = (function $R(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[a + 1], n));
                } else
                  (e[n + 1] = Jc(a, 0)),
                    0 !== a && (e[a + 1] = Yh(e[a + 1], n)),
                    (a = n);
              else
                (e[n + 1] = Jc(l, 0)),
                  0 === a ? (a = n) : (e[l + 1] = Yh(e[l + 1], n)),
                  (l = n);
              c && (e[n + 1] = Wh(e[n + 1])),
                e1(e, u, n, !0),
                e1(e, u, n, !1),
                (function qR(e, t, r, n, i) {
                  const o = i ? e.residualClasses : e.residualStyles;
                  null != o &&
                    "string" == typeof t &&
                    Do(o, t) >= 0 &&
                    (r[n + 1] = Zh(r[n + 1]));
                })(t, u, e, n, o),
                (s = Jc(a, l)),
                o ? (t.classBindings = s) : (t.styleBindings = s);
            })(i, o, t, r, s, n);
        }
      }
      function Jh(e, t, r, n, i) {
        let o = null;
        const s = r.directiveEnd;
        let a = r.directiveStylingLast;
        for (
          -1 === a ? (a = r.directiveStart) : a++;
          a < s && ((o = t[a]), (n = ma(n, o.hostAttrs, i)), o !== e);

        )
          a++;
        return null !== e && (r.directiveStylingLast = a), n;
      }
      function ma(e, t, r) {
        const n = r ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (i = s)
              : i === n &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                hn(e, s, !!r || t[++o]));
          }
        return void 0 === e ? null : e;
      }
      function sx(e, t, r) {
        const n = String(t);
        "" !== n && !n.includes(" ") && hn(e, n, r);
      }
      function d1(e, t, r, n, i, o, s, a) {
        if (!(3 & t.type)) return;
        const l = e.data,
          c = l[a + 1],
          u = (function GR(e) {
            return 1 == (1 & e);
          })(c)
            ? f1(l, t, r, i, wi(c), s)
            : void 0;
        Qc(u) ||
          (Qc(o) ||
            ((function HR(e) {
              return 2 == (2 & e);
            })(c) &&
              (o = f1(l, null, r, i, a, s))),
          (function XO(e, t, r, n, i) {
            if (t) i ? e.addClass(r, n) : e.removeClass(r, n);
            else {
              let o = -1 === n.indexOf("-") ? void 0 : Hr.DashCase;
              null == i
                ? e.removeStyle(r, n, o)
                : ("string" == typeof i &&
                    i.endsWith("!important") &&
                    ((i = i.slice(0, -10)), (o |= Hr.Important)),
                  e.setStyle(r, n, i, o));
            }
          })(n, s, Kl(jt(), r), i, o));
      }
      function f1(e, t, r, n, i, o) {
        const s = null === t;
        let a;
        for (; i > 0; ) {
          const l = e[i],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let f = r[i + 1];
          f === ee && (f = d ? he : void 0);
          let h = d ? xf(f, n) : u === n ? f : void 0;
          if ((c && !Qc(h) && (h = xf(l, n)), Qc(h) && ((a = h), s))) return a;
          const p = e[i + 1];
          i = s ? Gr(p) : wi(p);
        }
        if (null !== t) {
          let l = o ? t.residualClasses : t.residualStyles;
          null != l && (a = xf(l, n));
        }
        return a;
      }
      function Qc(e) {
        return void 0 !== e;
      }
      function h1(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function k(e, t = "") {
        const r = I(),
          n = ue(),
          i = e + ae,
          o = n.firstCreatePass ? xo(n, i, 1, t, null) : n.data[i],
          s = p1(n, r, o, t, e);
        (r[i] = s), Xl() && Dc(n, r, s, o), rr(o, !1);
      }
      let p1 = (e, t, r, n, i) => (
        Ur(!0),
        (function mc(e, t) {
          return e.createText(t);
        })(t[K], n)
      );
      function _t(e) {
        return $t("", e, ""), _t;
      }
      function $t(e, t, r) {
        const n = I(),
          i = (function ko(e, t, r, n) {
            return Lt(e, ho(), r) ? t + Q(r) + n : ee;
          })(n, e, t, r);
        return (
          i !== ee &&
            (function Sr(e, t, r) {
              const n = Kl(t, e);
              !(function Gv(e, t, r) {
                e.setValue(t, r);
              })(e[K], n, r);
            })(n, jt(), i),
          $t
        );
      }
      const Si = void 0;
      var Nx = [
        "en",
        [["a", "p"], ["AM", "PM"], Si],
        [["AM", "PM"], Si, Si],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Si,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Si,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Si, "{1} 'at' {0}", Si],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function Ox(e) {
          const r = Math.floor(Math.abs(e)),
            n = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === r && 0 === n ? 1 : 5;
        },
      ];
      let Go = {};
      function Gt(e) {
        const t = (function Ax(e) {
          return e.toLowerCase().replace(/_/g, "-");
        })(e);
        let r = P1(t);
        if (r) return r;
        const n = t.split("-")[0];
        if (((r = P1(n)), r)) return r;
        if ("en" === n) return Nx;
        throw new N(701, !1);
      }
      function P1(e) {
        return (
          e in Go ||
            (Go[e] =
              Pe.ng &&
              Pe.ng.common &&
              Pe.ng.common.locales &&
              Pe.ng.common.locales[e]),
          Go[e]
        );
      }
      var Ve = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = "LocaleId"),
          (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (e[(e.DaysFormat = 3)] = "DaysFormat"),
          (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
          (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
          (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
          (e[(e.Eras = 7)] = "Eras"),
          (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (e[(e.WeekendRange = 9)] = "WeekendRange"),
          (e[(e.DateFormat = 10)] = "DateFormat"),
          (e[(e.TimeFormat = 11)] = "TimeFormat"),
          (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
          (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
          (e[(e.NumberFormats = 14)] = "NumberFormats"),
          (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
          (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
          (e[(e.CurrencyName = 17)] = "CurrencyName"),
          (e[(e.Currencies = 18)] = "Currencies"),
          (e[(e.Directionality = 19)] = "Directionality"),
          (e[(e.PluralCase = 20)] = "PluralCase"),
          (e[(e.ExtraData = 21)] = "ExtraData"),
          e
        );
      })(Ve || {});
      const zo = "en-US";
      let k1 = zo;
      function Xh(e, t, r, n, i) {
        if (((e = J(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) Xh(e[o], t, r, n, i);
        else {
          const o = ue(),
            s = I(),
            a = Ot();
          let l = yi(e) ? e : J(e.provide);
          const c = Cy(e),
            u = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (yi(e) || !e.multi) {
            const h = new Bs(c, i, g),
              p = tp(l, t, i ? u : u + f, d);
            -1 === p
              ? (Nf(ic(a, s), o, l),
                ep(o, e, t.length),
                t.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                i && (a.providerIndexes += 1048576),
                r.push(h),
                s.push(h))
              : ((r[p] = h), (s[p] = h));
          } else {
            const h = tp(l, t, u + f, d),
              p = tp(l, t, u, u + f),
              m = p >= 0 && r[p];
            if ((i && !m) || (!i && !(h >= 0 && r[h]))) {
              Nf(ic(a, s), o, l);
              const D = (function MP(e, t, r, n, i) {
                const o = new Bs(e, r, g);
                return (
                  (o.multi = []),
                  (o.index = t),
                  (o.componentProviders = 0),
                  sb(o, i, n && !r),
                  o
                );
              })(i ? TP : IP, r.length, i, n, c);
              !i && m && (r[p].providerFactory = D),
                ep(o, e, t.length, 0),
                t.push(l),
                a.directiveStart++,
                a.directiveEnd++,
                i && (a.providerIndexes += 1048576),
                r.push(D),
                s.push(D);
            } else ep(o, e, h > -1 ? h : p, sb(r[i ? p : h], c, !i && n));
            !i && n && m && r[p].componentProviders++;
          }
        }
      }
      function ep(e, t, r, n) {
        const i = yi(t),
          o = (function ON(e) {
            return !!e.useClass;
          })(t);
        if (i || o) {
          const l = (o ? J(t.useClass) : t).prototype.ngOnDestroy;
          if (l) {
            const c = e.destroyHooks || (e.destroyHooks = []);
            if (!i && t.multi) {
              const u = c.indexOf(r);
              -1 === u ? c.push(r, [n, l]) : c[u + 1].push(n, l);
            } else c.push(r, l);
          }
        }
      }
      function sb(e, t, r) {
        return r && e.componentProviders++, e.multi.push(t) - 1;
      }
      function tp(e, t, r, n) {
        for (let i = r; i < n; i++) if (t[i] === e) return i;
        return -1;
      }
      function IP(e, t, r, n) {
        return np(this.multi, []);
      }
      function TP(e, t, r, n) {
        const i = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = _i(r, r[j], this.providerFactory.index, n);
          (o = a.slice(0, s)), np(i, o);
          for (let l = s; l < a.length; l++) o.push(a[l]);
        } else (o = []), np(i, o);
        return o;
      }
      function np(e, t) {
        for (let r = 0; r < e.length; r++) t.push((0, e[r])());
        return t;
      }
      function ke(e, t = []) {
        return (r) => {
          r.providersResolver = (n, i) =>
            (function SP(e, t, r) {
              const n = ue();
              if (n.firstCreatePass) {
                const i = Ln(e);
                Xh(r, n.data, n.blueprint, i, !0),
                  Xh(t, n.data, n.blueprint, i, !1);
              }
            })(n, i ? i(e) : e, t);
        };
      }
      class Ii {}
      class ab {}
      class rp extends Ii {
        constructor(t, r, n) {
          super(),
            (this._parent = r),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new _0(this));
          const i = dn(t);
          (this._bootstrapComponents = Er(i.bootstrap)),
            (this._r3Injector = ky(
              t,
              r,
              [
                { provide: Ii, useValue: this },
                { provide: Fc, useValue: this.componentFactoryResolver },
                ...n,
              ],
              ht(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((r) => r()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class ip extends ab {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new rp(this.moduleType, t, []);
        }
      }
      class lb extends Ii {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new _0(this)),
            (this.instance = null);
          const r = new Oc(
            [
              ...t.providers,
              { provide: Ii, useValue: this },
              { provide: Fc, useValue: this.componentFactoryResolver },
            ],
            t.parent || Mc(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = r),
            t.runEnvironmentInitializers && r.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function op(e, t, r = null) {
        return new lb({
          providers: e,
          parent: t,
          debugName: r,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let AP = (() => {
        var e;
        class t {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const i = vy(0, n.type),
                o =
                  i.length > 0
                    ? op([i], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, o);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          ((e = t).ɵprov = P({
            token: e,
            providedIn: "environment",
            factory: () => new e(F(Ht)),
          })),
          t
        );
      })();
      function Tn(e) {
        e.getStandaloneInjector = (t) =>
          t.get(AP).getOrCreateStandaloneInjector(e);
      }
      function _b(e, t, r, n, i, o, s) {
        const a = t + r;
        return Ci(e, a, i, o)
          ? (function sr(e, t, r) {
              return (e[t] = r);
            })(e, a + 2, s ? n.call(s, i, o) : n(i, o))
          : (function Ia(e, t) {
              const r = e[t];
              return r === ee ? void 0 : r;
            })(e, a + 2);
      }
      function Db(e, t, r, n) {
        const i = e + ae,
          o = I(),
          s = uo(o, i);
        return (function Ta(e, t) {
          return e[j].data[t].pure;
        })(o, i)
          ? _b(
              o,
              (function Bt() {
                const e = Z.lFrame;
                let t = e.bindingRootIndex;
                return (
                  -1 === t &&
                    (t = e.bindingRootIndex = e.tView.bindingStartIndex),
                  t
                );
              })(),
              t,
              s.transform,
              r,
              n,
              s
            )
          : s.transform(r, n);
      }
      function lp(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const z = class KP extends ve {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, r, n) {
          let i = t,
            o = r || (() => null),
            s = n;
          if (t && "object" == typeof t) {
            const l = t;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = lp(o)), i && (i = lp(i)), s && (s = lp(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof je && t.add(a), a;
        }
      };
      function XP() {
        return this._results[Symbol.iterator]();
      }
      class cp {
        get changes() {
          return this._changes || (this._changes = new z());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const r = cp.prototype;
          r[Symbol.iterator] || (r[Symbol.iterator] = XP);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, r) {
          return this._results.reduce(t, r);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, r) {
          const n = this;
          n.dirty = !1;
          const i = (function En(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function nO(e, t, r) {
            if (e.length !== t.length) return !1;
            for (let n = 0; n < e.length; n++) {
              let i = e[n],
                o = t[n];
              if ((r && ((i = r(i)), (o = r(o))), o !== i)) return !1;
            }
            return !0;
          })(n._results, i, r)) &&
            ((n._results = i),
            (n.length = i.length),
            (n.last = i[this.length - 1]),
            (n.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function tk(e, t, r, n = !0) {
        const i = t[j];
        if (
          ((function zO(e, t, r, n) {
            const i = Tt + n,
              o = r.length;
            n > 0 && (r[i - 1][Fn] = t),
              n < o - Tt
                ? ((t[Fn] = r[i]), bv(r, Tt + n, t))
                : (r.push(t), (t[Fn] = null)),
              (t[Ue] = r);
            const s = t[ks];
            null !== s &&
              r !== s &&
              (function qO(e, t) {
                const r = e[co];
                t[tt] !== t[Ue][Ue][tt] && (e[Mm] = !0),
                  null === r ? (e[co] = [t]) : r.push(t);
              })(s, t);
            const a = t[Xn];
            null !== a && a.insertView(e), (t[X] |= 128);
          })(i, t, e, r),
          n)
        ) {
          const o = Yf(r, e),
            s = t[K],
            a = bc(s, e[er]);
          null !== a &&
            (function HO(e, t, r, n, i, o) {
              (n[Xe] = i), (n[kt] = t), Zs(e, n, r, 1, i, o);
            })(i, e[kt], s, t, a, o);
        }
      }
      let Ye = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = ik), t;
      })();
      const nk = Ye,
        rk = class extends nk {
          constructor(t, r, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = r),
              (this.elementRef = n);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, r) {
            return this.createEmbeddedViewImpl(t, r);
          }
          createEmbeddedViewImpl(t, r, n) {
            const i = (function ek(e, t, r, n) {
              const i = t.tView,
                a = Bc(
                  e,
                  i,
                  r,
                  4096 & e[X] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  n?.injector ?? null,
                  n?.hydrationInfo ?? null
                );
              a[ks] = e[t.index];
              const c = e[Xn];
              return (
                null !== c && (a[Xn] = c.createEmbeddedView(i)), Fh(i, a, r), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: r,
              hydrationInfo: n,
            });
            return new la(i);
          }
        };
      function ik() {
        return nu(Ot(), I());
      }
      function nu(e, t) {
        return 4 & e.type ? new rk(t, e, No(e, t)) : null;
      }
      let Mn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = uk), t;
      })();
      function uk() {
        return Mb(Ot(), I());
      }
      const dk = Mn,
        Ib = class extends dk {
          constructor(t, r, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = r),
              (this._hostLView = n);
          }
          get element() {
            return No(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Ut(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = oc(this._hostTNode, this._hostLView);
            if (Tf(t)) {
              const r = Us(t, this._hostLView),
                n = js(t);
              return new Ut(r[j].data[n + 8], r);
            }
            return new Ut(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const r = Tb(this._lContainer);
            return (null !== r && r[t]) || null;
          }
          get length() {
            return this._lContainer.length - Tt;
          }
          createEmbeddedView(t, r, n) {
            let i, o;
            "number" == typeof n
              ? (i = n)
              : null != n && ((i = n.index), (o = n.injector));
            const a = t.createEmbeddedViewImpl(r || {}, o, null);
            return this.insertImpl(a, i, false), a;
          }
          createComponent(t, r, n, i, o) {
            const s =
              t &&
              !(function $s(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = r;
            else {
              const _ = r || {};
              (a = _.index),
                (n = _.injector),
                (i = _.projectableNodes),
                (o = _.environmentInjector || _.ngModuleRef);
            }
            const l = s ? t : new ca(ce(t)),
              c = n || this.parentInjector;
            if (!o && null == l.ngModule) {
              const m = (s ? c : this.parentInjector).get(Ht, null);
              m && (o = m);
            }
            ce(l.componentType ?? {});
            const h = l.create(c, i, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, r) {
            return this.insertImpl(t, r, !1);
          }
          insertImpl(t, r, n) {
            const i = t._lView;
            if (
              (function _M(e) {
                return Qt(e[Ue]);
              })(i)
            ) {
              const l = this.indexOf(t);
              if (-1 !== l) this.detach(l);
              else {
                const c = i[Ue],
                  u = new Ib(c, c[kt], c[Ue]);
                u.detach(u.indexOf(t));
              }
            }
            const s = this._adjustIndex(r),
              a = this._lContainer;
            return (
              tk(a, i, s, !n), t.attachToViewContainerRef(), bv(up(a), s, t), t
            );
          }
          move(t, r) {
            return this.insert(t, r);
          }
          indexOf(t) {
            const r = Tb(this._lContainer);
            return null !== r ? r.indexOf(t) : -1;
          }
          remove(t) {
            const r = this._adjustIndex(t, -1),
              n = yc(this._lContainer, r);
            n && (ac(up(this._lContainer), r), Gf(n[j], n));
          }
          detach(t) {
            const r = this._adjustIndex(t, -1),
              n = yc(this._lContainer, r);
            return n && null != ac(up(this._lContainer), r) ? new la(n) : null;
          }
          _adjustIndex(t, r = 0) {
            return t ?? this.length + r;
          }
        };
      function Tb(e) {
        return e[8];
      }
      function up(e) {
        return e[8] || (e[8] = []);
      }
      function Mb(e, t) {
        let r;
        const n = t[e.index];
        return (
          Qt(n)
            ? (r = n)
            : ((r = o0(n, t, null, e)), (t[e.index] = r), jc(t, r)),
          Ob(r, t, e, n),
          new Ib(r, e, t)
        );
      }
      let Ob = function Nb(e, t, r, n) {
        if (e[er]) return;
        let i;
        (i =
          8 & r.type
            ? Le(n)
            : (function fk(e, t) {
                const r = e[K],
                  n = r.createComment(""),
                  i = Kt(t, e);
                return (
                  vi(
                    r,
                    bc(r, i),
                    n,
                    (function JO(e, t) {
                      return e.nextSibling(t);
                    })(r, i),
                    !1
                  ),
                  n
                );
              })(t, r)),
          (e[er] = i);
      };
      class dp {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new dp(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class fp {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const r = t.queries;
          if (null !== r) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : r.length,
              i = [];
            for (let o = 0; o < n; o++) {
              const s = r.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new fp(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let r = 0; r < this.queries.length; r++)
            null !== kb(t, r).matches && this.queries[r].setDirty();
        }
      }
      class Ab {
        constructor(t, r, n = null) {
          (this.predicate = t), (this.flags = r), (this.read = n);
        }
      }
      class hp {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, r) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, r);
        }
        elementEnd(t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementEnd(t);
        }
        embeddedTView(t) {
          let r = null;
          for (let n = 0; n < this.length; n++) {
            const i = null !== r ? r.length : 0,
              o = this.getByIndex(n).embeddedTView(t, i);
            o &&
              ((o.indexInDeclarationView = n),
              null !== r ? r.push(o) : (r = [o]));
          }
          return null !== r ? new hp(r) : null;
        }
        template(t, r) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, r);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class pp {
        constructor(t, r = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = r);
        }
        elementStart(t, r) {
          this.isApplyingToNode(r) && this.matchTNode(t, r);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, r) {
          this.elementStart(t, r);
        }
        embeddedTView(t, r) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, r),
              new pp(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const r = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== r; ) n = n.parent;
            return r === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, r) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let i = 0; i < n.length; i++) {
              const o = n[i];
              this.matchTNodeWithReadOption(t, r, gk(r, o)),
                this.matchTNodeWithReadOption(t, r, sc(r, t, o, !1, !1));
            }
          else
            n === Ye
              ? 4 & r.type && this.matchTNodeWithReadOption(t, r, -1)
              : this.matchTNodeWithReadOption(t, r, sc(r, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, r, n) {
          if (null !== n) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === we || i === Mn || (i === Ye && 4 & r.type))
                this.addMatch(r.index, -2);
              else {
                const o = sc(r, t, i, !1, !1);
                null !== o && this.addMatch(r.index, o);
              }
            else this.addMatch(r.index, n);
          }
        }
        addMatch(t, r) {
          null === this.matches
            ? (this.matches = [t, r])
            : this.matches.push(t, r);
        }
      }
      function gk(e, t) {
        const r = e.localNames;
        if (null !== r)
          for (let n = 0; n < r.length; n += 2) if (r[n] === t) return r[n + 1];
        return null;
      }
      function mk(e, t, r, n) {
        return -1 === r
          ? (function _k(e, t) {
              return 11 & e.type ? No(e, t) : 4 & e.type ? nu(e, t) : null;
            })(t, e)
          : -2 === r
          ? (function vk(e, t, r) {
              return r === we
                ? No(t, e)
                : r === Ye
                ? nu(t, e)
                : r === Mn
                ? Mb(t, e)
                : void 0;
            })(e, t, n)
          : _i(e, e[j], r, t);
      }
      function Rb(e, t, r, n) {
        const i = t[Xn].queries[n];
        if (null === i.matches) {
          const o = e.data,
            s = r.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : mk(t, o[c], s[l + 1], r.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function gp(e, t, r, n) {
        const i = e.queries.getByIndex(r),
          o = i.matches;
        if (null !== o) {
          const s = Rb(e, t, i, r);
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a];
            if (l > 0) n.push(s[a / 2]);
            else {
              const c = o[a + 1],
                u = t[-l];
              for (let d = Tt; d < u.length; d++) {
                const f = u[d];
                f[ks] === f[Ue] && gp(f[j], f, c, n);
              }
              if (null !== u[co]) {
                const d = u[co];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  gp(h[j], h, c, n);
                }
              }
            }
          }
        }
        return n;
      }
      function Ne(e) {
        const t = I(),
          r = ue(),
          n = Xm();
        Cf(n + 1);
        const i = kb(r, n);
        if (
          e.dirty &&
          (function pM(e) {
            return 4 == (4 & e[X]);
          })(t) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? gp(r, t, n, []) : Rb(r, t, i, n);
            e.reset(o, JN), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ti(e, t, r) {
        const n = ue();
        n.firstCreatePass &&
          ((function Pb(e, t, r) {
            null === e.queries && (e.queries = new hp()),
              e.queries.track(new pp(t, r));
          })(n, new Ab(e, t, r), -1),
          2 == (2 & t) && (n.staticViewQueries = !0)),
          (function xb(e, t, r) {
            const n = new cp(4 == (4 & r));
            (function DA(e, t, r, n) {
              const i = a0(t);
              i.push(r), e.firstCreatePass && l0(e).push(n, i.length - 1);
            })(e, t, n, n.destroy),
              null === t[Xn] && (t[Xn] = new fp()),
              t[Xn].queries.push(new dp(n));
          })(n, I(), t);
      }
      function kb(e, t) {
        return e.queries.getByIndex(t);
      }
      const Dp = new U("Application Initializer");
      let Cp = (() => {
          var e;
          class t {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, i) => {
                  (this.resolve = n), (this.reject = i);
                })),
                (this.appInits = V(Dp, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const o of this.appInits) {
                const s = o();
                if (ga(s)) n.push(s);
                else if (j0(s)) {
                  const a = new Promise((l, c) => {
                    s.subscribe({ complete: l, error: c });
                  });
                  n.push(a);
                }
              }
              const i = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  i();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === n.length && i(),
                (this.initialized = !0);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Kb = (() => {
          var e;
          class t {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })();
      const Un = new U("LocaleId", {
        providedIn: "root",
        factory: () =>
          V(Un, ie.Optional | ie.SkipSelf) ||
          (function Uk() {
            return (typeof $localize < "u" && $localize.locale) || zo;
          })(),
      });
      let ou = (() => {
        var e;
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new St(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class Gk {
        constructor(t, r) {
          (this.ngModuleFactory = t), (this.componentFactories = r);
        }
      }
      let Xb = (() => {
        var e;
        class t {
          compileModuleSync(n) {
            return new ip(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const i = this.compileModuleSync(n),
              s = Er(dn(n).declarations).reduce((a, l) => {
                const c = ce(l);
                return c && a.push(new ca(c)), a;
              }, []);
            return new Gk(i, s);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function rD(...e) {}
      class de {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: r = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new z(!1)),
            (this.onMicrotaskEmpty = new z(!1)),
            (this.onStable = new z(!1)),
            (this.onError = new z(!1)),
            typeof Zone > "u")
          )
            throw new N(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !n && r),
            (i.shouldCoalesceRunChangeDetection = n),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function uF() {
              const e = "function" == typeof Pe.requestAnimationFrame;
              let t = Pe[e ? "requestAnimationFrame" : "setTimeout"],
                r = Pe[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && r) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const i = r[Zone.__symbol__("OriginalDelegate")];
                i && (r = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: r,
              };
            })().nativeRequestAnimationFrame),
            (function hF(e) {
              const t = () => {
                !(function fF(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Pe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ip(e),
                                (e.isCheckStableRunning = !0),
                                Sp(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ip(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (r, n, i, o, s, a) => {
                  try {
                    return iD(e), r.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      oD(e);
                  }
                },
                onInvoke: (r, n, i, o, s, a, l) => {
                  try {
                    return iD(e), r.invoke(i, o, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), oD(e);
                  }
                },
                onHasTask: (r, n, i, o) => {
                  r.hasTask(i, o),
                    n === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          Ip(e),
                          Sp(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (r, n, i, o) => (
                  r.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!de.isInAngularZone()) throw new N(909, !1);
        }
        static assertNotInAngularZone() {
          if (de.isInAngularZone()) throw new N(909, !1);
        }
        run(t, r, n) {
          return this._inner.run(t, r, n);
        }
        runTask(t, r, n, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, dF, rD, rD);
          try {
            return o.runTask(s, r, n);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, r, n) {
          return this._inner.runGuarded(t, r, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const dF = {};
      function Sp(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ip(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function iD(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function oD(e) {
        e._nesting--, Sp(e);
      }
      class pF {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new z()),
            (this.onMicrotaskEmpty = new z()),
            (this.onStable = new z()),
            (this.onError = new z());
        }
        run(t, r, n) {
          return t.apply(r, n);
        }
        runGuarded(t, r, n) {
          return t.apply(r, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, r, n, i) {
          return t.apply(r, n);
        }
      }
      const sD = new U("", { providedIn: "root", factory: aD });
      function aD() {
        const e = V(de);
        let t = !0;
        return (function nm(...e) {
          const t = Ms(e),
            r = (function sT(e, t) {
              return "number" == typeof zd(e) ? e.pop() : t;
            })(e, 1 / 0),
            n = e;
          return n.length ? (1 === n.length ? ut(n[0]) : no(r)(ft(n, t))) : Dn;
        })(
          new Ie((i) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                i.next(t), i.complete();
              });
          }),
          new Ie((i) => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                de.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), i.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              de.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    i.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(rm())
        );
      }
      const lD = new U(""),
        au = new U("");
      let Op,
        Tp = (() => {
          var e;
          class t {
            constructor(n, i, o) {
              (this._ngZone = n),
                (this.registry = i),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Op ||
                  ((function gF(e) {
                    Op = e;
                  })(o),
                  o.addToWindow(i)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      de.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(n) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, i, o) {
              let s = -1;
              i &&
                i > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (a) => a.timeoutId !== s
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, i)),
                this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: o });
            }
            whenStable(n, i, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, i, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, i, o) {
              return [];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(de), F(Mp), F(au));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Mp = (() => {
          var e;
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, i) {
              this._applications.set(n, i);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, i = !0) {
              return Op?.findTestabilityInTree(this, n, i) ?? null;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        zr = null;
      const cD = new U("AllowMultipleToken"),
        Np = new U("PlatformDestroyListeners"),
        Ap = new U("appBootstrapListener");
      class dD {
        constructor(t, r) {
          (this.name = t), (this.token = r);
        }
      }
      function hD(e, t, r = []) {
        const n = `Platform: ${t}`,
          i = new U(n);
        return (o = []) => {
          let s = Rp();
          if (!s || s.injector.get(cD, !1)) {
            const a = [...r, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function vF(e) {
                  if (zr && !zr.get(cD, !1)) throw new N(400, !1);
                  (function uD() {
                    !(function iM(e) {
                      Pm = e;
                    })(() => {
                      throw new N(600, !1);
                    });
                  })(),
                    (zr = e);
                  const t = e.get(gD);
                  (function fD(e) {
                    e.get(wy, null)?.forEach((r) => r());
                  })(e);
                })(
                  (function pD(e = [], t) {
                    return Nt.create({
                      name: t,
                      providers: [
                        { provide: ah, useValue: "platform" },
                        { provide: Np, useValue: new Set([() => (zr = null)]) },
                        ...e,
                      ],
                    });
                  })(a, n)
                );
          }
          return (function bF(e) {
            const t = Rp();
            if (!t) throw new N(401, !1);
            return t;
          })();
        };
      }
      function Rp() {
        return zr?.get(gD) ?? null;
      }
      let gD = (() => {
        var e;
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, i) {
            const o = (function DF(e = "zone.js", t) {
              return "noop" === e ? new pF() : "zone.js" === e ? new de(t) : e;
            })(
              i?.ngZone,
              (function _D(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: i?.ngZoneEventCoalescing,
                runCoalescing: i?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const s = (function NP(e, t, r) {
                  return new rp(e, t, r);
                })(
                  n.moduleType,
                  this.injector,
                  (function DD(e) {
                    return [
                      { provide: de, useFactory: e },
                      {
                        provide: ea,
                        multi: !0,
                        useFactory: () => {
                          const t = V(wF, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: bD, useFactory: CF },
                      { provide: sD, useFactory: aD },
                    ];
                  })(() => o)
                ),
                a = s.injector.get(Di, null);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      a.handleError(c);
                    },
                  });
                  s.onDestroy(() => {
                    lu(this._modules, s), l.unsubscribe();
                  });
                }),
                (function mD(e, t, r) {
                  try {
                    const n = r();
                    return ga(n)
                      ? n.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : n;
                  } catch (n) {
                    throw (t.runOutsideAngular(() => e.handleError(n)), n);
                  }
                })(a, o, () => {
                  const l = s.injector.get(Cp);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function F1(e) {
                          wn(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (k1 = e.toLowerCase().replace(/_/g, "-"));
                        })(s.injector.get(Un, zo) || zo),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, i = []) {
            const o = vD({}, i);
            return (function _F(e, t, r) {
              const n = new ip(r);
              return Promise.resolve(n);
            })(0, 0, n).then((s) => this.bootstrapModuleFactory(s, o));
          }
          _moduleDoBootstrap(n) {
            const i = n.injector.get(qr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => i.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new N(-403, !1);
              n.instance.ngDoBootstrap(i);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new N(404, !1);
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i());
            const n = this._injector.get(Np, null);
            n && (n.forEach((i) => i()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(Nt));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function vD(e, t) {
        return Array.isArray(t) ? t.reduce(vD, e) : { ...e, ...t };
      }
      let qr = (() => {
        var e;
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = V(bD)),
              (this.zoneIsStable = V(sD)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = V(ou).hasPendingTasks.pipe(
                Cn((n) => (n ? q(!1) : this.zoneIsStable)),
                (function im(e, t = xn) {
                  return (
                    (e = e ?? hT),
                    Qe((r, n) => {
                      let i,
                        o = !0;
                      r.subscribe(
                        xe(n, (s) => {
                          const a = t(s);
                          (o || !e(i, a)) && ((o = !1), (i = a), n.next(s));
                        })
                      );
                    })
                  );
                })(),
                rm()
              )),
              (this._injector = V(Ht));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, i) {
            const o = n instanceof Oy;
            if (!this._injector.get(Cp).done)
              throw (
                (!o &&
                  (function io(e) {
                    const t = ce(e) || It(e) || Vt(e);
                    return null !== t && t.standalone;
                  })(n),
                new N(405, !1))
              );
            let a;
            (a = o ? n : this._injector.get(Fc).resolveComponentFactory(n)),
              this.componentTypes.push(a.componentType);
            const l = (function mF(e) {
                return e.isBoundToModule;
              })(a)
                ? void 0
                : this._injector.get(Ii),
              u = a.create(Nt.NULL, [], i || a.selector, l),
              d = u.location.nativeElement,
              f = u.injector.get(lD, null);
            return (
              f?.registerApplication(d),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  lu(this.components, u),
                  f?.unregisterApplication(d);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new N(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const i = n;
            this._views.push(i), i.attachToAppRef(this);
          }
          detachView(n) {
            const i = n;
            lu(this._views, i), i.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const i = this._injector.get(Ap, []);
            i.push(...this._bootstrapListeners), i.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => lu(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new N(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function lu(e, t) {
        const r = e.indexOf(t);
        r > -1 && e.splice(r, 1);
      }
      const bD = new U("", {
        providedIn: "root",
        factory: () => V(Di).handleError.bind(void 0),
      });
      function CF() {
        const e = V(de),
          t = V(Di);
        return (r) => e.runOutsideAngular(() => t.handleError(r));
      }
      let wF = (() => {
        var e;
        class t {
          constructor() {
            (this.zone = V(de)), (this.applicationRef = V(qr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      let Hn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = SF), t;
      })();
      function SF(e) {
        return (function IF(e, t, r) {
          if (hi(e) && !r) {
            const n = fn(e.index, t);
            return new la(n, n);
          }
          return 47 & e.type ? new la(t[tt], t) : null;
        })(Ot(), I(), 16 == (16 & e));
      }
      class SD {
        constructor() {}
        supports(t) {
          return Gc(t);
        }
        create(t) {
          return new RF(t);
        }
      }
      const AF = (e, t) => t;
      class RF {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || AF);
        }
        forEachItem(t) {
          let r;
          for (r = this._itHead; null !== r; r = r._next) t(r);
        }
        forEachOperation(t) {
          let r = this._itHead,
            n = this._removalsHead,
            i = 0,
            o = null;
          for (; r || n; ) {
            const s = !n || (r && r.currentIndex < TD(n, i, o)) ? r : n,
              a = TD(s, i, o),
              l = s.currentIndex;
            if (s === n) i--, (n = n._nextRemoved);
            else if (((r = r._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const c = a - i,
                u = l - i;
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  u <= p && p < c && (o[f] = h + 1);
                }
                o[s.previousIndex] = u - c;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let r;
          for (r = this._previousItHead; null !== r; r = r._nextPrevious) t(r);
        }
        forEachAddedItem(t) {
          let r;
          for (r = this._additionsHead; null !== r; r = r._nextAdded) t(r);
        }
        forEachMovedItem(t) {
          let r;
          for (r = this._movesHead; null !== r; r = r._nextMoved) t(r);
        }
        forEachRemovedItem(t) {
          let r;
          for (r = this._removalsHead; null !== r; r = r._nextRemoved) t(r);
        }
        forEachIdentityChange(t) {
          let r;
          for (
            r = this._identityChangesHead;
            null !== r;
            r = r._nextIdentityChange
          )
            t(r);
        }
        diff(t) {
          if ((null == t && (t = []), !Gc(t))) throw new N(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            r = this._itHead,
            n = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== r && Object.is(r.trackById, s)
                  ? (n && (r = this._verifyReinsertion(r, o, s, a)),
                    Object.is(r.item, o) || this._addIdentityChange(r, o))
                  : ((r = this._mismatch(r, o, s, a)), (n = !0)),
                (r = r._next);
          } else
            (i = 0),
              (function fR(e, t) {
                if (Array.isArray(e))
                  for (let r = 0; r < e.length; r++) t(e[r]);
                else {
                  const r = e[Symbol.iterator]();
                  let n;
                  for (; !(n = r.next()).done; ) t(n.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== r && Object.is(r.trackById, s)
                    ? (n && (r = this._verifyReinsertion(r, a, s, i)),
                      Object.is(r.item, a) || this._addIdentityChange(r, a))
                    : ((r = this._mismatch(r, a, s, i)), (n = !0)),
                  (r = r._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, r, n, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(n, i))
              ? (Object.is(t.item, r) || this._addIdentityChange(t, r),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new xF(r, n), o, i)),
            t
          );
        }
        _verifyReinsertion(t, r, n, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const r = t._next;
            this._addToRemovals(this._unlink(t)), (t = r);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, r, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, r, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, r, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, r, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, r, n) {
          return (
            this._insertAfter(t, r, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, r, n) {
          const i = null === r ? this._itHead : r._next;
          return (
            (t._next = i),
            (t._prev = r),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === r ? (this._itHead = t) : (r._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ID()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const r = t._prev,
            n = t._next;
          return (
            null === r ? (this._itHead = n) : (r._next = n),
            null === n ? (this._itTail = r) : (n._prev = r),
            t
          );
        }
        _addToMoves(t, r) {
          return (
            t.previousIndex === r ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ID()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, r) {
          return (
            (t.item = r),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class xF {
        constructor(t, r) {
          (this.item = t),
            (this.trackById = r),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class PF {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, r) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === r || r <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const r = t._prevDup,
            n = t._nextDup;
          return (
            null === r ? (this._head = n) : (r._nextDup = n),
            null === n ? (this._tail = r) : (n._prevDup = r),
            null === this._head
          );
        }
      }
      class ID {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const r = t.trackById;
          let n = this.map.get(r);
          n || ((n = new PF()), this.map.set(r, n)), n.add(t);
        }
        get(t, r) {
          const i = this.map.get(t);
          return i ? i.get(t, r) : null;
        }
        remove(t) {
          const r = t.trackById;
          return this.map.get(r).remove(t) && this.map.delete(r), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function TD(e, t, r) {
        const n = e.previousIndex;
        if (null === n) return n;
        let i = 0;
        return r && n < r.length && (i = r[n]), n + t + i;
      }
      function OD() {
        return new du([new SD()]);
      }
      let du = (() => {
        var e;
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, i) {
            if (null != i) {
              const o = i.factories.slice();
              n = n.concat(o);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (i) => t.create(n, i || OD()),
              deps: [[t, new uc(), new cc()]],
            };
          }
          find(n) {
            const i = this.factories.find((o) => o.supports(n));
            if (null != i) return i;
            throw new N(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = P({ token: e, providedIn: "root", factory: OD })), t
        );
      })();
      const BF = hD(null, "core", []);
      let jF = (() => {
        var e;
        class t {
          constructor(n) {}
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(qr));
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({})),
          t
        );
      })();
      function Yo(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      function Vp(e, t) {
        const r = ce(e),
          n = t.elementInjector || Mc();
        return new ca(r).create(
          n,
          t.projectableNodes,
          t.hostElement,
          t.environmentInjector
        );
      }
      let Bp = null;
      function Wr() {
        return Bp;
      }
      class e2 {}
      const at = new U("DocumentToken");
      let jp = (() => {
        var e;
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return V(n2);
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      const t2 = new U("Location Initialized");
      let n2 = (() => {
        var e;
        class t extends jp {
          constructor() {
            super(),
              (this._doc = V(at)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Wr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const i = Wr().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("popstate", n, !1),
              () => i.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const i = Wr().getGlobalEventTarget(this._doc, "window");
            return (
              i.addEventListener("hashchange", n, !1),
              () => i.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, i, o) {
            this._history.pushState(n, i, o);
          }
          replaceState(n, i, o) {
            this._history.replaceState(n, i, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      function Up(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let r = 0;
        return (
          e.endsWith("/") && r++,
          t.startsWith("/") && r++,
          2 == r ? e + t.substring(1) : 1 == r ? e + t : e + "/" + t
        );
      }
      function VD(e) {
        const t = e.match(/#|\?|$/),
          r = (t && t.index) || e.length;
        return e.slice(0, r - ("/" === e[r - 1] ? 1 : 0)) + e.slice(r);
      }
      function Ir(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Oi = (() => {
        var e;
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return V(jD);
            },
            providedIn: "root",
          })),
          t
        );
      })();
      const BD = new U("appBaseHref");
      let jD = (() => {
          var e;
          class t extends Oi {
            constructor(n, i) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  i ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  V(at).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Up(this._baseHref, n);
            }
            path(n = !1) {
              const i =
                  this._platformLocation.pathname +
                  Ir(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${i}${o}` : i;
            }
            pushState(n, i, o, s) {
              const a = this.prepareExternalUrl(o + Ir(s));
              this._platformLocation.pushState(n, i, a);
            }
            replaceState(n, i, o, s) {
              const a = this.prepareExternalUrl(o + Ir(s));
              this._platformLocation.replaceState(n, i, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(jp), F(BD, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        r2 = (() => {
          var e;
          class t extends Oi {
            constructor(n, i) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != i && (this._baseHref = i);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let i = this._platformLocation.hash;
              return null == i && (i = "#"), i.length > 0 ? i.substring(1) : i;
            }
            prepareExternalUrl(n) {
              const i = Up(this._baseHref, n);
              return i.length > 0 ? "#" + i : i;
            }
            pushState(n, i, o, s) {
              let a = this.prepareExternalUrl(o + Ir(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.pushState(n, i, a);
            }
            replaceState(n, i, o, s) {
              let a = this.prepareExternalUrl(o + Ir(s));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, i, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(jp), F(BD, 8));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Hp = (() => {
          var e;
          class t {
            constructor(n) {
              (this._subject = new z()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const i = this._locationStrategy.getBaseHref();
              (this._basePath = (function s2(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, r] = e.split(/\/\/[^\/]+/);
                  return r;
                }
                return e;
              })(VD(UD(i)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, i = "") {
              return this.path() == this.normalize(n + Ir(i));
            }
            normalize(n) {
              return t.stripTrailingSlash(
                (function o2(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const r = t.substring(e.length);
                  return "" === r || ["/", ";", "?", "#"].includes(r[0])
                    ? r
                    : t;
                })(this._basePath, UD(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, i = "", o = null) {
              this._locationStrategy.pushState(o, "", n, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Ir(i)),
                  o
                );
            }
            replaceState(n, i = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, i),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Ir(i)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((i) => {
                    this._notifyUrlChangeListeners(i.url, i.state);
                  })),
                () => {
                  const i = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(i, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", i) {
              this._urlChangeListeners.forEach((o) => o(n, i));
            }
            subscribe(n, i, o) {
              return this._subject.subscribe({
                next: n,
                error: i,
                complete: o,
              });
            }
          }
          return (
            ((e = t).normalizeQueryParams = Ir),
            (e.joinWithSlash = Up),
            (e.stripTrailingSlash = VD),
            (e.ɵfac = function (n) {
              return new (n || e)(F(Oi));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return (function i2() {
                  return new Hp(F(Oi));
                })();
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function UD(e) {
        return e.replace(/\/index.html$/, "");
      }
      var hu = (function (e) {
          return (
            (e[(e.Decimal = 0)] = "Decimal"),
            (e[(e.Percent = 1)] = "Percent"),
            (e[(e.Currency = 2)] = "Currency"),
            (e[(e.Scientific = 3)] = "Scientific"),
            e
          );
        })(hu || {}),
        rt = (function (e) {
          return (
            (e[(e.Decimal = 0)] = "Decimal"),
            (e[(e.Group = 1)] = "Group"),
            (e[(e.List = 2)] = "List"),
            (e[(e.PercentSign = 3)] = "PercentSign"),
            (e[(e.PlusSign = 4)] = "PlusSign"),
            (e[(e.MinusSign = 5)] = "MinusSign"),
            (e[(e.Exponential = 6)] = "Exponential"),
            (e[(e.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
            (e[(e.PerMille = 8)] = "PerMille"),
            (e[(e.Infinity = 9)] = "Infinity"),
            (e[(e.NaN = 10)] = "NaN"),
            (e[(e.TimeSeparator = 11)] = "TimeSeparator"),
            (e[(e.CurrencyDecimal = 12)] = "CurrencyDecimal"),
            (e[(e.CurrencyGroup = 13)] = "CurrencyGroup"),
            e
          );
        })(rt || {});
      function On(e, t) {
        const r = Gt(e),
          n = r[Ve.NumberSymbols][t];
        if (typeof n > "u") {
          if (t === rt.CurrencyDecimal) return r[Ve.NumberSymbols][rt.Decimal];
          if (t === rt.CurrencyGroup) return r[Ve.NumberSymbols][rt.Group];
        }
        return n;
      }
      const N2 = /^(\d+)?\.((\d+)(-(\d+))?)?$/;
      function Qp(e) {
        const t = parseInt(e);
        if (isNaN(t))
          throw new Error("Invalid integer literal when parsing " + e);
        return t;
      }
      function KD(e, t) {
        t = encodeURIComponent(t);
        for (const r of e.split(";")) {
          const n = r.indexOf("="),
            [i, o] = -1 == n ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
          if (i.trim() === t) return decodeURIComponent(o);
        }
        return null;
      }
      class $2 {
        constructor(t, r, n, i) {
          (this.$implicit = t),
            (this.ngForOf = r),
            (this.index = n),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let cr = (() => {
        var e;
        class t {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, i, o) {
            (this._viewContainer = n),
              (this._template = i),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const i = this._viewContainer;
            n.forEachOperation((o, s, a) => {
              if (null == o.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new $2(o.item, this._ngForOf, -1, -1),
                  null === a ? void 0 : a
                );
              else if (null == a) i.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const l = i.get(s);
                i.move(l, a), tC(l, o);
              }
            });
            for (let o = 0, s = i.length; o < s; o++) {
              const l = i.get(o).context;
              (l.index = o), (l.count = s), (l.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              tC(i.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, i) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(Mn), g(Ye), g(du));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          t
        );
      })();
      function tC(e, t) {
        e.context.$implicit = t.item;
      }
      let nn = (() => {
        var e;
        class t {
          constructor(n, i) {
            (this._viewContainer = n),
              (this._context = new G2()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = i);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            nC("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            nC("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, i) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(Mn), g(Ye));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          t
        );
      })();
      class G2 {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function nC(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ht(t)}'.`
          );
      }
      let oC = (() => {
        var e;
        class t {
          constructor(n) {
            this._locale = n;
          }
          transform(n, i, o) {
            if (
              !(function ng(e) {
                return !(null == e || "" === e || e != e);
              })(n)
            )
              return null;
            o = o || this._locale;
            try {
              return (function F2(e, t, r) {
                return (function Zp(e, t, r, n, i, o, s = !1) {
                  let a = "",
                    l = !1;
                  if (isFinite(e)) {
                    let c = (function V2(e) {
                      let n,
                        i,
                        o,
                        s,
                        a,
                        t = Math.abs(e) + "",
                        r = 0;
                      for (
                        (i = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
                          (o = t.search(/e/i)) > 0
                            ? (i < 0 && (i = o),
                              (i += +t.slice(o + 1)),
                              (t = t.substring(0, o)))
                            : i < 0 && (i = t.length),
                          o = 0;
                        "0" === t.charAt(o);
                        o++
                      );
                      if (o === (a = t.length)) (n = [0]), (i = 1);
                      else {
                        for (a--; "0" === t.charAt(a); ) a--;
                        for (i -= o, n = [], s = 0; o <= a; o++, s++)
                          n[s] = Number(t.charAt(o));
                      }
                      return (
                        i > 22 && ((n = n.splice(0, 21)), (r = i - 1), (i = 1)),
                        { digits: n, exponent: r, integerLen: i }
                      );
                    })(e);
                    s &&
                      (c = (function L2(e) {
                        if (0 === e.digits[0]) return e;
                        const t = e.digits.length - e.integerLen;
                        return (
                          e.exponent
                            ? (e.exponent += 2)
                            : (0 === t
                                ? e.digits.push(0, 0)
                                : 1 === t && e.digits.push(0),
                              (e.integerLen += 2)),
                          e
                        );
                      })(c));
                    let u = t.minInt,
                      d = t.minFrac,
                      f = t.maxFrac;
                    if (o) {
                      const v = o.match(N2);
                      if (null === v)
                        throw new Error(`${o} is not a valid digit info`);
                      const A = v[1],
                        O = v[3],
                        B = v[5];
                      null != A && (u = Qp(A)),
                        null != O && (d = Qp(O)),
                        null != B ? (f = Qp(B)) : null != O && d > f && (f = d);
                    }
                    !(function B2(e, t, r) {
                      if (t > r)
                        throw new Error(
                          `The minimum number of digits after fraction (${t}) is higher than the maximum (${r}).`
                        );
                      let n = e.digits,
                        i = n.length - e.integerLen;
                      const o = Math.min(Math.max(t, i), r);
                      let s = o + e.integerLen,
                        a = n[s];
                      if (s > 0) {
                        n.splice(Math.max(e.integerLen, s));
                        for (let d = s; d < n.length; d++) n[d] = 0;
                      } else {
                        (i = Math.max(0, i)),
                          (e.integerLen = 1),
                          (n.length = Math.max(1, (s = o + 1))),
                          (n[0] = 0);
                        for (let d = 1; d < s; d++) n[d] = 0;
                      }
                      if (a >= 5)
                        if (s - 1 < 0) {
                          for (let d = 0; d > s; d--)
                            n.unshift(0), e.integerLen++;
                          n.unshift(1), e.integerLen++;
                        } else n[s - 1]++;
                      for (; i < Math.max(0, o); i++) n.push(0);
                      let l = 0 !== o;
                      const c = t + e.integerLen,
                        u = n.reduceRight(function (d, f, h, p) {
                          return (
                            (p[h] = (f += d) < 10 ? f : f - 10),
                            l && (0 === p[h] && h >= c ? p.pop() : (l = !1)),
                            f >= 10 ? 1 : 0
                          );
                        }, 0);
                      u && (n.unshift(u), e.integerLen++);
                    })(c, d, f);
                    let h = c.digits,
                      p = c.integerLen;
                    const _ = c.exponent;
                    let m = [];
                    for (l = h.every((v) => !v); p < u; p++) h.unshift(0);
                    for (; p < 0; p++) h.unshift(0);
                    p > 0 ? (m = h.splice(p, h.length)) : ((m = h), (h = [0]));
                    const D = [];
                    for (
                      h.length >= t.lgSize &&
                      D.unshift(h.splice(-t.lgSize, h.length).join(""));
                      h.length > t.gSize;

                    )
                      D.unshift(h.splice(-t.gSize, h.length).join(""));
                    h.length && D.unshift(h.join("")),
                      (a = D.join(On(r, n))),
                      m.length && (a += On(r, i) + m.join("")),
                      _ && (a += On(r, rt.Exponential) + "+" + _);
                  } else a = On(r, rt.Infinity);
                  return (
                    (a =
                      e < 0 && !l
                        ? t.negPre + a + t.negSuf
                        : t.posPre + a + t.posSuf),
                    a
                  );
                })(
                  e,
                  (function Jp(e, t = "-") {
                    const r = {
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 0,
                        posPre: "",
                        posSuf: "",
                        negPre: "",
                        negSuf: "",
                        gSize: 0,
                        lgSize: 0,
                      },
                      n = e.split(";"),
                      i = n[0],
                      o = n[1],
                      s =
                        -1 !== i.indexOf(".")
                          ? i.split(".")
                          : [
                              i.substring(0, i.lastIndexOf("0") + 1),
                              i.substring(i.lastIndexOf("0") + 1),
                            ],
                      a = s[0],
                      l = s[1] || "";
                    r.posPre = a.substring(0, a.indexOf("#"));
                    for (let u = 0; u < l.length; u++) {
                      const d = l.charAt(u);
                      "0" === d
                        ? (r.minFrac = r.maxFrac = u + 1)
                        : "#" === d
                        ? (r.maxFrac = u + 1)
                        : (r.posSuf += d);
                    }
                    const c = a.split(",");
                    if (
                      ((r.gSize = c[1] ? c[1].length : 0),
                      (r.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
                      o)
                    ) {
                      const u = i.length - r.posPre.length - r.posSuf.length,
                        d = o.indexOf("#");
                      (r.negPre = o.substring(0, d).replace(/'/g, "")),
                        (r.negSuf = o.slice(d + u).replace(/'/g, ""));
                    } else (r.negPre = t + r.posPre), (r.negSuf = r.posSuf);
                    return r;
                  })(
                    (function Gp(e, t) {
                      return Gt(e)[Ve.NumberFormats][t];
                    })(t, hu.Decimal),
                    On(t, rt.MinusSign)
                  ),
                  t,
                  rt.Group,
                  rt.Decimal,
                  r
                );
              })(
                (function rg(e) {
                  if ("string" == typeof e && !isNaN(Number(e) - parseFloat(e)))
                    return Number(e);
                  if ("number" != typeof e)
                    throw new Error(`${e} is not a number`);
                  return e;
                })(n),
                o,
                i
              );
            } catch (s) {
              throw (function Gn(e, t) {
                return new N(2100, !1);
              })();
            }
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(Un, 16));
          }),
          (e.ɵpipe = Zt({ name: "number", type: e, pure: !0, standalone: !0 })),
          t
        );
      })();
      let _L = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({})),
          t
        );
      })();
      function aC(e) {
        return "server" === e;
      }
      let bL = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = P({
            token: e,
            providedIn: "root",
            factory: () => new DL(F(at), window),
          })),
          t
        );
      })();
      class DL {
        constructor(t, r) {
          (this.document = t), (this.window = r), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const r = (function CL(e, t) {
            const r = e.getElementById(t) || e.getElementsByName(t)[0];
            if (r) return r;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const n = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = n.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = n.nextNode();
              }
            }
            return null;
          })(this.document, t);
          r && (this.scrollToElement(r), r.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const r = t.getBoundingClientRect(),
            n = r.left + this.window.pageXOffset,
            i = r.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(n - o[0], i - o[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class lC {}
      class zL extends e2 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class sg extends zL {
        static makeCurrent() {
          !(function XF(e) {
            Bp || (Bp = e);
          })(new sg());
        }
        onAndCancel(t, r, n) {
          return (
            t.addEventListener(r, n),
            () => {
              t.removeEventListener(r, n);
            }
          );
        }
        dispatchEvent(t, r) {
          t.dispatchEvent(r);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, r) {
          return (r = r || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, r) {
          return "window" === r
            ? window
            : "document" === r
            ? t
            : "body" === r
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const r = (function qL() {
            return (
              (Pa = Pa || document.querySelector("base")),
              Pa ? Pa.getAttribute("href") : null
            );
          })();
          return null == r
            ? null
            : (function WL(e) {
                (Su = Su || document.createElement("a")),
                  Su.setAttribute("href", e);
                const t = Su.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(r);
        }
        resetBaseElement() {
          Pa = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return KD(document.cookie, t);
        }
      }
      let Su,
        Pa = null,
        ZL = (() => {
          var e;
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      const ag = new U("EventManagerPlugins");
      let hC = (() => {
        var e;
        class t {
          constructor(n, i) {
            (this._zone = i),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, i, o) {
            return this._findPluginFor(i).addEventListener(n, i, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let i = this._eventNameToPlugin.get(n);
            if (i) return i;
            if (((i = this._plugins.find((s) => s.supports(n))), !i))
              throw new N(5101, !1);
            return this._eventNameToPlugin.set(n, i), i;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(ag), F(de));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class pC {
        constructor(t) {
          this._doc = t;
        }
      }
      const lg = "ng-app-id";
      let gC = (() => {
        var e;
        class t {
          constructor(n, i, o, s = {}) {
            (this.doc = n),
              (this.appId = i),
              (this.nonce = o),
              (this.platformId = s),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = aC(s)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const i of n)
              1 === this.changeUsageCount(i, 1) && this.onStyleAdded(i);
          }
          removeStyles(n) {
            for (const i of n)
              this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((i) => i.remove()), n.clear());
            for (const i of this.getAllStyles()) this.onStyleRemoved(i);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const i of this.getAllStyles()) this.addStyleToHost(n, i);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const i of this.hostNodes) this.addStyleToHost(i, n);
          }
          onStyleRemoved(n) {
            const i = this.styleRef;
            i.get(n)?.elements?.forEach((o) => o.remove()), i.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${lg}="${this.appId}"]`
            );
            if (n?.length) {
              const i = new Map();
              return (
                n.forEach((o) => {
                  null != o.textContent && i.set(o.textContent, o);
                }),
                i
              );
            }
            return null;
          }
          changeUsageCount(n, i) {
            const o = this.styleRef;
            if (o.has(n)) {
              const s = o.get(n);
              return (s.usage += i), s.usage;
            }
            return o.set(n, { usage: i, elements: [] }), i;
          }
          getStyleElement(n, i) {
            const o = this.styleNodesInDOM,
              s = o?.get(i);
            if (s?.parentNode === n)
              return o.delete(i), s.removeAttribute(lg), s;
            {
              const a = this.doc.createElement("style");
              return (
                this.nonce && a.setAttribute("nonce", this.nonce),
                (a.textContent = i),
                this.platformIsServer && a.setAttribute(lg, this.appId),
                a
              );
            }
          }
          addStyleToHost(n, i) {
            const o = this.getStyleElement(n, i);
            n.appendChild(o);
            const s = this.styleRef,
              a = s.get(i)?.elements;
            a ? a.push(o) : s.set(i, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(at), F(Nc), F(Ey, 8), F(bi));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const cg = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        ug = /%COMP%/g,
        XL = new U("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function mC(e, t) {
        return t.map((r) => r.replace(ug, e));
      }
      let vC = (() => {
        var e;
        class t {
          constructor(n, i, o, s, a, l, c, u = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = i),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = s),
              (this.doc = a),
              (this.platformId = l),
              (this.ngZone = c),
              (this.nonce = u),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = aC(l)),
              (this.defaultRenderer = new dg(n, a, c, this.platformIsServer));
          }
          createRenderer(n, i) {
            if (!n || !i) return this.defaultRenderer;
            this.platformIsServer &&
              i.encapsulation === Pn.ShadowDom &&
              (i = { ...i, encapsulation: Pn.Emulated });
            const o = this.getOrCreateRenderer(n, i);
            return (
              o instanceof bC
                ? o.applyToHost(n)
                : o instanceof fg && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, i) {
            const o = this.rendererByCompId;
            let s = o.get(i.id);
            if (!s) {
              const a = this.doc,
                l = this.ngZone,
                c = this.eventManager,
                u = this.sharedStylesHost,
                d = this.removeStylesOnCompDestroy,
                f = this.platformIsServer;
              switch (i.encapsulation) {
                case Pn.Emulated:
                  s = new bC(c, u, i, this.appId, d, a, l, f);
                  break;
                case Pn.ShadowDom:
                  return new rV(c, u, n, i, a, l, this.nonce, f);
                default:
                  s = new fg(c, u, i, d, a, l, f);
              }
              o.set(i.id, s);
            }
            return s;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(
              F(hC),
              F(gC),
              F(Nc),
              F(XL),
              F(at),
              F(bi),
              F(de),
              F(Ey)
            );
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class dg {
        constructor(t, r, n, i) {
          (this.eventManager = t),
            (this.doc = r),
            (this.ngZone = n),
            (this.platformIsServer = i),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, r) {
          return r
            ? this.doc.createElementNS(cg[r] || r, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, r) {
          (yC(t) ? t.content : t).appendChild(r);
        }
        insertBefore(t, r, n) {
          t && (yC(t) ? t.content : t).insertBefore(r, n);
        }
        removeChild(t, r) {
          t && t.removeChild(r);
        }
        selectRootElement(t, r) {
          let n = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!n) throw new N(-5104, !1);
          return r || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, r, n, i) {
          if (i) {
            r = i + ":" + r;
            const o = cg[i];
            o ? t.setAttributeNS(o, r, n) : t.setAttribute(r, n);
          } else t.setAttribute(r, n);
        }
        removeAttribute(t, r, n) {
          if (n) {
            const i = cg[n];
            i ? t.removeAttributeNS(i, r) : t.removeAttribute(`${n}:${r}`);
          } else t.removeAttribute(r);
        }
        addClass(t, r) {
          t.classList.add(r);
        }
        removeClass(t, r) {
          t.classList.remove(r);
        }
        setStyle(t, r, n, i) {
          i & (Hr.DashCase | Hr.Important)
            ? t.style.setProperty(r, n, i & Hr.Important ? "important" : "")
            : (t.style[r] = n);
        }
        removeStyle(t, r, n) {
          n & Hr.DashCase ? t.style.removeProperty(r) : (t.style[r] = "");
        }
        setProperty(t, r, n) {
          t[r] = n;
        }
        setValue(t, r) {
          t.nodeValue = r;
        }
        listen(t, r, n) {
          if (
            "string" == typeof t &&
            !(t = Wr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${r}`);
          return this.eventManager.addEventListener(
            t,
            r,
            this.decoratePreventDefault(n)
          );
        }
        decoratePreventDefault(t) {
          return (r) => {
            if ("__ngUnwrap__" === r) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(r))
                : t(r)) && r.preventDefault();
          };
        }
      }
      function yC(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class rV extends dg {
        constructor(t, r, n, i, o, s, a, l) {
          super(t, o, s, l),
            (this.sharedStylesHost = r),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = mC(i.id, i.styles);
          for (const u of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = u),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, r) {
          return super.appendChild(this.nodeOrShadowRoot(t), r);
        }
        insertBefore(t, r, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), r, n);
        }
        removeChild(t, r) {
          return super.removeChild(this.nodeOrShadowRoot(t), r);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class fg extends dg {
        constructor(t, r, n, i, o, s, a, l) {
          super(t, o, s, a),
            (this.sharedStylesHost = r),
            (this.removeStylesOnCompDestroy = i),
            (this.styles = l ? mC(l, n.styles) : n.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class bC extends fg {
        constructor(t, r, n, i, o, s, a, l) {
          const c = i + "-" + n.id;
          super(t, r, n, o, s, a, l, c),
            (this.contentAttr = (function eV(e) {
              return "_ngcontent-%COMP%".replace(ug, e);
            })(c)),
            (this.hostAttr = (function tV(e) {
              return "_nghost-%COMP%".replace(ug, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, r) {
          const n = super.createElement(t, r);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      let iV = (() => {
        var e;
        class t extends pC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, i, o) {
            return (
              n.addEventListener(i, o, !1),
              () => this.removeEventListener(n, i, o)
            );
          }
          removeEventListener(n, i, o) {
            return n.removeEventListener(i, o);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(at));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const DC = ["alt", "control", "meta", "shift"],
        oV = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        sV = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let aV = (() => {
        var e;
        class t extends pC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, i, o) {
            const s = t.parseEventName(i),
              a = t.eventCallback(s.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Wr().onAndCancel(n, s.domEventName, a));
          }
          static parseEventName(n) {
            const i = n.toLowerCase().split("."),
              o = i.shift();
            if (0 === i.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const s = t._normalizeKey(i.pop());
            let a = "",
              l = i.indexOf("code");
            if (
              (l > -1 && (i.splice(l, 1), (a = "code.")),
              DC.forEach((u) => {
                const d = i.indexOf(u);
                d > -1 && (i.splice(d, 1), (a += u + "."));
              }),
              (a += s),
              0 != i.length || 0 === s.length)
            )
              return null;
            const c = {};
            return (c.domEventName = o), (c.fullKey = a), c;
          }
          static matchEventFullKeyCode(n, i) {
            let o = oV[n.key] || n.key,
              s = "";
            return (
              i.indexOf("code.") > -1 && ((o = n.code), (s = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                DC.forEach((a) => {
                  a !== o && (0, sV[a])(n) && (s += a + ".");
                }),
                (s += o),
                s === i)
            );
          }
          static eventCallback(n, i, o) {
            return (s) => {
              t.matchEventFullKeyCode(s, n) && o.runGuarded(() => i(s));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(at));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const dV = hD(BF, "browser", [
          { provide: bi, useValue: "browser" },
          {
            provide: wy,
            useValue: function lV() {
              sg.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: at,
            useFactory: function uV() {
              return (
                (function iN(e) {
                  Qf = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        fV = new U(""),
        EC = [
          {
            provide: au,
            useClass: class YL {
              addToWindow(t) {
                (Pe.getAngularTestability = (n, i = !0) => {
                  const o = t.findTestabilityInTree(n, i);
                  if (null == o) throw new N(5103, !1);
                  return o;
                }),
                  (Pe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (Pe.getAllAngularRootElements = () => t.getAllRootElements()),
                  Pe.frameworkStabilizers || (Pe.frameworkStabilizers = []),
                  Pe.frameworkStabilizers.push((n) => {
                    const i = Pe.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && n(s);
                    };
                    i.forEach((l) => {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, r, n) {
                return null == r
                  ? null
                  : t.getTestability(r) ??
                      (n
                        ? Wr().isShadowRoot(r)
                          ? this.findTestabilityInTree(t, r.host, !0)
                          : this.findTestabilityInTree(t, r.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: lD, useClass: Tp, deps: [de, Mp, au] },
          { provide: Tp, useClass: Tp, deps: [de, Mp, au] },
        ],
        SC = [
          { provide: ah, useValue: "root" },
          {
            provide: Di,
            useFactory: function cV() {
              return new Di();
            },
            deps: [],
          },
          { provide: ag, useClass: iV, multi: !0, deps: [at, de, bi] },
          { provide: ag, useClass: aV, multi: !0, deps: [at] },
          vC,
          gC,
          hC,
          { provide: bh, useExisting: vC },
          { provide: lC, useClass: ZL, deps: [] },
          [],
        ];
      let hV = (() => {
          var e;
          class t {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: t,
                providers: [{ provide: Nc, useValue: n.appId }],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(fV, 12));
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({ providers: [...SC, ...EC], imports: [_L, jF] })),
            t
          );
        })(),
        IC = (() => {
          var e;
          class t {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(at));
            }),
            (e.ɵprov = P({
              token: e,
              factory: function (n) {
                let i = null;
                return (
                  (i = n
                    ? new n()
                    : (function gV() {
                        return new IC(F(at));
                      })()),
                  i
                );
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function Qo(e, t) {
        return re(t) ? dt(e, t, 1) : dt(e, 1);
      }
      function mt(e, t) {
        return Qe((r, n) => {
          let i = 0;
          r.subscribe(xe(n, (o) => e.call(t, o, i++) && n.next(o)));
        });
      }
      function ka(e) {
        return Qe((t, r) => {
          try {
            t.subscribe(r);
          } finally {
            r.add(e);
          }
        });
      }
      typeof window < "u" && window;
      class Iu {}
      class Tu {}
      class ur {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((r) => {
                        const n = r.indexOf(":");
                        if (n > 0) {
                          const i = r.slice(0, n),
                            o = i.toLowerCase(),
                            s = r.slice(n + 1).trim();
                          this.maybeSetNormalizedName(i, o),
                            this.headers.has(o)
                              ? this.headers.get(o).push(s)
                              : this.headers.set(o, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((r, n) => {
                    this.setHeaderEntries(n, r);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([r, n]) => {
                        this.setHeaderEntries(r, n);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const r = this.headers.get(t.toLowerCase());
          return r && r.length > 0 ? r[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, r) {
          return this.clone({ name: t, value: r, op: "a" });
        }
        set(t, r) {
          return this.clone({ name: t, value: r, op: "s" });
        }
        delete(t, r) {
          return this.clone({ name: t, value: r, op: "d" });
        }
        maybeSetNormalizedName(t, r) {
          this.normalizedNames.has(r) || this.normalizedNames.set(r, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof ur
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((r) => {
              this.headers.set(r, t.headers.get(r)),
                this.normalizedNames.set(r, t.normalizedNames.get(r));
            });
        }
        clone(t) {
          const r = new ur();
          return (
            (r.lazyInit =
              this.lazyInit && this.lazyInit instanceof ur
                ? this.lazyInit
                : this),
            (r.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            r
          );
        }
        applyUpdate(t) {
          const r = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, r);
              const i = ("a" === t.op ? this.headers.get(r) : void 0) || [];
              i.push(...n), this.headers.set(r, i);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(r);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(r), this.normalizedNames.delete(r))
                    : this.headers.set(r, s);
              } else this.headers.delete(r), this.normalizedNames.delete(r);
          }
        }
        setHeaderEntries(t, r) {
          const n = (Array.isArray(r) ? r : [r]).map((o) => o.toString()),
            i = t.toLowerCase();
          this.headers.set(i, n), this.maybeSetNormalizedName(t, i);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((r) =>
              t(this.normalizedNames.get(r), this.headers.get(r))
            );
        }
      }
      class bV {
        encodeKey(t) {
          return NC(t);
        }
        encodeValue(t) {
          return NC(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const CV = /%(\d[a-f0-9])/gi,
        wV = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function NC(e) {
        return encodeURIComponent(e).replace(CV, (t, r) => wV[r] ?? t);
      }
      function Mu(e) {
        return `${e}`;
      }
      class Zr {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new bV()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function DV(e, t) {
              const r = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(i), ""]
                            : [
                                t.decodeKey(i.slice(0, o)),
                                t.decodeValue(i.slice(o + 1)),
                              ],
                        l = r.get(s) || [];
                      l.push(a), r.set(s, l);
                    }),
                r
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((r) => {
                  const n = t.fromObject[r],
                    i = Array.isArray(n) ? n.map(Mu) : [Mu(n)];
                  this.map.set(r, i);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const r = this.map.get(t);
          return r ? r[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, r) {
          return this.clone({ param: t, value: r, op: "a" });
        }
        appendAll(t) {
          const r = [];
          return (
            Object.keys(t).forEach((n) => {
              const i = t[n];
              Array.isArray(i)
                ? i.forEach((o) => {
                    r.push({ param: n, value: o, op: "a" });
                  })
                : r.push({ param: n, value: i, op: "a" });
            }),
            this.clone(r)
          );
        }
        set(t, r) {
          return this.clone({ param: t, value: r, op: "s" });
        }
        delete(t, r) {
          return this.clone({ param: t, value: r, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const r = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((n) => r + "=" + this.encoder.encodeValue(n))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const r = new Zr({ encoder: this.encoder });
          return (
            (r.cloneFrom = this.cloneFrom || this),
            (r.updates = (this.updates || []).concat(t)),
            r
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const r =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    r.push(Mu(t.value)), this.map.set(t.param, r);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let n = this.map.get(t.param) || [];
                      const i = n.indexOf(Mu(t.value));
                      -1 !== i && n.splice(i, 1),
                        n.length > 0
                          ? this.map.set(t.param, n)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class EV {
        constructor() {
          this.map = new Map();
        }
        set(t, r) {
          return this.map.set(t, r), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function AC(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function RC(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function xC(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Fa {
        constructor(t, r, n, i) {
          let o;
          if (
            ((this.url = r),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function SV(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== n ? n : null), (o = i))
              : (o = n),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new ur()),
            this.context || (this.context = new EV()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = r;
            else {
              const a = r.indexOf("?");
              this.urlWithParams =
                r + (-1 === a ? "?" : a < r.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Zr()), (this.urlWithParams = r);
        }
        serializeBody() {
          return null === this.body
            ? null
            : AC(this.body) ||
              RC(this.body) ||
              xC(this.body) ||
              (function IV(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Zr
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || xC(this.body)
            ? null
            : RC(this.body)
            ? this.body.type || null
            : AC(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Zr
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const r = t.method || this.method,
            n = t.url || this.url,
            i = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let l = t.headers || this.headers,
            c = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (l = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                l
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                c
              )),
            new Fa(r, n, o, {
              params: c,
              headers: l,
              context: u,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var Ko = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(Ko || {});
      class pg {
        constructor(t, r = 200, n = "OK") {
          (this.headers = t.headers || new ur()),
            (this.status = void 0 !== t.status ? t.status : r),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class gg extends pg {
        constructor(t = {}) {
          super(t), (this.type = Ko.ResponseHeader);
        }
        clone(t = {}) {
          return new gg({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Xo extends pg {
        constructor(t = {}) {
          super(t),
            (this.type = Ko.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new Xo({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class PC extends pg {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function _g(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let mg = (() => {
        var e;
        class t {
          constructor(n) {
            this.handler = n;
          }
          request(n, i, o = {}) {
            let s;
            if (n instanceof Fa) s = n;
            else {
              let c, u;
              (c = o.headers instanceof ur ? o.headers : new ur(o.headers)),
                o.params &&
                  (u =
                    o.params instanceof Zr
                      ? o.params
                      : new Zr({ fromObject: o.params })),
                (s = new Fa(n, i, void 0 !== o.body ? o.body : null, {
                  headers: c,
                  context: o.context,
                  params: u,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const a = q(s).pipe(Qo((c) => this.handler.handle(c)));
            if (n instanceof Fa || "events" === o.observe) return a;
            const l = a.pipe(mt((c) => c instanceof Xo));
            switch (o.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return l.pipe(
                      se((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return l.pipe(
                      se((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return l.pipe(
                      se((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return l.pipe(se((c) => c.body));
                }
              case "response":
                return l;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(n, i = {}) {
            return this.request("DELETE", n, i);
          }
          get(n, i = {}) {
            return this.request("GET", n, i);
          }
          head(n, i = {}) {
            return this.request("HEAD", n, i);
          }
          jsonp(n, i) {
            return this.request("JSONP", n, {
              params: new Zr().append(i, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, i = {}) {
            return this.request("OPTIONS", n, i);
          }
          patch(n, i, o = {}) {
            return this.request("PATCH", n, _g(o, i));
          }
          post(n, i, o = {}) {
            return this.request("POST", n, _g(o, i));
          }
          put(n, i, o = {}) {
            return this.request("PUT", n, _g(o, i));
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(Iu));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function LC(e, t) {
        return t(e);
      }
      function MV(e, t) {
        return (r, n) => t.intercept(r, { handle: (i) => e(i, n) });
      }
      const NV = new U(""),
        La = new U(""),
        VC = new U("");
      function AV() {
        let e = null;
        return (t, r) => {
          null === e &&
            (e = (V(NV, { optional: !0 }) ?? []).reduceRight(MV, LC));
          const n = V(ou),
            i = n.add();
          return e(t, r).pipe(ka(() => n.remove(i)));
        };
      }
      let BC = (() => {
        var e;
        class t extends Iu {
          constructor(n, i) {
            super(),
              (this.backend = n),
              (this.injector = i),
              (this.chain = null),
              (this.pendingTasks = V(ou));
          }
          handle(n) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(La),
                  ...this.injector.get(VC, []),
                ])
              );
              this.chain = o.reduceRight(
                (s, a) =>
                  (function OV(e, t, r) {
                    return (n, i) => r.runInContext(() => t(n, (o) => e(o, i)));
                  })(s, a, this.injector),
                LC
              );
            }
            const i = this.pendingTasks.add();
            return this.chain(n, (o) => this.backend.handle(o)).pipe(
              ka(() => this.pendingTasks.remove(i))
            );
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(Tu), F(Ht));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const kV = /^\)\]\}',?\n/;
      let UC = (() => {
        var e;
        class t {
          constructor(n) {
            this.xhrFactory = n;
          }
          handle(n) {
            if ("JSONP" === n.method) throw new N(-2800, !1);
            const i = this.xhrFactory;
            return (i.ɵloadImpl ? ft(i.ɵloadImpl()) : q(null)).pipe(
              Cn(
                () =>
                  new Ie((s) => {
                    const a = i.build();
                    if (
                      (a.open(n.method, n.urlWithParams),
                      n.withCredentials && (a.withCredentials = !0),
                      n.headers.forEach((m, D) =>
                        a.setRequestHeader(m, D.join(","))
                      ),
                      n.headers.has("Accept") ||
                        a.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !n.headers.has("Content-Type"))
                    ) {
                      const m = n.detectContentTypeHeader();
                      null !== m && a.setRequestHeader("Content-Type", m);
                    }
                    if (n.responseType) {
                      const m = n.responseType.toLowerCase();
                      a.responseType = "json" !== m ? m : "text";
                    }
                    const l = n.serializeBody();
                    let c = null;
                    const u = () => {
                        if (null !== c) return c;
                        const m = a.statusText || "OK",
                          D = new ur(a.getAllResponseHeaders()),
                          v =
                            (function FV(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(a) || n.url;
                        return (
                          (c = new gg({
                            headers: D,
                            status: a.status,
                            statusText: m,
                            url: v,
                          })),
                          c
                        );
                      },
                      d = () => {
                        let {
                            headers: m,
                            status: D,
                            statusText: v,
                            url: A,
                          } = u(),
                          O = null;
                        204 !== D &&
                          (O =
                            typeof a.response > "u"
                              ? a.responseText
                              : a.response),
                          0 === D && (D = O ? 200 : 0);
                        let B = D >= 200 && D < 300;
                        if ("json" === n.responseType && "string" == typeof O) {
                          const W = O;
                          O = O.replace(kV, "");
                          try {
                            O = "" !== O ? JSON.parse(O) : null;
                          } catch (oe) {
                            (O = W),
                              B && ((B = !1), (O = { error: oe, text: O }));
                          }
                        }
                        B
                          ? (s.next(
                              new Xo({
                                body: O,
                                headers: m,
                                status: D,
                                statusText: v,
                                url: A || void 0,
                              })
                            ),
                            s.complete())
                          : s.error(
                              new PC({
                                error: O,
                                headers: m,
                                status: D,
                                statusText: v,
                                url: A || void 0,
                              })
                            );
                      },
                      f = (m) => {
                        const { url: D } = u(),
                          v = new PC({
                            error: m,
                            status: a.status || 0,
                            statusText: a.statusText || "Unknown Error",
                            url: D || void 0,
                          });
                        s.error(v);
                      };
                    let h = !1;
                    const p = (m) => {
                        h || (s.next(u()), (h = !0));
                        let D = { type: Ko.DownloadProgress, loaded: m.loaded };
                        m.lengthComputable && (D.total = m.total),
                          "text" === n.responseType &&
                            a.responseText &&
                            (D.partialText = a.responseText),
                          s.next(D);
                      },
                      _ = (m) => {
                        let D = { type: Ko.UploadProgress, loaded: m.loaded };
                        m.lengthComputable && (D.total = m.total), s.next(D);
                      };
                    return (
                      a.addEventListener("load", d),
                      a.addEventListener("error", f),
                      a.addEventListener("timeout", f),
                      a.addEventListener("abort", f),
                      n.reportProgress &&
                        (a.addEventListener("progress", p),
                        null !== l &&
                          a.upload &&
                          a.upload.addEventListener("progress", _)),
                      a.send(l),
                      s.next({ type: Ko.Sent }),
                      () => {
                        a.removeEventListener("error", f),
                          a.removeEventListener("abort", f),
                          a.removeEventListener("load", d),
                          a.removeEventListener("timeout", f),
                          n.reportProgress &&
                            (a.removeEventListener("progress", p),
                            null !== l &&
                              a.upload &&
                              a.upload.removeEventListener("progress", _)),
                          a.readyState !== a.DONE && a.abort();
                      }
                    );
                  })
              )
            );
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(lC));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const vg = new U("XSRF_ENABLED"),
        HC = new U("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        $C = new U("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class GC {}
      let BV = (() => {
        var e;
        class t {
          constructor(n, i, o) {
            (this.doc = n),
              (this.platform = i),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const n = this.doc.cookie || "";
            return (
              n !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = KD(n, this.cookieName)),
                (this.lastCookieString = n)),
              this.lastToken
            );
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(at), F(bi), F(HC));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function jV(e, t) {
        const r = e.url.toLowerCase();
        if (
          !V(vg) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          r.startsWith("http://") ||
          r.startsWith("https://")
        )
          return t(e);
        const n = V(GC).getToken(),
          i = V($C);
        return (
          null != n &&
            !e.headers.has(i) &&
            (e = e.clone({ headers: e.headers.set(i, n) })),
          t(e)
        );
      }
      var Jr = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(Jr || {});
      function Ni(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function UV(...e) {
        const t = [
          mg,
          UC,
          BC,
          { provide: Iu, useExisting: BC },
          { provide: Tu, useExisting: UC },
          { provide: La, useValue: jV, multi: !0 },
          { provide: vg, useValue: !0 },
          { provide: GC, useClass: BV },
        ];
        for (const r of e) t.push(...r.ɵproviders);
        return (function ih(e) {
          return { ɵproviders: e };
        })(t);
      }
      const zC = new U("LEGACY_INTERCEPTOR_FN");
      let $V = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({
            providers: [
              UV(
                Ni(Jr.LegacyInterceptors, [
                  { provide: zC, useFactory: AV },
                  { provide: La, useExisting: zC, multi: !0 },
                ])
              ),
            ],
          })),
          t
        );
      })();
      const { isArray: ZV } = Array;
      function yg(e) {
        return se((t) =>
          (function JV(e, t) {
            return ZV(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      const QV = ["addListener", "removeListener"],
        KV = ["addEventListener", "removeEventListener"],
        XV = ["on", "off"];
      function At(e, t, r, n) {
        if ((re(r) && ((n = r), (r = void 0)), n))
          return At(e, t, r).pipe(yg(n));
        const [i, o] = (function nB(e) {
          return re(e.addEventListener) && re(e.removeEventListener);
        })(e)
          ? KV.map((s) => (a) => e[s](t, a, r))
          : (function eB(e) {
              return re(e.addListener) && re(e.removeListener);
            })(e)
          ? QV.map(qC(e, t))
          : (function tB(e) {
              return re(e.on) && re(e.off);
            })(e)
          ? XV.map(qC(e, t))
          : [];
        if (!i && Gd(e)) return dt((s) => At(s, t, r))(ut(e));
        if (!i) throw new TypeError("Invalid event target");
        return new Ie((s) => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return i(a), () => o(a);
        });
      }
      function qC(e, t) {
        return (r) => (n) => e[r](t, n);
      }
      class rB extends je {
        constructor(t, r) {
          super();
        }
        schedule(t, r = 0) {
          return this;
        }
      }
      const Nu = {
          setInterval(e, t, ...r) {
            const { delegate: n } = Nu;
            return n?.setInterval
              ? n.setInterval(e, t, ...r)
              : setInterval(e, t, ...r);
          },
          clearInterval(e) {
            const { delegate: t } = Nu;
            return (t?.clearInterval || clearInterval)(e);
          },
          delegate: void 0,
        },
        WC = { now: () => (WC.delegate || Date).now(), delegate: void 0 };
      class Va {
        constructor(t, r = Va.now) {
          (this.schedulerActionCtor = t), (this.now = r);
        }
        schedule(t, r = 0, n) {
          return new this.schedulerActionCtor(this, t).schedule(n, r);
        }
      }
      Va.now = WC.now;
      const sB = new (class oB extends Va {
        constructor(t, r = Va.now) {
          super(t, r), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: r } = this;
          if (this._active) return void r.push(t);
          let n;
          this._active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = r.shift()));
          if (((this._active = !1), n)) {
            for (; (t = r.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      })(
        class iB extends rB {
          constructor(t, r) {
            super(t, r),
              (this.scheduler = t),
              (this.work = r),
              (this.pending = !1);
          }
          schedule(t, r = 0) {
            var n;
            if (this.closed) return this;
            this.state = t;
            const i = this.id,
              o = this.scheduler;
            return (
              null != i && (this.id = this.recycleAsyncId(o, i, r)),
              (this.pending = !0),
              (this.delay = r),
              (this.id =
                null !== (n = this.id) && void 0 !== n
                  ? n
                  : this.requestAsyncId(o, this.id, r)),
              this
            );
          }
          requestAsyncId(t, r, n = 0) {
            return Nu.setInterval(t.flush.bind(t, this), n);
          }
          recycleAsyncId(t, r, n = 0) {
            if (null != n && this.delay === n && !1 === this.pending) return r;
            null != r && Nu.clearInterval(r);
          }
          execute(t, r) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const n = this._execute(t, r);
            if (n) return n;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(t, r) {
            let i,
              n = !1;
            try {
              this.work(t);
            } catch (o) {
              (n = !0),
                (i = o || new Error("Scheduled action threw falsy error"));
            }
            if (n) return this.unsubscribe(), i;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: t, scheduler: r } = this,
                { actions: n } = r;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                Pr(n, this),
                null != t && (this.id = this.recycleAsyncId(r, t, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      const { isArray: lB } = Array;
      function JC(e) {
        return 1 === e.length && lB(e[0]) ? e[0] : e;
      }
      function bg(...e) {
        const t = Pl(e),
          r = JC(e);
        return r.length
          ? new Ie((n) => {
              let i = r.map(() => []),
                o = r.map(() => !1);
              n.add(() => {
                i = o = null;
              });
              for (let s = 0; !n.closed && s < r.length; s++)
                ut(r[s]).subscribe(
                  xe(
                    n,
                    (a) => {
                      if ((i[s].push(a), i.every((l) => l.length))) {
                        const l = i.map((c) => c.shift());
                        n.next(t ? t(...l) : l),
                          i.some((c, u) => !c.length && o[u]) && n.complete();
                      }
                    },
                    () => {
                      (o[s] = !0), !i[s].length && n.complete();
                    }
                  )
                );
              return () => {
                i = o = null;
              };
            })
          : Dn;
      }
      function Ba(...e) {
        return (function uB() {
          return no(1);
        })()(ft(e, Ms(e)));
      }
      function it(e) {
        return Qe((t, r) => {
          ut(e).subscribe(xe(r, () => r.complete(), li)),
            !r.closed && t.subscribe(r);
        });
      }
      function Rt(e) {
        return e <= 0
          ? () => Dn
          : Qe((t, r) => {
              let n = 0;
              t.subscribe(
                xe(r, (i) => {
                  ++n <= e && (r.next(i), e <= n && r.complete());
                })
              );
            });
      }
      function Ct(e, t, r) {
        const n = re(e) || t || r ? { next: e, error: t, complete: r } : e;
        return n
          ? Qe((i, o) => {
              var s;
              null === (s = n.subscribe) || void 0 === s || s.call(n);
              let a = !0;
              i.subscribe(
                xe(
                  o,
                  (l) => {
                    var c;
                    null === (c = n.next) || void 0 === c || c.call(n, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = n.complete) || void 0 === l || l.call(n),
                      o.complete();
                  },
                  (l) => {
                    var c;
                    (a = !1),
                      null === (c = n.error) || void 0 === c || c.call(n, l),
                      o.error(l);
                  },
                  () => {
                    var l, c;
                    a &&
                      (null === (l = n.unsubscribe) ||
                        void 0 === l ||
                        l.call(n)),
                      null === (c = n.finalize) || void 0 === c || c.call(n);
                  }
                )
              );
            })
          : xn;
      }
      function Dg(...e) {
        const t = Pl(e);
        return Qe((r, n) => {
          const i = e.length,
            o = new Array(i);
          let s = e.map(() => !1),
            a = !1;
          for (let l = 0; l < i; l++)
            ut(e[l]).subscribe(
              xe(
                n,
                (c) => {
                  (o[l] = c),
                    !a &&
                      !s[l] &&
                      ((s[l] = !0), (a = s.every(xn)) && (s = null));
                },
                li
              )
            );
          r.subscribe(
            xe(n, (l) => {
              if (a) {
                const c = [l, ...o];
                n.next(t ? t(...c) : c);
              }
            })
          );
        });
      }
      const { isArray: gB } = Array,
        { getPrototypeOf: _B, prototype: mB, keys: vB } = Object;
      function tw(e) {
        if (1 === e.length) {
          const t = e[0];
          if (gB(t)) return { args: t, keys: null };
          if (
            (function yB(e) {
              return e && "object" == typeof e && _B(e) === mB;
            })(t)
          ) {
            const r = vB(t);
            return { args: r.map((n) => t[n]), keys: r };
          }
        }
        return { args: e, keys: null };
      }
      function nw(e, t) {
        return e.reduce((r, n, i) => ((r[n] = t[i]), r), {});
      }
      let rw = (() => {
          var e;
          class t {
            constructor(n, i) {
              (this._renderer = n),
                (this._elementRef = i),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(n, i) {
              this._renderer.setProperty(this._elementRef.nativeElement, n, i);
            }
            registerOnTouched(n) {
              this.onTouched = n;
            }
            registerOnChange(n) {
              this.onChange = n;
            }
            setDisabledState(n) {
              this.setProperty("disabled", n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(pn), g(we));
            }),
            (e.ɵdir = x({ type: e })),
            t
          );
        })(),
        Ai = (() => {
          var e;
          class t extends rw {}
          return (
            ((e = t).ɵfac = (function () {
              let r;
              return function (i) {
                return (r || (r = nt(e)))(i || e);
              };
            })()),
            (e.ɵdir = x({ type: e, features: [Ee] })),
            t
          );
        })();
      const An = new U("NgValueAccessor"),
        CB = { provide: An, useExisting: te(() => Ri), multi: !0 },
        EB = new U("CompositionEventMode");
      let Ri = (() => {
        var e;
        class t extends rw {
          constructor(n, i, o) {
            super(n, i),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function wB() {
                  const e = Wr() ? Wr().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(n) {
            this.setProperty("value", n ?? "");
          }
          _handleInput(n) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(n);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(n) {
            (this._composing = !1), this._compositionMode && this.onChange(n);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(pn), g(we), g(EB, 8));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (n, i) {
              1 & n &&
                G("input", function (s) {
                  return i._handleInput(s.target.value);
                })("blur", function () {
                  return i.onTouched();
                })("compositionstart", function () {
                  return i._compositionStart();
                })("compositionend", function (s) {
                  return i._compositionEnd(s.target.value);
                });
            },
            features: [ke([CB]), Ee],
          })),
          t
        );
      })();
      function Qr(e) {
        return (
          null == e ||
          (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
        );
      }
      function ow(e) {
        return null != e && "number" == typeof e.length;
      }
      const xt = new U("NgValidators"),
        Kr = new U("NgAsyncValidators"),
        SB =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      function lw(e) {
        return Qr(e.value) ? { required: !0 } : null;
      }
      function uw(e) {
        return Qr(e.value) || SB.test(e.value) ? null : { email: !0 };
      }
      function Au(e) {
        return null;
      }
      function pw(e) {
        return null != e;
      }
      function gw(e) {
        return ga(e) ? ft(e) : e;
      }
      function _w(e) {
        let t = {};
        return (
          e.forEach((r) => {
            t = null != r ? { ...t, ...r } : t;
          }),
          0 === Object.keys(t).length ? null : t
        );
      }
      function mw(e, t) {
        return t.map((r) => r(e));
      }
      function vw(e) {
        return e.map((t) =>
          (function IB(e) {
            return !e.validate;
          })(t)
            ? t
            : (r) => t.validate(r)
        );
      }
      function Cg(e) {
        return null != e
          ? (function yw(e) {
              if (!e) return null;
              const t = e.filter(pw);
              return 0 == t.length
                ? null
                : function (r) {
                    return _w(mw(r, t));
                  };
            })(vw(e))
          : null;
      }
      function wg(e) {
        return null != e
          ? (function bw(e) {
              if (!e) return null;
              const t = e.filter(pw);
              return 0 == t.length
                ? null
                : function (r) {
                    return (function bB(...e) {
                      const t = Pl(e),
                        { args: r, keys: n } = tw(e),
                        i = new Ie((o) => {
                          const { length: s } = r;
                          if (!s) return void o.complete();
                          const a = new Array(s);
                          let l = s,
                            c = s;
                          for (let u = 0; u < s; u++) {
                            let d = !1;
                            ut(r[u]).subscribe(
                              xe(
                                o,
                                (f) => {
                                  d || ((d = !0), c--), (a[u] = f);
                                },
                                () => l--,
                                void 0,
                                () => {
                                  (!l || !d) &&
                                    (c || o.next(n ? nw(n, a) : a),
                                    o.complete());
                                }
                              )
                            );
                          }
                        });
                      return t ? i.pipe(yg(t)) : i;
                    })(mw(r, t).map(gw)).pipe(se(_w));
                  };
            })(vw(e))
          : null;
      }
      function Dw(e, t) {
        return null === e ? [t] : Array.isArray(e) ? [...e, t] : [e, t];
      }
      function Eg(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Ru(e, t) {
        return Array.isArray(e) ? e.includes(t) : e === t;
      }
      function Ew(e, t) {
        const r = Eg(t);
        return (
          Eg(e).forEach((i) => {
            Ru(r, i) || r.push(i);
          }),
          r
        );
      }
      function Sw(e, t) {
        return Eg(t).filter((r) => !Ru(e, r));
      }
      class Iw {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(t) {
          (this._rawValidators = t || []),
            (this._composedValidatorFn = Cg(this._rawValidators));
        }
        _setAsyncValidators(t) {
          (this._rawAsyncValidators = t || []),
            (this._composedAsyncValidatorFn = wg(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(t) {
          this._onDestroyCallbacks.push(t);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((t) => t()),
            (this._onDestroyCallbacks = []);
        }
        reset(t = void 0) {
          this.control && this.control.reset(t);
        }
        hasError(t, r) {
          return !!this.control && this.control.hasError(t, r);
        }
        getError(t, r) {
          return this.control ? this.control.getError(t, r) : null;
        }
      }
      class qt extends Iw {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Xr extends Iw {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class Tw {
        constructor(t) {
          this._cd = t;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let ja = (() => {
          var e;
          class t extends Tw {
            constructor(n) {
              super(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(Xr, 2));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (n, i) {
                2 & n &&
                  pe("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
                    "ng-pristine",
                    i.isPristine
                  )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
                    "ng-invalid",
                    i.isInvalid
                  )("ng-pending", i.isPending);
              },
              features: [Ee],
            })),
            t
          );
        })(),
        xu = (() => {
          var e;
          class t extends Tw {
            constructor(n) {
              super(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(qt, 10));
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (n, i) {
                2 & n &&
                  pe("ng-untouched", i.isUntouched)("ng-touched", i.isTouched)(
                    "ng-pristine",
                    i.isPristine
                  )("ng-dirty", i.isDirty)("ng-valid", i.isValid)(
                    "ng-invalid",
                    i.isInvalid
                  )("ng-pending", i.isPending)("ng-submitted", i.isSubmitted);
              },
              features: [Ee],
            })),
            t
          );
        })();
      const Ua = "VALID",
        ku = "INVALID",
        es = "PENDING",
        Ha = "DISABLED";
      function Tg(e) {
        return (Fu(e) ? e.validators : e) || null;
      }
      function Mg(e, t) {
        return (Fu(t) ? t.asyncValidators : e) || null;
      }
      function Fu(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class Aw {
        constructor(t, r) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(t),
            this._assignAsyncValidators(r);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Ua;
        }
        get invalid() {
          return this.status === ku;
        }
        get pending() {
          return this.status == es;
        }
        get disabled() {
          return this.status === Ha;
        }
        get enabled() {
          return this.status !== Ha;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this._assignValidators(t);
        }
        setAsyncValidators(t) {
          this._assignAsyncValidators(t);
        }
        addValidators(t) {
          this.setValidators(Ew(t, this._rawValidators));
        }
        addAsyncValidators(t) {
          this.setAsyncValidators(Ew(t, this._rawAsyncValidators));
        }
        removeValidators(t) {
          this.setValidators(Sw(t, this._rawValidators));
        }
        removeAsyncValidators(t) {
          this.setAsyncValidators(Sw(t, this._rawAsyncValidators));
        }
        hasValidator(t) {
          return Ru(this._rawValidators, t);
        }
        hasAsyncValidator(t) {
          return Ru(this._rawAsyncValidators, t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((r) => {
              r.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((r) => {
              r.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = es),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const r = this._parentMarkedDirty(t.onlySelf);
          (this.status = Ha),
            (this.errors = null),
            this._forEachChild((n) => {
              n.disable({ ...t, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...t, skipPristineCheck: r }),
            this._onDisabledChange.forEach((n) => n(!0));
        }
        enable(t = {}) {
          const r = this._parentMarkedDirty(t.onlySelf);
          (this.status = Ua),
            this._forEachChild((n) => {
              n.enable({ ...t, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors({ ...t, skipPristineCheck: r }),
            this._onDisabledChange.forEach((n) => n(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Ua || this.status === es) &&
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((r) => r._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Ha : Ua;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = es), (this._hasOwnPendingAsyncValidator = !0);
            const r = gw(this.asyncValidator(this));
            this._asyncValidationSubscription = r.subscribe((n) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(n, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, r = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== r.emitEvent);
        }
        get(t) {
          let r = t;
          return null == r ||
            (Array.isArray(r) || (r = r.split(".")), 0 === r.length)
            ? null
            : r.reduce((n, i) => n && n._find(i), this);
        }
        getError(t, r) {
          const n = r ? this.get(r) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, r) {
          return !!this.getError(t, r);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new z()), (this.statusChanges = new z());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Ha
            : this.errors
            ? ku
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(es)
            ? es
            : this._anyControlsHaveStatus(ku)
            ? ku
            : Ua;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((r) => r.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Fu(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(t) {
          return null;
        }
        _assignValidators(t) {
          (this._rawValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedValidatorFn = (function NB(e) {
              return Array.isArray(e) ? Cg(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(t) {
          (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
            (this._composedAsyncValidatorFn = (function AB(e) {
              return Array.isArray(e) ? wg(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class Og extends Aw {
        constructor(t, r, n) {
          super(Tg(r), Mg(n, r)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(r),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(t, r) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = r),
              r.setParent(this),
              r._registerOnCollectionChange(this._onCollectionChange),
              r);
        }
        addControl(t, r, n = {}) {
          this.registerControl(t, r),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(t, r = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        setControl(t, r, n = {}) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            r && this.registerControl(t, r),
            this.updateValueAndValidity({ emitEvent: n.emitEvent }),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, r = {}) {
          (function Nw(e, t, r) {
            e._forEachChild((n, i) => {
              if (void 0 === r[i]) throw new N(1002, "");
            });
          })(this, 0, t),
            Object.keys(t).forEach((n) => {
              (function Ow(e, t, r) {
                const n = e.controls;
                if (!(t ? Object.keys(n) : n).length) throw new N(1e3, "");
                if (!n[r]) throw new N(1001, "");
              })(this, !0, n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: r.emitEvent,
                });
            }),
            this.updateValueAndValidity(r);
        }
        patchValue(t, r = {}) {
          null != t &&
            (Object.keys(t).forEach((n) => {
              const i = this.controls[n];
              i && i.patchValue(t[n], { onlySelf: !0, emitEvent: r.emitEvent });
            }),
            this.updateValueAndValidity(r));
        }
        reset(t = {}, r = {}) {
          this._forEachChild((n, i) => {
            n.reset(t[i], { onlySelf: !0, emitEvent: r.emitEvent });
          }),
            this._updatePristine(r),
            this._updateTouched(r),
            this.updateValueAndValidity(r);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, r, n) => ((t[n] = r.getRawValue()), t)
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (r, n) => !!n._syncPendingControls() || r
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((r) => {
            const n = this.controls[r];
            n && t(n, r);
          });
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const [r, n] of Object.entries(this.controls))
            if (this.contains(r) && t(n)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (r, n, i) => ((n.enabled || this.disabled) && (r[i] = n.value), r)
          );
        }
        _reduceChildren(t, r) {
          let n = t;
          return (
            this._forEachChild((i, o) => {
              n = r(n, i, o);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(t) {
          return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
        }
      }
      const ts = new U("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Lu,
        }),
        Lu = "always";
      function $a(e, t, r = Lu) {
        Ng(e, t),
          t.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === r) &&
            t.valueAccessor.setDisabledState?.(e.disabled),
          (function PB(e, t) {
            t.valueAccessor.registerOnChange((r) => {
              (e._pendingValue = r),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && Rw(e, t);
            });
          })(e, t),
          (function FB(e, t) {
            const r = (n, i) => {
              t.valueAccessor.writeValue(n), i && t.viewToModelUpdate(n);
            };
            e.registerOnChange(r),
              t._registerOnDestroy(() => {
                e._unregisterOnChange(r);
              });
          })(e, t),
          (function kB(e, t) {
            t.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && Rw(e, t),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, t),
          (function xB(e, t) {
            if (t.valueAccessor.setDisabledState) {
              const r = (n) => {
                t.valueAccessor.setDisabledState(n);
              };
              e.registerOnDisabledChange(r),
                t._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(r);
                });
            }
          })(e, t);
      }
      function ju(e, t) {
        e.forEach((r) => {
          r.registerOnValidatorChange && r.registerOnValidatorChange(t);
        });
      }
      function Ng(e, t) {
        const r = (function Cw(e) {
          return e._rawValidators;
        })(e);
        null !== t.validator
          ? e.setValidators(Dw(r, t.validator))
          : "function" == typeof r && e.setValidators([r]);
        const n = (function ww(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== t.asyncValidator
          ? e.setAsyncValidators(Dw(n, t.asyncValidator))
          : "function" == typeof n && e.setAsyncValidators([n]);
        const i = () => e.updateValueAndValidity();
        ju(t._rawValidators, i), ju(t._rawAsyncValidators, i);
      }
      function Rw(e, t) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          t.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const UB = { provide: qt, useExisting: te(() => ns) },
        Ga = (() => Promise.resolve())();
      let ns = (() => {
        var e;
        class t extends qt {
          constructor(n, i, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new z()),
              (this.form = new Og({}, Cg(n), wg(i)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(n) {
            Ga.then(() => {
              const i = this._findContainer(n.path);
              (n.control = i.registerControl(n.name, n.control)),
                $a(n.control, n, this.callSetDisabledState),
                n.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(n);
            });
          }
          getControl(n) {
            return this.form.get(n.path);
          }
          removeControl(n) {
            Ga.then(() => {
              const i = this._findContainer(n.path);
              i && i.removeControl(n.name), this._directives.delete(n);
            });
          }
          addFormGroup(n) {
            Ga.then(() => {
              const i = this._findContainer(n.path),
                o = new Og({});
              (function xw(e, t) {
                Ng(e, t);
              })(o, n),
                i.registerControl(n.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(n) {
            Ga.then(() => {
              const i = this._findContainer(n.path);
              i && i.removeControl(n.name);
            });
          }
          getFormGroup(n) {
            return this.form.get(n.path);
          }
          updateModel(n, i) {
            Ga.then(() => {
              this.form.get(n.path).setValue(i);
            });
          }
          setValue(n) {
            this.control.setValue(n);
          }
          onSubmit(n) {
            return (
              (this.submitted = !0),
              (function Pw(e, t) {
                e._syncPendingControls(),
                  t.forEach((r) => {
                    const n = r.control;
                    "submit" === n.updateOn &&
                      n._pendingChange &&
                      (r.viewToModelUpdate(n._pendingValue),
                      (n._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(n),
              "dialog" === n?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(n = void 0) {
            this.form.reset(n), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(n) {
            return n.pop(), n.length ? this.form.get(n) : this.form;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(xt, 10), g(Kr, 10), g(ts, 8));
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (n, i) {
              1 & n &&
                G("submit", function (s) {
                  return i.onSubmit(s);
                })("reset", function () {
                  return i.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [ke([UB]), Ee],
          })),
          t
        );
      })();
      function kw(e, t) {
        const r = e.indexOf(t);
        r > -1 && e.splice(r, 1);
      }
      function Fw(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const Lw = class extends Aw {
          constructor(t = null, r, n) {
            super(Tg(r), Mg(n, r)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(t),
              this._setUpdateStrategy(r),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              Fu(r) &&
                (r.nonNullable || r.initialValueIsDefault) &&
                (this.defaultValue = Fw(t) ? t.value : t);
          }
          setValue(t, r = {}) {
            (this.value = this._pendingValue = t),
              this._onChange.length &&
                !1 !== r.emitModelToViewChange &&
                this._onChange.forEach((n) =>
                  n(this.value, !1 !== r.emitViewToModelChange)
                ),
              this.updateValueAndValidity(r);
          }
          patchValue(t, r = {}) {
            this.setValue(t, r);
          }
          reset(t = this.defaultValue, r = {}) {
            this._applyFormState(t),
              this.markAsPristine(r),
              this.markAsUntouched(r),
              this.setValue(this.value, r),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(t) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(t) {
            this._onChange.push(t);
          }
          _unregisterOnChange(t) {
            kw(this._onChange, t);
          }
          registerOnDisabledChange(t) {
            this._onDisabledChange.push(t);
          }
          _unregisterOnDisabledChange(t) {
            kw(this._onDisabledChange, t);
          }
          _forEachChild(t) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(t) {
            Fw(t)
              ? ((this.value = this._pendingValue = t.value),
                t.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = t);
          }
        },
        GB = { provide: Xr, useExisting: te(() => rs) },
        jw = (() => Promise.resolve())();
      let rs = (() => {
          var e;
          class t extends Xr {
            constructor(n, i, o, s, a, l) {
              super(),
                (this._changeDetectorRef = a),
                (this.callSetDisabledState = l),
                (this.control = new Lw()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new z()),
                (this._parent = n),
                this._setValidators(i),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function xg(e, t) {
                  if (!t) return null;
                  let r, n, i;
                  return (
                    Array.isArray(t),
                    t.forEach((o) => {
                      o.constructor === Ri
                        ? (r = o)
                        : (function BB(e) {
                            return Object.getPrototypeOf(e.constructor) === Ai;
                          })(o)
                        ? (n = o)
                        : (i = o);
                    }),
                    i || n || r || null
                  );
                })(0, s));
            }
            ngOnChanges(n) {
              if ((this._checkForErrors(), !this._registered || "name" in n)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const i = n.name.previousValue;
                  this.formDirective.removeControl({
                    name: i,
                    path: this._getPath(i),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in n && this._updateDisabled(n),
                (function Rg(e, t) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const r = e.model;
                  return !!r.isFirstChange() || !Object.is(t, r.currentValue);
                })(n, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(n) {
              (this.viewModel = n), this.update.emit(n);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              $a(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(n) {
              jw.then(() => {
                this.control.setValue(n, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(n) {
              const i = n.isDisabled.currentValue,
                o = 0 !== i && Yo(i);
              jw.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(n) {
              return this._parent
                ? (function Vu(e, t) {
                    return [...t.path, e];
                  })(n, this._parent)
                : [n];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(
                g(qt, 9),
                g(xt, 10),
                g(Kr, 10),
                g(An, 10),
                g(Hn, 8),
                g(ts, 8)
              );
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ke([GB]), Ee, Mt],
            })),
            t
          );
        })(),
        Hu = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })(),
        Hw = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })();
      function Qw(e) {
        return "number" == typeof e ? e : parseInt(e, 10);
      }
      let xi = (() => {
        var e;
        class t {
          constructor() {
            this._validator = Au;
          }
          ngOnChanges(n) {
            if (this.inputName in n) {
              const i = this.normalizeInput(n[this.inputName].currentValue);
              (this._enabled = this.enabled(i)),
                (this._validator = this._enabled
                  ? this.createValidator(i)
                  : Au),
                this._onChange && this._onChange();
            }
          }
          validate(n) {
            return this._validator(n);
          }
          registerOnValidatorChange(n) {
            this._onChange = n;
          }
          enabled(n) {
            return null != n;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = x({ type: e, features: [Mt] })),
          t
        );
      })();
      const lj = { provide: xt, useExisting: te(() => za), multi: !0 };
      let za = (() => {
        var e;
        class t extends xi {
          constructor() {
            super(...arguments),
              (this.inputName = "required"),
              (this.normalizeInput = Yo),
              (this.createValidator = (n) => lw);
          }
          enabled(n) {
            return n;
          }
        }
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (i) {
              return (r || (r = nt(e)))(i || e);
            };
          })()),
          (e.ɵdir = x({
            type: e,
            selectors: [
              [
                "",
                "required",
                "",
                "formControlName",
                "",
                3,
                "type",
                "checkbox",
              ],
              ["", "required", "", "formControl", "", 3, "type", "checkbox"],
              ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
            ],
            hostVars: 1,
            hostBindings: function (n, i) {
              2 & n && Se("required", i._enabled ? "" : null);
            },
            inputs: { required: "required" },
            features: [ke([lj]), Ee],
          })),
          t
        );
      })();
      const uj = { provide: xt, useExisting: te(() => Bg), multi: !0 };
      let Bg = (() => {
        var e;
        class t extends xi {
          constructor() {
            super(...arguments),
              (this.inputName = "email"),
              (this.normalizeInput = Yo),
              (this.createValidator = (n) => uw);
          }
          enabled(n) {
            return n;
          }
        }
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (i) {
              return (r || (r = nt(e)))(i || e);
            };
          })()),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["", "email", "", "formControlName", ""],
              ["", "email", "", "formControl", ""],
              ["", "email", "", "ngModel", ""],
            ],
            inputs: { email: "email" },
            features: [ke([uj]), Ee],
          })),
          t
        );
      })();
      const dj = { provide: xt, useExisting: te(() => qa), multi: !0 };
      let qa = (() => {
        var e;
        class t extends xi {
          constructor() {
            super(...arguments),
              (this.inputName = "minlength"),
              (this.normalizeInput = (n) => Qw(n)),
              (this.createValidator = (n) =>
                (function dw(e) {
                  return (t) =>
                    Qr(t.value) || !ow(t.value)
                      ? null
                      : t.value.length < e
                      ? {
                          minlength: {
                            requiredLength: e,
                            actualLength: t.value.length,
                          },
                        }
                      : null;
                })(n));
          }
        }
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (i) {
              return (r || (r = nt(e)))(i || e);
            };
          })()),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["", "minlength", "", "formControlName", ""],
              ["", "minlength", "", "formControl", ""],
              ["", "minlength", "", "ngModel", ""],
            ],
            hostVars: 1,
            hostBindings: function (n, i) {
              2 & n && Se("minlength", i._enabled ? i.minlength : null);
            },
            inputs: { minlength: "minlength" },
            features: [ke([dj]), Ee],
          })),
          t
        );
      })();
      const fj = { provide: xt, useExisting: te(() => Wa), multi: !0 };
      let Wa = (() => {
        var e;
        class t extends xi {
          constructor() {
            super(...arguments),
              (this.inputName = "maxlength"),
              (this.normalizeInput = (n) => Qw(n)),
              (this.createValidator = (n) =>
                (function fw(e) {
                  return (t) =>
                    ow(t.value) && t.value.length > e
                      ? {
                          maxlength: {
                            requiredLength: e,
                            actualLength: t.value.length,
                          },
                        }
                      : null;
                })(n));
          }
        }
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (i) {
              return (r || (r = nt(e)))(i || e);
            };
          })()),
          (e.ɵdir = x({
            type: e,
            selectors: [
              ["", "maxlength", "", "formControlName", ""],
              ["", "maxlength", "", "formControl", ""],
              ["", "maxlength", "", "ngModel", ""],
            ],
            hostVars: 1,
            hostBindings: function (n, i) {
              2 & n && Se("maxlength", i._enabled ? i.maxlength : null);
            },
            inputs: { maxlength: "maxlength" },
            features: [ke([fj]), Ee],
          })),
          t
        );
      })();
      const hj = { provide: xt, useExisting: te(() => jg), multi: !0 };
      let jg = (() => {
          var e;
          class t extends xi {
            constructor() {
              super(...arguments),
                (this.inputName = "pattern"),
                (this.normalizeInput = (n) => n),
                (this.createValidator = (n) =>
                  (function hw(e) {
                    if (!e) return Au;
                    let t, r;
                    return (
                      "string" == typeof e
                        ? ((r = ""),
                          "^" !== e.charAt(0) && (r += "^"),
                          (r += e),
                          "$" !== e.charAt(e.length - 1) && (r += "$"),
                          (t = new RegExp(r)))
                        : ((r = e.toString()), (t = e)),
                      (n) => {
                        if (Qr(n.value)) return null;
                        const i = n.value;
                        return t.test(i)
                          ? null
                          : { pattern: { requiredPattern: r, actualValue: i } };
                      }
                    );
                  })(n));
            }
          }
          return (
            ((e = t).ɵfac = (function () {
              let r;
              return function (i) {
                return (r || (r = nt(e)))(i || e);
              };
            })()),
            (e.ɵdir = x({
              type: e,
              selectors: [
                ["", "pattern", "", "formControlName", ""],
                ["", "pattern", "", "formControl", ""],
                ["", "pattern", "", "ngModel", ""],
              ],
              hostVars: 1,
              hostBindings: function (n, i) {
                2 & n && Se("pattern", i._enabled ? i.pattern : null);
              },
              inputs: { pattern: "pattern" },
              features: [ke([hj]), Ee],
            })),
            t
          );
        })(),
        pj = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({ imports: [Hw] })),
            t
          );
        })(),
        _j = (() => {
          var e;
          class t {
            static withConfig(n) {
              return {
                ngModule: t,
                providers: [
                  { provide: ts, useValue: n.callSetDisabledState ?? Lu },
                ],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({ imports: [pj] })),
            t
          );
        })();
      Math, Math, Math;
      const T3 = ["*"],
        rU = ["dialog"];
      function Fi(e) {
        return "string" == typeof e;
      }
      function Li(e) {
        return null != e;
      }
      function ls(e) {
        return (e || document.body).getBoundingClientRect();
      }
      const wE = { animation: !0, transitionTimerDelayMs: 5 },
        ZU = () => {},
        { transitionTimerDelayMs: JU } = wE,
        el = new Map(),
        sn = (e, t, r, n) => {
          let i = n.context || {};
          const o = el.get(t);
          if (o)
            switch (n.runningTransition) {
              case "continue":
                return Dn;
              case "stop":
                e.run(() => o.transition$.complete()),
                  (i = Object.assign(o.context, i)),
                  el.delete(t);
            }
          const s = r(t, n.animation, i) || ZU;
          if (
            !n.animation ||
            "none" === window.getComputedStyle(t).transitionProperty
          )
            return (
              e.run(() => s()),
              q(void 0).pipe(
                (function WU(e) {
                  return (t) =>
                    new Ie((r) =>
                      t.subscribe({
                        next: (s) => e.run(() => r.next(s)),
                        error: (s) => e.run(() => r.error(s)),
                        complete: () => e.run(() => r.complete()),
                      })
                    );
                })(e)
              )
            );
          const a = new ve(),
            l = new ve(),
            c = a.pipe(
              (function dB(...e) {
                return (t) => Ba(t, q(...e));
              })(!0)
            );
          el.set(t, {
            transition$: a,
            complete: () => {
              l.next(), l.complete();
            },
            context: i,
          });
          const u = (function YU(e) {
            const { transitionDelay: t, transitionDuration: r } =
              window.getComputedStyle(e);
            return 1e3 * (parseFloat(t) + parseFloat(r));
          })(t);
          return (
            e.runOutsideAngular(() => {
              const d = At(t, "transitionend").pipe(
                it(c),
                mt(({ target: h }) => h === t)
              );
              (function QC(...e) {
                return 1 === (e = JC(e)).length
                  ? ut(e[0])
                  : new Ie(
                      (function cB(e) {
                        return (t) => {
                          let r = [];
                          for (let n = 0; r && !t.closed && n < e.length; n++)
                            r.push(
                              ut(e[n]).subscribe(
                                xe(t, (i) => {
                                  if (r) {
                                    for (let o = 0; o < r.length; o++)
                                      o !== n && r[o].unsubscribe();
                                    r = null;
                                  }
                                  t.next(i);
                                })
                              )
                            );
                        };
                      })(e)
                    );
              })(
                (function ZC(e = 0, t, r = sB) {
                  let n = -1;
                  return (
                    null != t && (K_(t) ? (r = t) : (n = t)),
                    new Ie((i) => {
                      let o = (function aB(e) {
                        return e instanceof Date && !isNaN(e);
                      })(e)
                        ? +e - r.now()
                        : e;
                      o < 0 && (o = 0);
                      let s = 0;
                      return r.schedule(function () {
                        i.closed ||
                          (i.next(s++),
                          0 <= n ? this.schedule(void 0, n) : i.complete());
                      }, o);
                    })
                  );
                })(u + JU).pipe(it(c)),
                d,
                l
              )
                .pipe(it(c))
                .subscribe(() => {
                  el.delete(t),
                    e.run(() => {
                      s(), a.next(), a.complete();
                    });
                });
            }),
            a.asObservable()
          );
        };
      let Wu = (() => {
          var e;
          class t {
            constructor() {
              this.animation = wE.animation;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        RE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        xE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        FE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        LE = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })();
      var Fe = (function (e) {
        return (
          (e[(e.Tab = 9)] = "Tab"),
          (e[(e.Enter = 13)] = "Enter"),
          (e[(e.Escape = 27)] = "Escape"),
          (e[(e.Space = 32)] = "Space"),
          (e[(e.PageUp = 33)] = "PageUp"),
          (e[(e.PageDown = 34)] = "PageDown"),
          (e[(e.End = 35)] = "End"),
          (e[(e.Home = 36)] = "Home"),
          (e[(e.ArrowLeft = 37)] = "ArrowLeft"),
          (e[(e.ArrowUp = 38)] = "ArrowUp"),
          (e[(e.ArrowRight = 39)] = "ArrowRight"),
          (e[(e.ArrowDown = 40)] = "ArrowDown"),
          e
        );
      })(Fe || {});
      typeof navigator < "u" &&
        navigator.userAgent &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (/Macintosh/.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2) ||
          /Android/.test(navigator.userAgent));
      const GE = [
        "a[href]",
        "button:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");
      function zE(e) {
        const t = Array.from(e.querySelectorAll(GE)).filter(
          (r) => -1 !== r.tabIndex
        );
        return [t[0], t[t.length - 1]];
      }
      new Date(1882, 10, 12), new Date(2174, 10, 25);
      let iS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        aS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })();
      class Hi {
        constructor(t, r, n) {
          (this.nodes = t), (this.viewRef = r), (this.componentRef = n);
        }
      }
      let ZH = (() => {
        var e;
        class t {
          constructor(n, i) {
            (this._el = n), (this._zone = i);
          }
          ngOnInit() {
            this._zone.onStable
              .asObservable()
              .pipe(Rt(1))
              .subscribe(() => {
                sn(
                  this._zone,
                  this._el.nativeElement,
                  (n, i) => {
                    i && ls(n), n.classList.add("show");
                  },
                  { animation: this.animation, runningTransition: "continue" }
                );
              });
          }
          hide() {
            return sn(
              this._zone,
              this._el.nativeElement,
              ({ classList: n }) => n.remove("show"),
              { animation: this.animation, runningTransition: "stop" }
            );
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(we), g(de));
          }),
          (e.ɵcmp = Ge({
            type: e,
            selectors: [["ngb-modal-backdrop"]],
            hostAttrs: [2, "z-index", "1055"],
            hostVars: 6,
            hostBindings: function (n, i) {
              2 & n &&
                (Ei(
                  "modal-backdrop" +
                    (i.backdropClass ? " " + i.backdropClass : "")
                ),
                pe("show", !i.animation)("fade", i.animation));
            },
            inputs: { animation: "animation", backdropClass: "backdropClass" },
            standalone: !0,
            features: [Tn],
            decls: 0,
            vars: 0,
            template: function (n, i) {},
            encapsulation: 2,
          })),
          t
        );
      })();
      class lS {
        update(t) {}
        close(t) {}
        dismiss(t) {}
      }
      const JH = [
          "animation",
          "ariaLabelledBy",
          "ariaDescribedBy",
          "backdrop",
          "centered",
          "fullscreen",
          "keyboard",
          "scrollable",
          "size",
          "windowClass",
          "modalDialogClass",
        ],
        QH = ["animation", "backdropClass"];
      class KH {
        _applyWindowOptions(t, r) {
          JH.forEach((n) => {
            Li(r[n]) && (t[n] = r[n]);
          });
        }
        _applyBackdropOptions(t, r) {
          QH.forEach((n) => {
            Li(r[n]) && (t[n] = r[n]);
          });
        }
        update(t) {
          this._applyWindowOptions(this._windowCmptRef.instance, t),
            this._backdropCmptRef &&
              this._backdropCmptRef.instance &&
              this._applyBackdropOptions(this._backdropCmptRef.instance, t);
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        get closed() {
          return this._closed.asObservable().pipe(it(this._hidden));
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(it(this._hidden));
        }
        get hidden() {
          return this._hidden.asObservable();
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable();
        }
        constructor(t, r, n, i) {
          (this._windowCmptRef = t),
            (this._contentRef = r),
            (this._backdropCmptRef = n),
            (this._beforeDismiss = i),
            (this._closed = new ve()),
            (this._dismissed = new ve()),
            (this._hidden = new ve()),
            t.instance.dismissEvent.subscribe((o) => {
              this.dismiss(o);
            }),
            (this.result = new Promise((o, s) => {
              (this._resolve = o), (this._reject = s);
            })),
            this.result.then(null, () => {});
        }
        close(t) {
          this._windowCmptRef &&
            (this._closed.next(t),
            this._resolve(t),
            this._removeModalElements());
        }
        _dismiss(t) {
          this._dismissed.next(t), this._reject(t), this._removeModalElements();
        }
        dismiss(t) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const r = this._beforeDismiss();
              !(function yE(e) {
                return e && e.then;
              })(r)
                ? !1 !== r && this._dismiss(t)
                : r.then(
                    (n) => {
                      !1 !== n && this._dismiss(t);
                    },
                    () => {}
                  );
            } else this._dismiss(t);
        }
        _removeModalElements() {
          const t = this._windowCmptRef.instance.hide(),
            r = this._backdropCmptRef
              ? this._backdropCmptRef.instance.hide()
              : q(void 0);
          t.subscribe(() => {
            const { nativeElement: n } = this._windowCmptRef.location;
            n.parentNode.removeChild(n),
              this._windowCmptRef.destroy(),
              this._contentRef &&
                this._contentRef.viewRef &&
                this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null);
          }),
            r.subscribe(() => {
              if (this._backdropCmptRef) {
                const { nativeElement: n } = this._backdropCmptRef.location;
                n.parentNode.removeChild(n),
                  this._backdropCmptRef.destroy(),
                  (this._backdropCmptRef = null);
              }
            }),
            bg(t, r).subscribe(() => {
              this._hidden.next(), this._hidden.complete();
            });
        }
      }
      var u_ = (function (e) {
        return (
          (e[(e.BACKDROP_CLICK = 0)] = "BACKDROP_CLICK"),
          (e[(e.ESC = 1)] = "ESC"),
          e
        );
      })(u_ || {});
      let XH = (() => {
          var e;
          class t {
            constructor(n, i, o) {
              (this._document = n),
                (this._elRef = i),
                (this._zone = o),
                (this._closed$ = new ve()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new z()),
                (this.shown = new ve()),
                (this.hidden = new ve());
            }
            get fullscreenClass() {
              return !0 === this.fullscreen
                ? " modal-fullscreen"
                : Fi(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : "";
            }
            dismiss(n) {
              this.dismissEvent.emit(n);
            }
            ngOnInit() {
              (this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe(Rt(1))
                  .subscribe(() => {
                    this._show();
                  });
            }
            ngOnDestroy() {
              this._disableEventHandling();
            }
            hide() {
              const { nativeElement: n } = this._elRef,
                i = { animation: this.animation, runningTransition: "stop" },
                a = bg(
                  sn(this._zone, n, () => n.classList.remove("show"), i),
                  sn(this._zone, this._dialogEl.nativeElement, () => {}, i)
                );
              return (
                a.subscribe(() => {
                  this.hidden.next(), this.hidden.complete();
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                a
              );
            }
            _show() {
              const n = {
                animation: this.animation,
                runningTransition: "continue",
              };
              bg(
                sn(
                  this._zone,
                  this._elRef.nativeElement,
                  (s, a) => {
                    a && ls(s), s.classList.add("show");
                  },
                  n
                ),
                sn(this._zone, this._dialogEl.nativeElement, () => {}, n)
              ).subscribe(() => {
                this.shown.next(), this.shown.complete();
              }),
                this._enableEventHandling(),
                this._setFocus();
            }
            _enableEventHandling() {
              const { nativeElement: n } = this._elRef;
              this._zone.runOutsideAngular(() => {
                At(n, "keydown")
                  .pipe(
                    it(this._closed$),
                    mt((o) => o.which === Fe.Escape)
                  )
                  .subscribe((o) => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          o.defaultPrevented ||
                            this._zone.run(() => this.dismiss(u_.ESC));
                        })
                      : "static" === this.backdrop && this._bumpBackdrop();
                  });
                let i = !1;
                At(this._dialogEl.nativeElement, "mousedown")
                  .pipe(
                    it(this._closed$),
                    Ct(() => (i = !1)),
                    Cn(() => At(n, "mouseup").pipe(it(this._closed$), Rt(1))),
                    mt(({ target: o }) => n === o)
                  )
                  .subscribe(() => {
                    i = !0;
                  }),
                  At(n, "click")
                    .pipe(it(this._closed$))
                    .subscribe(({ target: o }) => {
                      n === o &&
                        ("static" === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 === this.backdrop &&
                            !i &&
                            this._zone.run(() =>
                              this.dismiss(u_.BACKDROP_CLICK)
                            )),
                        (i = !1);
                    });
              });
            }
            _disableEventHandling() {
              this._closed$.next();
            }
            _setFocus() {
              const { nativeElement: n } = this._elRef;
              if (!n.contains(document.activeElement)) {
                const i = n.querySelector("[ngbAutofocus]"),
                  o = zE(n)[0];
                (i || o || n).focus();
              }
            }
            _restoreFocus() {
              const n = this._document.body,
                i = this._elWithFocus;
              let o;
              (o = i && i.focus && n.contains(i) ? i : n),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => o.focus()), (this._elWithFocus = null);
                });
            }
            _bumpBackdrop() {
              "static" === this.backdrop &&
                sn(
                  this._zone,
                  this._elRef.nativeElement,
                  ({ classList: n }) => (
                    n.add("modal-static"), () => n.remove("modal-static")
                  ),
                  { animation: this.animation, runningTransition: "continue" }
                );
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(at), g(we), g(de));
            }),
            (e.ɵcmp = Ge({
              type: e,
              selectors: [["ngb-modal-window"]],
              viewQuery: function (n, i) {
                if ((1 & n && Ti(rU, 7), 2 & n)) {
                  let o;
                  Ne(
                    (o = (function Ae() {
                      return (function yk(e, t) {
                        return e[Xn].queries[t].queryList;
                      })(I(), Xm());
                    })())
                  ) && (i._dialogEl = o.first);
                }
              },
              hostAttrs: ["role", "dialog", "tabindex", "-1"],
              hostVars: 7,
              hostBindings: function (n, i) {
                2 & n &&
                  (Se("aria-modal", !0)("aria-labelledby", i.ariaLabelledBy)(
                    "aria-describedby",
                    i.ariaDescribedBy
                  ),
                  Ei(
                    "modal d-block" + (i.windowClass ? " " + i.windowClass : "")
                  ),
                  pe("fade", i.animation));
              },
              inputs: {
                animation: "animation",
                ariaLabelledBy: "ariaLabelledBy",
                ariaDescribedBy: "ariaDescribedBy",
                backdrop: "backdrop",
                centered: "centered",
                fullscreen: "fullscreen",
                keyboard: "keyboard",
                scrollable: "scrollable",
                size: "size",
                windowClass: "windowClass",
                modalDialogClass: "modalDialogClass",
              },
              outputs: { dismissEvent: "dismiss" },
              standalone: !0,
              features: [Tn],
              ngContentSelectors: T3,
              decls: 4,
              vars: 2,
              consts: [
                ["role", "document"],
                ["dialog", ""],
                [1, "modal-content"],
              ],
              template: function (n, i) {
                1 & n &&
                  ((function z0(e) {
                    const t = I()[tt][kt];
                    if (!t.projection) {
                      const n = (t.projection = Gs(e ? e.length : 1, null)),
                        i = n.slice();
                      let o = t.child;
                      for (; null !== o; ) {
                        const s = e ? UR(o, e) : 0;
                        null !== s &&
                          (i[s] ? (i[s].projectionNext = o) : (n[s] = o),
                          (i[s] = o)),
                          (o = o.next);
                      }
                    }
                  })(),
                  w(0, "div", 0, 1)(2, "div", 2),
                  (function q0(e, t = 0, r) {
                    const n = I(),
                      i = ue(),
                      o = xo(i, ae + e, 16, null, r || null);
                    null === o.projection && (o.projection = t),
                      yf(),
                      (!n[br] || fo()) &&
                        32 != (32 & o.flags) &&
                        (function QO(e, t, r) {
                          ty(
                            t[K],
                            0,
                            t,
                            r,
                            qf(e, r, t),
                            Zv(r.parent || t[kt], r, t)
                          );
                        })(i, n, o);
                  })(3),
                  C()()),
                  2 & n &&
                    Ei(
                      "modal-dialog" +
                        (i.size ? " modal-" + i.size : "") +
                        (i.centered ? " modal-dialog-centered" : "") +
                        i.fullscreenClass +
                        (i.scrollable ? " modal-dialog-scrollable" : "") +
                        (i.modalDialogClass ? " " + i.modalDialogClass : "")
                    );
              },
              styles: [
                "ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n",
              ],
              encapsulation: 2,
            })),
            t
          );
        })(),
        e$ = (() => {
          var e;
          class t {
            constructor(n) {
              this._document = n;
            }
            hide() {
              const n = Math.abs(
                  window.innerWidth - this._document.documentElement.clientWidth
                ),
                i = this._document.body,
                o = i.style,
                { overflow: s, paddingRight: a } = o;
              if (n > 0) {
                const l = parseFloat(window.getComputedStyle(i).paddingRight);
                o.paddingRight = `${l + n}px`;
              }
              return (
                (o.overflow = "hidden"),
                () => {
                  n > 0 && (o.paddingRight = a), (o.overflow = s);
                }
              );
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(at));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        t$ = (() => {
          var e;
          class t {
            constructor(n, i, o, s, a, l, c) {
              (this._applicationRef = n),
                (this._injector = i),
                (this._environmentInjector = o),
                (this._document = s),
                (this._scrollBar = a),
                (this._rendererFactory = l),
                (this._ngZone = c),
                (this._activeWindowCmptHasChanged = new ve()),
                (this._ariaHiddenValues = new Map()),
                (this._scrollBarRestoreFn = null),
                (this._modalRefs = []),
                (this._windowCmpts = []),
                (this._activeInstances = new z()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const u = this._windowCmpts[this._windowCmpts.length - 1];
                    ((e, t, r, n = !1) => {
                      e.runOutsideAngular(() => {
                        const i = At(t, "focusin").pipe(
                          it(r),
                          se((o) => o.target)
                        );
                        At(t, "keydown")
                          .pipe(
                            it(r),
                            mt((o) => o.which === Fe.Tab),
                            Dg(i)
                          )
                          .subscribe(([o, s]) => {
                            const [a, l] = zE(t);
                            (s === a || s === t) &&
                              o.shiftKey &&
                              (l.focus(), o.preventDefault()),
                              s === l &&
                                !o.shiftKey &&
                                (a.focus(), o.preventDefault());
                          }),
                          n &&
                            At(t, "click")
                              .pipe(
                                it(r),
                                Dg(i),
                                se((o) => o[1])
                              )
                              .subscribe((o) => o.focus());
                      });
                    })(
                      this._ngZone,
                      u.location.nativeElement,
                      this._activeWindowCmptHasChanged
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(u.location.nativeElement);
                  }
                });
            }
            _restoreScrollBar() {
              const n = this._scrollBarRestoreFn;
              n && ((this._scrollBarRestoreFn = null), n());
            }
            _hideScrollBar() {
              this._scrollBarRestoreFn ||
                (this._scrollBarRestoreFn = this._scrollBar.hide());
            }
            open(n, i, o) {
              const s =
                  o.container instanceof HTMLElement
                    ? o.container
                    : Li(o.container)
                    ? this._document.querySelector(o.container)
                    : this._document.body,
                a = this._rendererFactory.createRenderer(null, null);
              if (!s)
                throw new Error(
                  `The specified modal container "${
                    o.container || "body"
                  }" was not found in the DOM.`
                );
              this._hideScrollBar();
              const l = new lS(),
                c =
                  (n = o.injector || n).get(Ht, null) ||
                  this._environmentInjector,
                u = this._getContentRef(n, c, i, l, o);
              let d = !1 !== o.backdrop ? this._attachBackdrop(s) : void 0,
                f = this._attachWindowComponent(s, u.nodes),
                h = new KH(f, u, d, o.beforeDismiss);
              return (
                this._registerModalRef(h),
                this._registerWindowCmpt(f),
                h.hidden.pipe(Rt(1)).subscribe(() =>
                  Promise.resolve(!0).then(() => {
                    this._modalRefs.length ||
                      (a.removeClass(this._document.body, "modal-open"),
                      this._restoreScrollBar(),
                      this._revertAriaHidden());
                  })
                ),
                (l.close = (p) => {
                  h.close(p);
                }),
                (l.dismiss = (p) => {
                  h.dismiss(p);
                }),
                (l.update = (p) => {
                  h.update(p);
                }),
                h.update(o),
                1 === this._modalRefs.length &&
                  a.addClass(this._document.body, "modal-open"),
                d && d.instance && d.changeDetectorRef.detectChanges(),
                f.changeDetectorRef.detectChanges(),
                h
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(n) {
              this._modalRefs.forEach((i) => i.dismiss(n));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(n) {
              let i = Vp(ZH, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
              });
              return (
                this._applicationRef.attachView(i.hostView),
                n.appendChild(i.location.nativeElement),
                i
              );
            }
            _attachWindowComponent(n, i) {
              let o = Vp(XH, {
                environmentInjector: this._applicationRef.injector,
                elementInjector: this._injector,
                projectableNodes: i,
              });
              return (
                this._applicationRef.attachView(o.hostView),
                n.appendChild(o.location.nativeElement),
                o
              );
            }
            _getContentRef(n, i, o, s, a) {
              return o
                ? o instanceof Ye
                  ? this._createFromTemplateRef(o, s)
                  : Fi(o)
                  ? this._createFromString(o)
                  : this._createFromComponent(n, i, o, s, a)
                : new Hi([]);
            }
            _createFromTemplateRef(n, i) {
              const s = n.createEmbeddedView({
                $implicit: i,
                close(a) {
                  i.close(a);
                },
                dismiss(a) {
                  i.dismiss(a);
                },
              });
              return (
                this._applicationRef.attachView(s), new Hi([s.rootNodes], s)
              );
            }
            _createFromString(n) {
              const i = this._document.createTextNode(`${n}`);
              return new Hi([[i]]);
            }
            _createFromComponent(n, i, o, s, a) {
              const c = Vp(o, {
                  environmentInjector: i,
                  elementInjector: Nt.create({
                    providers: [{ provide: lS, useValue: s }],
                    parent: n,
                  }),
                }),
                u = c.location.nativeElement;
              return (
                a.scrollable && u.classList.add("component-host-scrollable"),
                this._applicationRef.attachView(c.hostView),
                new Hi([[u]], c.hostView, c)
              );
            }
            _setAriaHidden(n) {
              const i = n.parentElement;
              i &&
                n !== this._document.body &&
                (Array.from(i.children).forEach((o) => {
                  o !== n &&
                    "SCRIPT" !== o.nodeName &&
                    (this._ariaHiddenValues.set(
                      o,
                      o.getAttribute("aria-hidden")
                    ),
                    o.setAttribute("aria-hidden", "true"));
                }),
                this._setAriaHidden(i));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((n, i) => {
                n
                  ? i.setAttribute("aria-hidden", n)
                  : i.removeAttribute("aria-hidden");
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(n) {
              const i = () => {
                const o = this._modalRefs.indexOf(n);
                o > -1 &&
                  (this._modalRefs.splice(o, 1),
                  this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(n),
                this._activeInstances.emit(this._modalRefs),
                n.result.then(i, i);
            }
            _registerWindowCmpt(n) {
              this._windowCmpts.push(n),
                this._activeWindowCmptHasChanged.next(),
                n.onDestroy(() => {
                  const i = this._windowCmpts.indexOf(n);
                  i > -1 &&
                    (this._windowCmpts.splice(i, 1),
                    this._activeWindowCmptHasChanged.next());
                });
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(
                F(qr),
                F(Nt),
                F(Ht),
                F(at),
                F(e$),
                F(bh),
                F(de)
              );
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        n$ = (() => {
          var e;
          class t {
            constructor(n) {
              (this._ngbConfig = n),
                (this.backdrop = !0),
                (this.fullscreen = !1),
                (this.keyboard = !0);
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation;
            }
            set animation(n) {
              this._animation = n;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(Wu));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        r$ = (() => {
          var e;
          class t {
            constructor(n, i, o) {
              (this._injector = n), (this._modalStack = i), (this._config = o);
            }
            open(n, i = {}) {
              const o = {
                ...this._config,
                animation: this._config.animation,
                ...i,
              };
              return this._modalStack.open(this._injector, n, o);
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(n) {
              this._modalStack.dismissAll(n);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(Nt), F(t$), F(n$));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        cS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({ providers: [r$] })),
            t
          );
        })(),
        fS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        bS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        CS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        wS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        ES = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        SS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        IS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        TS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        MS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })();
      new U("live announcer delay", {
        providedIn: "root",
        factory: function D$() {
          return 100;
        },
      });
      let OS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })(),
        NS = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e })),
            (e.ɵinj = ge({})),
            t
          );
        })();
      const w$ = [
        RE,
        xE,
        FE,
        LE,
        iS,
        aS,
        cS,
        fS,
        NS,
        bS,
        CS,
        wS,
        ES,
        SS,
        IS,
        TS,
        MS,
        OS,
      ];
      let E$ = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({
            imports: [
              w$,
              RE,
              xE,
              FE,
              LE,
              iS,
              aS,
              cS,
              fS,
              NS,
              bS,
              CS,
              wS,
              ES,
              SS,
              IS,
              TS,
              MS,
              OS,
            ],
          })),
          t
        );
      })();
      function f_(...e) {
        const t = Ms(e),
          r = Pl(e),
          { args: n, keys: i } = tw(e);
        if (0 === n.length) return ft([], t);
        const o = new Ie(
          (function I$(e, t, r = xn) {
            return (n) => {
              AS(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let l = 0; l < i; l++)
                    AS(
                      t,
                      () => {
                        const c = ft(e[l], t);
                        let u = !1;
                        c.subscribe(
                          xe(
                            n,
                            (d) => {
                              (o[l] = d),
                                u || ((u = !0), a--),
                                a || n.next(r(o.slice()));
                            },
                            () => {
                              --s || n.complete();
                            }
                          )
                        );
                      },
                      n
                    );
                },
                n
              );
            };
          })(n, t, i ? (s) => nw(i, s) : xn)
        );
        return r ? o.pipe(yg(r)) : o;
      }
      function AS(e, t, r) {
        e ? mr(r, e, t) : t();
      }
      const sd = xr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function RS(e) {
        return new Ie((t) => {
          ut(e()).subscribe(t);
        });
      }
      function ti(e, t) {
        const r = re(e) ? e : () => e,
          n = (i) => i.error(r());
        return new Ie(t ? (i) => t.schedule(n, 0, i) : n);
      }
      function h_() {
        return Qe((e, t) => {
          let r = null;
          e._refCount++;
          const n = xe(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (r = null);
            const i = e._connection,
              o = r;
            (r = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(n), n.closed || (r = e.connect());
        });
      }
      class xS extends Ie {
        constructor(t, r) {
          super(),
            (this.source = t),
            (this.subjectFactory = r),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Al(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new je();
            const r = this.getSubject();
            t.add(
              this.source.subscribe(
                xe(
                  r,
                  void 0,
                  () => {
                    this._teardown(), r.complete();
                  },
                  (n) => {
                    this._teardown(), r.error(n);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = je.EMPTY));
          }
          return t;
        }
        refCount() {
          return h_()(this);
        }
      }
      function ad(e) {
        return Qe((t, r) => {
          let n = !1;
          t.subscribe(
            xe(
              r,
              (i) => {
                (n = !0), r.next(i);
              },
              () => {
                n || r.next(e), r.complete();
              }
            )
          );
        });
      }
      function PS(e = T$) {
        return Qe((t, r) => {
          let n = !1;
          t.subscribe(
            xe(
              r,
              (i) => {
                (n = !0), r.next(i);
              },
              () => (n ? r.complete() : r.error(e()))
            )
          );
        });
      }
      function T$() {
        return new sd();
      }
      function $i(e, t) {
        const r = arguments.length >= 2;
        return (n) =>
          n.pipe(
            e ? mt((i, o) => e(i, o, n)) : xn,
            Rt(1),
            r ? ad(t) : PS(() => new sd())
          );
      }
      function Nr(e) {
        return Qe((t, r) => {
          let o,
            n = null,
            i = !1;
          (n = t.subscribe(
            xe(r, void 0, void 0, (s) => {
              (o = ut(e(s, Nr(e)(t)))),
                n ? (n.unsubscribe(), (n = null), o.subscribe(r)) : (i = !0);
            })
          )),
            i && (n.unsubscribe(), (n = null), o.subscribe(r));
        });
      }
      function p_(e) {
        return e <= 0
          ? () => Dn
          : Qe((t, r) => {
              let n = [];
              t.subscribe(
                xe(
                  r,
                  (i) => {
                    n.push(i), e < n.length && n.shift();
                  },
                  () => {
                    for (const i of n) r.next(i);
                    r.complete();
                  },
                  void 0,
                  () => {
                    n = null;
                  }
                )
              );
            });
      }
      const ne = "primary",
        ol = Symbol("RouteTitle");
      class A$ {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const r = this.params[t];
            return Array.isArray(r) ? r[0] : r;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const r = this.params[t];
            return Array.isArray(r) ? r : [r];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function fs(e) {
        return new A$(e);
      }
      function R$(e, t, r) {
        const n = r.path.split("/");
        if (
          n.length > e.length ||
          ("full" === r.pathMatch && (t.hasChildren() || n.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < n.length; o++) {
          const s = n[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, n.length), posParams: i };
      }
      function hr(e, t) {
        const r = e ? Object.keys(e) : void 0,
          n = t ? Object.keys(t) : void 0;
        if (!r || !n || r.length != n.length) return !1;
        let i;
        for (let o = 0; o < r.length; o++)
          if (((i = r[o]), !kS(e[i], t[i]))) return !1;
        return !0;
      }
      function kS(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const r = [...e].sort(),
            n = [...t].sort();
          return r.every((i, o) => n[o] === i);
        }
        return e === t;
      }
      function FS(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function ni(e) {
        return (function S$(e) {
          return !!e && (e instanceof Ie || (re(e.lift) && re(e.subscribe)));
        })(e)
          ? e
          : ga(e)
          ? ft(Promise.resolve(e))
          : q(e);
      }
      const P$ = {
          exact: function BS(e, t, r) {
            if (
              !Gi(e.segments, t.segments) ||
              !ld(e.segments, t.segments, r) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const n in t.children)
              if (!e.children[n] || !BS(e.children[n], t.children[n], r))
                return !1;
            return !0;
          },
          subset: jS,
        },
        LS = {
          exact: function k$(e, t) {
            return hr(e, t);
          },
          subset: function F$(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((r) => kS(e[r], t[r]))
            );
          },
          ignored: () => !0,
        };
      function VS(e, t, r) {
        return (
          P$[r.paths](e.root, t.root, r.matrixParams) &&
          LS[r.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === r.fragment && e.fragment !== t.fragment)
        );
      }
      function jS(e, t, r) {
        return US(e, t, t.segments, r);
      }
      function US(e, t, r, n) {
        if (e.segments.length > r.length) {
          const i = e.segments.slice(0, r.length);
          return !(!Gi(i, r) || t.hasChildren() || !ld(i, r, n));
        }
        if (e.segments.length === r.length) {
          if (!Gi(e.segments, r) || !ld(e.segments, r, n)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !jS(e.children[i], t.children[i], n))
              return !1;
          return !0;
        }
        {
          const i = r.slice(0, e.segments.length),
            o = r.slice(e.segments.length);
          return (
            !!(Gi(e.segments, i) && ld(e.segments, i, n) && e.children[ne]) &&
            US(e.children[ne], t, o, n)
          );
        }
      }
      function ld(e, t, r) {
        return t.every((n, i) => LS[r](e[i].parameters, n.parameters));
      }
      class hs {
        constructor(t = new Re([], {}), r = {}, n = null) {
          (this.root = t), (this.queryParams = r), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = fs(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return B$.serialize(this);
        }
      }
      class Re {
        constructor(t, r) {
          (this.segments = t),
            (this.children = r),
            (this.parent = null),
            Object.values(r).forEach((n) => (n.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return cd(this);
        }
      }
      class sl {
        constructor(t, r) {
          (this.path = t), (this.parameters = r);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = fs(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return GS(this);
        }
      }
      function Gi(e, t) {
        return e.length === t.length && e.every((r, n) => r.path === t[n].path);
      }
      let al = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({
            token: e,
            factory: function () {
              return new g_();
            },
            providedIn: "root",
          })),
          t
        );
      })();
      class g_ {
        parse(t) {
          const r = new J$(t);
          return new hs(
            r.parseRootSegment(),
            r.parseQueryParams(),
            r.parseFragment()
          );
        }
        serialize(t) {
          const r = `/${ll(t.root, !0)}`,
            n = (function H$(e) {
              const t = Object.keys(e)
                .map((r) => {
                  const n = e[r];
                  return Array.isArray(n)
                    ? n.map((i) => `${ud(r)}=${ud(i)}`).join("&")
                    : `${ud(r)}=${ud(n)}`;
                })
                .filter((r) => !!r);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${r}${n}${
            "string" == typeof t.fragment
              ? `#${(function j$(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const B$ = new g_();
      function cd(e) {
        return e.segments.map((t) => GS(t)).join("/");
      }
      function ll(e, t) {
        if (!e.hasChildren()) return cd(e);
        if (t) {
          const r = e.children[ne] ? ll(e.children[ne], !1) : "",
            n = [];
          return (
            Object.entries(e.children).forEach(([i, o]) => {
              i !== ne && n.push(`${i}:${ll(o, !1)}`);
            }),
            n.length > 0 ? `${r}(${n.join("//")})` : r
          );
        }
        {
          const r = (function V$(e, t) {
            let r = [];
            return (
              Object.entries(e.children).forEach(([n, i]) => {
                n === ne && (r = r.concat(t(i, n)));
              }),
              Object.entries(e.children).forEach(([n, i]) => {
                n !== ne && (r = r.concat(t(i, n)));
              }),
              r
            );
          })(e, (n, i) =>
            i === ne ? [ll(e.children[ne], !1)] : [`${i}:${ll(n, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[ne]
            ? `${cd(e)}/${r[0]}`
            : `${cd(e)}/(${r.join("//")})`;
        }
      }
      function HS(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function ud(e) {
        return HS(e).replace(/%3B/gi, ";");
      }
      function __(e) {
        return HS(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function dd(e) {
        return decodeURIComponent(e);
      }
      function $S(e) {
        return dd(e.replace(/\+/g, "%20"));
      }
      function GS(e) {
        return `${__(e.path)}${(function U$(e) {
          return Object.keys(e)
            .map((t) => `;${__(t)}=${__(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const $$ = /^[^\/()?;#]+/;
      function m_(e) {
        const t = e.match($$);
        return t ? t[0] : "";
      }
      const G$ = /^[^\/()?;=#]+/,
        q$ = /^[^=?&#]+/,
        Y$ = /^[^&#]+/;
      class J$ {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Re([], {})
              : new Re([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let r = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (r = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(r).length > 0) &&
              (n[ne] = new Re(t, r)),
            n
          );
        }
        parseSegment() {
          const t = m_(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new N(4009, !1);
          return this.capture(t), new sl(dd(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const r = (function z$(e) {
            const t = e.match(G$);
            return t ? t[0] : "";
          })(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = "";
          if (this.consumeOptional("=")) {
            const i = m_(this.remaining);
            i && ((n = i), this.capture(n));
          }
          t[dd(r)] = dd(n);
        }
        parseQueryParam(t) {
          const r = (function W$(e) {
            const t = e.match(q$);
            return t ? t[0] : "";
          })(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = "";
          if (this.consumeOptional("=")) {
            const s = (function Z$(e) {
              const t = e.match(Y$);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((n = s), this.capture(n));
          }
          const i = $S(r),
            o = $S(n);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const r = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = m_(this.remaining),
              i = this.remaining[n.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new N(4010, !1);
            let o;
            n.indexOf(":") > -1
              ? ((o = n.slice(0, n.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = ne);
            const s = this.parseChildren();
            (r[o] = 1 === Object.keys(s).length ? s[ne] : new Re([], s)),
              this.consumeOptional("//");
          }
          return r;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new N(4011, !1);
        }
      }
      function zS(e) {
        return e.segments.length > 0 ? new Re([], { [ne]: e }) : e;
      }
      function qS(e) {
        const t = {};
        for (const n of Object.keys(e.children)) {
          const o = qS(e.children[n]);
          if (n === ne && 0 === o.segments.length && o.hasChildren())
            for (const [s, a] of Object.entries(o.children)) t[s] = a;
          else (o.segments.length > 0 || o.hasChildren()) && (t[n] = o);
        }
        return (function Q$(e) {
          if (1 === e.numberOfChildren && e.children[ne]) {
            const t = e.children[ne];
            return new Re(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new Re(e.segments, t));
      }
      function zi(e) {
        return e instanceof hs;
      }
      function WS(e) {
        let t;
        const i = zS(
          (function r(o) {
            const s = {};
            for (const l of o.children) {
              const c = r(l);
              s[l.outlet] = c;
            }
            const a = new Re(o.url, s);
            return o === e && (t = a), a;
          })(e.root)
        );
        return t ?? i;
      }
      function YS(e, t, r, n) {
        let i = e;
        for (; i.parent; ) i = i.parent;
        if (0 === t.length) return v_(i, i, i, r, n);
        const o = (function X$(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new JS(!0, 0, e);
          let t = 0,
            r = !1;
          const n = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Object.entries(o.outlets).forEach(([l, c]) => {
                    a[l] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
              ? (o.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (r = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, o];
          }, []);
          return new JS(r, t, n);
        })(t);
        if (o.toRoot()) return v_(i, i, new Re([], {}), r, n);
        const s = (function e8(e, t, r) {
            if (e.isAbsolute) return new hd(t, !0, 0);
            if (!r) return new hd(t, !1, NaN);
            if (null === r.parent) return new hd(r, !0, 0);
            const n = fd(e.commands[0]) ? 0 : 1;
            return (function t8(e, t, r) {
              let n = e,
                i = t,
                o = r;
              for (; o > i; ) {
                if (((o -= i), (n = n.parent), !n)) throw new N(4005, !1);
                i = n.segments.length;
              }
              return new hd(n, !1, i - o);
            })(r, r.segments.length - 1 + n, e.numberOfDoubleDots);
          })(o, i, e),
          a = s.processChildren
            ? ul(s.segmentGroup, s.index, o.commands)
            : QS(s.segmentGroup, s.index, o.commands);
        return v_(i, s.segmentGroup, a, r, n);
      }
      function fd(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function cl(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function v_(e, t, r, n, i) {
        let s,
          o = {};
        n &&
          Object.entries(n).forEach(([l, c]) => {
            o[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
          }),
          (s = e === t ? r : ZS(e, t, r));
        const a = zS(qS(s));
        return new hs(a, o, i);
      }
      function ZS(e, t, r) {
        const n = {};
        return (
          Object.entries(e.children).forEach(([i, o]) => {
            n[i] = o === t ? r : ZS(o, t, r);
          }),
          new Re(e.segments, n)
        );
      }
      class JS {
        constructor(t, r, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = r),
            (this.commands = n),
            t && n.length > 0 && fd(n[0]))
          )
            throw new N(4003, !1);
          const i = n.find(cl);
          if (i && i !== FS(n)) throw new N(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class hd {
        constructor(t, r, n) {
          (this.segmentGroup = t), (this.processChildren = r), (this.index = n);
        }
      }
      function QS(e, t, r) {
        if (
          (e || (e = new Re([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return ul(e, t, r);
        const n = (function r8(e, t, r) {
            let n = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (n >= r.length) return o;
              const s = e.segments[i],
                a = r[n];
              if (cl(a)) break;
              const l = `${a}`,
                c = n < r.length - 1 ? r[n + 1] : null;
              if (i > 0 && void 0 === l) break;
              if (l && c && "object" == typeof c && void 0 === c.outlets) {
                if (!XS(l, c, s)) return o;
                n += 2;
              } else {
                if (!XS(l, {}, s)) return o;
                n++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: n };
          })(e, t, r),
          i = r.slice(n.commandIndex);
        if (n.match && n.pathIndex < e.segments.length) {
          const o = new Re(e.segments.slice(0, n.pathIndex), {});
          return (
            (o.children[ne] = new Re(
              e.segments.slice(n.pathIndex),
              e.children
            )),
            ul(o, 0, i)
          );
        }
        return n.match && 0 === i.length
          ? new Re(e.segments, {})
          : n.match && !e.hasChildren()
          ? y_(e, t, r)
          : n.match
          ? ul(e, 0, i)
          : y_(e, t, r);
      }
      function ul(e, t, r) {
        if (0 === r.length) return new Re(e.segments, {});
        {
          const n = (function n8(e) {
              return cl(e[0]) ? e[0].outlets : { [ne]: e };
            })(r),
            i = {};
          if (
            Object.keys(n).some((o) => o !== ne) &&
            e.children[ne] &&
            1 === e.numberOfChildren &&
            0 === e.children[ne].segments.length
          ) {
            const o = ul(e.children[ne], t, r);
            return new Re(e.segments, o.children);
          }
          return (
            Object.entries(n).forEach(([o, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = QS(e.children[o], t, s));
            }),
            Object.entries(e.children).forEach(([o, s]) => {
              void 0 === n[o] && (i[o] = s);
            }),
            new Re(e.segments, i)
          );
        }
      }
      function y_(e, t, r) {
        const n = e.segments.slice(0, t);
        let i = 0;
        for (; i < r.length; ) {
          const o = r[i];
          if (cl(o)) {
            const l = i8(o.outlets);
            return new Re(n, l);
          }
          if (0 === i && fd(r[0])) {
            n.push(new sl(e.segments[t].path, KS(r[0]))), i++;
            continue;
          }
          const s = cl(o) ? o.outlets[ne] : `${o}`,
            a = i < r.length - 1 ? r[i + 1] : null;
          s && a && fd(a)
            ? (n.push(new sl(s, KS(a))), (i += 2))
            : (n.push(new sl(s, {})), i++);
        }
        return new Re(n, {});
      }
      function i8(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([r, n]) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = y_(new Re([], {}), 0, n));
          }),
          t
        );
      }
      function KS(e) {
        const t = {};
        return Object.entries(e).forEach(([r, n]) => (t[r] = `${n}`)), t;
      }
      function XS(e, t, r) {
        return e == r.path && hr(t, r.parameters);
      }
      const dl = "imperative";
      class pr {
        constructor(t, r) {
          (this.id = t), (this.url = r);
        }
      }
      class pd extends pr {
        constructor(t, r, n = "imperative", i = null) {
          super(t, r),
            (this.type = 0),
            (this.navigationTrigger = n),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ri extends pr {
        constructor(t, r, n) {
          super(t, r), (this.urlAfterRedirects = n), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class fl extends pr {
        constructor(t, r, n, i) {
          super(t, r), (this.reason = n), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class ps extends pr {
        constructor(t, r, n, i) {
          super(t, r), (this.reason = n), (this.code = i), (this.type = 16);
        }
      }
      class gd extends pr {
        constructor(t, r, n, i) {
          super(t, r), (this.error = n), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class eI extends pr {
        constructor(t, r, n, i) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class o8 extends pr {
        constructor(t, r, n, i) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class s8 extends pr {
        constructor(t, r, n, i, o) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class a8 extends pr {
        constructor(t, r, n, i) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class l8 extends pr {
        constructor(t, r, n, i) {
          super(t, r),
            (this.urlAfterRedirects = n),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class c8 {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class u8 {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class d8 {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class f8 {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class h8 {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class p8 {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class tI {
        constructor(t, r, n) {
          (this.routerEvent = t),
            (this.position = r),
            (this.anchor = n),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class b_ {}
      class D_ {
        constructor(t) {
          this.url = t;
        }
      }
      class g8 {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new hl()),
            (this.attachRef = null);
        }
      }
      let hl = (() => {
        var e;
        class t {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, i) {
            const o = this.getOrCreateContext(n);
            (o.outlet = i), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const i = this.getContext(n);
            i && ((i.outlet = null), (i.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let i = this.getContext(n);
            return i || ((i = new g8()), this.contexts.set(n, i)), i;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class nI {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const r = this.pathFromRoot(t);
          return r.length > 1 ? r[r.length - 2] : null;
        }
        children(t) {
          const r = C_(t, this._root);
          return r ? r.children.map((n) => n.value) : [];
        }
        firstChild(t) {
          const r = C_(t, this._root);
          return r && r.children.length > 0 ? r.children[0].value : null;
        }
        siblings(t) {
          const r = w_(t, this._root);
          return r.length < 2
            ? []
            : r[r.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return w_(t, this._root).map((r) => r.value);
        }
      }
      function C_(e, t) {
        if (e === t.value) return t;
        for (const r of t.children) {
          const n = C_(e, r);
          if (n) return n;
        }
        return null;
      }
      function w_(e, t) {
        if (e === t.value) return [t];
        for (const r of t.children) {
          const n = w_(e, r);
          if (n.length) return n.unshift(t), n;
        }
        return [];
      }
      class Ar {
        constructor(t, r) {
          (this.value = t), (this.children = r);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function gs(e) {
        const t = {};
        return e && e.children.forEach((r) => (t[r.value.outlet] = r)), t;
      }
      class rI extends nI {
        constructor(t, r) {
          super(t), (this.snapshot = r), E_(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function iI(e, t) {
        const r = (function _8(e, t) {
            const s = new _d([], {}, {}, "", {}, ne, t, null, {});
            return new sI("", new Ar(s, []));
          })(0, t),
          n = new St([new sl("", {})]),
          i = new St({}),
          o = new St({}),
          s = new St({}),
          a = new St(""),
          l = new _s(n, i, s, a, o, ne, t, r.root);
        return (l.snapshot = r.root), new rI(new Ar(l, []), r);
      }
      class _s {
        constructor(t, r, n, i, o, s, a, l) {
          (this.urlSubject = t),
            (this.paramsSubject = r),
            (this.queryParamsSubject = n),
            (this.fragmentSubject = i),
            (this.dataSubject = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = l),
            (this.title =
              this.dataSubject?.pipe(se((c) => c[ol])) ?? q(void 0)),
            (this.url = t),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = o);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(se((t) => fs(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(se((t) => fs(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function oI(e, t = "emptyOnly") {
        const r = e.pathFromRoot;
        let n = 0;
        if ("always" !== t)
          for (n = r.length - 1; n >= 1; ) {
            const i = r[n],
              o = r[n - 1];
            if (i.routeConfig && "" === i.routeConfig.path) n--;
            else {
              if (o.component) break;
              n--;
            }
          }
        return (function m8(e) {
          return e.reduce(
            (t, r) => ({
              params: { ...t.params, ...r.params },
              data: { ...t.data, ...r.data },
              resolve: {
                ...r.data,
                ...t.resolve,
                ...r.routeConfig?.data,
                ...r._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(r.slice(n));
      }
      class _d {
        get title() {
          return this.data?.[ol];
        }
        constructor(t, r, n, i, o, s, a, l, c) {
          (this.url = t),
            (this.params = r),
            (this.queryParams = n),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = fs(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = fs(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((n) => n.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class sI extends nI {
        constructor(t, r) {
          super(r), (this.url = t), E_(this, r);
        }
        toString() {
          return aI(this._root);
        }
      }
      function E_(e, t) {
        (t.value._routerState = e), t.children.forEach((r) => E_(e, r));
      }
      function aI(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(aI).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function S_(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            r = e._futureSnapshot;
          (e.snapshot = r),
            hr(t.queryParams, r.queryParams) ||
              e.queryParamsSubject.next(r.queryParams),
            t.fragment !== r.fragment && e.fragmentSubject.next(r.fragment),
            hr(t.params, r.params) || e.paramsSubject.next(r.params),
            (function x$(e, t) {
              if (e.length !== t.length) return !1;
              for (let r = 0; r < e.length; ++r) if (!hr(e[r], t[r])) return !1;
              return !0;
            })(t.url, r.url) || e.urlSubject.next(r.url),
            hr(t.data, r.data) || e.dataSubject.next(r.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function I_(e, t) {
        const r =
          hr(e.params, t.params) &&
          (function L$(e, t) {
            return (
              Gi(e, t) && e.every((r, n) => hr(r.parameters, t[n].parameters))
            );
          })(e.url, t.url);
        return (
          r &&
          !(!e.parent != !t.parent) &&
          (!e.parent || I_(e.parent, t.parent))
        );
      }
      let T_ = (() => {
        var e;
        class t {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = ne),
              (this.activateEvents = new z()),
              (this.deactivateEvents = new z()),
              (this.attachEvents = new z()),
              (this.detachEvents = new z()),
              (this.parentContexts = V(hl)),
              (this.location = V(Mn)),
              (this.changeDetector = V(Hn)),
              (this.environmentInjector = V(Ht)),
              (this.inputBinder = V(md, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: i, previousValue: o } = n.name;
              if (i) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new N(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new N(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new N(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, i) {
            (this.activated = n),
              (this._activatedRoute = i),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, i) {
            if (this.isActivated) throw new N(4013, !1);
            this._activatedRoute = n;
            const o = this.location,
              a = n.snapshot.component,
              l = this.parentContexts.getOrCreateContext(this.name).children,
              c = new v8(n, l, o.injector);
            (this.activated = o.createComponent(a, {
              index: o.length,
              injector: c,
              environmentInjector: i ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Mt],
          })),
          t
        );
      })();
      class v8 {
        constructor(t, r, n) {
          (this.route = t), (this.childContexts = r), (this.parent = n);
        }
        get(t, r) {
          return t === _s
            ? this.route
            : t === hl
            ? this.childContexts
            : this.parent.get(t, r);
        }
      }
      const md = new U("");
      let lI = (() => {
        var e;
        class t {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: i } = n,
              o = f_([i.queryParams, i.params, i.data])
                .pipe(
                  Cn(
                    ([s, a, l], c) => (
                      (l = { ...s, ...a, ...l }),
                      0 === c ? q(l) : Promise.resolve(l)
                    )
                  )
                )
                .subscribe((s) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== i ||
                    null === i.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const a = (function KF(e) {
                    const t = ce(e);
                    if (!t) return null;
                    const r = new ca(t);
                    return {
                      get selector() {
                        return r.selector;
                      },
                      get type() {
                        return r.componentType;
                      },
                      get inputs() {
                        return r.inputs;
                      },
                      get outputs() {
                        return r.outputs;
                      },
                      get ngContentSelectors() {
                        return r.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(i.component);
                  if (a)
                    for (const { templateName: l } of a.inputs)
                      n.activatedComponentRef.setInput(l, s[l]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, o);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function pl(e, t, r) {
        if (r && e.shouldReuseRoute(t.value, r.value.snapshot)) {
          const n = r.value;
          n._futureSnapshot = t.value;
          const i = (function b8(e, t, r) {
            return t.children.map((n) => {
              for (const i of r.children)
                if (e.shouldReuseRoute(n.value, i.value.snapshot))
                  return pl(e, n, i);
              return pl(e, n);
            });
          })(e, t, r);
          return new Ar(n, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => pl(e, a))),
                s
              );
            }
          }
          const n = (function D8(e) {
              return new _s(
                new St(e.url),
                new St(e.params),
                new St(e.queryParams),
                new St(e.fragment),
                new St(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => pl(e, o));
          return new Ar(n, i);
        }
      }
      const M_ = "ngNavigationCancelingError";
      function cI(e, t) {
        const { redirectTo: r, navigationBehaviorOptions: n } = zi(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = uI(!1, 0, t);
        return (i.url = r), (i.navigationBehaviorOptions = n), i;
      }
      function uI(e, t, r) {
        const n = new Error("NavigationCancelingError: " + (e || ""));
        return (n[M_] = !0), (n.cancellationCode = t), r && (n.url = r), n;
      }
      function dI(e) {
        return e && e[M_];
      }
      let fI = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Ge({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Tn],
            decls: 1,
            vars: 0,
            template: function (n, i) {
              1 & n && We(0, "router-outlet");
            },
            dependencies: [T_],
            encapsulation: 2,
          })),
          t
        );
      })();
      function O_(e) {
        const t = e.children && e.children.map(O_),
          r = t ? { ...e, children: t } : { ...e };
        return (
          !r.component &&
            !r.loadComponent &&
            (t || r.loadChildren) &&
            r.outlet &&
            r.outlet !== ne &&
            (r.component = fI),
          r
        );
      }
      function Yn(e) {
        return e.outlet || ne;
      }
      function gl(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const r = t.routeConfig;
          if (r?._loadedInjector) return r._loadedInjector;
          if (r?._injector) return r._injector;
        }
        return null;
      }
      class O8 {
        constructor(t, r, n, i, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = r),
            (this.currState = n),
            (this.forwardEvent = i),
            (this.inputBindingEnabled = o);
        }
        activate(t) {
          const r = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(r, n, t),
            S_(this.futureState.root),
            this.activateChildRoutes(r, n, t);
        }
        deactivateChildRoutes(t, r, n) {
          const i = gs(r);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], n), delete i[s];
          }),
            Object.values(i).forEach((o) => {
              this.deactivateRouteAndItsChildren(o, n);
            });
        }
        deactivateRoutes(t, r, n) {
          const i = t.value,
            o = r ? r.value : null;
          if (i === o)
            if (i.component) {
              const s = n.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, r, s.children);
            } else this.deactivateChildRoutes(t, r, n);
          else o && this.deactivateRouteAndItsChildren(r, n);
        }
        deactivateRouteAndItsChildren(t, r) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, r)
            : this.deactivateRouteAndOutlet(t, r);
        }
        detachAndStoreRouteSubtree(t, r) {
          const n = r.getContext(t.value.outlet),
            i = n && t.value.component ? n.children : r,
            o = gs(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (n && n.outlet) {
            const s = n.outlet.detach(),
              a = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, r) {
          const n = r.getContext(t.value.outlet),
            i = n && t.value.component ? n.children : r,
            o = gs(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          n &&
            (n.outlet &&
              (n.outlet.deactivate(), n.children.onOutletDeactivated()),
            (n.attachRef = null),
            (n.route = null));
        }
        activateChildRoutes(t, r, n) {
          const i = gs(r);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], n),
              this.forwardEvent(new p8(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new f8(t.value.snapshot));
        }
        activateRoutes(t, r, n) {
          const i = t.value,
            o = r ? r.value : null;
          if ((S_(i), i === o))
            if (i.component) {
              const s = n.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, r, s.children);
            } else this.activateChildRoutes(t, r, n);
          else if (i.component) {
            const s = n.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                S_(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = gl(i.snapshot);
              (s.attachRef = null),
                (s.route = i),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      class hI {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class vd {
        constructor(t, r) {
          (this.component = t), (this.route = r);
        }
      }
      function N8(e, t, r) {
        const n = e._root;
        return _l(n, t ? t._root : null, r, [n.value]);
      }
      function ms(e, t) {
        const r = Symbol(),
          n = t.get(e, r);
        return n === r
          ? "function" != typeof e ||
            (function bT(e) {
              return null !== Ll(e);
            })(e)
            ? t.get(e)
            : e
          : n;
      }
      function _l(
        e,
        t,
        r,
        n,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = gs(t);
        return (
          e.children.forEach((s) => {
            (function R8(
              e,
              t,
              r,
              n,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = r ? r.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const l = (function x8(e, t, r) {
                  if ("function" == typeof r) return r(e, t);
                  switch (r) {
                    case "pathParamsChange":
                      return !Gi(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Gi(e.url, t.url) || !hr(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !I_(e, t) || !hr(e.queryParams, t.queryParams);
                    default:
                      return !I_(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                l
                  ? i.canActivateChecks.push(new hI(n))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  _l(e, t, o.component ? (a ? a.children : null) : r, n, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new vd(a.outlet.component, s));
              } else
                s && ml(t, a, i),
                  i.canActivateChecks.push(new hI(n)),
                  _l(e, null, o.component ? (a ? a.children : null) : r, n, i);
            })(s, o[s.value.outlet], r, n.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Object.entries(o).forEach(([s, a]) => ml(a, r.getContext(s), i)),
          i
        );
      }
      function ml(e, t, r) {
        const n = gs(e),
          i = e.value;
        Object.entries(n).forEach(([o, s]) => {
          ml(s, i.component ? (t ? t.children.getContext(o) : null) : t, r);
        }),
          r.canDeactivateChecks.push(
            new vd(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function vl(e) {
        return "function" == typeof e;
      }
      function pI(e) {
        return e instanceof sd || "EmptyError" === e?.name;
      }
      const yd = Symbol("INITIAL_VALUE");
      function vs() {
        return Cn((e) =>
          f_(
            e.map((t) =>
              t.pipe(
                Rt(1),
                (function ew(...e) {
                  const t = Ms(e);
                  return Qe((r, n) => {
                    (t ? Ba(e, r, t) : Ba(e, r)).subscribe(n);
                  });
                })(yd)
              )
            )
          ).pipe(
            se((t) => {
              for (const r of t)
                if (!0 !== r) {
                  if (r === yd) return yd;
                  if (!1 === r || r instanceof hs) return r;
                }
              return !0;
            }),
            mt((t) => t !== yd),
            Rt(1)
          )
        );
      }
      function gI(e) {
        return (function Tl(...e) {
          return Ml(e);
        })(
          Ct((t) => {
            if (zi(t)) throw cI(0, t);
          }),
          se((t) => !0 === t)
        );
      }
      class bd {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class _I {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ys(e) {
        return ti(new bd(e));
      }
      function mI(e) {
        return ti(new _I(e));
      }
      class X8 {
        constructor(t, r) {
          (this.urlSerializer = t), (this.urlTree = r);
        }
        noMatchError(t) {
          return new N(4002, !1);
        }
        lineralizeSegments(t, r) {
          let n = [],
            i = r.root;
          for (;;) {
            if (((n = n.concat(i.segments)), 0 === i.numberOfChildren))
              return q(n);
            if (i.numberOfChildren > 1 || !i.children[ne])
              return ti(new N(4e3, !1));
            i = i.children[ne];
          }
        }
        applyRedirectCommands(t, r, n) {
          return this.applyRedirectCreateUrlTree(
            r,
            this.urlSerializer.parse(r),
            t,
            n
          );
        }
        applyRedirectCreateUrlTree(t, r, n, i) {
          const o = this.createSegmentGroup(t, r.root, n, i);
          return new hs(
            o,
            this.createQueryParams(r.queryParams, this.urlTree.queryParams),
            r.fragment
          );
        }
        createQueryParams(t, r) {
          const n = {};
          return (
            Object.entries(t).forEach(([i, o]) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                n[i] = r[a];
              } else n[i] = o;
            }),
            n
          );
        }
        createSegmentGroup(t, r, n, i) {
          const o = this.createSegments(t, r.segments, n, i);
          let s = {};
          return (
            Object.entries(r.children).forEach(([a, l]) => {
              s[a] = this.createSegmentGroup(t, l, n, i);
            }),
            new Re(o, s)
          );
        }
        createSegments(t, r, n, i) {
          return r.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, n)
          );
        }
        findPosParam(t, r, n) {
          const i = n[r.path.substring(1)];
          if (!i) throw new N(4001, !1);
          return i;
        }
        findOrReturn(t, r) {
          let n = 0;
          for (const i of r) {
            if (i.path === t.path) return r.splice(n), i;
            n++;
          }
          return t;
        }
      }
      const N_ = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function e5(e, t, r, n, i) {
        const o = A_(e, t, r);
        return o.matched
          ? ((n = (function w8(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = op(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, n)),
            (function J8(e, t, r, n) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? q(
                    i.map((s) => {
                      const a = ms(s, e);
                      return ni(
                        (function B8(e) {
                          return e && vl(e.canMatch);
                        })(a)
                          ? a.canMatch(t, r)
                          : e.runInContext(() => a(t, r))
                      );
                    })
                  ).pipe(vs(), gI())
                : q(!0);
            })(n, t, r).pipe(se((s) => (!0 === s ? o : { ...N_ }))))
          : q(o);
      }
      function A_(e, t, r) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || r.length > 0)
            ? { ...N_ }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: r,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || R$)(r, e, t);
        if (!i) return { ...N_ };
        const o = {};
        Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
          o[a] = l.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: r.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function vI(e, t, r, n) {
        return r.length > 0 &&
          (function r5(e, t, r) {
            return r.some((n) => Dd(e, t, n) && Yn(n) !== ne);
          })(e, r, n)
          ? {
              segmentGroup: new Re(t, n5(n, new Re(r, e.children))),
              slicedSegments: [],
            }
          : 0 === r.length &&
            (function i5(e, t, r) {
              return r.some((n) => Dd(e, t, n));
            })(e, r, n)
          ? {
              segmentGroup: new Re(e.segments, t5(e, 0, r, n, e.children)),
              slicedSegments: r,
            }
          : { segmentGroup: new Re(e.segments, e.children), slicedSegments: r };
      }
      function t5(e, t, r, n, i) {
        const o = {};
        for (const s of n)
          if (Dd(e, r, s) && !i[Yn(s)]) {
            const a = new Re([], {});
            o[Yn(s)] = a;
          }
        return { ...i, ...o };
      }
      function n5(e, t) {
        const r = {};
        r[ne] = t;
        for (const n of e)
          if ("" === n.path && Yn(n) !== ne) {
            const i = new Re([], {});
            r[Yn(n)] = i;
          }
        return r;
      }
      function Dd(e, t, r) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== r.pathMatch) &&
          "" === r.path
        );
      }
      class l5 {
        constructor(t, r, n, i, o, s, a) {
          (this.injector = t),
            (this.configLoader = r),
            (this.rootComponentType = n),
            (this.config = i),
            (this.urlTree = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new X8(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new N(4002, !1);
        }
        recognize() {
          const t = vI(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            ne
          ).pipe(
            Nr((r) => {
              if (r instanceof _I)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = r.urlTree),
                  this.match(r.urlTree)
                );
              throw r instanceof bd ? this.noMatchError(r) : r;
            }),
            se((r) => {
              const n = new _d(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  ne,
                  this.rootComponentType,
                  null,
                  {}
                ),
                i = new Ar(n, r),
                o = new sI("", i),
                s = (function K$(e, t, r = null, n = null) {
                  return YS(WS(e), t, r, n);
                })(n, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (o.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(o._root),
                { state: o, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            ne
          ).pipe(
            Nr((n) => {
              throw n instanceof bd ? this.noMatchError(n) : n;
            })
          );
        }
        inheritParamsAndData(t) {
          const r = t.value,
            n = oI(r, this.paramsInheritanceStrategy);
          (r.params = Object.freeze(n.params)),
            (r.data = Object.freeze(n.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, r, n, i) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, r, n)
            : this.processSegment(t, r, n, n.segments, i, !0);
        }
        processChildren(t, r, n) {
          const i = [];
          for (const o of Object.keys(n.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return ft(i).pipe(
            Qo((o) => {
              const s = n.children[o],
                a = (function T8(e, t) {
                  const r = e.filter((n) => Yn(n) === t);
                  return r.push(...e.filter((n) => Yn(n) !== t)), r;
                })(r, o);
              return this.processSegmentGroup(t, a, s, o);
            }),
            (function O$(e, t) {
              return Qe(
                (function M$(e, t, r, n, i) {
                  return (o, s) => {
                    let a = r,
                      l = t,
                      c = 0;
                    o.subscribe(
                      xe(
                        s,
                        (u) => {
                          const d = c++;
                          (l = a ? e(l, u, d) : ((a = !0), u)), n && s.next(l);
                        },
                        i &&
                          (() => {
                            a && s.next(l), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((o, s) => (o.push(...s), o)),
            ad(null),
            (function N$(e, t) {
              const r = arguments.length >= 2;
              return (n) =>
                n.pipe(
                  e ? mt((i, o) => e(i, o, n)) : xn,
                  p_(1),
                  r ? ad(t) : PS(() => new sd())
                );
            })(),
            dt((o) => {
              if (null === o) return ys(n);
              const s = yI(o);
              return (
                (function c5(e) {
                  e.sort((t, r) =>
                    t.value.outlet === ne
                      ? -1
                      : r.value.outlet === ne
                      ? 1
                      : t.value.outlet.localeCompare(r.value.outlet)
                  );
                })(s),
                q(s)
              );
            })
          );
        }
        processSegment(t, r, n, i, o, s) {
          return ft(r).pipe(
            Qo((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                r,
                a,
                n,
                i,
                o,
                s
              ).pipe(
                Nr((l) => {
                  if (l instanceof bd) return q(null);
                  throw l;
                })
              )
            ),
            $i((a) => !!a),
            Nr((a) => {
              if (pI(a))
                return (function s5(e, t, r) {
                  return 0 === t.length && !e.children[r];
                })(n, i, o)
                  ? q([])
                  : ys(n);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, r, n, i, o, s, a) {
          return (function o5(e, t, r, n) {
            return (
              !!(Yn(e) === n || (n !== ne && Dd(t, r, e))) &&
              ("**" === e.path || A_(t, e, r).matched)
            );
          })(n, i, o, s)
            ? void 0 === n.redirectTo
              ? this.matchSegmentAgainstRoute(t, i, n, o, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, i, r, n, o, s)
              : ys(i)
            : ys(i);
        }
        expandSegmentAgainstRouteUsingRedirect(t, r, n, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                r,
                n,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, n, i) {
          const o = this.applyRedirects.applyRedirectCommands(
            [],
            n.redirectTo,
            {}
          );
          return n.redirectTo.startsWith("/")
            ? mI(o)
            : this.applyRedirects.lineralizeSegments(n, o).pipe(
                dt((s) => {
                  const a = new Re(s, {});
                  return this.processSegment(t, r, a, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, r, n, i, o, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: c,
            positionalParamSegments: u,
          } = A_(r, i, o);
          if (!a) return ys(r);
          const d = this.applyRedirects.applyRedirectCommands(
            l,
            i.redirectTo,
            u
          );
          return i.redirectTo.startsWith("/")
            ? mI(d)
            : this.applyRedirects
                .lineralizeSegments(i, d)
                .pipe(
                  dt((f) => this.processSegment(t, n, r, f.concat(c), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, r, n, i, o, s) {
          let a;
          if ("**" === n.path) {
            const l = i.length > 0 ? FS(i).parameters : {};
            (a = q({
              snapshot: new _d(
                i,
                l,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                bI(n),
                Yn(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                DI(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (r.children = {});
          } else
            a = e5(r, n, i, t).pipe(
              se(
                ({
                  matched: l,
                  consumedSegments: c,
                  remainingSegments: u,
                  parameters: d,
                }) =>
                  l
                    ? {
                        snapshot: new _d(
                          c,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          bI(n),
                          Yn(n),
                          n.component ?? n._loadedComponent ?? null,
                          n,
                          DI(n)
                        ),
                        consumedSegments: c,
                        remainingSegments: u,
                      }
                    : null
              )
            );
          return a.pipe(
            Cn((l) =>
              null === l
                ? ys(r)
                : this.getChildConfig((t = n._injector ?? t), n, i).pipe(
                    Cn(({ routes: c }) => {
                      const u = n._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = l,
                        { segmentGroup: p, slicedSegments: _ } = vI(r, f, h, c);
                      if (0 === _.length && p.hasChildren())
                        return this.processChildren(u, c, p).pipe(
                          se((D) => (null === D ? null : [new Ar(d, D)]))
                        );
                      if (0 === c.length && 0 === _.length)
                        return q([new Ar(d, [])]);
                      const m = Yn(n) === o;
                      return this.processSegment(
                        u,
                        c,
                        p,
                        _,
                        m ? ne : o,
                        !0
                      ).pipe(se((D) => [new Ar(d, D)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, r, n) {
          return r.children
            ? q({ routes: r.children, injector: t })
            : r.loadChildren
            ? void 0 !== r._loadedRoutes
              ? q({ routes: r._loadedRoutes, injector: r._loadedInjector })
              : (function Z8(e, t, r, n) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? q(!0)
                    : q(
                        i.map((s) => {
                          const a = ms(s, e);
                          return ni(
                            (function k8(e) {
                              return e && vl(e.canLoad);
                            })(a)
                              ? a.canLoad(t, r)
                              : e.runInContext(() => a(t, r))
                          );
                        })
                      ).pipe(vs(), gI());
                })(t, r, n).pipe(
                  dt((i) =>
                    i
                      ? this.configLoader.loadChildren(t, r).pipe(
                          Ct((o) => {
                            (r._loadedRoutes = o.routes),
                              (r._loadedInjector = o.injector);
                          })
                        )
                      : (function K8(e) {
                          return ti(uI(!1, 3));
                        })()
                  )
                )
            : q({ routes: [], injector: t });
        }
      }
      function u5(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function yI(e) {
        const t = [],
          r = new Set();
        for (const n of e) {
          if (!u5(n)) {
            t.push(n);
            continue;
          }
          const i = t.find((o) => n.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...n.children), r.add(i)) : t.push(n);
        }
        for (const n of r) {
          const i = yI(n.children);
          t.push(new Ar(n.value, i));
        }
        return t.filter((n) => !r.has(n));
      }
      function bI(e) {
        return e.data || {};
      }
      function DI(e) {
        return e.resolve || {};
      }
      function f5(e, t) {
        return dt((r) => {
          const {
            targetSnapshot: n,
            guards: { canActivateChecks: i },
          } = r;
          if (!i.length) return q(r);
          let o = 0;
          return ft(i).pipe(
            Qo((s) =>
              (function h5(e, t, r, n) {
                const i = e.routeConfig,
                  o = e._resolve;
                return (
                  void 0 !== i?.title && !CI(i) && (o[ol] = i.title),
                  (function p5(e, t, r, n) {
                    const i = (function g5(e) {
                      return [
                        ...Object.keys(e),
                        ...Object.getOwnPropertySymbols(e),
                      ];
                    })(e);
                    if (0 === i.length) return q({});
                    const o = {};
                    return ft(i).pipe(
                      dt((s) =>
                        (function _5(e, t, r, n) {
                          const i = gl(t) ?? n,
                            o = ms(e, i);
                          return ni(
                            o.resolve
                              ? o.resolve(t, r)
                              : i.runInContext(() => o(t, r))
                          );
                        })(e[s], t, r, n).pipe(
                          $i(),
                          Ct((a) => {
                            o[s] = a;
                          })
                        )
                      ),
                      p_(1),
                      (function KC(e) {
                        return se(() => e);
                      })(o),
                      Nr((s) => (pI(s) ? Dn : ti(s)))
                    );
                  })(o, e, t, n).pipe(
                    se(
                      (s) => (
                        (e._resolvedData = s),
                        (e.data = oI(e, r).resolve),
                        i && CI(i) && (e.data[ol] = i.title),
                        null
                      )
                    )
                  )
                );
              })(s.route, n, e, t)
            ),
            Ct(() => o++),
            p_(1),
            dt((s) => (o === i.length ? q(r) : Dn))
          );
        });
      }
      function CI(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function R_(e) {
        return Cn((t) => {
          const r = e(t);
          return r ? ft(r).pipe(se(() => t)) : q(t);
        });
      }
      const bs = new U("ROUTES");
      let x_ = (() => {
        var e;
        class t {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = V(Xb));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return q(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const i = ni(n.loadComponent()).pipe(
                se(wI),
                Ct((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = s);
                }),
                ka(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new xS(i, () => new ve()).pipe(h_());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, i) {
            if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
            if (i._loadedRoutes)
              return q({
                routes: i._loadedRoutes,
                injector: i._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(i);
            const s = this.loadModuleFactoryOrRoutes(i.loadChildren).pipe(
                se((l) => {
                  this.onLoadEndListener && this.onLoadEndListener(i);
                  let c, u;
                  return (
                    Array.isArray(l)
                      ? (u = l)
                      : ((c = l.create(n).injector),
                        (u = c.get(bs, [], ie.Self | ie.Optional).flat())),
                    { routes: u.map(O_), injector: c }
                  );
                }),
                ka(() => {
                  this.childrenLoaders.delete(i);
                })
              ),
              a = new xS(s, () => new ve()).pipe(h_());
            return this.childrenLoaders.set(i, a), a;
          }
          loadModuleFactoryOrRoutes(n) {
            return ni(n()).pipe(
              se(wI),
              dt((i) =>
                i instanceof ab || Array.isArray(i)
                  ? q(i)
                  : ft(this.compiler.compileModuleAsync(i))
              )
            );
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function wI(e) {
        return (function m5(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Cd = (() => {
        var e;
        class t {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new ve()),
              (this.transitionAbortSubject = new ve()),
              (this.configLoader = V(x_)),
              (this.environmentInjector = V(Ht)),
              (this.urlSerializer = V(al)),
              (this.rootContexts = V(hl)),
              (this.inputBindingEnabled = null !== V(md, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => q(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new u8(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new c8(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const i = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: i });
          }
          setupNavigations(n, i, o) {
            return (
              (this.transitions = new St({
                id: 0,
                currentUrlTree: i,
                currentRawUrl: i,
                currentBrowserUrl: i,
                extractedUrl: n.urlHandlingStrategy.extract(i),
                urlAfterRedirects: n.urlHandlingStrategy.extract(i),
                rawUrl: i,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: dl,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                mt((s) => 0 !== s.id),
                se((s) => ({
                  ...s,
                  extractedUrl: n.urlHandlingStrategy.extract(s.rawUrl),
                })),
                Cn((s) => {
                  this.currentTransition = s;
                  let a = !1,
                    l = !1;
                  return q(s).pipe(
                    Ct((c) => {
                      this.currentNavigation = {
                        id: c.id,
                        initialUrl: c.rawUrl,
                        extractedUrl: c.extractedUrl,
                        trigger: c.source,
                        extras: c.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Cn((c) => {
                      const u = c.currentBrowserUrl.toString(),
                        d =
                          !n.navigated ||
                          c.extractedUrl.toString() !== u ||
                          u !== c.currentUrlTree.toString();
                      if (
                        !d &&
                        "reload" !==
                          (c.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const h = "";
                        return (
                          this.events.next(
                            new ps(
                              c.id,
                              this.urlSerializer.serialize(c.rawUrl),
                              h,
                              0
                            )
                          ),
                          c.resolve(null),
                          Dn
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                        return q(c).pipe(
                          Cn((h) => {
                            const p = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new pd(
                                  h.id,
                                  this.urlSerializer.serialize(h.extractedUrl),
                                  h.source,
                                  h.restoredState
                                )
                              ),
                              p !== this.transitions?.getValue()
                                ? Dn
                                : Promise.resolve(h)
                            );
                          }),
                          (function d5(e, t, r, n, i, o) {
                            return dt((s) =>
                              (function a5(e, t, r, n, i, o, s = "emptyOnly") {
                                return new l5(e, t, r, n, i, s, o).recognize();
                              })(e, t, r, n, s.extractedUrl, i, o).pipe(
                                se(({ state: a, tree: l }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: l,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            n.paramsInheritanceStrategy
                          ),
                          Ct((h) => {
                            (s.targetSnapshot = h.targetSnapshot),
                              (s.urlAfterRedirects = h.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: h.urlAfterRedirects,
                              });
                            const p = new eI(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              this.urlSerializer.serialize(h.urlAfterRedirects),
                              h.targetSnapshot
                            );
                            this.events.next(p);
                          })
                        );
                      if (
                        d &&
                        n.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                      ) {
                        const {
                            id: h,
                            extractedUrl: p,
                            source: _,
                            restoredState: m,
                            extras: D,
                          } = c,
                          v = new pd(h, this.urlSerializer.serialize(p), _, m);
                        this.events.next(v);
                        const A = iI(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = s =
                            {
                              ...c,
                              targetSnapshot: A,
                              urlAfterRedirects: p,
                              extras: {
                                ...D,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          q(s)
                        );
                      }
                      {
                        const h = "";
                        return (
                          this.events.next(
                            new ps(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              h,
                              1
                            )
                          ),
                          c.resolve(null),
                          Dn
                        );
                      }
                    }),
                    Ct((c) => {
                      const u = new o8(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot
                      );
                      this.events.next(u);
                    }),
                    se(
                      (c) => (
                        (this.currentTransition = s =
                          {
                            ...c,
                            guards: N8(
                              c.targetSnapshot,
                              c.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        s
                      )
                    ),
                    (function U8(e, t) {
                      return dt((r) => {
                        const {
                          targetSnapshot: n,
                          currentSnapshot: i,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = r;
                        return 0 === s.length && 0 === o.length
                          ? q({ ...r, guardsResult: !0 })
                          : (function H8(e, t, r, n) {
                              return ft(e).pipe(
                                dt((i) =>
                                  (function Y8(e, t, r, n, i) {
                                    const o =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? q(
                                          o.map((a) => {
                                            const l = gl(t) ?? i,
                                              c = ms(a, l);
                                            return ni(
                                              (function V8(e) {
                                                return e && vl(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, r, n)
                                                : l.runInContext(() =>
                                                    c(e, t, r, n)
                                                  )
                                            ).pipe($i());
                                          })
                                        ).pipe(vs())
                                      : q(!0);
                                  })(i.component, i.route, r, t, n)
                                ),
                                $i((i) => !0 !== i, !0)
                              );
                            })(s, n, i, e).pipe(
                              dt((a) =>
                                a &&
                                (function P8(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function $8(e, t, r, n) {
                                      return ft(t).pipe(
                                        Qo((i) =>
                                          Ba(
                                            (function z8(e, t) {
                                              return (
                                                null !== e && t && t(new d8(e)),
                                                q(!0)
                                              );
                                            })(i.route.parent, n),
                                            (function G8(e, t) {
                                              return (
                                                null !== e && t && t(new h8(e)),
                                                q(!0)
                                              );
                                            })(i.route, n),
                                            (function W8(e, t, r) {
                                              const n = t[t.length - 1],
                                                o = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function A8(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    RS(() =>
                                                      q(
                                                        s.guards.map((l) => {
                                                          const c =
                                                              gl(s.node) ?? r,
                                                            u = ms(l, c);
                                                          return ni(
                                                            (function L8(e) {
                                                              return (
                                                                e &&
                                                                vl(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(u)
                                                              ? u.canActivateChild(
                                                                  n,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => u(n, e)
                                                                )
                                                          ).pipe($i());
                                                        })
                                                      ).pipe(vs())
                                                    )
                                                  );
                                              return q(o).pipe(vs());
                                            })(e, i.path, r),
                                            (function q8(e, t, r) {
                                              const n = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!n || 0 === n.length)
                                                return q(!0);
                                              const i = n.map((o) =>
                                                RS(() => {
                                                  const s = gl(t) ?? r,
                                                    a = ms(o, s);
                                                  return ni(
                                                    (function F8(e) {
                                                      return (
                                                        e && vl(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe($i());
                                                })
                                              );
                                              return q(i).pipe(vs());
                                            })(e, i.route, r)
                                          )
                                        ),
                                        $i((i) => !0 !== i, !0)
                                      );
                                    })(n, o, e, t)
                                  : q(a)
                              ),
                              se((a) => ({ ...r, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (c) => this.events.next(c)),
                    Ct((c) => {
                      if (
                        ((s.guardsResult = c.guardsResult), zi(c.guardsResult))
                      )
                        throw cI(0, c.guardsResult);
                      const u = new s8(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot,
                        !!c.guardsResult
                      );
                      this.events.next(u);
                    }),
                    mt(
                      (c) =>
                        !!c.guardsResult ||
                        (this.cancelNavigationTransition(c, "", 3), !1)
                    ),
                    R_((c) => {
                      if (c.guards.canActivateChecks.length)
                        return q(c).pipe(
                          Ct((u) => {
                            const d = new a8(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects),
                              u.targetSnapshot
                            );
                            this.events.next(d);
                          }),
                          Cn((u) => {
                            let d = !1;
                            return q(u).pipe(
                              f5(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ct({
                                next: () => (d = !0),
                                complete: () => {
                                  d ||
                                    this.cancelNavigationTransition(u, "", 2);
                                },
                              })
                            );
                          }),
                          Ct((u) => {
                            const d = new l8(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects),
                              u.targetSnapshot
                            );
                            this.events.next(d);
                          })
                        );
                    }),
                    R_((c) => {
                      const u = (d) => {
                        const f = [];
                        d.routeConfig?.loadComponent &&
                          !d.routeConfig._loadedComponent &&
                          f.push(
                            this.configLoader.loadComponent(d.routeConfig).pipe(
                              Ct((h) => {
                                d.component = h;
                              }),
                              se(() => {})
                            )
                          );
                        for (const h of d.children) f.push(...u(h));
                        return f;
                      };
                      return f_(u(c.targetSnapshot.root)).pipe(ad(), Rt(1));
                    }),
                    R_(() => this.afterPreactivation()),
                    se((c) => {
                      const u = (function y8(e, t, r) {
                        const n = pl(e, t._root, r ? r._root : void 0);
                        return new rI(n, t);
                      })(
                        n.routeReuseStrategy,
                        c.targetSnapshot,
                        c.currentRouterState
                      );
                      return (
                        (this.currentTransition = s =
                          { ...c, targetRouterState: u }),
                        s
                      );
                    }),
                    Ct(() => {
                      this.events.next(new b_());
                    }),
                    ((e, t, r, n) =>
                      se(
                        (i) => (
                          new O8(
                            t,
                            i.targetRouterState,
                            i.currentRouterState,
                            r,
                            n
                          ).activate(e),
                          i
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (c) => this.events.next(c),
                      this.inputBindingEnabled
                    ),
                    Rt(1),
                    Ct({
                      next: (c) => {
                        (a = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new ri(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            c.targetRouterState.snapshot
                          ),
                          c.resolve(!0);
                      },
                      complete: () => {
                        a = !0;
                      },
                    }),
                    it(
                      this.transitionAbortSubject.pipe(
                        Ct((c) => {
                          throw c;
                        })
                      )
                    ),
                    ka(() => {
                      a || l || this.cancelNavigationTransition(s, "", 1),
                        this.currentNavigation?.id === s.id &&
                          (this.currentNavigation = null);
                    }),
                    Nr((c) => {
                      if (((l = !0), dI(c)))
                        this.events.next(
                          new fl(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c.message,
                            c.cancellationCode
                          )
                        ),
                          (function C8(e) {
                            return dI(e) && zi(e.url);
                          })(c)
                            ? this.events.next(new D_(c.url))
                            : s.resolve(!1);
                      else {
                        this.events.next(
                          new gd(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c,
                            s.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          s.resolve(n.errorHandler(c));
                        } catch (u) {
                          s.reject(u);
                        }
                      }
                      return Dn;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, i, o) {
            const s = new fl(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              i,
              o
            );
            this.events.next(s), n.resolve(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function EI(e) {
        return e !== dl;
      }
      let SI = (() => {
          var e;
          class t {
            buildTitle(n) {
              let i,
                o = n.root;
              for (; void 0 !== o; )
                (i = this.getResolvedTitleForRoute(o) ?? i),
                  (o = o.children.find((s) => s.outlet === ne));
              return i;
            }
            getResolvedTitleForRoute(n) {
              return n.data[ol];
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return V(v5);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        v5 = (() => {
          var e;
          class t extends SI {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const i = this.buildTitle(n);
              void 0 !== i && this.title.setTitle(i);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(IC));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        y5 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return V(D5);
              },
              providedIn: "root",
            })),
            t
          );
        })();
      class b5 {
        shouldDetach(t) {
          return !1;
        }
        store(t, r) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, r) {
          return t.routeConfig === r.routeConfig;
        }
      }
      let D5 = (() => {
        var e;
        class t extends b5 {}
        return (
          ((e = t).ɵfac = (function () {
            let r;
            return function (i) {
              return (r || (r = nt(e)))(i || e);
            };
          })()),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const wd = new U("", { providedIn: "root", factory: () => ({}) });
      let C5 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({
              token: e,
              factory: function () {
                return V(w5);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        w5 = (() => {
          var e;
          class t {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, i) {
              return n;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      var yl = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(yl || {});
      function II(e, t) {
        e.events
          .pipe(
            mt(
              (r) =>
                r instanceof ri ||
                r instanceof fl ||
                r instanceof gd ||
                r instanceof ps
            ),
            se((r) =>
              r instanceof ri || r instanceof ps
                ? yl.COMPLETE
                : r instanceof fl && (0 === r.code || 1 === r.code)
                ? yl.REDIRECTING
                : yl.FAILED
            ),
            mt((r) => r !== yl.REDIRECTING),
            Rt(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function E5(e) {
        throw e;
      }
      function S5(e, t, r) {
        return t.parse("/");
      }
      const I5 = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        T5 = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let wt = (() => {
        var e;
        class t {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = V(Kb)),
              (this.isNgZoneEnabled = !1),
              (this._events = new ve()),
              (this.options = V(wd, { optional: !0 }) || {}),
              (this.pendingTasks = V(ou)),
              (this.errorHandler = this.options.errorHandler || E5),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || S5),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = V(C5)),
              (this.routeReuseStrategy = V(y5)),
              (this.titleStrategy = V(SI)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = V(bs, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = V(Cd)),
              (this.urlSerializer = V(al)),
              (this.location = V(Hp)),
              (this.componentInputBindingEnabled = !!V(md, { optional: !0 })),
              (this.eventsSubscription = new je()),
              (this.isNgZoneEnabled =
                V(de) instanceof de && de.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new hs()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = iI(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const n = this.navigationTransitions.events.subscribe((i) => {
              try {
                const { currentTransition: o } = this.navigationTransitions;
                if (null === o) return void (TI(i) && this._events.next(i));
                if (i instanceof pd)
                  EI(o.source) && (this.browserUrlTree = o.extractedUrl);
                else if (i instanceof ps) this.rawUrlTree = o.rawUrl;
                else if (i instanceof eI) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!o.extras.skipLocationChange) {
                      const s = this.urlHandlingStrategy.merge(
                        o.urlAfterRedirects,
                        o.rawUrl
                      );
                      this.setBrowserUrl(s, o);
                    }
                    this.browserUrlTree = o.urlAfterRedirects;
                  }
                } else if (i instanceof b_)
                  (this.currentUrlTree = o.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      o.urlAfterRedirects,
                      o.rawUrl
                    )),
                    (this.routerState = o.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (o.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, o),
                      (this.browserUrlTree = o.urlAfterRedirects));
                else if (i instanceof fl)
                  0 !== i.code && 1 !== i.code && (this.navigated = !0),
                    (3 === i.code || 2 === i.code) && this.restoreHistory(o);
                else if (i instanceof D_) {
                  const s = this.urlHandlingStrategy.merge(
                      i.url,
                      o.currentRawUrl
                    ),
                    a = {
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || EI(o.source),
                    };
                  this.scheduleNavigation(s, dl, null, a, {
                    resolve: o.resolve,
                    reject: o.reject,
                    promise: o.promise,
                  });
                }
                i instanceof gd && this.restoreHistory(o, !0),
                  i instanceof ri && (this.navigated = !0),
                  TI(i) && this._events.next(i);
              } catch (o) {
                this.navigationTransitions.transitionAbortSubject.next(o);
              }
            });
            this.eventsSubscription.add(n);
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), dl, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const i = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === i &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, i, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, i, o) {
            const s = { replaceUrl: !0 },
              a = o?.navigationId ? o : null;
            if (o) {
              const c = { ...o };
              delete c.navigationId,
                delete c.ɵrouterPageId,
                0 !== Object.keys(c).length && (s.state = c);
            }
            const l = this.parseUrl(n);
            this.scheduleNavigation(l, i, a, s);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(O_)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(n, i = {}) {
            const {
                relativeTo: o,
                queryParams: s,
                fragment: a,
                queryParamsHandling: l,
                preserveFragment: c,
              } = i,
              u = c ? this.currentUrlTree.fragment : a;
            let f,
              d = null;
            switch (l) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...s };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = s || null;
            }
            null !== d && (d = this.removeEmptyProps(d));
            try {
              f = WS(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (f = this.currentUrlTree.root);
            }
            return YS(f, n, d, u ?? null);
          }
          navigateByUrl(n, i = { skipLocationChange: !1 }) {
            const o = zi(n) ? n : this.parseUrl(n),
              s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(s, dl, null, i);
          }
          navigate(n, i = { skipLocationChange: !1 }) {
            return (
              (function M5(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new N(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, i), i)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let i;
            try {
              i = this.urlSerializer.parse(n);
            } catch (o) {
              i = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return i;
          }
          isActive(n, i) {
            let o;
            if (((o = !0 === i ? { ...I5 } : !1 === i ? { ...T5 } : i), zi(n)))
              return VS(this.currentUrlTree, n, o);
            const s = this.parseUrl(n);
            return VS(this.currentUrlTree, s, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((i, o) => {
              const s = n[o];
              return null != s && (i[o] = s), i;
            }, {});
          }
          scheduleNavigation(n, i, o, s, a) {
            if (this.disposed) return Promise.resolve(!1);
            let l, c, u;
            a
              ? ((l = a.resolve), (c = a.reject), (u = a.promise))
              : (u = new Promise((f, h) => {
                  (l = f), (c = h);
                }));
            const d = this.pendingTasks.add();
            return (
              II(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(d));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: i,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: n,
                extras: s,
                resolve: l,
                reject: c,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(n, i) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || i.extras.replaceUrl) {
              const a = {
                ...i.extras.state,
                ...this.generateNgRouterState(i.id, this.browserPageId),
              };
              this.location.replaceState(o, "", a);
            } else {
              const s = {
                ...i.extras.state,
                ...this.generateNgRouterState(i.id, this.browserPageId + 1),
              };
              this.location.go(o, "", s);
            }
          }
          restoreHistory(n, i = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - this.browserPageId;
              0 !== s
                ? this.location.historyGo(s)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (i && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, i) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: i }
              : { navigationId: n };
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function TI(e) {
        return !(e instanceof b_ || e instanceof D_);
      }
      let Ed = (() => {
        var e;
        class t {
          constructor(n, i, o, s, a, l) {
            (this.router = n),
              (this.route = i),
              (this.tabIndexAttribute = o),
              (this.renderer = s),
              (this.el = a),
              (this.locationStrategy = l),
              (this.href = null),
              (this.commands = null),
              (this.onChanges = new ve()),
              (this.preserveFragment = !1),
              (this.skipLocationChange = !1),
              (this.replaceUrl = !1);
            const c = a.nativeElement.tagName?.toLowerCase();
            (this.isAnchorElement = "a" === c || "area" === c),
              this.isAnchorElement
                ? (this.subscription = n.events.subscribe((u) => {
                    u instanceof ri && this.updateHref();
                  }))
                : this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            null != this.tabIndexAttribute ||
              this.isAnchorElement ||
              this.applyAttributeValue("tabindex", n);
          }
          ngOnChanges(n) {
            this.isAnchorElement && this.updateHref(),
              this.onChanges.next(this);
          }
          set routerLink(n) {
            null != n
              ? ((this.commands = Array.isArray(n) ? n : [n]),
                this.setTabIndexIfNotOnNativeEl("0"))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
          }
          onClick(n, i, o, s, a) {
            return (
              !!(
                null === this.urlTree ||
                (this.isAnchorElement &&
                  (0 !== n ||
                    i ||
                    o ||
                    s ||
                    a ||
                    ("string" == typeof this.target && "_self" != this.target)))
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !this.isAnchorElement)
            );
          }
          ngOnDestroy() {
            this.subscription?.unsubscribe();
          }
          updateHref() {
            this.href =
              null !== this.urlTree && this.locationStrategy
                ? this.locationStrategy?.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
            const n =
              null === this.href
                ? null
                : (function gy(e, t, r) {
                    return (function IN(e, t) {
                      return ("src" === t &&
                        ("embed" === e ||
                          "frame" === e ||
                          "iframe" === e ||
                          "media" === e ||
                          "script" === e)) ||
                        ("href" === t && ("base" === e || "link" === e))
                        ? py
                        : Ks;
                    })(
                      t,
                      r
                    )(e);
                  })(
                    this.href,
                    this.el.nativeElement.tagName.toLowerCase(),
                    "href"
                  );
            this.applyAttributeValue("href", n);
          }
          applyAttributeValue(n, i) {
            const o = this.renderer,
              s = this.el.nativeElement;
            null !== i ? o.setAttribute(s, n, i) : o.removeAttribute(s, n);
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                });
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(
              g(wt),
              g(_s),
              (function mi(e) {
                return (function qM(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const r = e.attrs;
                  if (r) {
                    const n = r.length;
                    let i = 0;
                    for (; i < n; ) {
                      const o = r[i];
                      if (_m(o)) break;
                      if (0 === o) i += 2;
                      else if ("number" == typeof o)
                        for (i++; i < n && "string" == typeof r[i]; ) i++;
                      else {
                        if (o === t) return r[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(Ot(), e);
              })("tabindex"),
              g(pn),
              g(we),
              g(Oi)
            );
          }),
          (e.ɵdir = x({
            type: e,
            selectors: [["", "routerLink", ""]],
            hostVars: 1,
            hostBindings: function (n, i) {
              1 & n &&
                G("click", function (s) {
                  return i.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & n && Se("target", i.target);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              state: "state",
              relativeTo: "relativeTo",
              preserveFragment: ["preserveFragment", "preserveFragment", Yo],
              skipLocationChange: [
                "skipLocationChange",
                "skipLocationChange",
                Yo,
              ],
              replaceUrl: ["replaceUrl", "replaceUrl", Yo],
              routerLink: "routerLink",
            },
            standalone: !0,
            features: [C0, Mt],
          })),
          t
        );
      })();
      class MI {}
      let A5 = (() => {
        var e;
        class t {
          constructor(n, i, o, s, a) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = s),
              (this.loader = a);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                mt((n) => n instanceof ri),
                Qo(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, i) {
            const o = [];
            for (const s of i) {
              s.providers &&
                !s._injector &&
                (s._injector = op(s.providers, n, `Route: ${s.path}`));
              const a = s._injector ?? n,
                l = s._loadedInjector ?? a;
              ((s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
                (s.loadComponent && !s._loadedComponent)) &&
                o.push(this.preloadConfig(a, s)),
                (s.children || s._loadedRoutes) &&
                  o.push(this.processRoutes(l, s.children ?? s._loadedRoutes));
            }
            return ft(o).pipe(no());
          }
          preloadConfig(n, i) {
            return this.preloadingStrategy.preload(i, () => {
              let o;
              o =
                i.loadChildren && void 0 === i.canLoad
                  ? this.loader.loadChildren(n, i)
                  : q(null);
              const s = o.pipe(
                dt((a) =>
                  null === a
                    ? q(void 0)
                    : ((i._loadedRoutes = a.routes),
                      (i._loadedInjector = a.injector),
                      this.processRoutes(a.injector ?? n, a.routes))
                )
              );
              return i.loadComponent && !i._loadedComponent
                ? ft([s, this.loader.loadComponent(i)]).pipe(no())
                : s;
            });
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(wt), F(Xb), F(Ht), F(MI), F(x_));
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const P_ = new U("");
      let OI = (() => {
        var e;
        class t {
          constructor(n, i, o, s, a = {}) {
            (this.urlSerializer = n),
              (this.transitions = i),
              (this.viewportScroller = o),
              (this.zone = s),
              (this.options = a),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (a.scrollPositionRestoration =
                a.scrollPositionRestoration || "disabled"),
              (a.anchorScrolling = a.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof pd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof ri
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof ps &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof tI &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, i) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new tI(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      i
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            !(function Zy() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = P({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function Rr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function AI() {
        const e = V(Nt);
        return (t) => {
          const r = e.get(qr);
          if (t !== r.components[0]) return;
          const n = e.get(wt),
            i = e.get(RI);
          1 === e.get(k_) && n.initialNavigation(),
            e.get(xI, null, ie.Optional)?.setUpPreloading(),
            e.get(P_, null, ie.Optional)?.init(),
            n.resetRootComponentType(r.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
        };
      }
      const RI = new U("", { factory: () => new ve() }),
        k_ = new U("", { providedIn: "root", factory: () => 1 }),
        xI = new U("");
      function k5(e) {
        return Rr(0, [
          { provide: xI, useExisting: A5 },
          { provide: MI, useExisting: e },
        ]);
      }
      const PI = new U("ROUTER_FORROOT_GUARD"),
        L5 = [
          Hp,
          { provide: al, useClass: g_ },
          wt,
          hl,
          {
            provide: _s,
            useFactory: function NI(e) {
              return e.routerState.root;
            },
            deps: [wt],
          },
          x_,
          [],
        ];
      function V5() {
        return new dD("Router", wt);
      }
      let kI = (() => {
        var e;
        class t {
          constructor(n) {}
          static forRoot(n, i) {
            return {
              ngModule: t,
              providers: [
                L5,
                [],
                { provide: bs, multi: !0, useValue: n },
                {
                  provide: PI,
                  useFactory: H5,
                  deps: [[wt, new cc(), new uc()]],
                },
                { provide: wd, useValue: i || {} },
                i?.useHash
                  ? { provide: Oi, useClass: r2 }
                  : { provide: Oi, useClass: jD },
                {
                  provide: P_,
                  useFactory: () => {
                    const e = V(bL),
                      t = V(de),
                      r = V(wd),
                      n = V(Cd),
                      i = V(al);
                    return (
                      r.scrollOffset && e.setOffset(r.scrollOffset),
                      new OI(i, n, e, t, r)
                    );
                  },
                },
                i?.preloadingStrategy
                  ? k5(i.preloadingStrategy).ɵproviders
                  : [],
                { provide: dD, multi: !0, useFactory: V5 },
                i?.initialNavigation ? $5(i) : [],
                i?.bindToComponentInputs
                  ? Rr(8, [lI, { provide: md, useExisting: lI }]).ɵproviders
                  : [],
                [
                  { provide: FI, useFactory: AI },
                  { provide: Ap, multi: !0, useExisting: FI },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: t,
              providers: [{ provide: bs, multi: !0, useValue: n }],
            };
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(F(PI, 8));
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({})),
          t
        );
      })();
      function H5(e) {
        return "guarded";
      }
      function $5(e) {
        return [
          "disabled" === e.initialNavigation
            ? Rr(3, [
                {
                  provide: Dp,
                  multi: !0,
                  useFactory: () => {
                    const t = V(wt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: k_, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Rr(2, [
                { provide: k_, useValue: 0 },
                {
                  provide: Dp,
                  multi: !0,
                  deps: [Nt],
                  useFactory: (t) => {
                    const r = t.get(t2, Promise.resolve());
                    return () =>
                      r.then(
                        () =>
                          new Promise((n) => {
                            const i = t.get(wt),
                              o = t.get(RI);
                            II(i, () => {
                              n(!0);
                            }),
                              (t.get(Cd).afterPreactivation = () => (
                                n(!0), o.closed ? q(void 0) : o
                              )),
                              i.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const FI = new U("");
      let F_ = (() => {
          var e;
          class t {
            constructor(n) {
              (this.http = n),
                (this.selectedProduct = {
                  id: 0,
                  title: "",
                  description: "",
                  imageFile: "",
                  price: 0,
                  quantity: 0,
                });
            }
            getProducts() {
              return this.http
                .get(
                  "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//products"
                )
                .pipe(se((n) => n.map((i) => ({ ...i, quantity: 0 }))));
            }
            setSelectedProduct(n) {
              this.selectedProduct = n;
            }
            getSelectedProduct() {
              return this.selectedProduct;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(mg));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        ii = (() => {
          var e;
          class t {
            constructor() {
              (this.cartItems = []),
                (this.cartItemsCount = new St(0)),
                (this.cartItemsCount$ = this.cartItemsCount.asObservable()),
                (this.orderDetails = { fullName: "", totalPrice: 0 });
            }
            getCartContent() {
              return this.cartItems;
            }
            addToCart(n) {
              const i = this.cartItems.findIndex((o) => o.id == n.id);
              return (
                -1 === i
                  ? (this.cartItems.push({
                      id: n.id,
                      title: n.title,
                      imageFile: n.imageFile,
                      price: n.price,
                      quantity: n.quantity,
                    }),
                    this.cartItemsCount.next(this.cartItemsCount.value + 1))
                  : (this.cartItems[i].quantity = n.quantity),
                this.cartItems
              );
            }
            removeFromCart(n) {
              const i = this.cartItems.findIndex((s) => s.id == n.id);
              -1 !== i ? this.cartItems.splice(i, 1) : (this.cartItems = []),
                this.cartItemsCount.next(this.cartItemsCount.value - 1);
            }
            decreaseQuantity(n) {
              const i = this.cartItems.findIndex((o) => o.id == n.id);
              -1 !== i && this.cartItems[i].quantity > 1
                ? (this.cartItems[i].quantity -= 1)
                : (this.cartItemsCount.next(this.cartItemsCount.value - 1),
                  this.cartItems.splice(i, 1));
            }
            clearCart() {
              (this.cartItems = []), this.cartItemsCount.next(0);
            }
            setOrderSuccess(n, i) {
              this.orderDetails = { fullName: n, totalPrice: i };
            }
            getOrderSuccess() {
              return this.orderDetails;
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function z5(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 9),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.decreaseQuantity(o.product), Oe(i.stopPropagation());
            }),
            k(1, " - "),
            C();
        }
      }
      function q5(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 9),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.increaseQuantity(o.product), Oe(i.stopPropagation());
            }),
            k(1, " + "),
            C();
        }
      }
      function W5(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 10),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.addToCart(o.product), Oe(i.stopPropagation());
            }),
            k(1, " Add to Cart "),
            C();
        }
      }
      function Y5(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 11),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.addToCart(o.product), Oe(i.stopPropagation());
            }),
            k(1, " Add to Cart (added) "),
            C();
        }
      }
      function Z5(e, t) {
        1 & e && (w(0, "p", 12), k(1, "Product added to cart."), C());
      }
      function J5(e, t) {
        1 & e && (w(0, "p", 12), k(1, " Product removed from cart. "), C());
      }
      let Q5 = (() => {
        var e;
        class t {
          constructor(n, i, o) {
            (this.shoppingCartService = n),
              (this.productService = i),
              (this.router = o),
              (this.productAddedToCart = new z()),
              (this.width = 300),
              (this.height = 200),
              (this.addedMsg = !1),
              (this.removedMsg = !1),
              (this.product = {
                id: 0,
                title: "",
                description: "",
                imageFile: "",
                quantity: 0,
                price: 0,
              });
          }
          ngOnInit() {}
          productClicked() {
            this.productService.setSelectedProduct(this.product),
              this.router.navigate(["/product-detail"]);
          }
          addToCart(n) {
            this.productAddedToCart.emit(n), this.showAddedMsg();
          }
          decreaseQuantity(n) {
            n.quantity > 1
              ? ((n.quantity -= 1),
                this.shoppingCartService.decreaseQuantity(n))
              : 1 === n.quantity &&
                ((n.quantity -= 1),
                this.shoppingCartService.decreaseQuantity(n),
                this.showRemovedMsg());
          }
          increaseQuantity(n) {
            (n.quantity += 1), this.shoppingCartService.addToCart(n);
          }
          showAddedMsg() {
            (this.addedMsg = !0),
              setTimeout(() => {
                this.addedMsg = !1;
              }, 5e3);
          }
          showRemovedMsg() {
            (this.removedMsg = !0),
              setTimeout(() => {
                this.removedMsg = !1;
              }, 5e3);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(ii), g(F_), g(wt));
          }),
          (e.ɵcmp = Ge({
            type: e,
            selectors: [["app-product-item"]],
            inputs: { product: "product" },
            outputs: { productAddedToCart: "productAddedToCart" },
            decls: 17,
            vars: 13,
            consts: [
              [1, "product-container", "clickable-item", 3, "click"],
              [3, "src"],
              [1, "prodDescription"],
              [1, "quantity-control"],
              ["class", "qty-btn", 3, "click", 4, "ngIf"],
              [1, "qty-number"],
              ["class", "btn btn-primary btn-empty", 3, "click", 4, "ngIf"],
              ["class", "btn btn-primary btn-selected", 3, "click", 4, "ngIf"],
              ["class", "added-confirmation", 4, "ngIf"],
              [1, "qty-btn", 3, "click"],
              [1, "btn", "btn-primary", "btn-empty", 3, "click"],
              [1, "btn", "btn-primary", "btn-selected", 3, "click"],
              [1, "added-confirmation"],
            ],
            template: function (n, i) {
              1 & n &&
                (w(0, "div", 0),
                G("click", function () {
                  return i.productClicked();
                }),
                w(1, "h3"),
                k(2),
                C(),
                We(3, "img", 1),
                w(4, "p", 2),
                k(5),
                C(),
                w(6, "p"),
                k(7),
                C(),
                w(8, "div", 3),
                R(9, z5, 2, 0, "button", 4),
                w(10, "span", 5),
                k(11),
                C(),
                R(12, q5, 2, 0, "button", 4),
                C(),
                R(13, W5, 2, 0, "button", 6),
                R(14, Y5, 2, 0, "button", 7),
                R(15, Z5, 2, 0, "p", 8),
                R(16, J5, 2, 0, "p", 8),
                C()),
                2 & n &&
                  (S(2),
                  _t(i.product.title),
                  S(1),
                  _a(
                    "src",
                    "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//img/images?filename=",
                    i.product.imageFile,
                    "&width=",
                    i.width,
                    "&height=",
                    i.height,
                    "",
                    Ks
                  ),
                  S(2),
                  _t(i.product.description),
                  S(2),
                  $t("Price ", i.product.price, ""),
                  S(2),
                  M("ngIf", i.product.quantity > 0),
                  S(2),
                  _t(i.product.quantity),
                  S(1),
                  M("ngIf", i.product.quantity > 0),
                  S(1),
                  M("ngIf", 0 == i.product.quantity),
                  S(1),
                  M("ngIf", i.product.quantity > 0),
                  S(1),
                  M("ngIf", i.addedMsg),
                  S(1),
                  M("ngIf", i.removedMsg));
            },
            dependencies: [nn],
            styles: [
              "body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;background-color:#f7f9fc;margin:0;padding:0}.product-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 10px 20px #0000001a;transition:transform .2s ease}.product-container[_ngcontent-%COMP%]:hover{transform:translateY(-5px)}h3[_ngcontent-%COMP%]{margin-bottom:15px;color:#333}img[_ngcontent-%COMP%]{max-width:100%;height:auto;border-radius:5px;margin-bottom:15px}.prodDescription[_ngcontent-%COMP%]{color:#777;text-align:center;margin-bottom:15px}.quantity-control[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100px;background-color:#f5f5f5;border-radius:20px;padding:5px 10px;box-shadow:0 4px 8px #0000001a}.qty-btn[_ngcontent-%COMP%]{background-color:transparent;border:none;font-size:1.5em;cursor:pointer;transition:color .2s;padding:5px;margin:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:50%;background-color:gray}.qty-btn[_ngcontent-%COMP%]:hover{color:#007bff;background-color:gray}.qty-number[_ngcontent-%COMP%]{font-size:1.2em;color:#555;margin:0 10px;min-width:20px;text-align:center}button[_ngcontent-%COMP%]{padding:10px 20px;background-color:#007bff;border:none;border-radius:5px;color:#fff;cursor:pointer;transition:background-color .2s ease}button[_ngcontent-%COMP%]:hover{background-color:#0056b3}.btn-selected[_ngcontent-%COMP%], .btn-selected[_ngcontent-%COMP%]:hover{background-color:green}input[type=text][_ngcontent-%COMP%]{padding:10px;margin-bottom:10px;border:1px solid #dcdcdc;border-radius:5px;width:100%}.product-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-weight:700;margin-bottom:15px}input[_ngcontent-%COMP%]::placeholder{color:#aaa}.clickable-item[_ngcontent-%COMP%]{cursor:pointer}.added-confirmation[_ngcontent-%COMP%]{font-size:smaller;color:red;margin-top:10px}",
            ],
          })),
          t
        );
      })();
      function K5(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "app-product-item", 4),
            G("productAddedToCart", function (i) {
              return Me(r), Oe(H().handleProductAddedToCart(i));
            }),
            C();
        }
        2 & e && M("product", t.$implicit);
      }
      let X5 = (() => {
          var e;
          class t {
            constructor(n, i) {
              (this.productService = n),
                (this.shoppingCartService = i),
                (this.title = "Products List"),
                (this.products = []),
                (this.filteredProducts = []),
                (this.searchTerm = "");
            }
            ngOnInit() {
              this.productService.getProducts().subscribe((n) => {
                (this.products = n),
                  (this.filteredProducts = [...this.products]);
                const i = this.shoppingCartService.getCartContent();
                i.length >= 1
                  ? i.forEach((o) => {
                      const s = this.products.find((a) => a.id === o.id);
                      s && (s.quantity = o.quantity);
                    })
                  : (this.products = this.products.map((o) => ({
                      ...o,
                      quantity: 0,
                    })));
              });
            }
            filterProducts() {
              const n = this.searchTerm.toLowerCase();
              this.filteredProducts = this.products.filter((i) =>
                i.title.toLowerCase().includes(n)
              );
            }
            handleProductAddedToCart(n) {
              (void 0 !== n.quantity || 0 === n.quantity) && (n.quantity = 1),
                this.shoppingCartService.addToCart(n);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(F_), g(ii));
            }),
            (e.ɵcmp = Ge({
              type: e,
              selectors: [["app-products"]],
              decls: 6,
              vars: 3,
              consts: [
                [1, "centered-content"],
                [
                  "type",
                  "text",
                  "placeholder",
                  "Search product titles...",
                  1,
                  "search-field",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
                [1, "productList"],
                [3, "product", "productAddedToCart", 4, "ngFor", "ngForOf"],
                [3, "product", "productAddedToCart"],
              ],
              template: function (n, i) {
                1 & n &&
                  (w(0, "div", 0)(1, "h1"),
                  k(2),
                  C(),
                  w(3, "input", 1),
                  G("ngModelChange", function (s) {
                    return (i.searchTerm = s);
                  })("ngModelChange", function () {
                    return i.filterProducts();
                  }),
                  C(),
                  w(4, "div", 2),
                  R(5, K5, 1, 1, "app-product-item", 3),
                  C()()),
                  2 & n &&
                    (S(2),
                    _t(i.title),
                    S(1),
                    M("ngModel", i.searchTerm),
                    S(2),
                    M("ngForOf", i.filteredProducts));
              },
              dependencies: [cr, Ri, ja, rs, Q5],
              styles: [
                ".centered-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;margin:0 auto;padding:20px;box-sizing:border-box}h1[_ngcontent-%COMP%]{font-size:2.5em;color:#333;margin-bottom:20px;text-align:center}.productList[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(25%,400px),1fr));gap:20px;width:100%;box-sizing:border-box}body[_ngcontent-%COMP%], h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{margin:0;padding:0}.search-field[_ngcontent-%COMP%]{margin-bottom:10px}",
              ],
            })),
            t
          );
        })(),
        e4 = (() => {
          var e;
          class t {
            constructor(n) {
              (this.shoppingCartService = n),
                (this.itemRemovedMsg = new z()),
                (this.width = 150),
                (this.height = 100),
                (this.product = {
                  id: 0,
                  title: "",
                  description: "",
                  imageFile: "",
                  quantity: 0,
                  price: 0,
                }),
                (this.cartItem = {
                  id: 0,
                  title: "",
                  imageFile: "",
                  quantity: 0,
                  price: 0,
                });
            }
            ngOnInit() {}
            removeItem(n) {
              (this.product.id = n.id),
                (this.product.title = n.title),
                (this.product.imageFile = n.imageFile),
                (this.product.quantity = n.quantity),
                (this.product.price = n.price),
                this.shoppingCartService.removeFromCart(this.product),
                this.itemRemovedMsg.emit(!0);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(ii));
            }),
            (e.ɵcmp = Ge({
              type: e,
              selectors: [["app-cart-item"]],
              inputs: { cartItem: "cartItem" },
              outputs: { itemRemovedMsg: "itemRemovedMsg" },
              decls: 12,
              vars: 6,
              consts: [
                [1, "cartItems"],
                [1, "item-image", 2, "margin-left", "50px"],
                [3, "src"],
                [1, "item-details"],
                [2, "font-weight", "bold"],
                [1, "remove-item-btn", 3, "click"],
              ],
              template: function (n, i) {
                1 & n &&
                  (w(0, "div", 0)(1, "div", 1),
                  We(2, "img", 2),
                  C(),
                  w(3, "div", 3)(4, "p", 4),
                  k(5),
                  C(),
                  w(6, "p"),
                  k(7),
                  C(),
                  w(8, "p"),
                  k(9),
                  C()(),
                  w(10, "button", 5),
                  G("click", function () {
                    return i.removeItem(i.cartItem);
                  }),
                  k(11, "X"),
                  C()()),
                  2 & n &&
                    (S(2),
                    _a(
                      "src",
                      "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//img/images?filename=",
                      i.cartItem.imageFile,
                      "&width=",
                      i.width,
                      "&height=",
                      i.height,
                      "",
                      Ks
                    ),
                    S(3),
                    _t(i.cartItem.title),
                    S(2),
                    $t("Unit price: $", i.cartItem.price, ""),
                    S(2),
                    $t("Number of items: ", i.cartItem.quantity, ""));
              },
              styles: [
                ".cartItems[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:10px;margin:20px;border:1px solid #ccc}.remove-item-btn[_ngcontent-%COMP%]{background-color:transparent;border:none;font-size:1.5em;cursor:pointer;color:red;padding:10px;margin-right:20px}.remove-item-btn[_ngcontent-%COMP%]:hover{background-color:#ff00001a}",
              ],
            })),
            t
          );
        })(),
        bl = (() => {
          var e;
          class t {
            constructor(n) {
              (this.http = n),
                (this.userLoggedIn = !1),
                (this.fullname = ""),
                (this.token = ""),
                (this.userLoggedInSubject = new St(!1)),
                (this.userLoggedIn$ = this.userLoggedInSubject.asObservable());
            }
            registerUser(n) {
              return this.http
                .post(
                  "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//users",
                  n,
                  { headers: { "Content-Type": "application/json" } }
                )
                .pipe(Nr(this.handleError));
            }
            loginUser(n, i) {
              return this.http
                .post(
                  "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//users/authenticate",
                  { login: n, password: i },
                  { headers: { "Content-Type": "application/json" } }
                )
                .pipe(Nr(this.handleError));
            }
            logoffUser() {
              localStorage.setItem("token", ""),
                localStorage.setItem("user", ""),
                this.setUserLoggedIn(!1);
            }
            storeToken(n) {
              localStorage.setItem("token", JSON.stringify(n)),
                (this.userLoggedIn = !0);
            }
            setUserLoggedIn(n) {
              this.userLoggedInSubject.next(n);
            }
            getUserLoggedIn() {
              return this.userLoggedInSubject.value;
            }
            setUserData(n) {
              const i = this.decodeJwt(n);
              localStorage.setItem(
                "user",
                JSON.stringify({
                  id: i?.payload.id,
                  login: i?.payload.login,
                  firstName: i?.payload.firstName,
                  lastName: i?.payload.lastName,
                  password: "",
                  email: "",
                  token: "",
                })
              ),
                (this.userLoggedIn = !0);
            }
            getUserData() {
              const n = localStorage.getItem("user");
              return n && null !== n ? JSON.parse(n) : null;
            }
            handleError(n) {
              return ti(
                409 === n.status
                  ? () => new Error("User with this login already exists.")
                  : 401 === n.status
                  ? () => new Error("Login failed.")
                  : () =>
                      new Error(
                        "An unknown error occurred. Please try again later."
                      )
              );
            }
            decodeJwt(n) {
              let i = n.split(".");
              if (3 !== i.length) return null;
              let o = this.base64UrlDecode(i[0]),
                s = this.base64UrlDecode(i[1]);
              return { header: JSON.parse(o), payload: JSON.parse(s) };
            }
            base64UrlDecode(n) {
              let i = n.replace("-", "+").replace("_", "/");
              for (; i.length % 4; ) i += "=";
              return atob(i);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(F(mg));
            }),
            (e.ɵprov = P({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function t4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "div", 2)(1, "p"),
            k(2, "Please register or login before the order can be submitted"),
            C(),
            We(3, "br"),
            w(4, "div", 3)(5, "button", 4),
            G("click", function () {
              return Me(r), Oe(H().register());
            }),
            k(6, "Register"),
            C(),
            w(7, "button", 4),
            G("click", function () {
              return Me(r), Oe(H().login());
            }),
            k(8, "Log-in"),
            C()()();
        }
      }
      function n4(e, t) {
        1 & e &&
          (w(0, "div", 15),
          k(1, " Fullname must be between 4 and 100 characters. "),
          C());
      }
      function r4(e, t) {
        1 & e &&
          (w(0, "div", 15),
          k(1, " Address must be between 6 and 255 characters. "),
          C());
      }
      function i4(e, t) {
        1 & e &&
          (w(0, "div", 15),
          k(1, " Credit Card Number must have 16 digits. "),
          C());
      }
      function o4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "form", 5, 6),
            G("ngSubmit", function () {
              return Me(r), Oe(H().submitOrder());
            }),
            w(2, "h3"),
            k(3, "Your Address"),
            C(),
            w(4, "p"),
            k(5, "Please complete missing data"),
            C(),
            We(6, "br"),
            w(7, "p"),
            k(8, "Full name"),
            C(),
            w(9, "input", 7, 8),
            G("ngModelChange", function (i) {
              return Me(r), Oe((H().fullName = i));
            }),
            C(),
            R(11, n4, 2, 0, "div", 9),
            w(12, "p"),
            k(13, "Address"),
            C(),
            w(14, "input", 10, 11),
            G("ngModelChange", function (i) {
              return Me(r), Oe((H().address = i));
            }),
            C(),
            R(16, r4, 2, 0, "div", 9),
            w(17, "p"),
            k(18, "Credit Card Number"),
            C(),
            w(19, "input", 12, 13),
            G("ngModelChange", function (i) {
              return Me(r), Oe((H().cardNumber = i));
            }),
            C(),
            R(21, i4, 2, 0, "div", 9),
            We(22, "input", 14),
            C();
        }
        if (2 & e) {
          const r = qe(1),
            n = qe(10),
            i = qe(15),
            o = qe(20),
            s = H();
          S(9),
            M("ngModel", s.fullName),
            S(2),
            M("ngIf", n.invalid && n.dirty),
            S(3),
            M("ngModel", s.address),
            S(2),
            M("ngIf", i.invalid && i.dirty),
            S(3),
            M("ngModel", s.cardNumber),
            S(2),
            M("ngIf", o.invalid && o.dirty),
            S(1),
            M("disabled", r.invalid || i.pristine || o.pristine);
        }
      }
      let s4 = (() => {
        var e;
        class t {
          constructor(n, i, o) {
            (this.router = n),
              (this.shoppingCartService = i),
              (this.userService = o),
              (this.cartItems = []),
              (this.fullName = ""),
              (this.address = ""),
              (this.cardNumber = ""),
              (this.userLoggedIn = !1),
              (this.user = {
                login: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                token: "",
              });
          }
          ngOnInit() {
            (this.cartItems = this.shoppingCartService.getCartContent()),
              (this.userLoggedIn = this.userService.getUserLoggedIn()),
              (this.user = this.userService.getUserData()),
              (this.fullName =
                this.user?.firstName + " " + this.user?.lastName);
          }
          submitOrder() {
            this.shoppingCartService.setOrderSuccess(
              this.fullName,
              this.getTotalPrice()
            ),
              this.router.navigate(["order-success"]);
          }
          getUserLoggedIn() {
            this.userLoggedIn = this.userService.getUserLoggedIn();
          }
          register() {
            this.router.navigate(["register"]);
          }
          login() {
            this.router.navigate(["login"]);
          }
        }
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)(g(wt), g(ii), g(bl));
          }),
          (e.ɵcmp = Ge({
            type: e,
            selectors: [["app-address"]],
            inputs: { getTotalPrice: "getTotalPrice" },
            decls: 3,
            vars: 2,
            consts: [
              ["class", "button-container", 4, "ngIf"],
              [3, "ngSubmit", 4, "ngIf"],
              [1, "button-container"],
              [1, "center-buttons"],
              [2, "margin-left", "20px", 3, "click"],
              [3, "ngSubmit"],
              ["form", "ngForm"],
              [
                "type",
                "text",
                "name",
                "fullname",
                "required",
                "",
                "minlength",
                "4",
                "maxlength",
                "100",
                "placeholder",
                "(minimum 4 characters)",
                3,
                "ngModel",
                "ngModelChange",
              ],
              ["fullNameInput", "ngModel"],
              ["class", "validation-error", 4, "ngIf"],
              [
                "type",
                "text",
                "name",
                "address",
                "required",
                "",
                "minlength",
                "6",
                "maxlength",
                "255",
                "placeholder",
                "(minimum 6 characters)",
                3,
                "ngModel",
                "ngModelChange",
              ],
              ["addressInput", "ngModel"],
              [
                "type",
                "text",
                "name",
                "cardnumber",
                "required",
                "",
                "pattern",
                "\\d{16}",
                "minlength",
                "16",
                "maxlength",
                "16",
                "placeholder",
                "(16-digit number)",
                3,
                "ngModel",
                "ngModelChange",
              ],
              ["cardNumberInput", "ngModel"],
              ["type", "submit", "value", "Order Cart", 3, "disabled"],
              [1, "validation-error"],
            ],
            template: function (n, i) {
              1 & n &&
                (w(0, "div"),
                R(1, t4, 9, 0, "div", 0),
                R(2, o4, 23, 7, "form", 1),
                C()),
                2 & n &&
                  (S(1),
                  M("ngIf", !i.userLoggedIn),
                  S(1),
                  M("ngIf", i.userLoggedIn));
            },
            dependencies: [nn, Hu, Ri, ja, xu, za, qa, Wa, jg, rs, ns],
            styles: [
              "button[_ngcontent-%COMP%]{padding:10px 20px;font-size:16px;border:none;border-radius:4px;transition:background-color .3s;cursor:pointer;color:#2c3e50;background-color:#ecf0f1}button[_ngcontent-%COMP%]:hover{background-color:#bdc3c7}input[type=text][_ngcontent-%COMP%], input[type=password][_ngcontent-%COMP%]{width:100%;padding:10px;margin-bottom:15px;border:1px solid #bdc3c7;border-radius:4px;font-size:16px}input[type=submit][_ngcontent-%COMP%]:disabled{padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#ccc;color:#fff;cursor:pointer;transition:background-color .3s ease}input[type=submit][_ngcontent-%COMP%]:not(:disabled){padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#007bff;color:#fff;cursor:pointer;transition:background-color .3s ease}input[type=submit][_ngcontent-%COMP%]:hover{background-color:#0056b3}.button-container[_ngcontent-%COMP%]{background-color:#ddccca;padding:20px;border-radius:4px;color:#ecf0f1;text-align:center}.button-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000}.center-buttons[_ngcontent-%COMP%]{display:flex;justify-content:center;gap:20px}form[_ngcontent-%COMP%]{background-color:#f7f9fa;padding:20px;border-radius:4px;margin-top:20px}h3[_ngcontent-%COMP%]{font-size:20px;color:#2c3e50;margin-bottom:20px}p[_ngcontent-%COMP%]{margin-bottom:10px;color:#7f8c8d}.validation-error[_ngcontent-%COMP%]{font-size:smaller;padding-left:10px;color:red}",
            ],
          })),
          t
        );
      })();
      function a4(e, t) {
        1 & e &&
          (w(0, "div", 7)(1, "p"), k(2, "Shopping Cart is empty"), C()());
      }
      function l4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "app-cart-item", 14),
            G("itemRemovedMsg", function () {
              return Me(r), Oe(H(2).handleItemRemovedMsg());
            }),
            C();
        }
        2 & e && M("cartItem", t.$implicit);
      }
      function c4(e, t) {
        1 & e && (w(0, "p", 15), k(1, " Product removed from cart. "), C());
      }
      function u4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "div", 8),
            R(1, l4, 1, 1, "app-cart-item", 9),
            w(2, "div", 10)(3, "button", 11),
            G("click", function () {
              return Me(r), Oe(H().clearCart());
            }),
            k(4, " Clear Cart "),
            C(),
            w(5, "p", 12),
            k(6),
            (function bb(e, t) {
              const r = ue();
              let n;
              const i = e + ae;
              r.firstCreatePass
                ? ((n = (function WP(e, t) {
                    if (t)
                      for (let r = t.length - 1; r >= 0; r--) {
                        const n = t[r];
                        if (e === n.name) return n;
                      }
                  })(t, r.pipeRegistry)),
                  (r.data[i] = n),
                  n.onDestroy && (r.destroyHooks ??= []).push(i, n.onDestroy))
                : (n = r.data[i]);
              const o = n.factory || (n.factory = pi(n.type)),
                a = Yt(g);
              try {
                const l = rc(!1),
                  c = o();
                return (
                  rc(l),
                  (function xR(e, t, r, n) {
                    r >= e.data.length &&
                      ((e.data[r] = null), (e.blueprint[r] = null)),
                      (t[r] = n);
                  })(r, I(), i, c),
                  c
                );
              } finally {
                Yt(a);
              }
            })(7, "number"),
            C()(),
            R(8, c4, 2, 0, "p", 13),
            C();
        }
        if (2 & e) {
          const r = H();
          S(1),
            M("ngForOf", r.cartItems),
            S(5),
            $t(" Total Price: $", Db(7, 3, r.getTotalPrice(), "1.0-2"), " "),
            S(2),
            M("ngIf", r.showCartMsg);
        }
      }
      function f4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 9),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.decreaseQuantity(o.product), Oe(i.stopPropagation());
            }),
            k(1, " - "),
            C();
        }
      }
      function h4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 9),
            G("click", function (i) {
              Me(r);
              const o = H();
              return o.increaseQuantity(o.product), Oe(i.stopPropagation());
            }),
            k(1, " + "),
            C();
        }
      }
      function p4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 10),
            G("click", function () {
              Me(r);
              const i = H();
              return Oe(i.addToCart(i.product));
            }),
            k(1, " Add to Cart "),
            C();
        }
      }
      function g4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 11),
            G("click", function () {
              Me(r);
              const i = H();
              return Oe(i.addToCart(i.product));
            }),
            k(1, " Add to Cart (added) "),
            C();
        }
      }
      function v4(e, t) {
        1 & e &&
          (w(0, "div", 12),
          k(1, " Login must be between 3 and 20 characters. "),
          C());
      }
      function y4(e, t) {
        1 & e &&
          (w(0, "div", 12),
          k(1, " Password must be between 6 and 20 characters. "),
          C());
      }
      function b4(e, t) {
        if ((1 & e && (w(0, "div", 13), k(1), C()), 2 & e)) {
          const r = H();
          S(1), $t(" ", r.errorMessage, " ");
        }
      }
      function C4(e, t) {
        1 & e &&
          (w(0, "div", 18),
          k(1, " Login must be between 3 and 20 characters. "),
          C());
      }
      function w4(e, t) {
        1 & e &&
          (w(0, "div", 18),
          k(1, " Password must be between 6 and 20 characters. "),
          C());
      }
      function E4(e, t) {
        1 & e &&
          (w(0, "div", 18),
          k(1, " Firstname must be between 2 and 50 characters. "),
          C());
      }
      function S4(e, t) {
        1 & e &&
          (w(0, "div", 18),
          k(1, " Lastname must be between 2 and 50 characters. "),
          C());
      }
      function I4(e, t) {
        1 & e && (w(0, "div", 18), k(1, " Email is not valid. "), C());
      }
      function T4(e, t) {
        if ((1 & e && (w(0, "div", 19), k(1), C()), 2 & e)) {
          const r = H();
          S(1), $t(" ", r.errorMessage, " ");
        }
      }
      const M4 = [
        { path: "", component: X5 },
        {
          path: "cart",
          component: (() => {
            var e;
            class t {
              constructor(n) {
                (this.shoppingCartService = n),
                  (this.title = "Your Shopping Cart"),
                  (this.totalPrice = 0),
                  (this.cartItems = []),
                  (this.cartCount = 0),
                  (this.showCartMsg = !1),
                  (this.cartSubscription = new je());
              }
              ngOnInit() {
                (this.cartItems = this.shoppingCartService.getCartContent()),
                  (this.cartSubscription =
                    this.shoppingCartService.cartItemsCount$.subscribe((n) => {
                      this.cartCount = n;
                    }));
              }
              ngOnDestroy() {
                this.cartSubscription.unsubscribe();
              }
              getTotalPrice() {
                return this.cartItems.reduce(
                  (n, i) => n + i.price * (i.quantity ? i.quantity : 0),
                  0
                );
              }
              onQuantityChange(n, i) {
                i.quantity = Number(n.target.value);
              }
              clearCart() {
                this.shoppingCartService.clearCart(),
                  (this.cartItems = []),
                  (this.cartCount = 0);
              }
              handleItemRemovedMsg() {
                (this.showCartMsg = !0),
                  setTimeout(() => {
                    this.showCartMsg = !1;
                  }, 5e3);
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)(g(ii));
              }),
              (e.ɵcmp = Ge({
                type: e,
                selectors: [["app-cart"]],
                decls: 9,
                vars: 4,
                consts: [
                  [1, "centered-content"],
                  [1, "content-wrapper"],
                  [1, "cart-container"],
                  ["class", "empty-cart-message", 4, "ngIf"],
                  ["class", "cart-items", 4, "ngIf"],
                  [1, "address"],
                  [3, "getTotalPrice"],
                  [1, "empty-cart-message"],
                  [1, "cart-items"],
                  [3, "cartItem", "itemRemovedMsg", 4, "ngFor", "ngForOf"],
                  [1, "cart-action-container"],
                  [1, "clear-cart-btn", 3, "click"],
                  [1, "total-price"],
                  ["class", "added-confirmation", 4, "ngIf"],
                  [3, "cartItem", "itemRemovedMsg"],
                  [1, "added-confirmation"],
                ],
                template: function (n, i) {
                  1 & n &&
                    (w(0, "div", 0)(1, "h1"),
                    k(2),
                    C(),
                    w(3, "div", 1)(4, "div", 2),
                    R(5, a4, 3, 0, "div", 3),
                    R(6, u4, 9, 6, "div", 4),
                    C(),
                    w(7, "div", 5),
                    We(8, "app-address", 6),
                    C()()()),
                    2 & n &&
                      (S(2),
                      _t(i.title),
                      S(3),
                      M("ngIf", 0 == i.cartCount),
                      S(1),
                      M("ngIf", i.cartCount > 0),
                      S(2),
                      M("getTotalPrice", i.getTotalPrice));
                },
                dependencies: [cr, nn, e4, s4, oC],
                styles: [
                  ".centered-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;position:relative;margin:20px}.content-wrapper[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between}.cart-container[_ngcontent-%COMP%]{flex:1;margin-left:30px;padding-bottom:40px;width:50%;display:flex;flex-direction:column;justify-content:space-between}.cart-items[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;height:100%}.cart-actions-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:50px}.clear-cart-btn[_ngcontent-%COMP%]{margin-left:200px;padding:10px 20px;font-size:16px;border:none;border-radius:4px;transition:background-color .3s;cursor:pointer;color:#2c3e50;background-color:#ecf0f1}.address[_ngcontent-%COMP%]{flex:1;width:50%;justify-content:center}.total-price[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#2c3e50;padding:5px 0;margin-right:200px}.empty-cart-message[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:200px;background-color:#f5f5f5;border:1px solid #e0e0e0;border-radius:8px;box-shadow:0 4px 8px #0000001a;font-size:1.5em;color:#555;margin:20px 0}.added-confirmation[_ngcontent-%COMP%]{text-align:center;font-size:smaller;color:red;margin-top:10px}",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "product-detail",
          component: (() => {
            var e;
            class t {
              constructor(n, i) {
                (this.productService = n),
                  (this.shoppingCartService = i),
                  (this.product = {
                    id: 0,
                    title: "",
                    description: "",
                    imageFile: "",
                    price: 0,
                    quantity: 0,
                  }),
                  (this.width = 300),
                  (this.height = 200);
              }
              ngOnInit() {
                this.product = this.productService.getSelectedProduct();
              }
              addToCart(n) {
                (void 0 !== n.quantity || 0 === n.quantity) && (n.quantity = 1),
                  this.shoppingCartService.addToCart(n);
              }
              decreaseQuantity(n) {
                n.quantity > 0 &&
                  ((n.quantity -= 1),
                  0 === n.quantity &&
                    this.shoppingCartService.decreaseQuantity(n));
              }
              increaseQuantity(n) {
                n.quantity += 1;
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)(g(F_), g(ii));
              }),
              (e.ɵcmp = Ge({
                type: e,
                selectors: [["app-product-detail"]],
                decls: 18,
                vars: 11,
                consts: [
                  [1, "product-container"],
                  [1, "product-image"],
                  [3, "src"],
                  [1, "prodDetail"],
                  [1, "quantity-control"],
                  ["class", "qty-btn", 3, "click", 4, "ngIf"],
                  [1, "qty-number"],
                  ["class", "btn-primary btn-empty", 3, "click", 4, "ngIf"],
                  ["class", "btn-primary btn-selected", 3, "click", 4, "ngIf"],
                  [1, "qty-btn", 3, "click"],
                  [1, "btn-primary", "btn-empty", 3, "click"],
                  [1, "btn-primary", "btn-selected", 3, "click"],
                ],
                template: function (n, i) {
                  1 & n &&
                    (w(0, "div", 0)(1, "h3"),
                    k(2),
                    C(),
                    w(3, "div", 1),
                    We(4, "img", 2),
                    C(),
                    w(5, "div", 3)(6, "p"),
                    k(7),
                    C(),
                    w(8, "p"),
                    k(9),
                    C(),
                    w(10, "div", 4),
                    R(11, f4, 2, 0, "button", 5),
                    w(12, "span", 6),
                    k(13),
                    C(),
                    R(14, h4, 2, 0, "button", 5),
                    C(),
                    R(15, p4, 2, 0, "button", 7),
                    R(16, g4, 2, 0, "button", 8),
                    We(17, "br"),
                    C()()),
                    2 & n &&
                      (S(2),
                      $t("Product Detail ", i.product.title, ""),
                      S(2),
                      _a(
                        "src",
                        "http://shop1-env.eba-dcmw5bnw.eu-central-1.elasticbeanstalk.com//img/images?filename=",
                        i.product.imageFile,
                        "&width=",
                        i.width,
                        "&height=",
                        i.height,
                        "",
                        Ks
                      ),
                      S(3),
                      _t(i.product.description),
                      S(2),
                      $t("Price: $", i.product.price, ""),
                      S(2),
                      M("ngIf", i.product.quantity > 0),
                      S(2),
                      _t(i.product.quantity),
                      S(1),
                      M("ngIf", i.product.quantity > 0),
                      S(1),
                      M("ngIf", 0 == i.product.quantity),
                      S(1),
                      M("ngIf", i.product.quantity > 0));
                },
                dependencies: [nn],
                styles: [
                  "body[_ngcontent-%COMP%]{font-family:Arial,sans-serif;background-color:#f7f9fc;margin:0;padding:0}.product-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;width:100%;padding:20px;background-color:#fff;border-radius:8px;box-shadow:0 10px 20px #0000001a;transition:transform .2s ease}h3[_ngcontent-%COMP%]{margin-bottom:15px;color:#333}.product-image[_ngcontent-%COMP%]{display:flex;justify-content:center;width:100%;margin:50px}.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:500px;width:100%}.prodDetail[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:30px;border-radius:10px;box-shadow:0 10px 20px #0000001a;background:#ffffff;width:60%;margin:0 auto}.prodDetail[_ngcontent-%COMP%]   .quantity-control[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100px;background-color:#f5f5f5;border-radius:20px;padding:5px 10px;box-shadow:0 4px 8px #0000001a}.btn-empty[_ngcontent-%COMP%], .btn-selected[_ngcontent-%COMP%]{display:block;margin:20px auto 0;text-align:center;padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#007bff;color:#fff;cursor:pointer;transition:background-color .3s ease;width:-moz-fit-content;width:fit-content}.btn-empty[_ngcontent-%COMP%]:hover, .btn-selected[_ngcontent-%COMP%]:hover{background-color:#0056b3}.btn-selected[_ngcontent-%COMP%], .btn-selected[_ngcontent-%COMP%]:hover{background-color:green}.qty-btn[_ngcontent-%COMP%]{background-color:transparent;border:none;font-size:1.5em;cursor:pointer;transition:color .2s;padding:5px;margin:0;width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:50%;background-color:gray}.qty-btn[_ngcontent-%COMP%]:hover{color:#007bff;background-color:gray}.qty-number[_ngcontent-%COMP%]{font-size:1.2em;color:#555;margin:0 10px;min-width:20px;text-align:center}",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "order-success",
          component: (() => {
            var e;
            class t {
              constructor(n, i) {
                (this.shoppingCartService = n),
                  (this.router = i),
                  (this.orderDetails = { fullName: "", totalPrice: 0 }),
                  (this.cartItems = []);
              }
              ngOnInit() {
                this.orderDetails = this.shoppingCartService.getOrderSuccess();
              }
              clearCart() {
                this.shoppingCartService.clearCart(),
                  (this.cartItems = []),
                  this.router.navigate([""]);
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)(g(ii), g(wt));
              }),
              (e.ɵcmp = Ge({
                type: e,
                selectors: [["app-cart-ordered"]],
                decls: 17,
                vars: 2,
                consts: [
                  [1, "success-container"],
                  [1, "order-info"],
                  [1, "highlight"],
                  [1, "back-button", 3, "click"],
                ],
                template: function (n, i) {
                  1 & n &&
                    (w(0, "div", 0)(1, "h1"),
                    k(2, "Success"),
                    C(),
                    w(3, "div", 1)(4, "p"),
                    k(5, " Thank you, "),
                    w(6, "span", 2),
                    k(7),
                    C()(),
                    w(8, "p"),
                    k(9, " Your "),
                    w(10, "span", 2),
                    k(11),
                    C(),
                    k(12, " order is confirmed! "),
                    C()(),
                    w(13, "p"),
                    k(14, "Please allow 1-3 business day(s) for shipping"),
                    C(),
                    w(15, "button", 3),
                    G("click", function () {
                      return i.clearCart();
                    }),
                    k(16, " Back to product list "),
                    C()()),
                    2 & n &&
                      (S(7),
                      _t(i.orderDetails.fullName),
                      S(4),
                      $t("$", i.orderDetails.totalPrice, ""));
                },
                styles: [
                  ".success-container[_ngcontent-%COMP%]{background-color:#2ecc71;padding:30px;border-radius:8px;max-width:500px;margin:40px auto;text-align:center;box-shadow:0 4px 8px #0000001a;color:#ecf0f1}h1[_ngcontent-%COMP%]{font-size:28px;margin-bottom:20px;font-weight:700}.order-info[_ngcontent-%COMP%]{background-color:#fff3;padding:15px;border-radius:6px;margin-bottom:20px}.highlight[_ngcontent-%COMP%]{color:#f39c12;font-weight:700}.back-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#074220;color:#fff;cursor:pointer;transition:background-color .3s ease}.back-button[_ngcontent-%COMP%]:hover{background-color:#bdc3c7}",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "login",
          component: (() => {
            var e;
            class t {
              constructor(n, i) {
                (this.userService = n),
                  (this.router = i),
                  (this.login = ""),
                  (this.password = ""),
                  (this.token = ""),
                  (this.user = {
                    login: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    token: "",
                  }),
                  (this.errorMessage = "");
              }
              ngOnInit() {}
              loginUser(n, i) {
                this.userService.loginUser(n, i).subscribe({
                  next: (o) => {
                    o &&
                      !o.message &&
                      ((this.token = o),
                      this.userService.storeToken(this.token),
                      this.userService.setUserData(this.token),
                      this.userService.setUserLoggedIn(!0),
                      this.router.navigate(["cart"]));
                  },
                  error: (o) => {
                    401 === o.state && (this.errorMessage = "Login failed"),
                      (this.errorMessage = o.message || "An error occurred"),
                      console.error(`Error: ${this.errorMessage}`);
                  },
                });
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)(g(bl), g(wt));
              }),
              (e.ɵcmp = Ge({
                type: e,
                selectors: [["app-user-login"]],
                decls: 16,
                vars: 6,
                consts: [
                  [1, "centered-content"],
                  [1, "login-form", 3, "ngSubmit"],
                  ["form", "ngForm"],
                  [1, "input-group"],
                  [
                    "type",
                    "text",
                    "name",
                    "login",
                    "minlength",
                    "3",
                    "maxlength",
                    "20",
                    "placeholder",
                    "login",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["loginInput", "ngModel"],
                  ["class", "validation-error", 4, "ngIf"],
                  [
                    "type",
                    "password",
                    "name",
                    "password",
                    "minlength",
                    "6",
                    "maxlength",
                    "50",
                    "placeholder",
                    "password",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["passwordInput", "ngModel"],
                  [1, "submit-container"],
                  ["type", "submit", "value", "Login", 3, "disabled"],
                  ["class", "error-message", 4, "ngIf"],
                  [1, "validation-error"],
                  [1, "error-message"],
                ],
                template: function (n, i) {
                  if (
                    (1 & n &&
                      (w(0, "div", 0)(1, "form", 1, 2),
                      G("ngSubmit", function () {
                        return i.loginUser(i.login, i.password);
                      }),
                      w(3, "h1"),
                      k(4, "Login"),
                      C(),
                      w(5, "div", 3)(6, "input", 4, 5),
                      G("ngModelChange", function (s) {
                        return (i.login = s);
                      }),
                      C(),
                      R(8, v4, 2, 0, "div", 6),
                      C(),
                      w(9, "div", 3)(10, "input", 7, 8),
                      G("ngModelChange", function (s) {
                        return (i.password = s);
                      }),
                      C(),
                      R(12, y4, 2, 0, "div", 6),
                      C(),
                      w(13, "div", 9),
                      We(14, "input", 10),
                      R(15, b4, 2, 1, "div", 11),
                      C()()()),
                    2 & n)
                  ) {
                    const o = qe(2),
                      s = qe(7),
                      a = qe(11);
                    S(6),
                      M("ngModel", i.login),
                      S(2),
                      M("ngIf", s.invalid && s.dirty),
                      S(2),
                      M("ngModel", i.password),
                      S(2),
                      M("ngIf", a.invalid && a.dirty),
                      S(2),
                      M("disabled", o.invalid || s.pristine || a.pristine),
                      S(1),
                      M("ngIf", i.errorMessage);
                  }
                },
                dependencies: [nn, Hu, Ri, ja, xu, qa, Wa, rs, ns],
                styles: [
                  ".centered-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.input-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;margin-bottom:15px}.login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:30px;border-radius:10px;box-shadow:0 10px 20px #0000001a;background:#ffffff;width:370px}.login-form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:24px;margin-bottom:20px}input[type=text][_ngcontent-%COMP%], input[type=password][_ngcontent-%COMP%]{width:100%;padding:10px;border:1px solid #bdc3c7;border-radius:4px;font-size:16px}input[type=submit][_ngcontent-%COMP%]:disabled{padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#ccc;color:#fff;cursor:pointer;transition:background-color .3s ease}input[type=submit][_ngcontent-%COMP%]:not(:disabled){padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#007bff;color:#fff;cursor:pointer;transition:background-color .3s ease}input[type=submit][_ngcontent-%COMP%]:hover{background-color:#0056b3}.submit-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;width:100%;margin-top:15px}.error-message[_ngcontent-%COMP%]{color:red;font-size:14px;margin-top:10px}.validation-error[_ngcontent-%COMP%]{font-size:smaller;padding-left:10px;color:red}",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "register",
          component: (() => {
            var e;
            class t {
              constructor(n, i) {
                (this.userService = n),
                  (this.router = i),
                  (this.user = {
                    login: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    token: "",
                  }),
                  (this.token = ""),
                  (this.errorMessage = "");
              }
              ngOnInit() {}
              register(n) {
                this.userService.registerUser(n).subscribe({
                  next: (i) => {
                    i &&
                      !i.message &&
                      ((this.token = i),
                      this.userService.storeToken(this.token),
                      this.userService.setUserData(this.token),
                      this.userService.setUserLoggedIn(!0),
                      this.router.navigate(["cart"]));
                  },
                  error: (i) => {
                    (this.errorMessage = i.message || "An error occurred"),
                      console.error(`Error: ${this.errorMessage}`);
                  },
                });
              }
            }
            return (
              ((e = t).ɵfac = function (n) {
                return new (n || e)(g(bl), g(wt));
              }),
              (e.ɵcmp = Ge({
                type: e,
                selectors: [["app-user-register"]],
                decls: 38,
                vars: 12,
                consts: [
                  [1, "centered-content"],
                  [1, "comp-form", 3, "ngSubmit"],
                  ["form", "ngForm"],
                  [1, "input-group"],
                  [
                    "type",
                    "text",
                    "name",
                    "login",
                    "required",
                    "",
                    "minlength",
                    "3",
                    "maxlength",
                    "20",
                    "placeholder",
                    "(minimum 3 characters)",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["loginInput", "ngModel"],
                  ["class", "validation-error", 4, "ngIf"],
                  [
                    "type",
                    "password",
                    "name",
                    "password",
                    "required",
                    "",
                    "minlength",
                    "6",
                    "maxlength",
                    "20",
                    "placeholder",
                    "(minimum 6 characters)",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["passwordInput", "ngModel"],
                  [
                    "type",
                    "text",
                    "name",
                    "firstName",
                    "required",
                    "",
                    "minlength",
                    "2",
                    "maxlength",
                    "50",
                    "placeholder",
                    "(minimum 6 characters)",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["firstNameInput", "ngModel"],
                  [
                    "type",
                    "text",
                    "name",
                    "lastName",
                    "required",
                    "",
                    "minlength",
                    "2",
                    "maxlength",
                    "50",
                    "placeholder",
                    "(minimum 6 characters)",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["lastNameInput", "ngModel"],
                  [
                    "type",
                    "email",
                    "name",
                    "email",
                    "required",
                    "",
                    "email",
                    "",
                    "placeholder",
                    "E-Mail",
                    3,
                    "ngModel",
                    "ngModelChange",
                  ],
                  ["emailInput", "ngModel"],
                  [1, "register-container"],
                  ["type", "submit", "value", "Register", 3, "disabled"],
                  ["class", "error-message", 4, "ngIf"],
                  [1, "validation-error"],
                  [1, "error-message"],
                ],
                template: function (n, i) {
                  if (
                    (1 & n &&
                      (w(0, "div", 0)(1, "form", 1, 2),
                      G("ngSubmit", function () {
                        return i.register({
                          login: i.user.login,
                          password: i.user.password,
                          firstName: i.user.firstName,
                          lastName: i.user.lastName,
                          email: i.user.email,
                          token: i.user.token,
                        });
                      }),
                      w(3, "h1"),
                      k(4, "Register to Shop"),
                      C(),
                      w(5, "div", 3)(6, "p"),
                      k(7, "Login"),
                      C(),
                      w(8, "input", 4, 5),
                      G("ngModelChange", function (s) {
                        return (i.user.login = s);
                      }),
                      C(),
                      R(10, C4, 2, 0, "div", 6),
                      C(),
                      w(11, "div", 3)(12, "p"),
                      k(13, "Password"),
                      C(),
                      w(14, "input", 7, 8),
                      G("ngModelChange", function (s) {
                        return (i.user.password = s);
                      }),
                      C(),
                      R(16, w4, 2, 0, "div", 6),
                      C(),
                      w(17, "div", 3)(18, "p"),
                      k(19, "First Name"),
                      C(),
                      w(20, "input", 9, 10),
                      G("ngModelChange", function (s) {
                        return (i.user.firstName = s);
                      }),
                      C(),
                      R(22, E4, 2, 0, "div", 6),
                      C(),
                      w(23, "div", 3)(24, "p"),
                      k(25, "Last Name"),
                      C(),
                      w(26, "input", 11, 12),
                      G("ngModelChange", function (s) {
                        return (i.user.lastName = s);
                      }),
                      C(),
                      R(28, S4, 2, 0, "div", 6),
                      C(),
                      w(29, "div", 3)(30, "p"),
                      k(31, "E-mail"),
                      C(),
                      w(32, "input", 13, 14),
                      G("ngModelChange", function (s) {
                        return (i.user.email = s);
                      }),
                      C(),
                      R(34, I4, 2, 0, "div", 6),
                      C(),
                      w(35, "div", 15),
                      We(36, "input", 16),
                      R(37, T4, 2, 1, "div", 17),
                      C()()()),
                    2 & n)
                  ) {
                    const o = qe(2),
                      s = qe(9),
                      a = qe(15),
                      l = qe(21),
                      c = qe(27),
                      u = qe(33);
                    S(8),
                      M("ngModel", i.user.login),
                      S(2),
                      M("ngIf", s.invalid && s.dirty),
                      S(4),
                      M("ngModel", i.user.password),
                      S(2),
                      M("ngIf", a.invalid && a.dirty),
                      S(4),
                      M("ngModel", i.user.firstName),
                      S(2),
                      M("ngIf", l.invalid && l.dirty),
                      S(4),
                      M("ngModel", i.user.lastName),
                      S(2),
                      M("ngIf", c.invalid && c.dirty),
                      S(4),
                      M("ngModel", i.user.email),
                      S(2),
                      M("ngIf", u.invalid && u.dirty),
                      S(2),
                      M(
                        "disabled",
                        o.invalid ||
                          s.pristine ||
                          a.pristine ||
                          l.pristine ||
                          c.pristine ||
                          u.pristine
                      ),
                      S(1),
                      M("ngIf", i.errorMessage);
                  }
                },
                dependencies: [nn, Hu, Ri, ja, xu, za, qa, Wa, Bg, rs, ns],
                styles: [
                  ".centered-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;background:#f7f9fc}.comp-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;padding:30px;border-radius:10px;box-shadow:0 10px 20px #0000001a;background:#ffffff;width:500px}h1[_ngcontent-%COMP%]{margin-bottom:25px;color:#333}.input-group[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.input-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-right:20px;color:#555;width:100px}.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:10px 15px;border:none;border-radius:5px;background:#f0f2f5;font-size:16px;flex:1;transition:background-color .3s ease}.input-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;background:#e5e8ed}input[type=submit][_ngcontent-%COMP%]:disabled{padding:10px 20px;font-size:16px;border:none;border-radius:4px;background-color:#ccc;color:#fff;cursor:pointer;transition:background-color .3s ease}.comp-form[_ngcontent-%COMP%]   input[type=submit][_ngcontent-%COMP%]:not(:disabled){padding:10px 20px;border:none;border-radius:5px;background-color:#007bff;color:#fff;cursor:pointer;transition:background-color .3s ease;align-self:center}.error-message[_ngcontent-%COMP%]{flex:1;color:red}.validation-error[_ngcontent-%COMP%]{font-size:smaller;margin-left:20px;padding-left:130px;color:red}",
                ],
              })),
              t
            );
          })(),
        },
      ];
      let O4 = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Ce({ type: e })),
          (e.ɵinj = ge({ imports: [kI.forRoot(M4), kI] })),
          t
        );
      })();
      function N4(e, t) {
        if ((1 & e && (w(0, "span"), k(1), C()), 2 & e)) {
          const r = H();
          S(1), _t(" [" + r.cartCount + "]");
        }
      }
      function A4(e, t) {
        if (1 & e) {
          const r = He();
          w(0, "button", 7),
            G("click", function () {
              return Me(r), Oe(H().logoffUser());
            }),
            k(1, " Log-off "),
            C();
        }
      }
      let R4 = (() => {
          var e;
          class t {
            constructor(n, i, o) {
              (this.userService = n),
                (this.shoppingCartService = i),
                (this.router = o),
                (this.userLoggedIn = !1),
                (this.cartCount = 0),
                (this.subscription = new je()),
                (this.cartSubscription = new je());
            }
            ngOnInit() {
              (this.subscription = this.userService.userLoggedIn$.subscribe(
                (n) => {
                  this.userLoggedIn = n;
                }
              )),
                (this.cartSubscription =
                  this.shoppingCartService.cartItemsCount$.subscribe((n) => {
                    this.cartCount = n;
                  }));
            }
            logoffUser() {
              this.userService.logoffUser(), this.router.navigate([""]);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(bl), g(ii), g(wt));
            }),
            (e.ɵcmp = Ge({
              type: e,
              selectors: [["app-nav-bar"]],
              decls: 12,
              vars: 2,
              consts: [
                [1, "navigation"],
                [1, "header"],
                [1, "centered-buttons"],
                ["routerLink", "/", 1, "nav-button"],
                ["routerLink", "/cart", 1, "nav-button", 2, "color", "black"],
                [4, "ngIf"],
                ["class", "nav-button nav-button-right", 3, "click", 4, "ngIf"],
                [1, "nav-button", "nav-button-right", 3, "click"],
              ],
              template: function (n, i) {
                1 & n &&
                  (w(0, "div", 0)(1, "div", 1),
                  k(2, "Product Store"),
                  C(),
                  w(3, "div", 2)(4, "button", 3),
                  k(5, "Products List"),
                  C(),
                  We(6, "br"),
                  w(7, "button", 4),
                  k(8, " Shopping Cart"),
                  R(9, N4, 2, 1, "span", 5),
                  C(),
                  We(10, "br"),
                  C(),
                  R(11, A4, 2, 0, "button", 6),
                  C()),
                  2 & n &&
                    (S(9),
                    M("ngIf", i.cartCount > 0),
                    S(2),
                    M("ngIf", i.userLoggedIn));
              },
              dependencies: [nn, Ed],
              styles: [
                ".navigation[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;background-color:#2c3e50;padding:10px 30px;box-shadow:0 3px 10px #0003;font-family:Arial,sans-serif}.header[_ngcontent-%COMP%]{font-size:24px;color:#ecf0f1;font-weight:700}.centered-buttons[_ngcontent-%COMP%]{display:flex;align-items:center;gap:20px}.nav-button[_ngcontent-%COMP%]{padding:10px 20px;font-size:16px;border:none;border-radius:4px;transition:background-color .3s;cursor:pointer;color:#2c3e50;background-color:#ecf0f1}.nav-button[_ngcontent-%COMP%]:hover{background-color:#bdc3c7}.nav-button-right[_ngcontent-%COMP%]{background-color:#e74c3c;color:#ecf0f1}.nav-button-right[_ngcontent-%COMP%]:hover{background-color:#c0392b}.nav-button[routerlinkactive][_ngcontent-%COMP%]{background-color:#27ae60;color:#ecf0f1}",
              ],
            })),
            t
          );
        })(),
        x4 = (() => {
          var e;
          class t {
            constructor(n) {
              (this.userService = n), (this.title = "product-store");
            }
            ngOnInit() {
              this.checkTokenAtStartup();
            }
            checkTokenAtStartup() {
              localStorage.getItem("user") &&
                this.userService.setUserLoggedIn(!0);
            }
          }
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)(g(bl));
            }),
            (e.ɵcmp = Ge({
              type: e,
              selectors: [["app-root"]],
              decls: 4,
              vars: 0,
              consts: [
                [1, "main-wrapper"],
                [1, "fixed-navbar"],
                [1, "router-wrapper"],
                [1, "margins"],
              ],
              template: function (n, i) {
                1 & n &&
                  (w(0, "div", 0),
                  We(1, "app-nav-bar", 1),
                  w(2, "div", 2),
                  We(3, "router-outlet", 3),
                  C()());
              },
              dependencies: [T_, R4],
              styles: [
                ".margins[_ngcontent-%COMP%]{margin-top:60px}.fixed-navbar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;z-index:1000;margin-bottom:100px}.main-wrapper[_ngcontent-%COMP%]{padding-top:60px}app-nav-bar[_ngcontent-%COMP%]{position:fixed;top:0;width:100%;z-index:100}",
              ],
            })),
            t
          );
        })(),
        P4 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Ce({ type: e, bootstrap: [x4] })),
            (e.ɵinj = ge({ imports: [hV, O4, E$, $V, _j] })),
            t
          );
        })();
      dV()
        .bootstrapModule(P4)
        .catch((e) => console.error(e));
    },
    614: () => {
      const re = ":";
      const Ts = function (b, ...y) {
          if (Ts.translate) {
            const T = Ts.translate(b, y);
            (b = T[0]), (y = T[1]);
          }
          let E = jd(b[0], b.raw[0]);
          for (let T = 1; T < b.length; T++) E += y[T - 1] + jd(b[T], b.raw[T]);
          return E;
        },
        H_ = ":";
      function jd(b, y) {
        return y.charAt(0) === H_
          ? b.substring(
              (function St(b, y) {
                for (let E = 1, T = 1; E < b.length; E++, T++)
                  if ("\\" === y[T]) T++;
                  else if (b[E] === re) return E;
                throw new Error(
                  `Unterminated $localize metadata block in "${y}".`
                );
              })(b, y) + 1
            )
          : b;
      }
      globalThis.$localize = Ts;
    },
  },
  (re) => {
    var xr = (Pr) => re((re.s = Pr));
    xr(614), xr(477);
  },
]);
