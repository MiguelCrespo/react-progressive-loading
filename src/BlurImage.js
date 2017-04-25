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
    this.canvas = this.refs.canvas;
    let width, height;

    width = /((\d(\.\d)?)+)/gi.exec(this.props.width)[1];
    height = /((\d(\.\d)?)+)/gi.exec(this.props.height)[1];

    this.refs.placeholder.onload = () => {
      StackBlur(this.refs.placeholder, this.refs.canvas, this.props.blurRadius, parseFloat(width), parseFloat(height));
    };
  }

  render() {
    return <div className="progressive-image_container" ref="container" style={{ position: 'relative' }}>
      <img
        className={`progressive-image_container_image progressive-image_container_image_placeholder`}
        src={this.props.placeholderSrc} alt={this.props.alt} ref="placeholder"
        width={this.props.width} height={this.props.height} style={{ display: 'none' }} />

      <img src={this.props.data.actualSrc} alt={this.props.alt} ref={this.props.trackElement} style={
        {
          width: this.props.width,
          height: this.props.height,
          position: 'absolute',
          top: 0,
          left: 0
        }
      } />

      <canvas className={`progressive-image_container_canvas`} ref="canvas" style={
        {
          position: 'relative',
          transition: `opacity ${this.props.opacityTiming}s`,
          opacity: this.props.data.isLoaded ? 0 : 1
        }
      } />
    </div>
  }
}

export default track(BlurImage);