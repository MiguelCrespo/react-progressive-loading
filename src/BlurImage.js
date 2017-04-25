import React, { Component, PropTypes } from 'react';
import StackBlur from '../shared/stackblur';
import connect from './connect';

class BlurImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    alt: PropTypes.string,
    blurRadius: PropTypes.number,
    trackElement: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.setPlaceHolder = this.setPlaceHolder.bind(this);
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;

    this.preImg.onload = () => {
      StackBlur(this.preImg, this.refs.canvas, this.props.blurRadius, this.refs.container.offsetWidth, this.refs.container.offsetHeight);
    };
  }

  componentWillUpdate(nextProps) {
    //StackBlur(this.preImg, this.canvas, nextProps.blurRadius, this.refs.container.offsetWidth, this.refs.container.offsetHeight);
  }


  setPlaceHolder(ref) {
    this.preImg = ref;
  }

  render() {
    let hidePlaceholder = this.props.isLoaded ? 'hide-placeholder' : '';

    return <div className="progressive-image_container" ref="container">
      <div></div>

      {!this.props.data.isLoaded && <div>
        <img
          className={`progressive-image_container_image progressive-image_container_image_placeholder ${hidePlaceholder}`}
          src={this.props.placeholderSrc} alt={this.props.alt} ref={this.setPlaceHolder}
          width={this.props.width} height={this.props.height} style={{ display: 'none' }} />

        <canvas className={`progressive-image_container_canvas ${hidePlaceholder}`} ref="canvas" />
      </div>
      }

      <img src={this.props.src} alt={this.props.alt} ref={this.props.trackElement} />
    </div>
  }
}

export default connect(BlurImage);