'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

const React = require('react')
const hyperfy = require('hyperfy')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React)

function app() {
  const world = hyperfy.useWorld()
  const fields = hyperfy.useFields()

  const loadRoomCurated = fields.curated
  const roomId = fields.roomId

  const [roomURL, setRoomURL] = React.useState(null)

  const [roomData, dispatch] = hyperfy.useSyncState(state => state.data)

  React.useEffect(() => {
    if (!world.isClient) return
    if (roomId === null) return
    async function getRoom() {
      try {
        const data = await world.http({
          method: 'GET',
          url: 'https://api.museumofcryptoart.com/oracle/rooms/' + roomId,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('ROOM loaded', data)
        dispatch('update', data)
      } catch (e) {
        console.error(e)
      }
    }
    getRoom()
  }, [])

  hyperfy.useSignal('Load ROOM', () => {
    if (!world.isClient) return
    if (roomId === '') return
    async function getRoom() {
      try {
        const data = await world.http({
          method: 'GET',
          url: 'https://api.museumofcryptoart.com/oracle/rooms/' + roomId,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('ROOM loaded', data)
        dispatch('update', data)
      } catch (e) {
        console.error(e)
      }
    }
    getRoom()
  })

  React.useEffect(() => {
    if (!roomData.room) return
    try {
      setRoomURL(
        loadRoomCurated
          ? roomData.room.updatedBy
            ? roomData.room.model_curated
            : roomData.room.model
          : roomData.room.model
      )
    } catch (e) {
      console.error(e)
    }
  }, [roomData, loadRoomCurated])

  return React__default['default'].createElement(
    'app',
    null,
    /*#__PURE__*/ React__default['default'].createElement(
      'rigidbody',
      {
        type: 'kinematic',
      },
      roomURL !== null &&
        React__default['default'].createElement('model', {
          src: roomURL,
          scale: fields.scale,
          collision: fields.collision ? 'trimesh' : undefined,
        }),
      roomURL === null &&
        React__default['default'].createElement('model', {
          src: 'block-model.glb',
          collision: fields.collision ? 'trimesh' : undefined,
        })
    )
  )
}
const initialState = { data: [] }
function getStore() {
  let state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState

  return {
    state,
    actions: {
      update(state, data) {
        state.data = data
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
        key: 'roomId',
        label: 'ROOM ID',
        type: 'text',
        placeholder: 'token id of your ROOM',
      },
      {
        key: 'scale',
        label: 'Scale',
        type: 'float',
        initial: 1,
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
