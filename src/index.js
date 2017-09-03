import {Element} from '@polymer/polymer/polymer-element';
/* eslint-disable no-unused-vars */
import libLoader from 'polymer-lib-loader';

export default class TwitterTimeline extends Element {
  static get properties() {
    return {
      /** Twtt istance * */
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
        value: () => {
          return {
            width: '400',
            height: '400'
          };
        }
      },
      /**
       * Value for `data-chrome` (https://dev.twitter.com/web/embedded-timelines#customize-widget-components)
       *
       * @type 'noheader,nofooter,noborders,noscrollbar,transparent'
      */
      chrome: {
        type: String,
        value: ''
      },

      _resolveTwttLoaded: {
        type: Function
      },

      _twttLoaded: {
        type: Promise,
        value() {
          return new Promise(resolve => {
            this._resolveTwttLoaded = resolve;
          });
        }
      },

      _timelineLoaded: {
        type: Promise,
        value() {
          return Promise.resolve();
        }
      }
    };
  }

  static get template() {
    return `
    <lib-loader id="loaderTwtt" on-lib-loaded="_onTwttLoad"></lib-loader>
    <div id="timeline">
      <slot name="title"></slot>
    </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._computeLibLink();
    this._computeUniqueId();
    if (this.$.loaderTwtt.isAttached) {
      this.$.loaderTwtt.attached();
    }
  }

  /**
   *  {function} loadTimeline load (or reload)  the timeline
   *  {string} widgetId(optional) Id (or new id) of the twitter timeline
   * */
  loadTimeline(widgetId) {
    this._timelineLoaded = this._timelineLoaded.then(() => {
        // Destroy previous timeline
      this.removeTimeline();
    });
      // Check if the widget id is present
    const widget = widgetId || this._checkForWidgetId();

    if (widget) {
      this._timelineLoaded = this._timelineLoaded.then(() => {
        return this.Twtt.widgets.createTimeline(
              widget,
              this.$.timeline, {
                width: this.size.width,
                height: this.size.height,
                chrome: this.chrome,
                related: 'twitterdev,twitterapi'
              }).then(() => {
                this.dispatchEvent(new CustomEvent('timeline-loaded', {
                  detail: {
                    loaded: true
                  }
                }));
              });
      });
      return true;
    }

    console.warn('WARNING: \'data-widget-id\' is not defined ');
    return false;
  }

   /**
    *  {function} removeTimeline remove the current timeline
    * */
  removeTimeline() {
    if (this.$.timeline.querySelector('iframe')) {
      return this.$.timeline.removeChild(this.$.timeline.querySelector('iframe'));
    }
    return false;
  }

  /** ===============
   * Private methods
   * */
  _computeLibLink() {
    this.shadowRoot.querySelector('#loaderTwtt').set('lib', `https://platform.twitter.com/widgets.js`);
  }
  _computeUniqueId() {
    this.shadowRoot.querySelector('#loaderTwtt').set('libUniqueId', this.uniqueId);
  }

  _checkForWidgetId() {
    return this.dataWidgetId || false;
  }

  _onTwttLoad() {
    this.Twtt = window.twttr;
    this._resolveTwttLoaded();
  }

  _dataWidgetIdChanged() {
    if (this.dataWidgetId) {
      this._twttLoaded.then(() => {
        this.loadTimeline(this.dataWidgetId);
      });
    }
  }
}

window.customElements.define('twitter-timeline', TwitterTimeline);
