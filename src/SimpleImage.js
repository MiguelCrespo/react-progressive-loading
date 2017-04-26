import React, { Component } from 'react';
import track from './tracker';

class SimpleImage extends Component {
  render() {
    let { alt, trackElement, className, width, height } = this.props;
    return <img src={this.props.data.actualSrc} alt={alt} ref={trackElement} className={className} style={{ width, height }} />
  }
}

export default track(SimpleImage);