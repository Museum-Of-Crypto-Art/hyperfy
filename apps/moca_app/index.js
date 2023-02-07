//'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_IMAGE = 'https://reneil.mypinata.cloud/ipfs/QmcZuYy7DNQMime4ch1LfJ4wjJr3mVQyghkDASMrXGw4oJ';
function moca_app() {
  var _fields$$onClick, _fields$file;

  const world = hyperfy.useWorld();
  const fields = hyperfy.useFields();
  const [imageUrl, setImageUrl] = React.useState(null);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [mediaType, setMediaType] = React.useState(null);
  //const onClick = (_fields$$onClick = fields.$onClick) !== null && _fields$$onClick !== void 0 && _fields$$onClick.length ? () => world.trigger('Click') : undefined;
  const source = fields.source || null;
  const [error, setError] = React.useState(null);
  const [comment, setComment] = React.useState(null);
  const [artist, setArtist] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const search = fields.search || null;
  const [collection, setCollection] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    setCollection(null);
    const load = async () => {

      try {
        const res = await world.http({
          method: 'GET',
          url: 'https://api.museumofcryptoart.com/collection/the-permanent-collection',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        setCollection(res.assets)

      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, []);


  React.useEffect(()=> {
    const results = [];
    collection.forEach(id => {
      if(id.title.includes(search) || id.artist.includes(search)) {
        results.push(id)
      }
    })
    const searchResults = [];
    results.forEach(id =>{
      searchResults.push({label: id.title, value: searchResults.length} )
    })
    setSearchResults(searchResults);
    try {
      setImageUrl(results[0].media)
      setTitle(results[0].title)
      setArtist(results[0].artist)
      setDescription(results[0].data.description)
      setMediaType(results[0].media_info.ext)
      console.log(results[0].media_info.width, results[0].media_info.height)
      if(results[0].media_info.height>= results[0].media_info.width){
        setImageHeight(1.5)
        console.log(imageHeight)
      }else{
        setImageHeight(1.5*(results[0].media_info.height/results[0].media_info.width))
        console.log(imageHeight)
      }
    } catch (e) {
      console.error("no artwork selected")
    }

  }, [search]);


  const image = /*#__PURE__*/React__default["default"].createElement("app", null, mediaType === 'mp4' && /*#__PURE__*/React__default["default"].createElement("video", {
    src: imageUrl || DEFAULT_IMAGE,
    autoplay: true,
    loop: true,
    height: imageHeight,
    position: [-0.8,0,0.02],
    frameWidth: fields.frameWidth,
    frameDepth: fields.frameDepth,
    frameColor: fields.frameColor,
    scale: fields.__lockedScale
  }), mediaType !== 'mp4' && /*#__PURE__*/React__default["default"].createElement("image", {
    src: imageUrl || DEFAULT_IMAGE,
    height: imageHeight,
    position: [-0.8,0,0.02],
    treatAsGif: mediaType === 'gif',
    frameWidth: fields.frameWidth,
    frameDepth: fields.frameDepth,
    frameColor: fields.frameColor,
    scale: fields.__lockedScale
    //onClick: onClick
  }),/*#__PURE__*/React__default["default"].createElement("text", {
    value: title+"\nby "+artist+"\n\n"+description,
    position: [0.1,0,0],
    align: "left",
    anchorX: "left",
    anchorY: "middle",
    color: "white",
    fontSize: 0.07,
    maxHeight: 1.5,
    maxWidth: 1.5,
    opacity: 0.5
  }),/*#__PURE__*/React__default["default"].createElement("box", {
    color: "black",
    position: [0,0,-0.01],
    size: [3.5,1.8,0.01],
    opacity: 0.99
  }));

  return image;
}
const initialState = {// ...
};
function getStore() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  return {
    state,
    actions: {},
    fields: [{
      key: 'source',
      label: 'Source',
      type: 'dropdown',
      options: [{
        label: 'Show',
        value: 'moca_show'
      }, {
        label: 'Multipass',
        value: 'moca_multipass'
      }, {
        label: 'Permanent Collection',
        value: 'moca_collection'
      }],
      initial: 'moca_collection'
    }, {
      key: 'search',
      label: 'Search',
      type: 'text',
      placeholder: 'search by title or artist...'
    }, {
      label: 'Display',
      type: 'section'
    }, {
      key: 'show_likes',
      label: 'Likes:',
      type: 'switch',
      options: [{
        label: 'Show',
        value: true
      }, {
        label: 'Hide',
        value: false
      }],
      initial: false
    }, {
      key: 'show_comments',
      label: 'Comments:',
      type: 'switch',
      options: [{
        label: 'Show',
        value: true
      }, {
        label: 'Hide',
        value: false
      }],
      initial: false
    }, {
      label: 'Frame',
      type: 'section'
    }, {
      key: 'frameWidth',
      label: 'Width',
      type: 'float',
      initial: 0.05
    }, {
      key: 'frameDepth',
      label: 'Depth',
      type: 'float',
      initial: 0.001
    }, {
      key: 'frameColor',
      label: 'Color',
      type: 'text',
      initial: "white"
    }, // legacy non-uniform scale
      {
        key: '__lockedScale',
        type: 'vec3',
        hidden: true
      }]
  };
}

exports["default"] = moca_app;
exports.getStore = getStore;

