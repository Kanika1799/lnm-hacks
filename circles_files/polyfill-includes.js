'use strict';

Array.prototype.find = Array.prototype.find || function (callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if (callback.call(thisArg, element, i, list)) {
      return element;
    }
  }
};
Array.prototype.includes = Array.prototype.includes || function (searchElement /*, fromIndex*/) {
  'use strict';

  var O = Object(this);
  var len = parseInt(O.length) || 0;
  if (len === 0) {
    return false;
  }
  var n = parseInt(arguments[1]) || 0;
  var k;
  if (n >= 0) {
    k = n;
  } else {
    k = len + n;
    if (k < 0) {
      k = 0;
    }
  }
  while (k < len) {
    var currentElement = O[k];
    if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
      return true;
    }
    k++;
  }
  return false;
};
String.prototype.includes = String.prototype.includes || function (search, start) {
  'use strict';

  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};


if ("document" in self) {

  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

    (function (view) {

      "use strict";

      if (!('Element' in view)) return;

      var classListProp = "classList",
        protoProp = "prototype",
        elemCtrProto = view.Element[protoProp],
        objCtr = Object,
        strTrim = String[protoProp].trim || function () {
          return this.replace(/^\s+|\s+$/g, "");
        },
        arrIndexOf = Array[protoProp].indexOf || function (item) {
          var i = 0,
            len = this.length;
          for (; i < len; i++) {
            if (i in this && this[i] === item) {
              return i;
            }
          }
          return -1;
        }
        // Vendors: please allow content code to instantiate DOMExceptions
        ,
        DOMEx = function DOMEx(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        },
        checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
          if (token === "") {
            throw new DOMEx("SYNTAX_ERR", "The token must not be empty.");
          }
          if (/\s/.test(token)) {
            throw new DOMEx("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
          }
          return arrIndexOf.call(classList, token);
        },
        ClassList = function ClassList(elem) {
          var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
            i = 0,
            len = classes.length;
          for (; i < len; i++) {
            this.push(classes[i]);
          }
          this._updateClassName = function () {
            elem.setAttribute("class", this.toString());
          };
        },
        classListProto = ClassList[protoProp] = [],
        classListGetter = function classListGetter() {
          return new ClassList(this);
        };
      // Most DOMException implementations don't allow calling DOMException's toString()
      // on non-DOMExceptions. Error's toString() is sufficient here.
      DOMEx[protoProp] = Error[protoProp];
      classListProto.item = function (i) {
        return this[i] || null;
      };
      classListProto.contains = function (token) {
        return ~checkTokenAndGetIndex(this, token + "");
      };
      classListProto.add = function () {
        var tokens = arguments,
          i = 0,
          l = tokens.length,
          token,
          updated = false;
        do {
          token = tokens[i] + "";
          if (!~checkTokenAndGetIndex(this, token)) {
            this.push(token);
            updated = true;
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.remove = function () {
        var tokens = arguments,
          i = 0,
          l = tokens.length,
          token,
          updated = false,
          index;
        do {
          token = tokens[i] + "";
          index = checkTokenAndGetIndex(this, token);
          while (~index) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.toggle = function (token, force) {
        var result = this.contains(token),
          method = result ? force !== true && "remove" : force !== false && "add";

        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };
      classListProto.replace = function (token, replacement_token) {
        var index = checkTokenAndGetIndex(token + "");
        if (~index) {
          this.splice(index, 1, replacement_token);
          this._updateClassName();
        }
      };
      classListProto.toString = function () {
        return this.join(" ");
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) {
          // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    })(self);
  }

  // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.

  (function () {
    "use strict";

    var testElement = document.createElement("_");

    testElement.classList.add("c1", "c2");

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains("c2")) {
      var createMethod = function createMethod(method) {
        var original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function (token) {
          var i,
            len = arguments.length;

          for (i = 0; i < len; i++) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };
      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle("c3", false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains("c3")) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
    }

    // replace() polyfill
    if (!("replace" in document.createElement("_").classList)) {
      DOMTokenList.prototype.replace = function (token, replacement_token) {
        var tokens = this.toString().split(" "),
          index = tokens.indexOf(token + "");
        if (~index) {
          tokens = tokens.slice(index);
          this.remove.apply(this, tokens);
          this.add(replacement_token);
          this.add.apply(this, tokens.slice(1));
        }
      };
    }

    testElement = null;
  })();
}
(function () {
  function remove() {
    this.parentNode && this.parentNode.removeChild(this);
  }
  if (!Element.prototype.remove) Element.prototype.remove = remove;
  if (Text && !Text.prototype.remove) Text.prototype.remove = remove;
})();

/*Element.prototype.closest = Element.prototype.closest || function (property, value) {
  var x = this;
  console.log(x);
  do {
    if (typeof x.getAttribute != 'undefined' && x.getAttribute(property) && x.getAttribute(property).indexOf(value) != -1 || x[property] && x[property].indexOf(value) != -1) {
      return x;
    }
  } while (x = x.parentNode || x.parentElement);
  return null;
};*/

// Array.prototype.from = Array.from || (function () {
//   var toStr = Object.prototype.toString;
//   var isCallable = function (fn) {
//     return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
//   };
//   var toInteger = function (value) {
//     var number = Number(value);
//     if (isNaN(number)) { return 0; }
//     if (number === 0 || !isFinite(number)) { return number; }
//     return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
//   };
//   var maxSafeInteger = Math.pow(2, 53) - 1;
//   var toLength = function (value) {
//     var len = toInteger(value);
//     return Math.min(Math.max(len, 0), maxSafeInteger);
//   };

//   // Свойство length метода from равно 1.
//   return function from(arrayLike/*, mapFn, thisArg */) {
//     // 1. Положим C равным значению this.
//     var C = this;

//     // 2. Положим items равным ToObject(arrayLike).
//     var items = Object(arrayLike);

//     // 3. ReturnIfAbrupt(items).
//     if (arrayLike == null) {
//       throw new TypeError('Array.from requires an array-like object - not null or undefined');
//     }

//     // 4. Если mapfn равен undefined, положим mapping равным false.
//     var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
//     var T;
//     if (typeof mapFn !== 'undefined') {
//       // 5. иначе
//       // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
//       if (!isCallable(mapFn)) {
//         throw new TypeError('Array.from: when provided, the second argument must be a function');
//       }

//       // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
//       if (arguments.length > 2) {
//         T = arguments[2];
//       }
//     }

//     // 10. Положим lenValue равным Get(items, "length").
//     // 11. Положим len равным ToLength(lenValue).
//     var len = toLength(items.length);

//     // 13. Если IsConstructor(C) равен true, то
//     // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
//     //     объекта C со списком аргументов, содержащим единственный элемент len.
//     // 14. a. Иначе, положим A равным ArrayCreate(len).
//     var A = isCallable(C) ? Object(new C(len)) : new Array(len);

//     // 16. Положим k равным 0.
//     var k = 0;
//     // 17. Пока k < len, будем повторять... (шаги с a по h)
//     var kValue;
//     while (k < len) {
//       kValue = items[k];
//       if (mapFn) {
//         A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
//       } else {
//         A[k] = kValue;
//       }
//       k += 1;
//     }
//     // 18. Положим putStatus равным Put(A, "length", len, true).
//     A.length = len;
//     // 20. Вернём A.
//     return A;
//   };
// })();

Element.prototype.append = Element.prototype.append || Element.prototype.appendChild;

if (!Element.prototype.closest) (function (e) {
  e.closest = e.closest || function (css) {
    var node = this;
    while (node) {
      if (node.matches(css)) return node;
      else node = node.parentElement;
    }
    return null;
  }
})(Element.prototype);

Element.prototype.closest = (function () {
  function finder(el, params) {
    if (!el || el == document) return null;
    if (Object.keys(params).reduce(function (total, key) {
      // console.log(total, key, params[key]);
      if (key == 'tag' && el.tagName.toLowerCase() == params[key].toLowerCase()) return total;
      if (key == 'class' && el.getAttribute('class') && el.getAttribute('class').split(' ').includes(params[key])) return el;
      return total && (params[key] !== undefined && el.getAttribute(key) == params[key] || params[key] === undefined && el.getAttribute(key) !== null);
    }, true)) return el;
    return finder(el.parentNode, params);
  }
  return function (keys) {
    var params = typeof keys == 'object' ? keys : keys.split(',').reduce(function (p, e) {
      var a = e.split('=');
      p[a[0]] = a[1];
      return p;
    }, {});
    // console.log(params);
    return finder(this, params);
  }
})();

// Element.prototype.onclick = function (func) {
//   this.addEventListener('click', func);
// }

// Element.prototype.addEventListener = (function () {
//   Element.prototype.myEvent = Element.prototype.addEventListener;
//   let count = 0;
//   return function (name, func, args) {
//     console.log(++count);
//     this.myEvent(name, func, args);
//   }
// })();

if (!Element.prototype.remove) { // <-- polyfill
  Element.prototype.remove = function () {
    this.parentNode.removeChild(this);
  }
}

console.log('ПОЛИФИЛ3');
