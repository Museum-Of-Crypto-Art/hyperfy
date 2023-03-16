import React, { useMemo, useState } from 'react'
import { useEth } from 'hyperfy'

const CONTRACT = '0x87D04ff86CaFee75d572691b31509f72c0088C2B'


export function EthCubes() {
  const eth = useEth() // defaults to ethereum network
  const contract = useMemo(() => eth.contract(CONTRACT), ['function enterRoomRaffle(uint256 raffleId, uint256 floorId) public'])
  const [status, setStatus] = useState(null)

  
  async function mint(e) {
    const { address } = e.avatar
    if (!address) return setStatus('Not connected!')
    setStatus('Please confirm transaction')
    const tx = await contract.write('enterRoomRaffle', 27, 54)
    setStatus('Verifying...')
    await tx.wait()
    setStatus('Minted!')
  }

  

  return (
    <>
      {status && <text color="white" value={status} position={[0, 1.5, 0]} />}
      
      <box
        color="blue"
        size={0.5}
        position={[-0.3, 1, 0]}
        onPointerDown={mint}
      />
      
    </>
  )
}