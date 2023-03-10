import {
    cloneElement,
    Component,
    createRef,
    createElement
} from 'react';
import {
    number,
    element,
    func,
    oneOfType,
    instanceOf,
    string,
    bool
} from 'prop-types';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };

    return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
}

function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
        return call;
    }

    return _assertThisInitialized(self);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;

        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;

            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }

        return _possibleConstructorReturn(this, result);
    };
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function zeroPad(value) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var strValue = String(value);
    if (length === 0) return strValue;
    var match = strValue.match(/(.*?)([0-9]+)(.*)/);
    var prefix = match ? match[1] : '';
    var suffix = match ? match[3] : '';
    var strNo = match ? match[2] : strValue;
    var paddedNo = strNo.length >= length ? strNo : (_toConsumableArray(Array(length)).map(function() {
        return '0';
    }).join('') + strNo).slice(length * -1);
    return "".concat(prefix).concat(paddedNo).concat(suffix);
}
var timeDeltaFormatOptionsDefaults = {
    daysInHours: false,
    zeroPadTime: 2
};

function calcTimeDelta(date) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$now = options.now,
        now = _options$now === void 0 ? Date.now : _options$now,
        _options$precision = options.precision,
        precision = _options$precision === void 0 ? 0 : _options$precision,
        controlled = options.controlled,
        _options$offsetTime = options.offsetTime,
        offsetTime = _options$offsetTime === void 0 ? 0 : _options$offsetTime,
        overtime = options.overtime;
    var startTimestamp;

    if (typeof date === 'string') {
        startTimestamp = new Date(date).getTime();
    } else if (date instanceof Date) {
        startTimestamp = date.getTime();
    } else {
        startTimestamp = date;
    }

    if (!controlled) {
        startTimestamp += offsetTime;
    }

    var timeLeft = controlled ? startTimestamp : startTimestamp - now();
    var clampedPrecision = Math.min(20, Math.max(0, precision));
    var total = Math.round(parseFloat(((overtime ? timeLeft : Math.max(0, timeLeft)) / 1000).toFixed(clampedPrecision)) * 1000);
    var seconds = Math.abs(total) / 1000;
    return {
        total: total,
        days: Math.floor(seconds / (3600 * 24)),
        hours: Math.floor(seconds / 3600 % 24),
        minutes: Math.floor(seconds / 60 % 60),
        seconds: Math.floor(seconds % 60),
        milliseconds: Number((seconds % 1 * 1000).toFixed()),
        completed: total <= 0
    };
}

function formatTimeDelta(timeDelta, options) {
    var days = timeDelta.days,
        hours = timeDelta.hours,
        minutes = timeDelta.minutes,
        seconds = timeDelta.seconds;

    var _Object$assign = Object.assign(Object.assign({}, timeDeltaFormatOptionsDefaults), options),
        daysInHours = _Object$assign.daysInHours,
        zeroPadTime = _Object$assign.zeroPadTime,
        _Object$assign$zeroPa = _Object$assign.zeroPadDays,
        zeroPadDays = _Object$assign$zeroPa === void 0 ? zeroPadTime : _Object$assign$zeroPa;

    var zeroPadTimeLength = Math.min(2, zeroPadTime);
    var formattedHours = daysInHours ? zeroPad(hours + days * 24, zeroPadTime) : zeroPad(hours, zeroPadTimeLength);
    return {
        days: daysInHours ? '' : zeroPad(days, zeroPadDays),
        hours: formattedHours,
        minutes: zeroPad(minutes, zeroPadTimeLength),
        seconds: zeroPad(seconds, zeroPadTimeLength)
    };
}

var Countdown = function(_React$Component) {
    _inherits(Countdown, _React$Component);

    var _super = _createSuper(Countdown);

    function Countdown() {
        var _this;

        _classCallCheck(this, Countdown);

        _this = _super.apply(this, arguments);
        _this.state = {
            count: _this.props.count || 3
        };

        _this.startCountdown = function() {
            _this.interval = window.setInterval(function() {
                var count = _this.state.count - 1;

                if (count === 0) {
                    _this.stopCountdown();

                    _this.props.onComplete && _this.props.onComplete();
                } else {
                    _this.setState(function(prevState) {
                        return {
                            count: prevState.count - 1
                        };
                    });
                }
            }, 1000);
        };

        _this.stopCountdown = function() {
            clearInterval(_this.interval);
        };

        _this.addTime = function(seconds) {
            _this.stopCountdown();

            _this.setState(function(prevState) {
                return {
                    count: prevState.count + seconds
                };
            }, _this.startCountdown);
        };

        return _this;
    }

    _createClass(Countdown, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.startCountdown();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.interval);
        }
    }, {
        key: "render",
        value: function render() {
            return this.props.children ? cloneElement(this.props.children, {
                count: this.state.count
            }) : null;
        }
    }]);

    return Countdown;
}(Component);
Countdown.propTypes = {
    count: number,
    children: element,
    onComplete: func
};

var Countdown$1 = function(_React$Component) {
    _inherits(Countdown$1, _React$Component);

    var _super = _createSuper(Countdown$1);

    function Countdown$1(props) {
        var _this;

        _classCallCheck(this, Countdown$1);

        _this = _super.call(this, props);
        _this.mounted = false;
        _this.initialTimestamp = _this.calcOffsetStartTimestamp();
        _this.offsetStartTimestamp = _this.props.autoStart ? 0 : _this.initialTimestamp;
        _this.offsetTime = 0;
        _this.legacyMode = false;
        _this.legacyCountdownRef = createRef();

        _this.tick = function() {
            var timeDelta = _this.calcTimeDelta();

            var callback = timeDelta.completed && !_this.props.overtime ? undefined : _this.props.onTick;

            _this.setTimeDeltaState(timeDelta, undefined, callback);
        };

        _this.start = function() {
            if (_this.isStarted()) return;
            var prevOffsetStartTimestamp = _this.offsetStartTimestamp;
            _this.offsetStartTimestamp = 0;
            _this.offsetTime += prevOffsetStartTimestamp ? _this.calcOffsetStartTimestamp() - prevOffsetStartTimestamp : 0;

            var timeDelta = _this.calcTimeDelta();

            _this.setTimeDeltaState(timeDelta, "STARTED", _this.props.onStart);

            if (!_this.props.controlled && (!timeDelta.completed || _this.props.overtime)) {
                _this.clearTimer();

                _this.interval = window.setInterval(_this.tick, _this.props.intervalDelay);
            }
        };

        _this.pause = function() {
            if (_this.isPaused()) return;

            _this.clearTimer();

            _this.offsetStartTimestamp = _this.calcOffsetStartTimestamp();

            _this.setTimeDeltaState(_this.state.timeDelta, "PAUSED", _this.props.onPause);
        };

        _this.stop = function() {
            if (_this.isStopped()) return;

            _this.clearTimer();

            _this.offsetStartTimestamp = _this.calcOffsetStartTimestamp();
            _this.offsetTime = _this.offsetStartTimestamp - _this.initialTimestamp;

            _this.setTimeDeltaState(_this.calcTimeDelta(), "STOPPED", _this.props.onStop);
        };

        _this.isStarted = function() {
            return _this.isStatus("STARTED");
        };

        _this.isPaused = function() {
            return _this.isStatus("PAUSED");
        };

        _this.isStopped = function() {
            return _this.isStatus("STOPPED");
        };

        _this.isCompleted = function() {
            return _this.isStatus("COMPLETED");
        };

        _this.handleOnComplete = function(timeDelta) {
            if (_this.props.onComplete) _this.props.onComplete(timeDelta);
        };

        if (props.date) {
            var timeDelta = _this.calcTimeDelta();

            _this.state = {
                timeDelta: timeDelta,
                status: timeDelta.completed ? "COMPLETED" : "STOPPED"
            };
        } else {
            _this.legacyMode = true;
        }

        return _this;
    }

    _createClass(Countdown$1, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.legacyMode) {
                return;
            }

            this.mounted = true;
            if (this.props.onMount) this.props.onMount(this.calcTimeDelta());
            if (this.props.autoStart) this.start();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (this.legacyMode) {
                return;
            }

            if (this.props.date !== prevProps.date) {
                this.initialTimestamp = this.calcOffsetStartTimestamp();
                this.offsetStartTimestamp = this.initialTimestamp;
                this.offsetTime = 0;
                this.setTimeDeltaState(this.calcTimeDelta());
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.legacyMode) {
                return;
            }

            this.mounted = false;
            this.clearTimer();
        }
    }, {
        key: "calcTimeDelta",
        value: function calcTimeDelta$1() {
            var _this$props = this.props,
                date = _this$props.date,
                now = _this$props.now,
                precision = _this$props.precision,
                controlled = _this$props.controlled,
                overtime = _this$props.overtime;
            return calcTimeDelta(date, {
                now: now,
                precision: precision,
                controlled: controlled,
                offsetTime: this.offsetTime,
                overtime: overtime
            });
        }
    }, {
        key: "calcOffsetStartTimestamp",
        value: function calcOffsetStartTimestamp() {
            return Date.now();
        }
    }, {
        key: "addTime",
        value: function addTime(seconds) {
            this.legacyCountdownRef.current.addTime(seconds);
        }
    }, {
        key: "clearTimer",
        value: function clearTimer() {
            window.clearInterval(this.interval);
        }
    }, {
        key: "isStatus",
        value: function isStatus(status) {
            return this.state.status === status;
        }
    }, {
        key: "setTimeDeltaState",
        value: function setTimeDeltaState(timeDelta, status, callback) {
            var _this2 = this;

            if (!this.mounted) return;
            var completedCallback;

            if (!this.state.timeDelta.completed && timeDelta.completed) {
                if (!this.props.overtime) this.clearTimer();
                completedCallback = this.handleOnComplete;
            }

            var onDone = function onDone() {
                if (callback) callback(_this2.state.timeDelta);
                if (completedCallback) completedCallback(_this2.state.timeDelta);
            };

            return this.setState(function(prevState) {
                var newStatus = status || prevState.status;

                if (timeDelta.completed && !_this2.props.overtime) {
                    newStatus = "COMPLETED";
                } else if (!status && newStatus === "COMPLETED") {
                    newStatus = "STOPPED";
                }

                return {
                    timeDelta: timeDelta,
                    status: newStatus
                };
            }, onDone);
        }
    }, {
        key: "getApi",
        value: function getApi() {
            return this.api = this.api || {
                start: this.start,
                pause: this.pause,
                stop: this.stop,
                isStarted: this.isStarted,
                isPaused: this.isPaused,
                isStopped: this.isStopped,
                isCompleted: this.isCompleted
            };
        }
    }, {
        key: "getRenderProps",
        value: function getRenderProps() {
            var _this$props2 = this.props,
                daysInHours = _this$props2.daysInHours,
                zeroPadTime = _this$props2.zeroPadTime,
                zeroPadDays = _this$props2.zeroPadDays;
            var timeDelta = this.state.timeDelta;
            return Object.assign(Object.assign({}, timeDelta), {
                api: this.getApi(),
                props: this.props,
                formatted: formatTimeDelta(timeDelta, {
                    daysInHours: daysInHours,
                    zeroPadTime: zeroPadTime,
                    zeroPadDays: zeroPadDays
                })
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.legacyMode) {
                var _this$props3 = this.props,
                    count = _this$props3.count,
                    _children = _this$props3.children,
                    onComplete = _this$props3.onComplete;
                return createElement(Countdown, {
                    ref: this.legacyCountdownRef,
                    count: count,
                    onComplete: onComplete
                }, _children);
            }

            var _this$props4 = this.props,
                className = _this$props4.className,
                overtime = _this$props4.overtime,
                children = _this$props4.children,
                renderer = _this$props4.renderer;
            var renderProps = this.getRenderProps();

            if (renderer) {
                return renderer(renderProps);
            }

            if (children && this.state.timeDelta.completed && !overtime) {
                return cloneElement(children, {
                    countdown: renderProps
                });
            }

            var _renderProps$formatte = renderProps.formatted,
                days = _renderProps$formatte.days,
                hours = _renderProps$formatte.hours,
                minutes = _renderProps$formatte.minutes,
                seconds = _renderProps$formatte.seconds;
            return createElement("span", {
                className: className
            }, renderProps.total < 0 ? '-' : '', days, days ? ':' : '', hours, ":", minutes, ":", seconds);
        }
    }]);

    return Countdown$1;
}(Component);
Countdown$1.defaultProps = Object.assign(Object.assign({}, timeDeltaFormatOptionsDefaults), {
    controlled: false,
    intervalDelay: 1000,
    precision: 0,
    autoStart: true
});
Countdown$1.propTypes = {
    date: oneOfType([instanceOf(Date), string, number]),
    daysInHours: bool,
    zeroPadTime: number,
    zeroPadDays: number,
    controlled: bool,
    intervalDelay: number,
    precision: number,
    autoStart: bool,
    overtime: bool,
    className: string,
    children: element,
    renderer: func,
    now: func,
    onMount: func,
    onStart: func,
    onPause: func,
    onStop: func,
    onTick: func,
    onComplete: func
};

export default Countdown$1;
export {
    calcTimeDelta,
    formatTimeDelta,
    zeroPad
};