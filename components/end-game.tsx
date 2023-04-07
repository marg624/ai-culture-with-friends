import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import arrow from '../public/assets/arrow-icon.png';
import share from '../public/assets/share.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';

type Props = {
  endMsg?: string,
  img?: string,
  img2?: string
}

const EndGame = ({
  endMsg, img, img2
}: Props) => {

  let shareable = "I just solved the daily game [" + endMsg + "/365] at: https://ai-pics-with-friends.vercel.app/"
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
                Congrats, you guessed correctly!
                </h3>
                <span className="flex items-center grid grid-cols-2">
                  <span>
                    <h3 className="text-3xl mb-4 leading-snug">AI</h3><img src={img} className="object-contain" width="250px"/> </span>
                  <span>  
                    <h3 className="text-3xl mb-4 leading-snug">Original</h3> <img src={img2} className="object-contain" width="250px" /> </span>    
                  </span>            
                <span className="flex items-center px-4 py-2">
                  <CopyToClipboard text={shareable} onCopy={() => sayCopied()}>
                    <img src={share.src} className="object-contain h-10 w-10 cursor-pointer " />  
                   </CopyToClipboard>  
                   <span className="justify-between px-4 py-2">
                   Share your stats for game [{endMsg}/365].
                   </span>
                </span> 

                {copied && <span className="bg-black text-white text-right"> Copied! </span>} 
                <br/>
              

              <br/>
          

          </div>
  )
}

export default EndGame
