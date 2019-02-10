'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
	function Slider(el) {
		var _this = this;

		var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

		_classCallCheck(this, Slider);

		this.el = el;
		this.min = min;
		this.max = max;
		this.limit = { min: min, max: max };
		this.createActions();
		this.press = false;
		this.mouse = { start: { x: 0, y: 0 }, current: { x: 0, y: 0 }, shift: { x: 0, y: 0 }, element: null };
		this.updateWidth();
		this.percent = { min: 0, max: 1 };
		this.timer = null;
		this.changeColor();

		this.clickOnLine = true;

		this.points = this.el.querySelectorAll('[slider]');
		this.inputs = this.el.querySelectorAll('input[input]');

		var _loop = function _loop(i) {
			_this.inputs[i].addEventListener('input', function (event) {
				clearTimeout(_this.timer);
				_this.timer = null;
				var value = toFloat(event.target.value);

				if (value.current.length == 0) return;
				event.target.value = value.current;

				if (value.float > _this.limit.max) event.target.value = _this[['min', 'max'][i]] = value.float = _this.limit.max;else if (value.float < 0) event.target.value = _this[['min', 'max'][i]] = current = 0;

				if (value.float - _this.limit.min < 0) value.float = _this.limit.min;
				_this[event.target.getAttribute('input')] = value.float;

				_this.lastValue[i] = value.float;

				_this.update(_this.min, _this.max, false);
				_this.eventMove();
				_this.eventUp();
				_this.timer = setTimeout(function () {
					_this.eventInput();
				}, 500);
			});
			_this.inputs[i].addEventListener('blur', function (event) {
				if (event.target.value.length == 0) _this.inputs[i].value = _this.lastValue[i];
			});
		};

		for (var i = 0; i < this.inputs.length; i++) {
			_loop(i);
		}
		this.lastValue = [0, 0];
		this.update(this.min, this.max);
	}

	_createClass(Slider, [{
		key: 'getOffsetX',
		value: function getOffsetX(event) {
			if (_isMobile) {
				return event.changedTouches[0].clientX - event.target.getBoundingClientRect().left;
			} else {
				return event.offsetX;
			}
		}
	}, {
		key: 'updateWidth',
		value: function updateWidth() {
			if (!this.constWidth) this.width = this.el.querySelectorAll('.slider_line')[0].clientWidth - 5;else this.width = this.constWidth;
			if (this.width < 0) this.width = 10;
			return this;
		}
	}, {
		key: 'update',
		value: function update() {
			var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.min;
			var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.max;
			var inputChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			this.updateWidth();

			// if (min < 0) min = 0;

			if (inputChange) {
				this.min = min;
				this.max = max;
			}
			//this[['min','max'][i]]

			this.percent.min = (this.valueToPos(min) - this.limit.min) / (this.limit.max - this.limit.min);
			this.percent.max = (this.valueToPos(max) - this.limit.min) / (this.limit.max - this.limit.min);
			if (this.percent.max < this.percent.min) this.percent.max = this.percent.min;
			if (this.percent.min < 0) this.percent.min = 0;
			if (this.percent.max > 1) this.percent.max = 1;

			if (!!this.points) for (var i = 0; i < this.points.length; i++) {
				var pos = [this.percent.min, this.percent.max][i] * this.width;
				this.points[i].style.transform = 'translate(' + pos + 'px, 0px)';
				this.points[i].dataset.pos = pos;
			}
			if (inputChange) {
				for (var _i = 0; _i < this.inputs.length; _i++) {
					this.inputs[_i].value = this.lastValue[_i] = this.inputRounding([min, max][_i]);
				}
			}
			this.drawBackground();
			this.changeZIndex();
			this.eventMove();
			return this;
		}
	}, {
		key: 'createActions',
		value: function createActions() {
			var _this2 = this;

			this.el.addEventListener(_isMobile ? 'touchstart' : 'mousedown', function (event) {
				_this2.action(event);
			}, true);
			document.addEventListener(_isMobile ? 'touchmove' : 'mousemove', function (event) {
				_this2.action(event);
			}, true);
			document.addEventListener(_isMobile ? 'touchend' : 'mouseup', function (event) {
				_this2.action(event);
			}, true);
			return this;
		}
	}, {
		key: 'getSliderPos',
		value: function getSliderPos(el) {
			return parseInt(el.dataset.pos || 0);
		}
	}, {
		key: 'action',
		value: function action(event) {
			var _this3 = this;

			switch (event.type) {
				case 'touchstart':
				case 'mousedown':
					var element = event.target.closest('slider');
					if (!element) {
						if (!event.target.closest('class=slider_line') || this.clickOnLine === false) return;
						var min = parseInt(this.points[0].dataset.pos || 0);
						var max = parseInt(this.points[1].dataset.pos || 0);
						var _element = void 0;
						if (Math.abs(event.offsetX - min) < Math.abs(event.offsetX - max) && (this.clickOnLine === 0 || this.clickOnLine === true)) _element = this.points[0];else if (this.clickOnLine === 1 || this.clickOnLine === true) _element = this.points[1];
						// console.log(min,max,element, e);
						this.mouse.element = _element;
						this.mouse.shift.x = this.getOffsetX(event); // this.mouse.shift.y = e.offsetY;
						this.mouse.start.x = this.getOffsetX(event) - this.mouse.shift.x + _element.clientWidth / 2; // this.mouse.start.y = e.clientY;
						// this.mouse.current.x = e.clientX;// this.mouse.current.y = e.clientY;
						var percent = (this.mouse.start.x + this.mouse.shift.x - 10) / this.width;
						if (percent < 0) percent = 0;
						this.move(percent);
						this.drawBackground();
						this.eventMove();
						setTimeout(function () {
							_this3.eventUp();
						}, 8);
						console.log('click');
						return;
					}
					this.press = true;
					element.classList.add('press');
					var shift = this.getSliderPos(this.mouse.element = element);
					this.mouse.shift.x = this.getOffsetX(event); //e.offsetX;// this.mouse.shift.y = e.offsetY;
					var eclientX = _isMobile ? event.changedTouches[0].clientX : event.clientX;
					this.mouse.start.x = eclientX - shift - this.mouse.shift.x; // this.mouse.start.y = e.clientY;
					event.stopPropagation();
					break;
				case 'touchmove':
				case 'mousemove':
					if (this.press && this.mouse.element) {
						this.mouse.current.x = _isMobile ? event.changedTouches[0].clientX : event.clientX; // this.mouse.current.y = e.clientY;
						var _percent = (this.mouse.current.x - this.mouse.shift.x - this.mouse.start.x) / this.width;
						if (_percent < 0) _percent = 0;
						this.move(_percent);
						this.drawBackground();
						event.stopPropagation();
						this.eventMove();
					}

					break;
				case 'touchend':
				case 'mouseup':
					this.press = false;
					if (this.mouse.element) {
						this.mouse.element.classList.remove('press');
						this.changeZIndex();
						this.mouse.element = null;
						this.eventUp();
					}
					// e.stopPropagation();
					break;
			}
		}
	}, {
		key: 'move',
		value: function move(percent) {
			var name = this.mouse.element.getAttribute('slider');

			if (name === 'max') {
				if (percent > 1) percent = 1;
				if (percent < this.percent.min) percent = this.percent.min;
			}
			if (name === 'min') {
				if (percent > this.percent.max) percent = this.percent.max;
				if (percent < 0) percent = 0;
			}
			// console.log(percent);
			this.mouse.element.style.transform = 'translate(' + percent * this.width + 'px, 0px)';
			this.mouse.element.dataset.pos = percent * this.width;
			var input = this.el.querySelectorAll('input[input="' + name + '"]');
			if (input && input.length) {
				this[name] = this.posToValue(percent); //(this.limit.min + (this.posToValue(percent) * (this.limit.max - this.limit.min)));
				// console.log(this[name]);
				input[0].value = this.inputRounding(this[name]);
			}
			this.percent[name] = percent;
		}
	}, {
		key: 'drawBackground',
		value: function drawBackground() {
			this.el.querySelectorAll('.slider_line')[0].setAttribute('style', 'background: linear-gradient(to right, #989898 ' + this.percent.min * this.width + 'px, ' + this.color + ' 0, ' + this.color + ' ' + this.percent.max * this.width + 'px, #989898 0);');
		}
	}, {
		key: 'changeColor',
		value: function changeColor() {
			switch (getCookie('theme')) {
				case 'pinkTheme':
					this.color = '#D774A0';break;
				case 'blueTheme':
					this.color = '#4FB8CD';break;
				case 'orangeTheme':
					this.color = '#E4A13B';break;
				default:
					this.color = '#EDD683';break;
			}
			return this;
		}
	}, {
		key: 'posToValue',
		value: function posToValue(p) {
			return this.limit.min + p * (this.limit.max - this.limit.min);
		}
	}, {
		key: 'valueToPos',
		value: function valueToPos(x) {
			return x;
		}
	}, {
		key: 'changeZIndex',
		value: function changeZIndex() {
			for (var i = 0; i < this.points.length; i++) {
				js.removeClass(this.points[i], 'zindex');
			}if (this.percent.min > .5) this.points[0].classList.add('zindex');
			if (this.percent.max < .5) this.points[1].classList.add('zindex');
		}
	}, {
		key: 'setMax',
		value: function setMax(max) {
			this.limit.max = parseFloat(max.toFixed(3));
			return this;
		}
	}, {
		key: 'setMin',
		value: function setMin(min) {
			this.limit.min = parseFloat(min.toFixed(3));
			return this;
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.min = this.limit.min;
			this.max = this.limit.max;
			return this;
		}
	}, {
		key: 'eventMove',
		value: function eventMove() {}
	}, {
		key: 'eventUp',
		value: function eventUp() {}
	}, {
		key: 'eventInput',
		value: function eventInput() {}
	}, {
		key: 'inputRounding',
		value: function inputRounding(x) {
			return Math.round(x);
		}
	}, {
		key: 'isChange',
		value: function isChange() {
			return this.min !== this.limit.min || this.max !== this.limit.max;
		}
	}]);

	return Slider;
}();