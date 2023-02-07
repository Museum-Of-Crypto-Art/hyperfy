'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_ROOM = 'https://reneil.mypinata.cloud/ipfs/QmcZuYy7DNQMime4ch1LfJ4wjJr3mVQyghkDASMrXGw4oJ';
function app() {
  var _fields$$onClick, _fields$file;

  const world = hyperfy.useWorld();
  const fields = hyperfy.useFields();
  const [rooms, setRooms] = React.useState(null);

  React.useEffect(() => {
    async function load() {
      try {
        const resp = await world.http({
          method: 'POST',
          url: 'https://api.thegraph.com/subgraphs/name/qcodesolutions/rooms',
          data: {
            query: `
          query {
            raffles(first: 10, orderBy: raffleId, orderDirection: desc) {
    room {
      raffle {
        timeEnd
        winner {
          owner
        }
        timeStart
      }
      model
      image
      architect
      description
      slots
      title
      series
    }
  }
          }
        `,
          },
        })
        console.log('raffles', resp.data.raffles);
        const rooms =[];
        let pos = -120;
        resp.data.raffles.forEach(id =>{
          if(!id.room.raffle.winner){
            rooms.push(["https://moca.mypinata.cloud/ipfs/"+id.room.model,[pos,0,0], id.room]);
            pos = pos +100;
          }

        })
        setRooms(rooms);
        console.log(rooms)
      } catch (e) {
        console.error(e)
      }
    }
    load()

  }, [])


  return /*#__PURE__*/React__default["default"].createElement("app", null, rooms === null &&  /*#__PURE__*/React__default["default"].createElement("image", {
    src: DEFAULT_ROOM,
    position: [0,0,0]
  }), /*#__PURE__*/React__default["default"].createElement("rigidbody", {
    type: "kinematic"
  },rooms !== null &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[0][0],
    position: rooms[0][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 2 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[1][0],
    position: rooms[1][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 2 && /*#__PURE__*/React__default["default"].createElement("box", {
    color: "white",
    position: [rooms[1][1][0],1,40],
    size: [3.5,1.8,0.0001],
    opacity: 0.99
  }),rooms !== null && rooms.length >= 2 && /*#__PURE__*/React__default["default"].createElement("image", {
    src: "https://moca.mypinata.cloud/ipfs/"+rooms[1][2].image,
    height: 1.5,
    position: [rooms[1][1][0]-0.8,1,40.001]
    //onClick: onClick
  }),rooms !== null && rooms.length >= 3 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[2][0],
    position: rooms[2][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 4 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[3][0],
    position: rooms[3][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 5 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[4][0],
    position: rooms[4][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 5 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[5][0],
    position: rooms[5][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),rooms !== null && rooms.length >= 5 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[6][0],
    position: rooms[6][1],
    collision: fields.collision ? 'trimesh' : undefined
  })));

}
const initialState = {// ...
};
function getStore() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  return {
    state,
    actions: {},
     // legacy non-uniform scale
    fields:  [ {
      key: 'collision',
      label: 'Collision',
      type: 'switch',
      options: [{
        label: 'Yes',
        value: true
      }, {
        label: 'No',
        value: false
      }],
      initial: false
    },{
      key: '__lockedScale',
      type: 'vec3',
      hidden: true
    }]
  };
}

exports["default"] = app;
exports.getStore = getStore;

