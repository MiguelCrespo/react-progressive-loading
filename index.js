import React from 'react';
import ReactDOM from 'react-dom';

import { BlurImage, BlurBackground, SimpleImage } from './src/ProgressiveImage';

ReactDOM.render(
  <div>
    <div style={{ marginTop: '1000px' }}></div>

    <BlurImage
      src="https://wallpaperscraft.com/image/stars_sky_shore_84534_1920x1080.jpg"
      placeholderSrc="/src/test.jpg" height="1080px"
      effect="blur" blurRadius={50} width="1920px" />

    <BlurBackground
      src="https://wallpaperscraft.com/image/stars_sky_shore_84534_1920x1080.jpg"
      placeholderSrc="/src/test.jpg" height="1080px"
      effect="blur" blurRadius={50} width="1920px" >
      <h1>Hello!</h1>
    </BlurBackground>

    <SimpleImage
      src="https://wallpaperscraft.com/image/stars_sky_shore_84534_1920x1080.jpg"
      placeholderSrc="/src/test.jpg" height="1080px" width="1920px" />

  </div>
  , document.getElementById('container'));
