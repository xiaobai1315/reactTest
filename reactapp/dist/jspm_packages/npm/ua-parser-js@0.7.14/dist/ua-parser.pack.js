"use strict";
/* */
"format cjs";
/**
 * UAParser.js v0.7.14
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 & MIT
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (i, s) {
  "use strict";
  var e = "0.7.14",
      o = "",
      r = "?",
      n = "function",
      a = "undefined",
      t = "object",
      d = "string",
      l = "major",
      w = "model",
      u = "name",
      c = "type",
      m = "vendor",
      p = "version",
      b = "architecture",
      g = "console",
      f = "mobile",
      h = "tablet",
      v = "smarttv",
      x = "wearable",
      k = "embedded",
      y = { extend: function extend(i, s) {
      var e = {};for (var o in i) {
        s[o] && s[o].length % 2 === 0 ? e[o] = s[o].concat(i[o]) : e[o] = i[o];
      }return e;
    }, has: function has(i, s) {
      return "string" == typeof i && s.toLowerCase().indexOf(i.toLowerCase()) !== -1;
    }, lowerize: function lowerize(i) {
      return i.toLowerCase();
    }, major: function major(i) {
      return (typeof i === "undefined" ? "undefined" : _typeof(i)) === d ? i.replace(/[^\d\.]/g, "").split(".")[0] : s;
    }, trim: function trim(i) {
      return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    } },
      T = { rgx: function rgx(i, e) {
      for (var o, r, a, d, l, w, u = 0; u < e.length && !l;) {
        var c = e[u],
            m = e[u + 1];for (o = r = 0; o < c.length && !l;) {
          if (l = c[o++].exec(i)) for (a = 0; a < m.length; a++) {
            w = l[++r], d = m[a], (typeof d === "undefined" ? "undefined" : _typeof(d)) === t && d.length > 0 ? 2 == d.length ? _typeof(d[1]) == n ? this[d[0]] = d[1].call(this, w) : this[d[0]] = d[1] : 3 == d.length ? _typeof(d[1]) !== n || d[1].exec && d[1].test ? this[d[0]] = w ? w.replace(d[1], d[2]) : s : this[d[0]] = w ? d[1].call(this, w, d[2]) : s : 4 == d.length && (this[d[0]] = w ? d[3].call(this, w.replace(d[1], d[2])) : s) : this[d] = w ? w : s;
          }
        }u += 2;
      }
    }, str: function str(i, e) {
      for (var o in e) {
        if (_typeof(e[o]) === t && e[o].length > 0) {
          for (var n = 0; n < e[o].length; n++) {
            if (y.has(e[o][n], i)) return o === r ? s : o;
          }
        } else if (y.has(e[o], i)) return o === r ? s : o;
      }return i;
    } },
      S = { browser: { oldsafari: { version: { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" } } }, device: { amazon: { model: { "Fire Phone": ["SD", "KF"] } }, sprint: { model: { "Evo Shift 4G": "7373KT" }, vendor: { HTC: "APA", Sprint: "Sprint" } } }, os: { windows: { version: { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2000: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" } } } },
      A = { browser: [[/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i], [u, p], [/(opios)[\/\s]+([\w\.]+)/i], [[u, "Opera Mini"], p], [/\s(opr)\/([\w\.]+)/i], [[u, "Opera"], p], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i], [u, p], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i], [[u, "IE"], p], [/(edge)\/((\d+)?[\w\.]+)/i], [u, p], [/(yabrowser)\/([\w\.]+)/i], [[u, "Yandex"], p], [/(puffin)\/([\w\.]+)/i], [[u, "Puffin"], p], [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i], [[u, "UCBrowser"], p], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], p], [/(micromessenger)\/([\w\.]+)/i], [[u, "WeChat"], p], [/(QQ)\/([\d\.]+)/i], [u, p], [/m?(qqbrowser)[\/\s]?([\w\.]+)/i], [u, p], [/xiaomi\/miuibrowser\/([\w\.]+)/i], [p, [u, "MIUI Browser"]], [/;fbav\/([\w\.]+);/i], [p, [u, "Facebook"]], [/(headlesschrome) ([\w\.]+)/i], [p, [u, "Chrome Headless"]], [/\swv\).+(chrome)\/([\w\.]+)/i], [[u, /(.+)/, "$1 WebView"], p], [/((?:oculus|samsung)browser)\/([\w\.]+)/i], [[u, /(.+(?:g|us))(.+)/, "$1 $2"], p], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i], [p, [u, "Android Browser"]], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i], [u, p], [/(dolfin)\/([\w\.]+)/i], [[u, "Dolphin"], p], [/((?:android.+)crmo|crios)\/([\w\.]+)/i], [[u, "Chrome"], p], [/(coast)\/([\w\.]+)/i], [[u, "Opera Coast"], p], [/fxios\/([\w\.-]+)/i], [p, [u, "Firefox"]], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i], [p, [u, "Mobile Safari"]], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i], [p, u], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i], [u, [p, T.str, S.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i], [u, p], [/(navigator|netscape)\/([\w\.-]+)/i], [[u, "Netscape"], p], [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i], [u, p]], cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i], [[b, "amd64"]], [/(ia32(?=;))/i], [[b, y.lowerize]], [/((?:i[346]|x)86)[;\)]/i], [[b, "ia32"]], [/windows\s(ce|mobile);\sppc;/i], [[b, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i], [[b, /ower/, "", y.lowerize]], [/(sun4\w)[;\)]/i], [[b, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i], [[b, y.lowerize]]], device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i], [w, m, [c, h]], [/applecoremedia\/[\w\.]+ \((ipad)/], [w, [m, "Apple"], [c, h]], [/(apple\s{0,1}tv)/i], [[w, "Apple TV"], [m, "Apple"]], [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i], [m, w, [c, h]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i], [w, [m, "Amazon"], [c, h]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i], [[w, T.str, S.device.amazon.model], [m, "Amazon"], [c, f]], [/\((ip[honed|\s\w*]+);.+(apple)/i], [w, m, [c, f]], [/\((ip[honed|\s\w*]+);/i], [w, [m, "Apple"], [c, f]], [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i], [m, w, [c, f]], [/\(bb10;\s(\w+)/i], [w, [m, "BlackBerry"], [c, f]], [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i], [w, [m, "Asus"], [c, h]], [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i], [[m, "Sony"], [w, "Xperia Tablet"], [c, h]], [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i], [w, [m, "Sony"], [c, f]], [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i], [m, w, [c, g]], [/android.+;\s(shield)\sbuild/i], [w, [m, "Nvidia"], [c, g]], [/(playstation\s[34portablevi]+)/i], [w, [m, "Sony"], [c, g]], [/(sprint\s(\w+))/i], [[m, T.str, S.device.sprint.vendor], [w, T.str, S.device.sprint.model], [c, f]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i], [m, w, [c, h]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i], [m, [w, /_/g, " "], [c, f]], [/(nexus\s9)/i], [w, [m, "HTC"], [c, h]], [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i], [w, [m, "Huawei"], [c, f]], [/(microsoft);\s(lumia[\s\w]+)/i], [m, w, [c, f]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i], [w, [m, "Microsoft"], [c, g]], [/(kin\.[onetw]{3})/i], [[w, /\./g, " "], [m, "Microsoft"], [c, f]], [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i], [w, [m, "Motorola"], [c, f]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [w, [m, "Motorola"], [c, h]], [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i], [[m, y.trim], [w, y.trim], [c, v]], [/hbbtv.+maple;(\d+)/i], [[w, /^/, "SmartTV"], [m, "Samsung"], [c, v]], [/\(dtv[\);].+(aquos)/i], [w, [m, "Sharp"], [c, v]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[m, "Samsung"], w, [c, h]], [/smart-tv.+(samsung)/i], [m, [c, v], w], [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[m, "Samsung"], w, [c, f]], [/sie-(\w+)*/i], [w, [m, "Siemens"], [c, f]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i], [[m, "Nokia"], w, [c, f]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i], [w, [m, "Acer"], [c, h]], [/android.+([vl]k\-?\d{3})\s+build/i], [w, [m, "LG"], [c, h]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i], [[m, "LG"], w, [c, h]], [/(lg) netcast\.tv/i], [m, w, [c, v]], [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i, /android.+lg(\-?[\d\w]+)\s+build/i], [w, [m, "LG"], [c, f]], [/android.+(ideatab[a-z0-9\-\s]+)/i], [w, [m, "Lenovo"], [c, h]], [/linux;.+((jolla));/i], [m, w, [c, f]], [/((pebble))app\/[\d\.]+\s/i], [m, w, [c, x]], [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i], [m, w, [c, f]], [/crkey/i], [[w, "Chromecast"], [m, "Google"]], [/android.+;\s(glass)\s\d/i], [w, [m, "Google"], [c, x]], [/android.+;\s(pixel c)\s/i], [w, [m, "Google"], [c, h]], [/android.+;\s(pixel xl|pixel)\s/i], [w, [m, "Google"], [c, f]], [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i], [[w, /_/g, " "], [m, "Xiaomi"], [c, f]], [/android.+;\s(m[1-5]\snote)\sbuild/i], [w, [m, "Meizu"], [c, h]], [/android.+a000(1)\s+build/i], [w, [m, "OnePlus"], [c, f]], [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i], [w, [m, "RCA"], [c, h]], [/android.+[;\/]\s*(Venue[\d\s]*)\s+build/i], [w, [m, "Dell"], [c, h]], [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i], [w, [m, "Verizon"], [c, h]], [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i], [[m, "Barnes & Noble"], w, [c, h]], [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i], [w, [m, "NuVision"], [c, h]], [/android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i], [[m, "ZTE"], w, [c, h]], [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i], [w, [m, "Swiss"], [c, f]], [/android.+[;\/]\s*(zur\d{3})\s+build/i], [w, [m, "Swiss"], [c, h]], [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i], [w, [m, "Zeki"], [c, h]], [/(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i], [[m, "Dragon Touch"], w, [c, h]], [/android.+[;\/]\s*(NS-?.+)\s+build/i], [w, [m, "Insignia"], [c, h]], [/android.+[;\/]\s*((NX|Next)-?.+)\s+build/i], [w, [m, "NextBook"], [c, h]], [/android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i], [[m, "Voice"], w, [c, f]], [/android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i], [[m, "LvTel"], w, [c, f]], [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i], [w, [m, "Envizen"], [c, h]], [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i], [m, w, [c, h]], [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i], [w, [m, "MachSpeed"], [c, h]], [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i], [m, w, [c, h]], [/android.+[;\/]\s*TU_(1491)\s+build/i], [w, [m, "Rotor"], [c, h]], [/android.+(KS(.+))\s+build/i], [w, [m, "Amazon"], [c, h]], [/android.+(Gigaset)[\s\-]+(Q.+)\s+build/i], [m, w, [c, h]], [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i], [[c, y.lowerize], m, w], [/(android.+)[;\/].+build/i], [w, [m, "Generic"]]], engine: [[/windows.+\sedge\/([\w\.]+)/i], [p, [u, "EdgeHTML"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i], [u, p], [/rv\:([\w\.]+).*(gecko)/i], [p, u]], os: [[/microsoft\s(windows)\s(vista|xp)/i], [u, p], [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [u, [p, T.str, S.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[u, "Windows"], [p, T.str, S.os.windows.version]], [/\((bb)(10);/i], [[u, "BlackBerry"], p], [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i], [u, p], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i], [[u, "Symbian"], p], [/\((series40);/i], [u], [/mozilla.+\(mobile;.+gecko.+firefox/i], [[u, "Firefox OS"], p], [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i], [u, p], [/(cros)\s[\w]+\s([\w\.]+\w)/i], [[u, "Chromium OS"], p], [/(sunos)\s?([\w\.]+\d)*/i], [[u, "Solaris"], p], [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i], [u, p], [/(haiku)\s(\w+)/i], [u, p], [/cfnetwork\/.+darwin/i, /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i], [[p, /_/g, "."], [u, "iOS"]], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i], [[u, "Mac OS"], [p, /_/g, "."]], [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i], [u, p]] },
      E = function E(i, s) {
    this[u] = i, this[p] = s;
  },
      N = function N(i) {
    this[b] = i;
  },
      z = function z(i, s, e) {
    this[m] = i, this[w] = s, this[c] = e;
  },
      M = E,
      O = E,
      R = function R(e, r) {
    if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (r = e, e = s), !(this instanceof R)) return new R(e, r).getResult();var n = e || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : o),
        a = r ? y.extend(A, r) : A,
        t = new E(),
        d = new N(),
        l = new z(),
        w = new M(),
        u = new O();return this.getBrowser = function () {
      return T.rgx.call(t, n, a.browser), t.major = y.major(t.version), t;
    }, this.getCPU = function () {
      return T.rgx.call(d, n, a.cpu), d;
    }, this.getDevice = function () {
      return T.rgx.call(l, n, a.device), l;
    }, this.getEngine = function () {
      return T.rgx.call(w, n, a.engine), w;
    }, this.getOS = function () {
      return T.rgx.call(u, n, a.os), u;
    }, this.getResult = function () {
      return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
    }, this.getUA = function () {
      return n;
    }, this.setUA = function (i) {
      return n = i, t = new E(), d = new N(), l = new z(), w = new M(), u = new O(), this;
    }, this;
  };R.VERSION = e, R.BROWSER = { NAME: u, MAJOR: l, VERSION: p }, R.CPU = { ARCHITECTURE: b }, R.DEVICE = { MODEL: w, VENDOR: m, TYPE: c, CONSOLE: g, MOBILE: f, SMARTTV: v, TABLET: h, WEARABLE: x, EMBEDDED: k }, R.ENGINE = { NAME: u, VERSION: p }, R.OS = { NAME: u, VERSION: p }, (typeof exports === "undefined" ? "undefined" : _typeof(exports)) !== a ? ((typeof module === "undefined" ? "undefined" : _typeof(module)) !== a && module.exports && (exports = module.exports = R), exports.UAParser = R) : (typeof define === "undefined" ? "undefined" : _typeof(define)) === n && define.amd ? define(function () {
    return R;
  }) : i && (i.UAParser = R);var C = i && (i.jQuery || i.Zepto);if ((typeof C === "undefined" ? "undefined" : _typeof(C)) !== a) {
    var V = new R();C.ua = V.getResult(), C.ua.get = function () {
      return V.getUA();
    }, C.ua.set = function (i) {
      V.setUA(i);var s = V.getResult();for (var e in s) {
        C.ua[e] = s[e];
      }
    };
  }
}("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : undefined);
//# sourceMappingURL=ua-parser.pack.js.map