'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const React = require('react')
const hyperfy = require('hyperfy')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React)

const all = {
  promise: null,
  cc0Rooms: null,
  cc0RoomsOptions: [{ label: 'None', value: null }],
  myRooms: null,
  myRoomsOptions: [{ label: 'loading...', value: null }],
}

function loadAll(http, walletAddress) {
  if (!all.promise) {
    all.promise = new Promise(async resolve => {
      // fetch all ROOMs

      const data = await http({
        method: 'GET',
        url: 'https://api.museumofcryptoart.com/oracle/rooms',
        proxy: true,
      })
      all.cc0Rooms = data

      all.cc0RoomsOptions.length = 0
      all.cc0RoomsOptions.push({ label: 'Select a Room', value: null })
      data.forEach(id => {
        all.cc0RoomsOptions.push({
          label: id.room.title,
          value: id.tokenId,
        })
      })
      console.log('cczRooms options', all.cc0RoomsOptions)
      if (walletAddress) {
        try {
          console - log(walletAddress)
          const data2 = await http({
            method: 'GET',
            url:
              'https://api.museumofcryptoart.com/oracle/' +
              walletAddress +
              '/rooms',
            proxy: true,
          })
          all.myRooms = data2

          all.myRoomsOptions.length = 0
          all.myRoomsOptions.push({ label: 'Select a Room', value: null })
          data2.forEach(id => {
            all.myRoomsOptions.push({
              label: id.room.title,
              value: id.tokenId,
            })
          })
          console.log('myRooms options', all.myRoomsOptions)
        } catch (e) {
          console.error(e)
          console.log('You do not own a ROOM :(')
          all.myRoomsOptions.length = 0
          all.myRoomsOptions.push({
            label: 'You do not own a ROOM :(',
            value: null,
          })
        }
      } else {
        console.log(walletAddress)
        console.log('Could not detect your Wallet')
        all.myRoomsOptions.length = 0
        all.myRoomsOptions.push({
          label: 'Could not detect your Wallet',
          value: null,
        })
      }

      resolve()
    })
  }
  return all.promise
}

function app() {
  const world = hyperfy.useWorld()
  const fields = hyperfy.useFields()

  const selectedCC0RoomID = fields.cc0Room
  const selectedMyRoomID = fields.myRoom
  const selectFromCC0Rooms = fields.ccz
  const loadRoomCurated = fields.curated

  const [currentRoomID, setCurrentRoomID] = React.useState()
  const [ready, setReady] = React.useState(!!all.cc0Rooms)

  const [state, dispatch] = hyperfy.useSyncState(s => s)

  hyperfy.useSignal('Load ROOM', () => {
    if (!world.isClient) return
    if (!ready) return
    if (
      (selectedCC0RoomID === null && selectFromCC0Rooms) ||
      (!selectFromCC0Rooms && selectedMyRoomID === null)
    )
      return
    async function getRoom() {
      try {
        const data3 = await world.http({
          method: 'GET',
          url:
            'https://api.museumofcryptoart.com/oracle/rooms/' + currentRoomID,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        dispatch(
          'load',
          loadRoomCurated
            ? data3.room.timestamp
              ? data3.room.model_curated
              : data3.room.model
            : data3.room.model
        )
      } catch (e) {
        console.error(e)
      }
    }

    getRoom()
  })

  React.useEffect(() => {
    if (!world.isClient) return
    if (ready) return

    async function load() {
      await loadAll(world.http, world.getAvatar().address)
      setReady(true)
    }
    load()
  }, [])

  React.useEffect(() => {
    setCurrentRoomID(selectFromCC0Rooms ? selectedCC0RoomID : selectedMyRoomID)
  }, [selectFromCC0Rooms, selectedCC0RoomID, selectedMyRoomID])

  return React__default['default'].createElement(
    'app',
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      'rigidbody',
      {
        type: 'kinematic',
      },
      state.url !== null &&
        React__default['default'].createElement('model', {
          src: state.url,
          collision: fields.collision ? 'trimesh' : undefined,
        }),
      state.url === null &&
        React__default['default'].createElement('model', {
          src: 'block-model.glb',
          collision: fields.collision ? 'trimesh' : undefined,
        })
    )
  )
}
const initialState = {
  //url: null,
  //address: null,
}
function getStore() {
  let state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState

  return {
    state,
    actions: {
      load(state, url) {
        state.url = url
      },
      address(state, address) {
        if (address !== null) {
          state.address = address
        }
      },
    },
    fields: [
      {
        key: 'label',
        label: 'Label:',
        type: 'text',
        descriptor: true,
      },
      {
        key: 'ccz',
        label: 'ROOMs',
        type: 'switch',
        options: [
          {
            label: 'CC0',
            value: true,
          },
          {
            label: 'My ROOMs',
            value: false,
          },
        ],
        initial: true,
      },
      {
        key: 'cc0Room',
        label: 'ROOM',
        type: 'dropdown',
        options: all.cc0RoomsOptions,
        conditions: [
          {
            field: 'ccz',
            op: 'eq',
            value: true,
          },
        ],
      },
      {
        key: 'myRoom',
        label: 'ROOM',
        type: 'dropdown',
        options: all.myRoomsOptions,
        conditions: [
          {
            field: 'ccz',
            op: 'eq',
            value: false,
          },
        ],
      },
      {
        key: 'collision',
        label: 'Collision',
        type: 'switch',
        options: [
          {
            label: 'On',
            value: true,
          },
          {
            label: 'Off',
            value: false,
          },
        ],
        initial: false,
      },
      {
        key: 'curated',
        label: 'Curated',
        type: 'switch',
        options: [
          {
            label: 'Curated',
            value: true,
          },
          {
            label: 'Empty',
            value: false,
          },
        ],
        initial: true,
      },
      {
        key: '__lockedScale',
        type: 'vec3',
        hidden: true,
      },
    ],
  }
}

exports['default'] = app
exports.getStore = getStore
