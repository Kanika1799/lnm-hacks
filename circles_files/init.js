'use strict';

var _langToCurrency;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* 
 * Инициализация переменных, функций, валют, языка
 * Все что может понадобиться в дальнейшем использовании 
 */

console.logs = {};
// console.stdlog = console.log.bind(console);
// console.log = function () {
//     console.logs.push(Array.from(arguments));
//     if (console.logs.length >= 200) console.logs = console.logs.slice(100, 200);
//     console.stdlog.apply(console, arguments);
// };

// console.stdwarn = console.warn.bind(console);
// console.warn = function () {
//     console.logs.push(Array.from(arguments));
//     if (console.logs.length >= 200) console.logs = console.logs.slice(100, 200);
//     console.stdwarn.apply(console, arguments);
// };

// console.stderror = console.warn.bind(console);
// console.error = function () {
//     console.logs.push(Array.from(arguments));
//     if (console.logs.length >= 200) console.logs = console.logs.slice(100, 200);
//     console.stderror.apply(console, arguments);
// };

window.onerror = function () {
    var error = JSON.stringify(arguments);
    if (console.logs[error]) return;
    console.logs[error] = 1;
    request.post('/my_logs_dev', {
        error: arguments
    });
};

/* Инициализация переменных */
var userInventory = void 0,
    botInventory = void 0,
    autoSelect = void 0,
    currency = void 0,
    currency_symbol = '$',
    currency_value = 1,
    currency_list = void 0,
    list_currency = void 0;

var steamid = getCookie("steamid");
var username = getCookie("username");

var pageLoadDate = new Date();
var namesDisappearedSkins = ['Reserved', 'Overstock', 'Gone', 'Untradable', 'Unavailable'];

var currencies = {
    'USD': { symbol: '$' },
    'EUR': { symbol: '€' },
    'RUB': { symbol: '₽' },
    'KEY': { symbol: '🔑' },
    'GBP': { symbol: '£' },
    'UAH': { symbol: '₴' },
    'TRY': { symbol: '₺' },
    'AED': { symbol: 'Dh' },
    'AUD': { symbol: '$' },
    'BGN': { symbol: 'лв' },
    'BRL': { symbol: 'R$' },
    'BYN': { symbol: 'р.' },
    'CAD': { symbol: 'C$' },
    'CHF': { symbol: '₣' },
    'CNY': { symbol: '¥' },
    'CZK': { symbol: 'Kč' },
    'DKK': { symbol: 'kr' },
    'HKD': { symbol: '元' },
    'HRK': { symbol: '$' },
    'HUF': { symbol: 'ƒ' },
    'IDR': { symbol: 'Rp' },
    'ILS': { symbol: '₪' },
    'INR': { symbol: '₹' },
    'JPY': { symbol: '¥' },
    'KRW': { symbol: '₩' },
    'KZT': { symbol: '₸' },
    'MDL': { symbol: 'L' },
    'MXN': { symbol: '$' },
    'MYR': { symbol: 'RM' },
    'NOK': { symbol: 'kr' },
    'NZD': { symbol: '$' },
    'PHP': { symbol: '₱' },
    'PLN': { symbol: 'zł' },
    'PKR': { symbol: 'Rs' },
    'RON': { symbol: 'L' },
    'SEK': { symbol: 'kr' },
    'SGD': { symbol: '$' },
    'THB': { symbol: '฿' },
    'ZAR': { symbol: 'R' },
    'ARS': { symbol: '$' },
    'PEN': { symbol: 'S/' },
    'QAR': { symbol: 'ريال' }
};

var langToCurrency = (_langToCurrency = {
    'zh': 'CNY', 'cs': 'EUR', 'uk': 'UAH', 'pl': 'PLN', 'bg': 'BGN', 'hi': 'INR', 'nl': 'DKK',
    'hr': 'HRK', 'no': 'NOK', 'ro': 'RON', 'sv': 'SEK', 'ja': 'JPY', 'th': 'THB', 'hu': 'HUF',
    'he': 'ILS', 'tr': 'TRY', 'gd': 'GBP', 'el': 'EUR', 'it': 'EUR', 'lv': 'EUR', 'lt': 'EUR',
    'pt': 'EUR', 'kk': 'KZT', 'jp': 'JPY' }, _defineProperty(_langToCurrency, 'no', 'NOK'), _defineProperty(_langToCurrency, 'ar', 'AED'), _defineProperty(_langToCurrency, 'bg', 'BGN'), _defineProperty(_langToCurrency, 'hi', 'INR'), _defineProperty(_langToCurrency, 'nl', 'EUR'), _defineProperty(_langToCurrency, 'hu', 'HUF'), _defineProperty(_langToCurrency, 'th', 'THB'), _defineProperty(_langToCurrency, 'be', 'BYN'), _defineProperty(_langToCurrency, 'en-au', 'AUD'), _defineProperty(_langToCurrency, 'pt-br', 'BRL'), _defineProperty(_langToCurrency, 'en-ca', 'CAD'), _defineProperty(_langToCurrency, 'fr-ca', 'CAD'), _defineProperty(_langToCurrency, 'en-nz', 'NZD'), _defineProperty(_langToCurrency, 'es-mx', 'MXN'), _defineProperty(_langToCurrency, 'zh-hk', 'HKD'), _defineProperty(_langToCurrency, 'ro-mo', 'MDL'), _defineProperty(_langToCurrency, 'ru-mo', 'MDL'), _defineProperty(_langToCurrency, 'zh-sg', 'SGD'), _defineProperty(_langToCurrency, 'en-za', 'ZAR'), _defineProperty(_langToCurrency, 'en-gb', 'GBP'), _defineProperty(_langToCurrency, 'ar-ae', 'AED'), _defineProperty(_langToCurrency, 'gd-ie', 'GBP'), _defineProperty(_langToCurrency, 'fr-be', 'EUR'), _defineProperty(_langToCurrency, 'de-ch', 'CHF'), _defineProperty(_langToCurrency, 'de-at', 'EUR'), _defineProperty(_langToCurrency, 'de-lu', 'EUR'), _defineProperty(_langToCurrency, 'de-li', 'CHF'), _defineProperty(_langToCurrency, 'es-ec', 'USD'), _defineProperty(_langToCurrency, 'es-pr', 'USD'), _defineProperty(_langToCurrency, 'ru-ru', 'RUB'), _defineProperty(_langToCurrency, 'en-in', 'INR'), _defineProperty(_langToCurrency, 'es-ar', 'ARS'), _defineProperty(_langToCurrency, 'es-pe', 'PEN'), _defineProperty(_langToCurrency, 'fr-ch', 'CHF'), _defineProperty(_langToCurrency, 'it-ch', 'CHF'), _langToCurrency);

var dom_input_add_lacks_sum = document.getElementById('input_add_lacks_sum');
var dom_input_add_lacks_sum_bonus = document.getElementById('input_add_lacks_sum_bonus');

var dom_lacks_sum = document.getElementById('lacks_sum');
var dom_lacks_sum_bonus = document.getElementById('lacks_sum_bonus');
var dom_input_add_total = document.getElementById('input_add_total');

var dom_wrapper_popups = document.getElementsByClassName('wrapper_popups')[0];

/* Валюты */
var temp_currency = getCookie('currency');
if (!(temp_currency in currencies)) temp_currency = getAssumedCurrency();

function getAssumedCurrency() {
    if (!navigator || !navigator.languages) return 'USD';

    var limiter = 4;
    for (var i = 0; i < navigator.languages.length && i < limiter; i++) {
        var _current_language = navigator.languages[i].toLowerCase();
        if (langToCurrency[_current_language]) return langToCurrency[_current_language];
    }

    return 'USD';
}

/* Языки */
var language = window.navigator.userLanguage || window.navigator.language;

var tempLanguage = getCookie('language');
if (!(tempLanguage in language_frontend['languages'])) {
    setCookie('language', tempLanguage = 'en');
}

var current_language = tempLanguage;

/* Определение устройств */
var _isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var _isMobile = navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/* Старые браузеры */
var _isOldBrowser = false;

try {
    // Проверяем, старый ли браузер
    [].find(function () {});
} catch (err) {
    // Если да, то подключаем polyfill
    _isOldBrowser = true;
    // document.getElementById('polyfill_includes').src = '/babeljs/polyfill_includes.js?v=13';
    // Показываем предупреждение пользователю, что он использует старый браузер
    document.getElementsByClassName('unavaliable_common')[0].classList.remove('hidden');
    document.getElementsByClassName('unavaliable_title_common')[0].innerText = getTranslation('browser_not_work_title');
    document.getElementsByClassName('unavaliable_text_common')[0].innerHTML = getTranslation('browser_not_work_body');
}

/* Работа с localStorage */
var storage = {
    getData: function getData(name) {
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data = void 0;
        try {
            data = JSON.parse(window.localStorage.getItem(name)) || def;
        } catch (err) {
            data = def;
        }
        return data;
    },
    setData: function setData(name, data) {
        try {
            window.localStorage.setItem(name, JSON.stringify(data));
        } catch (err) {
            console.log('error', err);
        }
    }
};

var cookies = {
    getData: function getData(name) {
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var data = void 0;
        try {
            data = JSON.parse(getCookie(name)) || def;
        } catch (err) {
            data = def;
        }
        return data;
    },
    setData: function setData(name, data) {
        try {
            setCookie(name, JSON.stringify(data));
        } catch (err) {
            console.log('error', err);
        }
    }
};

function getFromLocalStorage(name) {
    //getItemOfLocalStorage
    var value = window.localStorage.getItem(name);
    try {
        var valueJson = JSON.parse(value);
        return valueJson;
    } catch (error) {
        return value;
    }
}

function setToLocalStorage(name, value) {
    try {
        window.localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
        console.log('setToLocalStorage: error');
    }
}

function removeFromLocalStorage(name) {
    try {
        window.localStorage.removeItem(name);
    } catch (error) {
        console.log('removeFromLocalStorage: error');
    }
}

var theme = {
    current: '',
    dom_list: document.querySelectorAll('#theme_drop a'),
    init: function init() {
        this.update();
        var currentThemeElement = document.querySelector('.theme_drop a[theme="' + this.current + '"]');
        if (currentThemeElement) currentThemeElement.parentNode.remove();
    },
    getDefaultColor: function getDefaultColor() {
        var list = {
            darkTheme: '#2F3234',
            pinkTheme: '#D774A0',
            orangeTheme: '#5D6639',
            blueTheme: '#53C2BF'
        };
        document.querySelectorAll('meta[name="theme-color"]')[0].setAttribute('content', list[this.current]);
    },
    update: function update() {
        this.current = getCookie('theme') || 'darkTheme';
        this.getDefaultColor();
    }
};

theme.init();

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/Service.js?v=4').then(function(registration) {
//         console.log('ServiceWorker registration', registration);
//     }).catch(function(err) {
//         throw new Error('ServiceWorker error: ' + err);
//     });

//     window.addEventListener('beforeinstallprompt', function(e) {
//         console.log('beforeinstallprompt');
//         return false;
//     });
// }
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = registrations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var registration = _step.value;

                registration.unregister();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
}