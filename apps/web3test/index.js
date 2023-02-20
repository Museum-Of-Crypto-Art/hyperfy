'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');


function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
let options= []


function app() {

    const world = hyperfy.useWorld();
    const fields = hyperfy.useFields();
    const [myRooms, setMyRooms] = React.useState(null);
    const tempAddress = "0xe703f231ab056ecb99c92a1232cc1020acfc72f8";
    const [lines, setLines] = React.useState([]);
    const [roomURL, setRoomURL] = React.useState(null);

    React.useEffect(() => {
        async function getRooms() {
            if (roomURL!== null){
                return;
            }
                try {
                    const resp = await world.http({
                        method: 'GET',
                        //url: "https://api.museumofcryptoart.com/oracle/"+world.getAvatar().address+"/rooms",
                        url: "https://api.museumofcryptoart.com/oracle/"+tempAddress+"/rooms",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    setMyRooms(resp)
                    const temp2 = []
                    let pos = 0
                    resp.forEach(id=>{
                        
                        temp2.push(React__default["default"].createElement("text", {
                            value: id.room.title,
                            bgColor: "white",
                            position: [0,pos,0],
                            onClick: () => {
                                try{
                                    const room = world.http({
                                        method: 'GET',
                                        url: id.room.model_curated
                                    })
                                    
                                    setRoomURL(id.room.model_curated);
                                } catch (e){
                                    console.error(e)
                                    setRoomURL(id.room.model);
                                }
                                
                            }
                        }))
                        pos = pos-0.1
                    })
                    setLines(temp2)
                } catch (e) {
                    console.error(e)
                }
        }
        getRooms()
    },[])

    return React__default["default"].createElement("app", null, roomURL === null &&  React__default["default"].createElement("billboard", {axis: "y"}, React__default["default"].createElement("group", null, lines)),/*#__PURE__*/React__default["default"].createElement("rigidbody", {
        type: "kinematic"
    },roomURL !== null && React__default["default"].createElement("model",{
        src: roomURL || "block-model.glb",
        collision: fields.collision ? 'trimesh' : undefined
    })))

}
const initialState = {// ...
};
function getStore() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    return {
        state,
        actions: {
            load(state, time) {
                if (state.action === 'play') return;
                state.time = time;
                state.action = 'play';
            }
        },
        // legacy non-uniform scale
        fields:  [{
            key: 'roomId',
            label: 'ROOM id',
            type: 'text',
            instant: false
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
            options: options,
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
