import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';
import redo from '../public/assets/redo.png';
import empty from '../public/assets/redo-empty.png';
import share from '../public/assets/share.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useState} from 'react';
import spotlight from '../public/assets/spotlight.png';
import Game from '../components/movie/game'
import Guess from '../components/movie/guess'

type Props = {
  moviePoster: string,
  day: number,
  winIndex: number,
  options: Array<String>
}

const Movie = ({
  moviePoster, day, winIndex, options
}: Props) => {

  return (
      <div className="flex flex-col items-center">
          <Game moviePoster={moviePoster} day={day}/>
          <Guess winIndex={winIndex} options1={options} day={day} moviePoster={moviePoster}/>
      </div>
  )
}



export default Movie
