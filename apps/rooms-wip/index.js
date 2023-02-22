'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const React = require('react');
const hyperfy = require('hyperfy');
const { add } = require('lodash');

const tempAddress = "0xe703f231ab056ecb99c92a1232cc1020acfc72f8";

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const all = {
  promise: null,
  cczRooms: null,
  cczRoomsOptions: [{ label: 'None', value: null }],
  myRooms: null,
  myRoomsOptions: [{ label: 'loading...', value: null }]
}

function loadAll(http, walletAddress) {
  if (!all.promise) {
    all.promise = new Promise(async resolve => {
      // fetch all parcel info
      if(walletAddress){
        const data = await http({
            method: 'GET',
            url: "https://api.museumofcryptoart.com/oracle/rooms",
            proxy: true,
        })
        all.cczRooms = data
        console.log('rooms', all.cczRooms)
        all.cczRoomsOptions.length = 0
        all.cczRoomsOptions.push({ label: 'Select a Room', value: null })
        data.forEach(id=>{
            all.cczRoomsOptions.push({
                label: id.room.title,
                value: id.tokenId
            })                       
        })
        console.log('cczRooms options', all.cczRoomsOptions)
        try{
            
            const data2 = await http({
                method: 'GET',
                url: "https://api.museumofcryptoart.com/oracle/"+walletAddress+"/rooms",
                proxy: true,
            })
            all.myRooms = data2
            console.log('rooms', all.myRooms)
            all.myRoomsOptions.length = 0
            all.myRoomsOptions.push({ label: 'Select a Room', value: null })
            data2.forEach(id=>{
                all.myRoomsOptions.push({
                    label: id.room.title,
                    value: id.tokenId
            })                       
            })
            console.log('myRooms options', all.myRoomsOptions)
        
        }catch(e){
            console.error(e)
            console.log("Please login first")
            all.myRoomsOptions.length = 0
            all.myRoomsOptions.push({
                label: "Please login first",
                value: null
        })
        }
    }
        resolve()
    })
  }
  return all.promise
}

function app() {

    const world = hyperfy.useWorld();
    const fields = hyperfy.useFields();
    const cczRoomId = fields.cczRoom;
    const myRoomId = fields.myRoom;
    const [currentRoomURL, setCurrentRoomURL] = React.useState(null);
    const cc0 = fields.ccz;
    const curated = fields.curated;
    const [ready, setReady] = React.useState(!!all.cczRooms)
    const [address, setAddress] = React.useState(null)



    React.useEffect(() => {
        
        try{
            setAddress(world.getAvatar().address)
        if (!address){
            console.log('Not connected!')
            setAddress("None")
        } else{
            console.log(address)
            
        }
        } catch(e){
            console.error(e)
        }
        
    }, [])
    React.useEffect(() => {
        if (!world.isClient) return
        
        async function load() {
            await loadAll(world.http, world.getAvatar().address)
            setReady(true)
        }
        load()
    }, [])
    React.useEffect(() => {
        if (!world.isClient) return
        if (!ready) return
        if (!cczRoomId && !myRoomId) return
        const currentRoomID = (cc0) ? cczRoomId : myRoomId
        console.log(currentRoomID)
        async function getRoom() {
        
        
                try {
                    const data3 = await world.http({
                        method: 'GET',
                        url: "https://api.museumofcryptoart.com/oracle/rooms/"+currentRoomID,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    setCurrentRoomURL(curated ? (data3.room.timestamp ? data3.room.model_curated : data3.room.model): data3.room.model)
                    
                } catch (e) {
                    console.error(e)
                }
        }
        getRoom()
    },[cc0,myRoomId, cczRoomId, curated])

    React.useEffect(()=> {
        console.log(currentRoomURL)
    },[currentRoomURL])
    
    return React__default["default"].createElement("app", null,/*#__PURE__*/React__default["default"].createElement("rigidbody", {
        type: "kinematic"
    },currentRoomURL !== null && React__default["default"].createElement("model",{
        src: currentRoomURL || "block-model.glb",
        collision: fields.collision ? 'trimesh' : undefined
    })))

}
const initialState = {
    
};
function getStore() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    
    
    return {
        state,
        actions: {},
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
            key: 'cczRoom',
            label: 'ROOM',
            type: 'dropdown',
            options: all.cczRoomsOptions,
            conditions: [{
                field: 'ccz',
                op: 'eq',
                value: true
              }]
            
        },{
            key: 'myRoom',
            label: 'ROOM',
            type: 'dropdown',
            options: all.myRoomsOptions,
            conditions: [{
                field: 'ccz',
                op: 'eq',
                value: false
              }]
            
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
            key: 'curated',
            label: 'Curated',
            type: 'switch',
            options: [{
                label: 'Curated',
                value: true
            }, {
                label: 'Empty',
                value: false
            }],
            initial: true
        },{
            key: '__lockedScale',
            type: 'vec3',
            hidden: true
        }]
    };
}

exports["default"] = app;
exports.getStore = getStore;
