'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_ROOM = 'https://reneil.mypinata.cloud/ipfs/QmcZuYy7DNQMime4ch1LfJ4wjJr3mVQyghkDASMrXGw4oJ';
function app() {

  const world = hyperfy.useWorld();
  const fields = hyperfy.useFields();
  const [rooms, setRooms] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    async function load() {
      try {
        const resp = await world.http({
          method: 'POST',
          url: 'https://api.thegraph.com/subgraphs/name/qcodesolutions/rooms',
          data: {
            query: `
          query {
            raffles(first: 6, orderBy: raffleId, orderDirection: desc) {
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
        //console.log('raffles', resp.data.raffles);
        console.log(resp)
        const rooms =[];
        let pos = 0;
        resp.data.raffles.forEach(id =>{
          if(!id.room.raffle.winner){

            rooms.push(["https://moca.mypinata.cloud/ipfs/"+id.room.model,[pos,0,0], id.room]);
            if (pos >= 0){
              pos = (-1*pos) -100;
            } else {
              pos = (-1*pos);
            }



          }

        })
        setRooms(rooms);
        setStatus("ready")
        console.log(rooms)
      } catch (e) {
        console.error(e)
      }
    }
    load()

  }, [])




  return /*#__PURE__*/React__default["default"].createElement("app", null, status === "loading" &&  /*#__PURE__*/React__default["default"].createElement("image", {
    src: DEFAULT_ROOM,
    position: [0,0,0]
  }), /*#__PURE__*/React__default["default"].createElement("rigidbody", {
    type: "kinematic"
  },status ==="ready" && rooms.length >= 1 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[0][0],
    position: rooms[0][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),status ==="ready" && rooms.length >= 2 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[1][0],
    position: rooms[1][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),status ==="ready" && rooms.length >= 3 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[2][0],
    position: rooms[2][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),status ==="ready" && rooms.length >= 4 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[3][0],
    position: rooms[3][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),status ==="ready" && rooms.length >= 5 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[4][0],
    position: rooms[4][1],
    collision: fields.collision ? 'trimesh' : undefined
  }),status ==="ready" && rooms.length >= 6 &&  /*#__PURE__*/React__default["default"].createElement("model", {
    src: rooms[5][0],
    position: rooms[5][1],
    collision: fields.collision ? 'trimesh' : undefined
  })
  ));

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

