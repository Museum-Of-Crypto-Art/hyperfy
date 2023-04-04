import React, { useEffect } from 'react'
import { useWorld, useFields, useSyncState } from 'hyperfy'

export default function App() {
  const world = useWorld()
  const fields = useFields()
  const [state, dispatch] = useSyncState(s => s)

  const roomId = fields.roomId
  const curated = fields.curated
  const scale = fields.scale
  const collision = fields.collision

  const src = curated ? state.curatedSrc : state.emptySrc
  const msg = state.msg

  useEffect(() => {
    if (!world.isServer) return
    if (!roomId) return
    async function load() {
      dispatch('setMsg', 'Loading...')
      try {
        const data = await world.http({
          method: 'GET',
          url: `https://api.museumofcryptoart.com/oracle/rooms/${roomId}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (data) {
          const emptySrc = data.room.model
          const curatedSrc = data.room.updatedBy
            ? data.room.model_curated
            : emptySrc
          dispatch('setSrc', emptySrc, curatedSrc)
          dispatch('setMsg', null)
        } else {
          dispatch('setMsg', 'Invalid ROOM ID.')
        }
      } catch (err) {
        console.error(err)
        dispatch('setMsg', 'Could not load ROOM.')
      }
    }
    load()
  }, [roomId])

  return (
    <app>
      <rigidbody type="kinematic">
        {src && (
          <model
            src={src}
            scale={scale}
            collision={collision ? 'trimesh' : undefined}
          />
        )}
        {!src && (
          <model
            src="block-model.glb"
            collision={collision ? 'trimesh' : undefined}
          />
        )}
        {msg && (
          <billboard axis="y" position={[0, 2, 0]}>
            <text color="white" value={msg} fontSize={0.2} />
          </billboard>
        )}
      </rigidbody>
    </app>
  )
}

const initialState = {
  msg: null,
  emptySrc: null,
  curatedSrc: null,
}

export function getStore(state = initialState) {
  return {
    state,
    actions: {
      setMsg(state, msg) {
        state.msg = msg
      },
      setSrc(state, emptySrc, curatedSrc) {
        state.emptySrc = emptySrc
        state.curatedSrc = curatedSrc
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
        instant: false,
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
    ],
  }
}