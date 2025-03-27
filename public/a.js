(self.__LOADABLE_LOADED_CHUNKS__ = self.__LOADABLE_LOADED_CHUNKS__ || []).push([
  ['8913'],
  {
    790466: function (e, t) {
      'use strict';
      t.Z = {
        container: 'container-DVdHnp',
        dimensionContainer: 'dimensionContainer-OkO2_f',
        dimension: 'dimension-SCkyBA',
        kindText: 'kindText-KpPQ2C',
        valueInput: 'valueInput-A3UGF0',
        dimensionDisable: 'dimensionDisable-NmbeVZ',
        lockIconContainer: 'lockIconContainer-oVWmtb',
        lockIcon: 'lockIcon-TTCaSZ',
        lockIconDisable: 'lockIconDisable-zwOJ3C',
        lockIconContainerDisable: 'lockIconContainerDisable-yug_Dd',
        dimensionErrTips: 'dimensionErrTips-Cu7Ox7',
      };
    },
    84531: function (e, t) {
      'use strict';
      t.Z = {
        brushContainer: 'brushContainer-mNLHfB',
        sliderBarBrush: 'sliderBarBrush-eISzC_',
        sliderBarEraser: 'sliderBarEraser-hlFUAD',
        icon: 'icon-MXSgIv',
      };
    },
    455848: function (e, t) {
      'use strict';
      t.Z = {
        container: 'container-As5_Ou',
        tooltipContainer: 'tooltipContainer-NlNbBC',
        abilityType: 'abilityType-laO3IY',
        checkbox: 'checkbox-sQZRa9',
        checkboxContent: 'checkboxContent-___N6S',
        checkboxText: 'checkboxText-Qsu573',
        checkboxSelected: 'checkboxSelected-ufbKiq',
        checkboxTextDisabled: 'checkboxTextDisabled-TEPoG0',
        checkboxTextSelected: 'checkboxTextSelected-jq4ewo',
        divide: 'divide-wLlHVk',
        hoverVideoWrap: 'hoverVideoWrap-ZL8Lv7',
        hoverVideo: 'hoverVideo-ANJRHv',
        hoverTip: 'hoverTip-OnX9cy',
        hoverImage: 'hoverImage-X1RTCW',
        image: 'image-agxiDY',
        hoverUsedText: 'hoverUsedText-KAiJ9X',
        dropdownContent: 'dropdownContent-LhGycN',
        dropdownTips: 'dropdownTips-rzeX29',
        dropdownBtn: 'dropdownBtn-qXJ6tM',
      };
    },
    789367: function (e, t) {
      'use strict';
      t.Z = {
        'style-reference-interact': 'style-reference-interact-VemuKf',
        styleReferenceInteract: 'style-reference-interact-VemuKf',
      };
    },
    725416: function (e, t) {
      'use strict';
      t.Z = {
        paintContainer: 'paintContainer-jKo_Zm',
        paintContent: 'paintContent-IzWvvc',
        imageWrap: 'imageWrap-UV8Lnw',
        image: 'image-NNexME',
        imagineGraphicEditor: 'imagineGraphicEditor-iePKKa',
        hidden: 'hidden-FE5YPJ',
        fadeOut: 'fadeOut-yXzAAt',
        visible: 'visible-q7Bqe2',
        fadeIn: 'fadeIn-gzERGg',
      };
    },
    113781: function (e, t, i) {
      var n = i(355595);
      (t.encrypt = function (e, t) {
        var i = n(t, e._prev);
        return (e._prev = e._cipher.encryptBlock(i)), e._prev;
      }),
        (t.decrypt = function (e, t) {
          var i = e._prev;
          return (e._prev = t), n(e._cipher.decryptBlock(t), i);
        });
    },
    735287: function (e, t, i) {
      var n = i(140860).Buffer,
        r = i(355595);
      function a(e, t, i) {
        var a = t.length,
          s = r(t, e._cache);
        return (
          (e._cache = e._cache.slice(a)),
          (e._prev = n.concat([e._prev, i ? t : s])),
          s
        );
      }
      t.encrypt = function (e, t, i) {
        for (var r, s = n.allocUnsafe(0); t.length; )
          if (
            (0 === e._cache.length &&
              ((e._cache = e._cipher.encryptBlock(e._prev)),
              (e._prev = n.allocUnsafe(0))),
            e._cache.length <= t.length)
          )
            (r = e._cache.length),
              (s = n.concat([s, a(e, t.slice(0, r), i)])),
              (t = t.slice(r));
          else {
            s = n.concat([s, a(e, t, i)]);
            break;
          }
        return s;
      };
    },
    675464: function (e, t, i) {
      var n = {
          ECB: i(507714),
          CBC: i(113781),
          CFB: i(735287),
          CFB8: i(409789),
          CFB1: i(222386),
          OFB: i(82760),
          CTR: i(868937),
          GCM: i(868937),
        },
        r = i(641601);
      for (var a in r) r[a].module = n[r[a].mode];
      e.exports = r;
    },
    975952: function (e, t, i) {
      t.isArray = function (e) {
        return Array.isArray ? Array.isArray(e) : '[object Array]' === n(e);
      };
      t.isBoolean = function (e) {
        return 'boolean' == typeof e;
      };
      t.isNull = function (e) {
        return null === e;
      };
      t.isNullOrUndefined = function (e) {
        return null == e;
      };
      t.isNumber = function (e) {
        return 'number' == typeof e;
      };
      t.isString = function (e) {
        return 'string' == typeof e;
      };
      t.isSymbol = function (e) {
        return 'symbol' == typeof e;
      };
      t.isUndefined = function (e) {
        return void 0 === e;
      };
      t.isRegExp = function (e) {
        return '[object RegExp]' === n(e);
      };
      t.isObject = function (e) {
        return 'object' == typeof e && null !== e;
      };
      t.isDate = function (e) {
        return '[object Date]' === n(e);
      };
      t.isError = function (e) {
        return '[object Error]' === n(e) || e instanceof Error;
      };
      t.isFunction = function (e) {
        return 'function' == typeof e;
      };
      function n(e) {
        return Object.prototype.toString.call(e);
      }
      (t.isPrimitive = function (e) {
        return (
          null === e ||
          'boolean' == typeof e ||
          'number' == typeof e ||
          'string' == typeof e ||
          'symbol' == typeof e ||
          void 0 === e
        );
      }),
        (t.isBuffer = i(966465).Buffer.isBuffer);
    },
    193790: function (e, t, i) {
      'use strict';
      var n = i(32016),
        r = i(724779),
        a = i(23420),
        s = i(140860).Buffer,
        o = i(318042),
        c = i(866818),
        h = i(673664),
        d = s.alloc(128);
      function u(e, t) {
        a.call(this, 'digest'), 'string' == typeof t && (t = s.from(t));
        var i = 'sha512' === e || 'sha384' === e ? 128 : 64;
        (this._alg = e),
          (this._key = t),
          t.length > i
            ? (t = ('rmd160' === e ? new c() : h(e)).update(t).digest())
            : t.length < i && (t = s.concat([t, d], i));
        for (
          var n = (this._ipad = s.allocUnsafe(i)),
            r = (this._opad = s.allocUnsafe(i)),
            o = 0;
          o < i;
          o++
        )
          (n[o] = 54 ^ t[o]), (r[o] = 92 ^ t[o]);
        (this._hash = 'rmd160' === e ? new c() : h(e)), this._hash.update(n);
      }
      n(u, a),
        (u.prototype._update = function (e) {
          this._hash.update(e);
        }),
        (u.prototype._final = function () {
          var e = this._hash.digest();
          return ('rmd160' === this._alg ? new c() : h(this._alg))
            .update(this._opad)
            .update(e)
            .digest();
        }),
        (e.exports = function (e, t) {
          return 'rmd160' === (e = e.toLowerCase()) || 'ripemd160' === e
            ? new u('rmd160', t)
            : 'md5' === e
            ? new r(o, t)
            : new u(e, t);
        });
    },
    150852: function (e, t, i) {
      'use strict';
      var n = i(422555);
      function r(e) {
        (this.options = e),
          (this.type = this.options.type),
          (this.blockSize = 8),
          this._init(),
          (this.buffer = Array(this.blockSize)),
          (this.bufferOff = 0),
          (this.padding = !1 !== e.padding);
      }
      (e.exports = r),
        (r.prototype._init = function () {}),
        (r.prototype.update = function (e) {
          return 0 === e.length
            ? []
            : 'decrypt' === this.type
            ? this._updateDecrypt(e)
            : this._updateEncrypt(e);
        }),
        (r.prototype._buffer = function (e, t) {
          for (
            var i = Math.min(this.buffer.length - this.bufferOff, e.length - t),
              n = 0;
            n < i;
            n++
          )
            this.buffer[this.bufferOff + n] = e[t + n];
          return (this.bufferOff += i), i;
        }),
        (r.prototype._flushBuffer = function (e, t) {
          return (
            this._update(this.buffer, 0, e, t),
            (this.bufferOff = 0),
            this.blockSize
          );
        }),
        (r.prototype._updateEncrypt = function (e) {
          var t = 0,
            i = 0,
            n = Array(
              (((this.bufferOff + e.length) / this.blockSize) | 0) *
                this.blockSize
            );
          0 !== this.bufferOff &&
            ((t += this._buffer(e, t)),
            this.bufferOff === this.buffer.length &&
              (i += this._flushBuffer(n, i)));
          for (
            var r = e.length - ((e.length - t) % this.blockSize);
            t < r;
            t += this.blockSize
          )
            this._update(e, t, n, i), (i += this.blockSize);
          for (; t < e.length; t++, this.bufferOff++)
            this.buffer[this.bufferOff] = e[t];
          return n;
        }),
        (r.prototype._updateDecrypt = function (e) {
          for (
            var t = 0,
              i = 0,
              n = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1,
              r = Array(n * this.blockSize);
            n > 0;
            n--
          )
            (t += this._buffer(e, t)), (i += this._flushBuffer(r, i));
          return (t += this._buffer(e, t)), r;
        }),
        (r.prototype.final = function (e) {
          var t, i;
          return (e && (t = this.update(e)),
          (i =
            'encrypt' === this.type
              ? this._finalEncrypt()
              : this._finalDecrypt()),
          t)
            ? t.concat(i)
            : i;
        }),
        (r.prototype._pad = function (e, t) {
          if (0 === t) return !1;
          for (; t < e.length; ) e[t++] = 0;
          return !0;
        }),
        (r.prototype._finalEncrypt = function () {
          if (!this._pad(this.buffer, this.bufferOff)) return [];
          var e = Array(this.blockSize);
          return this._update(this.buffer, 0, e, 0), e;
        }),
        (r.prototype._unpad = function (e) {
          return e;
        }),
        (r.prototype._finalDecrypt = function () {
          n.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
          var e = Array(this.blockSize);
          return this._flushBuffer(e, 0), this._unpad(e);
        });
    },
    249111: function (e, t, i) {
      var n = i(966465).Buffer,
        r = i(984826),
        a = new (i(350724))(),
        s = new r(24),
        o = new r(11),
        c = new r(10),
        h = new r(3),
        d = new r(7),
        u = i(686927),
        l = i(203960);
      function p(e, t) {
        return (
          (t = t || 'utf8'),
          !n.isBuffer(e) && (e = new n(e, t)),
          (this._pub = new r(e)),
          this
        );
      }
      function f(e, t) {
        return (
          (t = t || 'utf8'),
          !n.isBuffer(e) && (e = new n(e, t)),
          (this._priv = new r(e)),
          this
        );
      }
      e.exports = x;
      var _ = {};
      function x(e, t, i) {
        this.setGenerator(t),
          (this.__prime = new r(e)),
          (this._prime = r.mont(this.__prime)),
          (this._primeLen = e.length),
          (this._pub = void 0),
          (this._priv = void 0),
          (this._primeCode = void 0),
          i
            ? ((this.setPublicKey = p), (this.setPrivateKey = f))
            : (this._primeCode = 8);
      }
      function g(e, t) {
        var i = new n(e.toArray());
        return t ? i.toString(t) : i;
      }
      Object.defineProperty(x.prototype, 'verifyError', {
        enumerable: !0,
        get: function () {
          return (
            'number' != typeof this._primeCode &&
              (this._primeCode = (function (e, t) {
                var i,
                  n = t.toString('hex'),
                  r = [n, e.toString(16)].join('_');
                if (r in _) return _[r];
                var l = 0;
                if (
                  e.isEven() ||
                  !u.simpleSieve ||
                  !u.fermatTest(e) ||
                  !a.test(e)
                )
                  return (
                    (l += 1),
                    '02' === n || '05' === n ? (l += 8) : (l += 4),
                    (_[r] = l),
                    l
                  );
                switch ((!a.test(e.shrn(1)) && (l += 2), n)) {
                  case '02':
                    e.mod(s).cmp(o) && (l += 8);
                    break;
                  case '05':
                    (i = e.mod(c)).cmp(h) && i.cmp(d) && (l += 8);
                    break;
                  default:
                    l += 4;
                }
                return (_[r] = l), l;
              })(this.__prime, this.__gen)),
            this._primeCode
          );
        },
      }),
        (x.prototype.generateKeys = function () {
          return (
            !this._priv && (this._priv = new r(l(this._primeLen))),
            (this._pub = this._gen
              .toRed(this._prime)
              .redPow(this._priv)
              .fromRed()),
            this.getPublicKey()
          );
        }),
        (x.prototype.computeSecret = function (e) {
          var t = new n(
              (e = (e = new r(e)).toRed(this._prime))
                .redPow(this._priv)
                .fromRed()
                .toArray()
            ),
            i = this.getPrime();
          if (t.length < i.length) {
            var a = new n(i.length - t.length);
            a.fill(0), (t = n.concat([a, t]));
          }
          return t;
        }),
        (x.prototype.getPublicKey = function (e) {
          return g(this._pub, e);
        }),
        (x.prototype.getPrivateKey = function (e) {
          return g(this._priv, e);
        }),
        (x.prototype.getPrime = function (e) {
          return g(this.__prime, e);
        }),
        (x.prototype.getGenerator = function (e) {
          return g(this._gen, e);
        }),
        (x.prototype.setGenerator = function (e, t) {
          return (
            (t = t || 'utf8'),
            !n.isBuffer(e) && (e = new n(e, t)),
            (this.__gen = e),
            (this._gen = new r(e)),
            this
          );
        });
    },
    774784: function (e, t, i) {
      'use strict';
      (t.base = i(105634)),
        (t.short = i(777879)),
        (t.mont = i(604458)),
        (t.edwards = i(438800));
    },
    866923: function (e, t, i) {
      'use strict';
      var n = i(696225),
        r = i(199408),
        a = i(422555),
        s = n.rotr64_hi,
        o = n.rotr64_lo,
        c = n.shr64_hi,
        h = n.shr64_lo,
        d = n.sum64,
        u = n.sum64_hi,
        l = n.sum64_lo,
        p = n.sum64_4_hi,
        f = n.sum64_4_lo,
        _ = n.sum64_5_hi,
        x = n.sum64_5_lo,
        g = r.BlockHash,
        v = [
          0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf,
          0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
          0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5,
          0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
          0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74,
          0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
          0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786,
          0x384f25e3, 0xfc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f,
          0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4,
          0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d,
          0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
          0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x6ca6351, 0xe003826f,
          0x14292967, 0xa0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
          0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354,
          0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6,
          0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b,
          0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x654be30, 0xd192e819,
          0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a,
          0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08,
          0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
          0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f,
          0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc,
          0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208,
          0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
          0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece,
          0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e,
          0xf57d4f7f, 0xee6ed178, 0x6f067aa, 0x72176fba, 0xa637dc5, 0xa2c898a6,
          0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5,
          0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
          0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c,
          0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
        ];
      function m() {
        if (!(this instanceof m)) return new m();
        g.call(this),
          (this.h = [
            0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372,
            0xfe94f82b, 0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1,
            0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19,
            0x137e2179,
          ]),
          (this.k = v),
          (this.W = Array(160));
      }
      n.inherits(m, g),
        (e.exports = m),
        (m.blockSize = 1024),
        (m.outSize = 512),
        (m.hmacStrength = 192),
        (m.padLength = 128),
        (m.prototype._prepareBlock = function (e, t) {
          for (var i = this.W, n = 0; n < 32; n++) i[n] = e[t + n];
          for (; n < i.length; n += 2) {
            var r = (function (e, t) {
                var i = s(e, t, 19) ^ s(t, e, 29) ^ c(e, t, 6);
                return i < 0 && (i += 0x100000000), i;
              })(i[n - 4], i[n - 3]),
              a = (function (e, t) {
                var i = o(e, t, 19) ^ o(t, e, 29) ^ h(e, t, 6);
                return i < 0 && (i += 0x100000000), i;
              })(i[n - 4], i[n - 3]),
              d = i[n - 14],
              u = i[n - 13],
              l = (function (e, t) {
                var i = s(e, t, 1) ^ s(e, t, 8) ^ c(e, t, 7);
                return i < 0 && (i += 0x100000000), i;
              })(i[n - 30], i[n - 29]),
              _ = (function (e, t) {
                var i = o(e, t, 1) ^ o(e, t, 8) ^ h(e, t, 7);
                return i < 0 && (i += 0x100000000), i;
              })(i[n - 30], i[n - 29]),
              x = i[n - 32],
              g = i[n - 31];
            (i[n] = p(r, a, d, u, l, _, x, g)),
              (i[n + 1] = f(r, a, d, u, l, _, x, g));
          }
        }),
        (m.prototype._update = function (e, t) {
          this._prepareBlock(e, t);
          var i = this.W,
            n = this.h[0],
            r = this.h[1],
            c = this.h[2],
            h = this.h[3],
            p = this.h[4],
            f = this.h[5],
            g = this.h[6],
            v = this.h[7],
            m = this.h[8],
            b = this.h[9],
            y = this.h[10],
            w = this.h[11],
            S = this.h[12],
            C = this.h[13],
            I = this.h[14],
            k = this.h[15];
          a(this.k.length === i.length);
          for (var z = 0; z < i.length; z += 2) {
            var T = I,
              N = k,
              P = (function (e, t) {
                var i = s(e, t, 14) ^ s(e, t, 18) ^ s(t, e, 9);
                return i < 0 && (i += 0x100000000), i;
              })(m, b),
              E = (function (e, t) {
                var i = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
                return i < 0 && (i += 0x100000000), i;
              })(m, b),
              D = (function (e, t, i, n, r) {
                var a = (e & i) ^ (~e & r);
                return a < 0 && (a += 0x100000000), a;
              })(m, b, y, w, S, C),
              R = (function (e, t, i, n, r, a) {
                var s = (t & n) ^ (~t & a);
                return s < 0 && (s += 0x100000000), s;
              })(m, b, y, w, S, C),
              O = this.k[z],
              B = this.k[z + 1],
              L = i[z],
              M = i[z + 1],
              j = _(T, N, P, E, D, R, O, B, L, M),
              A = x(T, N, P, E, D, R, O, B, L, M);
            (T = (function (e, t) {
              var i = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7);
              return i < 0 && (i += 0x100000000), i;
            })(n, r)),
              (N = (function (e, t) {
                var i = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
                return i < 0 && (i += 0x100000000), i;
              })(n, r)),
              (P = (function (e, t, i, n, r) {
                var a = (e & i) ^ (e & r) ^ (i & r);
                return a < 0 && (a += 0x100000000), a;
              })(n, r, c, h, p, f));
            var Z = u(
                T,
                N,
                P,
                (E = (function (e, t, i, n, r, a) {
                  var s = (t & n) ^ (t & a) ^ (n & a);
                  return s < 0 && (s += 0x100000000), s;
                })(n, r, c, h, p, f))
              ),
              U = l(T, N, P, E);
            (I = S),
              (k = C),
              (S = y),
              (C = w),
              (y = m),
              (w = b),
              (m = u(g, v, j, A)),
              (b = l(v, v, j, A)),
              (g = p),
              (v = f),
              (p = c),
              (f = h),
              (c = n),
              (h = r),
              (n = u(j, A, Z, U)),
              (r = l(j, A, Z, U));
          }
          d(this.h, 0, n, r),
            d(this.h, 2, c, h),
            d(this.h, 4, p, f),
            d(this.h, 6, g, v),
            d(this.h, 8, m, b),
            d(this.h, 10, y, w),
            d(this.h, 12, S, C),
            d(this.h, 14, I, k);
        }),
        (m.prototype._digest = function (e) {
          return 'hex' === e
            ? n.toHex32(this.h, 'big')
            : n.split32(this.h, 'big');
        });
    },
    196589: function (e, t, i) {
      (t.publicEncrypt = i(286413)),
        (t.privateDecrypt = i(304944)),
        (t.privateEncrypt = function (e, i) {
          return t.publicEncrypt(e, i, !0);
        }),
        (t.publicDecrypt = function (e, i) {
          return t.privateDecrypt(e, i, !0);
        });
    },
    9810: function (e, t, i) {
      var n = i(669683),
        r = i(140860).Buffer;
      e.exports = function (e, t) {
        for (var i, a = r.alloc(0), s = 0; a.length < t; )
          (i = (function (e) {
            var t = r.allocUnsafe(4);
            return t.writeUInt32BE(e, 0), t;
          })(s++)),
            (a = r.concat([a, n('sha1').update(e).update(i).digest()]));
        return a.slice(0, t);
      };
    },
    673664: function (e, t, i) {
      var n = (e.exports = function (e) {
        var t = n[(e = e.toLowerCase())];
        if (!t) throw Error(e + ' is not supported (we accept pull requests)');
        return new t();
      });
      (n.sha = i(726087)),
        (n.sha1 = i(881606)),
        (n.sha224 = i(559601)),
        (n.sha256 = i(965183)),
        (n.sha384 = i(985919)),
        (n.sha512 = i(131837));
    },
    726087: function (e, t, i) {
      var n = i(32016),
        r = i(696772),
        a = i(140860).Buffer,
        s = [0x5a827999, 0x6ed9eba1, -0x70e44324, -0x359d3e2a],
        o = Array(80);
      function c() {
        this.init(), (this._w = o), r.call(this, 64, 56);
      }
      n(c, r),
        (c.prototype.init = function () {
          return (
            (this._a = 0x67452301),
            (this._b = 0xefcdab89),
            (this._c = 0x98badcfe),
            (this._d = 0x10325476),
            (this._e = 0xc3d2e1f0),
            this
          );
        });
      (c.prototype._update = function (e) {
        for (
          var t = this._w,
            i = 0 | this._a,
            n = 0 | this._b,
            r = 0 | this._c,
            a = 0 | this._d,
            o = 0 | this._e,
            c = 0;
          c < 16;
          ++c
        )
          t[c] = e.readInt32BE(4 * c);
        for (; c < 80; ++c) t[c] = t[c - 3] ^ t[c - 8] ^ t[c - 14] ^ t[c - 16];
        for (var h = 0; h < 80; ++h) {
          var d,
            u,
            l,
            p,
            f,
            _,
            x = ~~(h / 20);
          var g =
            ((((d = i) << 5) | (d >>> 27)) +
              ((u = x),
              (l = n),
              (p = r),
              (f = a),
              0 === u
                ? (l & p) | (~l & f)
                : 2 === u
                ? (l & p) | (l & f) | (p & f)
                : l ^ p ^ f) +
              o +
              t[h] +
              s[x]) |
            0;
          (o = a), (a = r), (r = ((_ = n) << 30) | (_ >>> 2)), (n = i), (i = g);
        }
        (this._a = (i + this._a) | 0),
          (this._b = (n + this._b) | 0),
          (this._c = (r + this._c) | 0),
          (this._d = (a + this._d) | 0),
          (this._e = (o + this._e) | 0);
      }),
        (c.prototype._hash = function () {
          var e = a.allocUnsafe(20);
          return (
            e.writeInt32BE(0 | this._a, 0),
            e.writeInt32BE(0 | this._b, 4),
            e.writeInt32BE(0 | this._c, 8),
            e.writeInt32BE(0 | this._d, 12),
            e.writeInt32BE(0 | this._e, 16),
            e
          );
        }),
        (e.exports = c);
    },
    965183: function (e, t, i) {
      var n = i(32016),
        r = i(696772),
        a = i(140860).Buffer,
        s = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
          0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
          0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7,
          0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f,
          0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d,
          0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x6ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354,
          0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
          0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585,
          0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
          0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee,
          0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb,
          0xbef9a3f7, 0xc67178f2,
        ],
        o = Array(64);
      function c() {
        this.init(), (this._w = o), r.call(this, 64, 56);
      }
      n(c, r),
        (c.prototype.init = function () {
          return (
            (this._a = 0x6a09e667),
            (this._b = 0xbb67ae85),
            (this._c = 0x3c6ef372),
            (this._d = 0xa54ff53a),
            (this._e = 0x510e527f),
            (this._f = 0x9b05688c),
            (this._g = 0x1f83d9ab),
            (this._h = 0x5be0cd19),
            this
          );
        });
      (c.prototype._update = function (e) {
        for (
          var t = this._w,
            i = 0 | this._a,
            n = 0 | this._b,
            r = 0 | this._c,
            a = 0 | this._d,
            o = 0 | this._e,
            c = 0 | this._f,
            h = 0 | this._g,
            d = 0 | this._h,
            u = 0;
          u < 16;
          ++u
        )
          t[u] = e.readInt32BE(4 * u);
        for (; u < 64; ++u) {
          t[u] =
            (((((p = t[u - 2]) >>> 17) | (p << 15)) ^
              ((p >>> 19) | (p << 13)) ^
              (p >>> 10)) +
              t[u - 7] +
              ((((f = t[u - 15]) >>> 7) | (f << 25)) ^
                ((f >>> 18) | (f << 14)) ^
                (f >>> 3)) +
              t[u - 16]) |
            0;
        }
        for (var l = 0; l < 64; ++l) {
          var p,
            f,
            _,
            x,
            g,
            v,
            m,
            b,
            y,
            w =
              (d +
                ((((_ = o) >>> 6) | (_ << 26)) ^
                  ((_ >>> 11) | (_ << 21)) ^
                  ((_ >>> 25) | (_ << 7))) +
                ((x = o), (g = c), (v = h) ^ (x & (g ^ v))) +
                s[l] +
                t[l]) |
              0;
          var S =
            (((((m = i) >>> 2) | (m << 30)) ^
              ((m >>> 13) | (m << 19)) ^
              ((m >>> 22) | (m << 10))) +
              (((b = i) & (y = n)) | (r & (b | y)))) |
            0;
          (d = h),
            (h = c),
            (c = o),
            (o = (a + w) | 0),
            (a = r),
            (r = n),
            (n = i),
            (i = (w + S) | 0);
        }
        (this._a = (i + this._a) | 0),
          (this._b = (n + this._b) | 0),
          (this._c = (r + this._c) | 0),
          (this._d = (a + this._d) | 0),
          (this._e = (o + this._e) | 0),
          (this._f = (c + this._f) | 0),
          (this._g = (h + this._g) | 0),
          (this._h = (d + this._h) | 0);
      }),
        (c.prototype._hash = function () {
          var e = a.allocUnsafe(32);
          return (
            e.writeInt32BE(this._a, 0),
            e.writeInt32BE(this._b, 4),
            e.writeInt32BE(this._c, 8),
            e.writeInt32BE(this._d, 12),
            e.writeInt32BE(this._e, 16),
            e.writeInt32BE(this._f, 20),
            e.writeInt32BE(this._g, 24),
            e.writeInt32BE(this._h, 28),
            e
          );
        }),
        (e.exports = c);
    },
    131837: function (e, t, i) {
      var n = i(32016),
        r = i(696772),
        a = i(140860).Buffer,
        s = [
          0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf,
          0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538,
          0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5,
          0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
          0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74,
          0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235,
          0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786,
          0x384f25e3, 0xfc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f,
          0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4,
          0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d,
          0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
          0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x6ca6351, 0xe003826f,
          0x14292967, 0xa0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
          0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354,
          0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6,
          0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b,
          0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x654be30, 0xd192e819,
          0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a,
          0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08,
          0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
          0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f,
          0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc,
          0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208,
          0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
          0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece,
          0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e,
          0xf57d4f7f, 0xee6ed178, 0x6f067aa, 0x72176fba, 0xa637dc5, 0xa2c898a6,
          0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5,
          0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc,
          0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c,
          0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
        ],
        o = Array(160);
      function c() {
        this.init(), (this._w = o), r.call(this, 128, 112);
      }
      function h(e, t, i) {
        return i ^ (e & (t ^ i));
      }
      function d(e, t, i) {
        return (e & t) | (i & (e | t));
      }
      function u(e, t) {
        return (
          ((e >>> 28) | (t << 4)) ^
          ((t >>> 2) | (e << 30)) ^
          ((t >>> 7) | (e << 25))
        );
      }
      function l(e, t) {
        return (
          ((e >>> 14) | (t << 18)) ^
          ((e >>> 18) | (t << 14)) ^
          ((t >>> 9) | (e << 23))
        );
      }
      n(c, r),
        (c.prototype.init = function () {
          return (
            (this._ah = 0x6a09e667),
            (this._bh = 0xbb67ae85),
            (this._ch = 0x3c6ef372),
            (this._dh = 0xa54ff53a),
            (this._eh = 0x510e527f),
            (this._fh = 0x9b05688c),
            (this._gh = 0x1f83d9ab),
            (this._hh = 0x5be0cd19),
            (this._al = 0xf3bcc908),
            (this._bl = 0x84caa73b),
            (this._cl = 0xfe94f82b),
            (this._dl = 0x5f1d36f1),
            (this._el = 0xade682d1),
            (this._fl = 0x2b3e6c1f),
            (this._gl = 0xfb41bd6b),
            (this._hl = 0x137e2179),
            this
          );
        });
      function p(e, t) {
        return e >>> 0 < t >>> 0 ? 1 : 0;
      }
      (c.prototype._update = function (e) {
        for (
          var t = this._w,
            i = 0 | this._ah,
            n = 0 | this._bh,
            r = 0 | this._ch,
            a = 0 | this._dh,
            o = 0 | this._eh,
            c = 0 | this._fh,
            h = 0 | this._gh,
            d = 0 | this._hh,
            f = 0 | this._al,
            _ = 0 | this._bl,
            x = 0 | this._cl,
            g = 0 | this._dl,
            v = 0 | this._el,
            m = 0 | this._fl,
            b = 0 | this._gl,
            y = 0 | this._hl,
            w = 0;
          w < 32;
          w += 2
        )
          (t[w] = e.readInt32BE(4 * w)), (t[w + 1] = e.readInt32BE(4 * w + 4));
        for (; w < 160; w += 2) {
          var S,
            C,
            I,
            k,
            z,
            T,
            N,
            P,
            E = t[w - 30],
            D = t[w - 30 + 1];
          var R =
            (((S = E) >>> 1) | ((C = D) << 31)) ^
            ((S >>> 8) | (C << 24)) ^
            (S >>> 7);
          var O =
            (((I = D) >>> 1) | ((k = E) << 31)) ^
            ((I >>> 8) | (k << 24)) ^
            ((I >>> 7) | (k << 25));
          (E = t[w - 4]), (D = t[w - 4 + 1]);
          var B =
            (((z = E) >>> 19) | ((T = D) << 13)) ^
            ((T >>> 29) | (z << 3)) ^
            (z >>> 6);
          var L =
              (((N = D) >>> 19) | ((P = E) << 13)) ^
              ((P >>> 29) | (N << 3)) ^
              ((N >>> 6) | (P << 26)),
            M = t[w - 14],
            j = t[w - 14 + 1],
            A = t[w - 32],
            Z = t[w - 32 + 1],
            U = (O + j) | 0,
            F = (R + M + p(U, O)) | 0;
          (F = (F + B + p((U = (U + L) | 0), L)) | 0),
            (F = (F + A + p((U = (U + Z) | 0), Z)) | 0),
            (t[w] = F),
            (t[w + 1] = U);
        }
        for (var W = 0; W < 160; W += 2) {
          (F = t[W]), (U = t[W + 1]);
          var G,
            K,
            V,
            J,
            q,
            X,
            Y,
            H,
            Q,
            $,
            ee = ((G = i) & (K = n)) | (r & (G | K));
          var et = ((V = f) & (J = _)) | (x & (V | J)),
            ei = u(i, f),
            en = u(f, i),
            er = l(o, v),
            ea = l(v, o),
            es = s[W],
            eo = s[W + 1];
          var ec = ((q = o), (X = c), (Y = h) ^ (q & (X ^ Y)));
          var eh = ((H = v), (Q = m), ($ = b) ^ (H & (Q ^ $))),
            ed = (y + ea) | 0,
            eu = (d + er + p(ed, y)) | 0;
          (eu = (eu + ec + p((ed = (ed + eh) | 0), eh)) | 0),
            (eu = (eu + es + p((ed = (ed + eo) | 0), eo)) | 0),
            (eu = (eu + F + p((ed = (ed + U) | 0), U)) | 0);
          var el = (en + et) | 0,
            ep = (ei + ee + p(el, en)) | 0;
          (d = h),
            (y = b),
            (h = c),
            (b = m),
            (c = o),
            (m = v),
            (o = (a + eu + p((v = (g + ed) | 0), g)) | 0),
            (a = r),
            (g = x),
            (r = n),
            (x = _),
            (n = i),
            (_ = f),
            (i = (eu + ep + p((f = (ed + el) | 0), ed)) | 0);
        }
        (this._al = (this._al + f) | 0),
          (this._bl = (this._bl + _) | 0),
          (this._cl = (this._cl + x) | 0),
          (this._dl = (this._dl + g) | 0),
          (this._el = (this._el + v) | 0),
          (this._fl = (this._fl + m) | 0),
          (this._gl = (this._gl + b) | 0),
          (this._hl = (this._hl + y) | 0),
          (this._ah = (this._ah + i + p(this._al, f)) | 0),
          (this._bh = (this._bh + n + p(this._bl, _)) | 0),
          (this._ch = (this._ch + r + p(this._cl, x)) | 0),
          (this._dh = (this._dh + a + p(this._dl, g)) | 0),
          (this._eh = (this._eh + o + p(this._el, v)) | 0),
          (this._fh = (this._fh + c + p(this._fl, m)) | 0),
          (this._gh = (this._gh + h + p(this._gl, b)) | 0),
          (this._hh = (this._hh + d + p(this._hl, y)) | 0);
      }),
        (c.prototype._hash = function () {
          var e = a.allocUnsafe(64);
          function t(t, i, n) {
            e.writeInt32BE(t, n), e.writeInt32BE(i, n + 4);
          }
          return (
            t(this._ah, this._al, 0),
            t(this._bh, this._bl, 8),
            t(this._ch, this._cl, 16),
            t(this._dh, this._dl, 24),
            t(this._eh, this._el, 32),
            t(this._fh, this._fl, 40),
            t(this._gh, this._gl, 48),
            t(this._hh, this._hl, 56),
            e
          );
        }),
        (e.exports = c);
    },
    969197: function (e, t, i) {
      'use strict';
      i.d(t, {
        P: function () {
          return d;
        },
      });
      var n = i(293793),
        r = i(73021),
        a = i(66003),
        s = i(27433),
        o = i(899229),
        c = i(218571),
        h = i(484702),
        d = (e) => {
          var t,
            i,
            d = (0, a.G)(h.N),
            u = (0, r.default)(e.extraBenefits),
            { batchNumber: l = 1 } = e,
            p = (0, n.default)(() =>
              (0, s.Qp)({
                scene: e.scene,
                extraBenefits: u,
                videoDuration: e.videoDuration,
                commercialStrategyService: d,
                discount: e.discount,
                sceneOptions: e.sceneOptions,
                batchNumber: l,
              })
            ),
            [f, _] = (0, c.useState)(p()),
            x =
              (null === (t = e.sceneOptions) || void 0 === t
                ? void 0
                : t.version) === o.dt.V2CharVideo
                ? e.sceneOptions.characterMode
                : null === (i = e.sceneOptions) || void 0 === i
                ? void 0
                : i.mode,
            g =
              e.sceneOptions && 'modelReqKey' in e.sceneOptions
                ? e.sceneOptions.modelReqKey
                : '';
          return (
            (0, c.useEffect)(() => {
              _(p());
              var e = d.onAllPaidStrategyChange(() => {
                _(p());
              });
              return () => {
                e.dispose();
              };
            }, [e.scene, x, u, d, l, e.videoDuration, e.discount, g, p]),
            f
          );
        };
    },
    993966: function (e, t, i) {
      'use strict';
      i.d(t, {
        Y: function () {
          return h;
        },
      });
      var n = i(772322),
        r = i(105789),
        a = i.n(r),
        s = i(717471),
        o = i(333750),
        c = i(489897),
        h = (e) => {
          var { className: t, brushSize: i, onChange: r, onAfterChange: h } = e;
          return (0, n.jsx)(o.i, {
            className: a()(s.Z.sliderBar, t),
            value: i,
            onChange: r,
            max: c.fx,
            min: c.zt,
            style: {
              width: 292,
            },
            triggerBar: !0,
            onAfterChange: h,
            cssConfigs: {
              sliderWrapper: {
                style: {
                  height: '12px',
                  margin: '4px 0',
                },
              },
            },
          });
        };
    },
    281516: function (e, t, i) {
      'use strict';
      i.d(t, {
        n: function () {
          return d;
        },
      });
      var n = i(85728),
        r = i(929753),
        a = i(772322),
        s = i(889715),
        o = i(711192),
        c = i(167448),
        h = i(443213),
        d = (e) => {
          var { scale: t, logic: i } = e,
            {
              handleScaleUp: d,
              handleScaleDown: u,
              getScaleName: l,
              menu: p,
              dropdownStyle: f,
              dropdownRef: _,
              handleDropdownVisibleChange: x,
            } = i;
          return (0, a.jsxs)('div', {
            className: o.Z.scaleContainer,
            children: [
              (0, a.jsx)(c.h, {
                icon: (0, a.jsx)(s.S6A, {
                  size: 16,
                }),
                onClick: u,
              }),
              (0, a.jsx)(h.E, {
                ref: _,
                containerClassName: o.Z.dropContainer,
                contentClassName: o.Z.dropContent,
                content: p,
                contentStyle: (0, r._)((0, n._)({}, f), {
                  backdropFilter: 'none',
                }),
                onVisibleChange: x,
                children: (0, a.jsx)('span', {
                  className: o.Z.text,
                  children: l(t),
                }),
              }),
              (0, a.jsx)(c.h, {
                icon: (0, a.jsx)(s.nGr, {
                  size: 16,
                }),
                onClick: d,
              }),
            ],
          });
        };
    },
    749623: function (e, t, i) {
      'use strict';
      i.d(t, {
        T: function () {
          return r;
        },
      });
      var n,
        r =
          (((n = {})[(n.StartPaint = 0)] = 'StartPaint'),
          (n[(n.EndPaint = 1)] = 'EndPaint'),
          n);
    },
    776701: function (e, t, i) {
      'use strict';
      i.d(t, {
        C: function () {
          return u;
        },
      });
      var n = i(121921),
        r = i(870599),
        a = i(86790),
        s = i(356868),
        o = i(925367),
        c = i(764238),
        h = i(591646),
        d = () => ({
          type: o.o4.Brush,
          points: [],
          lineWidth: 1,
          lineCap: 'round',
          strokeStyle: '',
          lineJoin: 'round',
        });
      class u {
        get canvasElement() {
          return this._canvasElement;
        }
        get context2D() {
          return this._context2D;
        }
        get path() {
          return this._path;
        }
        get offlineCanvas() {
          return this._offlineCanvas;
        }
        get actionType() {
          return this._actionType;
        }
        _reduceCanvasSize(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : this._canvasElement;
          (this._model.canvasOriginScale = (0, c.p)({
            width: e.width,
            height: e.height,
          })),
            (t.width = e.width * this._model.canvasOriginScale),
            (t.height = e.height * this._model.canvasOriginScale),
            (this._model.canvasOriginSize = {
              width: e.width,
              height: e.height,
            });
        }
        updateDrawAction(e) {
          this._actionType = e;
        }
        changeCanvasSize(e) {
          var { _canvasElement: t } = this;
          (t.width = e.width),
            (t.height = e.height),
            this._reduceCanvasSize(e),
            this.initContext();
        }
        changeCanvasContainerSize(e) {
          var { _canvasElement: t, _listenerLayer: i } = this;
          this.containerSize = e;
          var { width: n, height: a } = e;
          (0, r.K)(this.innerContainer, {
            width: ''.concat(n, 'px'),
            height: ''.concat(a, 'px'),
          }),
            (t.style.width = ''.concat(n, 'px')),
            (t.style.height = ''.concat(a, 'px')),
            (i.style.width = ''.concat(n, 'px')),
            (i.style.height = ''.concat(a, 'px')),
            this.changeCanvasScale(t.width / n);
        }
        changeCanvasScale(e) {
          var t = this._scaleRatio;
          t > 0 && this._context2D.scale(1 / t, 1 / t);
          var i = (0, a.N)(e, 2);
          this._context2D.scale(i, i), (this._scaleRatio = i);
        }
        initContext() {
          (this._context2D.lineCap = this._lineCap),
            (this._context2D.lineJoin = this._lineJoin);
        }
        _createDivElement() {
          return document.createElement('div');
        }
        _createCanvasElement() {
          return (
            (this._offlineCanvas = new s.E(0, 0)),
            {
              canvasElement: this._offlineCanvas.element,
              context2D: this._offlineCanvas.element.getContext('2d'),
            }
          );
        }
        _initInnerContainer(e, t) {
          var { containerSize: i, innerContainer: n } = e,
            { container: a } = t;
          (0, r.K)(n, {
            position: 'relative',
            width: ''.concat(i.width, 'px'),
            height: ''.concat(i.height, 'px'),
          }),
            a.appendChild(n);
        }
        _initCanvasElement(e, t) {
          var { canvasElement: i, innerContainer: n } = e,
            { container: r } = t,
            a = r.getBoundingClientRect();
          this._reduceCanvasSize(a, i), n.appendChild(i);
        }
        _initListenerLayer(e) {
          var { containerSize: t, listenerLayer: i, innerContainer: n } = e;
          (0, r.K)(i, {
            width: ''.concat(t.width, 'px'),
            height: ''.concat(t.height, 'px'),
            position: 'absolute',
            top: '0px',
            left: '0px',
          }),
            n.appendChild(i);
        }
        _initListener() {
          this._model.brushModel.on('brushSize', (e) => {
            this.changeLineWidth(e), this.roundMouse.updateRoundSize(e);
          }),
            this._model.on(
              'isVisible',
              this.changeInnerContainerVisible.bind(this)
            ),
            this._model.brushModel.on(
              'brushColor',
              this.changeStrokeStyle.bind(this)
            );
        }
        resetPath() {
          this._path = d();
        }
        updatePathType(e) {
          this._path.type = e;
        }
        changeLineWidth(e) {
          (this._context2D.lineWidth = 2 * e), (this._lineWidth = 2 * e);
        }
        changeStrokeStyle(e) {
          (this._context2D.strokeStyle = e), (this._strokeStyle = e);
        }
        moveTo(e, t) {
          this._context2D.moveTo(e, t);
        }
        beginPath() {
          this._context2D.beginPath();
        }
        closePath() {
          this._context2D.closePath();
        }
        drawLine(e) {
          var { offsetX: t, offsetY: i } = e;
          this._model.brushModel.mousePosition = {
            offsetX: t,
            offsetY: i,
          };
          var { brushModel: n } = this._model,
            r = this._context2D,
            { isDraw: a } = n;
          if (!!a) {
            var { lastPosition: s } = n;
            r.save(),
              (r.globalCompositeOperation = h.S[this._actionType]),
              (r.lineWidth = this._lineWidth),
              (r.strokeStyle = this._strokeStyle),
              r.lineTo(t, i),
              r.stroke(),
              r.restore();
            var { width: o, height: c } = this.containerSize;
            this.path.points.push([t / o, i / c]),
              Object.assign(this.path, {
                type: this._actionType,
                strokeStyle: this._strokeStyle,
                lineWidth: this._lineWidth,
                lineCap: this._lineCap,
                lineJoin: this._lineJoin,
              }),
              (s.lastX = t),
              (s.lastY = i);
          }
        }
        drawImage(e) {
          var { containerSize: t } = this,
            {
              image: i,
              x: n = 0,
              y: r = 0,
              width: a = t.width,
              height: s = t.height,
            } = e,
            o = this._context2D;
          o.save(),
            (o.imageSmoothingEnabled = !0),
            (o.imageSmoothingQuality = 'high'),
            (o.globalCompositeOperation = 'xor'),
            o.drawImage(i, n, r, a, s),
            o.restore();
        }
        drawPaths(e) {
          var t = this._context2D,
            { width: i, height: n } = this.containerSize;
          e.forEach((e) => {
            var { points: r, type: a, lineWidth: s, strokeStyle: o } = e;
            t.save(),
              (t.globalCompositeOperation = h.S[a]),
              (t.filter = 'blur(1px)'),
              (t.lineWidth = s),
              (t.strokeStyle = o),
              t.beginPath();
            for (var c = 0; c < r.length; c++) {
              var d = r[c],
                u = d[0] * i,
                l = d[1] * n;
              0 === c ? t.moveTo(u, l) : t.lineTo(u, l), t.stroke();
            }
            t.restore();
          });
        }
        changeInnerContainerVisible(e) {
          (0, r.K)(this.innerContainer, {
            display: e ? 'block' : 'none',
          });
        }
        clearRect() {
          var { width: e, height: t } = this.containerSize;
          this._context2D.clearRect(0, 0, e, t);
        }
        getListenerLayer() {
          return this._listenerLayer;
        }
        constructor(e) {
          (this._scaleRatio = -1),
            (this._path = d()),
            (this._actionType = o.o4.Brush),
            (this._lineWidth = 1),
            (this._lineCap = 'round'),
            (this._lineJoin = 'round'),
            (this._strokeStyle = '');
          var { model: t, container: i } = e;
          this._model = t;
          var r = i.getBoundingClientRect(),
            a = {
              width: Math.round(r.width),
              height: Math.round(r.height),
            };
          this.containerSize = a;
          var s = this._createDivElement();
          this._initInnerContainer(
            {
              containerSize: a,
              innerContainer: s,
            },
            e
          ),
            (this.innerContainer = s);
          var { canvasElement: c, context2D: h } = this._createCanvasElement();
          this._initCanvasElement(
            {
              canvasElement: c,
              innerContainer: s,
            },
            e
          ),
            (this._canvasElement = c),
            (this._context2D = h),
            this.initContext(),
            (this.roundMouse = new n.d({
              radius: t.brushModel.brushSize,
              innerContainer: s,
              model: t,
            }));
          var u = this._createDivElement();
          this._initListenerLayer({
            containerSize: a,
            listenerLayer: u,
            innerContainer: s,
          }),
            (this._listenerLayer = u),
            this._initListener();
        }
      }
    },
    648988: function (e, t, i) {
      'use strict';
      i.d(t, {
        Q: function () {
          return r;
        },
      });
      var n = i(108982);
      function r(e) {
        return (
          e === n.s.ControlNetCanny ||
          e === n.s.ControlNetDepth ||
          e === n.s.ControlNetPose
        );
      }
    },
    259331: function (e, t, i) {
      'use strict';
      i.d(t, {
        Y: () => g,
      });
      var n = i('772322'),
        r = i('870653'),
        a = i('85728'),
        s = i('929753'),
        o = i('295834'),
        c = i('105789'),
        h = i.n(c),
        d = i('232762'),
        u = i('166772'),
        l = i('136912'),
        p = i('466740'),
        f = i('716175'),
        _ = i('63862'),
        x = (e) => {
          var { direction: t, style: i } = e,
            c = (0, o._)(e, ['direction', 'style']),
            { startResize: x, status: g } = (0, u.s)(t),
            v = (0, l.O)(t),
            m = (0, p.lS)(),
            b = {
              [r.u.TopLeft]: {
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
              },
              [r.u.TopRight]: {
                right: 0,
                top: 0,
                transform: 'translate(50%, -50%)',
              },
              [r.u.BottomRight]: {
                right: 0,
                bottom: 0,
                transform: 'translate(50%, 50%)',
              },
              [r.u.BottomLeft]: {
                left: 0,
                bottom: 0,
                transform: 'translate(-50%, 50%)',
              },
            }[t],
            y = h()(
              d.Z.borderButton,
              {
                [d.Z.borderButtonTl]: v === r.u.TopLeft,
                [d.Z.borderButtonTr]: v === r.u.TopRight,
                [d.Z.borderButtonBl]: v === r.u.BottomLeft,
                [d.Z.borderButtonBr]: v === r.u.BottomRight,
              },
              {
                [d.Z.borderButtonActive]: g === _.G.Active,
                [d.Z.borderButtonHidden]: g === _.G.Hidden,
              }
            );
          return (0, n.jsx)(
            'div',
            (0, s._)((0, a._)({}, c), {
              style: (0, a._)({}, b, i),
              className: y,
              onMouseDown: (e) => {
                e.stopPropagation(),
                  (0, f.I)(m, {
                    action: f.z.Zoom,
                  }),
                  x(e, t);
              },
              children: (0, n.jsx)('div', {
                className: d.Z.circle,
              }),
            })
          );
        },
        g = () =>
          (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsx)(x, {
                direction: r.u.TopLeft,
              }),
              (0, n.jsx)(x, {
                direction: r.u.TopRight,
              }),
              (0, n.jsx)(x, {
                direction: r.u.BottomRight,
              }),
              (0, n.jsx)(x, {
                direction: r.u.BottomLeft,
              }),
            ],
          });
    },
    930153: function (e, t, i) {
      'use strict';
      i.d(t, {
        T: function () {
          return n;
        },
        d: function () {
          return r;
        },
      });
      var n = 12,
        r = 36;
    },
    758919: function (e, t, i) {
      'use strict';
      i.d(t, {
        T: function () {
          return n;
        },
      });
      var n = (0, i(218571).createContext)({
        width: 0,
        height: 0,
      });
    },
    522909: function (e, t, i) {
      'use strict';
      i.d(t, {
        j: function () {
          return o;
        },
      });
      var n = i(772322),
        r = i(317021),
        a = i(904783),
        s = i(252788),
        o = () => {
          var e = (0, s.pU)();
          return (0, n.jsx)('div', {
            className: a.Z.rightInteract,
            style: e
              ? {}
              : {
                  display: 'none',
                },
            children: (0, n.jsx)(r.j, {}),
          });
        };
    },
    727724: function (e, t, i) {
      'use strict';
      i.d(t, {
        p: function () {
          return s;
        },
      });
      var n = i(466740),
        r = i(285093),
        a = i(733437);
      function s() {
        var e,
          t = (0, n.lS)(),
          i = r.o.getGraphicToolStoreInstance(t),
          s = null == i ? void 0 : i.bgPaintInstance,
          {
            moveX: o = 0,
            moveY: c = 0,
            scale: h = 1,
            rotate: d = 0,
          } = null !==
            (e = (0, a.k)(s, (e) => ({
              moveX: e.moveX,
              moveY: e.moveY,
              scale: e.scale,
              rotate: e.rotate,
            }))) && void 0 !== e
            ? e
            : {};
        return {
          moveX: o,
          moveY: c,
          scale: h,
          rotate: d,
        };
      }
    },
    47257: function (e, t, i) {
      'use strict';
      i.d(t, {
        k: function () {
          return c;
        },
      });
      var n = i(772322);
      i(972297);
      var r = i(746022),
        a = i(967355),
        s = i(150615),
        o = i(545603),
        c = (e) => {
          var { available: t, onClick: i, disablePopover: c } = e;
          return (0, n.jsx)(r.Z, {
            disabled: c,
            position: 'tr',
            showArrow: !1,
            content: (0, n.jsx)('div', {
              className: o.Z.hoverText,
              children: s.ZP.t(
                'wimg2img_content_select',
                {},
                'Select what to reference'
              ),
            }),
            children: (0, n.jsx)(a.J, {
              disabled: !t,
              type: 'default',
              text: s.ZP.t('wimg2img_button_save', {}, 'Save'),
              className: o.Z.save,
              onClick: i,
            }),
          });
        };
    },
    580374: function (e, t, i) {
      'use strict';
      i.d(t, {
        y: function () {
          return y;
        },
      });
      var n = i(85728),
        r = i(929753),
        a = i(772322),
        s = i(218571),
        o = i(49176),
        c = i(434712),
        h = i(799108),
        d = i(66003),
        u = i(217448),
        l = i(733437),
        p = i(150615),
        f = i(967355),
        _ = i(340471),
        x = i(405013),
        g = i(695001),
        v = i(236242),
        m = i(199559),
        b = (e) => {
          switch (e) {
            case 'ALI':
              return '\u652F\u4ED8\u5B9D';
            case 'WX':
              return '\u5FAE\u4FE1\u652F\u4ED8';
            case 'HZ':
              return '\u6296\u97F3\u652F\u4ED8';
            default:
              return e;
          }
        };
      function y(e) {
        var { reportParam: t, onClose: i } = e,
          y = (0, d.G)(u.q),
          w = (0, d.G)(c.t),
          {
            vipLevels: S,
            currentAutoRenewPlan: C,
            isVipExpired: I,
            currentVipLevel: k,
            curLevelEndTime: z,
          } = (0, l.k)(y, (e) => {
            var t, i, n;
            return {
              vipLevels:
                (null === (t = e.vipInfo) || void 0 === t
                  ? void 0
                  : t.vipLevels) || [],
              isVipExpired: e.isVipExpired,
              currentAutoRenewPlan:
                null === (i = e.vipInfo) || void 0 === i
                  ? void 0
                  : i.currentAutoRenewPlan,
              curLevelEndTime:
                null === (n = e.vipInfo) || void 0 === n
                  ? void 0
                  : n.curLevelEndTime,
              currentVipLevel: e.currentVipLevel,
            };
          }) || {},
          { source: T } = t || {},
          N = (0, s.useMemo)(() => {
            try {
              return S.map((e) => {
                var t = C && (null == C ? void 0 : C.level) === e.level,
                  i = e.level === k,
                  a = I
                    ? p.ZP.t(
                        'dre_m10n_management_page_expired_date',
                        {},
                        'Expired time'
                      )
                    : t
                    ? i
                      ? p.ZP.t(
                          'dre_m10n_management_page_next_billing_date',
                          {},
                          'Renew on'
                        )
                      : p.ZP.t(
                          'dre_m10n_management_page_starting_from_date',
                          {},
                          'Starts on'
                        )
                    : p.ZP.t(
                        'dre_m10n_management_page_plan_ends_date',
                        {},
                        'Expired on'
                      ),
                  s = t
                    ? i
                      ? (0, x.vc)('yyyy-MM-dd hh:mm', 1e3 * C.nextRenewalTime)
                      : (0, x.vc)('yyyy-MM-dd hh:mm', 1e3 * e.beginTime)
                    : (0, x.vc)('yyyy-MM-dd hh:mm', 1e3 * e.endTime);
                return (0, r._)((0, n._)({}, e), {
                  title: a,
                  levelName: (0, h.J2)({
                    level: e.level,
                  }),
                  endTime: s,
                });
              });
            } catch (e) {
              return [];
            }
          }, [S, C, I]),
          P = (0, s.useMemo)(() => {
            try {
              if (!C) return;
              return {
                levelName: (0, h.sG)({
                  level: C.level,
                }),
                infoList: [
                  {
                    title: p.ZP.t(
                      'dre_m10n_management_page_auto_renew_subscription_type',
                      {},
                      'Subscription Methods'
                    ),
                    value:
                      'YEAR' === C.cycleUnit
                        ? p.ZP.t(
                            'dre_m10n_management_page_auto_renew_subscription_type_yearly',
                            {},
                            'YEARLY'
                          )
                        : p.ZP.t(
                            'dre_m10n_management_page_auto_renew_subscription_type_monthly',
                            {},
                            'MONTHLY'
                          ),
                  },
                  {
                    title: p.ZP.t(
                      'dre_m10n_management_page_auto_renew_amount',
                      {},
                      'Price'
                    ),
                    value: C.nextRenewalFee,
                  },
                  {
                    title: p.ZP.t(
                      'dre_m10n_management_page_auto_renew_billing_date',
                      {},
                      'Next billing time'
                    ),
                    value: (0, x.vc)(
                      'yyyy-MM-dd hh:mm',
                      1e3 * C.nextRenewalTime
                    ),
                  },
                  {
                    title: p.ZP.t(
                      'dre_m10n_management_page_auto_renew_payment_method',
                      {},
                      'Payment method'
                    ),
                    value: b(C.payChannel),
                  },
                ].map((e) =>
                  (0, r._)((0, n._)({}, e), {
                    value: String(e.value) || '-',
                  })
                ),
              };
            } catch (e) {
              return;
            }
          }, [C]),
          E = () => {
            (0, _.Q)({
              containerService: w,
              preCreateRes: {
                obtainedVipInfo: {
                  autoRenewEndTime: null == C ? void 0 : C.nextRenewalTime,
                },
                upcomingVipInfo: {},
                subscriptionChangeInfo: {
                  changeType: 'DEGRADE',
                },
              },
              reportParam: {
                source: g.fG.SubscribePlanManagePopupClickCancelAutoRenewal,
              },
            }),
              (0, v.KB)(w, {
                action: v.Z.ClickCancelAutoRenewal,
                currentTab: v.Ak.ManagePlans,
                source: T,
              });
          },
          D = (e) => {
            var { title: t, desc: i, btnText: n, onClick: r } = e;
            return (0, a.jsxs)('div', {
              className: m.Z.defaultContent,
              children: [
                (0, a.jsx)('div', {
                  className: m.Z.title,
                  children: t,
                }),
                i &&
                  (0, a.jsx)('div', {
                    className: m.Z.desc,
                    children: i,
                  }),
                n &&
                  (0, a.jsx)(f.J, {
                    onClick: r,
                    text: n,
                    type: 'tertiary',
                  }),
              ],
            });
          };
        return (0, a.jsxs)('div', {
          className: m.Z.container,
          children: [
            (0, a.jsx)('div', {
              className: m.Z.title,
              children: p.ZP.t(
                'dre_m10n_management_page_membership',
                {},
                'My plans'
              ),
            }),
            N.length
              ? (0, a.jsx)('div', {
                  className: m.Z.planCard,
                  children:
                    N.length > 1
                      ? N.map((e, t) =>
                          (0, a.jsxs)(
                            'div',
                            {
                              className: m.Z.planItem,
                              children: [
                                (0, a.jsxs)('div', {
                                  className: m.Z.top,
                                  children: [
                                    (0, a.jsx)(o.Z, {
                                      className: m.Z.vipIcon,
                                      inactive: I,
                                      size: 16,
                                      level: e.level,
                                    }),
                                    (0, a.jsx)('div', {
                                      className: m.Z.levelName,
                                      children: e.levelName,
                                    }),
                                  ],
                                }),
                                (0, a.jsx)('div', {
                                  className: m.Z.infoTitle,
                                  children: e.title,
                                }),
                                (0, a.jsx)('div', {
                                  className: m.Z.infoValue,
                                  children: e.endTime,
                                }),
                              ],
                            },
                            t
                          )
                        )
                      : N.map((e, t) =>
                          (0, a.jsxs)(
                            'div',
                            {
                              className: m.Z.planItemSingle,
                              children: [
                                (0, a.jsxs)('div', {
                                  className: m.Z.left,
                                  children: [
                                    (0, a.jsx)(o.Z, {
                                      inactive: I,
                                      className: m.Z.vipIcon,
                                      size: 16,
                                      level: e.level,
                                    }),
                                    (0, a.jsx)('div', {
                                      className: m.Z.levelName,
                                      children: e.levelName,
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)('div', {
                                  className: m.Z.right,
                                  children: [
                                    (0, a.jsx)('div', {
                                      className: m.Z.infoTitle,
                                      children: e.title,
                                    }),
                                    (0, a.jsx)('div', {
                                      className: m.Z.infoValue,
                                      children: e.endTime,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            t
                          )
                        ),
                })
              : D({
                  title: '',
                }),
            (0, a.jsx)('div', {
              className: m.Z.title,
              style: {
                marginTop: '8px',
              },
              children: p.ZP.t(
                'dre_m10n_management_page_auto_renew',
                {},
                'Auto renewal'
              ),
            }),
            P
              ? (0, a.jsxs)('div', {
                  className: m.Z.autoRenewalCard,
                  children: [
                    (0, a.jsxs)('div', {
                      className: m.Z.flexBox,
                      children: [
                        (0, a.jsx)('div', {
                          className: m.Z.bigTitle,
                          children: P.levelName,
                        }),
                        (0, a.jsx)(f.J, {
                          type: 'tertiary',
                          text: p.ZP.t(
                            'dre_m10n_management_page_auto_renew_cancel',
                            {},
                            'Cancel auto-renewal'
                          ),
                          className: m.Z.bigBtn,
                          onClick: E,
                        }),
                      ],
                    }),
                    (0, a.jsx)('div', {
                      className: m.Z.infoList,
                      children: P.infoList.map((e, t) =>
                        (0, a.jsxs)(
                          'div',
                          {
                            className: m.Z.flexBox,
                            children: [
                              (0, a.jsx)('div', {
                                className: m.Z.smallTitle,
                                children: e.title,
                              }),
                              (0, a.jsx)('div', {
                                className: m.Z.info,
                                children: (0, a.jsx)('div', {
                                  className: m.Z.text,
                                  children: e.value,
                                }),
                              }),
                            ],
                          },
                          t
                        )
                      ),
                    }),
                  ],
                })
              : D({
                  title: p.ZP.t(
                    'dre_m10n_management_page_auto_renew_null',
                    {},
                    "You don't have an auto-renewal program yet"
                  ),
                  btnText: p.ZP.t(
                    'dre_m10n_management_page_auto_renew_see_more',
                    {},
                    'View subscription plans'
                  ),
                  onClick: i,
                }),
          ],
        });
      }
    },
    121365: function (e, t, i) {
      'use strict';
      i.d(t, {
        KY: function () {
          return h;
        },
        Ne: function () {
          return a;
        },
        X1: function () {
          return r;
        },
        au: function () {
          return s;
        },
        q5: function () {
          return o;
        },
        th: function () {
          return c;
        },
      });
      var n = i(314068);
      function r(e) {
        return Math.min(Math.max(e, n.vS), n.D1);
      }
      function a(e, t) {
        var i = e,
          a = e / t;
        return (
          a > n.D1 ? (i = (a = n.D1) * t) : a < n.vS && (i = (a = n.vS) * t),
          {
            width: r(Math.round(i)),
            height: r(Math.round(a)),
          }
        );
      }
      function s(e, t) {
        var i = e,
          a = e * t;
        return (
          a > n.D1 ? (i = (a = n.D1) / t) : a < n.vS && (i = (a = n.vS) / t),
          {
            width: r(Math.round(a)),
            height: r(Math.round(i)),
          }
        );
      }
      function o(e) {
        return e >= n.vS && e <= n.D1;
      }
      function c(e, t) {
        if (!e || !t) return n.jg;
        var i = e / t;
        return e > t ? a(Math.min(e, n.D1), i) : s(Math.min(t, n.D1), i);
      }
      function h(e, t) {
        var i = e / t;
        return e > t
          ? {
              width: n.D1,
              height: Math.round(n.D1 / i),
            }
          : {
              width: Math.round(n.D1 * i),
              height: n.D1,
            };
      }
    },
    582152: function (e, t, i) {
      'use strict';
      i.d(t, {
        ZD: function () {
          return w;
        },
        wE: function () {
          return m;
        },
        zh: function () {
          return b;
        },
      });
      var n,
        r,
        a = i(876826),
        s = i(85728),
        o = i(789786),
        c = i(379311),
        h = i(217448),
        d = i(434712),
        u = i(487736),
        l = i(799108),
        p = i(475578),
        f = i(664306),
        _ = i(899229),
        x = i(561658),
        g = i(259435),
        v = i(785106);
      var m =
        (((n = {}).ClickGenerateButton = 'click_generate_button'),
        (n.ClickTopAccountButtonAddCredits =
          'click_top_account_button_add_credits'),
        (n.CLICK_VIP_FUNCTION_3s = 'click_vip_function_+3s'),
        (n.CLICK_REGENERATE_BUTTON = 'click_regenerate_button'),
        (n.CREDIT_LIMIT_POPUP = 'credit_limit_popup'),
        (n.MULTI_VIP_POPUP_GET_CREDITS = 'multi_vip_popup_get_credits'),
        (n.SUBSCRIBE_PLAN_CHANGE_POPUP = 'subscribe_plan_change_popup'),
        n);
      var b =
        (((r = {}).Show = 'show'),
        (r.SelectProduct = 'select_product'),
        (r.CheckDetail = 'check_detail'),
        (r.AgreeProtocol = 'agree_protocol'),
        (r.GetQrCode = 'get_qr_code'),
        (r.FailToGetQrCode = 'fail_to_get_qr_code'),
        (r.InvalidQrCode = 'invalid_qr_code'),
        (r.ShowQrCode = 'show_qr_code'),
        (r.VIPEnd = 'vip_end'),
        (r.PaySuccess = 'pay_success'),
        (r.PayFail = 'pay_fail'),
        (r.ClickPurchase = 'click_purchase'),
        r);
      class y {
        get otherReportParams() {
          return {
            second_page: (0, g.X)(
              this._containerService,
              u.M.WorkCollectionDetailModal
            )
              ? 'work_collection_detail'
              : void 0,
            show_type: this._contentGenerationService.contentRecordListManager
              .isGroupView
              ? 'collect'
              : 'normal',
          };
        }
        getEventParams() {
          var {
              source: e,
              action: t,
              creditNow: i,
              selectCreditsAmount: n,
              payChannel: r,
              payCurrency: a,
              payAmount: o,
              orderId: c,
              sku: h,
              scene: d,
              sceneOptions: u,
              videoDuration: x,
              isQuickPreview: g,
              isFromPreview: v,
              batchNumber: m,
            } = this._params,
            { isVip: b, currentVipLevel: y } = this._vipService,
            w = {},
            S = {};
          return (
            d &&
              ((w.ai_type = (0, f.MJ)({
                scene: d,
              })
                ? p.CO.Video
                : (0, f.K6)({
                    scene: d,
                  })
                ? p.CO.Audio
                : p.CO.Image),
              (w.vip_function_id = (0, _.cq)({
                scene: d,
                sceneOptions: u,
              })),
              (S = {
                video_mode:
                  (null == u ? void 0 : u.version) === _.dt.V2CharVideo
                    ? void 0
                    : null == u
                    ? void 0
                    : u.mode,
                video_duration: x,
              })),
            (0, s._)(
              {
                source: e,
                action: t,
                is_vip: b ? 1 : 0,
                user_subscribe_type: b ? l.TK[y] : 0,
                credit_now: i,
                select_credits_amount: n,
                pay_channel: r,
                pay_amount: o,
                pay_currency: a,
                order_id: c,
                sku: h,
                extra: S,
                is_quick_preview: Number(null != g ? g : 0),
                is_from_preview: Number(null != v ? v : 0),
                generate_num: m,
              },
              w,
              this.otherReportParams
            )
          );
        }
        constructor(e, t, i, n) {
          (this._params = e),
            (this._vipService = t),
            (this._contentGenerationService = i),
            (this._containerService = n),
            (this.eventName = 'credit_popup');
        }
      }
      function w(e, t) {
        return S.apply(this, arguments);
      }
      function S() {
        return (S = (0, a._)(function* (e, t) {
          var i = yield (0, v.M)(e);
          (0, c.Kl)(i, y, [t]);
        })).apply(this, arguments);
      }
      y = (0, o.gn)(
        [
          (0, o.fM)(1, h.q),
          (0, o.fM)(2, x.N),
          (0, o.fM)(3, d.t),
          (0, o.w6)('design:type', Function),
          (0, o.w6)('design:paramtypes', [
            'undefined' == typeof IParams ? Object : IParams,
            void 0 === h.q ? Object : h.q,
            void 0 === x.N ? Object : x.N,
            void 0 === d.t ? Object : d.t,
          ]),
        ],
        y
      );
    },
    846779: function (e, t, i) {
      'use strict';
      i.d(t, {
        Rc: function () {
          return _;
        },
        SM: function () {
          return v;
        },
        WL: function () {
          return x;
        },
        bI: function () {
          return f;
        },
      });
      var n,
        r,
        a = i(85728),
        s = i(929753),
        o = i(789786),
        c = i(379311),
        h = i(799108),
        d = i(217448),
        u = i(27433),
        l = i(870730),
        p = i(484702);
      var f = (((n = {}).Show = 'show'), (n.Click = 'click'), n);
      var _ =
          (((r = {}).AddMore = 'add_more'),
          (r.LipSync = 'lip_sync'),
          (r.ReDub = 're_dub'),
          (r.ImageControlNetCanny = 'image_control_net_canny'),
          (r.ImageControlNetDepth = 'image_control_net_depth'),
          (r.ImageControlNetPose = 'image_control_net_pose'),
          (r.VideoFrameInterpolation = 'video_frame_interpolation'),
          (r.VideoUpscale = 'video_upscale'),
          r),
        x = {
          [h.hO.ExtendSeconds]: 'add_more',
          [h.hO.LipSync]: 'lip_sync',
          [h.hO.ReDub]: 're_dub',
          [h.hO.ImageControlNetCanny]: 'image_control_net_canny',
          [h.hO.ImageControlNetDepth]: 'image_control_net_depth',
          [h.hO.ImageControlNetPose]: 'image_control_net_pose',
        };
      class g {
        getEventParams() {
          var {
              action: e,
              vipFuncName: t,
              needVipLevel: i,
              scene: n,
            } = this._params,
            { isVip: r, currentVipLevel: o } = this._vipService,
            c = {
              is_freetrial: 0,
              vip_right_trial_type: l.a.nonTrial,
            };
          if (n) {
            var d = (0, u.be)({
              scene: n,
              commercialStrategyService: this._commercialStrategyService,
            });
            c = {
              is_freetrial: Number(d.isStrategyFreeTrial),
              vip_right_trial_type: d.trialType,
            };
          }
          return (0, s._)((0, a._)({}, c), {
            action: e,
            is_vip: r ? 1 : 0,
            user_subscribe_type: r ? h.TK[o] : 0,
            vip_function_name: t,
            vip_right_subscribe_type: h.TK[i] || 0,
          });
        }
        constructor(e, t, i) {
          (this._params = e),
            (this._vipService = t),
            (this._commercialStrategyService = i),
            (this.eventName = 'vip_exclusive_honer');
        }
      }
      function v(e, t) {
        (0, c.Kl)(e, g, [t]);
      }
      g = (0, o.gn)(
        [
          (0, o.fM)(1, d.q),
          (0, o.fM)(2, p.N),
          (0, o.w6)('design:type', Function),
          (0, o.w6)('design:paramtypes', [
            'undefined' == typeof IParams ? Object : IParams,
            void 0 === d.q ? Object : d.q,
            void 0 === p.N ? Object : p.N,
          ]),
        ],
        g
      );
    },
    399835: function (e, t, i) {
      'use strict';
      i.d(t, {
        V: function () {
          return f;
        },
      });
      var n = i(85728),
        r = i(929753),
        a = i(789786),
        s = i(379311),
        o = i(217448),
        c = i(799108),
        h = i(27433),
        d = i(870730),
        u = i(70137),
        l = i(484702);
      class p {
        getEventParams() {
          var { vipFunctionName: e, action: t, scene: i } = this._params,
            { isVip: a, currentVipLevel: s } = this._vipService,
            o = i
              ? (0, h.Qp)({
                  scene: i,
                  commercialStrategyService: this._commercialStrategyService,
                }).credits
              : 0,
            u = {
              is_freetrial: 0,
              vip_right_trial_type: d.a.nonTrial,
            };
          if (i) {
            var l = (0, h.be)({
              scene: i,
              commercialStrategyService: this._commercialStrategyService,
            });
            u = {
              is_freetrial: Number(l.isStrategyFreeTrial),
              vip_right_trial_type: l.trialType,
            };
          }
          return (0, r._)((0, n._)({}, u), {
            vip_function_name: e,
            action: t,
            credit_need: o,
            credit_now: this._commercialCreditService.localCredit,
            is_vip: a ? 1 : 0,
            user_subscribe_type: a ? c.TK[s] : 0,
          });
        }
        constructor(e, t, i, n) {
          (this._params = e),
            (this._vipService = t),
            (this._commercialCreditService = i),
            (this._commercialStrategyService = n),
            (this.eventName = 'vip_function_button');
        }
      }
      function f(e, t) {
        (0, s.Kl)(e, p, [t]);
      }
      p = (0, a.gn)(
        [
          (0, a.fM)(1, o.q),
          (0, a.fM)(2, u.aG),
          (0, a.fM)(3, l.N),
          (0, a.w6)('design:type', Function),
          (0, a.w6)('design:paramtypes', [
            'undefined' == typeof IParams ? Object : IParams,
            void 0 === o.q ? Object : o.q,
            void 0 === u.aG ? Object : u.aG,
            void 0 === l.N ? Object : l.N,
          ]),
        ],
        p
      );
    },
    331925: function (e, t, i) {
      'use strict';
      i.d(t, {
        X: function () {
          return h;
        },
      });
      var n = i(789786),
        r = i(70137),
        a = i(799108),
        s = i(379311),
        o = i(217448);
      class c {
        getEventParams() {
          var {
              productId: e,
              orderId: t,
              orderType: i,
              confirmStatus: n,
            } = this._params,
            { isVip: r, currentVipLevel: s } = this._vipService;
          return {
            status: n,
            product_id: e,
            order_id: t,
            order_type: i,
            is_vip: r ? 1 : 0,
            user_subscribe_type: r ? a.TK[s] : 0,
            credit_now: this._commercialCreditService.localCredit,
          };
        }
        constructor(e, t, i) {
          (this._params = e),
            (this._vipService = t),
            (this._commercialCreditService = i),
            (this.eventName = 'pay_benefits_confirm');
        }
      }
      function h(e, t) {
        (0, s.S$)(e, c, [t]);
      }
      c = (0, n.gn)(
        [
          (0, n.fM)(1, o.q),
          (0, n.fM)(2, r.aG),
          (0, n.w6)('design:type', Function),
          (0, n.w6)('design:paramtypes', [
            'undefined' == typeof IParams ? Object : IParams,
            void 0 === o.q ? Object : o.q,
            void 0 === r.aG ? Object : r.aG,
          ]),
        ],
        c
      );
    },
    476295: function (e, t, i) {
      'use strict';
      i.d(t, {
        C9: function () {
          return S;
        },
        HK: function () {
          return w;
        },
        OS: function () {
          return y;
        },
      });
      var n,
        r,
        a = i(876826),
        s = i(789786),
        o = i(925367),
        c = i(128468),
        h = i(76212),
        d = i(100470),
        u = i(417281),
        l = i(725854),
        p = i(562092),
        f = i(260963),
        _ = i(649843),
        x = i(133438),
        g = i(881517),
        v = i(717742),
        m = i(857611),
        b = i(880821);
      var y =
        (((n = {})[(n.Resize = 0)] = 'Resize'),
        (n[(n.Move = 1)] = 'Move'),
        (n[(n.Rotate = 2)] = 'Rotate'),
        (n[(n.None = 3)] = 'None'),
        n);
      var w =
        (((r = {}).Default = 'default'),
        (r.ResizeTopLeftToBottomRight = 'resize_top_left_to_bottom_right'),
        (r.ResizeTopRightToBottomLeft = 'resize_top_right_to_bottom_left'),
        (r.Move = 'move'),
        (r.RotateTop = 'rotate_top'),
        (r.RotateRight = 'rotate_right'),
        (r.RotateBottom = 'rotate_bottom'),
        (r.RotateLeft = 'rotate_left'),
        r);
      class S extends m.h {
        get isTransforming() {
          return 3 !== this.transformType;
        }
        preRecognize(e) {
          var t = this;
          return (0, a._)(function* () {
            yield t.mutexLock.acquire();
            try {
              var i = yield t.getCacheKey(e),
                n = t.getRecognizeCache(i);
              if (n) return n;
              var r = t.graphicToolService.graphicTool.getSaliencySEG(
                  {
                    imageUriList: [e],
                    mode: c.JU.Canvas,
                  },
                  {
                    babi_param: JSON.stringify({
                      scenario: 'image_video_generation',
                      feature_key: 'to_image_referenceimage',
                      feature_entrance: (0, h.b2)(),
                      feature_entrance_detail: ''.concat(
                        (0, h.b2)(),
                        '-referenceimage-object_detection'
                      ),
                    }),
                  }
                ),
                a = yield t.graphicToolService.graphicTool.getSaliencySEG(
                  {
                    imageUriList: [e],
                  },
                  {
                    babi_param: JSON.stringify({
                      scenario: 'image_video_generation',
                      feature_key: 'to_image_referenceimage',
                      feature_entrance: (0, h.b2)(),
                      feature_entrance_detail: ''.concat(
                        (0, h.b2)(),
                        '-referenceimage-object_detection'
                      ),
                    }),
                  }
                ),
                [s, o] = yield Promise.all([r, a]);
              if (
                (s.logId &&
                  (s.response.ok &&
                    o.response.ok &&
                    (null === (u = s.response.value) || void 0 === u
                      ? void 0
                      : null === (d = u[0]) || void 0 === d
                      ? void 0
                      : d.mask) &&
                    (null === (p = o.response.value) || void 0 === p
                      ? void 0
                      : null === (l = p[0]) || void 0 === l
                      ? void 0
                      : l.mask) &&
                    (s.response.value[0].mask.url =
                      null === (_ = o.response.value) || void 0 === _
                        ? void 0
                        : null === (f = _[0]) || void 0 === f
                        ? void 0
                        : f.mask.url),
                  t.setRecognizeCache(i, {
                    resp: s,
                  })),
                s.response.ok)
              ) {
                var d,
                  u,
                  l,
                  p,
                  f,
                  _,
                  x,
                  g,
                  v = s.response.value,
                  m =
                    null == v
                      ? void 0
                      : null === (g = v[0]) || void 0 === g
                      ? void 0
                      : null === (x = g.mask) || void 0 === x
                      ? void 0
                      : x.url;
                (0, b.po)(m);
              }
              return {
                resp: s,
              };
            } finally {
              t.mutexLock.release();
            }
          })();
        }
        recognize(e) {
          var t = this;
          return (0, a._)(function* () {
            (t._isCancelRecognize = !1), (t.originURI = e);
            var { resp: i } = yield t.preRecognize(e),
              { response: n } = i;
            if (n.ok) {
              if (!t._isCancelRecognize) {
                var r = n.value;
                return (
                  (t._recognizeImageUrl = null == r ? void 0 : r[0].mask.url),
                  (0, f.z)(() => {
                    t.maskList = r;
                  }),
                  _.J.Success
                );
              }
              return _.J.Cancelled;
            }
            var { code: a } = n;
            return a === d.b.ErrNoSegmentObjectFound
              ? _.J.NoSegmentObjectFoundError
              : a === d.b.ErrSegmentFailed
              ? _.J.SegmentFailedError
              : _.J.NetworkError;
          })();
        }
        getImagineParams() {
          if (!!this.paintModeInstance) {
            var e = this.paintModeInstance.generatePaintContent(),
              t = this.paintModeInstance.getImageData();
            this.maskUriToImageDataMap.clear(),
              this.maskUriToImageDataMap.set(e, t),
              this.paths.set(e, this.paintModeInstance.getPaths());
            var { moveX: i, moveY: n } = (0, g.D)({
              currentMove: {
                moveX: this.moveX,
                moveY: this.moveY,
              },
              currentSize: {
                width: this.paintWidth,
                height: this.paintHeight,
              },
              targetSize: this._actualPaintSize,
              imageSize: this._rawImageSize,
              imageScale: this.scale,
              imageRotate: this.rotate,
              paintScale: this._paintScale,
            });
            return {
              uri: this.originURI,
              name: u.UI.BgPaint,
              imageUriList: ['', '', e, this.originURI],
              extra: JSON.stringify({
                paintWidth: this._actualPaintSize.width,
                paintHeight: this._actualPaintSize.height,
                originImageUrl: this._rawImageUrl,
                originMaskUrl: e,
                recognizeImageUrl: this._recognizeImageUrl,
                moveX: (0, v.c)(i, 2),
                moveY: (0, v.c)(n, 2),
                scale: (0, v.c)(this.scale, 2),
                rotate: (0, v.c)(this.rotate, 2),
              }),
            };
          }
        }
        getMaskDataMap(e) {
          return this.maskUriToImageDataMap.get(e);
        }
        getPaths(e) {
          return this.paths.get(e);
        }
        cancelRecognize() {
          this._isCancelRecognize = !0;
        }
        updateBrushSize(e) {
          this.brushSize = e;
        }
        updateEraserSize(e) {
          this.eraserSize = e;
        }
        updateDrawAction(e) {
          this.drawAction = e;
        }
        updatePaintModeInstance(e) {
          this.paintModeInstance = e;
        }
        reset() {
          (this.brushSize = 1),
            (this.eraserSize = 1),
            (this.maskList = []),
            (this.paintModeInstance = void 0),
            (this.moveX = 0),
            (this.moveY = 0),
            (this.scale = 1),
            (this.rotate = 0),
            (this.extra = ''),
            (this.paintHeight = 0),
            (this.paintWidth = 0),
            (this.drawAction = o.o4.Select),
            (this.isSelectImage = !0),
            (this.isSelectActive = !0),
            (this._actualPaintSize = {
              width: 0,
              height: 0,
            }),
            (this._isInitActualSize = !1),
            (this._paintScale = -1),
            (this._rawImageSize = {
              width: 0,
              height: 0,
            }),
            (this._rawImageUrl = ''),
            (this._recognizeImageUrl = ''),
            super.reset();
        }
        initActualPaintSize(e, t) {
          this._actualPaintSize = {
            width: e,
            height: t,
          };
          var i = Object.keys((0, p.D)(this.extra)),
            n = 4 === i.length,
            r = 0 === i.length;
          if (n || r) {
            (this._isInitActualSize = !0),
              (0, f.z)(() => {
                (this.moveX = e / 2),
                  (this.moveY = t / 2),
                  (this.paintWidth = e),
                  (this.paintHeight = t);
              });
            return;
          }
          var {
              paintWidth: a = 0,
              paintHeight: s = 0,
              moveX: o = 0,
              moveY: c = 0,
            } = (0, p.D)(this.extra),
            { width: h, height: d } = this._rawImageSize,
            { moveX: u, moveY: l } = (0, g.D)({
              currentMove: {
                moveX: o,
                moveY: c,
              },
              currentSize: {
                width: a,
                height: s,
              },
              targetSize: {
                width: e,
                height: t,
              },
              imageSize: {
                width: h,
                height: d,
              },
              imageScale: this.scale,
              imageRotate: this.rotate,
              paintScale: this._paintScale,
            });
          (this._isInitActualSize = !0),
            (0, f.z)(() => {
              (this.moveX = u),
                (this.moveY = l),
                (this.paintWidth = e),
                (this.paintHeight = t);
            });
        }
        updateActualPaintSize(e, t) {
          this._actualPaintSize = {
            width: e,
            height: t,
          };
        }
        updateRawImageSize(e, t) {
          this._rawImageSize = {
            width: e,
            height: t,
          };
        }
        updatePaintSize(e, t) {
          var i =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          if (!!this._isInitActualSize) {
            var { moveX: n, moveY: r } = this,
              { width: a, height: s } = this._rawImageSize,
              { moveX: o, moveY: c } = (0, g.D)({
                currentMove: {
                  moveX: n,
                  moveY: r,
                },
                currentSize: {
                  width: this.paintWidth,
                  height: this.paintHeight,
                },
                targetSize: {
                  width: e,
                  height: t,
                },
                imageSize: {
                  width: a,
                  height: s,
                },
                imageScale: this.scale,
                imageRotate: this.rotate,
                paintScale: this._paintScale,
                needHandleEdge: i,
              });
            (0, f.z)(() => {
              (this.moveX = o),
                (this.moveY = c),
                (this.paintWidth = e),
                (this.paintHeight = t);
            });
          }
        }
        updateMoveX(e) {
          this.moveX = e;
        }
        updateMoveY(e) {
          this.moveY = e;
        }
        updateScale(e) {
          this.scale = e;
        }
        updateRotate(e) {
          this.rotate = e;
        }
        updateImageUrl(e) {
          this._rawImageUrl = e;
        }
        updatePaintScale(e) {
          this._paintScale = e;
        }
        updateIsSelectActive(e) {
          this.isSelectActive = e;
        }
        updateIsSelectImage(e) {
          this.isSelectImage = e;
        }
        updateTransformType(e) {
          this.transformType = e;
        }
        resetTransformType() {
          this.transformType = 3;
        }
        updateActionCursor(e) {
          this.actionCursor = e;
        }
        resetActionCursor() {
          this.actionCursor = 'default';
        }
        initWithImagineParams(e, t) {
          if (!!(0, x.cj)(t)) {
            var i,
              n,
              { originMaskUrl: r = '', recognizeImageUrl: a = '' } = (0, p.D)(
                t.extra
              );
            (this.originURI =
              null !==
                (n =
                  null === (i = t.imageUriList) || void 0 === i
                    ? void 0
                    : i[3]) && void 0 !== n
                ? n
                : ''),
              (this._recognizeImageUrl = a),
              (this.maskList = [
                {
                  mask: {
                    uri: this.originURI,
                    url: r,
                  },
                },
              ]),
              this.initExtra(t.extra);
          }
        }
        initExtra(e) {
          this.extra = e;
          var { scale: t = 1, rotate: i = 0 } = (0, p.D)(e);
          this.updateScale(t), this.updateRotate(i);
        }
        get isRecognized() {
          return 0 !== this.maskList.length;
        }
        get isInitActualSize() {
          return this._isInitActualSize;
        }
        constructor(e) {
          super(),
            (this.graphicToolService = e),
            (this.originURI = ''),
            (this.maskList = []),
            (this.brushSize = 1),
            (this.eraserSize = 1),
            (this.drawAction = o.o4.Brush),
            (this.paintWidth = 0),
            (this.paintHeight = 0),
            (this.moveX = 0),
            (this.moveY = 0),
            (this.scale = 1),
            (this.rotate = 0),
            (this.isSelectActive = !1),
            (this.isSelectImage = !1),
            (this.maskUriToImageDataMap = new Map()),
            (this.paths = new Map()),
            (this.transformType = 3),
            (this.extra = ''),
            (this.actionCursor = 'default'),
            (this._actualPaintSize = {
              width: 0,
              height: 0,
            }),
            (this._rawImageUrl = ''),
            (this._recognizeImageUrl = ''),
            (this._rawImageSize = {
              width: 0,
              height: 0,
            }),
            (this._paintScale = -1),
            (this._isCancelRecognize = !1),
            (this._isInitActualSize = !1),
            (0, f.rC)(this);
        }
      }
      (0, s.gn)(
        [
          f.LO,
          (0, s.w6)(
            'design:type',
            'undefined' == typeof IMWebSaliencySEGMaskList
              ? Object
              : IMWebSaliencySEGMaskList
          ),
        ],
        S.prototype,
        'maskList',
        void 0
      ),
        (0, s.gn)([f.LO], S.prototype, 'brushSize', void 0),
        (0, s.gn)([f.LO], S.prototype, 'eraserSize', void 0),
        (0, s.gn)([f.LO], S.prototype, 'drawAction', void 0),
        (0, s.gn)([f.LO], S.prototype, 'paintWidth', void 0),
        (0, s.gn)([f.LO], S.prototype, 'paintHeight', void 0),
        (0, s.gn)([f.LO], S.prototype, 'moveX', void 0),
        (0, s.gn)([f.LO], S.prototype, 'moveY', void 0),
        (0, s.gn)([f.LO], S.prototype, 'scale', void 0),
        (0, s.gn)([f.LO], S.prototype, 'rotate', void 0),
        (0, s.gn)([f.LO], S.prototype, 'isSelectActive', void 0),
        (0, s.gn)([f.LO], S.prototype, 'isSelectImage', void 0),
        (0, s.gn)([f.LO], S.prototype, 'transformType', void 0),
        (0, s.gn)([f.LO], S.prototype, 'extra', void 0),
        (0, s.gn)([f.LO], S.prototype, 'actionCursor', void 0),
        (0, s.gn)(
          [
            f.Fl,
            (0, s.w6)('design:type', Boolean),
            (0, s.w6)('design:paramtypes', []),
          ],
          S.prototype,
          'isTransforming',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateBrushSize',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateEraserSize',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [void 0 === o.o4 ? Object : o.o4]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateDrawAction',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', []),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'reset',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number, Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'initActualPaintSize',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number, Number, void 0]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updatePaintSize',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateMoveX',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateMoveY',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateScale',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateRotate',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [String]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateImageUrl',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Number]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updatePaintScale',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Boolean]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateIsSelectActive',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [Boolean]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateIsSelectImage',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [void 0 === y ? Object : y]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateTransformType',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', []),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'resetTransformType',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [void 0 === w ? Object : w]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'updateActionCursor',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', []),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'resetActionCursor',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [
              String,
              'undefined' == typeof TImagineModalAbilityParams
                ? Object
                : TImagineModalAbilityParams,
            ]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'initWithImagineParams',
          null
        ),
        (0, s.gn)(
          [
            f.aD.bound,
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [String]),
            (0, s.w6)('design:returntype', void 0),
          ],
          S.prototype,
          'initExtra',
          null
        ),
        (0, s.gn)(
          [
            f.Fl,
            (0, s.w6)('design:type', void 0),
            (0, s.w6)('design:paramtypes', []),
          ],
          S.prototype,
          'isRecognized',
          null
        ),
        (S = (0, s.gn)(
          [
            (0, s.fM)(0, l.fQ),
            (0, s.w6)('design:type', Function),
            (0, s.w6)('design:paramtypes', [void 0 === l.fQ ? Object : l.fQ]),
          ],
          S
        ));
    },
    144305: function (e, t, i) {
      'use strict';
      i.d(t, {
        J: function () {
          return x;
        },
      });
      var n = i(876826),
        r = i(789786),
        a = i(260963),
        s = i(76212),
        o = i(417281),
        c = i(725854),
        h = i(910629),
        d = i(649843),
        u = i(133438),
        l = i(489897),
        p = i(857611),
        f = i(247170),
        _ = i(216342);
      class x extends p.h {
        preRecognize(e) {
          var t = this;
          return (0, n._)(function* () {
            yield t.mutexLock.acquire();
            try {
              var i = yield t.getCacheKey(e),
                n = t.getRecognizeCache(i);
              if (n) return n;
              var r = yield t._safetyCheck(e),
                a = {
                  safetyCheckResp: r,
                };
              return (
                (!r.stop || r.status !== d.J.NetworkError) &&
                  t.setRecognizeCache(i, a),
                a
              );
            } finally {
              t.mutexLock.release();
            }
          })();
        }
        recognize(e) {
          var t = this;
          return (0, n._)(function* () {
            (t.originURI = e), (t._isCancelRecognize = !1);
            var i,
              { safetyCheckResp: n } = yield t.preRecognize(e);
            return n.stop
              ? null !== (i = n.status) && void 0 !== i
                ? i
                : d.J.NetworkError
              : d.J.Success;
          })();
        }
        _safetyCheck(e) {
          var t = this;
          return (0, n._)(function* () {
            var { ctx: i, span: n } = (0, _.VL)(
                (0, f.Tg)(),
                'text-to-image-ip-keep',
                'benchmark_test_user_upload_image_input'
              ),
              r =
                yield t.mWebContentGenerateService.repository.requestAlgorithm(
                  i,
                  'benchmark_test_user_upload_image_input.image_face_ip',
                  {
                    params: {},
                    fileList: [
                      {
                        fileUri: e,
                      },
                    ],
                    options: {
                      ipCheck: !0,
                    },
                  },
                  {
                    babi_param: JSON.stringify({
                      scenario: 'image_video_generation',
                      feature_key: 'aigc_to_image',
                      feature_entrance: (0, s.b2)(),
                      feature_entrance_detail: ''.concat(
                        (0, s.b2)(),
                        '-algo_proxy'
                      ),
                    }),
                  }
                );
            return (n.end(), t._isCancelRecognize)
              ? {
                  stop: !0,
                  status: d.J.Cancelled,
                }
              : r.response.ok
              ? {
                  stop: !1,
                  status: null,
                }
              : {
                  stop: !0,
                  status: r.logId ? d.J.SafetyCheckError : d.J.NetworkError,
                };
          })();
        }
        cancelRecognize() {
          this._isCancelRecognize = !0;
        }
        getImagineParams() {
          return {
            uri: this.originURI,
            name: o.UI.ByteEdit,
            imageUriList: [this.originURI],
            strength: this.referenceLevel / l.cR.max,
          };
        }
        updateReferenceLevel(e) {
          this.referenceLevel = e;
        }
        reset() {
          (this.referenceLevel = Math.round(l.cR.default)),
            (this.originURI = ''),
            super.reset();
        }
        initWithImagineParams(e, t) {
          var i, n;
          if (!!(0, u.fA)(t))
            (this.referenceLevel = t.strength
              ? Math.floor(t.strength * l.cR.max)
              : Math.round(l.cR.default)),
              (this.originURI =
                null !==
                  (n =
                    null === (i = t.imageUriList) || void 0 === i
                      ? void 0
                      : i[0]) && void 0 !== n
                  ? n
                  : '');
        }
        get isRecognized() {
          return !1;
        }
        constructor(e, t) {
          super(),
            (this.graphicToolService = e),
            (this.mWebContentGenerateService = t),
            (this.referenceLevel = l.cR.default),
            (this.originURI = ''),
            (this._isCancelRecognize = !1),
            (0, a.rC)(this);
        }
      }
      (0, r.gn)([a.LO], x.prototype, 'referenceLevel', void 0),
        (0, r.gn)(
          [
            a.aD.bound,
            (0, r.w6)('design:type', Function),
            (0, r.w6)('design:paramtypes', [Number]),
            (0, r.w6)('design:returntype', void 0),
          ],
          x.prototype,
          'updateReferenceLevel',
          null
        ),
        (0, r.gn)(
          [
            a.aD.bound,
            (0, r.w6)('design:type', Function),
            (0, r.w6)('design:paramtypes', []),
            (0, r.w6)('design:returntype', void 0),
          ],
          x.prototype,
          'reset',
          null
        ),
        (0, r.gn)(
          [
            a.aD.bound,
            (0, r.w6)('design:type', Function),
            (0, r.w6)('design:paramtypes', [
              String,
              'undefined' == typeof TImagineModalAbilityParams
                ? Object
                : TImagineModalAbilityParams,
            ]),
            (0, r.w6)('design:returntype', void 0),
          ],
          x.prototype,
          'initWithImagineParams',
          null
        ),
        (0, r.gn)(
          [
            a.Fl,
            (0, r.w6)('design:type', void 0),
            (0, r.w6)('design:paramtypes', []),
          ],
          x.prototype,
          'isRecognized',
          null
        ),
        (x = (0, r.gn)(
          [
            (0, r.fM)(0, c.fQ),
            (0, r.fM)(1, h.M),
            (0, r.w6)('design:type', Function),
            (0, r.w6)('design:paramtypes', [
              void 0 === c.fQ ? Object : c.fQ,
              void 0 === h.M ? Object : h.M,
            ]),
          ],
          x
        ));
    },
    387285: function (e, t, i) {
      'use strict';
      i.d(t, {
        r: function () {
          return r;
        },
      });
      var n = i(585567),
        r = (e) => (e ? n.N : n.T);
    },
    678244: function () {},
    285499: function () {},
    431163: function (e) {
      'use strict';
      e.exports = JSON.parse(
        '{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}'
      );
    },
  },
]);
