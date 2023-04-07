import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howto0 from '../public/assets/howto/howto0.png';
import HowTo from './how-to';
import EndGame from './end-game';

type Props = {
  toggleFunc: React.MouseEventHandler<HTMLDivElement>,
  isWin?: boolean,
  endMsg?: string,
  img?: string,
  img2?: string
}

const InfoOverlay = ({
  toggleFunc, isWin, endMsg, img, img2
}: Props) => {

  return (
        <div className="flex justify-center bg-black bg-opacity-50" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>

           <div className="overflow-scroll bg-white shadow-2xl border-separate p-8 rounded-md" style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'left',
              width: '75%',
              height: '75%'
          }}>
            <div style={{position: 'absolute', top: 5, right: 15}} onClick={toggleFunc} > <h1 className="text-3xl mb-4 cursor-pointer text-slate-300">x</h1> </div>
            {!isWin && <HowTo /> }
            {isWin && <EndGame endMsg={endMsg} img={img} img2={img2} />}
          </div>
       </div>
  )
}

export default InfoOverlay
