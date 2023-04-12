import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'

const HowTo = (props) => {

  return (
           <div>
              <h3 className="text-3xl mb-4 leading-snug">
              How To Play
              </h3>
              <strong>Movies</strong>
              <br/>We used <a href="https://openai.com/product/dall-e-2">DALL-E</a> to generate a new movie poster given an existing movie's summary. You will be given 6 choices. See if you can guess today's poster correctly! 
              <br/><br/><strong>Plays</strong>
              <br/>We used <a href="https://chat.openai.com/">ChatGPT</a> to generate some fake Shakespearean style quotes. You will be given 4 choices and a Shakespeare play. Find which quote is actually from the given play! 
              <br/><br/><strong>TBD 3</strong>
              <br/>Stay tuned for a new game created with the help of AI!
          </div>
  )
}

export default HowTo
