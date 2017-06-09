import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

    /*image.onload = () => {
      StackBlur(image, this.refs.canvas, this.props.blurRadius, this.props.width, this.props.height);
    };*/
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeholderSrc !== this.props.placeholderSrc) {
      let image = new Image();
      image.src = nextProps.placeholderSrc;
      /*image.crossOrigin = "anonymous";

      image.onload = () => {
        StackBlur(image, this.refs.canvas, this.props.blurRadius, this.props.width, this.props.height);
      };*/
    }
  }

  render() {
    let style = {
      width: this.props.width,
      height: this.props.height
    };

    if (this.props.data.actualSrc === this.props.placeholderSrc || (!this.props.data.isLoaded && this.props.placeholderSrc)) {
      style.filter = `blur(${this.props.blurRadius}px)`;
      style.WebkitFilter = `blur(${this.props.blurRadius}px)`;
    }

    if (this.props.data.actualSrc === this.props.src) {
      style.transition = `filter ${this.props.opacityTiming}s`;
      style.transition = `-webkit-filter ${this.props.opacityTiming}s`;
    }

    return <div className="progressive-image_container" ref="container" style={{ position: 'relative', height: this.props.height, width: this.props.width, ... this.props.style }}>
      <img src={this.props.data.actualSrc} alt={this.props.alt} ref={this.props.trackElement} style={style} />

      {/*<canvas className={`progressive-image_container_canvas`} ref="canvas" style={
        {
          transition: `opacity ${this.props.opacityTiming}s`,
          opacity: this.props.data.isLoaded ? 0 : 1
        }
      } />*/}
    </div>
  }
}

export default track(BlurImage);