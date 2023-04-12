import Container from '../components/container'
import OptionsButton from '../components/options-button'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import StartGame from '../components/start-game'
import Movie from '../components/movie'
import Play from '../components/play'
import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import movieGamePairs from '../public/assets/options.js';
import win from '../public/assets/movies/1.png';
import tbd from '../public/assets/placeholder-cover.png';
import shakespeareOptions from '../public/assets/shakespeare.js';
import shakespeareOptionsPlays from '../public/assets/shakespeare-plays.js';

export default function Index() {

  const { promiseInProgress: promiseInProgress1 } = usePromiseTracker();
  const [ready, setReady] = useState(false);
  const [dayOfYear, setDayOfYear] = useState(0);

  // Movie Game
  const [optionsMovie, setOptionsMovie] = useState([]);
  const [winIndexMovie, setWinIndexMovie] = useState(0);
  const [imageMovie, setImageMovie] = useState(win);

  // Shakespeare Game
  const [optionsPlay, setOptionsPlay] = useState([]);
  const [winIndexPlay, setWinIndexPlay] = useState(0);
  const [winPlay, setWinPlay] = useState("");
  
  // Tab states
  const [tabs, setTabs] = useState(["visible", "hidden", "hidden"]);
  
  const notSelect = "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
  const select = "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500"
  const [tabsOnSelect, setTabsOnSelect] = useState([select, notSelect, notSelect]);

  const notSelect2 = "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" 
  const select2 = "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
  const [tabsOnSelect2, setTabsOnSelect2] = useState([select2, notSelect2, notSelect2]);

  function generateData() {
    setReady(false);
    let validIds = Object.keys(movieGamePairs).length;
    const date = new Date();
    const dayOfMonth = date.getDate();
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = Number(date) - Number(startOfYear);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setDayOfYear(dayOfYear)

    // Movie game data - instantiate
    let ran = Math.ceil(dayOfMonth % validIds);
    let arr = movieGamePairs[ran.toString()]

    let imagePaths = {};
    let images = require.context('../public/assets/movies/', false, /\.(png)$/);
    images.keys().forEach((imagePath) => {
      let key = imagePath.replace("public/assets/movies/", "").replace(".png", "")
      imagePaths[key] = images(imagePath).default;
    });
    let img = imagePaths[ran]
    setImageMovie(img)

    let w = arr[0].title;
    let shuffledArray = shuffle(arr);
    setOptionsMovie(shuffledArray)

    Object.keys(shuffledArray).map((key, index) => {
        let name = shuffledArray[key].title
        if (w === name) {
          setWinIndexMovie(index)
        }
    })

    // TBD2 game data - instantiate
    let validIds2 = Object.keys(shakespeareOptionsPlays.quotes).length;
    let ran2 = Math.ceil(dayOfMonth % validIds2);
    let arr2 = shakespeareOptionsPlays.quotes[ran2.toString()]
    let w2 = arr2.q;

    let validIds3 = Object.keys(shakespeareOptions.quotes).length - 4;
    let ran3 = Math.ceil(dayOfMonth % validIds3);
    let arr3 = [shakespeareOptions.quotes[ran3], shakespeareOptions.quotes[ran3+1], shakespeareOptions.quotes[ran3+2], arr2.q]
    let shuffledArray2 = shuffle(arr3);
    setOptionsPlay(shuffledArray2);

    Object.keys(shuffledArray2).map((key, index) => {
        let name = shuffledArray2[key]
        if (w2 === name) {
          setWinIndexPlay(index)
        }
    });
    setWinPlay(arr2.p)


    // TBD3 game data - instantiate

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
          <title>AI Fun w/ friends</title>
        </Head>
        <Container>
          <Intro />
          { (ready) &&
            <span> 

            <h1 className="text-3xl md:text-4xl font-bold mt-4 text-center">Masterpieces of the Day! [{dayOfYear}/365]</h1><br/>

              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="mr-2">
                        <a onClick={() => {setTabs(["visible", "hidden", "hidden"]); setTabsOnSelect([select, notSelect, notSelect]);setTabsOnSelect2([select2, notSelect2, notSelect2]);}} className={tabsOnSelect2[0]} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={tabsOnSelect[0]} > <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/> </svg>  
                            Movie
                        </a>
                    </li>
                    <li className="mr-2">
                        <a  onClick={() => {setTabs(["hidden", "visible", "hidden"]);setTabsOnSelect([notSelect, select, notSelect]);setTabsOnSelect2([notSelect2, select2, notSelect2]);}}  className={tabsOnSelect2[1]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 640 512" fill="currentColor" className={tabsOnSelect[1]}><path d="M206.9 245.1C171 255.6 146.8 286.4 149.3 319.3C160.7 306.5 178.1 295.5 199.3 288.4L206.9 245.1zM95.78 294.9L64.11 115.5C63.74 113.9 64.37 112.9 64.37 112.9c57.75-32.13 123.1-48.99 189-48.99c1.625 0 3.113 .0745 4.738 .0745c13.1-13.5 31.75-22.75 51.62-26c18.87-3 38.12-4.5 57.25-5.25c-9.999-14-24.47-24.27-41.84-27.02c-23.87-3.875-47.9-5.732-71.77-5.732c-76.74 0-152.4 19.45-220.1 57.07C9.021 70.57-3.853 98.5 1.021 126.6L32.77 306c14.25 80.5 136.3 142 204.5 142c3.625 0 6.777-.2979 10.03-.6729c-13.5-17.13-28.1-40.5-39.5-67.63C160.1 366.8 101.7 328 95.78 294.9zM193.4 157.6C192.6 153.4 191.1 149.7 189.3 146.2c-8.249 8.875-20.62 15.75-35.25 18.37c-14.62 2.5-28.75 .376-39.5-5.249c-.5 4-.6249 7.998 .125 12.12c3.75 21.75 24.5 36.24 46.25 32.37C182.6 200.1 197.3 179.3 193.4 157.6zM606.8 121c-88.87-49.38-191.4-67.38-291.9-51.38C287.5 73.1 265.8 95.85 260.8 123.1L229 303.5c-15.37 87.13 95.33 196.3 158.3 207.3c62.1 11.13 204.5-53.68 219.9-140.8l31.75-179.5C643.9 162.3 631 134.4 606.8 121zM333.5 217.8c3.875-21.75 24.62-36.25 46.37-32.37c21.75 3.75 36.25 24.49 32.5 46.12c-.7499 4.125-2.25 7.873-4.125 11.5c-8.249-9-20.62-15.75-35.25-18.37c-14.75-2.625-28.75-.3759-39.5 5.124C332.1 225.9 332.9 221.9 333.5 217.8zM403.1 416.5c-55.62-9.875-93.49-59.23-88.99-112.1c20.62 25.63 56.25 46.24 99.49 53.87c43.25 7.625 83.74 .3781 111.9-16.62C512.2 392.7 459.7 426.3 403.1 416.5zM534.4 265.2c-8.249-8.875-20.75-15.75-35.37-18.37c-14.62-2.5-28.62-.3759-39.5 5.249c-.5-4-.625-7.998 .125-12.12c3.875-21.75 24.62-36.25 46.37-32.37c21.75 3.875 36.25 24.49 32.37 46.24C537.6 257.9 536.1 261.7 534.4 265.2z"/></svg>
                            Plays
                        </a>
                    </li>
                    <li className="mr-2">
                        <a onClick={() => {setTabs(["hidden", "hidden", "visible"]); setTabsOnSelect([notSelect, notSelect, select]); setTabsOnSelect2([notSelect2, notSelect2, select2]);}}  className={tabsOnSelect2[2]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={tabsOnSelect[2]} viewBox="0 0 16 16">
                              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            </svg>                 
                            TBD 3
                        </a>
                    </li>
                </ul>
              </div>
              <div className="flex justify-center text-center">
                <div id="movie" className={tabs[0]}>
                  <Movie winIndex={winIndexMovie} options={optionsMovie} day={dayOfYear} moviePoster={imageMovie.src}/>
                </div>

                <div id="play" className={tabs[1]}>
                  <Play winIndex={winIndexPlay} options={optionsPlay} day={dayOfYear} winPlay={winPlay}/>
                </div>

                <div id="tbd3" className={tabs[2]}>
                 A fun game coming soon...
                  <img src={tbd.src} className="shadow-md border-separate p-3 " width="500px" />
                </div>
              </div>

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


