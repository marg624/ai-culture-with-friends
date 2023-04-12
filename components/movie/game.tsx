import Link from 'next/link'
import arrow from '../../public/assets/arrow-icon.png';
import redo from '../../public/assets/redo.png';
import empty from '../../public/assets/redo-empty.png';
import share from '../../public/assets/share.png';
import spotlight from '../../public/assets/spotlight.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useState} from 'react';

type Props = {
  moviePoster: string,
  day: number
}

const Game = ({
  moviePoster, day
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
        <img src={spotlight.src} width="300px" />
        <img src={moviePoster} className="shadow-md border-separate p-3 " width="500px" />
        <h1 className="text-2xl md:text-2xl font-bold mt-4">This AI generated movie poster is based off of which movie description?</h1>
      </div>
  )
}



export default Game
