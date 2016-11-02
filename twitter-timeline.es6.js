'use strict'

const Polymer = window.Polymer
const CustomEvent = window.CustomEvent

class twitterTimeline {
  // Define behaviors with a getter.
  get behaviors () {
    return []
  }

  // Element setup goes in beforeRegister instead of createdCallback.
  beforeRegister () {
    this.is = 'twitter-timeline'

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
        value: () => {
          return {
            width: '400',
            height: '400'
          }
        }
      },

      _resolveTwttLoaded: {
        type: Function
      },

      _twttLoaded: {
        type: Promise,
        value: function () {
          return new Promise(resolve => {
            this._resolveTwttLoaded = resolve
          })
        }
      }
    }
  }

  // onReady fill <lib-loader> component to load Ace.js from CDN
  ready () {
    this._computeLibLink()
    this._computeUniqueId()
    if (this.$.loaderTwtt.isAttached) {
      this.$.loaderTwtt.attached()
    }
  }

  /**
   *  {function} loadTimeline load (or reload)  the timeline
   *  {string} widgetId(optional) Id (or new id) of the twitter timeline
   **/
  loadTimeline (widgetId) {
     // Destroy previous timeline
    this.removeTimeline()
     // Check if the widget id is present
    const widget = widgetId || this._checkForWidgetId()

    if (widget) {
      this.Twtt.widgets.createTimeline(
         widget,
         this.$.timeline, {
           width: this.size.width,
           height: this.size.height,
           related: 'twitterdev,twitterapi'
         }).then((el) => {
           this.dispatchEvent(new CustomEvent('timeline-loaded', {
             detail: {
               loaded: true
             }
           }))
         })
      return true
    }

    console.warn("WARNING: 'data-widget-id' is not defined ")
    return false
  }

   /**
    *  {function} removeTimeline remove the current timeline
    **/
  removeTimeline () {
    if (this.$.timeline.querySelector('iframe')) {
      return this.$.timeline.removeChild(this.$.timeline.querySelector('iframe'))
    }
    return false
  }

  /** ===============
   * Private methods
   **/
  _computeLibLink () {
    this.$.loaderTwtt.set('lib', `https://platform.twitter.com/widgets.js`)
  }
  _computeUniqueId () {
    this.$.loaderTwtt.set('libUniqueId', this.uniqueId)
  }

  _checkForWidgetId () {
    return this.dataWidgetId || false
  }

  _onTwttLoad () {
    this.Twtt = window.twttr
    this._resolveTwttLoaded()
    this.loadTimeline()
  }

  _dataWidgetIdChanged () {
    if (this.dataWidgetId) {
      this._twttLoaded.then(() => {
        this.loadTimeline(this.dataWidgetId)
      })
    }
  }

}

// Register the element using Polymer's constructor.
Polymer(twitterTimeline)
