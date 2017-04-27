import React from 'react';
import ReactDOM from 'react-dom';

import { BlurImage, BlurBackground, SimpleImage } from './src/ProgressiveImage';

ReactDOM.render(
  <div>
    <div style={{ marginTop: '1000px' }}></div>

    <BlurImage
      src="https://wallpaperscraft.com/image/stars_sky_shore_84534_1920x1080.jpg"
      placeholderSrc="/src/test.jpg" height="100%"
      effect="blur" blurRadius={50} width="100%" />

  </div>
  , document.getElementById('container'));
