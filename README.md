# `<twitter-timeline>` Polymer Element

[![Build status](https://travis-ci.org/LasaleFamine/polymer-twitter-timeline.svg?branch=master)](https://travis-ci.org/LasaleFamine/polymer-twitter-timeline)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)


> Wrapper of [Twitter Widget.js](https://dev.twitter.com/web/javascript) as a customizable [Polymer 3.0](https://www.polymer-project.org/) WebComponent.

## Why

Forget to import any library, just import the component and **polifylls** if needed ([webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)) and you are ready to go.

## Install

    $ yarn add polymer-twitter-timeline

## Usage

You may want to load it using Webpack.

### awesome-component.js
``` js
import 'polymer-twitter-timeline';

// Your awesome component logic...

...

static get template() {
  return `
  <twitter-timeline data-widget-id="yourAwesomeWidgetId" id="firstTimeline"></twitter-timeline>
  `
}

...
```

The [`demo`](https://github.com/LasaleFamine/polymer-twitter-timeline/blob/master/demo/) uses a bundled element. You can check the [`webpack.config.js`](https://github.com/LasaleFamine/polymer-twitter-timeline/blob/master/test/webpack.config,js) for more details.

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
  },
  /**
   * Value for `data-chrome` (https://dev.twitter.com/web/embedded-timelines#customize-widget-components)
   *
   * @type 'noheader,nofooter,noborders,noscrollbar,transparent'
  */
  chrome: {
    type: String,
    value: ''
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

___

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

    $ yarn

Compile and start a web server (http://localhost:8080/demo)

    $ yarn start

Build: only the **Webpack** action simply run

    $ yarn build


## Test

[XO](https://github.com/sindresorhus/xo) for coding style and [WCT](https://github.com/polymer/web-component-tester) for unit test:

    $ yarn test

## License

[MIT](https://github.com/LasaleFamine/twitter-timeline/blob/master/LICENSE.md) &copy; LasaleFamine
