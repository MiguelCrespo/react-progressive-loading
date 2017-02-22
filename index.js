import React from 'react';
import ReactDOM from 'react-dom';

import ProgressiveImage from './src/ProgressiveImage';

ReactDOM.render(
  <div>
    <ProgressiveImage
      src="/src/react-native.png" placeholderSrc="/src/placeholder.png" height="300px"
      effect="blur" blurRadius="20" width="200px"/>
  </div>
  , document.getElementById('container'));