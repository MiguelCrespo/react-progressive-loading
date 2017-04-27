import React, { Component, PropTypes } from 'react';
import StackBlur from '../shared/stackblur';
import track from './tracker';

class BlurImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
    blurRadius: PropTypes.number,
    trackElement: PropTypes.func.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }

  static defaultProps = {
    opacityTiming: 1.5
  }

  componentDidMount() {
    let image = new Image();
    image.src = this.props.placeholderSrc;
    image.onload = () => {
      StackBlur(image, this.refs.canvas, this.props.blurRadius, this.props.width, this.props.height);
    };
  }

  render() {
    return <div className="progressive-image_container" ref="container" style={{ position: 'relative', height: this.props.height, width: this.props.width, ... this.props.style }}>
      <img src={this.props.data.actualSrc} alt={this.props.alt} ref={this.props.trackElement} style={
        {
          width: this.props.width,
          height: this.props.height
        }
      } />

      <canvas className={`progressive-image_container_canvas`} ref="canvas" style={
        {
          transition: `opacity ${this.props.opacityTiming}s`,
          opacity: this.props.data.isLoaded ? 0 : 1
        }
      } />
    </div>
  }
}

export default track(BlurImage);