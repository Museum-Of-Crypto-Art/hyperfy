'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');

const tempAddress = "0xe703f231ab056ecb99c92a1232cc1020acfc72f8";

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const all = {
  promise: null,
  rooms: null,
  roomsOptions: [{ label: 'None', value: null }]
  
}

function loadAll(http, url) {
  if (!all.promise) {
    all.promise = new Promise(async resolve => {
      // fetch all parcel info
        const data = await http({
            method: 'GET',
            url: url,
            proxy: true,
        })
        all.rooms = data
        console.log('rooms', all.rooms)
      
      
        all.roomsOptions.length = 0
        data.forEach(id=>{
            all.roomsOptions.push({
                label: id.room.title,
                value: id.room.model_curated
            })                       
        })
        console.log('rooms options', all.roomsOptions)
        resolve()
    })
  }
  return all.promise
}

function app() {

    const world = hyperfy.useWorld();
    const fields = hyperfy.useFields();
    const roomURL = fields.room;
    const cc0 = fields.ccz;
    const [state, dispatch] = hyperfy.useSyncState(state => state)
    const [ready, setReady] = React.useState(!!all.rooms)
    React.useEffect(() => {
        /*async function getRooms() {
            let url = (cc0) ? "https://api.museumofcryptoart.com/oracle/rooms": "https://api.museumofcryptoart.com/oracle/"+tempAddress+"/rooms";
            try {
                const resp = await world.http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(rooms)
                const temp = [{
                    label:" ",
                    value:null}]
                resp.forEach(id=>{
                    temp.push({
                        label: id.room.title,
                        value: id.room.model_curated
                    })                       
                })
                rooms = temp
                console.log("ROOMs:")
                console.log(rooms)
                dispatch('update')
            } catch (e) {
                console.error(e)
            }
    }
    getRooms()*/
    if (!world.isClient) return
    //if (ready) return
    let url = (cc0) ? "https://api.museumofcryptoart.com/oracle/rooms": "https://api.museumofcryptoart.com/oracle/"+tempAddress+"/rooms";
    async function load() {
        
        await loadAll(world.http, url)
        setReady(true)
      }
    load()
    
    },[cc0])
    
    return React__default["default"].createElement("app", null,/*#__PURE__*/React__default["default"].createElement("rigidbody", {
        type: "kinematic"
    },roomURL !== null && React__default["default"].createElement("model",{
        src: roomURL || "block-model.glb",
        collision: fields.collision ? 'trimesh' : undefined
    })))

}
const initialState = {
    
};
function getStore() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    //let options = Object.values(rooms)
    
    return {
        state,
        actions: {
            /*update(state) {
                options = Object.values(rooms)
                console.log("rooms in getStore:")
                console.log(options)
              }*/
        },
        fields:  [{
            key: 'label',
            label: 'Label:',
            type: 'text',
            descriptor: true
        },{
            key: 'ccz',
            label: 'ROOMs',
            type: 'switch',
            options: [{
                label: 'CC0',
                value: true
            }, {
                label: 'My ROOMs',
                value: false
            }],
            initial: true
        },{
            key: 'room',
            label: 'ROOM',
            type: 'dropdown',
            options: all.roomsOptions
        },{
            key: 'collision',
            label: 'Collision',
            type: 'switch',
            options: [{
                label: 'On',
                value: true
            }, {
                label: 'Off',
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
