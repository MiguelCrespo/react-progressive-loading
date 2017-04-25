import React from 'react';
import ReactDOM from 'react-dom';

import BlurImage from './src/BlurImage';

ReactDOM.render(
  <div>
    <div style={{ marginTop: '1000px' }}></div>
    <BlurImage
      src="https://netdna.webdesignerdepot.com/uploads/2008/12/stock-microstock.jpg" 
      placeholderSrc="/src/placeholder.png" height="300px"
      effect="blur" blurRadius={10} width="200px" />
  </div>
  , document.getElementById('container'));