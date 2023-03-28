'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var e = require('react'),
  t = require('hyperfy')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var l = o(e)
const n = 'block.glb'
const r = {}
;(exports.default = function () {
  const o = t.useWorld(),
    r = t.useEditing(),
    a = t.useFields()
  return (
    e.useEffect(() => {
      if (o.isServer && a.url && a.on)
        return o.on('join', t => {
          
            e(`**${t.name}** joined: ${t.address}`)
            
        }) && o.on('leave', t => {
          
          e(`**${t.name}** leaved: ${t.address}`)
          
      })
      async function e(e) {
        try {
          await o.http({ method: 'POST', url: a.url, data: { content: e } })
        } catch (e) {
          console.error(e), console.log('[discord] invalid webhook url')
        }
      }
    }, [a.url, a.on]),
    l.default.createElement(
      'app',
      null,
      r && l.default.createElement('model', { src: n })
    )
  )
}),
  (exports.getStore = function () {
    return {
      state: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
      actions: {},
      fields: [
        {
          key: 'url',
          label: 'Webhook',
          type: 'text',
          instant: !1,
          placeholder: 'https://discord.com/api/...',
        },
        {
          key: 'on',
          label: 'On',
          type: 'switch',
          options: [
            { label: 'On', value: !0 },
            { label: 'Off', value: !1 },
          ],
          initial: !0,
        }
      ],
    }
  }),
  (exports.sdkVersion = [2, 21, 1])
