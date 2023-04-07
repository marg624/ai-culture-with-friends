import Container from '../components/container'
import OptionsButton from '../components/options-button'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import StartGame from '../components/start-game'
import Game from '../components/game'
import Guess from '../components/guess'
import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import gamePairs from '../public/assets/options.js';
import win from '../public/assets/movies/1.png';

export default function Index() {

  const { promiseInProgress: promiseInProgress1 } = usePromiseTracker();
  const [ready, setReady] = useState(false);
  const [options, setOptions] = useState([]);
  const [winIndex, setWinIndex] = useState(0);
  const [image, setImage] = useState(win);
  const [dayOfYear, setDayOfYear] = useState(0);


  function generateData() {
    setReady(false);
    let validIds = Object.keys(gamePairs).length;
    const date = new Date();
    const dayOfMonth = date.getDate();
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = Number(date) - Number(startOfYear);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setDayOfYear(dayOfYear)

    let ran = Math.ceil(dayOfMonth % validIds);
    let arr = gamePairs[ran.toString()]

    let imagePaths = [];
    let images = require.context('../public/assets/movies/', false, /\.(png)$/);
    images.keys().forEach((imagePath) => {
      imagePaths.push(images(imagePath).default);
    });
    let img = imagePaths[ran - 1]
    setImage(img)

    let w = arr[0].title;
    let shuffledArray = shuffle(arr);
    setOptions(shuffledArray)

    Object.keys(shuffledArray).map((key, index) => {
        let name = shuffledArray[key].title
        if (w === name) {
          setWinIndex(index)
        }
    })

    setReady(true);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.reverse();
  }

  const Loading = () => (
    <div className="flex justify-center items-center ">
      <MutatingDots 
        height="100"
        width="100"
        color="#5A5A5A"
        secondaryColor= '#5A5A5A'
        radius='12.5'
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
      
    </div>
  );


  return (
    <>
      <Layout>
        <Head>
          <title>AI Movie Posters w/ friends</title>
        </Head>
        <Container>
          <Intro />
          { (ready) &&
            <span> 
              <Game moviePoster={image.src} day={dayOfYear}/>
              <Guess winIndex={winIndex} options1={options} day={dayOfYear} moviePoster={image.src}/>
            </span>  
          }
         { (!ready && !promiseInProgress1) && <StartGame onClick={generateData} /> }
         { promiseInProgress1 &&
          <div className="flex justify-center bg-black bg-opacity-50" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            height: '100%'
          }}>
          <Loading /> </div> }
         <OptionsButton />
        </Container>
      </Layout>
    </>
  )
}


