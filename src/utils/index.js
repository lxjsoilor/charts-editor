/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */

// import ProxyPolyfillBuilder from 'proxy-polyfill/src/proxy'
// const proxyPolyfill = ProxyPolyfillBuilder()
// import { proxyPoly } from '@/utils/proxyPoly'
/**
 * es6没有new proxy
 */
function proxyPoly() {
  let lastRevokeFn = null
  let ProxyPolyfill

  /**
   * @param {*} o
   * @return {boolean} whether this is probably a (non-null) Object
   */
  function isObject(o) {
    return o ? (typeof o === 'object' || typeof o === 'function') : false
  }

  /**
   * @constructor
   * @param {!Object} target
   * @param {{apply, construct, get, set}} handler
   */
  ProxyPolyfill = function(target, handler) {
    if (!isObject(target) || !isObject(handler)) {
      throw new TypeError('Cannot create proxy with a non-object as target or handler')
    }

    // Construct revoke function, and set lastRevokeFn so that Proxy.revocable can steal it.
    // The caller might get the wrong revoke function if a user replaces or wraps scope.Proxy
    // to call itself, but that seems unlikely especially when using the polyfill.
    let throwRevoked = function() {}
    lastRevokeFn = function() {
      /** @suppress {checkTypes} */
      target = null // clear ref
      throwRevoked = function(trap) {
        throw new TypeError(`Cannot perform '${trap}' on a proxy that has been revoked`)
      }
    }
    setTimeout(function() {
      lastRevokeFn = null
    }, 0)

    // Fail on unsupported traps: Chrome doesn't do this, but ensure that users of the polyfill
    // are a bit more careful. Copy the internal parts of handler to prevent user changes.
    const unsafeHandler = handler
    handler = { 'get': null, 'set': null, 'apply': null, 'construct': null }
    for (const k in unsafeHandler) {
      if (!(k in handler)) {
        throw new TypeError(`Proxy polyfill does not support trap '${k}'`)
      }
      handler[k] = unsafeHandler[k]
    }
    if (typeof unsafeHandler === 'function') {
      // Allow handler to be a function (which has an 'apply' method). This matches what is
      // probably a bug in native versions. It treats the apply call as a trap to be configured.
      handler.apply = unsafeHandler.apply.bind(unsafeHandler)
    }

    // Define proxy as this, or a Function (if either it's callable, or apply is set).
    // TODO(samthor): Closure compiler doesn't know about 'construct', attempts to rename it.
    let proxy = this
    let isMethod = false
    let isArray = false
    if (typeof target === 'function') {
      proxy = function ProxyPolyfill() {
        const usingNew = (this && this.constructor === proxy)
        const args = Array.prototype.slice.call(arguments)
        throwRevoked(usingNew ? 'construct' : 'apply')

        if (usingNew && handler['construct']) {
          return handler['construct'].call(this, target, args)
        } else if (!usingNew && handler.apply) {
          return handler['apply'](target, this, args)
        }

        // since the target was a function, fallback to calling it directly.
        if (usingNew) {
          // inspired by answers to https://stackoverflow.com/q/1606797
          args.unshift(target) // pass class as first arg to constructor, although irrelevant
          // nb. cast to convince Closure compiler that this is a constructor
          const f = /** @type {!Function} */ (target.bind.apply(target, args))
          return new f()
        }
        return target.apply(this, args)
      }
      isMethod = true
    } else if (target instanceof Array) {
      proxy = []
      isArray = true
    }

    // Create default getters/setters. Create different code paths as handler.get/handler.set can't
    // change after creation.
    const getter = handler.get ? function(prop) {
      throwRevoked('get')
      return handler.get(this, prop, proxy)
    } : function(prop) {
      throwRevoked('get')
      return this[prop]
    }
    const setter = handler.set ? function(prop, value) {
      throwRevoked('set')
      const status = handler.set(this, prop, value, proxy)
      // TODO(samthor): If the calling code is in strict mode, throw TypeError.
      // if (!status) {
      // It's (sometimes) possible to work this out, if this code isn't strict- try to load the
      // callee, and if it's available, that code is non-strict. However, this isn't exhaustive.
      // }
    } : function(prop, value) {
      throwRevoked('set')
      this[prop] = value
    }

    // Clone direct properties (i.e., not part of a prototype).
    const propertyNames = Object.getOwnPropertyNames(target)
    const propertyMap = {}
    propertyNames.forEach(function(prop) {
      if ((isMethod || isArray) && prop in proxy) {
        return // ignore properties already here, e.g. 'bind', 'prototype' etc
      }
      const real = Object.getOwnPropertyDescriptor(target, prop)
      const desc = {
        enumerable: !!real.enumerable,
        get: getter.bind(target, prop),
        set: setter.bind(target, prop)
      }
      Object.defineProperty(proxy, prop, desc)
      propertyMap[prop] = true
    })

    // Set the prototype, or clone all prototype methods (always required if a getter is provided).
    // TODO(samthor): We don't allow prototype methods to be set. It's (even more) awkward.
    // An alternative here would be to _just_ clone methods to keep behavior consistent.
    let prototypeOk = true
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(proxy, Object.getPrototypeOf(target))
    } else if (proxy.__proto__) {
      proxy.__proto__ = target.__proto__
    } else {
      prototypeOk = false
    }
    if (handler.get || !prototypeOk) {
      for (const k in target) {
        if (propertyMap[k]) {
          continue
        }
        Object.defineProperty(proxy, k, { get: getter.bind(target, k) })
      }
    }

    // The Proxy polyfill cannot handle adding new properties. Seal the target and proxy.
    Object.seal(target)
    Object.seal(proxy)

    return proxy // nb. if isMethod is true, proxy != this
  }

  ProxyPolyfill.revocable = function(target, handler) {
    const p = new ProxyPolyfill(target, handler)
    return { 'proxy': p, 'revoke': lastRevokeFn }
  }

  return ProxyPolyfill
}

const proxyPolyfill = proxyPoly()

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
		decodeURIComponent(search)
		  .replace(/"/g, '\\"')
		  .replace(/&/g, '","')
		  .replace(/=/g, '":"')
		  .replace(/\+/g, ' ') +
		'"}'
  )
}

export function uniqueArr(arr) {
  var hash = []
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i])
    }
  }
  return hash
}

export function getYourIP() {
  return new Promise((resolve, reject) => {
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
    if (RTCPeerConnection) {
      (function() {
        var rtc = new RTCPeerConnection({ iceServers: [] })
        if (1 || window.mozRTCPeerConnection) {
          rtc.createDataChannel('', { reliable: false })
        }

        rtc.onicecandidate = function(evt) {
          if (evt.candidate) grepSDP('a=' + evt.candidate.candidate)
        }
        rtc.createOffer(function(offerDesc) {
          grepSDP(offerDesc.sdp)
          rtc.setLocalDescription(offerDesc)
        }, function(e) { console.warn('offer failed', e) })

        var addrs = Object.create(null)
        addrs['0.0.0.0'] = false
        function updateDisplay(newAddr) {
          if (newAddr in addrs) return
          else addrs[newAddr] = true
          var displayAddrs = Object.keys(addrs).filter(function(k) { return addrs[k] })
          for (var i = 0; i < displayAddrs.length; i++) {
            if (displayAddrs[i].length > 16) {
              displayAddrs.splice(i, 1)
              i--
            }
          }
          resolve(displayAddrs[0])
        // document.getElementById('list').textContent = displayAddrs[0];
        }

        function grepSDP(sdp) {
          var hosts = []
          sdp.split('\r\n').forEach(function(line, index, arr) {
				   if (~line.indexOf('a=candidate')) {
              var parts = line.split(' ')
              var addr = parts[4]
              var type = parts[7]
              if (type === 'host') updateDisplay(addr)
            } else if (~line.indexOf('c=')) {
              var parts = line.split(' ')
              var addr = parts[2]
              updateDisplay(addr)
            }
          })
        }
      })()
    } else {
      console.log('请使用主流浏览器：chrome,firefox,opera,safari')
      reject()
    }
  })
}

export const foowwLocalStorage = {
  set: function(key, value, ttl_ms) {
    var data = { value: value, expirse: new Date(ttl_ms).getTime() }
    localStorage.setItem(key, JSON.stringify(data))
  },
  get: function(key) {
    var data = JSON.parse(localStorage.getItem(key))
    if (data !== null) {
      if (data.expirse != null && data.expirse < new Date().getTime()) {
        localStorage.removeItem(key)
      } else {
        return data.value
      }
    }
    return null
  }
}

// vuex state持久化
export const storeMaker = (state) => {
  // 初始化
  Object.keys(state).map((key) => {
    // 判断类型获取本地存储数据
    if (typeof state[key] === 'object') {
      if (sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key))) {
        state[key] = JSON.parse(sessionStorage.getItem(key))
      }
    } else if (typeof state[key] === 'number') {
      if (sessionStorage.getItem(key) && parseInt(sessionStorage.getItem(key))) {
        state[key] = parseInt(sessionStorage.getItem(key))
      }
    } else {
      if (sessionStorage.getItem(key)) {
        state[key] = sessionStorage.getItem(key)
      }
    }
  })

  // 重写set处理
  return new proxyPolyfill(state, {
    set: function(target, key, value) {
      let temp = value
      if (typeof temp === 'object') {
        temp = JSON.stringify(temp)
      }

      sessionStorage.setItem(key, temp)
      return Reflect.set(target, key, value)
    }
  })
}

// 根据ID递归查找
export const RecursiveSearch = function(arr, key, value) {
  var dest = false
  arr.map(item => {
    if (item[key] == value) {
      dest = item
    } else if (item.children && item.children.length > 0) {
      var res = RecursiveSearch(item.children, key, value)
      if (res) {
        dest = res
      }
    }
  })
  return dest
}
