'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);


function app() {
    const world = hyperfy.useWorld();
    const fields = hyperfy.useFields();
    const [room, setRoom] = React.useState(null);
    const [myRooms, setMyRooms] = React.useState(null);
    const [cczRooms, setCczRooms] = React.useState(null);
    const roomId = fields.roomId || 0;
    const ccz = fields.ccz;
    const [status, setStatus] = React.useState(null);
    const [address, setAddress] = React.useState(null);




    React.useEffect(() => {

            if (roomId === 0) return;
            //setCc0Rooms(null)
            /*
            async function getRooms() {
                setMyRooms(null);

                const {
                    address
                } = world.getAvatar();

                if (!address) {
                    return setStatus(`Connect your wallet`);
                    console.log(status);
                } else {
                    setStatus("connected");
                    console.log(status)
                    try {
                        const resp = await world.http({
                            method: 'GET',
                            url: `https://api.museumofcryptoart.com/oracle/${address}/rooms`,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        setMyRooms(resp)
                        console.log("My ROOMs", myRooms);
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            */
            async function load() {
                try {
                    const resp = await world.http({
                        method: 'GET',
                        url: `https://api.museumofcryptoart.com/oracle/rooms/`,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    console.log(resp)
                    setCczRooms(resp);
                    console.log('CC0 ROOMs:', cczRooms);

                } catch (e) {

                    console.error(e)
                }
            }

            //getRooms()
            load()

        },
        [roomId])


    return /*#__PURE__*/React__default["default"].createElement("app", null, cczRooms === null &&  /*#__PURE__*/React__default["default"].createElement("image", {
        src: 'https://reneil.mypinata.cloud/ipfs/QmcZuYy7DNQMime4ch1LfJ4wjJr3mVQyghkDASMrXGw4oJ',
        position: [0,0,0]
    }),cczRooms !== null && ccz === true && /*#__PURE__*/React__default["default"].createElement("rigidbody", {
        type: "kinematic"
    },/*#__PURE__*/React__default["default"].createElement("model", {
        src: cczRooms[0].room.model_curated,
        position: [0,0,0],
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

