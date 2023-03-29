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
              [CHANGE ME]
              <br/><br/>
              Example:
              <br/>
                <img src={howto0.src}  /> 
              <br/>
              [CHANGE ME]:
                  <ul className="list-inside list-disc">
                    <li>step 1</li>
                    <li>step 2</li>
                  </ul> 

          </div>
  )
}

export default HowTo
