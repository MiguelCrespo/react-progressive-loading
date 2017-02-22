import React from 'react';
import StackBlur from '../shared/stackblur';


class BlurImage extends React.Component {

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
    StackBlur(this.preImg, this.canvas, nextProps.blurRadius, this.refs.container.offsetWidth, this.refs.container.offsetHeight);
  }

  setPlaceHolder(ref) {
    this.preImg = ref;
  }

  render() {
    let hidePlaceholder = this.props.isLoaded ? ' hide-placeholder' : '';
    return <div className="progressive-image_container" ref="container">
      <div></div>
      <img
        className={"progressive-image_container_image progressive-image_container_image_placeholder" + hidePlaceholder}
        src={this.props.placeholderSrc} alt={this.props.alt} ref={this.setPlaceHolder}
        width={this.props.width} height={this.props.height}/>

      <canvas className={"progressive-image_container_canvas" + hidePlaceholder} ref="canvas"/>
      <img className="progressive-image_container_image" style={{'display': this.props.isLoaded ? 'block' : 'none'}}
           src={this.props.src}
           alt={this.props.alt}
           ref={this.props.setRef} width={this.props.width} height={this.props.height}/>
    </div>
  }
}

BlurImage.PropTypes = {
  src: React.PropTypes.string.isRequired,
  isLoaded: React.PropTypes.bool,
  className: React.PropTypes.string,
  alt: React.PropTypes.string,
  blurRadius: React.PropTypes.number
};

BlurImage.defaultProps = {
  blurRadius: 10
};


export default BlurImage;