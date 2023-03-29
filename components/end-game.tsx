import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import arrow from '../public/assets/arrow-icon.png';
import share from '../public/assets/share.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type Props = {
  endMsg: string
}

const EndGame = ({
  endMsg
}: Props) => {

  let shareable = endMsg + "[CHANGE ME]"
  const [copied, setCopied] = useState(false)

  function sayCopied() {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  };

  return (
           <div>

                <h3 className="text-3xl mb-4 leading-snug">
                Congrats!
                </h3>
              
                <span className="flex items-center justify-between px-4 py-2">
                  <CopyToClipboard text={shareable} onCopy={() => sayCopied()}>
                    <img src={share.src} className="object-contain h-10 w-10 cursor-pointer " />  
                   </CopyToClipboard>  
                   <span className="justify-between px-4 py-2">
                   Share this game [CHANGE ME]
                   </span>
                </span> 

                {copied && <span className="bg-black text-white text-right"> Copied! </span>} 
                <br/>
                <a href="https://imdb-with-friends.vercel.app/"><strong> Click here </strong> </a> for a new random game.
              

              <br/>
          

          </div>
  )
}

export default EndGame
