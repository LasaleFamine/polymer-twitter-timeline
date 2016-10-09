# `<twitter-timeline>` Polymer (ES6)

[![Build status](https://travis-ci.org/LasaleFamine/twitter-timeline.svg?branch=master)](https://travis-ci.org/LasaleFamine/twitter-timeline)
[![Bower version](https://badge.fury.io/bo/polymer-twitter-timeline.svg)](https://badge.fury.io/bo/polymer-twitter-timeline)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Dependency Status](https://gemnasium.com/badges/github.com/LasaleFamine/twitter-timeline.svg)](https://gemnasium.com/github.com/LasaleFamine/twitter-timeline)



> Wrapper of [Twitter Widget.js](https://dev.twitter.com/web/javascript) as a customizable [Polymer 1.0](https://www.polymer-project.org/1.0/) WebComponent in ES6 syntax.

## Why

``` html
<link rel="import" href="[your_bower_folder]/polymer-twitter-timeline/twitter-timeline.html">

<twitter-timeline data-widget-id="[yourId]"></twitter-timeline>

```

Forget to import any library, just import the component and **polifylls** if needed ([webcomponentsjs](https://github.com/webcomponents/webcomponentsjs) just for Polymer) and you are ready to go.

## Install

    $ bower install polymer-twitter-timeline


## Default Properties
``` js

{
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
    type: String
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
        width: "400",
        height: "400"
      }
    }
  }
}

```

## API

#### .loadTimeline(widgetId)
##### widgetId (optional)
Type: `string`  
Will load (or reload) the timeline with the widget id passed or with the `this.dataWidgetId` property if setted.  

Twitter data-id to feed the timeline:
- Create a new widget: https://twitter.com/settings/widgets/new
- Get the data from whatever source you want
- Get the data-widget-id
____
#### .removeTimeline()
Remove current timeline.


___

### Events
#### on-timeline-loaded
After the correct initialization of the library and the timeline

### Twtt instance

The `Twtt` instance is available as `this.Twtt`

## Other references

[`polymer-lib-loader`](https://github.com/LasaleFamine/polymer-lib-loader) - for loading the library


## Develop

Clone the repository ***inside a folder*** (ex: `sandbox-twitter-timeline/twitter-timeline`) and inside the `twitter-timeline` folder:

    $ npm install && bower install

Developing mode: **watch** on base files and **Babel** that transpiles (http://localhost:8080/twitter-timeline/demo)

    $ npm start

Build: only the **Babel** action simply run

    $ npm run build


## Test

[Standard](http://standardjs.com/) for coding style and [WCT](https://github.com/polymer/web-component-tester) for unit test:

    $ npm test

## License

[MIT](https://github.com/LasaleFamine/twitter-timeline/blob/master/LICENSE.md) &copy; LasaleFamine
