import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import {isMobile} from 'react-device-detect';
import InfoOverlay from '../info-overlay';


const Guess = (props) => {
  const [inProgress, setInProgress] = useState(false)
  const [win, setWin] = useState(false)
  const [winImg, setWinImg] = useState("")
  const [guess, setGuess] = useState({0: "", 1: "", 2: "", 3: "", 4: "", 5: ""})
  const wrong = "bg-red-400";
  const correct = "bg-lime-600";

  async function onChoose(id) {
    if (id == props.winIndex) {
      setWinImg(props.options1[id].imageUrl)
      guess[id] = correct
      const tempMyObj = Object.assign({}, guess);
      setGuess(tempMyObj)
      setWin(true)
    } else {
      guess[id] = wrong
      const tempMyObj = Object.assign({}, guess);
      setGuess(tempMyObj)
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
              let cl = guess[key] + " text-center inline-block align-middle border-dashed border-2 cursor-pointer text-slate-500 hover:text-black hover:border-black flex justify-center rounded-md drop-shadow-md"

                return ( <div onClick={(e) => onChoose(key)} className={cl} key={key} >
                  <div className="text-center gap-4 border-separate p-4" >
                    <strong>{name} </strong>
                    {description}
                  </div> 
                  <br/><img src={image} className="object-scale-down border-4 border-solid border-transparent" width="100px" />
                </div> );
            
            })}
            </div>
      
      <br/>

     {win && <InfoOverlay isWin={true} toggleFunc={toggle} endMsg={props.day} img={props.moviePoster} img2={winImg}/>}

      </section>
    );
}

export default Guess
