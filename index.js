import React from 'react';
import ReactDOM from 'react-dom';

import { BlurImage, BlurBackground, SimpleImage } from './src/ProgressiveImage';

class Test extends React.Component {
  state = {
    dinamicUrl: 'https://dummyimage.com/600x400/000/fff'
  }

  constructor(props) {
    super(props);

    setTimeout(() => {
      this.setState({
        dinamicUrl: 'https://dummyimage.com/600x400/36b832/0b1491'
      });
    }, 2000);
  }

  render() {
    return <div>
      <SimpleImage src={this.state.dinamicUrl} />

      <div style={{ marginTop: '1000px' }}></div>

      <BlurImage
        src={a}
        placeholderSrc="/src/test.jpg" height="100%"
        effect="blur" blurRadius={50} width="100%" />

    </div>
  }
}

ReactDOM.render(<Test />, document.getElementById('container'));
