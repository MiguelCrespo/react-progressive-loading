import React from 'react';
import ReactDOM from 'react-dom';

import { BlurImage, BlurBackground, SimpleImage } from './src/ProgressiveImage';

class Test extends React.Component {
  state = {
    dinamicUrl: 'https://dummyimage.com/600x400/000/fff',
    small: undefined,
    big: 'http://a.domicilios.com/img/resources/headers/establishments/banner_6668.jpg?1495146367',
  }

  constructor(props) {
    super(props);

    setTimeout(() => {
      this.setState({
        dinamicUrl: 'https://dummyimage.com/600x400/36b832/0b1491',
        small: 'http://assets.domicilios.com/img/resources/headers/establishments/banner_7072_50_43.jpg?1496787760',
        big: 'http://assets.domicilios.com/img/resources/headers/establishments/banner_7072.jpg?1495146367'
      });
    }, 2000);
  }

  render() {
    return <div>
      {/*<SimpleImage src={this.state.dinamicUrl} />

      <div style={{ marginTop: '1000px' }}></div>*/}

      <BlurImage
        src={this.state.big}
        placeholderSrc={this.state.small} height="100%"
        effect="blur" blurRadius={10} width="100%" />

    </div>
  }
}

ReactDOM.render(<Test />, document.getElementById('container'));
