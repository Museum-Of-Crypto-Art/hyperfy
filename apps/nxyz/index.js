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

  //const [nft, setNft] = hyperfy.useState([])

  hyperfy.useSignal('Load ROOM', () => {
    if (!world.isClient) return
    async function getNFT() {
      try {
        const data = await world.http({
          method: 'GET',
          url: 'https://api.n.xyz/api/v1/nfts/'+fields.contract+'/'+fields.tokenID+'?chainID='+fields.chainID+'&apikey='+fields.api_key,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('NFT loaded', data)
        //setNft(data)
      } catch (e) {
        console.error(e)
      }
    }
    getNFT()
  })

  


  return React__default['default'].createElement(
    'app',
    null,
   React__default['default'].createElement('image',{
    src: "image.png"
   }
    
   )
  )
}
const initialState = {  }
function getStore() {
  let state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState

  return {
    state,
    actions: {
     
    },
    fields: [
      {
        key: 'api_key',
        label: 'n.xyz API key:',
        type: 'text'
      },{
        key: 'tokenID',
        label: 'TokenId:',
        type: 'text'
      },{
        key: 'contract',
        label: 'Contract:',
        type: 'text'
      },{
        key: 'chainID',
        label: 'Blockchain:',
        type: 'dropdown',
        options:[
          {
            label: 'Ethereum',
            value: "ethereum",
          },
          {
            label: 'Polygon',
            value: "polygon",
          }
        ]
      }
    ],
  }
}

exports['default'] = app
exports.getStore = getStore
