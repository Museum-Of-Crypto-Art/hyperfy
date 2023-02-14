//'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_IMAGE = 'MOCA_NFT.png';
function app() {
  var _fields$$onClick, _fields$file;

  const world = hyperfy.useWorld();
  const fields = hyperfy.useFields();
  const mediaType = fields.mediaType;
  const artist = fields.artist;
  const title = fields.title;
  const desc = fields.description;
  const url = fields.url;
  const orientation = fields.orientation;
  const thumbnail = hyperfy.useFile(fields.thumbnail);
  const videoFile = hyperfy.useFile(fields.video);
  const imageFile = hyperfy.useFile(fields.image);
  const [showDetails, setShowDetails]= React.useState(false);
  let width = null
  let height = null
  if(orientation){
    width = 1.5
  } else{
    height = 1.5
  }

  function toggle(){
    if (showDetails){
      setShowDetails(false);
    } else {
      setShowDetails(true);
    }
  }


  React.useEffect(() => {

  }, []);

  return /*#__PURE__*/React__default["default"].createElement("app", null, /*#__PURE__*/React__default["default"].createElement("image", {
    src: thumbnail || DEFAULT_IMAGE,
    width: fields.width,
    height: fields.height,
    scale: fields.__lockedScale,
    onClick: () => {
      toggle();
    }
  }), showDetails === true &&  /*#__PURE__*/React__default["default"].createElement("group", {
    position: [0,0,0.1]
  },/*#__PURE__*/React__default["default"].createElement("box", {
    color: "black",
    size: [3.5,1.8,-0.01],
    opacity: 0.99,onClick: () => {
      toggle();
    }
  }),mediaType === 'video' && /*#__PURE__*/React__default["default"].createElement("video", {
    src: videoFile || DEFAULT_IMAGE,
    autoplay: true,
    loop: true,
    width: width,
    height: height,
    position: [-0.8,0,0.02],
    scale: fields.__lockedScale,
    onClick: () => {
      toggle();
    }
  }), mediaType !== 'video' && /*#__PURE__*/React__default["default"].createElement("image", {
    src: imageFile || DEFAULT_IMAGE,
    height: height,
    width: width,
    position: [-0.8,0,0.02],
    treatAsGif: mediaType === 'gif',
    scale: fields.__lockedScale,
    onClick: () => {
      toggle();
    }
  }),/*#__PURE__*/React__default["default"].createElement("text", {
    value: title+"\nby "+artist+"\n\n"+desc,
    position: [0.1,0,0],
    align: "left",
    anchorX: "left",
    anchorY: "middle",
    color: "white",
    fontSize: 0.07,
    maxHeight: 1.5,
    maxWidth: 1.5,
    opacity: 0.5,
    onClick: () => {
      toggle();
    }
  }),/*#__PURE__*/React__default["default"].createElement("text", {
    value: "Open external URL",
    position: [1.5,-0.8,0],
    align: "right",
    anchorX: "right",
    anchorY: "middle",
    color: "white",
    fontSize: 0.07,
    maxHeight: 1.5,
    maxWidth: 1.5,
    opacity: 0.5,
    onClick: () => {
      world.open(url, true);
    }
  })));

}
const initialState = {// ...
};
function getStore() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  return {
    state,
    actions: {},
    fields: [{
      key: 'thumbnail',
      label: 'Thumbnail',
      type: 'file',
      accept: '.png,.jpg,.jpeg,.avif'
    },{
      key: 'mediaType',
      label: 'Type',
      type: 'switch',
      options: [{
        label: 'Image',
        value: 'image'
      },{
        label: 'Video',
        value: 'video'
      },{
        label: 'GIF',
        value: 'gif'
      }],
      initial: 'image'
    },{
      key: 'video',
      label: 'Media',
      type: 'file',
      accept: '.mp4',
      conditions: [{
        field: 'mediaType',
        op: 'eq',
        value: 'video'
      }]
    },{
      key: 'image',
      label: 'Media',
      type: 'file',
      accept: '.png,.jpg,.jpeg,.gif',
      conditions: [{
        field: 'mediaType',
        op: 'ne',
        value: 'video'
      }]
    },{
      key: 'orientation',
      label: 'Orientation',
      type: 'switch',
      options: [{
        label: 'Landscape',
        value: true
      },{
        label: 'Portrait',
        value: false
      }],
      initial: true
    }, {
      key: 'artist',
      label: 'Artist',
      type: 'text'
    }, {
      key: 'title',
      label: 'Title',
      type: 'text'
    }, {
      key: 'description',
      label: 'Description',
      type: 'text'
    }, {
      key: 'url',
      label: 'Artwork URL',
      type: 'text'
    },{
      key: 'width',
      label: 'Width',
      type: 'float'
    }, {
      key: 'height',
      label: 'Height',
      type: 'float',
      initial: 1
    },
     // legacy non-uniform scale
      {
        key: '__lockedScale',
        type: 'vec3',
        hidden: true
      }]
  };
}

exports["default"] = app;
exports.getStore = getStore;

