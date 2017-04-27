import React, { Component, PropTypes } from 'react';
import BlurImage from './BlurImage';

class BlurBackground extends Component {
  render() {
    return <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <BlurImage {...this.props} style={{ position: 'absolute' }} />
      <div style={{ position: 'relative' }}>
        {this.props.children}
      </div>
    </div>
  }
}

export default BlurBackground;