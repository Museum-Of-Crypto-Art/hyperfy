'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_IMAGE = 'thumbnail.png';
function App() {
  const world = hyperfy.useWorld();
  const fields = hyperfy.useFields();
  const image = hyperfy.useFile(fields.image);
  const [visible, setVisible] = React.useState(false);
  React.useLayoutEffect(() => {
    setVisible(fields.mode === 'always');
  }, [fields.mode]);
  let onPointerDown;

  if (fields.mode === 'click') {
    onPointerDown = () => {
      world.unlockPointer();
      setVisible(true);
    };
  }
  var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
  return(
    <app>
    <div id="player"></div>
    </app>
  )  
}
const initialState = {// ...
};
function getStore() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  return {
    state,
    actions: {},
    fields: [{
      key: 'url',
      label: 'URL',
      type: 'text',
      instant: false
    }, {
      key: 'width',
      label: 'Width',
      type: 'float',
      initial: 4
    }, {
      key: 'height',
      label: 'Height',
      type: 'float',
      initial: 2.25
    }, {
      key: 'factor',
      label: 'Factor',
      type: 'float',
      initial: 250
    }, {
      key: 'mode',
      label: 'Visibility',
      type: 'dropdown',
      options: [{
        label: 'Always',
        value: 'always'
      }, {
        label: 'On Click',
        value: 'click'
      }, {
        label: 'On Proximity',
        value: 'proximity'
      }],
      initial: 'always'
    }, {
      key: 'hint',
      label: 'Hint',
      type: 'text',
      conditions: [{
        field: 'mode',
        op: 'eq',
        value: 'click'
      }]
    }, {
      key: 'distance',
      label: 'Distance',
      type: 'float',
      initial: 10,
      conditions: [{
        field: 'mode',
        op: 'eq',
        value: 'proximity'
      }]
    }, {
      key: 'image',
      label: 'Image',
      type: 'file',
      accept: '.png,.jpg,.jpeg',
      conditions: [{
        field: 'mode',
        op: 'ne',
        value: 'always'
      }]
    }]
  };
}

exports["default"] = App;
exports.getStore = getStore;
exports.sdkVersion = [2,14,0]
