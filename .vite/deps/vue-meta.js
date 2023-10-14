import {
  Comment,
  Teleport,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  isProxy,
  markRaw,
  onUnmounted,
  reactive,
  watch
} from "./chunk-QNGQRF5U.js";
import {
  __publicField
} from "./chunk-ZC22LKFR.js";

// node_modules/vue-meta/dist/vue-meta.esm-browser.min.js
var d = (t, e) => (o, r) => {
  let n = -1;
  if (r.reduce((e2, o2, r2) => {
    const s = t(e2, o2);
    return s !== e2 ? (n = r2, s) : e2;
  }, e), n > -1)
    return o[n];
};
var p = d((t, e) => {
  const { depth: o } = e;
  return !t || o > t ? o : t;
});
var m = Object.freeze({ __proto__: null, setup: (t) => {
  let e = 0;
  if (t.vm) {
    let { vm: o } = t;
    do {
      o.parent && (e++, o = o.parent);
    } while (o && o.parent && o !== o.root);
  }
  t.depth = e;
}, resolve: p });
var b = { body: { tag: "script", to: "body" }, base: { valueAttribute: "href" }, charset: { tag: "meta", nameless: true, valueAttribute: "charset" }, description: { tag: "meta" }, og: { group: true, namespacedAttribute: true, tag: "meta", keyAttribute: "property" }, twitter: { group: true, namespacedAttribute: true, tag: "meta" }, htmlAttrs: { attributesFor: "html" }, headAttrs: { attributesFor: "head" }, bodyAttrs: { attributesFor: "body" } };
var h2 = { title: { attributes: false }, base: { contentAsAttribute: true, attributes: ["href", "target"] }, meta: { contentAsAttribute: true, keyAttribute: "name", attributes: ["content", "name", "http-equiv", "charset"] }, link: { contentAsAttribute: true, attributes: ["href", "crossorigin", "rel", "media", "integrity", "hreflang", "type", "referrerpolicy", "sizes", "imagesrcset", "imagesizes", "as", "color"] }, style: { attributes: ["media"] }, script: { attributes: ["src", "type", "nomodule", "async", "defer", "crossorigin", "integrity", "referrerpolicy"] }, noscript: { attributes: false } };
Object.freeze({}), Object.freeze([]);
var g = Array.isArray;
var y = (t) => "function" == typeof t;
var v = (t) => "string" == typeof t;
var S = (t) => null !== t && "object" == typeof t;
var A = Object.prototype.toString;
var k = (t) => "[object Object]" === A.call(t);
var N = Symbol("kIsProxy");
var j = Symbol("kProxySources");
var R = Symbol("kProxyTarget");
var w = Symbol("kResolveContext");
function x(t) {
  if (g(t))
    return t.map(x);
  if (S(t)) {
    const e = {};
    for (const o in t)
      e[o] = "context" === o ? t[o] : x(t[o]);
    return e;
  }
  return t;
}
var O = (t, e, o) => {
  const r = [];
  for (const n of t)
    n && e in n && (r.push(n[e]), o && o(n));
  return r;
};
var $ = (t, e = [], o, r) => {
  if (!o && !r && ({ active: o, sources: r } = t, e.length))
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = e[t2];
      if (!o || !o[n2])
        return void console.error(`recompute: segment ${n2} not found on target`, e, o);
      o = o[n2], r = r.map((t3) => t3[n2]).filter(Boolean);
    }
  if (!o || !r)
    return;
  const n = ((t2, ...e2) => {
    const o2 = t2 ? Object.keys(t2) : [];
    if (e2) {
      for (const t3 of e2)
        if (t3 && S(t3))
          for (const e3 in t3)
            o2.includes(e3) || o2.push(e3);
    }
    return o2;
  })(...r), s = Object.keys(o);
  for (const t2 of s)
    n.includes(t2) || delete o[t2];
  for (const s2 of n) {
    let n2 = false;
    for (let t2 = 0; t2 < r.length; t2++) {
      const e2 = r[t2];
      if (e2 && s2 in e2 && void 0 !== e2[s2]) {
        n2 = k(e2[s2]);
        break;
      }
    }
    if (n2) {
      o[s2] || (o[s2] = {});
      const n3 = [];
      for (const t2 of r)
        s2 in t2 && n3.push(t2[s2]);
      $(t, [...e, s2], o[s2], n3);
      continue;
    }
    !o[s2] && g(r[0][s2]) && (o[s2] = []);
    const i = [], c = O(r, s2, (t2) => i.push(t2[w]));
    let a = t.resolve(c, i, o[s2], s2, e);
    k(a) && (a = x(a)), o[s2] = a;
  }
};
var P = (e, o, r, n = []) => {
  const s = C(e, r, n), i = markRaw(new Proxy(o, s));
  return !n.length && e.sources && e.sources.push(i), i;
};
var C = (t, e, o = []) => ({ get: (r, n, s) => {
  if (n === N)
    return true;
  if (n === j)
    return t.sources;
  if (n === R)
    return r;
  if (n === w)
    return e;
  let i = Reflect.get(r, n, s);
  if (!S(i))
    return i;
  if (!i[N]) {
    const s2 = [...o, n];
    i = P(t, i, e, s2), Reflect.set(r, n, i);
  }
  return i;
}, set: (e2, r, n) => {
  const s = Reflect.set(e2, r, n);
  if (s) {
    const i = g(e2);
    let c, a = false, { sources: u, active: l } = t, f = 0;
    for (const t2 of o) {
      if (u = O(u, t2), i && f === o.length - 1) {
        c = t2;
        break;
      }
      g(l) && (a = true), l = l[t2], f++;
    }
    if (a)
      return $(t), s;
    if (k(n))
      return $(t, o), s;
    let d2, p2 = [];
    i ? (d2 = u, p2 = u.map((t2) => t2[w])) : d2 = O(u, r, (t2) => p2.push(t2[w]));
    let m2 = t.resolve(d2, p2, l, r, o);
    k(m2) && (m2 = x(m2)), i && c ? l[c] = m2 : l[r] = m2;
  }
  return s;
}, deleteProperty: (e2, r) => {
  const n = Reflect.deleteProperty(e2, r);
  if (n) {
    const n2 = g(e2);
    let s, i = t.sources, c = t.active, a = 0;
    for (const t2 of o) {
      if (i = i.map((e3) => e3 && e3[t2]), n2 && a === o.length - 1) {
        s = t2;
        break;
      }
      c = c[t2], a++;
    }
    if (i.some((t2) => t2 && r in t2)) {
      let e3, a2 = [];
      n2 ? (e3 = i, a2 = i.map((t2) => t2[w])) : e3 = O(i, r, (t2) => a2.push(t2[w]));
      let u = t.resolve(e3, a2, c, r, o);
      k(u) && (u = x(u)), n2 && s ? c[s] = u : c[r] = u;
    } else
      delete c[r];
  }
  return n;
} });
var M = {};
function F(t, o, r, n) {
  return "attributesFor" in n ? function(t2, o2, r2, n2) {
    const { attributesFor: s } = n2;
    if (!s || !r2)
      return;
    if (t2.isSSR)
      return { to: "", vnode: h(`ssr-${s}`, r2) };
    if (!M[s]) {
      const [t3, e] = Array.from(document.querySelectorAll(s));
      if (!t3)
        return void console.error("Could not find element for selector", s, ", won't render attributes");
      e && console.warn("Found multiple elements for selector", s), M[s] = { el: t3, attrs: [] };
    }
    const { el: i, attrs: c } = M[s];
    for (const e in r2) {
      let n3 = U(t2, `${o2}(${e})`, r2[e], r2);
      g(n3) && (n3 = n3.join(",")), i.setAttribute(e, n3 || ""), c.includes(e) || c.push(e);
    }
    const a = c.filter((t3) => !r2[t3]);
    for (const t3 of a)
      i.removeAttribute(t3);
  }(t, o, r, n) : "group" in n ? function(t2, e, o2, r2) {
    if (g(o2))
      return console.warn("Specifying an array for group properties isnt supported"), [];
    return Object.keys(o2).map((n2) => {
      const s = { group: e, data: o2 };
      if (r2.namespaced)
        s.tagNamespace = true === r2.namespaced ? e : r2.namespaced;
      else if (r2.namespacedAttribute) {
        const t3 = true === r2.namespacedAttribute ? e : r2.namespacedAttribute;
        s.fullName = `${t3}:${n2}`, s.slotName = `${t3}(${n2})`;
      }
      return E(t2, e, o2[n2], r2, s);
    }).filter(Boolean).flat();
  }(t, o, r, n) : E(t, o, r, n);
}
function E(t, o, r, n = {}, s) {
  const i = ["content", "json", "rawContent"], c = (t2) => function(t3, e) {
    for (const o2 of t3) {
      const t4 = h2[o2];
      if (o2 && t4)
        return t4[e];
    }
  }([a, n.tag], t2);
  if (g(r))
    return r.map((e) => E(t, o, e, n, s)).filter(Boolean).flat();
  const { tag: a = n.tag || o } = r;
  let u = "", l = false, f = false;
  if (v(r))
    u = r;
  else if (r.children && g(r.children))
    l = true, u = r.children.map((e) => {
      const r2 = E(t, o, e, n, s);
      return g(r2) ? r2.map(({ vnode: t2 }) => t2) : r2 && r2.vnode;
    });
  else {
    let t2 = 0;
    for (const e of i) {
      if (!u && r[e]) {
        u = 1 === t2 ? JSON.stringify(r[e]) : r[e], f = t2 > 1;
        break;
      }
      t2++;
    }
  }
  const d2 = s && s.fullName || o, p2 = s && s.slotName || o;
  let { attrs: m2 } = r;
  if (m2 || "object" != typeof r)
    m2 || (m2 = {});
  else {
    m2 = { ...r }, delete m2.tag, delete m2.children, delete m2.to;
    for (const t2 of i)
      delete m2[t2];
  }
  if (l)
    u = U(t, p2, u, r);
  else {
    const e = !!c("contentAsAttribute");
    let { valueAttribute: o2 } = n;
    if (!o2 && e) {
      const [t2] = c("attributes");
      o2 = v(e) ? e : t2;
    }
    if (o2) {
      const { nameless: e2 } = n;
      if (!e2) {
        const t2 = n.keyAttribute || c("keyAttribute");
        t2 && (m2[t2] = d2);
      }
      m2[o2] = U(t, p2, m2[o2] || u, s), u = "";
    } else
      u = U(t, p2, u, r);
  }
  const b2 = s && s.tagNamespace ? `${s.tagNamespace}:${a}` : a;
  if ("title" === b2 && !t.isSSR)
    return void (document.title = u);
  f && u && (m2.innerHTML = u);
  const y2 = h(b2, m2, u || void 0);
  return { to: r.to, vnode: y2 };
}
function U({ metainfo: t, slots: e }, o, r, n) {
  const s = e && e[o];
  if (!s || !y(s))
    return r;
  const i = { content: r, metainfo: t };
  if (n && n.group) {
    const { group: t2, data: e2 } = n;
    i[t2] = e2;
  }
  const c = s(i);
  if (c && c.length) {
    const { children: t2 } = c[0];
    return t2 ? t2.toString() : "";
  }
  return r;
}
var z = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag;
var _ = ((t) => z ? Symbol("[vue-meta]: " + t) : "[vue-meta]: " + t)("meta_active");
function L(t, e, o) {
  for (const r in e)
    r in o ? S(t[r]) ? L(t[r], e[r], o[r]) : e[r] !== o[r] && (t[r] = e[r]) : t[r] = e[r];
  for (const r in o)
    e && r in e || delete t[r];
}
function q(t) {
  if (t || (t = getCurrentInstance() || void 0), t)
    return t.appContext.config.globalProperties.$metaManager;
}
function B(t, e) {
  const s = getCurrentInstance() || void 0;
  if (!e && s && (e = q(s)), !e)
    throw new Error("No manager or current instance");
  isProxy(t) && (watch(t, (t2, e2) => {
    L(i.meta, t2, e2);
  }), t = t.value);
  const i = e.addMeta(t, s);
  return i;
}
function I() {
  return inject(_);
}
var T = defineComponent({ name: "Metainfo", inheritAttrs: false, setup: (t, { slots: e }) => () => {
  const t2 = q();
  if (t2)
    return t2.render({ slots: e });
} });
function D(t, e, o, r) {
  const n = g(r) ? r : [r];
  t ? o.endsWith("Attrs") || n.forEach((t2) => {
    t2.props || (t2.props = {}), t2.props["data-vm-ssr"] = true;
  }) : n.forEach((t2, e2) => {
    t2.type === Comment && n.splice(e2, 1);
  }), e[o] || (e[o] = []), e[o].push(...n);
}
var H = (t = false, e, o) => J.create(t, e || b, o || m);
var _J = class _J {
  constructor(t, e, o, r) {
    __publicField(this, "isSSR", false);
    __publicField(this, "config");
    __publicField(this, "target");
    __publicField(this, "resolver");
    __publicField(this, "ssrCleanedUp", false);
    this.isSSR = t, this.config = e, this.target = o, r && "setup" in r && y(r.setup) && (this.resolver = r);
  }
  install(t) {
    t.component("Metainfo", T), t.config.globalProperties.$metaManager = this, t.provide(_, this.target.context.active);
  }
  addMeta(t, e) {
    e || (e = getCurrentInstance() || void 0);
    const r = { removed: [] }, n = { vm: e }, { resolver: s } = this;
    s && s.setup && s.setup(n);
    const i = this.target.addSource(t, n, true), c = (t2) => this.unmount(!!t2, i, r, e);
    return e && onUnmounted(c), { meta: i, onRemoved: (t2) => r.removed.push(t2), unmount: c };
  }
  unmount(t, e, o, r) {
    if (r) {
      const { $el: n } = r.proxy;
      if (n && n.offsetParent) {
        let r2 = new MutationObserver((s) => {
          for (const { removedNodes: i } of s)
            i && i.forEach((s2) => {
              s2 === n && r2 && (r2.disconnect(), r2 = void 0, this.reallyUnmount(t, e, o));
            });
        });
        return void r2.observe(n.parentNode, { childList: true });
      }
    }
    this.reallyUnmount(t, e, o);
  }
  async reallyUnmount(t, e, o) {
    this.target.delSource(e), !t && o && await Promise.all(o.removed.map((t2) => t2()));
  }
  render({ slots: t } = {}) {
    const o = this.target.context.active, { isSSR: r } = this;
    if (!r && !this.ssrCleanedUp) {
      this.ssrCleanedUp = true;
      const t2 = () => {
        const t3 = document.querySelectorAll("[data-vm-ssr]");
        t3 && t3.length && t3.forEach((t4) => t4.parentNode && t4.parentNode.removeChild(t4));
      };
      "loading" === document.readyState ? window.addEventListener("DOMContentLoaded", t2, { once: true }) : t2();
    }
    const n = {};
    for (const e in o) {
      const s = this.config[e] || {};
      let i = F({ isSSR: r, metainfo: o, slots: t }, e, o[e], s);
      if (!i)
        continue;
      g(i) || (i = [i]);
      let c = "base" !== e && o[e].to;
      !c && "to" in s && (c = s.to), !c && "attributesFor" in s && (c = e);
      for (const { to: t2, vnode: e2 } of i)
        D(this.isSSR, n, t2 || c || "head", e2);
    }
    if (t)
      for (const e in t) {
        const r2 = "default" === e ? "head" : e;
        if ("head" !== r2 && "body" !== r2)
          continue;
        const s = t[e];
        y(s) && D(this.isSSR, n, r2, s({ metainfo: o }));
      }
    return Object.keys(n).map((t2) => h(Teleport, { to: t2 }, n[t2]));
  }
};
__publicField(_J, "create", (t, e, o) => {
  const r = ((t2, e2) => {
    const o2 = [], r2 = { active: e2, resolve: t2, sources: o2 }, n = () => $(r2);
    return { context: r2, compute: n, addSource: (t3, e3, o3 = false) => {
      const s = P(r2, t3, e3 || {});
      return o3 && n(), s;
    }, delSource: (t3, e3 = true) => {
      const r3 = o2.findIndex((e4) => e4 === t3 || e4[R] === t3);
      return r3 > -1 && (o2.splice(r3, 1), e3 && n(), true);
    } };
  })((t2, e2, r2, n, s) => y(o) ? o(t2, e2, r2, n, s) : o.resolve(t2, e2, r2, n, s), reactive({}));
  return new _J(t, e, r, o);
});
var J = _J;
var W = { keyName: "metaInfo" };
var G = (t) => ({ created() {
  const e = getCurrentInstance();
  if (!(e == null ? void 0 : e.type) || !(t.keyName in e.type))
    return;
  const r = e.type[t.keyName];
  if (y(r)) {
    B(computed(r.bind(this)));
  } else
    B(r);
} });
var K = (t, e = {}) => {
  const o = Object.assign({}, W, e);
  t.mixin(G(o));
};
export {
  H as createMetaManager,
  m as deepestResolver,
  b as defaultConfig,
  q as getCurrentManager,
  K as plugin,
  d as resolveOption,
  I as useActiveMeta,
  B as useMeta
};
/*! Bundled license information:

vue-meta/dist/vue-meta.esm-browser.min.js:
  (**
   * vue-meta v3.0.0-alpha.10
   * (c) 2022
   * - Pim (@pimlie)
   * - All the amazing contributors
   * @license MIT
   *)
*/
//# sourceMappingURL=vue-meta.js.map
