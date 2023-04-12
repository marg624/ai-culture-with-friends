import Link from 'next/link'
import arrow from '../../public/assets/arrow-icon.png';
import redo from '../../public/assets/redo.png';
import empty from '../../public/assets/redo-empty.png';
import share from '../../public/assets/share.png';
import curtain from '../../public/assets/curtain.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useState} from 'react';

type Props = {
  winPlay: string,
  day: number
}

const Game = ({
  winPlay, day
}: Props) => {


  const [copied, setCopied] = useState(false)


  let shareable = 'https://ai-pics-with-friends.vercel.app/'

  function sayCopied() {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  };

  return (
      <div className="flex flex-col items-center">
        <img src={curtain.src}  />
        <h1 className="text-2xl md:text-2xl font-bold mt-4">Which is not an AI generated quote?</h1>
      </div>
  )
}



export default Game
