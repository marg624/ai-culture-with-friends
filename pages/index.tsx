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

  const validIds = Object.keys(gamePairs).length;
  const ran = Math.ceil(Math.random() * validIds);
  const arr = gamePairs[ran.toString()]

  const imagePaths = [];
  const images = require.context('../public/assets/movies/', false, /\.(png)$/);
  images.keys().forEach((imagePath) => {
    imagePaths.push(images(imagePath).default);
  });

  const img = imagePaths[ran - 1]


  function generateData() {
    setReady(true);
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
              <Game moviePoster={img.src} />
              <Guess winIndex={0} options1={arr}/>
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


