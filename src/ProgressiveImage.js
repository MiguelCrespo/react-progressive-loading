import React from 'react';

import SimpleImage from './SimpleImage';
import SolidImage from './SolidImage';
import BlurImage from './BlurImage';

import './styles.css';

/**
 * Main component to handle images loading in a professional and scalable way
 */

const EFFECT_NONE = 'none';
const EFFECT_SOLID = 'solid';
const EFFECT_BLUR = 'blur';

class ProgressiveImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actualSrc: this.props.placeholderSrc,
      isLoaded: false
    };

    // Storage the original classes
    this._originalClasses = this.props.className ? this.props.className : '';

    // Property to indicate a parsing error with the properties passed
    this._error = '';

    this.setRef = this.setRef.bind(this);
    this.checkViewport = this.checkViewport.bind(this);
  }

  isInViewport() {
    const rect = this.element.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    const viewportWidth = (window.innerWidth || document.documentElement.clientWidth);
    return (
      rect.bottom >= (0 - this.props.offset) &&
      rect.right >= (0 - this.props.offset) &&
      rect.top < (viewportHeight + this.props.offset) &&
      rect.left < (viewportWidth + this.props.offset)
    );
  }

  checkViewport() {
    if (this.isInViewport() && !this.isLoading) {
      this.isLoading = true;
      this.setState({
        className: `${this._originalClasses} ${this.props.loadingClass}`,
        actualSrc: this.props.src
      });
    }

    return null;
  }

  setRef(element) {
    this.element = element;
    return this;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.checkViewport);
    /* this.element.onload = () => {
       this.setState({
         className: `${this._originalClasses} ${this.props.loadedClass}`,
         isLoaded: true
       });
     };*/

    this.element.onerror = () => {
      this.setState({
        className: `${this._originalClasses} ${this.props.errorClass}`
      });
    };

    setTimeout(function () {
      console.log('Checking');
      this.checkViewport();
    }.bind(this), 2000);
  }

  render() {
    if (this._error) {
      return <div>{this._error}</div>
    }

    switch (this.props.effect) {
      case EFFECT_NONE:
        return <SimpleImage src={this.state.actualSrc} className={this.state.className} alt={this.props.alt}
          setRef={this.setRef} width={this.props.width}
          height={this.props.height} />;
        break;
      case EFFECT_SOLID:
        return <SolidImage src={this.state.actualSrc} className={this.state.className} alt={this.props.alt}
          setRef={this.setRef} color={this.props.color} width={this.props.width}
          height={this.props.height} isLoaded={this.state.isLoaded} />;
        break;
      case EFFECT_BLUR:
        return <BlurImage src={this.state.actualSrc} placeholderSrc={this.props.placeholderSrc}
          className={this.state.className} alt={this.props.alt}
          setRef={this.setRef} width={this.props.width}
          height={this.props.height} isLoaded={this.state.isLoaded} />;
      default:
        return <SimpleImage src={this.state.actualSrc} className={this.state.className} alt={this.props.alt}
          setRef={this.setRef} width={this.props.width} height={this.props.height} />;
        break;
    }

  }
}

ProgressiveImage.PropTypes = {
  src: React.PropTypes.string.isRequired,
  placeholderSrc: React.PropTypes.string,
  effect: React.PropTypes.string,
  alt: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  offset: React.PropTypes.number
};

ProgressiveImage.defaultProps = {
  effect: 'none', // Can be none, blur or solid
  offset: 0,
  loadingClass: 'lazy-loading',
  loadedClass: 'lazy-loaded',
  errorClass: 'lazy-error',
  color: '#2196f3'
};

export default ProgressiveImage;