'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polymer = window.Polymer;
var CustomEvent = window.CustomEvent;

var twitterTimeline = function () {
  function twitterTimeline() {
    _classCallCheck(this, twitterTimeline);
  }

  _createClass(twitterTimeline, [{
    key: 'beforeRegister',


    // Element setup goes in beforeRegister instead of createdCallback.
    value: function beforeRegister() {
      this.is = 'twitter-timeline';

      // Define the properties object in beforeRegister.
      this.properties = {
        /** Twtt istance **/
        Twtt: {
          type: Function
        },
        uniqueId: {
          type: String,
          value: 'twitterTimelinePolymerLibLoader'
        },
        /**
         * Twitter data-id to feed the timeline
         * - Create a new widget: https://twitter.com/settings/widgets/new
         * - Get the data from whatever source you want
         * - Get the data-widget-id
         *
         */
        dataWidgetId: {
          type: String,
          observer: '_dataWidgetIdChanged'
        },
        /**
         * Specifies `width` and `height` of the widget
         *
         * @type {{width: string, height: string}}
         */
        size: {
          type: Object,
          value: function value() {
            return {
              width: '400',
              height: '400'
            };
          }
        },

        _resolveTwttLoaded: {
          type: Function
        },

        _twttLoaded: {
          type: Promise,
          value: function value() {
            var _this = this;

            return new Promise(function (resolve) {
              _this._resolveTwttLoaded = resolve;
            });
          }
        },

        _timelineLoaded: {
          type: Promise,
          value: function value() {
            return Promise.resolve();
          }
        }
      };
    }

    // onReady fill <lib-loader> component to load Ace.js from CDN

  }, {
    key: 'ready',
    value: function ready() {
      this._computeLibLink();
      this._computeUniqueId();
      if (this.$.loaderTwtt.isAttached) {
        this.$.loaderTwtt.attached();
      }
    }

    /**
     *  {function} loadTimeline load (or reload)  the timeline
     *  {string} widgetId(optional) Id (or new id) of the twitter timeline
     **/

  }, {
    key: 'loadTimeline',
    value: function loadTimeline(widgetId) {
      var _this2 = this;

      this._timelineLoaded = this._timelineLoaded.then(function () {
        // Destroy previous timeline
        _this2.removeTimeline();
      });
      // Check if the widget id is present
      var widget = widgetId || this._checkForWidgetId();

      if (widget) {
        this._timelineLoaded = this._timelineLoaded.then(function () {
          return _this2.Twtt.widgets.createTimeline(widget, _this2.$.timeline, {
            width: _this2.size.width,
            height: _this2.size.height,
            related: 'twitterdev,twitterapi'
          }).then(function (el) {
            _this2.dispatchEvent(new CustomEvent('timeline-loaded', {
              detail: {
                loaded: true
              }
            }));
          });
        });
        return true;
      }

      console.warn("WARNING: 'data-widget-id' is not defined ");
      return false;
    }

    /**
     *  {function} removeTimeline remove the current timeline
     **/

  }, {
    key: 'removeTimeline',
    value: function removeTimeline() {
      if (this.$.timeline.querySelector('iframe')) {
        return this.$.timeline.removeChild(this.$.timeline.querySelector('iframe'));
      }
      return false;
    }

    /** ===============
     * Private methods
     **/

  }, {
    key: '_computeLibLink',
    value: function _computeLibLink() {
      this.$.loaderTwtt.set('lib', 'https://platform.twitter.com/widgets.js');
    }
  }, {
    key: '_computeUniqueId',
    value: function _computeUniqueId() {
      this.$.loaderTwtt.set('libUniqueId', this.uniqueId);
    }
  }, {
    key: '_checkForWidgetId',
    value: function _checkForWidgetId() {
      return this.dataWidgetId || false;
    }
  }, {
    key: '_onTwttLoad',
    value: function _onTwttLoad() {
      this.Twtt = window.twttr;
      this._resolveTwttLoaded();
    }
  }, {
    key: '_dataWidgetIdChanged',
    value: function _dataWidgetIdChanged() {
      var _this3 = this;

      if (this.dataWidgetId) {
        this._twttLoaded.then(function () {
          _this3.loadTimeline(_this3.dataWidgetId);
        });
      }
    }
  }, {
    key: 'behaviors',

    // Define behaviors with a getter.
    get: function get() {
      return [];
    }
  }]);

  return twitterTimeline;
}();

// Register the element using Polymer's constructor.


Polymer(twitterTimeline);