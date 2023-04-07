import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howto0 from '../public/assets/howto/howto0.png';


const HowTo = (props) => {

  return (
           <div>
              <h3 className="text-3xl mb-4 leading-snug">
              How To Play
              </h3>
              We used <a href="https://openai.com/product/dall-e-2">DALL-E</a> to generate a new movie poster given an existing movie's summary. You will be given 6 choices. See if you can guess today's poster correctly! 
          </div>
  )
}

export default HowTo
