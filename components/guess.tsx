import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import {isMobile} from 'react-device-detect';
import InfoOverlay from './info-overlay';


const Guess = (props) => {
  const [inProgress, setInProgress] = useState(false)
  const [win, setWin] = useState(false)

  async function onChoose(id) {
    if (id == props.winIndex) {
      setWin(true)
    }
  }

  function toggle() {
    setWin(false)
  }

  const classExtra = (isMobile? "mb-8 md:mb-16 gap-4 border-separate p-4 grid grid-cols-1 flex justify-center" : "mb-8 md:mb-16 gap-4 border-separate p-4 grid grid-cols-2 flex justify-center" )


  return (
      <section className="flex justify-center">

            <div className={classExtra}>
              {Object.keys(props.options1).map((key, index) => {
              let name = props.options1[key].title
              let image = props.options1[key].imageUrl
              let description = props.options1[key].description
           
                return ( <div onClick={(e) => onChoose(key)} className="text-center inline-block align-middle border-dashed border-2 cursor-pointer text-slate-500 hover:text-black hover:border-black flex justify-center rounded-md drop-shadow-md" key={key} >
                  <div className="text-center gap-4 border-separate p-4" >
                    <strong>{name} </strong>
                    {description}
                  </div> 
                  <br/><img src={image} className="object-scale-down border-4 border-solid border-transparent" width="100px" />
                </div> );
            
            })}
            </div>
      
      <br/>

     {win && <InfoOverlay isWin={true} toggleFunc={toggle}/>}

      </section>
    );
}

export default Guess
