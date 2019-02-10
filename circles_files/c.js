'use strict';
// Файл для работы с куками
// Примеры:
// getCookie('name') - возвращает значение куки name.
// setCookie('name', 'value') - устанавливает куку с именем name и значением value.
// deleteCookie('name') - удаляет куку name.

// Возвращает куку.
// @name - имя куки.

function getCookie(name) {
	var cookieList = document.cookie.split('; '),
	    foundCookie = void 0;
	for (var i = 0; i < cookieList.length; i++) {
		if (cookieList[i].split('=')[0] === name) foundCookie = cookieList[i];
	}return foundCookie ? foundCookie.split('=')[1] : undefined;
}

// Устанавливает куку.hj
// @name - имя куки.
// @value - значение куки.
function setCookie(name, value) {
	var tail = [];
	tail.push('; domain=' + location.hostname);
	var expires = new Date(); //v-- Устанавливает время, которое наступит через год
	expires.setTime(expires.getTime() + 31536000000); //tail += '; expires=' + expires.toUTCString();
	tail.push('; path=/; expires=' + expires.toUTCString());
	document.cookie = name + '=' + value + tail.join('');
}

// Функция, которая удаляет куку.
// @name - имя куки.
function deleteCookie(name) {
	var date = new Date(0);
	document.cookie = name + '=' + '; path=/; expires=' + date.toUTCString();
}