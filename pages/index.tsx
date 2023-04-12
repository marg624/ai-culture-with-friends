import Container from '../components/container'
import OptionsButton from '../components/options-button'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import StartGame from '../components/start-game'
import Movie from '../components/movie'
import React, {useState} from 'react';
import { Rings, MutatingDots } from 'react-loader-spinner';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import gamePairs from '../public/assets/options.js';
import win from '../public/assets/movies/1.png';
import tbd from '../public/assets/placeholder-cover.png';

export default function Index() {

  const { promiseInProgress: promiseInProgress1 } = usePromiseTracker();
  const [ready, setReady] = useState(false);
  const [options, setOptions] = useState([]);
  const [winIndex, setWinIndex] = useState(0);
  const [image, setImage] = useState(win);
  const [dayOfYear, setDayOfYear] = useState(0);

  const [tabs, setTabs] = useState(["visible", "hidden", "hidden"]);
  
  const notSelect = "w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
  const select = "w-5 h-5 mr-2 text-blue-600 dark:text-blue-500"
  const [tabsOnSelect, setTabsOnSelect] = useState([select, notSelect, notSelect]);

  const notSelect2 = "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group" 
  const select2 = "inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
  const [tabsOnSelect2, setTabsOnSelect2] = useState([select2, notSelect2, notSelect2]);

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

    // Movie game data - instantiate
    let ran = Math.ceil(dayOfMonth % validIds);
    let arr = gamePairs[ran.toString()]

    let imagePaths = {};
    let images = require.context('../public/assets/movies/', false, /\.(png)$/);
    images.keys().forEach((imagePath) => {
      let key = imagePath.replace("public/assets/movies/", "").replace(".png", "")
      imagePaths[key] = images(imagePath).default;
    });
    let img = imagePaths[ran]
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

    // TBD2 game data - instantiate

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={tabsOnSelect[1]} viewBox="0 0 16 16">
                              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                            TBD 2
                        </a>
                    </li>
                    <li className="mr-2">
                        <a onClick={() => {setTabs(["hidden", "hidden", "visible"]); setTabsOnSelect([notSelect, notSelect, select]); setTabsOnSelect2([notSelect2, notSelect2, select2]);}}  className={tabsOnSelect2[2]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={tabsOnSelect[2]} > <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/> </svg>
                            TBD 3
                        </a>
                    </li>
                </ul>
              </div>
              <div className="flex justify-center text-center">
                <div id="movie" className={tabs[0]}>
                  <Movie winIndex={winIndex} options={options} day={dayOfYear} moviePoster={image.src}/>
                </div>

                <div id="tdb2" className={tabs[1]}>
                  A fun game coming soon...
                  <img src={tbd.src} className="shadow-md border-separate p-3 " width="500px" />
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


